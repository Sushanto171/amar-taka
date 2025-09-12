import type { IResponse } from "@/types/global.types";
import type { ITransaction } from "@/types/transaction.types";

export const getTotalTnxWithPages = (
  transactionsData: IResponse<ITransaction[]> | undefined
) => {
  const transactions = transactionsData?.data || [];
  const totalTnx = transactionsData?.meta?.total || 1;
  const totalPages = transactionsData?.meta?.totalPages || 1;
  return { transactions, totalPages, totalTnx };
};
