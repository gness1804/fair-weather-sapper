<script context="module">
  export async function preload({ params }) {
    const res = await this.fetch(`cities/${params.city}.json`);
    const parsedRes = await res.json();

    if (res.status === 200) {
      return { data: parsedRes.data, cityName: parsedRes.data.name };
    }
    return this.error(res.status, parsedRes.message);
  }
</script>

<script>
  import getTempColor from '../../data/getTempColor';

  export let data;
  export let cityName;

  $: currentData = data.currently;
  $: dailyData = data.daily;

  $: currentTemp = Math.round(parseFloat(currentData.temperature));
  $: currentTempColor = getTempColor(currentTemp);

  $: dailyHighTemp = Math.round(parseFloat(dailyData.data[0].temperatureHigh));
  $: dailyHighTempColor = getTempColor(dailyHighTemp);

  $: dailyLowTemp = Math.round(parseFloat(dailyData.data[0].temperatureLow));
  $: dailyLowTempColor = getTempColor(dailyLowTemp);

  $: sunriseTime = new Date(
    parseFloat(dailyData.data[0].sunriseTime) * 1000,
  ).toLocaleTimeString();
  $: sunsetTime = new Date(
    parseFloat(dailyData.data[0].sunsetTime) * 1000,
  ).toLocaleTimeString();
</script>

<svelte:head>
  <title>{cityName} Weather</title>
</svelte:head>

<div class="text-center">
  <h2 class="font-bold text-gray-600 text-3xl mb-8">{cityName} Weather</h2>

  <p class={`text-5xl text-${currentTempColor} mb-6`}>{currentTemp} &deg; F</p>

  <p class="mb-6">
    The weather is {currentData.summary} with a {Math.round(currentData.precipProbability)}%
    chance of rain.
  </p>

  <h3 class="text-2xl">Today:</h3>

  <div class="high-low-temps-container">
    <div class="high-temp">
      <img src="" alt="Up arrow." />
      <span class={`text-${dailyHighTempColor}`}>{dailyHighTemp} &deg;</span>
    </div>
    <div class="low-temp">
      <img src="" alt="Down arrow." />
      <span class={`text-${dailyLowTempColor}`}>{dailyLowTemp} &deg;</span>
    </div>
  </div>

  <div class="sunrise-sunset-container">
    <div class="sunrise">
      <img src="" alt="Sun rising." />
      <span>{sunriseTime}</span>
    </div>
    <div class="sunset">
      <img src="" alt="Sun setting." />
      <span>{sunsetTime}</span>
    </div>
  </div>
</div>
