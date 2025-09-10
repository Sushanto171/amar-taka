export interface ITransactionInit {
  phone: string;
  amount: number;
  reference?: string;
  type: TransactionType;
}

export type TransactionType =
  | "CASH_IN"
  | "CASH_OUT"
  | "SEND_MONEY"
  | "MERCHANT_PAYMENT"
  | "BILL_PAYMENT";

export interface ITransaction {
  fromWallet: string;
  amount: number;
  type: TransactionType;
  status: string;
  toWallet: string;
  receiver: string;
sender: string;
  reference: string;
  fee: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
}
