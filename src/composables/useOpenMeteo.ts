import { ref } from 'vue'
import { Weather } from '@/domain/entities/Weather';
import { Temperature } from '@/domain/entities/Temprature';
import { Location } from '@/domain/entities/Location';

export function useOpenMeteo() {
    const weatherData = ref<Weather[]>([])

    const BASE_URL = `https://api.open-meteo.com/v1/forecast`;

    const getWeatherData = async (
        location: Location
    ) => {
        weatherData.value = []

        const startDate = new Date();
            startDate.setDate(startDate.getDate() - 7);
            
            const endDate = new Date();
            endDate.setDate(endDate.getDate() + 7);

            const params = new URLSearchParams({
                latitude: location.latitude,
                longitude: location.longitude,
                hourly: "temperature_2m",
                start_date: startDate.toLocaleDateString('en-CA'),
                end_date: endDate.toLocaleDateString('en-CA'),
                temperature_unit: "celsius"
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
            const date = new Date(data.hourly.time[i]);
            const temperature = new Temperature(data.hourly.temperature_2m[i]);
            const isForecast = date > now;
            
            weatherData.push(new Weather(date, temperature, isForecast));
        }
        
        return weatherData;
    }

    return {
        weatherData,
        getWeatherData
    };
}