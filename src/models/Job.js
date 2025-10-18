const mongoose = require('mongoose');
const JobSchema = new mongoose.Schema({
  type: { type: String, required: true },
  payload: { type: mongoose.Schema.Types.Mixed, required: true },
  attempts: { type: Number, default: 0 },
  maxAttempts: { type: Number, default: 5 },
  nextRunAt: { type: Date, default: Date.now },
  lastError: { type: String },
  status: { type: String, default: 'queued' }
}, { timestamps: true });
module.exports = mongoose.model('Job', JobSchema);
