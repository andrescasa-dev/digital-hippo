import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-[pulse_1s_ease-in-out_infinite] rounded-md bg-[#e1e1e1]", className)}
      {...props}
    />
  )
}

export { Skeleton }
