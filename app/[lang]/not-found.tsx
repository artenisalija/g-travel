"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DEFAULT_LOCALE, LOCALES } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { homeHref } from "@/lib/links";
import type { Lang } from "@/lib/types";

export default function NotFound() {
  const pathname = usePathname() ?? `/${DEFAULT_LOCALE}`;
  const seg = pathname.split("/")[1];
  const lang: Lang = (LOCALES as string[]).includes(seg)
    ? (seg as Lang)
    : DEFAULT_LOCALE;
  const dict = getDictionary(lang);

  return (
    <section className="flex min-h-[62vh] flex-col items-center justify-center px-edge py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-6 max-w-xl text-title font-medium text-ink">
        {dict.notFound.title}
      </h1>
      <p className="mt-4 max-w-md text-muted">{dict.notFound.body}</p>
      <Link
        href={homeHref(lang)}
        className="mt-9 inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-gold transition-colors hover:text-ink"
      >
        {dict.notFound.cta}
        <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}
