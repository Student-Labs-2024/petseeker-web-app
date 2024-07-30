import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import petsReducer from "@/entities/pet/model/slice";
import shelterReducer from "@/entities/shelter/model/slice";
import { PetState } from "@entities/pet/index";
import userReducer from "@/entities/user/model/slice";
import { UserState } from "@entities/user/index";
import { ShelterState } from "@entities/shelter/index";
import { baseApi } from "@shared/api";
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    pets: petsReducer,
    user: userReducer,
    shelter: shelterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

setupListeners(store.dispatch);
export type RootState = {
  pets: PetState;
  user: UserState;
  shelter: ShelterState;
};

export type AppDispatch = typeof store.dispatch;
