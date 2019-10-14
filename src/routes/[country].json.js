import { v4 } from 'uuid';
import origCities from './cities/_cityLinks';
import sortAlpha from '../helpers/sortAlpha';

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
  const filteredCities = sortAlpha([...origCities, ...extendedCities])
    .map(city => {
      if (!city.id) {
        return Object.assign({}, city, { id: v4() });
      }
      return city;
    })
    .filter(city => city.country.toLowerCase() === country.toLowerCase());

  res.writeHead(200, {
    'Content-Type': 'application/json',
  });

  res.end(JSON.stringify(filteredCities));
}
