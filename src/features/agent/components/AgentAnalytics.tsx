"use client";

import { StatCard } from "@/components/StatCard";
import { Last7DaysTransactionsChart } from "@/features/admin/components/Last7DaysTnx";
import TransactionStats from "@/features/admin/components/TransactionStats";
import { useGetSingleAgentStatsQuery } from "@/redux/features/stats/stats.api";
import { Calendar, CreditCard, DollarSign, TrendingUp } from "lucide-react";
import AgentAnalyticsSkeleton from "./AgentAnalyticsSkeleton";



export default function AgentAnalytics() {
  const { data, isLoading } = useGetSingleAgentStatsQuery(undefined);
  return (
    <div className="p-6 space-y-6">
      {isLoading && <AgentAnalyticsSkeleton />}
      {/* Summary */}
      {!isLoading && data && (
        <>
          {/* Wallet Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Balance"
              value={data?.totalAmount || 12000}
              color="destructive"
              isCurrency
              icon={<DollarSign size={20} />}
            />
            <StatCard
              title="Revenue"
              value={data?.revenue || 100}
              color="accent"
              isCurrency
              icon={<TrendingUp size={20} />}
            />
            <StatCard
              title="Total Transactions"
              value={data?.totalTransaction || 5000}
              color="primary"
              icon={<CreditCard size={20} />}
            />
            <StatCard
              title="Tnx (30 Days)"
              value={data?.newTransactionInLast30Days || 0}
              color="secondary"
              icon={<Calendar size={20} />}
            />
          </div>

          <div className="md:grid md:grid-cols-3 gap-5">
            <TransactionStats
              transactionStats={data || []}
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
