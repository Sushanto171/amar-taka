import Paginate from "@/components/Pagination";
import { TransactionSkeleton } from "@/components/TransactionSkeleton";
import { Card } from "@/components/ui/card";
import { useGetAllTransactionsQuery } from "@/redux/features/transaction/transaction.api";
import { getTotalTnxWithPages } from "@/utils/getTotalTnxWithPages";
import { useParams, useSearchParams } from "react-router";

import TransactionLists from "@/features/dashboard/components/TransactionLists";
import type { TransactionType } from "@/types/transaction.types";
import { useState } from "react";
export default function UserByTransactions() {
  const [type, setType] = useState<TransactionType | null>(null);

  const [searchParams] = useSearchParams("");
  const page = searchParams.get("page");
  const { phone } = useParams();
  const { data, isLoading } = useGetAllTransactionsQuery({
    searchTerm: phone,
    type,
  });
  const { transactions, totalTnx, totalPages } = getTotalTnxWithPages(data);
  return (
    <Card className="p-6 shadow-md border rounded-xl">
      <h2 className="text-xl font-semibold mb-4">📊 Transactions</h2>

      <div className="overflow-x-auto rounded-md border">
        {isLoading && <TransactionSkeleton key={1} />}
        {!isLoading && transactions && (
          <TransactionLists onChange={setType} transactions={transactions} />
        )}
        {!isLoading && !transactions?.length && (
          <div className="text-center py-1">
            <span>No Data Found.</span>
          </div>
        )}
      </div>
      {totalTnx && totalTnx > 10 && (
        <Paginate currentPage={Number(page) || 1} totalPages={totalPages} />
      )}
    </Card>
  );
}
