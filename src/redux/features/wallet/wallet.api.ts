import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types/global.types";
import type { IWallet } from "@/types/wallet.types";

export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyWallet: builder.query<IWallet, unknown>({
      query: () => ({
        url: "/wallet",
      }),
      transformResponse: (response: IResponse<IWallet>) => response.data,
      providesTags: ["WALLET"],
    }),
    sendMoney: builder.mutation({
      query: (data) => ({
        url: "/wallet/send-money",
        method: "POST",
        data,
      }),
      invalidatesTags: ["WALLET"],
    }),
  }),
});

export const { useGetMyWalletQuery, useSendMoneyMutation } = walletApi;
