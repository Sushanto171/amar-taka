import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
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
import { useState, type ReactNode } from "react";

type TProp = {
  children: ReactNode;
  onChange: (value: boolean) => Promise<void>;
  values: string[];
  disable: boolean;
  close: boolean;
};

export function UserActionModal({
  children,
  onChange,
  values,
  disable,
  close,
}: TProp) {
  const [open, setOpen] = useState(close);
  const [value, setValue] = useState("");
  const handleChange = () => {
    onChange(value === values[0] ? true : false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Take Actions</DialogTitle>
          <DialogDescription className="sr-only" />
        </DialogHeader>
        <Select onValueChange={(value) => setValue(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Choose Options" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel></SelectLabel>
              {values.map((item, i) => (
                <SelectItem key={i} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button disabled={!value || disable} onClick={() => handleChange()}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
