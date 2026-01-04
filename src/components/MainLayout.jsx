// src/components/MainLayout.jsx
import { useState, useCallback } from "react";
import CitySearch from "./CitySearch";
import CurrentWeatherCard from "./CurrentWeatherCard";
import HourlyForecast from "./HourlyForecast";

function MainLayout() {
  const [cities, setCities] = useState(["Kolkata"]);
  const [selectedCity, setSelectedCity] = useState("Kolkata");
  const [coordinates, setCoordinates] = useState(null);

  const handleAddCity = (cityName) => {
    const trimmed = cityName.trim();
    if (!trimmed || cities.includes(trimmed)) return;

    setCities((prev) => [...prev, trimmed]);
    setSelectedCity(trimmed);
  };

  const handleSelectCity = (cityName) => {
    setSelectedCity(cityName);
  };

  // Stabilize callback with useCallback to prevent re-renders
  const handleWeatherLoaded = useCallback((weatherData) => {
    setCoordinates({
      lat: weatherData.coord.lat,
      lon: weatherData.coord.lon,
    });
  }, []);

  return (
    <main className="container">
      <div className="row g-4">
        <div className="col-12 col-lg-4">
          <CitySearch
            cities={cities}
            selectedCity={selectedCity}
            onAddCity={handleAddCity}
            onSelectCity={handleSelectCity}
          />
        </div>
        <div className="col-12 col-lg-8">
          <div className="row g-4">
            <div className="col-12">
              <CurrentWeatherCard 
                selectedCity={selectedCity}
                onWeatherLoaded={handleWeatherLoaded}
              />
            </div>
            {coordinates && (
              <div className="col-12">
                <HourlyForecast lat={coordinates.lat} lon={coordinates.lon} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainLayout;
