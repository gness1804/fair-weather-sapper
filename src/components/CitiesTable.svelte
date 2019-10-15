<script>
  export let data = [];
  export let isAmerica = false;
</script>

<table class="cities-result-table border-2 border-gray-600 mx-auto my-0">
  <thead class="bg-gray-400">
    <tr>
      <th class="text-xl" colspan={isAmerica ? '4' : '3'}>Cities:</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Name</td>
      {#if isAmerica}
        <!-- TODO: add state link here. -->
        <td>State</td>
      {/if}
      <td>Latitude</td>
      <td>Longitude</td>
    </tr>

    {#each data as { name, state, slug, geocoords: { lat, lng } }}
      <tr>
        <td class="cities-result-table-name">
          <a
            class="cities-result-table-name-link-wrapper"
            href={`/cities/${slug}`}>
            {name}
          </a>
        </td>
        {#if isAmerica}
          <td class="cities-result-table-state">{state}</td>
        {/if}
        <td class="cities-result-table-lat">{Number(lat).toFixed(2)}</td>
        <td class="cities-result-table-lng">{Number(lng).toFixed(2)}</td>
      </tr>
    {/each}
  </tbody>
</table>
