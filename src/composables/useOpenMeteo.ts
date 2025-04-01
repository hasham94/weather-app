import { ref } from 'vue'
import { Weather } from '@/domain/entities/Weather';
import { Temperature } from '@/domain/entities/Temprature';
import { Location } from '@/domain/entities/Location';

export function useOpenMeteo() {
    const weatherData = ref<Weather[]>([])
    const loading = ref(false);
    const error = ref<string | null>(null)

    const BASE_URL = `https://api.open-meteo.com/v1/forecast`;

    const getWeatherData = async (
        location: Location,
        temprature?: string,
        forecastDays?: number, // by default 7 as in open-meteo
        durationStartDate?: Date,
        durationEndDate?: Date
    ) => {
        weatherData.value = [];
        loading.value = true;
        error.value = null;


        try {
            const startDate = durationStartDate ? new Date(durationStartDate) : new Date();

            const endDate = durationEndDate ? new Date(durationEndDate) : new Date();
            if (forecastDays) {
                endDate.setDate(endDate.getDate() + (forecastDays - 1)); // doing -1 considering current date
            }

            const params = new URLSearchParams({
                latitude: location.latitude.toString(),
                longitude: location.longitude.toString(),
                hourly: "temperature_2m,precipitation",  //precipitation can be: rain, showers, snow
                start_date: startDate.toLocaleDateString('en-CA'),
                end_date: endDate.toLocaleDateString('en-CA'),
                temperature_unit: temprature ?? "celsius"
            });

            const response = await fetch(`${BASE_URL}?${params.toString()}`);
            const responseInJson = await response?.json();

            if (responseInJson.error) {
                throw new Error(responseInJson?.reason || 'Failed to fetch weather data')
            }

            weatherData.value = mapDateToTempratue(responseInJson)
        } catch (err) {
            error.value = err
        } finally {
            loading.value = false
        }

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
        getWeatherData,
        loading,
        error
    };
}