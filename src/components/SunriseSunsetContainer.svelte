<script>
  export let sunriseTime;
  export let sunsetTime;
</script>

<div class="sunrise-sunset-container flex justify-between">
  <div class="sunrise flex items-center justify-center">
    <div class="h-10 w-10 mr-2 md:mr-4">
      <img src="sunrise.png" alt="Sun rising." />
    </div>
    <span class="sunrise-time text-base md:text-xl">{sunriseTime}</span>
  </div>
  <div class="sunset flex items-center justify-center">
    <div class="h-10 w-10 mr-2 md:mr-4">
      <img src="sunset.png" alt="Sun setting." />
    </div>
    <span class="sunset-time text-base md:text-xl">{sunsetTime}</span>
  </div>
</div>
