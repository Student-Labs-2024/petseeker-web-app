import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as petModel from "../index";
const initialState: petModel.type.PetState = {
  pets: [],
  loading: false,
  error: null,
  activeButton: "1",
};

const petsSlice = createSlice({
  name: "pets",
  initialState,
  reducers: {
    setActiveButton(state, action: PayloadAction<string>) {
      state.activeButton = action.payload;
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
export const { setActiveButton } = petsSlice.actions;
export default petsSlice.reducer;
