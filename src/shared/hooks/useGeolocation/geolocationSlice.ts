import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GeolocationState } from "./geolocationType";
import { Geolocation } from "./geolocationType";
const initialState: GeolocationState = {
  geolocation: null,
  error: null,
};

const geolocationSlice = createSlice({
  name: "geolocation",
  initialState,
  reducers: {
    setGeolocation(state, action: PayloadAction<Geolocation>) {
      state.geolocation = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const { setGeolocation, setError } = geolocationSlice.actions;

export default geolocationSlice.reducer;
