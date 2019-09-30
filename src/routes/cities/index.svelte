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

<h2 class="text-center text-3xl font-bold mb-10">Cities</h2>

<ul class="text-center">
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
