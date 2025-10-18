const mongoose = require('mongoose');
const SessionSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true, unique: true },
  currentFlow: { type: String, default: 'welcome' },
  step: { type: String, default: 'start' },
  data: { type: mongoose.Schema.Types.Mixed, default: {} },
  updatedAt: { type: Date, default: Date.now }
});
SessionSchema.pre('save', function (next) { this.updatedAt = new Date(); next(); });
module.exports = mongoose.model('Session', SessionSchema);
