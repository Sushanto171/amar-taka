export interface ISingleAgentStats {
  totalAmount: number;
  revenue: number;
  totalTransaction: number;
  typeByTransaction: TypeByTransaction[];
  statusByTransaction: StatusByTransaction[];
  newTransactionInLast7Days: number;
  newTransactionInLast30Days: number;
  last7DaysTransactions: Last7DaysTransaction[];
}

export interface TypeByTransaction {
  _id: string;
  count: number;
  amount: number;
}

export interface StatusByTransaction {
  _id: string;
  count: number;
}

export interface Last7DaysTransaction {
  amount: number;
  type: string;
  status: string;
  createdAt: string;
}
