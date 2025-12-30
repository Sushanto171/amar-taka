
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Activity, CreditCard, DollarSign, TrendingUp } from "lucide-react";

export default function AdminDashboardSkeleton() {


  return (
    <div className="p-4 space-y-6">
      {/* Top Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="System Balance" value={0} isCurrency color="destructive" icon={<DollarSign />} />
        <StatCard title="System Revenue" value={0} isCurrency color="accent" icon={<TrendingUp />} />
        <StatCard title="Total Transactions" value={0} color="primary" icon={<CreditCard />} />
        <StatCard title="Active Users" value={0} color="secondary" icon={<Activity />} />
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-3">
        {["User Stats", "Agent Stats", "Transaction Stats"].map((title) => (
          <Card key={title} className="h-60 flex flex-col">
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center">
              <Skeleton className="w-32 h-32 rounded-full" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* New Users / Agents */}
      <div className="grid gap-4 md:grid-cols-2">
        {["New Users", "New Agents"].map((title) => (
          <Card key={title} className="h-48 flex flex-col">
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <p className="text-sm text-muted-foreground">Registrations in last 7 & 30 days</p>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center">
              <Skeleton className="w-full h-full rounded-md" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Last 7 Days Transactions */}
      <Card className="h-60">
        <CardHeader>
          <CardTitle>Last 7 Days Transactions</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center">
          <Skeleton className="w-full h-full rounded-md" />
        </CardContent>
      </Card>
    </div>
  );
}
