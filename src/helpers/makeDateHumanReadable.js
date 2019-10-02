/**
 * converts a UNIX timestamp to a human-readable time such as 7:12 PM.
 * @param {string} timestamp - the timestamp.
 * @returns {string} - the human-readable time.
 * */
const makeDateHumanReadable = timestamp =>
  new Date(parseFloat(timestamp) * 1000)
    .toLocaleTimeString()
    .replace(/^(\d{1,2}):(\d{2}):\d{2}/, '$1:$2');

module.exports = makeDateHumanReadable;
