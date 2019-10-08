/**
 * Takes in a proper name and returns a slug in the format 'new-york'.
 * @param {string} name - the original name.
 * @returns {string} - the slug.
 * */
const slugify = name => name.toLowerCase().replace(/\s/, '-');

module.exports = slugify;
