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
interface IProps {
  onChange: Dispatch<React.SetStateAction<string | null>>;
  typesObject: Record<string, string>;
  label: string;
}

export default function TypeFiltering({
  onChange,
  typesObject,
  label,
}: IProps) {
  let typesArray = Array.from(
    Object.entries(typesObject),
    ([label, value]) => ({ label, value })
  );

  typesArray = [{ label: "All", value: "" }, ...typesArray];

  const [type, setType] = useState("");

  useEffect(() => {
    if (type) {
      onChange(type);
    } else {
      onChange(null);
    }
  }, [type, onChange]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          {label}{" "}
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
