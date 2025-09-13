/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { IAuditLog } from "@/types/logs.types";
import { useEffect, useState } from "react";

export default function AuditLogList({
  logs,
  showAction = true,
  showActor = true,
}: {
  logs: IAuditLog[];
  showAction?: boolean;
  showActor?: boolean;
}) {
  const [selected, setSelected] = useState<any | null>(null);
  useEffect(() => {
    if (selected) {
      const contentEl = document.getElementById("content");
      if (contentEl) {
        contentEl.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      scrollTo({
        behavior: "smooth",
        top: 100,
      });
    }
  }, [selected]);
  return (
    <div className="space-y-6 ">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            {showActor && <TableHead>Actor</TableHead>}
            <TableHead>Action</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Device</TableHead>
            <TableHead>Date</TableHead>
            {showAction && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log._id}>
              <TableCell className="font-mono text-xs">
                {log._id.slice(-6)}
              </TableCell>
              {showActor && <TableCell>{log.actor?.name}</TableCell>}
              <TableCell>{log.action}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    log.status === "SUCCESS"
                      ? "default"
                      : log.status === "FAILED"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {log.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="text-xs">
                  {log.device.deviceType} / {log.device.browser} /{" "}
                  {log.device.os}
                </div>
              </TableCell>
              <TableCell>{new Date(log.createdAt).toLocaleString()}</TableCell>
              {showAction && (
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelected(log)}
                  >
                    View
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selected && (
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Log Details
              <Button variant="outline" onClick={() => setSelected("")}>
                Less
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent id="content">
            <pre className="bg-muted p-3 rounded-md text-xs overflow-x-auto">
              {JSON.stringify(selected, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
