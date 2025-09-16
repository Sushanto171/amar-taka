"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";

// Small inline SVG icons to avoid external icon resolution issues
const IconCopy: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <rect
      x="9"
      y="9"
      width="10"
      height="10"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <rect
      x="5"
      y="5"
      width="10"
      height="10"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const IconChevronDown: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M6 9l6 6 6-6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconDeviceDesktop: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <rect
      x="3"
      y="4"
      width="18"
      height="12"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M8 20h8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M12 16v4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const IconGlobe: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M2 12h20"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M12 3a15 15 0 010 18"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

// Types with optional fields to avoid runtime errors when data is undefined
type DeviceInfo = {
  browser?: string;
  os?: string;
  deviceType?: string;
  brand?: string;
  rawUserAgent?: string;
};

type AuditLog = {
  _id?: string;
  actor?: string;
  actorWallet?: string;
  targetWallet?: string;
  action?: string;
  status?: string;
  ipAddress?: string;
  device?: DeviceInfo;
  createdAt?: string;
};

export default function AuditLogView({ data }: { data?: AuditLog | null }) {
  const [showRawUA, setShowRawUA] = useState(false);

  // Safe defaults so the component never throws when `data` is missing
  const safeData: Required<AuditLog> = {
    _id: data?._id ?? "Unknown",
    actor: data?.actor ?? "-",
    actorWallet: data?.actorWallet ?? "-",
    targetWallet: data?.targetWallet ?? "-",
    action: data?.action ?? "-",
    status: data?.status ?? "UNKNOWN",
    ipAddress: data?.ipAddress ?? "-",
    device: {
      browser: data?.device?.browser ?? "-",
      os: data?.device?.os ?? "-",
      deviceType: data?.device?.deviceType ?? "-",
      brand: data?.device?.brand ?? "Unknown",
      rawUserAgent: data?.device?.rawUserAgent ?? "-",
    },
    createdAt: data?.createdAt ?? "",
  };

  const formatDate = (iso?: string) => {
    if (!iso) return "-";
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return iso;
    }
  };

  const copyJson = async () => {
    try {
      const payload = JSON.stringify(data ?? {}, null, 2);
      if (
        typeof navigator !== "undefined" &&
        navigator.clipboard &&
        navigator.clipboard.writeText
      ) {
        await navigator.clipboard.writeText(payload);
      } else if (typeof window !== "undefined") {
        const w = window.open();
        if (w) {
          w.document.write("<pre>" + payload + "</pre>");
          w.document.close();
        }
      }
      // optionally show toast
    } catch {
      // ignore copy errors
      // console.warn('copy failed', e)
    }
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-lg">Audit Log</CardTitle>
            <p className="text-sm text-muted-foreground">ID: {safeData._id}</p>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant={"default"}>{safeData.status}</Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyJson}
              title="Copy JSON"
            >
              <IconCopy />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Actor</p>
            <p className="font-medium">{safeData.actor}</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Actor Wallet</p>
            <p className="font-medium">{safeData.actorWallet}</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Target Wallet</p>
            <p className="font-medium">{safeData.targetWallet}</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Action</p>
            <p className="font-medium">{safeData.action}</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">IP Address</p>
            <p className="font-medium">{safeData.ipAddress}</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Created</p>
            <p className="font-medium">{formatDate(safeData.createdAt)}</p>
          </div>
        </div>

        <Separator />

        <div>
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Device</h4>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowRawUA(!showRawUA)}
              >
                <div className="flex items-center">
                  <IconChevronDown />
                  <span className="ml-1">{showRawUA ? "Hide" : "Show"}</span>
                </div>
              </Button>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <IconDeviceDesktop />
              <div>
                <p className="text-xs text-muted-foreground">Device Type</p>
                <p className="font-medium">{safeData.device.deviceType}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <IconGlobe />
              <div>
                <p className="text-xs text-muted-foreground">Browser / OS</p>
                <p className="font-medium">{`${safeData.device.browser} • ${safeData.device.os}`}</p>
              </div>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Brand</p>
              <p className="font-medium">{safeData.device.brand}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Raw UA</p>
              <p className="truncate font-mono text-xs">
                {safeData.device.rawUserAgent}
              </p>
            </div>
          </div>

          {showRawUA && (
            <pre className="mt-3 p-3 bg-slate-50 rounded text-xs overflow-auto">
              {safeData.device.rawUserAgent}
            </pre>
          )}
        </div>

        <div className="flex justify-end">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              // Default action: open a new window with full JSON for inspection
              if (typeof window !== "undefined") {
                const w = window.open();
                if (w) {
                  w.document.write(
                    "<pre>" + JSON.stringify(data ?? {}, null, 2) + "</pre>"
                  );
                  w.document.close();
                }
              }
            }}
          >
            View Full JSON
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ----- Demo / quick test case -----
export function AuditLogViewDemo() {
  const sample: AuditLog = {
    _id: "68c46625d88d78204a7d449a",
    actor: "68c4659dd88d78204a7d4454",
    actorWallet: "68c4659dd88d78204a7d4456",
    targetWallet: "68c321007694c9a0e3f46d39",
    action: "SEND_MONEY",
    status: "PENDING",
    ipAddress: "::1",
    device: {
      browser: "Chrome",
      os: "Windows",
      deviceType: "Desktop",
      brand: "Unknown",
      rawUserAgent:
        "mozilla/5.0 (windows nt 10.0; win64; x64) applewebkit/537.36 (khtml, like gecko) chrome/139.0.0.0 safari/537.36",
    },
    createdAt: new Date().toISOString(),
  };

  return (
    <div className="p-4">
      <AuditLogView data={sample} />
      <div className="mt-6">
        <h4 className="text-sm font-medium">Edge case: missing data prop</h4>
        <AuditLogView data={undefined} />
      </div>
    </div>
  );
}
