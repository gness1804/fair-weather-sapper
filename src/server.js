import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
/* eslint-disable import/no-extraneous-dependencies */
import * as sapper from '@sapper/server';
/* eslint-enable import/no-extraneous-dependencies */

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka() // You can also use Express
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
