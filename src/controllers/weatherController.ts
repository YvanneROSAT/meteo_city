import { Request, Response } from 'express';
import axios from 'axios';
import { WeatherResponse } from '../types/weather';
import dotenv from 'dotenv';

// Recharger les variables d'environnement
dotenv.config();

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = process.env.OPENWEATHER_BASE_URL;

export const getWeather = async (req: Request, res: Response) => {
    try {
        const city = req.query.city as string || 'Paris';
        const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=fr`;
        
        // Log pour le débogage
        console.log('URL de la requête (sans la clé API):', url.replace(API_KEY!, '***API_KEY***'));
        console.log('Clé API utilisée:', API_KEY);

        const response = await axios.get<WeatherResponse>(url);
        const weatherData = response.data;

        // Log pour le débogage
        console.log('Réponse reçue:', weatherData);

        res.json({
            city: weatherData.name,
            temperature: weatherData.main.temp,
            feelsLike: weatherData.main.feels_like,
            description: weatherData.weather[0].description,
            humidity: weatherData.main.humidity
        });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Erreur détaillée:', {
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data
            });
            
            res.status(error.response?.status || 500).json({
                error: `Erreur lors de la requête: ${error.message}`,
                details: error.response?.data
            });
        } else {
            console.error('Erreur non-Axios:', error);
            res.status(500).json({ error: 'Une erreur est survenue' });
        }
    }
}; 