<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Weather } from '@/domain/entities/Weather';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const props = defineProps<{
    weatherData: Weather[];
}>();

const chartCanvas = ref<HTMLCanvasElement | null>(null);
let chart: Chart | null = null;

const labels = ref<string[]>([]);
const temperatureData = ref<number[]>([]);

const processWeatherData = () => {
    labels.value = [];
    temperatureData.value = [];

    props.weatherData.forEach((weather) => {
        labels.value.push(weather.date);
        temperatureData.value.push(weather.temperature.value);
    });
};

const loadWeatherChart = () => {
    processWeatherData();

    if (chart) {
        chart.destroy();
    }

    const ctx = chartCanvas.value?.getContext('2d');
    if (!ctx) return;

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels.value,
            datasets: [
                {
                    label: 'Temperature (Celcius)',
                    data: temperatureData.value,
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.1)',
                    tension: 0.1,
                    fill: true,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Temperature (Celcius)',
                    },
                },
                x: {
                    title: {
                        display: true,
                        text: 'Date/Time',
                    },
                },
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            return `${context.dataset.label}: ${context?.raw?.toFixed(1)} Celcius`;
                        },
                    },
                },
            },
        },
    });
};

onMounted(() => {
    loadWeatherChart();
});

onBeforeUnmount(() => {
    if (chart) {
        chart.destroy();
    }
});
</script>

<template>
    <div>
        <canvas class="!w-full h-[500px]" ref="chartCanvas"></canvas> <!-- Chart.js Canvas -->
    </div>
</template>
