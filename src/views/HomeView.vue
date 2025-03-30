<script setup lang="ts">
import { useOpenMeteo } from '@/composables/useOpenMeteo';

const { weatherData, getWeatherData } = useOpenMeteo();

getWeatherData()

</script>

<template>
  <main>
    <div v-if="weatherData.length > 0">
      <div v-for="(weather, index) in weatherData" :key="index">
            <p>{{ weather.date }}</p>
            <p>{{ weather.temperature }}</p>
            <p>
              {{ weather.isForecast ? 'Forecast' : 'Historical' }}
            </p>
          </div>
    </div>
  </main>
</template>
