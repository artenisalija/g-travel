import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/** Pins its content while a tall sibling column scrolls past (desktop only). */
export function StickyLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("lg:sticky lg:top-28 lg:self-start", className)}>
      {children}
    </div>
  );
}
