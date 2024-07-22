
import { MAIN_ROUTE,AUTH_ROUTE, REGISTRATION_ROUTE, ADD_PET_CARD,PROFILE} from "./consts";
import {Main} from "../../pages/main";
import {Auth} from "../../pages/auth";
import {Profile} from "../../pages/profile";
import { AddPetCard } from "../../pages/addPetCard";
export const authRoutes = [
    {
        path: ADD_PET_CARD,
        Component: AddPetCard
    },
    {
        path: PROFILE,
        Component: Profile
    },
]

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: AUTH_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },


]
