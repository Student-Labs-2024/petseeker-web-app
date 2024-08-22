import {
  MAIN_ROUTE,
  AUTH_ROUTE,
  REGISTRATION_ROUTE,
  ADD_PET_CARD,
  PROFILE,
  PET_CARD,
  FAVORITE_ROUTE,
  PROFILE_EDIT,
  FAVORITES,
  ADD_SHELTER,
} from "./consts";
import { Main } from "@/pages/main";
import { Auth } from "@pages/auth";
import { Profile } from "@pages/profile";
import { AddPetCard } from "@pages/addPetCard";
import { PetCardPage } from "@pages/petCardPage";
import { ProfileEdit } from "@pages/profileEdit";
import { AddShelter } from "@/pages/addShelter";
import { Favorites } from "@pages/favorites";
export const authRoutes = [
  {
    path: ADD_PET_CARD,
    Component: AddPetCard,
  },
  {
    path: PROFILE,
    Component: Profile,
  },
  {
    path: FAVORITES,
    Component: Favorites,
  },
  {
    path: PROFILE_EDIT,
    Component: ProfileEdit,
  },
  {
    path: ADD_SHELTER,
    Component: AddShelter,
  },
];

export const publicRoutes = [
  {
    path: MAIN_ROUTE,
    Component: Main,
  },
  {
    path: AUTH_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },

  {
    path: `PET_CARD ${"/:id"}`,
    Component: PetCardPage,
  },
];
