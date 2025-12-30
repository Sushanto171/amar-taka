import { DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface QuickActionButtonProps {
  title: string;
  description: string;
  icon: LucideIcon;
  action: string;
  setOpen: (open: boolean) => void;
  setSearchParams: (params: { action: string }) => void;
  className?: string;
}

export default function QuickActionButton({
  title,
  description,
  icon: Icon,
  action,
  setOpen,
  setSearchParams,
  className,
}: QuickActionButtonProps) {
  return (
    <DialogTrigger asChild>
      <button
        onClick={() => {
          setSearchParams({ action });
          setOpen(true);
        }}
        className={cn(
          "group cursor-pointer relative flex flex-col md:flex-row items-center md:items-start gap-4 p-6 rounded-xl text-left",
          "bg-accent/10 border border-accent",
          "hover:border-primary/50 hover:bg-surface-hover transition-all",
          className
        )}
      >
        {/* Icon */}
        <div
          className="size-12 rounded-full bg-background border border-accent
                     flex items-center justify-center
                     group-hover:border-primary group-hover:bg-primary transition-colors"
        >
          <Icon className="w-5 h-5 text-primary group-hover:text-background" />
        </div>

        {/* Content */}
        <div className="flex flex-col">
          <h4 className="font-bold text-lg leading-tight">
            {title}
          </h4>
          <p className="opacity-80 text-sm mt-1">
            {description}
          </p>
        </div>
      </button>
    </DialogTrigger>
  );
}
