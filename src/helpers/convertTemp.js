/**
 * Converts temp string into an integer.
 * @param {string} temp - the temperature. Ex: 98.6
 * @returns {number} - the converted temp. Ex: 98
 * */
const convertTemp = temp => {
  const parsedTemp = parseFloat(temp);
  if (isNaN(parsedTemp)) {
    return null;
  }
  return Math.round(parsedTemp);
};

module.exports = convertTemp;
