import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardSkeleton } from "@/features/dashboard/components/DashboardSkeleton";
import AuditLogList from "@/features/dashboard/components/LogsList";
import { useGetLogsQuery } from "@/redux/features/auditLogs/auditLogs.api";
import { useGetMeQuery } from "@/redux/features/user/user.api";
import { ShieldCheck, ShieldX } from "lucide-react";

import UpdateProfile from "@/components/UpdateProfile";
import Divider from "@/features/admin/components/Divider";
import RestartTour from "@/features/driver/components/RestartTour";
import ProfileTour from "@/features/driver/tours/ProfileTour";
import { getTourKey } from "@/utils/getTourKey";
import { Link } from "react-router";
import { SecurityTab } from "./ChangePassword";

export default function Profile() {
  const { data: user, isLoading } = useGetMeQuery(undefined);
  const { data: logsData, isLoading: LogLoading } = useGetLogsQuery(
    { actor: user?._id },
    { skip: !user?._id }
  );
  const tourKey = getTourKey(user!.role);
  return (
    <>
      {!isLoading && user && (
        <Card className="w-full shadow-lg rounded-xl">
          <ProfileTour />
          {/* Header */}
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <Avatar className="h-14 w-14">
                <AvatarFallback>
                  {user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-xl font-semibold">
                  {user.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Wallet: {user.wallet.slice(0, 8)}...
                </p>
              </div>
            </div>

            <Badge
              variant={user.isSuspended ? "destructive" : "default"}
              className="px-3 py-1 "
            >
              {user.isSuspended ? "Inactive" : "Active"}
            </Badge>
          </CardHeader>

          {/* Tabs */}
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview" id="overview-tab">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="transactions" id="transactions-tab">
                  Transactions
                </TabsTrigger>
                <TabsTrigger value="security" id="security-tab">
                  Security
                </TabsTrigger>
                <TabsTrigger value="settings" id="settings-tab">
                  Settings
                </TabsTrigger>
              </TabsList>

              {/* Overview */}
              <TabsContent value="overview" className="space-y-6 pt-4">
                {/* Personal Info */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-md font-semibold">
                      Personal Information
                    </h3>
                    <UpdateProfile user={user} />
                  </div>
                  <Divider />
                  <div className="space-y-2 text-sm mt-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Full Name</span>
                      <span>{user.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phone</span>
                      <span>{user.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email</span>
                      <span>{user?.email || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Role</span>
                      <Badge variant="secondary">{user.role}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Verification
                      </span>
                      {user.isVerified ? (
                        <ShieldCheck size={18} className="text-green-600" />
                      ) : (
                        <ShieldX size={18} className="text-red-600" />
                      )}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Wallet ID</span>
                      <span>{user.wallet}</span>
                    </div>
                  </div>
                </div>

                {/* Account Info */}
                <div>
                  <h3 className="text-md font-semibold mb-3">
                    Account Information
                  </h3>
                  <Divider />
                  <div className="space-y-2 text-sm mt-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Failed Attempts
                      </span>
                      <span>{user.failedLoginAttempts}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Created</span>
                      <span>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Last Updated
                      </span>
                      <span>
                        {new Date(user.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Transactions */}
              <TabsContent value="transactions">
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
                        <Link to={`/${user?.role.toLowerCase()}/activities`}>
                          More Activities
                        </Link>
                      </Button>
                    </CardFooter>
                  </CardHeader>
                </Card>
              </TabsContent>

              {/* Security */}
              <SecurityTab />

              {/* Settings */}
              <TabsContent
                value="settings"
                className="min-h-[calc(100vh-270px)]"
              >
                <RestartTour tourKey={tourKey} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </>
  );
}
