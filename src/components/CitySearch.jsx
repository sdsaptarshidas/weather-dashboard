// src/components/CitySearch.jsx
import { useState } from "react";

function CitySearch({ cities, selectedCity, onAddCity, onSelectCity }) {
  const [inputValue, setInputValue] = useState("");

  const handleAddClick = () => {
    if (!inputValue.trim()) return;
    onAddCity(inputValue);
    setInputValue("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddClick();
    }
  };

  return (
    <div className="bg-white text-dark rounded-3 p-3 shadow-sm">
      <h2 className="h5 mb-3">Search City</h2>

      <div className="d-flex gap-2 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter city name..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAddClick}
        >
          Add
        </button>
      </div>

      <p className="mb-2">
        <strong>Selected city:</strong>{" "}
        <span className="text-primary">{selectedCity}</span>
      </p>

      <ul className="list-group">
        {cities.map((city) => (
          <li
            key={city}
            className={
              "list-group-item d-flex justify-content-between align-items-center " +
              (city === selectedCity ? "active text-white" : "")
            }
            style={{ cursor: "pointer" }}
            onClick={() => onSelectCity(city)}
          >
            <span>{city}</span>
            {city === selectedCity && (
              <span className="badge bg-light text-dark">Selected</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CitySearch;
