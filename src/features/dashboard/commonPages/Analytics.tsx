import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import AgentStats from "@/features/admin/components/AgentStats";
import { ChartSkeleton } from "@/features/admin/components/ChartSkeleton";
import { Last7DaysTransactionsChart } from "@/features/admin/components/Last7DaysTnx";
import { StatCard } from "@/features/admin/components/StatCard";
import TransactionStats from "@/features/admin/components/TransactionStats";
import UserStats from "@/features/admin/components/UserStats";
import {
  useGetAgentStatsQuery,
  useGetSystemStatsQuery,
  useGetTransactionStatsQuery,
  useGetUserStatsQuery,
} from "@/redux/features/stats/stats.api";
import { convertTaka } from "@/utils/convertTaka";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const userChildren = (
  <>
    <CardTitle>User Statistics</CardTitle>
    <CardDescription>Breakdown by role</CardDescription>
  </>
);

const agentChildren = (
  <>
    <CardTitle>Agent Statistics</CardTitle>
    <CardDescription> Pending/ Verified / Rejected</CardDescription>
  </>
);

const tnxChildren = (
  <>
    <CardTitle>Transaction Statistics</CardTitle>
    <CardDescription>Cash In / Cash Out / Send Money</CardDescription>
  </>
);

export default function Analytics() {
  const { data: userStats, isLoading: userLoading } =
    useGetUserStatsQuery(undefined);
  const { data: agentStats, isLoading: agentLoading } =
    useGetAgentStatsQuery(undefined);
  const { data: transactionStats, isLoading: tnxLoading } =
    useGetTransactionStatsQuery(undefined);
  const { data: systemStats } = useGetSystemStatsQuery(undefined);

  const newUsersData = [
    { name: "Last 1 Days", users: userStats?.newUserInLast1Days },
    { name: "Last 2 Days", users: userStats?.newUserInLast2Days },
    { name: "Last 3 Days", users: userStats?.newUserInLast3Days },
    { name: "Last 7 Days", users: userStats?.newUserInLast7Days },
    { name: "Last 30 Days", users: userStats?.newUserInLast30Days },
  ];

  const newAgentsData = [
    { name: "Last 1 Days", agents: agentStats?.newAgentInLast1Days },
    { name: "Last 2 Days", agents: agentStats?.newAgentInLast2Days },
    { name: "Last 3 Days", agents: agentStats?.newAgentInLast3Days },
    { name: "Last 7 Days", agents: agentStats?.newAgentInLast7Days },
    { name: "Last 30 Days", agents: agentStats?.newAgentInLast30Days },
  ];

  const last7DaysTransactionsData = transactionStats?.last7DaysTransactions.map(
    (tx) => ({
      ...tx,
      amount: tx.amount / 100,
    })
  );

  return (
    <div className="p-6 space-y-6">
      {/* System Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="System Balance"
          value={`৳${convertTaka(systemStats?.amount || 0)}`}
        />
        <StatCard
          title="System Revenue"
          value={`৳${convertTaka(systemStats?.revenue || 0)}`}
        />
        <StatCard
          title="Total Transactions"
          value={transactionStats?.totalTransaction || 0}
        />
        <StatCard
          title="New Transactions (30 Days)"
          value={transactionStats?.newTransactionInLast30Days || 0}
        />
      </div>

      {/* Users & Agents Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        {userLoading && <ChartSkeleton children={userChildren} />}
        {userStats && (
          <UserStats userStats={userStats} children={userChildren} />
        )}
        {agentLoading && <ChartSkeleton children={agentChildren} />}
        {agentStats && (
          <AgentStats agentStats={agentStats} children={agentChildren} />
        )}
        {tnxLoading && <ChartSkeleton children={tnxChildren} />}
        {transactionStats && (
          <TransactionStats
            transactionStats={transactionStats}
            children={tnxChildren}
          />
        )}
      </div>

      {/* New Users & Agents Bar Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>New Users</CardTitle>
            <CardDescription>Registrations in last 7 & 30 days</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer config={{}} className="aspect-auto h-full w-full">
              <BarChart
                accessibilityLayer
                data={newUsersData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      className="w-[140px]"
                      labelFormatter={(value) => {
                        return `Users: ${value}`;
                      }}
                    />
                  }
                />
                <Bar dataKey="users" fill="#4F46E5" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>New Agents</CardTitle>
            <CardDescription>Registrations in last 7 & 30 days</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer config={{}} className="aspect-auto h-full w-full">
              <BarChart
                accessibilityLayer
                data={newAgentsData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      className="w-[140px]"
                      labelFormatter={(value) => {
                        return `Agents: ${value}`;
                      }}
                    />
                  }
                />
                <Bar dataKey="agents" fill="#10B981" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {last7DaysTransactionsData && (
        <Last7DaysTransactionsChart chartData={last7DaysTransactionsData} />
      )}
    </div>
  );
}
