const axios = require('axios');
const config = require('../config');
const ZALO_SEND_URL = 'https://openapi.zalo.me/v3.0/oa/message';

async function sendText(userId, text) {
  try {
    const payload = { recipient: { user_id: userId }, message: { text } };
    await axios.post(`${ZALO_SEND_URL}/text`, payload, { params: { access_token: config.zalo.accessToken } });
  } catch (err) {
    console.error('Zalo sendText error', err.message || err);
  }
}

async function sendQuickReplies(userId, text, quickReplies = []) {
  try {
    const payload = {
      recipient: { user_id: userId },
      message: {
        text,
        attachment: {
          type: 'template',
          payload: { template_type: 'quick_reply', elements: quickReplies.map(q => ({ title: q.title, payload: q.payload })) }
        }
      }
    };
    await axios.post(`${ZALO_SEND_URL}/cs`, payload, { params: { access_token: config.zalo.accessToken } });
  } catch (err) {
    console.error('Zalo sendQuickReplies error', err.message || err);
  }
}

module.exports = { sendText, sendQuickReplies };
