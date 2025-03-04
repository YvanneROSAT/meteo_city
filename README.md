# Application Météo avec OpenWeather API

Une application web moderne et responsive permettant de consulter la météo en temps réel de n'importe quelle ville dans le monde. Développée avec Node.js, Express, et TypeScript.

![Application Météo](/src/public/images/weather-app-preview.png)

## 🌟 Fonctionnalités

- ⚡ Recherche instantanée de la météo par ville
- 🌍 Support multilingue (météo en français)
- 📱 Interface responsive (mobile, tablette, desktop)
- 🎨 Design moderne avec animations fluides
- 🔄 Mise à jour en temps réel sans rechargement
- 🎯 Exemples de villes populaires en un clic
- 📚 Documentation API avec Swagger
- ✅ Validation des entrées avec express-validator

## 🛠️ Technologies Utilisées

- **Backend**
  - Node.js
  - Express
  - TypeScript
  - CORS
  - dotenv
  - Swagger (swagger-ui-express, swagger-jsdoc)
  - express-validator

- **Frontend**
  - HTML5
  - CSS3 (Grid, Flexbox, Animations)
  - JavaScript Vanilla
  - Font Awesome Icons

- **API**
  - OpenWeather API

## 📋 Prérequis

- Node.js (v14 ou supérieur)
- npm ou yarn
- Clé API OpenWeather (gratuite)

## 🚀 Installation

1. **Cloner le repository**
   ```bash
   git clone [URL_DU_REPO]
   cd weather-app
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement**
   ```bash
   cp .env.example .env
   ```
   Puis modifiez le fichier `.env` avec vos informations :
   ```
   OPENWEATHER_API_KEY=votre_clé_api
   OPENWEATHER_BASE_URL=https://api.openweathermap.org/data/2.5/weather
   PORT=3009
   ```

4. **Compiler le TypeScript**
   ```bash
   npm run build
   ```

5. **Lancer l'application**
   ```bash
   npm run dev
   ```

L'application sera disponible sur `http://localhost:3009`
La documentation Swagger sera accessible sur `http://localhost:3009/api-docs`

## 📦 Structure du Projet

```
src/
├── controllers/        # Logique métier
├── routes/            # Routes API
├── public/            # Assets statiques
├── types/            # Types TypeScript
├── middlewares/       # Middlewares (validation, etc.)
├── config/            # Configuration (Swagger, etc.)
└── app.ts            # Point d'entrée
```

## 🔧 Configuration

### Variables d'Environnement

- `OPENWEATHER_API_KEY` : Votre clé API OpenWeather
- `OPENWEATHER_BASE_URL` : URL de base de l'API OpenWeather
- `PORT` : Port du serveur (défaut: 3009)

### Scripts NPM

- `npm run dev` : Lance le serveur en mode développement
- `npm run build` : Compile le TypeScript
- `npm start` : Lance le serveur en production
- `npm run test` : Lance les tests (à implémenter)

## 🌐 API Endpoints

### GET /api/weather
- **Query Params** : `city` (nom de la ville, optionnel, défaut: "Paris")
- **Validation** : Le nom de la ville doit être une chaîne de caractères d'au moins 2 caractères
- **Response** : 
  ```json
  {
    "city": "Paris",
    "temperature": 20,
    "feelsLike": 18,
    "description": "ciel dégagé",
    "humidity": 65
  }
  ```
- **Erreur (400)** :
  ```json
  {
    "status": "error",
    "errors": [
      {
        "message": "La ville doit être une chaîne de caractères"
      }
    ]
  }
  ```

## 📚 Documentation API

L'application utilise Swagger pour documenter l'API. La documentation est accessible à l'URL `/api-docs` et offre une interface interactive pour tester les endpoints.

### Fonctionnalités de Swagger
- Description détaillée des endpoints
- Schémas de requêtes et réponses
- Interface interactive pour tester l'API
- Documentation des codes d'erreur

## ✅ Validation des Entrées

L'application utilise express-validator pour valider les entrées utilisateur :

- Validation du paramètre `city` (doit être une chaîne de caractères d'au moins 2 caractères)
- Messages d'erreur personnalisés
- Gestion centralisée des erreurs de validation

## 🎨 Personnalisation

### Thème
Modifiez les couleurs dans `src/public/styles.css` :
```css
body {
    background: #3498db; /* Couleur principale */
}
```

### Villes par Défaut
Modifiez les exemples dans `src/public/script.js` :
```javascript
const placeholders = ['Paris', 'Londres', 'New York', ...];
```

## 📱 Responsive Design

L'application est entièrement responsive avec des breakpoints à :
- Mobile : < 600px
- Tablette : 600px - 1024px
- Desktop : > 1024px

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 License

MIT License - voir le fichier [LICENSE.md](![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)) pour plus de détails

## ✨ Crédit

Développé par YvanneRosat

---

## 🐛 Débogage

Si vous rencontrez des problèmes :

1. Vérifiez que votre clé API est valide
2. Assurez-vous que le port 3009 est disponible
3. Consultez les logs du serveur
4. Vérifiez la console du navigateur
5. Pour les problèmes de validation, vérifiez les erreurs retournées par l'API

