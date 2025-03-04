import { Request, Response } from 'express';
import axios from 'axios';
import { WeatherResponse } from '../types/weather';
import dotenv from 'dotenv';

// Recharger les variables d'environnement
dotenv.config();

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = process.env.OPENWEATHER_BASE_URL;

/**
 * @swagger
 * tags:
 *   name: Météo
 *   description: Opérations liées à la météo
 */

/**
 * Récupère les informations météorologiques pour une ville donnée
 * @param req - Requête Express
 * @param res - Réponse Express
 */
export const getWeather = async (req: Request, res: Response) => {
    try {
        // La validation est déjà effectuée par express-validator
        const city = req.query.city as string || 'Paris';
        const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=fr`;
        
        // Log pour le débogage
        console.log('URL de la requête (sans la clé API):', url.replace(API_KEY!, '***API_KEY***'));

        const response = await axios.get<WeatherResponse>(url);
        const weatherData = response.data;

        // Formater la réponse
        const formattedResponse = {
            city: weatherData.name,
            temperature: weatherData.main.temp,
            feelsLike: weatherData.main.feels_like,
            description: weatherData.weather[0].description,
            humidity: weatherData.main.humidity
        };

        res.json(formattedResponse);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Erreur détaillée:', {
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data
            });
            
            // Gestion spécifique des erreurs d'API
            if (error.response?.status === 404) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Ville non trouvée',
                    details: error.response.data
                });
            }
            
            res.status(error.response?.status || 500).json({
                status: 'error',
                message: `Erreur lors de la requête: ${error.message}`,
                details: error.response?.data
            });
        } else {
            console.error('Erreur non-Axios:', error);
            res.status(500).json({ 
                status: 'error',
                message: 'Une erreur interne est survenue'
            });
        }
    }
}; 