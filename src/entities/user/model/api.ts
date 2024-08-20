import { baseApi } from "@shared/api";
import { userModel } from "../index";

import * as userModel from "../index";
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
    editUser: builder.mutation<void, Record<string, any>>({
      query: (body) => ({
        url: "/api/user/user_info/",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["UserInfo"],
    }),

    getMe: builder.query<Record<string, any>, void>({
      query: () => "/api/user/me/",
      providesTags: ["UserInfo"],
    }),
    uploadProfileImage: builder.mutation<
      string,
      userModel.type.UploadImageRequest
    >({
      query: ({ formData }) => ({
        url: `/api/image-loader/load/profile/`,
        method: "POST",
        body: formData,
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
  useUploadProfileImageMutation,
} = userApi;
