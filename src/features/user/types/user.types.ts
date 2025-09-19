import type { TRole } from "@/types/global.types";

export interface IUser {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  role: TRole;
  failedLoginAttempts: number;
  lockUntil: string;
  isDeleted: boolean;
  isSuspended: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  wallet: string;
  agent?: string;
}

export interface IUpdateUser {
  _id: string;
  name: string;
  phone: string;
  email?: string | undefined;
}
