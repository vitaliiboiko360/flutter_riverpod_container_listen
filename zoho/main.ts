import * as os from 'os';
import { readFileSync } from 'fs';
import { CreateRecords } from './CreateRecords';
import { StatusCodes } from 'http-status-codes';

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
const L = console.log;

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const bodyParser = require('body-parser');
const formData = require('express-form-data');
const express = require('express');
const app = express();

const options = {
  uploadDir: os.tmpdir(),
  autoClean: true,
};
app.use(bodyParser.json());
// parse data with connect-multiparty.
app.use(formData.parse(options));
// delete from the request all empty files (size == 0)
app.use(formData.format());
// change the file objects to fs.ReadStream
app.use(formData.stream());
// union the body and the files
app.use(formData.union());
app.use(express.urlencoded({ extended: true }));

app.get('/accounts', (reg, res) => {
  res.status(StatusCodes.OK).json({ success: 'true', backEndApiRelay: 'true' });
});

app.post('/accounts', (req, res) => {
  L('accounts');
  L(req.body);

  res.status(StatusCodes.OK).json({
    success: 'true',
    website: `${req.body.website}`,
    formFields: {
      name: req.body.name,
      phone: req.body.phone,
    },
  });
});

app.post('/deals', (req, res) => {
  L(req.body);
  res.status(StatusCodes.OK).json({ success: 'true', backEndApiRelay: 'true' });
});

app.listen(PORT, '0.0.0.0');
