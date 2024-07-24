import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query';
import petsReducer from "../entities/pet/model/petsSlice";
import shelterReducer from "../entities/shelter/model/shelterSlice";
import { PetState } from "../entities/pet/index";
import userReducer from "../entities/user/model/userSlice";
import { UserState } from "../entities/user/index";
import { ShelterState } from "../entities/shelter/index";
import { baseApi } from "../shared/api";
import geolocationReducer from '../shared/hooks/useGeolocation/geolocationSlice'; // Импортируем geolocationReducer
import { geolocationApi } from '../shared/hooks/useGeolocation/geolocationApi'; // Импортируем geolocationApi
import { GeolocationState } from "../shared/hooks/useGeolocation/geolocationType";
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    pets: petsReducer,
    user: userReducer,
    shelter: shelterReducer,
    geolocation: geolocationReducer, // Добавляем geolocationReducer
    [geolocationApi.reducerPath]: geolocationApi.reducer, // Добавляем geolocationApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware).concat(geolocationApi.middleware), // Добавляем middleware geolocationApi
});

setupListeners(store.dispatch);

export type RootState = {
  pets: PetState;
  user: UserState;
  shelter: ShelterState;
  geolocation: GeolocationState; // Добавляем тип для geolocation
};

export type AppDispatch = typeof store.dispatch;
