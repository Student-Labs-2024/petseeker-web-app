import { baseApi } from "@shared/api";
import { UploadImageRequest } from "./type";
export const userApi = baseApi.injectEndpoints({
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
  }),
});

export const { useAddShelterMutation, useUploadImageMutation } = userApi;
