import { baseApi } from "../../../shared/api";
import {
  LoginResponse,
  LoginRequest,
  ConfirmResponse,
  ConfirmRequest,
} from "../model/userType";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "/api/sms-verification/create/",
        method: "POST",
        body,
      }),
    }),
    confirm: builder.mutation<ConfirmResponse, ConfirmRequest>({
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

export const { useLoginMutation, useConfirmMutation} = userApi;
