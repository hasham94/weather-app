<script setup lang="ts">
import { ref } from 'vue';
import { useOpenMeteo } from '@/composables/useOpenMeteo';
import HomeWeatherTable from '@/components/home/HomeWeatherTable.vue';
import { Location } from '@/domain/entities/Location';

const { weatherData, getWeatherData } = useOpenMeteo();

// i am using lisbon as default
const latitude = ref(38.713);
const longitude = ref(-9.139);

const fetchLocationData = () => {
  const locationPointer = Location.create(latitude.value, longitude.value)
  getWeatherData(locationPointer)
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
          type="number" 
          min="-90" 
          max="90" 
          step="0.0001"
        />

        <input 
          id="longitude" 
          v-model.number="longitude" 
          type="number" 
          min="-180" 
          max="180" 
          step="0.0001"
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
