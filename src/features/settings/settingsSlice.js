import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  unit: 'metric', // metric | imperial
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleUnit(state) {
      state.unit = state.unit === 'metric' ? 'imperial' : 'metric';
    },
    setUnit(state, action) {
      state.unit = action.payload;
    },
  },
});

export const { toggleUnit, setUnit } = settingsSlice.actions;
export default settingsSlice.reducer;
