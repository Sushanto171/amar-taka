import Paginate from "@/components/Pagination";
import { TransactionSkeleton } from "@/components/TransactionSkeleton";
import TypeFiltering from "@/components/TypeFiltering";
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
import type { TransactionType } from "@/types/transaction.types";
import { convertTaka } from "@/utils/convertTaka";
import { useState } from "react";
import { useSearchParams } from "react-router";

export default function Transactions() {
  const [type, setType] = useState<TransactionType | null>(null);

  const [searchParams] = useSearchParams("");
  const page = searchParams.get("page");

  const { data: transactionsData, isLoading } = useGetMyTransactionsQuery({
    type,
    page,
  });
  const transactions = transactionsData?.data ?? [];

  return (
    <Card className="p-6 shadow-md border rounded-xl">
      <h2 className="text-xl font-semibold mb-4">📊 Transactions</h2>

      <div className="overflow-x-auto rounded-md border">
        {isLoading && <TransactionSkeleton key={1} />}
        {!isLoading && transactions && transactions.length > 0 && (
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="min-w-[140px]">Date</TableHead>
                <TableHead className="min-w-[120px]">
                  <TypeFiltering onChange={setType} />
                </TableHead>
                <TableHead className="min-w-[100px]">Status</TableHead>
                <TableHead className="min-w-[140px]">Phone</TableHead>
                <TableHead className="min-w-[120px]">Amount</TableHead>
                <TableHead className="min-w-[100px]">Fee</TableHead>
                <TableHead className="min-w-[160px]">Reference</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions?.map((tx) => (
                <TableRow key={tx._id} className="hover:bg-muted/40">
                  <TableCell className="min-w-[140px] text-sm">
                    {new Date(tx.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell className="min-w-[120px]">
                    <Badge
                      variant="outline"
                      className={
                        tx.type === "CASH_OUT"
                          ? "bg-red-100 text-red-600"
                          : "bg-blue-100 text-blue-600"
                      }
                    >
                      {tx.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="min-w-[100px]">
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
                  <TableCell className="min-w-[140px]">{tx.phone}</TableCell>
                  <TableCell className="min-w-[120px] font-medium">
                    ৳ {convertTaka(tx.amount)}
                  </TableCell>
                  <TableCell className="min-w-[100px]">
                    ৳ {convertTaka(tx.fee)}
                  </TableCell>
                  <TableCell title={tx.reference} className="min-w-[160px] ">
                    {(tx.reference?.length > 15
                      ? `${tx.reference.slice(0, 15)}...`
                      : tx.reference) || "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        {!isLoading && !transactions?.length && (
          <div className="text-center py-1">
            <span>No Data Found.</span>
          </div>
        )}
      </div>
      {transactionsData && transactionsData.meta!.total > 10 && (
        <Paginate
          currentPage={Number(page) || 1}
          totalPages={transactionsData.meta!.totalPages}
        />
      )}
    </Card>
  );
}
