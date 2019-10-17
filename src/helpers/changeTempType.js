/**
 * Converts temp to Celsius if it is Fahrenheit. Returns the original temp if already Fahrenheit.
 * @param {number} temp - the input temp.
 * @param {string} mode - the type of temp. Either F or C.
 * @returns {number} - the converted temp.
 * */
const changeTempType = (temp, mode) => {
  if (mode === 'C') {
    return Math.round((temp - 32) / 1.8);
  }
  return temp;
};

module.exports = changeTempType;
