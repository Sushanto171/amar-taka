import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AgentForm from "../components/AgentForm";

export default function ApplyForAgent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Form</CardTitle>
      </CardHeader>
      <CardContent>
        <AgentForm />
      </CardContent>
    </Card>
  );
}
