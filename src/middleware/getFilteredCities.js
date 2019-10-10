const cities = require('cities.json');

const getFilteredCities = async (req, res) => {
  const { country } = req.body;
  const filteredCities = cities.filter(
    _city => _city.country.toUpperCase() === country.toUpperCase(),
  );
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.end(JSON.stringify({ filteredCities }));
};

module.exports = getFilteredCities;
