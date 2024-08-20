import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import * as petModel from "@entities/pet";
import * as shelterModel from "@entities/shelter";
import * as userModel from "@entities/user";
import { baseApi } from "@shared/api";
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    pets: petModel.slice.petsReducer,
    user: userModel.slice.userReducer,
    shelter: shelterModel.slice.shelterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

setupListeners(store.dispatch);
export type RootState = {
  pets: petModel.type.PetState;
  user: userModel.type.UserState;
  shelter: shelterModel.type.ShelterState;
};

export type AppDispatch = typeof store.dispatch;
