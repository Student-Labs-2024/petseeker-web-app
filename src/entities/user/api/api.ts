import { baseApi } from "@shared/api";

import * as userModel from "../index";
export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      userModel.type.LoginResponse,
      userModel.type.LoginRequest
    >({
      query: (body) => ({
        url: "/api/sms-verification/create/",
        method: "POST",
        body,
      }),
    }),
    confirm: builder.mutation<
      userModel.type.ConfirmResponse,
      userModel.type.ConfirmRequest
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
  }),
});

export const {
  useLoginMutation,
  useConfirmMutation,
  useEditUserMutation,
  useGetMeQuery,
  useUploadProfileImageMutation,
} = userApi;
