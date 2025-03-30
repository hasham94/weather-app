<script setup lang="ts">
import { ref } from 'vue';
import { useOpenMeteo } from '@/composables/useOpenMeteo';
import HomeWeatherTable from '@/components/home/HomeWeatherTable.vue';

const { weatherData, getWeatherData } = useOpenMeteo();

// i am using lisbon as default
const latitude = ref(38.713);
const longitude = ref(-9.139);

const fetchLocationData = () => {
  getWeatherData(latitude.value, longitude.value)
}

const getUserCurrentLocation = () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      latitude.value = position.coords.latitude;
      longitude.value = position.coords.longitude;
      fetchLocationData();
    },
    (err) => {
      // TODO: error handling here
    }
  );
}

fetchLocationData()
</script>

<template>
  <main>

        <input 
          id="latitude" 
          v-model.number="latitude"
        />

        <input 
          id="longitude" 
          v-model.number="longitude"
        />
        <button @click="fetchLocationData">Search</button>


    <button @click="getUserCurrentLocation">
      current location
    </button>

    <div v-if="weatherData.length > 0">
      <HomeWeatherTable :weather-data="weatherData"/>
    </div>
  </main>
</template>
