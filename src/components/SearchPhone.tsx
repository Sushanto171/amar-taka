/* eslint-disable react-hooks/exhaustive-deps */
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { useEffect, useId, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { IUser } from "@/features/user/types/user.types";
import { cn } from "@/lib/utils";
import type { FormValues } from "@/types/transactionForm.types";
import type { ControllerRenderProps } from "react-hook-form";

export default function SearchPhone({
  onChange,
  userData,
  placeholder,
}: {
  onChange: ControllerRenderProps<FormValues>;
  userData: Partial<IUser[]>;
  placeholder: string;
}) {
  const id = useId();
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  useEffect(() => {
    if (value) {
      onChange.onChange(value);
    }
  }, [value]);

  return (
    <div className="*:not-first:mt-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
          >
            <span className={cn("truncate", !value && "text-muted-foreground")}>
              {value
                ? userData?.find((user) => user?.phone === value)?.phone
                : `Select ${placeholder} Phone`}
            </span>
            <ChevronDownIcon
              size={16}
              className="text-muted-foreground/80 shrink-0"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0"
          align="start"
        >
          <Command>
            <CommandInput placeholder={`Find ${placeholder} Phone Number `} />
            <CommandList>
              <CommandEmpty>No Phone Number found.</CommandEmpty>
              <CommandGroup>
                {userData?.map((user) => (
                  <CommandItem
                    key={user?._id}
                    value={user?.phone}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {user?.phone}
                    {value === user?.phone && (
                      <CheckIcon size={16} className="ml-auto" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
