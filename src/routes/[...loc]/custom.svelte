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
</script>

<svelte:head>
  <title>{country.toUpperCase()}</title>
</svelte:head>

<div class="custom">
  <p class="country-results-for-message">Results for {country.toUpperCase()}</p>

  {#if countryData.length > 0}
    <p>We have country data!</p>
  {:else}
    <p class="country-error-message text-red-600">
      Error: invalid country code. Please try again.
    </p>
  {/if}
</div>
