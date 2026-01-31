import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cities: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
});

export default favoritesSlice.reducer;
