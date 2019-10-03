<script context="module">
  export function preload() {
    return this.fetch('cities.json')
      .then(res => res.json())
      .then(cities => {
        return { cities };
      });
  }
</script>

<script>
  import axios from 'axios';
  import convertTemp from '../../helpers/convertTemp';
  import getTempColor from '../../data/getTempColor';

  export let cities;

  let loading = false;
  let currentTemp;
  let summary;
  $: convertedTemp = convertTemp(currentTemp);
  $: convertedTempColor = getTempColor(convertedTemp);

  const success = position => {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    axios
      .post('/call', { lat: latitude, lng: longitude })
      .then(res => {
        if (res && res.data && res.data.temp) {
          currentTemp = res.data.temp;
          summary = res.data.summary;
        }
        loading = false;
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.error(`Error retrieving Dark Sky data from server: ${err}`);
        loading = false;
      });
  };

  const failure = reason => {
    // eslint-disable-next-line no-console
    console.error(
      `Attempt to get user's current position failed: ${reason ||
        'unable to retrieve user location.'}`,
    );
    loading = false;
  };

  const getWeather = async () => {
    loading = true;
    await navigator.geolocation.getCurrentPosition(success, failure);
  };
</script>

<svelte:head>
  <title>Cities</title>
</svelte:head>

<div class="cities text-center">
  <h2 class="text-center text-3xl font-bold mb-10">Cities</h2>

  <ul class="cities-links mb-12">
    {#each cities as { slug, name }}
      <li class="mb-4">
        <a
          class="text-blue-600 hover:text-blue-400"
          rel="prefetch"
          title={name}
          href="cities/{slug}">
          {name}
        </a>
      </li>
    {/each}
  </ul>

  <button class="mb-10" on:click={getWeather}>Get My Weather</button>

  {#if convertedTemp && summary}
    <div class="my-weather-results">
      <p>Your current temperature is:</p>
      <p class={`text-5xl text-${convertedTempColor} mb-6`}>
        {convertedTemp} &deg; F
      </p>
      <p class="text-2xl">Your current weather is: {summary}</p>
    </div>
  {:else if loading}
    <p>Loading...</p>
  {/if}

</div>
