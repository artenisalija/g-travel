"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, LOCALE_LABELS } from "@/lib/i18n/config";
import type { Lang } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Swap the locale segment of the current path, preserving the rest. */
function swapLocale(pathname: string, target: Lang): string {
  const segments = pathname.split("/");
  if (segments.length > 1 && (LOCALES as string[]).includes(segments[1])) {
    segments[1] = target;
    return segments.join("/") || `/${target}`;
  }
  return `/${target}${pathname}`;
}

export function LanguageSwitcher({
  current,
  className,
  tone = "default",
}: {
  current: Lang;
  className?: string;
  tone?: "default" | "light";
}) {
  const pathname = usePathname() || `/${current}`;
  const sep = tone === "light" ? "text-ivory/40" : "text-line-strong";
  const activeColor = tone === "light" ? "text-ivory" : "text-ink";
  const idleColor =
    tone === "light"
      ? "text-ivory/60 hover:text-ivory"
      : "text-faint hover:text-ink";

  return (
    <div
      className={cn("flex items-center", className)}
      role="group"
      aria-label={LOCALE_LABELS[current].full}
    >
      {LOCALES.map((locale, i) => {
        const active = locale === current;
        return (
          <span key={locale} className="flex items-center">
            {i > 0 ? (
              <span aria-hidden="true" className={cn("mx-1.5", sep)}>
                /
              </span>
            ) : null}
            <Link
              href={swapLocale(pathname, locale)}
              hrefLang={locale}
              aria-current={active ? "true" : undefined}
              onClick={() => {
                document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=31536000`;
              }}
              className={cn(
                "text-xs uppercase tracking-[0.18em] transition-colors",
                active ? activeColor : idleColor,
              )}
            >
              {LOCALE_LABELS[locale].short}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
