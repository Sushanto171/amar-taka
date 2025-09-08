"use client";

import { ListChevronsDownUpIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { transactionType } from "@/constant/transactionType";
const typesArray = Array.from(Object.entries(transactionType),([key,value])=>({key,value}))



export default function TypeFiltering() {
  const [type, setType] = useState("");

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
          <DropdownMenuRadioItem value="nextjs">Next.js</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="sveltekit" disabled>
            SvelteKit
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="remix">Remix</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="astro">Astro</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
