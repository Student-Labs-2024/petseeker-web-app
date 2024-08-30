import { Pet, PetDetail, UploadImageRequest } from "./type";
import { baseApi } from "@shared/api";
import { buildQueryString } from "@/shared/hooks/buildQueryString";

export const petsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPets: builder.query<Pet[], { pet_type?: string; male?: string }>({
      query: (params) => buildQueryString("/api/search-announcement/", params),
    }),
    getPetDetail: builder.query<PetDetail, { id: string }>({
      query: (params) =>
        buildQueryString(`/api/private-announcement/detail/${params.id}/`),
    }),
    addPetCard: builder.mutation<void, Record<string, any>>({
      query: ({ newPetCard, url }) => ({
        url,
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
    getFavorites: builder.query<Pet[], { pet_type?: string }>({
      query: (params) => buildQueryString("/api/favourites/", params),
      providesTags: ["Favorites"],
    }),
    uploadImage: builder.mutation<string, UploadImageRequest>({
      query: ({ id, formData }) => ({
        url: `/api/image-loader/load/private-announcement/${id}/`,
        method: "POST",
        body: formData,
      }),
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
  useUploadImageMutation,
  useDeleteFavoriteMutation,
} = petsApi;
