import { baseApi } from "../../../shared/api";
import {
  AddShelterResponse,
  AddShelterRequest,

} from "../model/shelterType";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addShelter: builder.mutation<AddShelterResponse, AddShelterRequest>({
      query: (body) => ({
        url: "/shelter/auth",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useAddShelterMutation } = userApi;
