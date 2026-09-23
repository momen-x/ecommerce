import { Skeleton } from "../ui/skeleton";

export function CardSkeleton() {
  return (
    <div className="flex flex-col justify-between space-y-3 rounded-2xl border p-3">
      <Skeleton className="aspect-[4/3] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-5 w-1/4" />
      </div>
      <Skeleton className="h-9 w-full rounded-lg" />
    </div>
  );
}
