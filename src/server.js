require('dotenv').config();

import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
/* eslint-disable import/no-extraneous-dependencies */
import * as sapper from '@sapper/server';
/* eslint-enable import/no-extraneous-dependencies */

const bodyParser = require('body-parser');
const fetch = require('node-fetch');

require('dotenv').config();

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka() // You can also use Express
  .use(bodyParser.json())
  .post('/call', async (req, res) => {
    const { lat, lng } = req.body;
    const url = `https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/${lat},${lng}`;
    const _res = await fetch(url);
    const text = await _res.text();
    const currentTemp = JSON.parse(text).currently.temperature;
    res.end(JSON.stringify({ temp: currentTemp }));
  })
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware(),
  )
  .listen(PORT, err => {
    /* eslint-disable no-console */
    if (err) console.log('error', err);
    /* eslint-enable no-console */
  });
