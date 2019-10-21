/* eslint-disable no-await-in-loop */
require('dotenv').config();
const { writeFile } = require('fs');
const { exec } = require('child_process');
const util = require('util');
const axios = require('axios');
const normalizeData = require('../helpers/normalizeData');

let links = require('../routes/cities/_cityLinks');

const extendedCities = require('../routes/cities/extendedCityData.json');

const promisifiedWriteFile = util.promisify(writeFile);
const promisifiedExec = util.promisify(exec);

const seedData = async () => {
  let errorCount = 0;
  let errorMessage = 'There was a problem writing file data.';

  links = normalizeData([
    ...links,
    ...extendedCities.filter(city => city.name !== 'Harare'), // exclude Harare because it's our zero degrees case.
  ]);
  // eslint-disable-next-line no-unused-vars
  for (const link of links) {
    const {
      geocoords: { lat, lng },
      slug: city,
    } = link;

    const file = `./src/routes/cities/_cityStaticData/${city}.json`;

    try {
      const data = await axios.get(
        `https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/${lat},${lng}`,
      );
      await promisifiedWriteFile(file, JSON.stringify({ data: data.data }));
      await promisifiedExec(`npm run prettier:spec ${file}`);
    } catch (error) {
      errorCount++;
      errorMessage = error;
    }
  }
  return new Promise((resolve, reject) => {
    if (errorCount) {
      reject(errorMessage);
    } else {
      resolve('Successfully seeded city data.');
    }
  });
};

seedData()
  .then(message => {
    // eslint-disable-next-line no-console
    console.info(message);
  })
  .catch(err => {
    throw new Error(`Error with seeding city data: ${err}`);
  });
