require('dotenv').config();

const fetch = require('node-fetch');
const { readFile } = require('fs');
const util = require('util');

const promisifiedReadFile = util.promisify(readFile);

const isTesting = process.env.TESTING === 'true';

const getData = async (req, res) => {
  const { lat, lng } = req.body;
  if (isTesting) {
    try {
      const _res = JSON.parse(
        await promisifiedReadFile(
          './src/routes/cities/_cityStaticData/austin.json',
          'utf-8',
        ),
      );

      const { temperature: currentTemp } = _res.data.currently;
      const { summary } = _res.data.currently;
      const { icon } = _res.data.currently;

      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      // eslint-disable-next-line no-console
      console.info('Made call for weather data using JSON stub.');
      res.end(JSON.stringify({ temp: currentTemp, summary, icon }));
      return;
    } catch (error) {
      res.writeHead(500, {
        'Content-Type': 'application/json',
      });
      // eslint-disable-next-line no-console
      console.error(
        `Error fetching weather data from flat JSON file: ${error}`,
      );
      res.end(
        JSON.stringify({
          message: error.message || error,
        }),
      );
      return;
    }
  }
  const url = `https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/${lat},${lng}`;
  try {
    const _res = await fetch(url);
    const text = await _res.text();
    const { temperature: currentTemp } = JSON.parse(text).currently;
    const { summary } = JSON.parse(text).currently;
    const { icon } = JSON.parse(text).currently;

    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify({ temp: currentTemp, summary, icon }));
  } catch (error) {
    res.writeHead(500, {
      'Content-Type': 'application/json',
    });
    // eslint-disable-next-line no-console
    console.error(`Error fetching user's weather data: ${error}`);
    res.end(
      JSON.stringify({
        message: error.message || error,
      }),
    );
  }
};

module.exports = getData;
