// src/components/CurrentWeatherCard.jsx
import { useEffect, useState } from "react";
import { getCurrentWeather } from "../services/weatherApi";

function CurrentWeatherCard({ selectedCity , onWeatherLoaded}) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   if (!selectedCity) return;

  //   const fetchWeather = async () => {
  //     setLoading(true);
  //     setError(null);

  //     try {
  //       const data = await getCurrentWeather(selectedCity);
  //       setWeather(data);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchWeather();
  // }, [selectedCity]);

  useEffect(() => {
  if (!selectedCity) return;

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getCurrentWeather(selectedCity);
      setWeather(data);
      // Call callback with coordinates
      if (onWeatherLoaded) {
        onWeatherLoaded(data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchWeather();
}, [selectedCity]); 

  if (loading) {
    return (
      <div className="bg-white text-dark rounded-3 p-3 shadow-sm">
        <div className="d-flex align-items-center gap-2">
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <span>Fetching weather for {selectedCity}...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white text-dark rounded-3 p-3 shadow-sm">
        <div className="alert alert-danger mb-0">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  if (weather) {
    const {
      name,
      sys,
      main,
      weather: weatherArray,
      wind,
      clouds,
      visibility,
      dt,
    } = weather;

    const temp = main.temp;
    const feelsLike = main.feels_like;
    const tempMin = main.temp_min;
    const tempMax = main.temp_max;
    const pressure = main.pressure;
    const humidity = main.humidity;
    const windSpeed = wind.speed;
    const windDeg = wind.deg;
    const cloudiness = clouds.all;
    const visibilityKm = (visibility / 1000).toFixed(2);
    const description = weatherArray[0].description;
    const sunrise = new Date(sys.sunrise * 1000).toLocaleTimeString();
    const sunset = new Date(sys.sunset * 1000).toLocaleTimeString();

    return (
      <div className="bg-white text-dark rounded-3 p-4 shadow-sm">
        {/* Header with city name and main temp */}
        <div className="d-flex justify-content-between align-items-start mb-4 border-bottom pb-3">
          <div>
            <h2 className="h4 mb-1">{name}</h2>
            <p className="text-muted text-capitalize mb-0">
              {description}
            </p>
          </div>
          <div className="text-end">
            <div className="fs-1 fw-bold text-primary">{temp}°C</div>
            <p className="text-muted mb-0 small">
              Feels like {feelsLike}°C
            </p>
          </div>
        </div>

        {/* Temperature details row */}
        <div className="row g-3 mb-4">
          <div className="col-6 col-md-3">
            <p className="mb-1 small text-muted">Min Temp</p>
            <p className="fw-semibold">{tempMin}°C</p>
          </div>
          <div className="col-6 col-md-3">
            <p className="mb-1 small text-muted">Max Temp</p>
            <p className="fw-semibold">{tempMax}°C</p>
          </div>
          <div className="col-6 col-md-3">
            <p className="mb-1 small text-muted">Humidity</p>
            <p className="fw-semibold">{humidity}%</p>
          </div>
          <div className="col-6 col-md-3">
            <p className="mb-1 small text-muted">Pressure</p>
            <p className="fw-semibold">{pressure} hPa</p>
          </div>
        </div>

        {/* Wind and atmospheric details */}
        <div className="row g-3 mb-4">
          <div className="col-6 col-md-3">
            <p className="mb-1 small text-muted">Wind Speed</p>
            <p className="fw-semibold">{windSpeed} m/s</p>
          </div>
          <div className="col-6 col-md-3">
            <p className="mb-1 small text-muted">Wind Direction</p>
            <p className="fw-semibold">{windDeg}°</p>
          </div>
          <div className="col-6 col-md-3">
            <p className="mb-1 small text-muted">Cloudiness</p>
            <p className="fw-semibold">{cloudiness}%</p>
          </div>
          <div className="col-6 col-md-3">
            <p className="mb-1 small text-muted">Visibility</p>
            <p className="fw-semibold">{visibilityKm} km</p>
          </div>
        </div>

        {/* Sunrise and Sunset */}
        <div className="row g-3">
          <div className="col-6 col-md-3">
            <p className="mb-1 small text-muted">🌅 Sunrise</p>
            <p className="fw-semibold text-warning">{sunrise}</p>
          </div>
          <div className="col-6 col-md-3">
            <p className="mb-1 small text-muted">🌇 Sunset</p>
            <p className="fw-semibold text-danger">{sunset}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-dark rounded-3 p-3 shadow-sm">
      <p className="text-muted mb-0">Select a city to see weather.</p>
    </div>
  );
}

export default CurrentWeatherCard;
