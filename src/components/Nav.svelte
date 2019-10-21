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
      document
        .querySelector('ul[data-cy="countries-list"]')
        .classList.remove('hide');
    }
  };

  const handleMouseout = () => {
    if (typeof document !== 'undefined') {
      document
        .querySelector('ul[data-cy="countries-list"]')
        .classList.add('hide');
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
        class={`text-black block py-4 px-2 no-underline hover:underline hover:text-black hover:bg-gray-100 ${segment === undefined ? 'selected' : ''}`}
        href="."
        data-cy="nav-bar-link">
        home
      </a>
    </li>
    <li class="inline-block">
      <a
        rel="prefetch"
        class={`text-black block py-4 px-2 no-underline hover:underline hover:text-black hover:bg-gray-100 ${segment === 'cities' ? 'selected' : ''}`}
        href="cities"
        data-cy="nav-bar-link">
        cities
      </a>
    </li>
  </ul>

  <select on:change={handleOnChange} data-cy="temp-type-selector">
    <option value="F">&deg; F</option>
    <option value="C">&deg; C</option>
  </select>

  <div
    class="hover:cursor-pointer"
    on:mouseover={handleMouseover}
    on:mouseout={handleMouseout}>
    <p
      class={`hover:underline ${/^[a-z]{2}$/.test(segment) ? 'selected-lite' : ''}`}
      data-cy="choose-a-country-label">
      Choose a Country:
    </p>
    <ul class="hide absolute z-50 mt-0 h-0" data-cy="countries-list">
      {#each sortAlpha(countries) as { code, name }}
        <li class="p-1 z-50 bg-white" on:mouseover={handleMouseover}>
          <a
            class={`hover:underline z-50 ${segment === code.toLowerCase() ? 'selected-lite' : ''}`}
            data-cy="country-nav-link"
            rel="preload"
            href={`${code.toLowerCase()}/custom`}>
            {name}
          </a>
        </li>
      {/each}
    </ul>
  </div>
</nav>
