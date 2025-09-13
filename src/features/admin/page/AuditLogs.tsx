import { useGetLogsQuery } from "@/redux/features/auditLogs/auditLogs.api";
import AuditLogList from "../components/LogsList";

export default function AuditLogs() {
  const { data, isLoading } = useGetLogsQuery(undefined);
  // Replace with a utility function compatible with audit logs, or handle data directly
  const auditLogs = data?.data ?? [];
  // const totalLogs = data?.meta!.total ?? 0;
  // const totalPages = data?.meta!.totalPages ?? 1;

  return <>{!isLoading && auditLogs && <AuditLogList logs={auditLogs} />}</>;
}
