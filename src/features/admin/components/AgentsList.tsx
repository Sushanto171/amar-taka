import Paginate from "@/components/Pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { IAgentData } from "@/features/agent/types/agent.types";
import { DashboardSkeleton } from "@/features/dashboard/components/DashboardSkeleton";
import { useGetAllAgentsQuery } from "@/redux/features/agent/agent.api";
import { convertTaka } from "@/utils/convertTaka";
import { getTotalDataWithPages } from "@/utils/getTotalDataWithPages";
import { format } from "date-fns";
import { Link, useSearchParams } from "react-router";
import AgentDetailsModal from "./AgentDetailsModal";
import AgentStatusUpdateModal from "./AgentStatusUpdateModal";
export default function AgentsList() {
  const [searchParams] = useSearchParams("");
  const page = searchParams.get("page");
  const { data, isLoading } = useGetAllAgentsQuery({ kycStatus: "VERIFIED" });
  const [agents, total, totalPages] = getTotalDataWithPages<IAgentData>(data);
  return (
    <div className="overflow-x-auto border rounded-lg shadow-md">
      {isLoading && (
        <DashboardSkeleton
          labels={[
            "Agent Code",
            "License No.",
            "NID",
            "Revenue",
            "Service Areas",
            "Status",
            "KYC",
            "Created",
            "Action",
          ]}
          key={1}
        />
      )}
      {!isLoading && (
        <Table>
          {!agents.length ? (
            <TableCaption className="text-center font-semibold text-lg py-2 w-full ">
              No Agents Found.
            </TableCaption>
          ) : (
            <TableCaption>List of all verified agents</TableCaption>
          )}

          {/* Header */}
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Agent Code</TableHead>
              <TableHead>License No.</TableHead>
              <TableHead>NID</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Service Areas</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>KYC</TableHead>
              <TableHead>Created</TableHead>
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
                <TableCell>৳{convertTaka(agent.wallet.revenue)}</TableCell>

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
                    <AgentStatusUpdateModal />
                  </Link>
                  <Link to={`?id=${agent._id}`}>
                    <AgentDetailsModal />
                  </Link>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="hover:bg-primary"
                  >
                    <Link to={`/admin/users/transactions/${agent.user.phone}`}>
                      Transactions
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="hover:bg-primary"
                  >
                    <Link
                      to={`/admin/audit-logs?id=${agent.user._id}&name=${agent.user.name}`}
                    >
                      Activities
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {/* Pagination */}
      {agents && total > 10 && (
        <Paginate currentPage={Number(page) || 1} totalPages={totalPages} />
      )}
    </div>
  );
}
