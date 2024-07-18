import { Pet } from "../index";
import { baseApi } from "../../../shared/api";
export const petsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPets: builder.query<Pet[], void>({
      query: () => "/",
    }),
    addPetCard: builder.mutation<void, FormData>({
      query: (newPetCard) => ({
        url: "/pet",
        method: "POST",
        body: newPetCard,
      }),
    }),
    getPetTypes: builder.query<string[], void>({
      query: () => "/petTypes",
    }),
  }),
});

export const { useGetPetsQuery, useAddPetCardMutation, useGetPetTypesQuery } =
  petsApi;
