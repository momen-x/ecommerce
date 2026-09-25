import { Skeleton } from "@/components/ui/skeleton";

export default function CardDetailsSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-7 space-y-4">
          <Skeleton className="w-full aspect-square rounded-2xl" />
          <div className="grid grid-cols-4 gap-4">
            <Skeleton className="aspect-square rounded-xl" />
            <Skeleton className="aspect-square rounded-xl" />
            <Skeleton className="aspect-square rounded-xl" />
            <Skeleton className="aspect-square rounded-xl" />
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-8 w-3/4 rounded-lg" />
            <Skeleton className="h-6 w-32 rounded-md" />
          </div>

          <Skeleton className="h-20 w-full rounded-xl" />

          <div className="space-y-3">
            <Skeleton className="h-4 w-20 rounded-md" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-12 rounded-lg" />
              <Skeleton className="h-10 w-12 rounded-lg" />
              <Skeleton className="h-10 w-12 rounded-lg" />
              <Skeleton className="h-10 w-12 rounded-lg" />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Skeleton className="h-12 w-28 rounded-xl" />
            <Skeleton className="h-12 flex-1 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}