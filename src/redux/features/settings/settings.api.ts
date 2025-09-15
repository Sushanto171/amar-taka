import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types/global.types";
import type { ISettings } from "@/types/settings.types";

export const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSettings: builder.query<ISettings, unknown>({
      query: () => ({
        url: "/settings",
      }),
      transformResponse: (res: IResponse<ISettings>) => res.data,
      providesTags: ["SETTINGS"],
    }),
    updateSettings: builder.mutation<
      IResponse<string>,
      { data: ISettings; id: string }
    >({
      query: (data) => ({
        url: `/settings/${data.id}`,
        method: "PATCH",
        data: data.data,
      }),
      invalidatesTags: ["SETTINGS"],
    }),
  }),
});

export const { useGetSettingsQuery, useUpdateSettingsMutation } = settingsApi;
