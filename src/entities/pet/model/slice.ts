import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { petModel } from "../index";
const initialState: petModel.PetState = {
  pets: [],
  loading: false,
  error: null,
  activeButton: "1",
  openFilters: false,
  step: 1,
  announcmentType: "private",
  data: JSON.parse(localStorage.getItem("announcmentFormData")) || {},
};
const petsSlice = createSlice({
  name: "pets",
  initialState,
  reducers: {
    setActiveButton(state, action: PayloadAction<string>) {
      state.activeButton = action.payload;
    },
    setOpenFilters(state, action: PayloadAction<boolean>) {
      state.openFilters = action.payload;
    },
    nextStep(state) {
      state.step += 1;
    },
    prevStep(state) {
      state.step -= 1;
    },
    setFormData(state, action: PayloadAction<Record<string, any>>) {
      state.data = { ...state.data, ...action.payload };
    },
    setAnnouncmentType(state, action: PayloadAction<petModel.AnnouncmentType>) {
      state.announcmentType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      petModel.petsApi.endpoints.getPets.matchPending,
      (state) => ({
        ...state,
        loading: true,
        error: null,
      })
    );
    builder.addMatcher(
      petModel.petsApi.endpoints.getPets.matchFulfilled,
      (state, action: PayloadAction<petModel.Pet[]>) => ({
        ...state,
        pets: action.payload,
        loading: false,
      })
    );
    builder.addMatcher(
      petModel.petsApi.endpoints.getPets.matchRejected,
      (state, action) => ({
        ...state,
        error: action.error.message || "Failed to fetch cards",
        loading: false,
      })
    );
  },
});
export const {
  setActiveButton,
  setOpenFilters,
  nextStep,
  prevStep,
  setFormData,
  setAnnouncmentType,
} = petsSlice.actions;

export const petsReducer = petsSlice.reducer;
