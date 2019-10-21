const util = require('util');
const { readFile, existsSync } = require('fs');
const { exec } = require('child_process');

const promisifiedExec = util.promisify(exec);
const promisifiedReadFile = util.promisify(readFile);
const forbiddenBranches = ['master', 'develop'];

/**
 *
 * @param {string} message - the error message to display
 */
const resetAndExit = message => {
  promisifiedExec('git reset HEAD .')
    .then(() => {
      process.stderr.write(message);
    })
    .then(() => {
      process.exit(1);
    });
};

/**
 * @returns {Promise<Function>} - promise that resolves into child process call
 */
const getCurrentBranch = () =>
  promisifiedExec('git rev-parse --abbrev-ref HEAD');

/**
 * @returns {Promise<Function>} - promise that resolves into child process call
 */
const getListOfChangedFiles = () =>
  promisifiedExec('git diff HEAD --name-only');

/**
 *
 * @param {string} data - the contents of the file to check against
 * @returns {Promise<Function | void>} - promise that resolves or that rejects into a function
 * that exists the program
 */
const checkFile = (fileName, data) =>
  new Promise((resolve, reject) => {
    if (data.match(/debugger/g) && data.match(/debugger/g).length) {
      reject(resetAndExit(`Error: debugger in ${fileName}. Exiting.`));
    }
    if (data.match(/it.only/g) && data.match(/it.only/g).length) {
      reject(resetAndExit(`Error: it.only in ${fileName}. Exiting.`));
    }
    if (data.match(/@debug/g) && data.match(/@debug/g).length) {
      reject(resetAndExit(`Error: @debug in ${fileName}. Exiting.`));
    }
    if (data.match(/revert/g) && data.match(/revert/g).length) {
      reject(resetAndExit(`Error: revert in ${fileName}. Exiting.`));
    } else {
      resolve();
    }
  });

/**
 *
 * @param {string[]} files - array of strings corresponding to file names
 */
const loopThroughFiles = files => {
  /* eslint-disable no-unused-vars */
  for (const file of files) {
    /* eslint-enable no-unused-vars */
    if (file && existsSync(file)) {
      promisifiedReadFile(file, 'utf-8').then(fileData =>
        checkFile(file, fileData),
      );
    }
  }
};

/**
 * @returns {Promise<Function | void>} - promise that resolves into nothing or a function to go through any changed files
 */
const checkForWarnings = () =>
  getListOfChangedFiles()
    .then(data => data.stdout.split('\n'))
    .then(files => loopThroughFiles(files));

/* eslint-disable indent */
getCurrentBranch()
  .then(ret => {
    const currentBranch = ret.stdout.trim().replace('\n', '');
    return forbiddenBranches.find(branch => branch === currentBranch);
  })
  .then(ret =>
    ret
      ? resetAndExit(
          `Oops, you are on the ${ret} branch. Please switch branches before you commit.`,
        )
      : undefined,
  )
  .then(() => checkForWarnings())
  .then(() => promisifiedExec('npm run prettier'))
  .then(() => promisifiedExec('npm run lint'))
  .then(() => promisifiedExec('npm run unit'))
  .then(() => promisifiedExec('npm run e2e'))
  .then(() => {
    process.stdout.write('Successfully passed pre-commit checks. \n');
    process.exit(0);
  })
  .catch(err => {
    const errorMessage = `Error: ${err.message || JSON.stringify(err)}`;
    resetAndExit(errorMessage);
  });
/* eslint-enable indent */
