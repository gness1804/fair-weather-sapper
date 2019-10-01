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

  $: sunriseTime = new Date(parseFloat(dailyData.data[0].sunriseTime) * 1000)
    .toLocaleTimeString()
    .replace(/^(\d{1,2}):(\d{2}):\d{2}/, '$1:$2');
  $: sunsetTime = new Date(parseFloat(dailyData.data[0].sunsetTime) * 1000)
    .toLocaleTimeString()
    .replace(/^(\d{1,2}):(\d{2}):\d{2}/, '$1:$2');
</script>

<svelte:head>
  <title>{cityName} Weather</title>
</svelte:head>

<div class="text-center">
  <h2 class="font-bold text-gray-600 text-3xl mb-8">{cityName} Weather</h2>

  <p class={`text-5xl text-${currentTempColor} mb-6`}>
    <span class="current-temp">{currentTemp}</span>
    &deg; F
  </p>

  <p class="current-conditions-message mb-6">
    The weather is {currentData.summary} with a {Math.round(currentData.precipProbability)}%
    chance of rain.
  </p>

  <div class="today-container my-0 mx-auto w-most md:w-half">
    <h3 class="text-2xl mb-6">Today:</h3>

    <div class="high-low-temps-container flex justify-between mb-6">
      <div class="high-temp flex items-center justify-center">
        <div class="h-6 w-6 mr-4">
          <img src="arrow-up.png" alt="Up arrow." />
        </div>
        <span class={`text-${dailyHighTempColor} text-2xl`}>
          {dailyHighTemp} &deg;
        </span>
      </div>
      <div class="low-temp flex items-center justify-center">
        <div class="h-6 w-6 mr-4">
          <img src="arrow-down.png" alt="Down arrow." />
        </div>
        <span class={`text-${dailyLowTempColor} text-2xl`}>
          {dailyLowTemp} &deg;
        </span>
      </div>
    </div>

    <div class="sunrise-sunset-container flex justify-between">
      <div class="sunrise flex items-center justify-center">
        <div class="h-10 w-10 mr-2 md:mr-4">
          <img src="sunrise.png" alt="Sun rising." />
        </div>
        <span class="text-base md:text-xl">{sunriseTime}</span>
      </div>
      <div class="sunset flex items-center justify-center">
        <div class="h-10 w-10 mr-2 md:mr-4">
          <img src="sunset.png" alt="Sun setting." />
        </div>
        <span class="text-base md:text-xl">{sunsetTime}</span>
      </div>
    </div>

  </div>
</div>
