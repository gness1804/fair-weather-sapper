/* global describe, it */

const assert = require('assert');
const App = require('../src/data/getTempColor');

describe('getTempColor', () => {
  it('should return the correct value', () => {
    const coldTemp = 23;
    assert.strictEqual(App(coldTemp), 'cold');
    const idealTemp = 70;
    assert.strictEqual(App(idealTemp), 'ideal');
    const boilingTemp = 100;
    assert.strictEqual(App(boilingTemp), 'boiling');
  });
});
