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
    editUser: builder.mutation<void, FormData>({
      query: (body) => ({
        url: "/api/user/user_info/",
        method: "PUT",
        body,
      }),
    }),
    getMe: builder.query<type.ConfirmResponse, void>({
      query: () => "/api/user/me/",
    }),
  }),
});

export const {
  useLoginMutation,
  useConfirmMutation,
  useEditUserMutation,
  useGetMeQuery,
} = userApi;
