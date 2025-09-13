import { baseApi } from "@/redux/baseApi";

export const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserStats: builder.query({
      query: (params) => ({
        url: "/stats/user",
        params,
      }),
    }),
  }),
});

export const { useGetUserStatsQuery } = statsApi;
