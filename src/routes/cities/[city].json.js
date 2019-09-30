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
  }

  const { lat, lng } = links.filter(link => link.slug === city)[0].geocoords;
  if (!lat || !lng) {
    res.writeHead(404, {
      'Content-Type': 'application/json',
    });

    res.end(
      JSON.stringify({
        message: 'Not found',
      }),
    );
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
  }

  res.writeHead(200, {
    'Content-Type': 'application/json',
  });

  res.end(JSON.stringify({ data: data.data }));
}
