<script context="module">
  export function preload({ params }) {
    const [country, city] = params.loc;
    return { country, city };
  }
</script>

<script>
  export let country;
  export let city;
</script>

<div id="loc-landing-page">
  {#if city}
    <h2 class="custom-page-header">{city}, {country} Results</h2>
  {:else}
    <h2 class="custom-page-header">Results for {country.toUpperCase()}</h2>
  {/if}
</div>
