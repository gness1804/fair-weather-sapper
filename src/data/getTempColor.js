const temps = new Map();

temps.set([-100, 40], 'cold');
temps.set([41, 65], 'cool');
temps.set([66, 78], 'ideal');
temps.set([79, 92], 'hot');
temps.set([93, 200], 'boiling');

/**
 * gets the color corresponding to a temperature.
 * @param {number} temp - the temperature. Should be an integer.
 * @returns {string} - the color value mapped into tailwind. Example: 'cold'
 * */
const getTempColor = temp => {
  let res = null;
  temps.forEach((value, key) => {
    const max = Math.max(...key);
    const min = Math.min(...key);
    if (temp >= min && temp <= max) {
      res = value;
    }
  });
  return res;
};

module.exports = getTempColor;
