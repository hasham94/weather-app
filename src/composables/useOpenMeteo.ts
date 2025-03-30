import { ref } from 'vue'

export function useOpenMeteo() {
    const weatherData = ref([])

    const BASE_URL = `https://api.open-meteo.com/v1/forecast`;

    const getWeatherData = async () => {
        weatherData.value = []

        const startDate = new Date();
            startDate.setDate(startDate.getDate() - 7);
            
            const endDate = new Date();
            endDate.setDate(endDate.getDate() + 7);

            const params = new URLSearchParams({
                latitude: "39.3999",
                longitude: "8.2245",
                hourly: "temperature_2m",
                start_date: startDate.toLocaleDateString('en-CA'),
                end_date: endDate.toLocaleDateString('en-CA'),
                temperature_unit: "celsius"
            });

            const response = await fetch(`${BASE_URL}?${params.toString()}`);
            
            if (!response.ok) {
                return
            }

            weatherData.value = await response.json();
            
    }

    return {
        weatherData,
        getWeatherData
    };
}