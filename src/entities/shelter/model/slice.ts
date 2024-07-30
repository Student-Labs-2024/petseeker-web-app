import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { type } from "../index";

export const initialState: type.ShelterState = {
  name: "",
};

const shelterSlice = createSlice({
  name: "shelter",
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
  },
});

export const { setName } = shelterSlice.actions;
export default shelterSlice.reducer;
