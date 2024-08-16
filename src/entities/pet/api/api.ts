import * as petModel from "../index";
import { baseApi } from "@shared/api";
import { buildQueryString } from "@/shared/hooks/buildQueryString"; // Импортируем хук

export const petsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPets: builder.query<
      petModel.type.Pet[],
      { pet_type?: string; male?: string }
    >({
      query: (params) => buildQueryString("/api/search-announcement/", params),
    }),
    getPetDetail: builder.query<petModel.type.PetDetail, { id: string }>({
      query: (params) =>
        buildQueryString(`/api/shelter-announcement/detail/${params.id}/`),
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
    saveFavorite: builder.mutation<void, number>({
      query: (id) => ({
        url: `/api/favourites/private-announcement/${id}/`,
        method: "POST",
        body: { id },
      }),
      invalidatesTags: ["Favorites"],
    }),
    deleteFavorite: builder.mutation<void, number>({
      query: (id) => ({
        url: `/api/favourites/private-announcement/${id}/`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Favorites"],
    }),
    getFavorites: builder.query<petModel.type.Pet[], { pet_type?: string }>({
      query: (params) => buildQueryString("/api/favourites/", params),
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
  useDeleteFavoriteMutation,
} = petsApi;
