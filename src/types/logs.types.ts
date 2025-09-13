export interface IAuditLog {
  _id: string;
  actor: Actor;
  actorWallet: string;
  targetWallet: string;
  action: string;
  status: string;
  ipAddress: string;
  device: Device;
  createdAt: string;
}

export interface Actor {
  _id: string
  name: string
  phone: string
}

export interface Device {
  browser: string;
  os: string;
  deviceType: string;
  brand: string;
  rawUserAgent: string;
}
