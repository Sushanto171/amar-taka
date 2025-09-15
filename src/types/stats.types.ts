export interface ITransactionStats {
  totalTransaction: number;
  newTransactionInLast7Days: number;
  newTransactionInLast30Days: number;
  typeByTransaction: TypeByTransaction[];
  statusByTransaction: StatusByTransaction[];
  last7DaysTransactions: Last7DaysTransaction[];
  totalAmount: number;
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

export interface IAgentStats {
  totalAgent: number;
  KYCStatus: KycStatus[];
  amount: number;
  revenue: number;
  newAgentInLast1Days: number;
  newAgentInLast2Days: number;
  newAgentInLast3Days: number;
  newAgentInLast7Days: number;
  newAgentInLast30Days: number;
}

export interface KycStatus {
  _id: string;
  count: number;
}

export interface IUserStats {
  total: number;
  totalVerified: number;
  roleByUsers: RoleByUser[];
  newUserInLast1Days: number;
  newUserInLast2Days: number;
  newUserInLast3Days: number;
  newUserInLast7Days: number;
  newUserInLast30Days: number;
  amount: number;
}

export interface RoleByUser {
  _id: string;
  count: number;
}

export interface ISystemStats {
  amount: number;
  revenue: number;
}
