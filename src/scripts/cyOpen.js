/* eslint-disable no-console */

require('dotenv').config();
const { exec } = require('child_process');

if (process.env.TESTING !== 'true') {
  console.error(
    'Error: you must have test mode turned on to run tests. Please turn TESTING to "true" in your .env file.',
  );
  process.exit(1);
}

exec('cypress open');
