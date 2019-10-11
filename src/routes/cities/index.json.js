import cityLinks from './_cityLinks';
import sortAlpha from '../../helpers/sortAlpha';

/**
 * Extracts the name and slug from a city object
 * @param {object[]} arr - array of city objects
 * @returns {object[]} - cleaned up array of city objects
 * */
const getNameAndSlug = arr =>
  arr.map(({ name, slug, id }) => {
    return {
      name,
      slug,
      id,
    };
  });

export function get(req, res) {
  const { cities } = req.app.locals;

  let content = getNameAndSlug(cityLinks);
  if (cities.length > 0) {
    const formattedCities = getNameAndSlug(cities);
    content = [...content, ...formattedCities];
  }

  res.writeHead(200, {
    'Content-Type': 'application/json',
  });

  res.end(JSON.stringify(sortAlpha(content)));
}
