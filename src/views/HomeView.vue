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
  <main class="flex flex-col gap-2 bg-gray-50 rounded">
    <div class="flex flex-col items-start p-2">
      <div class="flex gap-2">
        <input class="bg-white px-3 py-2 w-48 max-w-full" id="latitude" v-model.number="latitude" type="number" min="-90"
          max="90" step="0.0001" />

        <input class="bg-white px-3 py-2 w-48 max-w-full" id="longitude" v-model.number="longitude" type="number"
          min="-180" max="180" step="0.0001" />
        <button class="bg-gray-300 px-4 rounded" @click="fetchLocationData">Search</button>
      </div>

      <button @click="getUserCurrentLocation">
        use current location
      </button>
    </div>

    <div v-if="weatherData.length > 0">
      <HomeWeatherTable :weather-data="weatherData" />
    </div>
  </main>
</template>
