import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import petsReducer from "@/entities/pet/model/slice";
import shelterReducer from "@/entities/shelter/model/slice";
import * as petModel from "@entities/pet/index";
import userReducer from "@/entities/user/model/slice";
import * as userModel from "@entities/user/index";
import * as shelterModel from "@entities/shelter/index";
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
  pets: petModel.type.PetState;
  user: userModel.type.UserState;
  shelter: shelterModel.type.ShelterState;
};

export type AppDispatch = typeof store.dispatch;
