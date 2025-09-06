import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types/global.types";
import type { IUser } from "../types/user.types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: "/user",
        method: "POST",
        data: userData,
      }),
    }),
    getMe: builder.query<IResponse<IUser>, unknown>({
      query: () => ({
        url: "/user/me",
      }),
    }),
  }),
});

export const { useRegisterMutation, useGetMeQuery } = userApi;
