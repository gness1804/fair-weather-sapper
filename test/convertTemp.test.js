/* global describe, it */

const assert = require('assert');
const App = require('../src/helpers/convertTemp');

describe('convertTemp', () => {
  it('should return null for an invalid input', () => {
    assert.strictEqual(App('foo'), null);
    assert.strictEqual(App(), null);
  });

  it('should return the correct data for a valid input', () => {
    assert.strictEqual(App('86.4'), 86);
    assert.strictEqual(App('67.89'), 68);
  });
});
