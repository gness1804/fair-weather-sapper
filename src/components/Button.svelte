<script>
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { createEventDispatcher } from 'svelte';

  export let styleClass = '';
  export let text;

  const dispatch = createEventDispatcher();

  const handleClick = () => {
    dispatch('handleClick');
  };
</script>

<button
  on:click={handleClick}
  class={`button p-2 bg-gray-400 hover:bg-gray-300 shadow ${styleClass}`}>
  {text}
</button>
