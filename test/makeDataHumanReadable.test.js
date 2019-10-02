/* global describe, it */

const assert = require('assert');
const App = require('../src/helpers/makeDateHumanReadable');

describe('makeDateHumanReadable', () => {
  it('should be a function', () => {
    assert(App instanceof Function);
  });
});
