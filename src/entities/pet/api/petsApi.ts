import { Pet,PetDetail } from "../index";
import { baseApi } from "../../../shared/api";
export const petsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPets: builder.query<Pet[], { name?: string }>({
      query: (params) => {
        let queryString = "/api/search-announcement/?format=json";
        if (params) {
          const queryParts = [];
          if (params.name) queryParts.push(`name=${params.name}`);
          if (queryParts.length) queryString += `?${queryParts.join("&")}`;
        }
        return queryString;
      },
    }),
    getPetDetail:builder.query<PetDetail, { id: string }>({
      query: (params) => {
        let queryString = "/api/shelter-announcement/detail/"+params.id+'/';
        return queryString;
      },
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

export const { useGetPetsQuery, useAddPetCardMutation, useGetPetTypesQuery,useGetPetDetailQuery } =
  petsApi;
