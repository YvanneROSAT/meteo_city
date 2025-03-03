document.addEventListener('DOMContentLoaded', () => {
    // Récupération des éléments DOM avec vérification
    const elements = {
        searchForm: document.getElementById('searchForm'),
        cityInput: document.getElementById('cityInput'),
        weatherIcon: document.querySelector('.weather-icon'),
        weatherResult: document.querySelector('.weather-result'),
        errorMessage: document.querySelector('.error-message'),
        currentConditions: document.querySelector('.current-conditions'),
        resultCity: document.querySelector('.result-city'),
        resultTemp: document.querySelector('.result-temp'),
        feelsLike: document.querySelector('.feels-like'),
        description: document.querySelector('.description'),
        humidity: document.querySelector('.humidity')
    };

    // Vérification que tous les éléments sont présents
    for (const [key, element] of Object.entries(elements)) {
        if (!element) {
            console.error(`Élément manquant: ${key}`);
            return;
        }
    }

    // Animation de l'icône météo
    function animateIcon() {
        elements.weatherIcon.style.transform = 'scale(1.1)';
        setTimeout(() => {
            elements.weatherIcon.style.transform = 'scale(1)';
        }, 200);
    }

    // Démarrer l'animation périodiquement
    setInterval(animateIcon, 3000);

    // Fonction pour mettre à jour l'icône météo
    function updateWeatherIcon(description) {
        const iconMap = {
            'ciel dégagé': 'sun',
            'peu nuageux': 'cloud-sun',
            'partiellement nuageux': 'cloud-sun',
            'nuageux': 'cloud',
            'couvert': 'clouds',
            'pluie légère': 'cloud-rain',
            'pluie': 'cloud-showers-heavy',
            'orage': 'bolt',
            'neige': 'snowflake'
        };

        const defaultIcon = 'cloud';
        const iconName = iconMap[description.toLowerCase()] || defaultIcon;
        const iconElement = elements.weatherIcon.querySelector('i');
        if (iconElement) {
            iconElement.className = `fas fa-${iconName}`;
        }
    }

    // Fonction pour mettre à jour l'affichage
    function updateDisplay(data) {
        // Mettre à jour les valeurs
        elements.resultCity.textContent = data.city;
        elements.resultTemp.textContent = `${Math.round(data.temperature)}°C`;
        elements.feelsLike.textContent = `${Math.round(data.feelsLike)}°C`;
        elements.description.textContent = data.description;
        elements.humidity.textContent = `${data.humidity}%`;
        elements.currentConditions.textContent = data.description;
        
        // Mettre à jour l'icône
        updateWeatherIcon(data.description);
        
        // S'assurer que le résultat est visible
        elements.weatherResult.style.display = 'block';
        elements.weatherResult.classList.add('visible');
        
        // Log pour le débogage
        console.log('Données météo mises à jour:', data);
    }

    // Gérer la soumission du formulaire
    elements.searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const city = elements.cityInput.value.trim();
        
        if (!city) return;

        // Cacher les résultats précédents et les erreurs
        elements.weatherResult.classList.remove('visible');
        elements.errorMessage.textContent = '';

        try {
            const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
            const data = await response.json();

            if (response.ok) {
                updateDisplay(data);
            } else {
                throw new Error(data.error || 'Une erreur est survenue');
            }
        } catch (error) {
            console.error('Erreur:', error);
            elements.errorMessage.textContent = error.message;
        }
    });

    // Animation du placeholder
    const placeholders = [
        'Paris',
        'Londres',
        'New York',
        'Tokyo',
        'Sydney'
    ];
    let currentPlaceholder = 0;

    // Changer le placeholder périodiquement
    setInterval(() => {
        currentPlaceholder = (currentPlaceholder + 1) % placeholders.length;
        elements.cityInput.placeholder = `Ex: ${placeholders[currentPlaceholder]}`;
    }, 2000);

    // Gérer les liens d'exemple
    document.querySelectorAll('.example a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            elements.cityInput.value = link.textContent;
            elements.searchForm.dispatchEvent(new Event('submit'));
        });
    });

    // Charger Paris par défaut
    window.addEventListener('load', () => {
        elements.cityInput.value = 'Paris';
        elements.searchForm.dispatchEvent(new Event('submit'));
    });
}); 