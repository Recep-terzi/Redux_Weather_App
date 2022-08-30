import { createSlice } from "@reduxjs/toolkit";
import { cities } from "./cities";

export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    weatherData: "",
    allCities: cities,
    selectCity: "",
  },
  reducers: {
    getWeatherData: (state, action) => {
      state.weatherData = action.payload;
    },
    getSelectCity: (state, action) => {
      state.selectCity = action.payload;
    },
  },
});
export const { getWeatherData, getSelectCity } = weatherSlice.actions;
export default weatherSlice.reducer;
