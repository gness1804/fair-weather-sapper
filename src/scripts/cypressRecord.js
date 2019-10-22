const { execSync } = require('child_process');
require('dotenv').config();

/**
 *
 * @param {object} [error] - an error object
 * @param {object} stdout - stdout object
 * @param {object} stderr - stderr object
 */
const handleOutput = (error, stdout, stderr) => {
  if (error) {
    process.stderr.write(`Error: ${error.message || JSON.stringify(error)}`);
    process.exit(1);
  }
  process.stdout.write(stdout);
  process.stderr.write(stderr);
};

execSync(
  `cypress run --record --key ${process.env.CYPRESS_RECORD_KEY}`,
  handleOutput,
);
