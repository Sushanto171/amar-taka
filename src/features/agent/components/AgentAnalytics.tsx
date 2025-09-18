"use client";

import { CardDescription, CardTitle } from "@/components/ui/card";
import { Last7DaysTransactionsChart } from "@/features/admin/components/Last7DaysTnx";
import { StatCard } from "@/features/admin/components/StatCard";
import TransactionStats from "@/features/admin/components/TransactionStats";
import { useGetSingleAgentStatsQuery } from "@/redux/features/stats/stats.api";
import { convertTaka } from "@/utils/convertTaka";

const tnxChildren = (
  <>
    <CardTitle>Transaction Statistics</CardTitle>
    <CardDescription>Cash In / Cash Out / Send Money</CardDescription>
  </>
);

export default function AgentAnalytics() {
  const { data, isLoading } = useGetSingleAgentStatsQuery(undefined);
  return (
    <div className="p-6 space-y-6">
      {isLoading && <div>........</div>}
      {/* Summary */}
      {!isLoading && data && (
        <>
          {/* Wallet Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Wallet Balance"
              value={`৳${convertTaka(data?.totalAmount || 0)}`}
            />
            <StatCard
              title="Wallet Revenue"
              value={`৳${convertTaka(data?.revenue || 0)}`}
            />
            <StatCard
              title="Total Transactions"
              value={data.totalTransaction || 0}
            />
            <StatCard
              title="New Transactions (30 Days)"
              value={data?.newTransactionInLast30Days || 0}
            />
          </div>

          <div className="md:grid md:grid-cols-3 gap-5">
            <TransactionStats
              transactionStats={data || []}
              children={tnxChildren}
            />
            <div className="col-span-2 mt-4 md:mt-0">
              <Last7DaysTransactionsChart
                chartData={data.last7DaysTransactions}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
