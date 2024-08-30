import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { petModel } from "../index";

const initialFilterState: petModel.FilterState = {
  pet_type: undefined,
  male: undefined,
  age: undefined,
  dimensions: undefined,
  health__issues: undefined,
  wool_type: undefined,
  allergenicity: undefined,
};
const initialFormDataState: petModel.FormDataType = {
  pet_type: undefined,
  name: undefined,
  gender: undefined,
  allergenicity: undefined,
  dimensions: undefined,
  weigth: undefined,
  breed: undefined,
  age: undefined,
  wool_type: undefined,
  sterilization: undefined,
  vaccinations: undefined,
  address: undefined,
  description: undefined,
  status: undefined,
  contacts: undefined,
  color: undefined,
  state: undefined,
  health_issues: undefined,
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
  data: initialFormDataState,
  favoriteFilters: undefined,
  ids: [],
  images: [],
  previewUrl: "",
  addPetUrl: undefined,
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
    setFavoriteFilters(state, action: PayloadAction<Record<string, any>>) {
      state.favoriteFilters = {
        ...state.favoriteFilters,
        ...action.payload,
      };
    },
    resetFavoriteFilters(state, action: PayloadAction<any>) {
      state.favoriteFilters = action.payload;
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
    setFormData(state, action: PayloadAction<petModel.FormDataType>) {
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
    addFavorites: (state, action: PayloadAction<number | number[]>) => {
      const idsToAdd = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      const uniqueIds = new Set([...state.ids, ...idsToAdd]);
      state.ids = Array.from(uniqueIds);
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.ids = state.ids.filter((id) => id !== action.payload);
    },
    setAddPetUrl(state, action: PayloadAction<string>) {
      state.addPetUrl = action.payload;
    },
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
  addImages,
  clearImages,
  setHistorySearch,
  setSearchOnFocus,
  loadHistoryFromStorage,
  setFavoriteFilters,
  resetFavoriteFilters,
  removeFavorite,
  addFavorites,
  setPreviewUrl,
  setAddPetUrl,
} = petsSlice.actions;

export const petsReducer = petsSlice.reducer;
