

export interface IUser {
  _id: string;
  name: string;
  phone: string;
  email: string;
  role: string;
  failedLoginAttempts: number;
  lockUntil: string;
  isDeleted: boolean;
  isSuspended: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  wallet: IWallet;
}

export interface IWallet {
  _id: string;
  user: string;
  balance: number;
  currency: string;
  type: string;
  isBlock: boolean;
  revenue: number;
  createdAt: string;
  updatedAt: string;
}
