import {
  MAIN_ROUTE,
  AUTH_ROUTE,
  REGISTRATION_ROUTE,
  ADD_PET_CARD,
  PROFILE,
  PET_CARD,
  FAVORITES,
} from "./consts";
import { Main } from "@/pages/main";
import { Auth } from "@pages/auth";
import { Profile } from "@pages/profile";
import { AddPetCard } from "@pages/addPetCard";
import { PetCardPage } from "@pages/petCardPage";
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
