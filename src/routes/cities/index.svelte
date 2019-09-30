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
  export let cities;
</script>

<h2>Cities</h2>

<ul>
  {#each cities as { slug, name }}
    <li>
      <a rel="prefetch" href="cities/{slug}">{name}</a>
    </li>
  {/each}
</ul>
