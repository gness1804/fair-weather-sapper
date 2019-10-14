require('dotenv').config();

const fetch = require('node-fetch');
const { readFile } = require('fs');
const util = require('util');
const getIcon = require('../helpers/getIcon');
const convertTemp = require('../helpers/convertTemp');
const getTempColor = require('../data/getTempColor');

const promisifiedReadFile = util.promisify(readFile);

const isTesting = process.env.TESTING === 'true';

const getData = async (req, res) => {
  let data;
  const result = {};
  const { lat, lng } = req.body;
  if (isTesting) {
    try {
      data = JSON.parse(
        await promisifiedReadFile(
          './src/routes/cities/_cityStaticData/austin.json',
          'utf-8',
        ),
      ).data;
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
  } else {
    const url = `https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/${lat},${lng}`;
    try {
      const _res = await fetch(url);
      data = JSON.parse(await _res.text());
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
      return;
    }
  }

  const { currently } = data;
  result.icon = currently.icon;
  result.iconSrc = getIcon(currently.icon);
  result.currentTemp = convertTemp(currently.temperature);
  result.currentTempColor = getTempColor(currently.temperature);
  result.summary = currently.summary;
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });

  res.end(JSON.stringify(result));
};

module.exports = getData;
