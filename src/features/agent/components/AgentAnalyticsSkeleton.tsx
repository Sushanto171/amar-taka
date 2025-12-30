import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CreditCard, DollarSign, TrendingUp } from "lucide-react";

export default function AgentAnalyticsSkeleton() {
  return (
    <div className="p-6 space-y-6">
      {/* Top Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Balance" value={0} isCurrency color="destructive" icon={<DollarSign />} />
        <StatCard title="Revenue" value={0} isCurrency color="accent" icon={<TrendingUp />} />
        <StatCard title="Total Transactions" value={0} color="primary" icon={<CreditCard />} />
        <StatCard title="Tnx (30days)" value={0} color="secondary" icon={<Calendar />} />
      </div>

      <div className="md:grid md:grid-cols-3 gap-5">
        {/* Transaction Statistics */}
        <Card >
          <CardHeader>
            <CardTitle>Transaction Statistics</CardTitle>
            <p className="text-sm text-muted-foreground">
              Cash In / Cash Out / Send Money
            </p>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            {/* Placeholder for donut chart */}
            <div className="w-40 h-40 rounded-full bg-muted flex items-center justify-center">
              <span className="text-xl font-bold">৳0.00</span>
            </div>
            <p className="mt-4 text-sm">total transactions: 0</p>
          </CardContent>
        </Card>

        {/* Last 7 Days Transactions */}
        <div className="col-span-2 mt-4 md:mt-0">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Last 7 Days Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Placeholder for bar chart */}
              <div className="w-full h-40 bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">No Data</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
