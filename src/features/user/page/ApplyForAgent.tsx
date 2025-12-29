import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AgentProfileCard from "@/features/agent/components/AgentProfileCard";
import { useGetAgentQuery } from "@/redux/features/agent/agent.api";
import { useGetMeQuery } from "@/redux/features/user/user.api";
import AgentForm from "../components/AgentForm";

export default function ApplyForAgent() {
  const { data } = useGetMeQuery(undefined);
  const { data: agentData, isLoading } = useGetAgentQuery(
    { id: data?.agent as string },
    { skip: !(data && data.agent) }
  );

  return (
    <>
      {!data?.agent && (
        <Card>
          <CardHeader>
            <CardTitle>Application Form</CardTitle>
          </CardHeader>
          <CardContent>
            <AgentForm />
          </CardContent>
        </Card>
      )}
      {!isLoading && agentData && <AgentProfileCard data={agentData} />}
    </>
  );
}
