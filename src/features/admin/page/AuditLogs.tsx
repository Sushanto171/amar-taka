import Paginate from "@/components/Pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardSkeleton } from "@/features/dashboard/components/DashboardSkeleton";
import { useGetLogsQuery } from "@/redux/features/auditLogs/auditLogs.api";
import { useSearchParams } from "react-router";
import AuditLogList from "../../dashboard/components/LogsList";

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
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            Audit Logs{name && `/${name}`}
          </CardTitle>
          <CardContent className="overflow-auto">
            {isLoading && (
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
            )}
            {!isLoading && auditLogs && <AuditLogList logs={auditLogs} />}
          </CardContent>
        </CardHeader>
      </Card>

      {!isLoading && totalLogs && totalLogs > 10 && (
        <Paginate currentPage={Number(page)} totalPages={totalPages} />
      )}
    </>
  );
}
