import { baseApi } from "../../../shared/api";
import {
  AddShelterResponse,
  AddShelterRequest,

} from "../model/shelterType";

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
