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
import { agentStatus } from "@/constant/agent";
import type { IAgentStatus } from "@/features/agent/types/agent.types";
import { useVerifyAgentMutation } from "@/redux/features/agent/agent.api";
import { DialogClose } from "@radix-ui/react-dialog";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { toast } from "sonner";
export default function AgentStatusUpdateModal() {
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams("");
  const [status, setStatus] = useState<IAgentStatus | string>("");
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
    const statusData = {
      id,
      status: status as IAgentStatus,
    };
    try {
      const res = await verifyAgent(statusData).unwrap();
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
          Update Status
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Status</DialogTitle>
          <DialogDescription className="sr-only" />
        </DialogHeader>
        <Select onValueChange={(value) => setStatus(value as IAgentStatus)}>
          <SelectTrigger>
            <SelectValue placeholder="Choose Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Choose Status</SelectLabel>
              <SelectItem value={agentStatus.ACTIVE}>Active</SelectItem>
              <SelectItem value={agentStatus.INACTIVE}>Inactive</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button disabled={status === ""} onClick={() => handleSelect()}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
