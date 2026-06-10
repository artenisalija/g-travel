import { cn } from "@/lib/utils";

/**
 * The brand's circular mark — a heavy open ring (the "C" of the masthead),
 * mouth facing right. Draws in currentColor so it sits on ivory in the header
 * and on the dark band in the footer.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      {/* Square-cut stroke ends (butt caps) — geometric, not calligraphic. */}
      <path
        d="M35.5 10.5A17.5 17.5 0 1 0 35.5 33.5"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="butt"
      />
    </svg>
  );
}
