export interface IAuditLog {
  _id: string;
  actor: string;
  actorWallet: string;
  targetWallet: string;
  action: string;
  status: string;
  ipAddress: string;
  device: Device;
  createdAt: string;
}

export interface Device {
  browser: string;
  os: string;
  deviceType: string;
  brand: string;
  rawUserAgent: string;
}
