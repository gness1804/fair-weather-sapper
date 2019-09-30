<script context="module">
  export async function preload({ params }) {
    const res = await this.fetch(`cities/${params.city}.json`);
    const data = await res.json();

    if (res.status === 200) {
      return { data, cityName: params.city };
    }
    return this.error(res.status, data.message);
  }
</script>

<script>
  export let data;
  export let cityName;
</script>

<svelte:head>
  <title>{cityName} Weather</title>
</svelte:head>

<h2>{cityName} Weather</h2>

<h3>The weather is {data.data.currently.summary}</h3>
