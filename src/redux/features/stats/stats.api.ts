import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types/global.types";
import type {
  IAgentStats,
  ISystemStats,
  ITransactionStats,
  IUserStats,
} from "@/types/stats.types";

export const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserStats: builder.query<IUserStats, unknown>({
      query: (params) => ({
        url: "/stats/user",
        params,
      }),
      transformResponse: (res: IResponse<IUserStats>) => res.data,
    }),
    getAgentStats: builder.query<IAgentStats, unknown>({
      query: (params) => ({
        url: "/stats/agent",
        params,
      }),
      transformResponse: (res: IResponse<IAgentStats>) => res.data,
    }),
    getTransactionStats: builder.query<ITransactionStats, unknown>({
      query: (params) => ({
        url: "/stats/transaction",
        params,
      }),
      transformResponse: (res: IResponse<ITransactionStats>) => res.data,
    }),
    getSystemStats: builder.query<ISystemStats, unknown>({
      query: (params) => ({
        url: "/stats/system",
        params,
      }),
      transformResponse: (res: IResponse<ISystemStats>) => res.data,
    }),
  }),
});

export const {
  useGetUserStatsQuery,
  useGetAgentStatsQuery,
  useGetTransactionStatsQuery,
  useGetSystemStatsQuery,
} = statsApi;
