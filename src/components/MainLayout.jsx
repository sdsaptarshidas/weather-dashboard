import { useState } from "react";
import CitySearch from "./CitySearch";
import CurrentWeatherCard from "./CurrentWeatherCard";

function MainLayout(){
  const [cities,setCities] = useState(["Kolkata"]);
  const [selectedCity,setSelectedCity] = useState("Kolkata");

  const handleAddCity = (cityName) => {
    const trimmed = cityName.trim();
    if(!trimmed) return;
    if(cities.includes(trimmed)) return;

    setCities((prev) => [...prev, trimmed]);
    setSelectedCity(trimmed);
  };

  const handleSelectedCity = (cityName) => {
    setSelectedCity(cityName);
  };

    return(
         <main className="container">
      <div className="row g-4">
        <div className="col-12 col-lg-4">
          <CitySearch 
          cities={cities}
          selectedCity={selectedCity}
          onAddCity={handleAddCity}
          onSelectCity={handleSelectedCity}
          />
        </div>
        <div className="col-12 col-lg-8">
          <CurrentWeatherCard selectedCity={selectedCity}/>
        </div>
      </div>
    </main>
    );
}

export default MainLayout;