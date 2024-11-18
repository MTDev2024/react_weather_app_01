import { useEffect, useState } from "react";
import loader from "./assets/loader.svg"; // Icône de chargement
import browser from "./assets/browser.svg"; // Icône d'erreur
import "./App.css";

const APIKEY = import.meta.env.VITE_WEATHER_API_KEY; // Récupération de la clé API via les variables d'environnement

// Fonction utilitaire pour convertir l'angle de direction du vent en texte
function getWindDirection(angle) {
  const directions = ["Nord", "Nord-Est", "Est", "Sud-Est", "Sud", "Sud-Ouest", "Ouest", "Nord-Ouest"];
  const index = Math.round(angle / 45) % 8;
  return directions[index];
}

function App() {
  // États pour stocker les données météo et les éventuelles erreurs
  const [weatherData, setWeatherData] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);

  useEffect(() => {
    // Appel à l'API pour récupérer les données météo
    fetch(`https://api.airvisual.com/v2/nearest_city?key=${APIKEY}`)
      .then((response) => {
        console.log("API Response Object:", response);

        // Gestion des erreurs HTTP (ex : 400 ou 500)
        if (!response.ok) throw new Error(`Erreur ${response.status}: ${response.statusText}`);

        return response.json(); // Conversion de la réponse en JSON
      })
      .then((responseData) => {
        console.log("API Response Data:", responseData);

        // Vérification des données brutes du vent
        const windSpeedMps = responseData.data.current.weather.ws;
        console.log("Vitesse du vent en m/s :", windSpeedMps);

        // Conversion en km/h
        const windSpeedKmh = (windSpeedMps * 3.6).toFixed(1);
        console.log("Vitesse du vent en km/h :", windSpeedKmh);

        // Mise à jour des données météo à partir de la réponse API
        setWeatherData({
          city: responseData.data.city, // Ville
          country: responseData.data.country, // Pays
          iconId: responseData.data.current.weather.ic, // Icône météo
          temperature: responseData.data.current.weather.tp, // Température (en °C)
          humidity: responseData.data.current.weather.hu, // Humidité (en %)
          windSpeed: windSpeedKmh, // Vitesse en km/h
          windDirection: responseData.data.current.weather.wd, // Direction du vent (en degrés)
        });
      })
      .catch((err) => {
        // Gestion des erreurs (ex : problème réseau ou API)
        console.error("Erreur lors de la récupération des données :", err.message);
        setErrorInfo(err.message);
      });
  }, []); // Le tableau vide [] signifie que ce useEffect s'exécute une seule fois au montage du composant

  return (
    <main>
      {/* Affichage du loader si les données ne sont pas encore chargées et qu'il n'y a pas d'erreur */}
      <div className={`loader-container ${(!weatherData && !errorInfo) && "active"}`}>
        <img src={loader} alt="loading icon" />
      </div>

      {/* Affichage des données météo si elles sont disponibles */}
      {weatherData && (
        <>
          <p className="city-name">{weatherData.city}</p>
          <p className="country-name">{weatherData.country}</p>
          <p className="temperature">{weatherData.temperature}°</p>
          
          <div className="info-icon-container">
            <img src={`/icons/${weatherData.iconId}.svg`} className="info-icon" alt="weather icon" />
          </div>

          <p className="humidity">
            <span className="label">Humidité : </span>
            <span className="value">{weatherData.humidity}%</span>
          </p>

          <p className="wind-speed">
            <span className="label">Vent : </span>
            <span className="value">{weatherData.windSpeed}km/h</span>
          </p>

          <p className="wind-direction">
            <span className="label">Direction : </span>
            <span className="value"> {getWindDirection(weatherData.windDirection)}</span>
          </p>
        </>
      )}

      {/* Affichage des erreurs si l'API retourne une erreur */}
      {errorInfo && !weatherData && (
        <>
          <p className="error-information">{errorInfo}</p>
          <img src={browser} alt="error icon" />
        </>
      )}
    </main>
  );
}

export default App;
