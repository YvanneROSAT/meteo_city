import express from 'express';
import { query } from 'express-validator';
import { getWeather } from '../controllers/weatherController';
import { validate } from '../middlewares/validator';

const router = express.Router();

/**
 * @swagger
 * /api/weather:
 *   get:
 *     summary: Obtenir les informations météorologiques d'une ville
 *     description: Récupère les données météorologiques actuelles pour une ville spécifiée
 *     tags:
 *       - Météo
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         required: false
 *         description: Nom de la ville (par défaut "Paris")
 *     responses:
 *       200:
 *         description: Données météorologiques récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 city:
 *                   type: string
 *                   description: Nom de la ville
 *                 temperature:
 *                   type: number
 *                   description: Température actuelle en degrés Celsius
 *                 feelsLike:
 *                   type: number
 *                   description: Température ressentie en degrés Celsius
 *                 description:
 *                   type: string
 *                   description: Description des conditions météorologiques
 *                 humidity:
 *                   type: number
 *                   description: Taux d'humidité en pourcentage
 *       400:
 *         description: Paramètres de requête invalides
 *       404:
 *         description: Ville non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.get(
  '/weather',
  validate([
    query('city')
      .optional()
      .isString()
      .withMessage('La ville doit être une chaîne de caractères')
      .isLength({ min: 2 })
      .withMessage('Le nom de la ville doit contenir au moins 2 caractères')
      .trim()
  ]),
  getWeather
);

export default router; 