/* global describe, it */

const assert = require('assert');

const App = require('../src/helpers/normalizeData');

const data = require('./helpers/extendedCityDataDummy.json');

describe('normalizeData', () => {
  it('normalizes data correctly', () => {
    const result = App(data);
    assert.strictEqual(result[0].name, 'Boston');
    assert.strictEqual(result[0].slug, 'boston');
    assert.strictEqual(result[0].state, 'MA');
    assert.deepEqual(result[0].geocoords, {
      lat: 42.360081,
      lng: -71.058884,
    });
    assert.ok(result[0].id);

    assert.strictEqual(result[1].name, 'Munich');
    assert.strictEqual(result[1].slug, 'munich');
    assert.deepEqual(result[1].geocoords, {
      lat: 48.13913,
      lng: 11.58022,
    });
    assert.ok(result[1].id);
  });
});
