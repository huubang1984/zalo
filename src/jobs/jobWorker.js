const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const config = require('../config');
const Job = require('../models/Job');
const hrms = require('../services/hrms');
const zalo = require('../services/zalo');

async function processJob(job) {
  job.status = 'processing';
  await job.save();
  try {
    const res = await hrms.submitLeaveRequestImmediate(job.payload);
    if (res && res.success) {
      job.status = 'done';
      await job.save();
      if (job.payload && job.payload.userId) {
        await zalo.sendText(job.payload.userId, `Gửi đơn thành công! Mã ${res.code || 'NPXXXX'}. Người duyệt: ${res.manager || '-'}.`);
      }
    } else {
      job.attempts += 1;
      job.lastError = res && res.error ? res.error : 'Unknown error';
      if (job.attempts >= job.maxAttempts) {
        job.status = 'failed';
        await job.save();
        if (job.payload && job.payload.userId) {
          await zalo.sendText(job.payload.userId, `Gửi đơn thất bại. Lý do: ${job.lastError}`);
        }
      } else {
        const delay = Math.pow(2, job.attempts) * 1000;
        job.nextRunAt = new Date(Date.now() + delay);
        job.status = 'queued';
        await job.save();
      }
    }
  } catch (err) {
    job.attempts += 1;
    job.lastError = err.message || String(err);
    if (job.attempts >= job.maxAttempts) {
      job.status = 'failed';
      await job.save();
      if (job.payload && job.payload.userId) {
        await zalo.sendText(job.payload.userId, `Gửi đơn thất bại do lỗi hệ thống: ${job.lastError}`);
      }
    } else {
      const delay = Math.pow(2, job.attempts) * 1000;
      job.nextRunAt = new Date(Date.now() + delay);
      job.status = 'queued';
      await job.save();
    }
  }
}

async function runWorker(pollInterval = 2000) {
  await mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Worker connected to MongoDB, starting loop...');
  while (true) {
    try {
      const now = new Date();
      const job = await Job.findOneAndUpdate({ status: 'queued', nextRunAt: { $lte: now } }, { $set: { status: 'processing' } }, { sort: { createdAt: 1 }, new: true });
      if (job) {
        await processJob(job);
      } else {
        await new Promise(r => setTimeout(r, pollInterval));
      }
    } catch (err) {
      console.error('Worker loop error', err);
      await new Promise(r => setTimeout(r, pollInterval));
    }
  }
}

runWorker().catch(err => { console.error('Worker start error', err); process.exit(1); });
