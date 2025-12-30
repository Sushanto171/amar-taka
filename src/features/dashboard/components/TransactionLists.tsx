import TypeFiltering from "@/components/TypeFiltering";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { transactionType } from "@/constant/transactionType";
import { useGetMeQuery } from "@/redux/features/user/user.api";
import type { ITransaction, TransactionType } from "@/types/transaction.types";
import { convertTaka } from "@/utils/convertTaka";
import type { Dispatch, SetStateAction } from "react";
interface IProps {
  transactions: ITransaction[];
  onChange: Dispatch<SetStateAction<TransactionType | null>>;
}
export default function TransactionLists({ transactions, onChange }: IProps) {
  const { data } = useGetMeQuery(undefined);
  const myNumber = data?.phone;
  return (
    <div>
      {" "}
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="min-w-[140px]">Date</TableHead>
            <TableHead className="min-w-[120px]">
              <TypeFiltering
                label="Types"
                typesObject={transactionType}
                onChange={onChange as Dispatch<SetStateAction<string | null>>}
              />
            </TableHead>
            <TableHead className="min-w-[100px]">Status</TableHead>
            <TableHead className="min-w-[140px]">Sender</TableHead>
            <TableHead className="min-w-[140px]">Receiver</TableHead>
            <TableHead className="min-w-[120px]">Amount</TableHead>
            <TableHead className="min-w-[100px]">Fee</TableHead>
            <TableHead className="min-w-[160px]">Reference</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length > 0 &&
            transactions?.map((tx) => (
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
                        ? "secondary"
                        : tx.status === "PENDING"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {tx.status}
                  </Badge>
                </TableCell>
                <TableCell className="min-w-[140px]">
                  {tx.sender === myNumber ? "You" : tx.sender}
                </TableCell>
                <TableCell className="min-w-[140px]">
                  {tx.receiver === myNumber ? "You" : tx.receiver}
                </TableCell>
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
    </div>
  );
}
