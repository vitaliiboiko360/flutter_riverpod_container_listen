import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const axios = require('axios');

const ZOHOAPI = 'https://www.zohoapis.com/crm/v7/';

async function postAccount(accountName, accountWebsite, accountPhone) {
  try {
    let res = await axios({
      url: 'https://jsonplaceholder.typicode.com/posts/1',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.status == 200) {
      console.log(res.status);
    }
    return res.data;
  } catch (err) {
    console.error(err);
  }
}
