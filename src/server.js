require('dotenv').config();

import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
/* eslint-disable import/no-extraneous-dependencies */
import * as sapper from '@sapper/server';
/* eslint-enable import/no-extraneous-dependencies */

const bodyParser = require('body-parser');

const getCurrentLocData = require('./middleware/getCurrentLocData');

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const app = express();

app
  .use(bodyParser.json())
  .post('/addPos', getCurrentLocData)
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
