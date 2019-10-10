<script context="module">
  export async function preload({ query }) {
    const { lat, lng } = query;
    return { lat, lng };
  }
</script>

<script>
  import axios from 'axios';

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

<div class="results-page text-center">
  <h2 class="results-header">Your Results</h2>
</div>

{#await weatherResults}
  <p>Loading your results. Please be patient...</p>
{:then results}
  {JSON.stringify(results)}
{:catch error}
  <p class="weather-results-error-message text-red-600">{error.message}</p>
{/await}
