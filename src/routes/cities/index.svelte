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
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { onMount } from 'svelte';
  import { v4 } from 'uuid';
  import convertTemp from '../../helpers/convertTemp';
  import getIcon from '../../helpers/getIcon';
  import slugify from '../../helpers/slugify';
  import getTempColor from '../../data/getTempColor';

  const _cities = require('cities.json');

  export let cities;

  let loading = false;
  let currentTemp;
  let summary;
  let icon;

  let enteredCity;

  const buttonStyle = 'p-2 bg-gray-400 hover:bg-gray-300 shadow';

  $: convertedTemp = convertTemp(currentTemp);
  $: convertedTempColor = getTempColor(convertedTemp);

  $: iconSrc = getIcon(icon);

  $: localDataIsPopulated = convertedTemp && summary && icon;

  const success = position => {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    axios
      .post('/addPos', { lat: latitude, lng: longitude })
      .then(res => {
        if (res && res.data && res.data.temp) {
          currentTemp = res.data.temp;
          summary = res.data.summary;
          icon = res.data.icon;
          sessionStorage.setItem('showLocalWeather', 'true');
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

  // TODO: right now, this only gets the first matching city from the big _cities array. Need to optimize so that user can choose from multiple candidate cities.
  const addCity = () => {
    if (!enteredCity) {
      alert('Error: you must enter a city name. Please try again.');
      return;
    }
    const city = _cities.filter(
      _city => _city.name.toLowerCase() === enteredCity.toLowerCase(),
    )[0];

    if (!city) {
      alert('Error: invalid city name. Please try again.');
      return;
    }

    const { country, name, lat, lng } = city;

    const newCityObj = {
      id: v4(),
      name,
      slug: slugify(name),
      country,
      geocoords: {
        lat,
        lng,
      },
    };
    // if (localStorage.getItem('additionalCities')) {
    //   const newCities = [
    //     ...JSON.parse(localStorage.getItem('additionalCities')),
    //     newCityObj,
    //   ];
    //   localStorage.setItem('additionalCities', JSON.stringify(newCities));
    // } else {
    //   localStorage.setItem('additionalCities', JSON.stringify([newCityObj]));
    // }
    cities = [...cities, newCityObj];
    enteredCity = '';

    axios.post('/addCities', { city: newCityObj });
  };

  onMount(async () => {
    const showLocalWeather =
      sessionStorage.getItem('showLocalWeather') === 'true';
    if (showLocalWeather) {
      await getWeather();
    }
  });
</script>

<svelte:head>
  <title>Cities</title>
</svelte:head>

<div class="cities text-center">
  <h2 class="text-center text-3xl font-bold mb-10">Cities</h2>

  <h3>Add New City:</h3>

  <div class="location-input-container">
    <label for="city-input">
      <input
        class="border-black border"
        id="city-input"
        type="text"
        placeholder="Enter City Name"
        bind:value={enteredCity} />
    </label>
    <button on:click={addCity} class={`${buttonStyle}`}>Add</button>
  </div>

  <ul class="cities-links mb-12">
    {#each cities as { slug, name }}
      <li class="mb-4 text-xl">
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

  <button
    on:click={getWeather}
    class={`get-my-weather-button mb-10 ${buttonStyle} ${localDataIsPopulated ? 'opacity-50 cursor-not-allowed' : ''}`}
    disabled={localDataIsPopulated}>
    Get My Weather
  </button>

  {#if localDataIsPopulated}
    <div class="my-weather-results">
      <img
        src={iconSrc}
        alt={icon}
        title={icon}
        class="my-0 mx-auto h-28 w-28" />
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
