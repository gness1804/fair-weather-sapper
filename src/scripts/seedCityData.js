/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
require('dotenv').config();
const { writeFile } = require('fs');
const { exec } = require('child_process');
const util = require('util');
const axios = require('axios');
const links = require('../routes/cities/_cityLinks');

const promisifiedWriteFile = util.promisify(writeFile);
const promisifiedExec = util.promisify(exec);

const seedData = async () => {
  // eslint-disable-next-line no-unused-vars
  for (const link of links) {
    const {
      geocoords: { lat, lng },
      slug: city,
    } = link;

    const file = `./src/routes/cities/_cityStaticData/${city}.json`;
    const data = await axios.get(
      `https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/${lat},${lng}`,
    );
    await promisifiedWriteFile(file, JSON.stringify({ data: data.data }));
    await promisifiedExec(`npm run prettier:spec ${file}`);
  }
  return true;
};

seedData()
  .then(() => {
    console.info('Successfully seeded city data.');
  })
  .catch(err => {
    throw new Error(`Error with seeding city data: ${err}`);
  });
