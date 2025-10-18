require('dotenv').config();
module.exports = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/zalo_hr_bot',
  zalo: {
    verifyToken: process.env.ZALO_VERIFY_TOKEN || 'change_me_verify_token',
    accessToken: process.env.ZALO_OA_ACCESS_TOKEN || ''
  },
  hrms: {
    baseUrl: process.env.HRMS_API_BASE || 'http://localhost:3000',
    apiKey: process.env.HRMS_API_KEY || '',
    useMock: (process.env.USE_HRMS_MOCK || 'true').toLowerCase() === 'true'
  }
};
