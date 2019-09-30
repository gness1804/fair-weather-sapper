<script context="module">
  export async function preload({ params }) {
    const res = await this.fetch(`cities/${params.city}.json`);
    const data = await res.json();

    if (res.status === 200) {
      return { data };
    }
    return this.error(res.status, data.message);
  }
</script>

<script>
  export let data;
</script>

<!-- <svelte:head>
  <title>{cityName} Weather</title>
</svelte:head> -->
