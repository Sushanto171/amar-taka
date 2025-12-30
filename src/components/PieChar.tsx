import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Cell, Pie, PieChart } from "recharts";
import { ReactNode } from "react";

interface PieChartData {
  name: string;
  value: number;
  percent?: number | string;
}

interface ReusablePieChartProps {
  title: ReactNode;
  data: PieChartData[];
  colors: string[];
  centerLabel?: ReactNode;
  footerContent?: ReactNode;
  innerRadius?: string | number;
  outerRadius?: string | number;
}

export default function ReusablePieChart({
  title,
  data,
  colors,
  centerLabel,
  footerContent,
  innerRadius = "50%",
  outerRadius = "85%",
}: ReusablePieChartProps) {
  return (
    <Card>
      <CardHeader>{title}</CardHeader>
      <CardContent className="h-[350px] md:h-[180px] relative p-0">
        <ChartContainer config={{}} className="aspect-auto h-full w-full">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              dataKey="value"
              labelLine={false}
              label={({ name, cx, cy, midAngle, outerRadius }) => {
                const RADIAN = Math.PI / 180;
                const radius = outerRadius + 10;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                const fill = colors[data.findIndex(d => d.name === name) % colors.length];

                return (
                  <text
                    x={x}
                    y={y}
                    fill={fill}
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                    fontSize={10}
                    fontWeight="bold"
                  >
                    {name}
                  </text>
                );
              }}
            >
              {data.map((_entry, index) => (
                <Cell key={index} fill={colors[index % colors.length]} />
              ))}
            </Pie>

            {data.length > 0 && (
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[140px]"
                    labelFormatter={(_value, props) => {
                      const name = props[0].payload.name;
                      const percent = props[0].payload.percent ?? "";
                      return `${name} (${percent}%)`;
                    }}
                  />
                }
              />
            )}

            {centerLabel && (
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-foreground text-base font-bold"
              >
                {centerLabel}
              </text>
            )}
          </PieChart>
        </ChartContainer>
      </CardContent>

      {footerContent && <CardFooter className="flex flex-col">{footerContent}</CardFooter>}
    </Card>
  );
}
