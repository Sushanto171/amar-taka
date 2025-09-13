import { Skeleton } from "@/components/ui/skeleton";
interface IProps {
  labels: string[];
}

export function DashboardSkeleton({ labels }: IProps) {
  return (
    <div>
      <div className="bg-muted/50">
        <div className="flex">
          {labels.map((label, i) => (
            <div key={i} className="flex-1 py-2 px-1">
              {label}
            </div>
          ))}
        </div>
      </div>
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="flex py-1 border border-muted">
          <div className="p-2">
            <Skeleton className="h-4 w-[120px]" />
          </div>
          <div className="p-2">
            <Skeleton className="h-4 w-[80px]" />
          </div>
          <div className="p-2">
            <Skeleton className="h-4 w-[100px]" />
          </div>
          <div className="p-2">
            <Skeleton className="h-4 w-[140px]" />
          </div>
          <div className="p-2">
            <Skeleton className="h-4 w-[100px]" />
          </div>
          <div className="p-2">
            <Skeleton className="h-4 w-[80px]" />
          </div>
          <div className="p-2">
            <Skeleton className="h-4 w-[160px]" />
          </div>
        </div>
      ))}
    </div>
  );
}
