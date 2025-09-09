import type { IAgentData } from "@/features/agent/components/agent.types";
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
    }),
  }),
});

export const {
  useRegistrationForAgentMutation,
  useGetAgentQuery,
  useGetAllAgentsQuery,
} = agentApi;
