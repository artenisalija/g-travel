"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandMark } from "@/components/chrome/BrandMark";
import { LanguageSwitcher } from "@/components/chrome/LanguageSwitcher";
import {
  SearchOverlay,
  type SearchItem,
} from "@/components/chrome/SearchOverlay";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { homeHref, locationAnchor, topicAnchor } from "@/lib/links";
import { CATEGORY_ORDER, LOCATION_ORDER } from "@/lib/taxonomy";
import type { Lang } from "@/lib/types";
import { cn } from "@/lib/utils";

interface SiteHeaderProps {
  lang: Lang;
  dict: Dictionary;
  searchIndex: SearchItem[];
}

export function SiteHeader({ lang, dict, searchIndex }: SiteHeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const isHome = pathname?.replace(/\/$/, "") === homeHref(lang);

  // The masthead menu: Home, the six pillars, Albania, Events, Contact.
  const navItems = [
    { label: dict.nav.home, href: homeHref(lang), active: isHome },
    ...CATEGORY_ORDER.map((category) => ({
      label: dict.categories[category],
      href: topicAnchor(lang, category),
      active: false,
    })),
    {
      label: dict.locationsLabels.albania,
      href: locationAnchor(lang, "albania"),
      active: false,
    },
    { label: dict.nav.events, href: `${homeHref(lang)}#events`, active: false },
    { label: dict.nav.contact, href: "#contact", active: false },
  ];

  // The hero is ivory, so the header stays a light bar with ink text
  // throughout — matching the magazine's white masthead.
  const brandColor = "text-ink";
  const navColor = "text-muted hover:text-ink";
  const iconColor = "text-muted hover:text-ink";
  const dividerColor = "bg-line-strong";

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-line bg-ivory/90 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between gap-4 px-edge md:h-20">
          {/* Left: menu toggle + wordmark */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? dict.nav.close : dict.nav.menu}
              className={cn(
                "-ml-1 flex h-9 w-9 items-center justify-center transition-colors lg:hidden",
                iconColor,
              )}
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
            <Link
              href={homeHref(lang)}
              className={cn("flex items-center gap-3 transition-colors", brandColor)}
            >
              <BrandMark className="h-9 w-9 md:h-10 md:w-10" />
              <span className="hidden text-[0.62rem] font-semibold uppercase leading-[1.6] tracking-[0.3em] text-gold sm:block lg:hidden xl:block">
                {dict.hero.titleA} {dict.hero.titleB}
              </span>
            </Link>
          </div>

          {/* Center: section nav (desktop) */}
          <nav
            aria-label={dict.nav.sections}
            className="hidden items-center gap-5 lg:flex xl:gap-6"
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                aria-current={item.active ? "page" : undefined}
                className={cn(
                  "border-b pb-1 text-[0.72rem] uppercase tracking-[0.12em] transition-colors",
                  item.active
                    ? "border-gold text-ink"
                    : cn("border-transparent", navColor),
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right: search + language */}
          <div className="flex items-center gap-4 md:gap-5">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label={dict.nav.search}
              className={cn(
                "flex items-center gap-2 transition-colors",
                iconColor,
              )}
            >
              <SearchIcon />
              <span className="hidden text-[0.78rem] uppercase tracking-[0.13em] xl:inline">
                {dict.nav.search}
              </span>
            </button>
            <span aria-hidden="true" className={cn("h-4 w-px", dividerColor)} />
            <LanguageSwitcher current={lang} tone="default" />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="fixed inset-0 top-16 z-40 overflow-y-auto bg-ivory px-edge pb-16 pt-8 lg:hidden"
            initial={reduce ? undefined : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav aria-label={dict.nav.sections}>
              <p className="eyebrow">{dict.nav.sections}</p>
              <ul className="mt-4 flex flex-col">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block border-b border-line py-3 font-display text-2xl text-ink"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label={dict.nav.destinations} className="mt-10">
              <p className="eyebrow">{dict.nav.destinations}</p>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                {LOCATION_ORDER.map((location) => (
                  <li key={location}>
                    <Link
                      href={locationAnchor(lang, location)}
                      onClick={() => setMenuOpen(false)}
                      className="text-sm uppercase tracking-[0.13em] text-muted transition-colors hover:text-ink"
                    >
                      {dict.locationsLabels[location]}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        index={searchIndex}
        lang={lang}
        dict={dict}
      />
    </header>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" />
      <path d="M12.5 12.5L16 16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true">
      <path d="M0 1h20M0 7h20M0 13h20" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
