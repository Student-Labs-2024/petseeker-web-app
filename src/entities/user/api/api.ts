import { baseApi } from "@shared/api";
import { type } from "../index";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<type.LoginResponse, type.LoginRequest>({
      query: (body) => ({
        url: "/api/sms-verification/create/",
        method: "POST",
        body,
      }),
    }),
    confirm: builder.mutation<type.ConfirmResponse, type.ConfirmRequest>({
      query: (body) => ({
        url: "/api/sms-verification/auth/",
        method: "POST",
        body,
      }),
    }),

    // me: builder.query<ConfirmResponse,void>({
    //   query: () => "/api/user/me/",
    // }),
  }),
});

export const { useLoginMutation, useConfirmMutation } = userApi;
