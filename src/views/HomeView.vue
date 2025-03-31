<script setup lang="ts">
import { ref } from 'vue';
import { useOpenMeteo } from '@/composables/useOpenMeteo';
import HomeWeatherTable from '@/components/home/HomeWeatherTable.vue';
import { Location } from '@/domain/entities/Location';
import { formatedDate } from "@/utils/dateHelper"

const { weatherData, getWeatherData } = useOpenMeteo();

// i am using lisbon as default
const latitude = ref(38.713);
const longitude = ref(-9.139);
const startDate = ref<Date>(formatedDate(new Date()))
const endDate = ref<Date>(formatedDate(new Date()))

const fetchLocationData = () => {
  const locationPointer = Location.create(latitude.value, longitude.value)
  getWeatherData(locationPointer)
}

const getUserCurrentLocation = () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      if (!position?.coords) return
      latitude.value = parseFloat(position.coords.latitude?.toFixed(3));
      longitude.value = parseFloat(position.coords.longitude?.toFixed(3));
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
    <div class="flex items-center p-2 gap-2">
      <input class="bg-white px-3 py-2 w-48 max-w-full" placeholder="latitude" id="latitude" v-model.number="latitude"
        type="number" min="-90" max="90" step="0.0001" />

      <input class="bg-white px-3 py-2 w-48 max-w-full" placeholder="longitude" id="longitude" v-model.number="longitude"
        type="number" min="-180" max="180" step="0.0001" />
      <button class="bg-gray-300 px-3 py-2 rounded cursor-pointer" @click="fetchLocationData">Search</button>
      <button class="bg-white px-3 py-2 cursor-pointer" @click="getUserCurrentLocation">
        use current location
      </button>
    </div>

    <div class="p-2">
      <p class="mb-1">Time Interval</p>
      <div class="flex gap-2">
        <input class="bg-white p-2 rounded w-48" type="date" v-model="startDate" />
        <input class="bg-white p-2 rounded w-48" type="date" v-model="endDate" />
      </div>
    </div>

    <div v-if="weatherData.length > 0">
      <HomeWeatherTable :weather-data="weatherData" />
    </div>
  </main>
</template>
