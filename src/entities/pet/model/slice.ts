import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as petModel from "../index";
import { AnnouncmentType } from "./type"; // Импортируем тип

const initialFilterState: petModel.type.FilterState = {
  pet_type: "",
  male: "",
  age: "",
  fatness: "",
  health__issues: "",
  wool_type: "",
  allergenicity: "",
};
const initialState: petModel.type.PetState = {
  pets: [],
  loading: false,
  error: null,
  activeButton: "1",
  openFilters: false,
  filters: initialFilterState,
  historySearch: JSON.parse(localStorage.getItem("historySearch")) || [],
  searchOnFocus: false,
  step: 1,
  announcmentType: "private",
  data: JSON.parse(localStorage.getItem("announcmentFormData")) || {},
  ids: [],
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
    setSearchOnFocus(state, action: PayloadAction<boolean>) {
      state.searchOnFocus = action.payload;
    },
    setFilters(
      state,
      action: PayloadAction<Partial<petModel.type.FilterState>>
    ) {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    setHistorySearch(state, action: PayloadAction<string>) {
      if (!state.historySearch.includes(action.payload)) {
        state.historySearch.push(action.payload);
      }

      localStorage.setItem(
        "historySearch",
        JSON.stringify(state.historySearch)
      );
    },
    resetFilters(state) {
      state.filters = initialState.filters;
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
    setAnnouncmentType(state, action: PayloadAction<AnnouncmentType>) {
      state.announcmentType = action.payload;
    },
    addFavorite: (state, action: PayloadAction<string>) => {
      state.ids.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.ids = state.ids.filter((id) => id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      petModel.api.petsApi.endpoints.getPets.matchPending,
      (state) => ({
        ...state,
        loading: true,
        error: null,
      })
    );
    builder.addMatcher(
      petModel.api.petsApi.endpoints.getPets.matchFulfilled,
      (state, action: PayloadAction<petModel.type.Pet[]>) => ({
        ...state,
        pets: action.payload,
        loading: false,
      })
    );
    builder.addMatcher(
      petModel.api.petsApi.endpoints.getPets.matchRejected,
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
  setFilters,
  resetFilters,
  setAnnouncmentType,
  setHistorySearch,
  setSearchOnFocus,
  addFavorite,
  removeFavorite,
} = petsSlice.actions;
export default petsSlice.reducer;
