import { Pet, PetDetail } from "./type";
import { baseApi } from "@shared/api";
export const petsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPets: builder.query<Pet[], { pet_type?: string; male?: string }>({
      query: (params) => {
        let queryString = "/api/search-announcement/";
        if (params) {
          const queryParts = [];
          if (params.pet_type) queryParts.push(`pet_type=${params.pet_type}`);
          if (params.male) queryParts.push(`male=${params.male}`);
          if (queryParts.length) queryString += `?${queryParts.join("&")}`;
        }

        return queryString;
      },
    }),
    getPetDetail: builder.query<PetDetail, { id: string }>({
      query: (params) => {
        const queryString = `/api/shelter-announcement/detail/  ${params.id}  /`;
        return queryString;
      },
    }),
    addPetCard: builder.mutation<void, Record<string, any>>({
      query: (newPetCard) => ({
        url: "/api/private-announcement/create/",
        method: "POST",
        body: newPetCard,
      }),
    }),
    getPetTypes: builder.query<string[], void>({
      query: () => "/petTypes",
    }),
    saveFavorite: builder.mutation<void, string>({
      query: (id) => ({
        url: `favorites`,
        method: "POST",
        body: { id },
      }),
      invalidatesTags: ["Favorites"],
    }),
    getFavorites: builder.query<Pet[], void>({
      query: () => "favorites",
      providesTags: ["Favorites"],
    }),
  }),
});

export const {
  useGetPetsQuery,
  useAddPetCardMutation,
  useGetPetTypesQuery,
  useGetPetDetailQuery,
  useSaveFavoriteMutation,
  useGetFavoritesQuery,
  useLazyGetPetsQuery,
} = petsApi;
