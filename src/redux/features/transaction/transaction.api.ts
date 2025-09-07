import { baseApi } from "@/redux/baseApi";
import type { ITransaction, ITransactionInit } from "@/types/transaction.types";
import type { IResponse } from "./../../../types/global.types";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    initTransaction: builder.mutation<
      IResponse<ITransaction>,
      ITransactionInit
    >({
      query: (transData) => ({
        url: "/transaction",
        method: "POST",
        data: transData,
      }),
    }),
    getMyTransactions: builder.query<ITransaction[], unknown>({
      query: (params) => ({
        url: "/transaction",
        params,
      }),
      transformResponse: (response: IResponse<ITransaction[]>) => response.data,
    }),
  }),
});

export const { useInitTransactionMutation, useGetMyTransactionsQuery } =
  transactionApi;
