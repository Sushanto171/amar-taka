/* eslint-disable react-hooks/exhaustive-deps */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetSingleAgentsQuery } from "@/redux/features/agent/agent.api";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
export default function AgentDetailsModal() {
  const [searchParams, setSearchParams] = useSearchParams("");
  const [open, setOpen] = useState(false);
  const id = searchParams.get("id");
  const { data, isLoading } = useGetSingleAgentsQuery(id || "", { skip: !id });
  useEffect(() => {
    if (!open) {
      setSearchParams("");
    }
  }, [open]);
  return (
    <>
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 hover:bg-primary"
          >
            View
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Agent Details
            </DialogTitle>
            <DialogDescription className="sr-only">
              this agent details modal
            </DialogDescription>
          </DialogHeader>
          {!isLoading && data && (
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="font-medium">Agent Code:</span>
                <span>{data.agentCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">License Number:</span>
                <span>{data.licenseNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">NID Number:</span>
                <span>{data.nidNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Wallet:</span>
                <span>{data.wallet}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">User:</span>
                <span>{data.user}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Service Areas:</span>
                <span>{data.serviceAreas.join(", ")}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">KYC Status:</span>
                <Badge>{data.kycStatus}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Status:</span>
                <Badge
                  variant={data.status === "ACTIVE" ? "default" : "secondary"}
                >
                  {data.status}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Created At:</span>
                <span>{new Date(data.createdAt).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Updated At:</span>
                <span>{new Date(data.updatedAt).toLocaleString()}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
