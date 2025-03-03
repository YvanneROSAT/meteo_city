import axios from 'axios';
import dotenv from 'dotenv';
import { WeatherResponse } from './types/weather';

// Charger les variables d'environnement
dotenv.config();

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Vérification de la clé API
if (!API_KEY) {
    throw new Error('La clé API OpenWeather n\'est pas définie dans le fichier .env');
}

async function getWeatherByCity(city: string): Promise<WeatherResponse> {
    try {
        const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=fr`;
        console.log('URL de la requête:', url);
        const response = await axios.get<WeatherResponse>(url);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(`Erreur lors de la requête: ${error.message}`);
        }
        throw error;
    }
}

// Exemple d'utilisation
async function main() {
    try {
        const city = process.argv[2] || 'Paris'; // Ville par défaut si non spécifiée
        const weatherData = await getWeatherByCity(city);
        
        console.log(`\nMétéo pour ${weatherData.name}:`);
        console.log(`Température: ${weatherData.main.temp}°C`);
        console.log(`Ressenti: ${weatherData.main.feels_like}°C`);
        console.log(`Description: ${weatherData.weather[0].description}`);
        console.log(`Humidité: ${weatherData.main.humidity}%`);
    } catch (error) {
        console.error('Erreur:', error instanceof Error ? error.message : 'Une erreur est survenue');
    }
}

main(); 