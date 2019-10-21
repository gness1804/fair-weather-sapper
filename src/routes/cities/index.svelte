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
  import slugify from '../../helpers/slugify';
  import LocalWeatherResults from '../../components/LocalWeatherResults.svelte';
  import sortAlpha from '../../helpers/sortAlpha';
  import { tempType } from '../../stores/mainStore';

  export let cities;
  export let citiesFromJSON;

  let loading = false;

  let candidateCities = [];
  let selectedCity;

  let enteredCity;
  let showCandidateCitiesError = false;

  let localWeatherData = {};
  let localDataIsPopulated = false;

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
          const {
            icon,
            iconSrc,
            currentTemp,
            currentTempCelsius,
            currentTempColor,
            summary,
          } = res.data;

          localWeatherData = {
            icon,
            iconSrc,
            currentTemp,
            currentTempCelsius,
            currentTempColor,
            summary,
          };
          localDataIsPopulated = true;
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
    // TODO: maybe move to LS/SS
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
</script>

<svelte:head>
  <title>Cities</title>
</svelte:head>

<div class="text-center">
  <h2 class="text-center text-3xl font-bold mb-10">Cities</h2>

  <h3 class="mb-6 text-xl">Add New City:</h3>

  <div class="mb-12">
    <div class="flex flex-row justify-center items-center mb-4">
      <label for="city-input" class="mr-3">
        <input
          id="city-input"
          data-cy="city-input"
          class={showCandidateCitiesError ? 'error-box' : ''}
          type="text"
          list="cities-list"
          placeholder="Enter City Name"
          on:focus={() => (showCandidateCitiesError = false)}
          on:blur={showCandidateCities}
          bind:value={enteredCity} />
      </label>
      <datalist id="cities-list" data-cy="cities-list">
        {#each sortAlpha(citiesFromJSON) as { name }}
          <option value={name}>{name}</option>
        {/each}
      </datalist>
      {#if showCandidateCitiesError}
        <p class="text-red-600" data-cy="candidate-cities-error-message">
          Error: invalid city. Please select one from the list in the input
          field.
        </p>
      {/if}

      {#if candidateCities.length > 0}
        <select bind:value={selectedCity} data-cy="candidate-cities-select">
          {#each candidateCities as candidate}
            <option value={candidate} data-cy="candidate-option">
              {candidate.name} - {candidate.country}
            </option>
          {/each}
        </select>
      {/if}
    </div>
    <button
      on:click={addCity}
      data-cy="add-city-button"
      disabled={!enteredCity || showCandidateCitiesError}>
      Add
    </button>
    <button
      data-cy="reset-all-button"
      on:click={resetCities}
      disabled={!thereAreUserEnteredCities}>
      Reset to Defaults
    </button>
  </div>

  <ul class="mb-12" data-cy="cities-links">
    {#each sortAlpha(cities) as { slug, name, id }}
      <li class="mb-4 text-xl">
        <a rel="prefetch" title={name} href="cities/{slug}">{name}</a>
        {#if String(id).length > 2}
          <span
            on:click={() => deleteCity(id)}
            class="cursor-pointer text-red-700"
            data-cy="delete-city-button"
            title={`Delete ${name}`}>
            X
          </span>
        {/if}
      </li>
    {/each}
  </ul>

  <button
    on:click={getWeather}
    class="mb-10"
    data-cy="get-my-weather-button"
    disabled={localDataIsPopulated}>
    Get My Weather
  </button>

  {#if localDataIsPopulated}
    <LocalWeatherResults {...localWeatherData} tempType={$tempType} />
  {:else if loading}
    <p>Loading...</p>
  {/if}

</div>
