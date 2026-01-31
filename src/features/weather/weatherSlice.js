import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  current: null,
  forecast: [],
  hourly: [],
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
});

export default weatherSlice.reducer;
