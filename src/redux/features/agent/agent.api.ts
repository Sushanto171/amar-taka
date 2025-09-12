import type {
  IAgentData,
  IAgentStatus,
  IKYCStatus,
} from "@/features/agent/types/agent.types";
import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types/global.types";

export const agentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registrationForAgent: builder.mutation({
      query: (data) => ({
        url: "/agent/registration",
        method: "POST",
        data,
      }),
      invalidatesTags: ["USER"],
    }),
    verifyAgent: builder.mutation<
      IResponse<string>,
      { id: string; kycStatus?: IKYCStatus; status: IAgentStatus }
    >({
      query: (data) => ({
        url: `/agent/verify-status/${data.id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["USER", "AGENT"],
    }),
    updateAgent: builder.mutation({
      query: (data) => ({
        url: `/agent/${data.id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["USER", "AGENT"],
    }),
    getAgent: builder.query<IAgentData, { id: string }>({
      query: (query) => ({
        url: `/agent/${query.id}`,
      }),
      transformResponse: (response: IResponse<IAgentData>) => response.data,
    }),
    getAllAgents: builder.query<IResponse<IAgentData[]>, unknown>({
      query: (params) => ({
        url: `/agent`,
        params,
      }),
      providesTags: ["AGENT"],
    }),
    getSingleAgents: builder.query<IAgentData, string>({
      query: (params) => ({
        url: `/agent/${params}`,
      }),
      transformResponse: (response: IResponse<IAgentData>) => response.data,
      providesTags: ["AGENT"],
    }),
  }),
});

export const {
  useRegistrationForAgentMutation,
  useGetAgentQuery,
  useGetAllAgentsQuery,
  useGetSingleAgentsQuery,
  useUpdateAgentMutation,
  useVerifyAgentMutation,
} = agentApi;
