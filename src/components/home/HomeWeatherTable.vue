<script setup lang="ts">
import { Weather } from '@/domain/entities/Weather';
import { computed, ref } from 'vue';

const props = defineProps<{
  weatherData: Weather[];
}>();

const showMore = ref<boolean>(false)
const isShowMoreButtonVisible = computed(() => props.weatherData?.length > 24)

</script>

<template>
  <div v-if="weatherData.length > 0" class="p-4">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th class="text-left px-6 py-3">Time</th>
          <th class="text-left px-6 py-3">Temprature</th>
          <th class="text-left px-6 py-3">Chances of Raining</th>
        </tr>
      </thead>
      <tbody>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
          v-for="(weather, index) in weatherData?.slice(0, showMore ? weatherData.length : 24)" :key="index">
          <td class="px-6 py-4">{{ weather.date }}</td>
          <td class="px-6 py-4">{{ `${weather.temperature.value} ${weather.temperature.unit}` }}</td>
          <td class="px-6 py-4">{{ weather.rainChances }}mm</td>
        </tr>
      </tbody>
    </table>

    <button @click="showMore = !showMore" v-if="isShowMoreButtonVisible"
      class="bg-white w-38 mt-3 block p-2 rounded-full mx-auto cursor-pointer">{{ showMore ? 'show less' : 'show more'
      }}</button>
  </div>
</template>
