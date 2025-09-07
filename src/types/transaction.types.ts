export interface ITransactionInit {
  phone: string;
  amount: number;
  reference: string;
  type: transactionType;
}

export type transactionType =
  | "CASH_IN"
  | "CASH_OUT"
  | "P2P_TRANSFER"
  | "MERCHANT_PAYMENT"
  | "BILL_PAYMENT";

export interface ITransaction {
  fromWallet: string;
  amount: number;
  type: string;
  status: string;
  toWallet: string;
  phone: string;
  reference: string;
  fee: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
}
