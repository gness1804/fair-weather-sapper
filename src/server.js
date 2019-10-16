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
app.locals.cities = [];

app
  .use(bodyParser.json())
  .post('/addPos', getCurrentLocData)
  .post('/addCities', (req, res, next) => {
    const { city } = req.body;
    app.locals.cities = [...app.locals.cities, city];
    return next();
  })
  .post('/deleteCity', (req, res, next) => {
    const { id } = req.body;
    const filteredCities = app.locals.cities.filter(city => city.id !== id);
    app.locals.cities = filteredCities;
    return next();
  })
  .post('/resetCities', (req, res, next) => {
    app.locals.cities = [];
    return next();
  })
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware({
      session: req => ({
        tempType: req.tempType || 'F',
      }),
    }),
  )
  .listen(PORT, err => {
    /* eslint-disable no-console */
    if (err) console.log('error', err);
    /* eslint-enable no-console */
  });
