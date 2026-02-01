import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

/* ----------------------------------------------------
   Helpers
---------------------------------------------------- */

const loadFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  } catch {
    return [];
  }
};

const saveFavorites = (favorites) => {
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

/* ----------------------------------------------------
   Async Thunks
---------------------------------------------------- */

/**
 * 1️⃣ Current Weather (cards)
 */
export const getCurrentWeather = createAsyncThunk(
  'weather/getCurrentWeather',
  async ({ city, unit = 'metric' }) => {
    const res = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        units: unit,
        appid: API_KEY,
      },
    });

    return res.data;
  }
);

/**
 * 2️⃣ 5–7 Day Forecast (charts + detail page)
 */
export const getForecast = createAsyncThunk(
  'weather/getForecast',
  async ({ lat, lon, unit = 'metric' }) => {
    const res = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        lat,
        lon,
        units: unit,
        appid: API_KEY,
      },
    });

    return res.data;
  }
);

/* ----------------------------------------------------
   Slice
---------------------------------------------------- */

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    cities: {},              // { Delhi: weatherData }
    forecasts: {},           // { Delhi: forecastData }
    favorites: loadFavorites(),
    loading: false,
    error: null,
  },

  reducers: {
    /**
     * ⭐ Pin / Unpin city
     */
    toggleFavorite: (state, action) => {
      const city = action.payload;

      if (state.favorites.includes(city)) {
        state.favorites = state.favorites.filter((c) => c !== city);
      } else {
        state.favorites.unshift(city); // pin to top
      }

      saveFavorites(state.favorites);
    },
  },

  extraReducers: (builder) => {
    builder

      /* -------- Current Weather -------- */
      .addCase(getCurrentWeather.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.cities[action.payload.name] = action.payload;
      })
      .addCase(getCurrentWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      /* -------- Forecast -------- */
      .addCase(getForecast.pending, (state) => {
        state.loading = true;
      })
      .addCase(getForecast.fulfilled, (state, action) => {
        state.loading = false;

        const cityName = action.payload.city.name;
        state.forecasts[cityName] = action.payload;
      })
      .addCase(getForecast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

/* ----------------------------------------------------
   Exports
---------------------------------------------------- */

export const { toggleFavorite } = weatherSlice.actions;
export default weatherSlice.reducer;
