<script context="module">
  export async function preload({ params }) {
    const [country, state] = params.loc;

    const countryRes = await this.fetch(`[..loc]/${country}.json`);
    const parsedCountryRes = await countryRes.json();

    if (state) {
      const stateRes = await this.fetch(`[..loc]/st-${state}.json`);
      const parsedStateRes = await stateRes.json();

      if (countryRes.status === 200 && stateRes.status === 200) {
        return {
          countryData: parsedCountryRes,
          country,
          stateData: parsedStateRes,
          stateName: state,
        };
      }
      return this.error(
        countryRes.status,
        parsedCountryRes.message,
        stateRes.status,
        parsedStateRes.message,
      );
    }

    if (countryRes.status === 200) {
      return { countryData: parsedCountryRes, country };
    }
    return this.error(countryRes.status, parsedCountryRes.message);
  }
</script>

<script>
  export let countryData = [];
  export let country = 'Country Search';
  export let stateData = [];
  export let stateName;

  $: isAmerica = country.toUpperCase() === 'US';
</script>

<svelte:head>
  <title>{country.toUpperCase()}</title>
</svelte:head>

<div class="custom-page">
  {#if stateName}
    <p class="state-results-for-message font-bold text-2xl text-center mb-6">
      Results for {stateName.toUpperCase()}, {country.toUpperCase()}
    </p>
  {:else}
    <p class="country-results-for-message font-bold text-2xl text-center mb-6">
      Results for {country.toUpperCase()}
    </p>
  {/if}

  {#if countryData.length > 0}
    <table class="cities-result-table border-2 border-gray-600 mx-auto my-0">
      <thead class="bg-gray-400">
        <tr>
          <th class="text-xl" colspan={isAmerica ? '4' : '3'}>Cities:</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Name</td>
          {#if isAmerica}
            <td>State</td>
          {/if}
          <td>Latitude</td>
          <td>Longitude</td>
        </tr>

        {#each countryData as { name, state, slug, geocoords: { lat, lng } }}
          <tr>
            <td class="cities-result-table-name">
              <a
                class="cities-result-table-name-link-wrapper"
                href={`/cities/${slug}`}>
                {name}
              </a>
            </td>
            {#if isAmerica}
              <td class="cities-result-table-state">{state}</td>
            {/if}
            <td class="cities-result-table-lat">{Number(lat).toFixed(2)}</td>
            <td class="cities-result-table-lng">{Number(lng).toFixed(2)}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {:else}
    <p class="country-error-message text-red-600">
      Error: invalid country code. Please try again.
    </p>
  {/if}
</div>
