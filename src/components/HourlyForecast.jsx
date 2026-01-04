// src/components/HourlyForecast.jsx
import { useEffect, useState } from "react";
import { getHourlyForecast } from "../services/weatherApi";

function HourlyForecast({ lat, lon }) {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lat || !lon) return;

    const fetchForecast = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getHourlyForecast(lat, lon);
        // Take first 8 forecast entries (next ~24 hours)
        const next24Hours = data.list.slice(0, 8);
        setForecast(next24Hours);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [lat, lon]);

  if (loading) {
    return (
      <div className="bg-white text-dark rounded-3 p-3 shadow-sm">
        <div className="d-flex align-items-center gap-2">
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <span>Loading hourly forecast...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white text-dark rounded-3 p-3 shadow-sm">
        <div className="alert alert-warning mb-0">
          <strong>Forecast unavailable:</strong> {error}
        </div>
      </div>
    );
  }

  if (!forecast || forecast.length === 0) {
    return (
      <div className="bg-white text-dark rounded-3 p-3 shadow-sm">
        <p className="text-muted mb-0">No forecast available</p>
      </div>
    );
  }

  return (
    <div className="bg-white text-dark rounded-3 p-3 shadow-sm">
      <h5 className="mb-3">Next 24 Hours</h5>
      <div className="d-flex flex-nowrap overflow-auto gap-2 pb-2">
        {forecast.map((item, index) => {
          const time = new Date(item.dt * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          const temp = Math.round(item.main.temp);
          const description = item.weather[0].description;
          const iconCode = item.weather[0].icon;

          return (
            <div
              key={index}
              className="text-center border-end pe-3 py-2 flex-shrink-0"
              style={{ minWidth: "100px" }}
            >
              <div className="fs-4 mb-1">{temp}°</div>
              <img
                src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
                alt={description}
                className="mb-1"
                style={{ width: "40px", height: "40px" }}
              />
              <div className="small text-muted text-nowrap">{time}</div>
              <div className="small text-capitalize">{description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HourlyForecast;
