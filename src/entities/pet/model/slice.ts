import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { petModel } from "../index";
import { AnnouncmentType } from "./type"; // Импортируем тип

const initialFilterState: petModel.FilterState = {
  pet_type: undefined,
  male: undefined,
  age: undefined,
  fatness: undefined,
  health__issues: undefined,
  wool_type: undefined,
  allergenicity: undefined,
};
const initialState: petModel.PetState = {
  pets: [],
  loading: false,
  error: null,
  activeButton: "1",
  openFilters: false,
  filters: initialFilterState,
  historySearch: [],
  searchOnFocus: false,
  step: 1,
  announcmentType: "private",
  data: {},
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
    setFilters(state, action: PayloadAction<Partial<petModel.FilterState>>) {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    setHistorySearch(state, action: PayloadAction<string>) {
      if (
        !state.historySearch.includes(action.payload) &&
        action.payload !== ""
      ) {
        state.historySearch.push(action.payload);
      }

      localStorage.setItem(
        "historySearch",
        JSON.stringify(state.historySearch)
      );
    },
    loadHistoryFromStorage(state, action: PayloadAction<string[]>) {
      state.historySearch = action.payload;
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
    setAnnouncmentType(state, action: PayloadAction<petModel.AnnouncmentType>) {
      state.announcmentType = action.payload;
    },
    addImages: (state, action: PayloadAction<File[]>) => {
      state.images = action.payload;
    },
    clearImages: (state) => {
      state.images = [];
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
  setFilters,
  resetFilters,
  setAnnouncmentType,
  addImages,
  clearImages,
  setHistorySearch,
  setSearchOnFocus,
  loadHistoryFromStorage,
} = petsSlice.actions;

export const petsReducer = petsSlice.reducer;
