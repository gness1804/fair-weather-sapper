const cities = require('cities.json');

const getSuperFilteredCities = async (req, res) => {
  const { country, city } = req.body;

  const filteredCities = cities
    .filter(_city => _city.country.toUpperCase() === country.toUpperCase())
    .filter(_city => _city.name.toUpperCase() === city.toUpperCase());

  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.end(JSON.stringify({ filteredCities }));
};

module.exports = getSuperFilteredCities;
