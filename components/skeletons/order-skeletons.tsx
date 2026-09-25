import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function CartSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      {/* Stepper Skeleton */}
      <div className="flex items-center justify-between max-w-xl mx-auto">
        <Skeleton className="h-7 w-32 rounded-full" />
        <Skeleton className="h-0.5 flex-1 mx-4" />
        <Skeleton className="h-7 w-32 rounded-full" />
      </div>

      <Card className="p-6 border-zinc-200/80 rounded-2xl bg-white space-y-4">
        <Skeleton className="h-6 w-48 rounded-md mb-4" />
        
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-4 py-3 border-b border-zinc-100 last:border-none">
            <Skeleton className="w-16 h-16 rounded-xl shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/3 rounded-md" />
              <Skeleton className="h-3 w-1/6 rounded-md" />
            </div>
            <Skeleton className="h-8 w-20 rounded-lg" />
            <Skeleton className="h-5 w-16 rounded-md" />
            <Skeleton className="h-6 w-6 rounded-md" />
          </div>
        ))}
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8">
          <Card className="p-6 border-zinc-200/80 rounded-2xl bg-white space-y-6">
            <Skeleton className="h-6 w-44 rounded-md" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-11 w-full rounded-xl" />
              <Skeleton className="h-11 w-full rounded-xl" />
            </div>
            <Skeleton className="h-11 w-full rounded-xl" />
            <Skeleton className="h-11 w-full rounded-xl" />
            <Skeleton className="h-11 w-full rounded-xl" />
          </Card>
        </div>

        <div className="lg:col-span-4">
          <Card className="p-6 border-zinc-200/80 rounded-2xl bg-white space-y-5">
            <Skeleton className="h-6 w-32 rounded-md" />
            <div className="space-y-3">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-16 rounded-md" />
                <Skeleton className="h-4 w-12 rounded-md" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20 rounded-md" />
                <Skeleton className="h-4 w-10 rounded-md" />
              </div>
            </div>
            <Skeleton className="h-px w-full" />
            <div className="flex justify-between items-center">
              <Skeleton className="h-5 w-12 rounded-md" />
              <Skeleton className="h-7 w-20 rounded-md" />
            </div>
            <Skeleton className="h-10 w-full rounded-xl" />
          </Card>
        </div>
      </div>
    </div>
  );
}