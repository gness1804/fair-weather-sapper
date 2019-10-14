<script context="module">
  export function preload() {
    return this.fetch('cities.json')
      .then(res => res.json())
      .then(res => {
        return { cities: res.cities, citiesFromJSON: res.citiesFromJSON };
      });
  }
</script>

<script>
  import axios from 'axios';
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { onMount } from 'svelte';
  import slugify from '../../helpers/slugify';
  import LocalWeatherResults from '../../components/LocalWeatherResults.svelte';

  export let cities;
  export let citiesFromJSON;

  let loading = false;

  let icon;
  let iconSrc;
  let currentTemp;
  let currentTempColor;
  let summary;

  let candidateCities = [];
  let selectedCity;

  let enteredCity;
  let showCandidateCitiesError = false;

  $: localDataIsPopulated =
    icon && iconSrc && currentTemp && currentTempColor && summary;
  $: thereAreUserEnteredCities = cities.find(
    _city => String(_city.id).length > 2,
  );

  const success = position => {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    axios
      .post('/addPos', { lat: latitude, lng: longitude })
      .then(res => {
        if (res && res.data) {
          icon = res.data.icon;
          iconSrc = res.data.iconSrc;
          currentTemp = res.data.currentTemp;
          currentTempColor = res.data.currentTempColor;
          summary = res.data.summary;

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
    candidateCities = citiesFromJSON.filter(
      _city => _city.name.toLowerCase() === enteredCity.toLowerCase(),
    );
    [selectedCity] = candidateCities;
    if (!selectedCity) {
      showCandidateCitiesError = true;
    }
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
    axios.post('/addCities', { city: newCityObj }).catch(err => {
      // eslint-disable-next-line no-console
      console.error(`Error adding a new city: ${err}`);
    });
  };

  const deleteCity = id => {
    axios.post('/deleteCity', { id }).catch(err => {
      // eslint-disable-next-line no-console
      console.error(`Error deleting a city: ${err}`);
    });
    cities = cities.filter(_city => _city.id !== id);
  };

  const resetCities = () => {
    axios.post('/resetCities').catch(err => {
      // eslint-disable-next-line no-console
      console.error(`Error deleting all cities: ${err}`);
    });
    cities = cities.filter(_city => String(_city.id).length <= 2);
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
          id="city-input"
          class={showCandidateCitiesError ? 'error-box' : ''}
          type="text"
          list="cities-list"
          placeholder="Enter City Name"
          on:focus={() => (showCandidateCitiesError = false)}
          on:blur={showCandidateCities}
          bind:value={enteredCity} />
      </label>
      <datalist id="cities-list">
        {#each citiesFromJSON as city}
          <option value={city.name}>{city.name}</option>
        {/each}
      </datalist>
      {#if showCandidateCitiesError}
        <p class="candidate-cities-error-message text-red-600">
          Error: invalid city. Please select one from the list in the input
          field.
        </p>
      {/if}

      {#if candidateCities.length > 0}
        <select class="candidate-cities-select" bind:value={selectedCity}>
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
      class="add-city-button"
      disabled={!enteredCity || showCandidateCitiesError}>
      Add
    </button>
    <button
      class="reset-all-button"
      on:click={resetCities}
      disabled={!thereAreUserEnteredCities}>
      Reset to Defaults
    </button>
  </div>

  <ul class="cities-links mb-12">
    {#each cities as { slug, name, id }}
      <li class="mb-4 text-xl">
        <a rel="prefetch" title={name} href="cities/{slug}">{name}</a>
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
    class="get-my-weather-button mb-10"
    disabled={localDataIsPopulated}>
    Get My Weather
  </button>

  {#if localDataIsPopulated}
    <LocalWeatherResults
      {iconSrc}
      {icon}
      {currentTempColor}
      {currentTemp}
      {summary} />
  {:else if loading}
    <p>Loading...</p>
  {/if}

</div>
