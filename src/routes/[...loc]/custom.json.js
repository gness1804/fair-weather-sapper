import origCities from '../cities/_cityLinks';
import normalizeData from '../../helpers/normalizeData';

const extendedCities = require('../cities/extendedCityData.json');

export function get(req, res) {
  const [country, state] = req.params.loc;

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

  let filteredCities = normalizeData([...origCities, ...extendedCities]).filter(
    city => city.country.toLowerCase() === country.toLowerCase(),
  );

  if (state) {
    filteredCities = filteredCities.filter(
      city => city.state.toLowerCase() === state.toLowerCase(),
    );
  }

  res.writeHead(200, {
    'Content-Type': 'application/json',
  });

  res.end(JSON.stringify(filteredCities));
}
