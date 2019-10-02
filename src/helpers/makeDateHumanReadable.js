const moment = require('moment');
// eslint-disable-next-line no-unused-vars
const tz = require('moment-timezone');

/**
 * converts a UNIX timestamp to a human-readable time such as 7:12 PM.
 * @param {string} timestamp - the timestamp.
 * @param {string} timezone - the timezone. Example: 'America/Chicago'
 * @returns {string} - the human-readable time.
 * */
const makeDateHumanReadable = (timestamp, timezone) =>
  moment
    .tz(new Date(parseFloat(timestamp) * 1000), timezone)
    .format('HH:mm')
    .replace(/^0/, '');

module.exports = makeDateHumanReadable;
