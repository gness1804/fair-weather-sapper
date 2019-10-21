<script>
  export let data = [];
  export let isAmerica = false;
</script>

<table
  class="border-2 border-gray-600 mx-auto my-0"
  data-cy="cities-result-table">
  <thead class="bg-gray-400">
    <tr>
      <th class="text-xl" colspan={isAmerica ? '4' : '3'}>Cities:</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Name</td>
      {#if isAmerica}
        <td>State</td>
      {/if}
      <td>Latitude</td>
      <td>Longitude</td>
    </tr>

    {#each data as { name, state, slug, geocoords: { lat, lng } }}
      <tr>
        <td data-cy="cities-result-table-name">
          <a data-cy="cities-result-table-name-link" href={`/cities/${slug}`}>
            {name}
          </a>
        </td>
        {#if isAmerica}
          <td data-cy="cities-result-table-state">
            <a
              data-cy="cities-result-table-state-link"
              href={`/us/${state.toLowerCase()}/custom`}>
              {state}
            </a>
          </td>
        {/if}
        <td>{Number(lat).toFixed(2)}</td>
        <td>{Number(lng).toFixed(2)}</td>
      </tr>
    {/each}
  </tbody>
</table>
