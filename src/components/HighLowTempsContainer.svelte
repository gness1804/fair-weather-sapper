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
    <span
      data-cy="high-temp-wrapper"
      class="text-2xl"
      class:t-cold={dailyHighTempColor === 'cold'}
      class:t-cool={dailyHighTempColor === 'cool'}
      class:t-ideal={dailyHighTempColor === 'ideal'}
      class:t-hot={dailyHighTempColor === 'hot'}
      class:t-boiling={dailyHighTempColor === 'boiling'}>
      <span data-cy="high-temp">{dailyHighTemp}</span>
      &deg;
    </span>
  </div>
  <div class="flex items-center justify-center">
    <div class="h-6 w-6 mr-4">
      <img src="arrow-down.png" alt="Down arrow." />
    </div>
    <span
      data-cy="low-temp-wrapper"
      class="text-2xl"
      class:t-cold={dailyLowTempColor === 'cold'}
      class:t-cool={dailyLowTempColor === 'cool'}
      class:t-ideal={dailyLowTempColor === 'ideal'}
      class:t-hot={dailyLowTempColor === 'hot'}
      class:t-boiling={dailyLowTempColor === 'boiling'}>
      <span data-cy="low-temp">{dailyLowTemp}</span>
      &deg;
    </span>
  </div>
</div>
