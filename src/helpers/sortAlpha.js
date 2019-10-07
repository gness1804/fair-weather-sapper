/** Sorts array alphabetically by name property.
 * @param {Object[]} arr - the array to sort.
 * @returns {Object[]} - sorted array.
 */
const sortAlpha = arr =>
  arr.sort((a, b) => {
    const lowerA = a.name.toLowerCase();
    const lowerB = b.name.toLowerCase();

    if (lowerA < lowerB) {
      return -1;
    }
    if (lowerA > lowerB) {
      return 1;
    }
    return 0;
  });

module.exports = sortAlpha;
