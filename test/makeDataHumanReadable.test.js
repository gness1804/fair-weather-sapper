/* global describe, it */

const assert = require('assert');
const App = require('../src/helpers/makeDateHumanReadable');

describe('makeDateHumanReadable', () => {
  it('should be a function', () => {
    assert(App instanceof Function);
  });

  it('returns the correct value', () => {
    const timestamp = 1569932805;
    const result = App(timestamp);
    assert.strictEqual(result, '7:26 AM');
  });
});
