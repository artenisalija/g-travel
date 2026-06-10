"use client";

import { motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface TopicNavItem {
  id: string;
  label: string;
}

interface TopicsScrollerProps {
  items: TopicNavItem[];
  kicker: string;
  title: string;
  children: ReactNode;
}

/**
 * Topics laid out as a sticky left index beside the scrolling sections. As each
 * section enters the viewport its name lights up (others stay greyed) and a
 * gold marker slides to it — so the full list of subjects is always visible.
 */
export function TopicsScroller({
  items,
  kicker,
  title,
  children,
}: TopicsScrollerProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      // A thin band across the middle of the viewport decides "active".
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  return (
    <section
      aria-label={title}
      className="border-t border-line px-edge py-16 md:py-20"
    >
      <div className="lg:grid lg:grid-cols-12 lg:gap-10">
        {/* Sticky index */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow">{kicker}</p>
            <h2 className="mt-4 text-headline font-medium text-ink md:text-title">
              {title}
            </h2>
            <nav className="mt-8 hidden lg:block" aria-label={title}>
              <ul className="flex flex-col gap-3.5">
                {items.map((item, i) => {
                  const active = item.id === activeId;
                  return (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        aria-current={active ? "true" : undefined}
                        className={cn(
                          "group flex items-center gap-4 text-sm uppercase tracking-[0.16em] transition-colors duration-300",
                          active ? "text-ink" : "text-faint hover:text-muted",
                        )}
                      >
                        <span className="relative flex h-px w-7 items-center">
                          <span
                            className={cn(
                              "absolute inset-0",
                              active ? "bg-transparent" : "bg-line-strong",
                            )}
                          />
                          {active ? (
                            <motion.span
                              layoutId="topic-marker"
                              className="absolute inset-0 h-px bg-gold"
                              transition={{
                                duration: 0.4,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                            />
                          ) : null}
                        </span>
                        <span className="hanging-figures text-[0.7rem] text-faint">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>

        {/* Sections */}
        <div className="mt-10 lg:col-span-8 lg:mt-0">{children}</div>
      </div>
    </section>
  );
}
