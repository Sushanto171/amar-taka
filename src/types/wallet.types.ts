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
