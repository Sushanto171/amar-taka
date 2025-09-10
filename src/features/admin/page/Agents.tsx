import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AgentsList from "../components/AgentsList";
import WaitingForApproval from "../components/WaitingForApproval";

export default function Agents() {
  return (
    <div>
      <Tabs defaultValue="agents" className="">
        <TabsList>
          <TabsTrigger className="cursor-pointer" value="agents">Verified Agents</TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="waiting_for_approval">
            Waiting For Approval
          </TabsTrigger>
        </TabsList>
        <TabsContent value="agents">
          <AgentsList />
        </TabsContent>
        <TabsContent value="waiting_for_approval">
          <WaitingForApproval />
        </TabsContent>
      </Tabs>
    </div>
  );
}
