import { Skeleton } from "@/components/ui/skeleton";

export function TransactionSkeleton() {
  return (
    <tr>
      <td className="p-2">
        <Skeleton className="h-4 w-[120px]" />
      </td>
      <td className="p-2">
        <Skeleton className="h-4 w-[80px]" />
      </td>
      <td className="p-2">
        <Skeleton className="h-4 w-[100px]" />
      </td>
      <td className="p-2">
        <Skeleton className="h-4 w-[140px]" />
      </td>
      <td className="p-2">
        <Skeleton className="h-4 w-[100px]" />
      </td>
      <td className="p-2">
        <Skeleton className="h-4 w-[80px]" />
      </td>
      <td className="p-2">
        <Skeleton className="h-4 w-[160px]" />
      </td>
    </tr>
  );
}
