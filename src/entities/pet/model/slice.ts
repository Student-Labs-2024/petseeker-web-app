import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  AnnouncmentType,
  FavoritesState,
  FilterState,
  PetState,
  Pet,
  Favorite,
} from "./type";
import { RootState } from "@app/store";

const petsAdapter = createEntityAdapter<Pet>();

const initialFilterState: FilterState = {
  pet_type: "",
  male: "",
  age: "",
  fatness: "",
  health__issues: "",
  wool_type: "",
  allergenicity: "",
};

const favoritesAdapter = createEntityAdapter<Favorite>();

const initialFavoritesState: FavoritesState = {
  ...favoritesAdapter.getInitialState(),
  filters: {},
};

// Начальное состояние сущности Pet
const initialState: PetState = {
  ...petsAdapter.getInitialState(),
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
    setFilters(state, action: PayloadAction<Partial<FilterState>>) {
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
      state.filters = initialFilterState;
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
    addFavorites(state, action: PayloadAction<Favorite | Favorite[]>) {
      const favorites = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      favoritesAdapter.addMany(state.favorites, favorites);
    },
    removeFavorite(state, action: PayloadAction<Favorite["id"]>) {
      favoritesAdapter.removeOne(state.favorites, action.payload);
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
  setAnnouncmentType,
  setHistorySearch,
  setSearchOnFocus,
  setFavoriteFilters,
  addFavorites,
  removeFavorite,
  addPets,
  resetAllPets,
  setAllPets,
} = petsSlice.actions;

export default petsSlice.reducer;

export const {
  selectAll: selectAllPets,
  selectById: selectPetById,
  selectIds: selectPetIds,
} = petsAdapter.getSelectors((state: RootState) => state.pets);

// Селекторы для избранных
export const {
  selectAll: selectAllFavorites,
  selectById: selectFavoriteById,
  selectIds: selectFavoriteIds,
} = favoritesAdapter.getSelectors((state: RootState) => state.pets.favorites);
