// // src/test-api.js (temporary test file)
// import { getCurrentWeather, getHourlyForecast } from "./services/weatherApi";

// async function testApi() {
//   try {
//     // Test current weather
//     const current = await getCurrentWeather("Kolkata");
//     console.log("Current weather:", {
//       city: current.name,
//       temp: current.main.temp,
//       lat: current.coord.lat,
//       lon: current.coord.lon,
//     });

//     // Test hourly forecast using coordinates from current weather
//     const forecast = await getHourlyForecast(current.coord.lat, current.coord.lon);
//     console.log("Hourly forecast - first 3 entries:", 
//       forecast.list.slice(0, 3).map(item => ({
//         time: new Date(item.dt * 1000).toLocaleString(),
//         temp: item.main.temp,
//         description: item.weather[0].description,
//       }))
//     );
//   } catch (error) {
//     console.error("API test failed:", error);
//   }
// }

// testApi();


// src/test-api.js (CommonJS version)
const { getCurrentWeather, getHourlyForecast } = require('./services/weatherApi.js');

async function testApi() {
  try {
    const current = await getCurrentWeather('Kolkata');
    console.log('Current weather:', {
      city: current.name,
      temp: current.main.temp,
      lat: current.coord.lat,
      lon: current.coord.lon,
    });

    const forecast = await getHourlyForecast(current.coord.lat, current.coord.lon);
    console.log('Hourly forecast - first 3 entries:', 
      forecast.list.slice(0, 3).map(item => ({
        time: new Date(item.dt * 1000).toLocaleString(),
        temp: item.main.temp,
        description: item.weather[0].description,
      }))
    );
  } catch (error) {
    console.error('API test failed:', error);
  }
}

testApi();
