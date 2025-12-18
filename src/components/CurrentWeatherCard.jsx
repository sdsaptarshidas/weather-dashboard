// src/components/CurrentWeatherCard.jsx
function CurrentWeatherCard({ selectedCity }) {
  return (
    <div className="bg-white text-dark rounded-3 p-3 shadow-sm">
      <h2 className="h5 mb-2">Current Weather</h2>
      <p className="mb-1">
        Showing placeholder weather for:
        <span className="fw-semibold"> {selectedCity}</span>
      </p>
      <p className="text-muted mb-0">
        In the next step we will fetch real data from the weather API.
      </p>
    </div>
  );
}

export default CurrentWeatherCard;
