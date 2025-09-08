import { Skeleton } from "@/components/ui/skeleton";

export function TransactionSkeleton() {
  return (
    <div>
      <div className="bg-muted/50">
        <div className="flex">
          <div className="min-w-[140px] py-2 px-1">Date</div>
          <div className="min-w-[120px] py-2 px-1">Type</div>
          <div className="min-w-[100px] py-2 px-1">Status</div>
          <div className="min-w-[140px] py-2 px-1">Phone</div>
          <div className="min-w-[120px] py-2 px-1">Amount</div>
          <div className="min-w-[100px] py-2 px-1">Fee</div>
          <div className="min-w-[160px] py-2 px-1">Reference</div>
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
