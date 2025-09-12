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
    getMyTransactions: builder.query<IResponse<ITransaction[]>, unknown>({
      query: (params) => ({
        url: "/transaction",
        params,
      }),
      providesTags: ["TRANSACTION", "WALLET"],
    }),
    getAllTransactions: builder.query<IResponse<ITransaction[]>, unknown>({
      query: (params) => ({
        url: "/transaction/all-transactions",
        params,
      }),
      providesTags: ["TRANSACTION", "WALLET"],
    }),
  }),
});

export const {
  useInitTransactionMutation,
  useGetMyTransactionsQuery,
  useGetAllTransactionsQuery,
} = transactionApi;
