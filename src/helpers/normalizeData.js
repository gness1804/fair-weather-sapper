/* eslint-disable no-param-reassign */
const { v4 } = require('uuid');
const sortAlpha = require('./sortAlpha');
const slugify = require('./slugify');

/**
 * Normalizes extendedCityData to match the shape of the _cityLinks data
 * @param arr {object[]} - the original array of cities.
 * @returns {object[]} - the normalized array of cities.
 * */
const normalizeData = arr =>
  sortAlpha(arr)
    .map(city => {
      if (!city.id) {
        return Object.assign({}, city, { id: v4() });
      }
      return city;
    })
    .map(city => {
      if (!city.geocoords) {
        return Object.assign({}, city, {
          geocoords: {
            lat: +city.lat,
            lng: +city.lng,
          },
        });
      }
      return city;
    })
    .map(city => {
      delete city.lat;
      delete city.lng;
      return city;
    })
    .map(city => {
      if (!city.slug) {
        return Object.assign({}, city, { slug: slugify(city.name) });
      }
      return city;
    });

module.exports = normalizeData;
