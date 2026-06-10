import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  kicker: string;
  title: string;
  intro?: string;
  className?: string;
  /** Optional element rendered on the right (e.g. a "view all" link). */
  aside?: ReactNode;
  align?: "left" | "center";
}

/** The recurring editorial section header: gold kicker, serif title, dek. */
export function SectionHeading({
  kicker,
  title,
  intro,
  className,
  aside,
  align = "left",
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-5 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center md:text-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        <p className="eyebrow">{kicker}</p>
        <h2 className="mt-4 text-headline font-medium text-ink md:text-title">
          {title}
        </h2>
        {intro ? (
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">
            {intro}
          </p>
        ) : null}
      </div>
      {aside ? <div className="shrink-0">{aside}</div> : null}
    </Reveal>
  );
}
