import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { petModel } from "@entities/pet";
import { shelterModel } from "@entities/shelter";
import { userModel } from "@entities/user";
import { baseApi } from "@shared/api";
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    pets: petModel.petsReducer,
    user: userModel.userReducer,
    shelter: shelterModel.shelterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApi.middleware),
});

setupListeners(store.dispatch);
export type RootState = {
  pets: petModel.PetState;
  user: userModel.UserState;
  shelter: shelterModel.ShelterState;
};

export type AppDispatch = typeof store.dispatch;
