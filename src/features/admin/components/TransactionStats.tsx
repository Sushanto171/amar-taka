import { COLORS } from "@/constant/stats";
import { transactionStatus } from "@/constant/transactionType";
import { convertTaka } from "@/utils/convertTaka";
import type { ITransactionStats } from "@/types/stats.types";
import type { ISingleAgentStats } from "@/features/agent/types/agent.stats.types";
import ReusablePieChart from "@/components/PieChar";

export default function TransactionStats({
  transactionStats,
}: {
  transactionStats: ITransactionStats | ISingleAgentStats;
}) {
  const transactionPieData = transactionStats.statusByTransaction.map(tx => ({
    name: tx._id,
    value: tx.count,
    percent: ((tx.count / transactionStats.totalTransaction) * 100).toFixed(1),
  }));

  // Map colors dynamically based on status
  const pieColors = transactionPieData.map(entry =>
    entry.name === transactionStatus.success
      ? COLORS[1]
      : entry.name === transactionStatus.pending
      ? COLORS[0]
      : COLORS[2]
  );

  return (
    <ReusablePieChart
      title="Transaction Stats"
      data={transactionPieData}
      colors={pieColors}
      centerLabel={`৳${convertTaka(transactionStats.totalAmount)}`}
      footerContent={
        <p className="text-center w-full">
          total transactions: {transactionStats.totalTransaction}
        </p>
      }
      innerRadius="50%"
      outerRadius="85%"
    />
  );
}
