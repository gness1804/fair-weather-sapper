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
  import sortAlpha from '../../helpers/sortAlpha';
  import getTempColor from '../../data/getTempColor';

  const citiesFromJSON = require('cities.json');

  export let cities;

  let loading = false;
  let currentTemp;
  let summary;
  let icon;
  let candidateCities = [];
  let selectedCity;

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

  const showCandidateCities = () => {
    if (!enteredCity) {
      return;
    }
    candidateCities = citiesFromJSON
      .filter(_city => _city.name.toLowerCase() === enteredCity.toLowerCase())
      .map(_city => Object.assign({}, _city, { id: v4() }));
    [selectedCity] = candidateCities;
  };

  const addCity = () => {
    if (!selectedCity) {
      alert('Error: you must enter a city name. Please try again.');
      return;
    }
    const { country, name, lat, lng, id } = selectedCity;
    const newCityObj = {
      id,
      name,
      slug: slugify(name),
      country,
      geocoords: {
        lat,
        lng,
      },
    };
    cities = [...cities, newCityObj];
    enteredCity = '';
    selectedCity = null;
    candidateCities = [];
    axios.post('/addCities', { city: newCityObj });
  };

  const deleteCity = id => {
    axios.post('/deleteCity', { id });
    cities = cities.filter(_city => _city.id !== id);
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

  <h3 class="mb-6 text-xl">Add New City:</h3>

  <div class="location-input-container mb-12">
    <div
      class="location-input-container-top-inputs flex flex-row justify-center
      items-center mb-4">
      <label for="city-input" class="mr-3">
        <input
          class="border-black border"
          id="city-input"
          type="text"
          placeholder="Enter City Name"
          on:blur={showCandidateCities}
          bind:value={enteredCity} />
      </label>
      {#if candidateCities.length > 0}
        <select bind:value={selectedCity}>
          {#each candidateCities as candidate}
            <option class="candidate-option" value={candidate}>
              {candidate.name} - {candidate.country}
            </option>
          {/each}
        </select>
      {/if}
    </div>
    <button
      on:click={addCity}
      class={`add-city-button ${buttonStyle} ${!enteredCity ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={!enteredCity}>
      Add
    </button>
  </div>

  <ul class="cities-links mb-12">
    {#each sortAlpha(cities) as { slug, name, id }}
      <li class="mb-4 text-xl">
        <a
          class="text-blue-600 hover:text-blue-400"
          rel="prefetch"
          title={name}
          href="cities/{slug}">
          {name}
        </a>
        {#if String(id).length > 2}
          <span
            on:click={() => deleteCity(id)}
            class="delete-city-button cursor-pointer text-red-700"
            title={`Delete ${name}`}>
            X
          </span>
        {/if}
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
      <p class="current-temp-title">Your current temperature is:</p>
      <p
        class={`current-temp-value-display text-5xl text-${convertedTempColor} mb-6`}>
        {convertedTemp} &deg; F
      </p>
      <p class="conditions-display text-2xl">
        Your current weather is: {summary}
      </p>
    </div>
  {:else if loading}
    <p>Loading...</p>
  {/if}

</div>
