import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { transactionMeta } from "@/lib/transaction-ui";
import { cn } from "@/lib/utils";
import { TRole } from "@/types/global.types";
import { ITransaction } from "@/types/transaction.types";
import { convertTaka } from "@/utils/convertTaka";
import { Link } from "react-router";

interface RecentTransactionsProps {
  transactions: ITransaction[];
  role: TRole;
}

export default function RecentTransactions({ transactions, role }: RecentTransactionsProps) {
  return (
    <Card className="bg-surface-dark border pt-0 border-accent/20 rounded-xl">
      <CardHeader className="flex justify-between items-center py-4 px-5 bg-accent/10 rounded-t-xl">
        <CardTitle className="text-lg font-semibold">
          Recent Transactions
        </CardTitle>
        <Link to={`/${role?.toLowerCase()}/transactions`}>
          <span className="text-sm text-primary hover:underline cursor-pointer">
            View All
          </span>
        </Link>
      </CardHeader>

      <CardContent className="space-y-3 px-5 py-4">
        {transactions.map((tx) => {
          const meta = transactionMeta[tx.type as keyof typeof transactionMeta];
          const Icon = meta?.icon;

          return (
            <div
              key={tx._id}
              className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors"
            >
              {/* Transaction */}
              <div className="flex items-center gap-3">
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", meta?.color)}>
                  {Icon && <Icon className="w-5 h-5" />}
                </div>
                <div>
                  <p className="font-semibold ">{meta?.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{tx.reference}</p>
                </div>
              </div>

              {/* Date */}
              <div className="text-sm text-muted-foreground">
                {new Date(tx.createdAt).toLocaleDateString()}<br />
                <span className="text-xs">{new Date(tx.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>

              {/* Status */}
              <div>
                <Badge
                  variant="outline"
                  className={cn(
                    "text-xs",
                    tx.status === "SUCCESS" && "border-green-500/30 text-green-400",
                    tx.status === "PENDING" && "border-yellow-500/30 text-yellow-400",
                    tx.status === "FAILED" && "border-red-500/30 text-red-400"
                  )}
                >
                  {tx.status}
                </Badge>
              </div>

              {/* Amount */}
              <div className={cn("font-bold text-right", tx.amount > 0 ? "text-green-400" : "text-red-500")}>
                {tx.amount > 0 ? `+ ৳${convertTaka(tx.amount)}` : `- ৳${Math.abs(tx.amount).toLocaleString()}`}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
