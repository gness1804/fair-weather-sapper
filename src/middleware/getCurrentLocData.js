require('dotenv').config();

const fetch = require('node-fetch');

const getData = async (req, res) => {
  const { lat, lng } = req.body;
  const url = `https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/${lat},${lng}`;
  const _res = await fetch(url);
  const text = await _res.text();
  const currentTemp = JSON.parse(text).currently.temperature;
  res.end(JSON.stringify({ temp: currentTemp }));
};

module.exports = getData;
