import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types/global.types";
import type { IAuditLog } from "@/types/logs.types";

export const auditLogsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLogs: builder.query<IResponse<IAuditLog[]>, unknown>({
      query: (params) => ({
        url: "/audit-logs",
        params,
      }),
    }),
  }),
});

export const { useGetLogsQuery } = auditLogsApi;
