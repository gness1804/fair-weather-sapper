const { writeFile, readFile } = require('fs');
const util = require('util');

const promisifiedWriteFile = util.promisify(writeFile);
const promisifiedReadFile = util.promisify(readFile);

const file = '.env';

/**
 * @returns {Promise} - promise that resolves into successfully writing to the file
 */
const enableTesting = () =>
  promisifiedReadFile(file, 'utf-8')
    .then(data => data.replace(/TESTING=(.)+/, 'TESTING="true"'))
    .then(data => promisifiedWriteFile(file, data))
    .then(() => {
      process.stdout.write('Successfully enabled testing mode.\n');
    })
    .catch(err => {
      process.stderr.write(`Error in enabling testing mode: ${err}\n`);
      process.exit(1);
    });

enableTesting();
