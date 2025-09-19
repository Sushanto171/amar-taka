import { baseApi } from "@/redux/baseApi";
import { IChangePassword } from "@/types/ChangePass.types";
import { IResponse } from "@/types/global.types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userData) => ({
        url: "/auth/login",
        method: "POST",
        data: userData,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "GET",
      }),
    }),

    sendOTP: builder.mutation({
      query: (userData) => ({
        url: "/otp/send",
        method: "POST",
        data: userData,
      }),
    }),
    verifyOTP: builder.mutation({
      query: (userData) => ({
        url: "/otp/verify",
        method: "POST",
        data: userData,
      }),
    }),
    changePassword: builder.mutation<IResponse<string>, IChangePassword>({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        data,
      }),
    }),
    changePasswordOtpVerify: builder.mutation<
      IResponse<string>,
      { otp: string }
    >({
      query: (data) => ({
        url: "/auth/change-password-otp-verify",
        method: "POST",
        data,
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSendOTPMutation,
  useVerifyOTPMutation,
  useLogoutMutation,
  useChangePasswordMutation,
  useChangePasswordOtpVerifyMutation,
} = authApi;
