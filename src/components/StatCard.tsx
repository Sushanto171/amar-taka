import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CountUp from "react-countup";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon?: ReactNode; // optional Lucide icon
  color?: "primary" | "secondary" | "accent" | "destructive";
  isCurrency?: boolean; // optionally prefix value with currency symbol
}

export function StatCard({
  title,
  value,
  icon,
  color = "primary",
  isCurrency = false,
}: StatCardProps) {
  const colorClasses: Record<
    string,
    { bg: string; text: string; border: string }
  > = {
    primary: {
      bg: "bg-primary/10",
      text: "text-primary",
      border: "border-primary/20",
    },
    secondary: {
      bg: "bg-yellow-400/10",
      text: "text-yellow-400",
      border: "border-yellow-400/20",
    },
    accent: {
      bg: "bg-blue-400/10",
      text: "text-blue-400",
      border: "border-blue-400/20",
    },
    destructive: {
      bg: "bg-destructive/10",
      text: "text-destructive",
      border: "border-destructive/20",
    },
  };

  return (
    <Card
      className={`shadow-md border ${colorClasses[color].border} ${colorClasses[color].bg}`}
    >
      <CardHeader className="flex items-center gap-2">
        {icon && <span className={`${colorClasses[color].text} w-6 h-6`}>{icon}</span>}
        <CardTitle className={`text-base font-medium truncate ${colorClasses[color].text}`}>
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        {typeof value === "number" ? (
          <p className={`text-2xl font-bold ${colorClasses[color].text}`}>
            {isCurrency ? "৳" : ""}
            <CountUp end={isCurrency? value/100 : value} duration={1.5} separator="," />
          </p>
        ) : (
          <p className={`text-2xl font-bold ${colorClasses[color].text}`}>{value}</p>
        )}
      </CardContent>
    </Card>
  );
}
