const list = new Map();

list.set('clear-day', 'Sun.svg');
list.set('clear-night', 'Moon.svg');
list.set('rain', 'Umbrella.svg');
list.set('snow', 'Cloud-Snow.svg');
list.set('sleet', 'Cloud-Drizzle.svg');
list.set('wind', 'Wind.svg');
list.set('fog', 'Cloud-Fog.svg');
list.set('cloudy', 'Cloud.svg');
list.set('partly-cloudy-day', 'Cloud-Sun.svg');
list.set('partly-cloudy-night', 'Cloud-Moon.svg');

/**
 * Fetches an icon src corresponding to an icon coming in from API, or returns default if no match.
 * @param {string} icon - the icon.
 * @returns {string} - the src to use in the image.
 * */
const getIcon = icon => {
  if (list.has(icon)) {
    return list.get(icon);
  }
  return 'Thermometer.svg';
};

module.exports = getIcon;
