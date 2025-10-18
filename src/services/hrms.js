const axios = require('axios');
const config = require('../config');
const Job = require('../models/Job');

async function submitLeaveRequestImmediate(payload) {
  const url = config.hrms.useMock ? (config.hrms.baseUrl + '/mock/hrms/leave-request') : (config.hrms.baseUrl.replace(/\/$/, '') + '/leave-request');
  const headers = config.hrms.apiKey ? { 'x-api-key': config.hrms.apiKey } : {};
  const res = await axios.post(url, payload, { headers, timeout: 10000 });
  return res.data;
}

async function enqueueLeaveRequest(payload) {
  const job = new Job({ type: 'leave_submission', payload, attempts: 0, maxAttempts: 5 });
  await job.save();
  return job;
}

module.exports = { submitLeaveRequestImmediate, enqueueLeaveRequest };
