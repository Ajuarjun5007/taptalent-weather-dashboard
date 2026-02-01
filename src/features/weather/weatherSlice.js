import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCurrentWeather, fetchForecast } from './weatherAPI';

// =========================
// Async Thunks
// =========================

// Fetch current weather
export const getCurrentWeather = createAsyncThunk(
  'weather/getCurrentWeather',
  async ({ city, unit }) => {
    const data = await fetchCurrentWeather(city, unit);
    return data;
  }
);

// Fetch forecast (hourly + daily)
export const getForecast = createAsyncThunk(
  'weather/getForecast',
  async ({ city, unit }) => {
    const data = await fetchForecast(city, unit);
    return data;
  }
);

// =========================
// Initial State
// =========================

const initialState = {
  cities: {}, 
  current: null,
  forecast: null,
  loading: false,
  error: null,
};

// =========================
// Slice
// =========================

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ---- Current Weather ----
      .addCase(getCurrentWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.cities[action.payload.name] = action.payload;

      })
      .addCase(getCurrentWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ---- Forecast ----
      .addCase(getForecast.pending, (state) => {
        state.loading = true;
      })
      .addCase(getForecast.fulfilled, (state, action) => {
        state.loading = false;
        state.forecast = action.payload;
      })
      .addCase(getForecast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// =========================
// Export Reducer
// =========================

export default weatherSlice.reducer;
