<script context="module">
  export async function preload({ params }) {
    const [country, state] = params.loc;
    let res;
    if (state) {
      res = await this.fetch(`/${country}/${state}/custom.json`);
    } else {
      res = await this.fetch(`/${country}/custom.json`);
    }
    const parsedRes = await res.json();

    if (res.status === 200) {
      return {
        data: parsedRes,
        stateName: state,
        countryName: country,
      };
    }
    return this.error(res.status, parsedRes.message);
  }
</script>

<script>
  import CitiesTable from '../../components/CitiesTable.svelte';

  export let data = [];
  export let countryName = 'Country Search';
  export let stateName;

  $: isAmerica = countryName.toUpperCase() === 'US';
</script>

<svelte:head>
  <title>{countryName.toUpperCase()}</title>
</svelte:head>

{#if stateName}
  <p
    class="font-bold text-2xl text-center mb-6"
    data-cy="state-results-for-message">
    Results for {stateName.toUpperCase()}, {countryName.toUpperCase()}
  </p>
{:else}
  <p
    class="font-bold text-2xl text-center mb-6"
    data-cy="country-results-for-message">
    Results for {countryName.toUpperCase()}
  </p>
{/if}

{#if stateName}
  {#if data.length > 0}
    <CitiesTable isAmerica {data} />
  {:else}
    <p class="text-red-600" data-cy="state-error-message">
      Error: invalid state name. Please try again.
    </p>
  {/if}
{:else if data.length > 0}
  <CitiesTable {isAmerica} {data} />
{:else}
  <p class="text-red-600" data-cy="country-error-message">
    Error: invalid country name. Please try again.
  </p>
{/if}
