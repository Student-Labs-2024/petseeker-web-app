// src/entities/shelter/model/shelterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode";
import { ShelterState } from "./shelterType";

export const initialState: ShelterState = {
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

export const {  setName } = shelterSlice.actions;
export default shelterSlice.reducer;
