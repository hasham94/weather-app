<script setup lang="ts">
import { ref } from 'vue';
import { useOpenMeteo } from '@/composables/useOpenMeteo';
import HomeWeatherTable from '@/components/home/HomeWeatherTable.vue';

const { weatherData, getWeatherData } = useOpenMeteo();

// i am using lisbon as default
const latitude = ref(38.713);
const longitude = ref(-9.139);

getWeatherData(latitude.value, longitude.value)

</script>

<template>
  <main>
    <div v-if="weatherData.length > 0">
      <HomeWeatherTable :weather-data="weatherData"/>
    </div>
  </main>
</template>
