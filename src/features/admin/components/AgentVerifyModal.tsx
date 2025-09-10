/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { agentStatus, kycStatus } from "@/constant/agent";
import type {
  IAgentStatus,
  IKYCStatus,
} from "@/features/agent/types/agent.types";
import { useVerifyAgentMutation } from "@/redux/features/agent/agent.api";
import { DialogClose } from "@radix-ui/react-dialog";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { toast } from "sonner";
export default function AgentVerifyModal() {
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams("");
  const [status, setStatus] = useState<IKYCStatus>("PENDING");
  const [verifyAgent] = useVerifyAgentMutation();

  useEffect(() => {
    if (!open) {
      const params = new URLSearchParams(searchParams);
      params.delete("id");
      setSearchParams(params);
    }
  }, [open]);

  const id = searchParams.get("id") || "";

  const handleSelect = async () => {
    const toastId = toast.loading("Updating agent status");
    const verifyData = {
      id,
      kycStatus: status,
      status: (status === "VERIFIED"
        ? agentStatus.ACTIVE
        : agentStatus.INACTIVE) as IAgentStatus,
    };
    try {
      const res = await verifyAgent(verifyData).unwrap();
      toast.success(res.message, { id: toastId });
      setOpen(false);
    } catch (error: any) {
      toast.error(error.data.message, { id: toastId });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          verify
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Verify Registration</DialogTitle>
          <DialogDescription className="sr-only" />
        </DialogHeader>
        <Select onValueChange={(value) => setStatus(value as IKYCStatus)}>
          <SelectTrigger>
            <SelectValue placeholder="KYC Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>KYC Status</SelectLabel>
              <SelectItem value={kycStatus.VERIFIED}>Accept</SelectItem>
              <SelectItem value={kycStatus.REJECTED}>Reject</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            disabled={status === "PENDING"}
            onClick={() => handleSelect()}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
