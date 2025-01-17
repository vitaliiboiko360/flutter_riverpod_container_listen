import { readFileSync } from 'fs';
import { CreateRecords } from './CreateRecords';
import { STATUS_CODES } from 'http';

const CONFIG_FILE = './zoho.api.config.json';
const PORT = 3004;

let config = JSON.parse(readFileSync(CONFIG_FILE, 'utf8'));

// await CreateRecords.initialize(
//   config.clientId,
//   config.clientSecret,
//   config.refreshToken
// );

const leadsModuleAPIName = 'leads';
// await CreateRecords.createRecords(leadsModuleAPIName);

import * as express from 'express';
const app = express.application;

app.get('/accounts', (reg, res) => {
  res
    .status(STATUS_CODES.OK)
    .json({ success: 'true', backEndApiRelay: 'true' });
});

app.post('/accounts', (req, res) => {
  res
    .status(STATUS_CODES.OK)
    .json({ success: 'true', backEndApiRelay: 'true' });
});

app.post('/deals', (req, res) => {
  res
    .status(STATUS_CODES.OK)
    .json({ success: 'true', backEndApiRelay: 'true' });
});

import * as ipc from './ipc.js';

const L = console.log;

const ipcEventListener = ipc.getEvents();

ipcEventListener.on('connected', function (m) {
  L('Client has connected');
});

ipcEventListener.on('data', function (m) {
  L(m.type);
  L(m.data.toString());
});

ipcEventListener.on('error', function (data) {
  L(data.toString());
});

ipcEventListener.on('close', function (data) {
  L(data.toString());
});

ipc.connect('zohoCrm', true);

let counter = 0;
// setInterval(() => {
//   ipc.write(1, `# ${counter++} FROM NODEJS AFTER 10sec`);
// }, 10000);

app.listen(PORT);
