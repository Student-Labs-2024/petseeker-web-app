import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnnouncmentType,FavoritesState,FilterState,PetState } from "./type"; 

const initialFilterState: FilterState = {
  pet_type: "",
  male: "",
  age: "",
  fatness: "",
  health__issues: "",
  wool_type: "",
  allergenicity: "",
};

const initialFavoritesState : FavoritesState= {
  favoriteIds: [],
  favoriteFilters: {},
};

const initialState: PetState = {
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
  favorites: initialFavoritesState,
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
      action: PayloadAction<Partial<FilterState>>
    ) {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    setFavoriteFilters(state, action: PayloadAction<Record<string, any>>) {
      state.favorites.favoriteFilters = {
        ...state.favorites.favoriteFilters,
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

    addFavorites(state, action: PayloadAction<number | number[]>) {
      const favoriteIdsToAdd = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      const uniqueFavoriteIds = new Set([...state.favorites.favoriteIds, ...favoriteIdsToAdd]);
      state.favorites.favoriteIds = Array.from(uniqueFavoriteIds);
    },
    removeFavorite(state, action: PayloadAction<number>) {
      state.favorites.favoriteIds = state.favorites.favoriteIds.filter((id) => id !== action.payload);
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
} = petsSlice.actions;

export default petsSlice.reducer;
