import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import type { ControllerRenderProps, FieldValues } from "react-hook-form";

interface IProps<T extends FieldValues> {
  field: ControllerRenderProps<T>;
}

export default function PasswordFiled<T extends FieldValues>({
  field,
}: IProps<T>) {
  const [type, setType] = useState<boolean>(true);
  return (
    <div className="relative">
      <Input
        type={type ? "password" : "text"}
        placeholder="●●●●●●"
        minLength={6}
        maxLength={6}
        className="h-12 bg-[#1c271f] border-[#3b5443] text-white placeholder:text-[#9db9a6]"
        {...field}
      />
      <Button
        onClick={() => setType(!type)}
        className="absolute right-2 top-0 cursor-pointer"
        type="button"
        size="icon"
        variant="ghost"
      >
        {type ? <EyeOffIcon /> : <EyeIcon />}
      </Button>
    </div>
  );
}
