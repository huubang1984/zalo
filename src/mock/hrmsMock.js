const express = require('express');
const router = express.Router();

router.post('/leave-request', (req, res) => {
  const body = req.body || {};
  console.log('[HRMS MOCK] Received:', body);
  if (body.reason && String(body.reason).toLowerCase().includes('fail')) {
    return res.status(400).json({ success: false, error: 'Simulated HRMS validation error: insufficient balance' });
  }
  setTimeout(() => {
    return res.json({ success: true, code: 'NP' + Math.floor(Math.random()*90000 + 10000), manager: 'Quản lý A' });
  }, 800);
});

module.exports = router;
