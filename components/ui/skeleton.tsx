import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-gray-100 rounded-full animate-pulse", className)}
      {...props}
    />
  )
}

export { Skeleton }
