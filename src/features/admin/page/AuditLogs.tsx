import { DashboardSkeleton } from "@/components/DashboardSkeleton";
import Paginate from "@/components/Pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetLogsQuery } from "@/redux/features/auditLogs/auditLogs.api";
import { useSearchParams } from "react-router";
import AuditLogList from "../components/LogsList";

export default function AuditLogs() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const actorId = searchParams.get("id");
  const name = searchParams.get("name") || "";
  const { data, isLoading } = useGetLogsQuery({ page, actor: actorId });
  const auditLogs = data?.data ?? [];
  const totalLogs = data?.meta!.total;
  const totalPages = data?.meta!.totalPages ?? 1;

  return (
    <>
      {isLoading && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              Audit Logs{name && `/${name}`}
            </CardTitle>
            <CardContent>
              <DashboardSkeleton
                labels={[
                  "ID",
                  "Actor",
                  "Action",
                  "Status",
                  "Device",
                  "Date",
                  "Actions",
                ]}
              />
            </CardContent>
          </CardHeader>
        </Card>
      )}
      {!isLoading && auditLogs && <AuditLogList name={name} logs={auditLogs} />}

      {!isLoading && totalLogs && totalLogs > 10 && (
        <Paginate currentPage={Number(page)} totalPages={totalPages} />
      )}
    </>
  );
}
