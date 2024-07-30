import { baseApi } from "@shared/api";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addShelter: builder.mutation<void, FormData>({
      query: (body) => ({
        url: "/api/shelter/create/",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useAddShelterMutation } = userApi;
