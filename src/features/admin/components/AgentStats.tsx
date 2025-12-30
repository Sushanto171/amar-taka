import ReusablePieChart from "@/components/PieChar";
import { COLORS } from "@/constant/stats";
import { IAgentStats } from "@/types/stats.types";
import { convertTaka } from "@/utils/convertTaka";

export default function AgentStats({ agentStats }: { agentStats: IAgentStats }) {
  const agentPieData = agentStats.KYCStatus.map(role => ({
    name: role._id,
    value: role.count,
    percent: ((role.count / agentStats.totalAgent) * 100).toFixed(1),
  }));

  return (
    <ReusablePieChart
      title="Agent Stats"
      data={agentPieData}
      colors={COLORS}
      centerLabel={`৳${convertTaka(agentStats.amount)}`}
      footerContent={
        <>
          <p className="text-center w-full">total agents: {agentStats.totalAgent}</p>
          <p className="text-center w-full">total revenue: ৳{convertTaka(agentStats.revenue)}</p>
        </>
      }
    />
  );
}
