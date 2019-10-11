<script context="module">
  export async function preload({ query }) {
    const { lat, lng } = query;
    return { lat, lng };
  }
</script>

<script>
  import axios from 'axios';
  import getTempColor from '../data/getTempColor';
  import makeDateHumanReadable from '../helpers/makeDateHumanReadable';
  import convertTemp from '../helpers/convertTemp';
  import getIcon from '../helpers/getIcon';

  export let lat;
  export let lng;

  const getCustomWeather = async () => {
    if (!lat || !lng) {
      throw new Error(
        'Error: you must enter a valid latitude and longitude as query params. Please try again.',
      );
    }
    try {
      const res = await axios.post('/getCustomWeather', { lat, lng });
      const results = JSON.parse(res.data.data);
      return results;
    } catch (error) {
      if (error.message.includes('ECONNREFUSED')) {
        return null;
      }
      throw new Error(`Error in server call to /getCustomWeather: ${error}`);
    }
  };

  const weatherResults = getCustomWeather();
</script>

<svelte:head>
  <title>Results</title>
</svelte:head>

<div class="results-page text-center">
  <h2 class="results-header">Your Results</h2>

  {#await weatherResults}
    <p>Loading your results. Please be patient...</p>
  {:then results}

    <img
      src={getIcon(results.currently.icon)}
      alt={results.currently.icon}
      title={results.currently.icon}
      class="weather-icon my-0 mx-auto h-32 w-32" />

    <p
      class={`text-5xl text-${getTempColor(results.currently.temperature)} mb-6`}>
      <span class="current-temp">
        {convertTemp(results.currently.temperature)}
      </span>
      &deg; F
    </p>

    <p class="current-conditions-message mb-6">
      The weather is {results.currently.summary} with a {Math.round(results.currently.precipProbability)}%
      chance of rain.
    </p>

    <div class="today-container my-0 mx-auto w-most md:w-half">
      <h3 class="text-2xl mb-6">Today:</h3>

      <div class="high-low-temps-container flex justify-between mb-6">
        <div class="high-temp flex items-center justify-center">
          <div class="h-6 w-6 mr-4">
            <img src="arrow-up.png" alt="Up arrow." />
          </div>
          <span
            class={`text-${getTempColor(convertTemp(results.daily.data[0].temperatureHigh))} text-2xl`}>
            <span class="high-temp">
              {convertTemp(results.daily.data[0].temperatureHigh)}
            </span>
            &deg;
          </span>
        </div>
        <div class="low-temp flex items-center justify-center">
          <div class="h-6 w-6 mr-4">
            <img src="arrow-down.png" alt="Down arrow." />
          </div>
          <span
            class={`text-${getTempColor(convertTemp(results.daily.data[0].temperatureLow))} text-2xl`}>
            <span class="low-temp">
              {convertTemp(results.daily.data[0].temperatureLow)}
            </span>
            &deg;
          </span>
        </div>
      </div>

      <div class="sunrise-sunset-container flex justify-between">
        <div class="sunrise flex items-center justify-center">
          <div class="h-10 w-10 mr-2 md:mr-4">
            <img src="sunrise.png" alt="Sun rising." />
          </div>
          <span class="sunrise-time text-base md:text-xl">
            {makeDateHumanReadable(results.daily.data[0].sunriseTime, results.timezone)}
          </span>
        </div>
        <div class="sunset flex items-center justify-center">
          <div class="h-10 w-10 mr-2 md:mr-4">
            <img src="sunset.png" alt="Sun setting." />
          </div>
          <span class="sunset-time text-base md:text-xl">
            {makeDateHumanReadable(results.daily.data[0].sunsetTime, results.timezone)}
          </span>
        </div>
      </div>

    </div>

  {:catch error}
    <p class="weather-results-error-message text-red-600">{error.message}</p>
  {/await}
</div>
