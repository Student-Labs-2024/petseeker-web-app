import { baseApi } from "@shared/api";
import { buildQueryString } from "@/shared/hooks/buildQueryString";
import { UploadImageRequest } from "./type";
export const shelterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addShelter: builder.mutation<void, Record<string, any>>({
      query: (body) => ({
        url: "/api/shelter/create/",
        method: "POST",
        body,
      }),
    }),

    uploadImage: builder.mutation<string, UploadImageRequest>({
      query: ({ id, formData }) => ({
        url: `/api/image-loader/load/private-announcement/${id}/`,
        method: "POST",
        body: formData,
      }),
    }),

    uploadAvatar: builder.mutation<string, UploadImageRequest>({
      query: ({ id, formData }) => ({
        url: `/api/image-loader/load/shelter/${id}/`,
        method: "POST",
        body: formData,
      }),
    }),

    getShelter: builder.query<any, { id: string }>({
      query: (id) => `/api/shelter/user-shelters/${id}/`,
    }),
  }),
});

export const {
  useAddShelterMutation,
  useUploadImageMutation,
  useGetShelterQuery,
  useUploadAvatarMutation,
} = shelterApi;
