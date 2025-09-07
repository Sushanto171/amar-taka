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
    }),
  }),
});

export const { useGetMyWalletQuery } = walletApi;
