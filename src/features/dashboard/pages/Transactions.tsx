import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetMyTransactionsQuery } from "@/redux/features/transaction/transaction.api";
import { convertTaka } from "@/utils/convertTaka";

export default function Transactions() {
  const { data: transactions } = useGetMyTransactionsQuery(undefined);
  return (
    <Card className="p-6 shadow-md border rounded-xl">
      <h2 className="text-xl font-semibold mb-4">📊 Transactions</h2>

      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Fee</TableHead>
              <TableHead>Reference</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions?.map((tx) => (
              <TableRow key={tx._id} className="hover:bg-muted/40">
                <TableCell className="text-sm">
                  {new Date(tx.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      tx.type === "CASH_OUT"
                        ? "bg-red-100 text-red-600"
                        : "bg-blue-100 text-blue-600"
                    }
                  >
                    {tx.type === "P2P_TRANSFER" ? "SEND MONEY" : tx.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      tx.status === "SUCCESS"
                        ? "default"
                        : tx.status === "PENDING"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {tx.status}
                  </Badge>
                </TableCell>
                <TableCell>{tx.phone}</TableCell>
                <TableCell className="font-medium">
                  ৳ {convertTaka(tx.amount)}
                </TableCell>
                <TableCell>৳ {convertTaka(tx.fee)}</TableCell>
                <TableCell>{tx.reference || "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination
      <div className="flex justify-between items-center mt-4">
        <Button size="sm" variant="outline" disabled={meta.page === 1}>
          <ArrowLeft size={16} className="mr-1" /> Prev
        </Button>
        <p className="text-sm text-muted-foreground">
          Page {meta.page} of {meta.totalPages}
        </p>
        <Button
          size="sm"
          variant="outline"
          disabled={meta.page === meta.totalPages}
        >
          Next <ArrowRight size={16} className="ml-1" />
        </Button>
      </div> */}
    </Card>
  );
}
