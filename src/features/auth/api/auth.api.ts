import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userData) => ({
        url: "/auth/login",
        method: "POST",
        data: userData,
      }),
    }),
    logout: builder.query({
      query: () => ({
        url: "/auth/logout",
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
  }),
});

export const {
  useLoginMutation,
  useSendOTPMutation,
  useVerifyOTPMutation,
  useLogoutQuery,
} = authApi;
