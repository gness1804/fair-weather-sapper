<script context="module">
  export async function preload({ params }) {
    const [country] = params.loc;
    const countryRes = await this.fetch(`${country}.json`);
    const parsedCountryRes = await countryRes.json();

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

  $: isAmerica = country.toUpperCase() === 'US';
</script>

<svelte:head>
  <title>{country.toUpperCase()}</title>
</svelte:head>

<div class="custom-page">
  <p class="country-results-for-message font-bold text-2xl text-center mb-6">
    Results for {country.toUpperCase()}
  </p>

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
        <!-- TODO: add slug programmatically to data in [country].json -->
        {#each countryData as { name, state, lat, lng, slug }}
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
