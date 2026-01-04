const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
// const API_KEY = "c25ee927e35a270cba65b14780794cad"; 
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function getCurrentWeather(cityName) {
  const url = `${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);

    // Check if response is OK (status 200-299)
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    // Parse JSON from response
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw error; // Re-throw so caller can handle
  }
}

export async function getHourlyForecast(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Forecast API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching hourly forecast:", error);
    throw error;
  }
}
