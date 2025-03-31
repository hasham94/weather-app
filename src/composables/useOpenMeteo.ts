import { ref } from 'vue'
import { Weather } from '@/domain/entities/Weather';
import { Temperature } from '@/domain/entities/Temprature';
import { Location } from '@/domain/entities/Location';

export function useOpenMeteo() {
    const weatherData = ref<Weather[]>([])

    const BASE_URL = `https://api.open-meteo.com/v1/forecast`;

    const getWeatherData = async (
        location: Location,
        temprature?: string,
        showHistoricalData?: string,
        forecastDays?: number // by default 7 as in open-meteo
    ) => {
        weatherData.value = []

        const startDate = new Date();
        if (showHistoricalData) {
            startDate.setDate(startDate.getDate() - (forecastDays || 7));
        }

        const endDate = new Date();
        endDate.setDate(endDate.getDate() + (forecastDays || 7));

        const params = new URLSearchParams({
            latitude: location.latitude,
            longitude: location.longitude,
            hourly: "temperature_2m,precipitation",  //precipitation can be: rain, showers, snow
            start_date: startDate.toLocaleDateString('en-CA'),
            end_date: endDate.toLocaleDateString('en-CA'),
            temperature_unit: temprature ?? "celsius",
        });

        const response = await fetch(`${BASE_URL}?${params.toString()}`);

        if (!response.ok) {
            return
        }

        const responseInJson = await response.json();
        weatherData.value = mapDateToTempratue(responseInJson)

    }

    const mapDateToTempratue = (data: any): Weather[] => {
        const now = new Date();
        const weatherData: Weather[] = [];

        for (let i = 0; i < data.hourly.time.length; i++) {
            const currentDate = new Date(data.hourly.time[i]);
            const date = currentDate.toLocaleString('en-US', {
                weekday: 'short',
                hour: 'numeric',
                hour12: true
            });
            const temperature = new Temperature(data.hourly.temperature_2m[i]);
            const rainChances = data.hourly.precipitation[i] || 0
            const isForecast = currentDate > now;

            weatherData.push(new Weather(date, temperature, isForecast, rainChances));
        }

        return weatherData;
    }

    return {
        weatherData,
        getWeatherData
    };
}