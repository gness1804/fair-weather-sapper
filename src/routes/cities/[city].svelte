<script context="module">
  export async function preload({ params }) {
    const res = await this.fetch(`cities/${params.city}.json`);
    const parsedRes = await res.json();

    if (res.status === 200) {
      return { data: parsedRes };
    }
    return this.error(res.status, parsedRes.message);
  }
</script>

<script>
  import WeatherDisplay from '../../components/WeatherDisplay.svelte';

  export let data = {};
</script>

<svelte:head>
  <title>{data.name} Weather</title>
</svelte:head>

<div class="text-center">
  <h2 class="city-page-header font-bold text-gray-600 text-3xl mb-8">
    {data.name} Weather
  </h2>

  <WeatherDisplay {data} />
</div>
