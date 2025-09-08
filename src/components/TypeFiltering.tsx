"use client";

import { ListChevronsDownUpIcon } from "lucide-react";
import { useEffect, useState, type Dispatch } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { transactionType } from "@/constant/transactionType";
import type { TransactionType } from "@/types/transaction.types";
let typesArray = Array.from(
  Object.entries(transactionType),
  ([label, value]) => ({ label, value })
);
typesArray = [{ label: "All", value: "" }, ...typesArray];
export default function TypeFiltering<T extends TransactionType | null>({
  onChange,
}: {
  onChange: Dispatch<React.SetStateAction<T>>;
}) {
  const [type, setType] = useState("");
  useEffect(() => {
    if (type) {
      onChange(type as T);
    } else {
      onChange(null as T);
    }
  }, [type, onChange]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          Type
          <ListChevronsDownUpIcon
            className="-me-1 opacity-60 ml-4"
            size={16}
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={type} onValueChange={setType}>
          {typesArray.map((type, i) => (
            <DropdownMenuRadioItem key={i} value={type.value}>
              {type.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
