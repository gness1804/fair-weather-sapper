require('dotenv').config();

const fetch = require('node-fetch');

const isTesting = process.env.TESTING === 'true';

const getData = async (req, res) => {
  if (isTesting) {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify({}));
    return;
  }
  const { lat, lng } = req.body;
  const url = `https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/${lat},${lng}`;
  const _res = await fetch(url);
  const text = await _res.text();
  const currentTemp = JSON.parse(text).currently.temperature;
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.end(JSON.stringify({ temp: currentTemp }));
};

module.exports = getData;
