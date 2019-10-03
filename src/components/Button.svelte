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

<button on:click={handleClick} class={`button ${styleClass}`}>{text}</button>
