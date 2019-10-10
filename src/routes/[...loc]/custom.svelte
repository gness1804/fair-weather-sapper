<script context="module">
  export function preload({ params }) {
    const [country, city] = params.loc;
    return { country, city };
  }
</script>

<script>
  // eslint-disable-next-line import/no-extraneous-dependencies
  import axios from 'axios';

  export let country;
  export let city;

  const getFilteredCities = async () => {
    try {
      const res = await axios.post('/filteredCities', { country });
      if (
        res &&
        res.data &&
        res.data.filteredCities &&
        res.data.filteredCities.length > 0
      ) {
        return res.data.filteredCities;
      }
      throw new Error(
        'Bad data returned from server call to /filteredCities. Please enter a valid city term and try again.',
      );
    } catch (error) {
      throw new Error(`Error in server call to /filteredCities: ${error}`);
    }
  };

  const filteredCities = getFilteredCities();
</script>

<div id="loc-landing-page">
  {#if city}
    <h2 class="custom-page-header">{city}, {country} Results</h2>
  {:else}
    <h2 class="custom-page-header">Results for {country.toUpperCase()}</h2>
  {/if}

  {#await filteredCities}
    <p>Loading your cities...</p>
  {:then data}
    Yay, we have city data! {data}
  {:catch error}
    <p class="cities-error-message text-red-600">{error.message}</p>
  {/await}
</div>
