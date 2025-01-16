import { readFileSync } from 'fs';
import { CreateRecords } from './CreateRecords';
import { STATUS_CODES } from 'http';

const CONFIG_FILE = '../zoho.api.config.json';
const PORT = 3004;

let config = JSON.parse(readFileSync(CONFIG_FILE, 'utf8'));

await CreateRecords.initialize(
  config.clientId,
  config.clientSecret,
  config.refreshToken
);

const leadsModuleAPIName = 'leads';
await CreateRecords.createRecords(leadsModuleAPIName);

const express = require('express');
const app = express();

app.get('/accounts', (reg, res) => {
  res.status(STATUS_CODES.OK).json({ success: 'true' });
});

app.post('/accounts', (req, res) => {
  res.status(STATUS_CODES.OK).json({ success: 'true' });
});

app.post('/deals', (req, res) => {
  res.status(STATUS_CODES.OK).json({ success: 'true' });
});

app.listen(PORT);
