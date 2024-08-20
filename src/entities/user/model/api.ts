import { baseApi } from "@shared/api";
import { userModel } from "../index";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<userModel.LoginResponse, userModel.LoginRequest>({
      query: (body) => ({
        url: "/api/sms-verification/create/",
        method: "POST",
        body,
      }),
    }),
    confirm: builder.mutation<
      userModel.ConfirmResponse,
      userModel.ConfirmRequest
    >({
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
