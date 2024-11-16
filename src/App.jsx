import {useEffect, useState} from "react"
import loader from "./assets/loader.svg"
import "./App.css"
import { useEffect } from "react"
import { useState } from "react"
const APIKEY = import.meta.env.VITE_WEATHER_API_KEY

function App() {

  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    fetch(`http://api.airvisual.com/v2/nearest_city?key=${APIKEY}`)
    .then(response => {
      console.log(response);
      return response.json()
    })
    .then(data => {
      console.log(data);
    })
  }, [] )

  return (
    <main>
      <div className="loader-container">
        <img src={loader} alt="loader icon" />
      </div>
      <div className="container">
        <div className="info-icon-container">
          <img src="/icons/01d.svg" className="info-icon" alt="weather icon" />
        </div>
        <p className="temperature">24°</p>
        <p className="city-name">Montpellier</p>
        <p className="country-name">France</p>
      </div>
    </main>
  );
}

export default App;
