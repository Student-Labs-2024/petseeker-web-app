import { petModel } from "../index";
import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";
import { FavoritesState, FilterState, PetState, Pet, Favorite } from "./type";
import { RootState } from "@app/store";
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

const petsAdapter = createEntityAdapter<Pet>();

const favoritesAdapter = createEntityAdapter<Favorite>();

const initialFavoritesState: FavoritesState = {
  ...favoritesAdapter.getInitialState(),
  filters: {},
};

const initialState: PetState = {
  ...petsAdapter.getInitialState(),
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
  favorites: initialFavoritesState,
};

const petsSlice = createSlice({
  name: "pets",
  initialState,
  reducers: {
    setAllPets(state, action: PayloadAction<Pet[]>) {
      petsAdapter.setAll(state, action.payload);
    },
    addPets(state, action: PayloadAction<Pet[]>) {
      petsAdapter.addMany(state, action.payload);
    },
    resetAllPets(state) {
      petsAdapter.removeAll(state);
    },
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
      state.favorites.filters = {
        ...state.favorites.filters,
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
      state.filters = initialFilterState;
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
    addFavorites(state, action: PayloadAction<Favorite | Favorite[]>) {
      const favorites = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      favoritesAdapter.addMany(state.favorites, favorites);
    },
    removeFavorite(state, action: PayloadAction<Favorite["id"]>) {
      favoritesAdapter.removeOne(state.favorites, action.payload);
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

  addPets,
  resetAllPets,
  setAllPets,
} = petsSlice.actions;

export const petsReducer = petsSlice.reducer;

export const {
  selectAll: selectAllPets,
  selectById: selectPetById,
  selectIds: selectPetIds,
} = petsAdapter.getSelectors((state: RootState) => state.pets);

export const {
  selectAll: selectAllFavorites,
  selectById: selectFavoriteById,
  selectIds: selectFavoriteIds,
} = favoritesAdapter.getSelectors((state: RootState) => state.pets.favorites);
