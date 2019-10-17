/* eslint-disable no-param-reassign */
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
require('dotenv').config();

module.exports = (on, config) => {
  config.env.TESTING = process.env.TESTING;
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  return config;
};

// see https://github.com/cypress-io/cypress/issues/2024
// automatically opens Chrome dev tools on browser launch for 'cypress open'
// eslint-disable-next-line no-unused-vars
// module.exports = (on, config) => {
//   // eslint-disable-next-line consistent-return
//   on('before:browser:launch', (browser = {}, args) => {
//     if (
//       browser.name === 'chrome' ||
//       browser.name === 'chromium' ||
//       browser.name === 'canary'
//     ) {
//       args.push('--auto-open-devtools-for-tabs');

//       return args;
//     }
//   });
// };
