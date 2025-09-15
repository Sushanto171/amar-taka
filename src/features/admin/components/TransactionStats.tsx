import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { COLORS } from "@/constant/stats";
import type { ITransactionStats } from "@/types/stats.types";
import { convertTaka } from "@/utils/convertTaka";

import { Cell, Pie, PieChart } from "recharts";
export default function TransactionStats({
  transactionStats,
}: {
  transactionStats: ITransactionStats;
}) {
  const transactionPieData = transactionStats.statusByTransaction.map((tx) => ({
    name: tx._id,
    value: tx.count,
    percent: ((tx.count / transactionStats.totalTransaction) * 100).toFixed(1),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Statistics</CardTitle>
        <CardDescription>Cash In / Cash Out / Send Money</CardDescription>
      </CardHeader>
      <CardContent className="h-[350px] md:h-[180px] relative p-0">
        <ChartContainer config={{}} className="aspect-auto h-full w-full">
          <PieChart>
            <Pie
              data={transactionPieData}
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
                    fill={COLORS.find(
                      (_, i) => transactionPieData[i].name === name
                    )}
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
              {transactionPieData.map((_entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[140px]"
                  labelFormatter={(_value, props) => {
                    const name = props[0].payload.name;
                    return `${name} tx (${props[0].payload.percent}%)`;
                  }}
                />
              }
            />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-foreground text-base font-bold"
            >
              ৳{convertTaka(transactionStats.totalAmount)}
            </text>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <p className="text-center w-full">
          total transactions: {transactionStats.totalTransaction}
        </p>
      </CardFooter>
    </Card>
  );
}
