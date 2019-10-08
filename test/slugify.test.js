/* global describe, it */

const assert = require('assert');
const App = require('../src/helpers/slugify');

describe('slugify', () => {
  it('should return the proper slug', () => {
    assert.strictEqual(App('New York'), 'new-york');
    assert.strictEqual(App('Chicago'), 'chicago');
  });
});
