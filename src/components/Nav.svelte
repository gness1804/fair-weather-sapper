<script>
  import TestingBanner from './TestingBanner.svelte';
  import sortAlpha from '../helpers/sortAlpha';

  export let segment;
  const isTesting = process.env.TESTING === 'true';

  const countries = [
    { code: 'US', name: 'United States' },
    { code: 'FR', name: 'France' },
    { code: 'DE', name: 'Germany' },
    { code: 'NL', name: 'Netherlands' },
    { code: 'MX', name: 'Mexico' },
    { code: 'SN', name: 'Senegal' },
    { code: 'ES', name: 'Spain' },
    { code: 'UK', name: 'United Kingdom' },
  ];

  const handleMouseover = () => {
    if (typeof document !== 'undefined') {
      document.querySelector('.countries-list').classList.remove('hidden');
    }
  };

  const handleMouseout = () => {
    if (typeof document !== 'undefined') {
      document.querySelector('.countries-list').classList.add('hidden');
    }
  };
</script>

<style>
  /* clearfix */
  ul::after {
    content: '';
    display: block;
    clear: both;
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

  <div
    class="country-links-list-wrapper"
    on:mouseover={handleMouseover}
    on:mouseout={handleMouseout}>
    <p>Choose a Country:</p>
    <ul class="countries-list hidden absolute z-50 mt-0 h-0">
      {#each sortAlpha(countries) as { code, name }}
        <li on:mouseover={handleMouseover}>
          <a rel="preload" href={`${code.toLowerCase()}/custom`}>{name}</a>
        </li>
      {/each}
    </ul>
  </div>
</nav>
