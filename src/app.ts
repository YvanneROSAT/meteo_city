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
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).json({ error: 'Route non trouvée' });
});

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
}); 