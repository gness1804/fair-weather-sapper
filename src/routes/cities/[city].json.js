import axios from 'axios';
import { readFile } from 'fs';
import util from 'util';
import links from './_cityLinks';
import getIcon from '../../helpers/getIcon';
import normalizeData from '../../helpers/normalizeData';
import getTempColor from '../../data/getTempColor';
import makeDateHumanReadable from '../../helpers/makeDateHumanReadable';
import convertTemp from '../../helpers/convertTemp';
import changeTempType from '../../helpers/changeTempType';

const extendedCities = require('./extendedCityData.json');

const promisifiedReadFile = util.promisify(readFile);

export async function get(req, res) {
  const result = {};
  const { city } = req.params;

  if (!city) {
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

  let newLinks = links;
  const { cities: citiesFromServer } = req.app.locals;

  if (citiesFromServer.length > 0) {
    newLinks = [...newLinks, ...citiesFromServer];
  }

  newLinks = normalizeData([...extendedCities, ...newLinks]);

  const { lat, lng } = newLinks.filter(link => link.slug === city)[0].geocoords;
  const { name } = newLinks.filter(link => link.slug === city)[0];

  if (!lat || !lng || !name) {
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

  let data;
  try {
    if (process.env.TESTING === 'true') {
      data = JSON.parse(
        await promisifiedReadFile(
          `./src/routes/cities/_cityStaticData/${city}.json`,
          'utf-8',
        ),
      );
    } else {
      data = await axios.get(
        `https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/${lat},${lng}`,
      );
    }
  } catch (error) {
    res.writeHead(500, {
      'Content-Type': 'application/json',
    });

    res.end(
      JSON.stringify({
        message: `Error fetching weather data: ${JSON.stringify(error)}`,
      }),
    );
    return;
  }

  const {
    data: { currently, daily, timezone },
  } = data;

  const {
    temperatureHigh,
    temperatureLow,
    sunriseTime,
    sunsetTime,
  } = daily.data[0];

  result.name = name;
  result.icon = currently.icon;
  result.iconSrc = getIcon(currently.icon);
  result.currentTemp = convertTemp(currently.temperature);
  result.currentTempCelsius = changeTempType(
    convertTemp(currently.temperature),
    'C',
  );
  result.currentTempColor = getTempColor(currently.temperature);
  result.summary = currently.summary;
  result.precipProbability = currently.precipProbability;
  result.dailyHighTemp = convertTemp(temperatureHigh);
  result.dailyHighTempCelsius = changeTempType(
    convertTemp(temperatureHigh),
    'C',
  );
  result.dailyLowTemp = convertTemp(temperatureLow);
  result.dailyLowTempCelsius = changeTempType(convertTemp(temperatureLow), 'C');
  result.dailyHighTempColor = getTempColor(temperatureHigh);
  result.dailyLowTempColor = getTempColor(temperatureLow);
  result.sunriseTime = makeDateHumanReadable(sunriseTime, timezone);
  result.sunsetTime = makeDateHumanReadable(sunsetTime, timezone);

  res.writeHead(200, {
    'Content-Type': 'application/json',
  });

  res.end(JSON.stringify(result));
}
