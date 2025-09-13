import { Skeleton } from "@/components/ui/skeleton";
interface IProps {
  labels: string[];
  row?: number;
}

export function DashboardSkeleton({ labels, row }: IProps) {
  return (
    <div className="w-full">
      <div className="bg-muted/50">
        <div className="flex">
          {labels.map((label, i) => (
            <div key={i} className="flex-1 py-2 px-1">
              {label}
            </div>
          ))}
        </div>
      </div>
      {Array.from({ length: row ? row : 10 }).map((_, i) => (
        <div key={i} className="flex py-1 border border-muted">
          {labels.map((_, i) => (
            <div key={i} className="p-2 flex-1">
              <Skeleton className="h-4 " />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
