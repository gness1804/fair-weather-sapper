<script>
  import HighLowTempsContainer from './HighLowTempsContainer.svelte';
  import SunriseSunsetContainer from './SunriseSunsetContainer.svelte';
  import { tempType } from '../stores/mainStore';

  export let data = {};
</script>

<div class="weather-display">
  <img
    src={data.iconSrc}
    alt={data.icon}
    title={data.icon}
    class="my-0 mx-auto h-32 w-32" />

  <p class={`text-5xl text-${data.currentTempColor} mb-6`}>
    <span class="current-temp">
      {$tempType === 'C' ? data.currentTempCelsius : data.currentTemp}
    </span>
    <span class="temp-type-display">&deg; {$tempType}</span>
  </p>

  <p class="current-conditions-message mb-6">
    The weather is {data.summary} with a {Math.round(data.precipProbability)}%
    chance of rain.
  </p>

  <div class="today-container my-0 mx-auto w-most md:w-half">
    <h3 class="text-2xl mb-6">Today:</h3>

    <HighLowTempsContainer
      dailyHighTempColor={data.dailyHighTempColor}
      dailyHighTemp={$tempType === 'C' ? data.dailyHighTempCelsius : data.dailyHighTemp}
      dailyLowTempColor={data.dailyLowTempColor}
      dailyLowTemp={$tempType === 'C' ? data.dailyLowTempCelsius : data.dailyLowTemp} />

    <SunriseSunsetContainer
      sunriseTime={data.sunriseTime}
      sunsetTime={data.sunsetTime} />

  </div>
</div>
