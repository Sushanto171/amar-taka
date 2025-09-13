export interface IAgentData {
  _id: string;
  user: string;
  wallet: {
    id: string;
    revenue: number;
  };
  agentCode: string;
  licenseNumber: string;
  nidNumber: string;
  serviceAreas: string[];
  kycStatus: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  nidPhotoUrl?: {
    backend: string;
    frontend: string;
  };
}
export type IKYCStatus = "PENDING" | "VERIFIED" | "REJECTED";

export type IAgentStatus = "ACTIVE" | "INACTIVE";
