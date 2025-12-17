import CitySearch from "./CitySearch";
import CurrentWeatherCard from "./CurrentWeatherCard";

function MainLayout(){
    return(
         <main className="container">
      <div className="row g-4">
        <div className="col-12 col-lg-4">
          <CitySearch />
        </div>
        <div className="col-12 col-lg-8">
          <CurrentWeatherCard />
        </div>
      </div>
    </main>
    );
}

export default MainLayout;