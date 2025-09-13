import Paginate from "@/components/Pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardSkeleton } from "@/features/dashboard/components/DashboardSkeleton";
import AuditLogList from "@/features/dashboard/components/LogsList";
import { useGetLogsQuery } from "@/redux/features/auditLogs/auditLogs.api";
import { useGetMeQuery } from "@/redux/features/user/user.api";
import { useSearchParams } from "react-router";

export default function Activities() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const { data: me } = useGetMeQuery(undefined);

  const { data, isLoading } = useGetLogsQuery(
    { page, actor: me?._id },
    { skip: !me }
  );
  const auditLogs = data?.data ?? [];
  const totalLogs = data?.meta!.total;
  const totalPages = data?.meta!.totalPages ?? 1;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Activities</CardTitle>
          <CardContent className="overflow-auto">
            {isLoading && (
              <DashboardSkeleton
                labels={["ID", "Action", "Status", "Device", "Date", "Actions"]}
              />
            )}
            {!isLoading && auditLogs && (
              <AuditLogList showActor={false} logs={auditLogs} />
            )}
          </CardContent>
        </CardHeader>
      </Card>

      {!isLoading && totalLogs && totalLogs > 10 && (
        <Paginate currentPage={Number(page)} totalPages={totalPages} />
      )}
    </>
  );
}
