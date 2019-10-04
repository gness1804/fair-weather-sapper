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

execSync('npm run export');

if (process.argv.indexOf('-d') !== -1) {
  execSync(
    `now -e DARK_SKY_KEY="${process.env.DARK_SKY_KEY}" -e TESTING="true" -d`,
    handleOutput,
  );
} else {
  execSync(
    `now -e DARK_SKY_KEY="${process.env.DARK_SKY_KEY}" -e TESTING="true"`,
    handleOutput,
  );
}
