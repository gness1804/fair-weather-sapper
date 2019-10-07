import axios from 'axios';
import { readFile } from 'fs';
import util from 'util';
import links from './_cityLinks';

const promisifiedReadFile = util.promisify(readFile);

export async function get(req, res) {
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
  const { cities } = req.app.locals;

  if (cities.length > 0) {
    newLinks = [...newLinks, ...cities];
  }

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

  res.writeHead(200, {
    'Content-Type': 'application/json',
  });

  data.data.name = name;

  res.end(JSON.stringify({ data: data.data }));
}
