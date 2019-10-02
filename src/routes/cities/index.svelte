<script context="module">
  export function preload() {
    return this.fetch('cities.json')
      .then(res => res.json())
      .then(cities => {
        return { cities };
      });
  }
</script>

<script>
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { onMount } from 'svelte';
  import axios from 'axios';

  export let cities;

  let currentTemp;

  const success = position => {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    axios.post('/call', { lat: latitude, lng: longitude }).then(res => {
      currentTemp = res.data.temp;
    });
  };

  onMount(async () => {
    await navigator.geolocation.getCurrentPosition(success);
  });
</script>

<svelte:head>
  <title>Cities</title>
</svelte:head>

<h2 class="text-center text-3xl font-bold mb-10">Cities</h2>

<ul class="cities-links text-center">
  {#each cities as { slug, name }}
    <li class="mb-4">
      <a
        class="text-blue-600 hover:text-blue-400"
        rel="prefetch"
        title={name}
        href="cities/{slug}">
        {name}
      </a>
    </li>
  {/each}
</ul>

{#if currentTemp}
  <p>{currentTemp}</p>
{/if}
