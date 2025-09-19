import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AgentAnalyticsSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Balance */}
        <Card>
          <CardHeader>
            <CardTitle>Balance</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">৳0.00</CardContent>
        </Card>

        {/* Revenue */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">৳0.00</CardContent>
        </Card>

        {/* Total Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Total Transactions</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">0</CardContent>
        </Card>

        {/* New Transactions (30 Days) */}
        <Card>
          <CardHeader>
            <CardTitle>New Transactions (30 Days)</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">0</CardContent>
        </Card>
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
