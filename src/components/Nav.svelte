<script>
  import TestingBanner from './TestingBanner.svelte';
  import sortAlpha from '../helpers/sortAlpha';

  import { tempType } from '../stores/mainStore';

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
      document.querySelector('.countries-list').classList.remove('hide');
    }
  };

  const handleMouseout = () => {
    if (typeof document !== 'undefined') {
      document.querySelector('.countries-list').classList.add('hide');
    }
  };

  const handleOnChange = e => {
    tempType.set(e.target.value);
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

  <div class="temp-type-selector-wrapper">
    <select on:change={handleOnChange} class="temp-type-selector">
      <option value="F">&deg; F</option>
      <option value="C">&deg; C</option>
    </select>
  </div>

  <div
    class="country-links-list-wrapper"
    on:mouseover={handleMouseover}
    on:mouseout={handleMouseout}>
    <p
      class={`choose-a-country-label country-links-list-link ${/^[a-z]{2}$/.test(segment) ? 'selected-lite' : ''}`}>
      Choose a Country:
    </p>
    <ul class="countries-list hide absolute z-50 mt-0 h-0">
      {#each sortAlpha(countries) as { code, name }}
        <li class="p-1" on:mouseover={handleMouseover}>
          <a
            class={`country-nav-link country-links-list-link ${segment === code.toLowerCase() ? 'selected-lite' : ''}`}
            rel="preload"
            href={`${code.toLowerCase()}/custom`}>
            {name}
          </a>
        </li>
      {/each}
    </ul>
  </div>
</nav>
