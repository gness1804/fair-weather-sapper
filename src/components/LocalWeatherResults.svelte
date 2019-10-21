<script>
  export let iconSrc;
  export let icon;
  export let currentTempColor;
  export let currentTemp;
  export let currentTempCelsius;
  export let summary;
  export let tempType = 'F';

  $: tempToShow = tempType === 'C' ? currentTempCelsius : currentTemp;
</script>

<img src={iconSrc} alt={icon} title={icon} class="my-0 mx-auto h-28 w-28" />
<p data-cy="current-temp-title">Your current temperature is:</p>
<p
  class="text-5xl mb-6"
  class:t-cold={currentTempColor === 'cold'}
  class:t-cool={currentTempColor === 'cool'}
  class:t-ideal={currentTempColor === 'ideal'}
  class:t-hot={currentTempColor === 'hot'}
  class:t-boiling={currentTempColor === 'boiling'}
  data-cy="current-temp-value-display">
  {tempToShow} &deg; {tempType}
</p>
<p class="text-2xl" data-cy="conditions-display">
  Your current weather is: {summary}
</p>
