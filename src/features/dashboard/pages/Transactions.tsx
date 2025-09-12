import Paginate from "@/components/Pagination";
import { TransactionSkeleton } from "@/components/TransactionSkeleton";
import { Card } from "@/components/ui/card";
import {
  useGetAllTransactionsQuery,
  useGetMyTransactionsQuery,
} from "@/redux/features/transaction/transaction.api";
import type { TransactionType } from "@/types/transaction.types";
import { getTotalTnxWithPages } from "@/utils/getTotalTnxWithPages";
import { useState } from "react";
import { useLocation, useSearchParams } from "react-router";
import TransactionLists from "../components/TransactionLists";

export default function Transactions() {
  const [type, setType] = useState<TransactionType | null>(null);

  const [searchParams] = useSearchParams("");
  const page = searchParams.get("page");
  const { pathname } = useLocation();
  const root = pathname.split("/")[1];

  const { data: allTransactionsData, isLoading: isAllTaxLoading } =
    useGetAllTransactionsQuery(
      {
        type,
        page,
      },
      { skip: root !== "admin" }
    );
  const { data: transactionsData, isLoading } = useGetMyTransactionsQuery(
    {
      type,
      page,
    },
    { skip: root === "admin" }
  );

  const { transactions, totalPages, totalTnx } = getTotalTnxWithPages(
    transactionsData || allTransactionsData
  );

  return (
    <Card className="p-6 shadow-md border rounded-xl">
      <h2 className="text-xl font-semibold mb-4">📊 Transactions</h2>

      <div className="overflow-x-auto rounded-md border">
        {(isLoading || isAllTaxLoading) && <TransactionSkeleton key={1} />}
        {(!isLoading || !isAllTaxLoading) && transactions && (
          <TransactionLists onChange={setType} transactions={transactions} />
        )}
        {(!isLoading || !isAllTaxLoading) && !transactions?.length && (
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
