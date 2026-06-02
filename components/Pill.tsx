import { cn } from "@/lib/utils";

export function Pill({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 bg-white/50 backdrop-blur-sm shadow-lg rounded-full px-3 py-2 border border-gray-200",
        className,
      )}
    >
      {children}
    </div>
  );
}
