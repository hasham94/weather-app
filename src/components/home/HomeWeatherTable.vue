<script setup lang="ts">
import { Weather } from '@/domain/entities/Weather';

const props = defineProps<{
  weatherData: Weather[];
}>();

</script>

<template>
    <div v-if="weatherData.length > 0">
      <div v-for="(weather, index) in weatherData" :key="index">
            <p>{{ weather.date }}</p>
            <p>{{ weather.temperature }}</p>
            <p>
              {{ weather.isForecast ? 'Forecast' : 'Historical' }}
            </p>
          </div>
    </div>
</template>
