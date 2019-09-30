<script context="module">
  export async function preload({ params }) {
    const res = await this.fetch(`cities/${params.city}.json`);
    const parsedRes = await res.json();

    if (res.status === 200) {
      return { data: parsedRes.data, cityName: parsedRes.data.name };
    }
    return this.error(res.status, parsedRes.message);
  }
</script>

<script>
  export let data;
  export let cityName;

  $: currentData = data.currently;
</script>

<svelte:head>
  <title>{cityName} Weather</title>
</svelte:head>

<div class="text-center">
  <h2 class="font-bold text-gray-600">{cityName} Weather</h2>

  <p>{Math.round(currentData.temperature)} &deg;</p>

  <h3>The weather is {currentData.summary}</h3>
</div>
