/* global describe, it */

const assert = require('assert');

const App = require('../src/helpers/getIcon');

describe('getIcon', () => {
  it('should return the correct value', () => {
    const result = App('clear-day');
    assert.strictEqual(result, 'Sun.svg');
    const result2 = App('wind');
    assert.strictEqual(result2, 'Wind.svg');
    const result3 = App('sleet');
    assert.strictEqual(result3, 'Cloud-Drizzle.svg');
  });

  it('should return a default value if the input does not match the list', () => {
    const result = App('tornado');
    assert.strictEqual(result, 'Thermometer.svg');
  });
});
