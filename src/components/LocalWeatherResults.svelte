<script>
  export let iconSrc;
  export let icon;
  export let currentTempColor;
  export let currentTemp;
  export let summary;
  export let tempType = 'F';
</script>

<div class="my-weather-results">
  <img src={iconSrc} alt={icon} title={icon} class="my-0 mx-auto h-28 w-28" />
  <p data-cy="current-temp-title">Your current temperature is:</p>
  <p
    class={`text-5xl text-${currentTempColor} mb-6`}
    data-cy="current-temp-value-display">
    {currentTemp} &deg; {tempType}
  </p>
  <p class="text-2xl" data-cy="conditions-display">
    Your current weather is: {summary}
  </p>
</div>
