import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  unit: 'metric', // Celsius by default
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
});

export default settingsSlice.reducer;
