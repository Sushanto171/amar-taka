import type { IUser } from "@/features/user/types/user.types";
import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types/global.types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: "/user",
        method: "POST",
        data: userData,
      }),
    }),
    getMe: builder.query<IUser, unknown>({
      query: () => ({
        url: "/user/me",
      }),
      transformResponse: (response: IResponse<IUser>) => response.data,
      providesTags: ["USER"],
    }),
    getAllUser: builder.query<IUser[], unknown>({
      query: (params) => ({
        url: "/user",
        params,
      }),
      transformResponse: (response: IResponse<IUser[]>) => response.data,
    }),
  }),
});

export const { useRegisterMutation, useGetMeQuery, useGetAllUserQuery } =
  userApi;
