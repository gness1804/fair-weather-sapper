/* global describe, it */

const assert = require('assert');
const App = require('../src/helpers/changeTempType');

describe('changeTempType', () => {
  it('should return the same temp if the mode is F', () => {
    const result = App(72, 'F');
    assert.strictEqual(result, 72);
  });

  it('should return the correctly converted temp if the mode is C', () => {
    const result = App(72, 'C');
    assert.strictEqual(result, 22);
  });
});
