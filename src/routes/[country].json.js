import origCities from './cities/_cityLinks';
import normalizeData from '../helpers/normalizeData';

const extendedCities = require('./cities/extendedCityData.json');

export function get(req, res) {
  const { country } = req.params;

  if (!country) {
    res.writeHead(404, {
      'Content-Type': 'application/json',
    });

    res.end(
      JSON.stringify({
        message: 'Not found',
      }),
    );
    return;
  }

  const filteredCities = normalizeData([
    ...origCities,
    ...extendedCities,
  ]).filter(city => city.country.toLowerCase() === country.toLowerCase());

  res.writeHead(200, {
    'Content-Type': 'application/json',
  });

  res.end(JSON.stringify(filteredCities));
}
