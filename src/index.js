const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const config = require('./config');
const webhookRouter = require('./routes/webhook');
const hrmsMock = require('./mock/hrmsMock');

dotenv.config();

const app = express();
app.use(bodyParser.json());

mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('MongoDB connected'))
  .catch(err => { console.error('MongoDB connection error', err); process.exit(1); });

app.use('/webhook', webhookRouter);

if (config.hrms.useMock) {
  app.use('/mock/hrms', hrmsMock);
  console.log('HRMS mock mounted at /mock/hrms');
}

app.get('/', (req, res) => res.send('Zalo HR Chatbot is running'));

const port = config.port || 3000;
app.listen(port, () => console.log(`Server listening on ${port}`));
