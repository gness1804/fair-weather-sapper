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
  import CitiesTable from '../../components/CitiesTable.svelte';

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

  {#if stateName}
    {#if stateData.length > 0}
      <CitiesTable isAmerica data={stateData} />
    {:else}
      <p class="state-error-message text-red-600">
        Error: invalid state name. Please try again.
      </p>
    {/if}
  {:else if countryData.length > 0}
    <CitiesTable {isAmerica} data={countryData} />
  {:else}
    <p class="country-error-message text-red-600">
      Error: invalid country name. Please try again.
    </p>
  {/if}

</div>
