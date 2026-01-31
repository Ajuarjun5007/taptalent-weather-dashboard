import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// =========================
// Fetch Current Weather
// =========================
export const fetchCurrentWeather = async (city, unit = 'metric') => {
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: {
      q: city,
      units: unit,
      appid: API_KEY,
    },
  });

  return response.data;
};

// =========================
// Fetch Forecast (5 day / 3 hour)
// =========================
export const fetchForecast = async (city, unit = 'metric') => {
  const response = await axios.get(`${BASE_URL}/forecast`, {
    params: {
      q: city,
      units: unit,
      appid: API_KEY,
    },
  });

  return response.data;
};
