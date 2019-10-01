import axios from 'axios';
import links from './_cityLinks';

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

  const { lat, lng } = links.filter(link => link.slug === city)[0].geocoords;
  const { name } = links.filter(link => link.slug === city)[0];

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
    data = await axios.get(
      `https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/${lat},${lng}`,
    );
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
