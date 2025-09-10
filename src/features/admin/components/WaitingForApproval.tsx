import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllAgentsQuery } from "@/redux/features/agent/agent.api";
import { format } from "date-fns";
import { Link } from "react-router";
import AgentDetailsModal from "./AgentDetailsModal";
import AgentVerifyModal from "./AgentVerifyModal";
export default function WaitingForApproval() {
  const { data } = useGetAllAgentsQuery({
    searchTerm: "PENDING,REJECTED",
  });
  const agents = data?.data ?? [];
  return (
    <div className="overflow-x-auto border rounded-lg shadow-md">
      <Table>
        <TableCaption>List of all registered agents</TableCaption>

        {/* Header */}
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead>Agent Code</TableHead>
            <TableHead>License No.</TableHead>
            <TableHead>NID</TableHead>
            <TableHead>Service Areas</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>KYC</TableHead>
            <TableHead>Apply Time</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        {/* Body */}
        <TableBody>
          {agents?.map((agent) => (
            <TableRow key={agent._id} className="hover:bg-muted/40">
              <TableCell className="font-medium">{agent.agentCode}</TableCell>
              <TableCell>{agent.licenseNumber}</TableCell>
              <TableCell>{agent.nidNumber}</TableCell>

              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {agent.serviceAreas?.map((area, idx) => (
                    <Badge key={idx} variant="secondary">
                      {area}
                    </Badge>
                  ))}
                </div>
              </TableCell>

              <TableCell>
                <Badge
                  variant={
                    agent.status === "ACTIVE" ? "default" : "destructive"
                  }
                >
                  {agent.status}
                </Badge>
              </TableCell>

              <TableCell>
                <Badge
                  variant={
                    agent.kycStatus === "VERIFIED" ? "default" : "destructive"
                  }
                >
                  {agent.kycStatus}
                </Badge>
              </TableCell>

              <TableCell className="text-sm text-gray-500">
                {format(new Date(agent.createdAt), "dd MMM yyyy")}
              </TableCell>

              {/* Action Buttons */}
              <TableCell className="text-right space-x-2">
                <Link to={`?id=${agent._id}`}>
                  <AgentVerifyModal />
                </Link>
                <Link to={`?id=${agent._id}`}>
                  <AgentDetailsModal />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
