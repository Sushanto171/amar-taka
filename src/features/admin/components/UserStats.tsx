import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { COLORS } from "@/constant/stats";
import type { IUserStats } from "@/types/stats.types";
import { convertTaka } from "@/utils/convertTaka";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function UserStats({ userStats }: { userStats: IUserStats }) {
  const userPieData = userStats.roleByUsers.map((role) => ({
    name: role._id,
    value: role.count,
    percent: ((role.count / userStats.total) * 100).toFixed(1),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Statistics</CardTitle>
        <CardDescription>Breakdown by role</CardDescription>
      </CardHeader>
      <CardContent className="h-[350px] md:h-[180px] relative p-0">
        <ResponsiveContainer className="right-0" width="100%" height="100%">
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
            <Tooltip
              formatter={(value: number, name: string, props) => [
                `${value} users (${props.payload.percent}%)`,
                name,
              ]}
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
        </ResponsiveContainer>
      </CardContent>
      <CardFooter>
        <p className="text-center w-full">total users: {userStats.total}</p>
      </CardFooter>
    </Card>
  );
}
