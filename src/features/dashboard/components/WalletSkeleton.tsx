import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function WalletSkeleton() {
  return (
    <Card className="overflow-hidden py-0">
      {/* Balance Header */}
      <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
        <div className="flex justify-between items-start">
          <Skeleton className="h-4 w-32 rounded " />
          <Skeleton className="h-4 w-16 rounded-full" />
        </div>
        <Skeleton className="h-7 w-48 mt-2 rounded" />
      </CardHeader>

      {/* User Info */}
      <CardContent className="p-6 space-y-6 mt-7">
        <div className="grid grid-cols-2 gap-y-4 text-sm">
          <span>User</span>
          <Skeleton className="h-4 w-24 rounded" />

          <span>Wallet ID</span>
          <Skeleton className="h-4 w-28 rounded" />

          <span>Status</span>
          <Skeleton className="h-5 w-16 rounded-full" />

          <span>Created</span>
          <Skeleton className="h-4 w-20 rounded" />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between gap-4">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </CardContent>

      {/* Offer Section */}
      <div className="p-4 border-t flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-4 w-32 rounded" />
        </div>
        <Skeleton className="h-8 w-20 rounded-md" />
      </div>
    </Card>
  );
}
