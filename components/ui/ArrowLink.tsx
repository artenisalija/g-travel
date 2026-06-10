import Link from "next/link";
import { cn } from "@/lib/utils";

interface ArrowLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** Visual emphasis. */
  tone?: "ink" | "gold" | "light";
}

const TONE: Record<NonNullable<ArrowLinkProps["tone"]>, string> = {
  ink: "text-ink",
  gold: "text-gold",
  light: "text-ivory",
};

/** A refined "read more" link with an arrow that nudges on hover. */
export function ArrowLink({
  href,
  children,
  className,
  tone = "ink",
}: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group/arrow inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em]",
        TONE[tone],
        className,
      )}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/arrow:scale-x-100" />
      </span>
      <svg
        width="22"
        height="10"
        viewBox="0 0 22 10"
        fill="none"
        aria-hidden="true"
        className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/arrow:translate-x-1.5"
      >
        <path
          d="M0 5h20M16 1l4 4-4 4"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}
