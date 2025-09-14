import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { COLORS } from "@/constant/stats";
import type { IAgentStats } from "@/types/stats.types";
import { convertTaka } from "@/utils/convertTaka";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function AgentStats({
  agentStats,
}: {
  agentStats: IAgentStats;
}) {
  const agentPieData = agentStats.KYCStatus.map((role) => ({
    name: role._id,
    value: role.count,
    percent: ((role.count / agentStats.totalAgent) * 100).toFixed(1),
  }));
  return (
    <Card>
      <CardHeader>
        <CardTitle>Agent Statistics</CardTitle>
        <CardDescription> Pending/ Verified / Rejected</CardDescription>
      </CardHeader>
      <CardContent className="h-[350px] md:h-[180px] relative p-0">
        <ResponsiveContainer className="right-0" width="100%" height="100%">
          <PieChart>
            <Pie
              data={agentPieData}
              cx="50%"
              cy="50%"
              outerRadius="85%"
              innerRadius="50%"
              dataKey="value"
              labelLine={false}
              label={({ name, percent, cx, cy, midAngle, outerRadius }) => {
                const RADIAN = Math.PI / 180;
                const radius = outerRadius + 10; // position slightly outside the pie
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                return (
                  <text
                    x={x}
                    y={y}
                    fill={COLORS.find((_, i) => agentPieData[i].name === name)}
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                    fontSize={10}
                    fontWeight="bold"
                  >
                    {`${name} (${percent}%)`}
                  </text>
                );
              }}
            >
              {agentPieData.map((_entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string, props) => [
                `${value} agents (${props.payload.percent}%)`,
                name,
              ]}
            />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-foreground text-base font-bold"
            >
              ৳{convertTaka(agentStats.amount)}
            </text>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex flex-col">
        <p className="text-center w-full">
          total agents: {agentStats.totalAgent}
        </p>
        <p className="text-center w-full">
          total revenue: ৳{convertTaka(agentStats.revenue)}
        </p>
      </CardFooter>
    </Card>
  );
}
