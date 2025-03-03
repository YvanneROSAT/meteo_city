import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import weatherRoutes from './routes/weatherRoutes';

// Charger les variables d'environnement
dotenv.config();

// Vérification de la clé API
const API_KEY = process.env.OPENWEATHER_API_KEY;
if (!API_KEY) {
    throw new Error('La clé API OpenWeather n\'est pas définie dans le fichier .env');
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', weatherRoutes);

// Page d'accueil
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>API Météo</title>
            <link rel="stylesheet" href="/styles.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
        </head>
        <body>
            <div class="container">
                <div class="weather-icon">
                    <i class="fas fa-cloud-sun"></i>
                </div>
                <h1>API Météo</h1>
                <div class="current-conditions">ciel dégagé</div>
                <form id="searchForm" class="search-container">
                    <input type="text" id="cityInput" class="search-input" placeholder="Entrez le nom d'une ville" required>
                    <button type="submit" class="search-button">
                        <i class="fas fa-search"></i> Rechercher
                    </button>
                </form>
                <div class="example">
                    Essayez par exemple : <a href="#">Paris</a>, 
                    <a href="#">Londres</a>, 
                    <a href="#">New York</a>
                </div>

                <!-- Message d'erreur -->
                <div class="error-message" style="color: red;"></div>

                <!-- Résultats météo -->
                <div class="weather-result">
                    <div class="result-city">Paris</div>
                    <div class="result-temp">0°C</div>
                    <div class="result-details">
                        <div class="detail-item">
                            <div class="detail-label">Ressenti</div>
                            <div class="detail-value feels-like">0°C</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Conditions</div>
                            <div class="detail-value description">-</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Humidité</div>
                            <div class="detail-value humidity">0%</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="signature">YvanneRosat</div>
            <script src="/script.js"></script>
        </body>
        </html>
    `);
});

// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).json({ error: 'Route non trouvée' });
});

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
}); 