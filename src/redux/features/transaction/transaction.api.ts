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
  }),
});

export const { useInitTransactionMutation } = transactionApi;
