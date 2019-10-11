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
</div>

{#await weatherResults}
  <p>Loading your results. Please be patient...</p>
{:then results}
  <img
    src={getIcon(results.currently.icon)}
    alt={results.currently.icon}
    title={results.currently.icon}
    class="my-0 mx-auto h-32 w-32" />

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
{:catch error}
  <p class="weather-results-error-message text-red-600">{error.message}</p>
{/await}
