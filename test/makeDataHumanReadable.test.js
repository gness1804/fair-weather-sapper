/* global describe, it */

const assert = require('assert');
const App = require('../src/helpers/makeDateHumanReadable');

describe('makeDateHumanReadable', () => {
  it('should be a function', () => {
    assert(App instanceof Function);
  });

  it('returns the correct value for US Central Time', () => {
    const timestamp = 1569932805;
    const result = App(timestamp, 'America/Chicago');
    assert.strictEqual(result, '7:26');
  });

  it('returns the correct value for London time.', () => {
    const timestamp = 1569951678;
    const result = App(timestamp, 'Europe/London');
    assert.strictEqual(result, '18:41');
  });
});
