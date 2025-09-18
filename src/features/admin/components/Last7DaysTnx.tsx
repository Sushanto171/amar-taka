/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Bar, BarChart, CartesianGrid, Cell, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "An interactive bar chart";

const chartConfig = {
  amount: {
    label: "Transactions",
    color: "#16A34A",
  },
} satisfies ChartConfig;

const STATUS_COLORS: Record<string, string> = {
  SUCCESS: "#16A34A",
  PENDING: "#4F46E5",
  FAILED: "#DC2626",
};

export function Last7DaysTransactionsChart({ chartData }: { chartData: any }) {
  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
          <CardTitle>Last 7 Days Transactions</CardTitle>
          <CardDescription></CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="createdAt"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-auto"
                  labelFormatter={(_value, props) => {
                    const status = props[0].payload.status;
                    const type = props[0].payload.type;
                    return (
                      <div className="flex flex-col">
                        <p>Type: {type}</p>
                        <p>Status: {status}</p>
                      </div>
                    );
                  }}
                />
              }
            />
            <Bar dataKey="amount">
              {chartData.map(
                (entry: { status: string | number }, index: any) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={STATUS_COLORS[entry.status] || "gray"}
                  />
                )
              )}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
