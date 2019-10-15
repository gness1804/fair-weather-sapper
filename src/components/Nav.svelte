<script>
  import TestingBanner from './TestingBanner.svelte';

  export let segment;
  const isTesting = process.env.TESTING === 'true';

  const countries = ['US', 'FR', 'DE', 'NL', 'MX', 'SN', 'ES', 'UK'];
</script>

<style>
  /* clearfix */
  ul::after {
    content: '';
    display: block;
    clear: both;
  }

  .countries-list {
    display: none;
  }

  .country-links-list-wrapper:hover .countries-list {
    display: block;
  }
</style>

{#if isTesting}
  <TestingBanner />
{/if}

<nav
  class="border-b border-reddish font-light py-0 px-4 flex items-center
  justify-between">
  <ul class="hero-links-left m-0 p-0">
    <li class="inline-block">
      <a
        class={`nav-bar-link ${segment === undefined ? 'selected' : ''}`}
        href=".">
        home
      </a>
    </li>
    <li class="inline-block">
      <a
        rel="prefetch"
        class={`nav-bar-link ${segment === 'cities' ? 'selected' : ''}`}
        href="cities">
        cities
      </a>
    </li>
  </ul>

  <div class="country-links-list-wrapper">
    <p>Choose a Country:</p>
    <ul class="countries-list absolute z-50">
      {#each countries.sort() as country}
        <li>
          <a href={`${country.toLowerCase()}/custom`}>{country}</a>
        </li>
      {/each}
    </ul>
  </div>
</nav>
