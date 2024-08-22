import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ShelterState } from "./type";

export const initialState: ShelterState = {
  step: 1,
  images: [],
  previewUrl: "",
  data: {},
};

const shelterSlice = createSlice({
  name: "shelter",
  initialState,
  reducers: {
    nextStep(state) {
      state.step += 1;
    },
    prevStep(state) {
      state.step -= 1;
    },
    setFormData(state, action: PayloadAction<Record<string, any>>) {
      state.data = { ...state.data, ...action.payload };
    },
    addImages: (state, action: PayloadAction<File[]>) => {
      state.images = action.payload;
    },

    setPreviewUrl: (state, action: PayloadAction<string>) => {
      state.previewUrl = action.payload;
    },
    clearImages: (state) => {
      state.images = [];
    },
  },
});

export const {
  nextStep,
  prevStep,
  setFormData,
  addImages,
  clearImages,
  setPreviewUrl,
} = shelterSlice.actions;
export const shelterReducer = shelterSlice.reducer;
