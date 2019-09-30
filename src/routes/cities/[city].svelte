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
  import getTempColor from '../../data/getTempColor';

  export let data;
  export let cityName;

  $: currentData = data.currently;
  $: temp = Math.round(parseFloat(currentData.temperature));
  $: tempColor = getTempColor(temp);
</script>

<svelte:head>
  <title>{cityName} Weather</title>
</svelte:head>

<div class="text-center">
  <h2 class="font-bold text-gray-600 text-3xl mb-8">{cityName} Weather</h2>

  <p class={`text-5xl text-${tempColor}`}>{temp} &deg; F</p>

  <h3>The weather is {currentData.summary}</h3>
</div>
