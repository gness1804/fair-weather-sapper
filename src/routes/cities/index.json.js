import { v4 } from 'uuid';
import cityLinks from './_cityLinks';
import sortAlpha from '../../helpers/sortAlpha';

// TODO: finish filling out this dataset
const citiesFromJSON = require('./extendedCityData.json');

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

  const citiesFromJSONWithIds = citiesFromJSON.map(_city =>
    Object.assign({}, _city, { id: v4() }),
  );

  res.writeHead(200, {
    'Content-Type': 'application/json',
  });

  res.end(
    JSON.stringify({
      cities: sortAlpha(content),
      citiesFromJSON: citiesFromJSONWithIds,
    }),
  );
}
