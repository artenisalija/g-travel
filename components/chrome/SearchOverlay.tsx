"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { articleHref } from "@/lib/links";
import type { Category, Lang, Location } from "@/lib/types";

export interface SearchItem {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  location: Location;
  author: string;
  tags: string[];
}

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
  index: SearchItem[];
  lang: Lang;
  dict: Dictionary;
}

export function SearchOverlay({
  open,
  onClose,
  index,
  lang,
  dict,
}: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const reduce = useReducedMotion();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return index.filter((item) =>
      [
        item.title,
        item.excerpt,
        item.category,
        item.location,
        item.author,
        ...item.tags,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [query, index]);

  // Focus the field on open; lock scroll; close on Escape.
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 60);
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const countLabel =
    results.length === 1 ? dict.search.oneResult : dict.search.manyResults;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[70] flex flex-col bg-ivory/95 backdrop-blur-sm"
          initial={reduce ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-label={dict.search.title}
        >
          <div className="px-edge">
            <div className="mx-auto flex w-full max-w-5xl items-center justify-between py-6">
              <span className="eyebrow">{dict.search.title}</span>
              <button
                type="button"
                onClick={onClose}
                aria-label={dict.nav.close}
                className="flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-muted transition-colors hover:text-ink"
              >
                {dict.nav.close}
                <CloseIcon />
              </button>
            </div>
          </div>

          <div className="px-edge">
            <div className="mx-auto w-full max-w-5xl">
              <label htmlFor="site-search" className="visually-hidden">
                {dict.search.title}
              </label>
              <input
                id="site-search"
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={dict.nav.searchPlaceholder}
                autoComplete="off"
                className="w-full border-b border-line-strong bg-transparent pb-5 font-display text-3xl text-ink placeholder:text-faint focus:border-gold focus:outline-none md:text-5xl"
              />
              <p className="mt-4 text-sm text-muted" aria-live="polite">
                {query.trim()
                  ? `${results.length} ${countLabel} · ${dict.search.resultsFor} “${query.trim()}”`
                  : dict.search.typeToSearch}
              </p>
            </div>
          </div>

          <div className="mt-4 grow overflow-y-auto px-edge pb-16">
            <ul className="mx-auto flex w-full max-w-5xl flex-col">
              {results.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={articleHref(lang, item.slug)}
                    onClick={onClose}
                    className="group flex flex-col gap-1 border-b border-line py-5 transition-colors"
                  >
                    <span className="eyebrow">
                      {dict.categories[item.category]}
                      <span aria-hidden="true" className="mx-2 text-gold-soft">
                        /
                      </span>
                      {dict.locationsLabels[item.location]}
                    </span>
                    <span className="font-display text-xl text-ink transition-colors group-hover:text-gold md:text-2xl">
                      {item.title}
                    </span>
                  </Link>
                </li>
              ))}
              {query.trim() && results.length === 0 ? (
                <li className="py-8 text-lg text-muted">
                  {dict.search.noResults} “{query.trim()}”.
                </li>
              ) : null}
            </ul>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="none">
      <path
        d="M2 2l12 12M14 2L2 14"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
