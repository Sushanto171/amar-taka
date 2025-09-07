import { baseApi } from "@/redux/baseApi";
import type { ITransaction, ITransactionInit } from "@/types/transaction.types";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    initTransaction: builder.mutation<ITransaction, ITransactionInit>({
      query: (transData) => ({
        url: "/transaction",
        method: "POST",
        data: transData,
      }),
    }),
  }),
});
