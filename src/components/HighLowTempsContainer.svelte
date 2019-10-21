<script>
  export let dailyHighTempColor;
  export let dailyHighTemp;
  export let dailyLowTempColor;
  export let dailyLowTemp;
</script>

<div class="flex justify-between mb-6">
  <div class="flex items-center justify-center">
    <div class="h-6 w-6 mr-4">
      <img src="arrow-up.png" alt="Up arrow." />
    </div>
    <span class={`text-${dailyHighTempColor} text-2xl`}>
      <span data-cy="high-temp">{dailyHighTemp}</span>
      &deg;
    </span>
  </div>
  <div class="flex items-center justify-center">
    <div class="h-6 w-6 mr-4">
      <img src="arrow-down.png" alt="Down arrow." />
    </div>
    <span class={`text-${dailyLowTempColor} text-2xl`}>
      <span data-cy="low-temp">{dailyLowTemp}</span>
      &deg;
    </span>
  </div>
</div>
