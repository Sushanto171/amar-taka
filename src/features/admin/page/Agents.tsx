import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AgentsList from "../components/AgentsList";
import WaitingForApproval from "../components/WaitingForApproval";

export default function Agents() {
  return (
    <div>
      <Tabs defaultValue="agents" className="">
        <TabsList className="border-none w-full">
          <TabsTrigger className="cursor-pointer border-none data-[active]:text-accent" value="agents">Verified Agents</TabsTrigger>
          <TabsTrigger className="cursor-pointer border-none data-[active]:text-accent" value="waiting_for_approval">
            Waiting For Approval
          </TabsTrigger>
        </TabsList >
        <TabsContent value="agents" className="mt-6">
          <AgentsList />
        </TabsContent>
        <TabsContent value="waiting_for_approval" className="mt-6">
          <WaitingForApproval />
        </TabsContent>
      </Tabs>
    </div>
  );
}
