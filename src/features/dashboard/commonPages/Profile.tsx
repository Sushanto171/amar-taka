import ProfileCard from "@/components/ProfileCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardSkeleton } from "@/features/dashboard/components/DashboardSkeleton";
import AuditLogList from "@/features/dashboard/components/LogsList";
import { useGetLogsQuery } from "@/redux/features/auditLogs/auditLogs.api";
import { useGetMeQuery } from "@/redux/features/user/user.api";
import { Link } from "react-router";

export default function Profile() {
  const { data } = useGetMeQuery(undefined);
  const { data: logsData, isLoading: LogLoading } = useGetLogsQuery(
    { actor: data?._id },
    { skip: !data?._id }
  );
  return (
    <>
      {data && <ProfileCard user={data} />}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Recent Activities</CardTitle>
          <CardContent>
            {LogLoading && (
              <DashboardSkeleton
                row={4}
                labels={["ID", "Action", "Status", "Device", "Date"]}
              />
            )}
            {!LogLoading && logsData && (
              <AuditLogList
                showAction={false}
                showActor={false}
                logs={logsData.data.slice(0, 4)}
              />
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="outline" asChild>
              <Link to={`/${data?.role.toLowerCase()}/activities`}>
                More Activities
              </Link>
            </Button>
          </CardFooter>
        </CardHeader>
      </Card>
    </>
  );
}
