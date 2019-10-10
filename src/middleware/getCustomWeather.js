const fetch = require('node-fetch');

// TODO: add stub for JSON call for fake data
const getCustomWeather = async (req, res) => {
  const { lat, lng } = req.body;
  try {
    const _res = await fetch(
      `https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/${lat},${lng}`,
    );
    const text = await _res.text();
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify({ data: text }));
  } catch (error) {
    res.writeHead(500, {
      'Content-Type': 'application/json',
    });
    // eslint-disable-next-line no-console
    console.error(`Error fetching custom weather data: ${error}`);
    res.end(
      JSON.stringify({
        message: error.message || error,
      }),
    );
  }
};

module.exports = getCustomWeather;
