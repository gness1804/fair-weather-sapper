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
  <p class="current-temp-title">Your current temperature is:</p>
  <p
    class={`current-temp-value-display text-5xl text-${currentTempColor} mb-6`}>
    {currentTemp} &deg; {tempType}
  </p>
  <p class="conditions-display text-2xl">Your current weather is: {summary}</p>
</div>
