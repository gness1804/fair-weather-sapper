<script>
  import TestingBanner from './TestingBanner.svelte';

  export let segment;
  const isTesting = process.env.TESTING === 'true';

  const selected = 'font-bold bg-gray-200';
  const linkStyle =
    'text-black block py-4 px-2 no-underline hover:bg-gray-100 hover:underline hover:text-black';
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

<nav class="border-b border-reddish font-light py-0 px-4">
  <ul class="m-0 p-0">
    <li class="inline-block">
      <a
        class={`${segment === undefined ? `${selected}` : ''} ${linkStyle}`}
        href=".">
        home
      </a>
    </li>
    <li class="inline-block">
      <a
        rel="prefetch"
        class={`${segment === 'cities' ? `${selected}` : ''} ${linkStyle}`}
        href="cities">
        cities
      </a>
    </li>
  </ul>
</nav>
