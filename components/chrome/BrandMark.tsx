import { cn } from "@/lib/utils";

/**
 * The brand's circular mark — a bold open ring (the "C" of the masthead) with
 * a gold waypoint at its mouth. Draws in currentColor so it sits on ivory in
 * the header and on the deep band in the footer.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      {/* Open ring, mouth facing right like the masthead C. */}
      <path
        d="M36.5 11.5A18 18 0 1 0 36.5 32.5"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="37.5" cy="22" r="2.4" fill="var(--color-gold)" />
    </svg>
  );
}
