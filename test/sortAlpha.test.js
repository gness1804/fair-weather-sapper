/* global describe, it */

const assert = require('assert');
const App = require('../src/helpers/sortAlpha');

describe('sortAlpha', () => {
  const cities = [
    {
      name: 'London',
      slug: 'london',
    },
    {
      name: 'Amsterdam',
      slug: 'amsterdam',
    },
    {
      name: 'Paris',
      slug: 'paris',
    },
    {
      name: 'Austin',
      slug: 'austin',
    },
  ];

  it('sorts an array alphabetically by name', () => {
    const result = App(cities);
    assert.strictEqual(result[0].name, 'Amsterdam');
    assert.strictEqual(result[1].name, 'Austin');
    assert.strictEqual(result[2].name, 'London');
    assert.strictEqual(result[3].name, 'Paris');
  });
});
