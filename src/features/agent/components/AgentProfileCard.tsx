"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import type { IAgentData } from "../types/agent.types";

export default function AgentProfileCard({ data }: { data: IAgentData }) {
  return (
    <Card className="max-w-lg w-full mx-auto shadow-lg border rounded-lg overflow-hidden">
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-semibold">
          {data?.agentCode}
        </CardTitle>
        <CardDescription>
          Status:{" "}
          <Badge
            variant={data?.status === "ACTIVE" ? "default" : "destructive"}
          >
            {data?.status}
          </Badge>{" "}
          | KYC:{" "}
          <Badge
            variant={
              data?.kycStatus === "APPROVED"
                ? "default"
                : data?.kycStatus === "PENDING"
                ? "secondary"
                : "destructive"
            }
          >
            {data?.kycStatus}
          </Badge>
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        <div className="flex justify-between">
          <span className="font-medium">License Number:</span>
          <span>{data?.licenseNumber}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">NID Number:</span>
          <span>{data?.nidNumber}</span>
        </div>

        {/* ✅ NID Photo Section */}
        <div>
          <span className="font-medium">NID Photos:</span>
          <div className="flex gap-4 mt-2">
            {data?.nidPhotoUrl?.frontend ? (
              <div className="flex flex-col items-center">
                <img
                  src={data.nidPhotoUrl.frontend}
                  alt="NID Front"
                  className="w-28 h-20 object-cover border rounded"
                />
                <span className="text-xs mt-1 text-gray-500">Front</span>
              </div>
            ) : (
              <span className="text-sm text-gray-400">No Front Image</span>
            )}

            {data?.nidPhotoUrl?.backend ? (
              <div className="flex flex-col items-center">
                <img
                  src={data.nidPhotoUrl.backend}
                  alt="NID Back"
                  className="w-28 h-20 object-cover border rounded"
                />
                <span className="text-xs mt-1 text-gray-500">Back</span>
              </div>
            ) : (
              <span className="text-sm text-gray-400">No Back Image</span>
            )}
          </div>
        </div>
        {/* ✅ End NID Photo Section */}

        <div>
          <span className="font-medium">Service Areas:</span>
          <div className="flex flex-wrap gap-2 mt-1">
            {data?.serviceAreas?.map((area, idx) => (
              <Badge key={idx} variant="secondary">
                {area}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex justify-between text-sm text-gray-500">
          <span>Created At:</span>
          <span>
            {format(
              new Date(data?.createdAt || new Date()),
              "dd MMM yyyy, hh:mm a"
            )}
          </span>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>Updated At:</span>
          <span>
            {format(
              new Date(data?.updatedAt || new Date()),
              "dd MMM yyyy, hh:mm a"
            )}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
