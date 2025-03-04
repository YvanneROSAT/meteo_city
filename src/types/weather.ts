/**
 * @swagger
 * components:
 *   schemas:
 *     WeatherResponse:
 *       type: object
 *       properties:
 *         weather:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Weather'
 *         main:
 *           $ref: '#/components/schemas/Main'
 *         name:
 *           type: string
 *           description: Nom de la ville
 *         cod:
 *           type: number
 *           description: Code de statut HTTP
 *     Weather:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: ID de la condition météorologique
 *         main:
 *           type: string
 *           description: Groupe météorologique principal
 *         description:
 *           type: string
 *           description: Description des conditions météorologiques
 *         icon:
 *           type: string
 *           description: ID de l'icône météorologique
 *     Main:
 *       type: object
 *       properties:
 *         temp:
 *           type: number
 *           description: Température actuelle en degrés Celsius
 *         feels_like:
 *           type: number
 *           description: Température ressentie en degrés Celsius
 *         temp_min:
 *           type: number
 *           description: Température minimale en degrés Celsius
 *         temp_max:
 *           type: number
 *           description: Température maximale en degrés Celsius
 *         pressure:
 *           type: number
 *           description: Pression atmosphérique en hPa
 *         humidity:
 *           type: number
 *           description: Taux d'humidité en pourcentage
 */

export interface WeatherResponse {
    weather: Weather[];
    main: Main;
    name: string;
    cod: number;
}

interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
} 