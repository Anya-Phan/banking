import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonMenu() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-4 p-4">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-3/4" />

    </div>
  )
}
