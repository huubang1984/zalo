# Zalo HR Chatbot - Full (Ready-to-Run) v2

This package runs a Zalo OA chatbot (welcome + leave request flow), with:
- Webhook verification
- Stateful sessions (MongoDB)
- Persistent retry queue for HRMS calls (MongoDB-backed)
- Mock HRMS server (toggleable via USE_HRMS_MOCK in .env)
- Worker process to send to HRMS and retry on failure

Quick start:
1. Copy `.env.example` to `.env` and edit values (especially ZALO_VERIFY_TOKEN and ZALO_OA_ACCESS_TOKEN).
2. `docker-compose up --build`
3. Use Postman collection or Zalo OA to test webhook.

Environment switch:
- Set `USE_HRMS_MOCK=true` to use the built-in mock HRMS (`/mock/hrms/leave-request`).
- Set `USE_HRMS_MOCK=false` and configure `HRMS_API_BASE` and `HRMS_API_KEY` to call real HRMS.

Also includes:
- postman_collection.json
- render.yaml and railway.json for 1-click deploy config
