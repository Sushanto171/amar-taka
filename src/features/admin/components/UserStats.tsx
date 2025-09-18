import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { COLORS } from "@/constant/stats";
import type { IUserStats } from "@/types/stats.types";
import { convertTaka } from "@/utils/convertTaka";
import { ReactNode } from "react";

import { Cell, Pie, PieChart } from "recharts";

export default function UserStats({
  userStats,
  children,
}: {
  userStats: IUserStats;
  children: ReactNode;
}) {
  const userPieData = userStats.roleByUsers.map((role) => ({
    name: role._id,
    value: role.count,
    percent: ((role.count / userStats.total) * 100).toFixed(1),
  }));

  return (
    <Card>
      <CardHeader>{children}</CardHeader>
      <CardContent className="h-[350px] md:h-[180px] relative p-0">
        <ChartContainer config={{}} className="aspect-auto h-full w-full">
          <PieChart>
            <Pie
              data={userPieData}
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
                    fill={COLORS.find((_, i) => userPieData[i].name === name)}
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
              {userPieData.map((_entry, index) => (
                <Cell
                  className="text-xs"
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[140px]"
                  labelFormatter={(_value, props) => {
                    const name = props[0].payload.name;
                    return `${name} users (${props[0].payload.percent}%)`;
                  }}
                />
              }
            />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-foreground text-sm md:text-base font-bold"
            >
              ৳{convertTaka(userStats.amount)}
            </text>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <p className="text-center w-full">total users: {userStats.total}</p>
      </CardFooter>
    </Card>
  );
}
