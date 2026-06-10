"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { ReactNode } from "react";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** Total vertical drift in px across the scroll pass. */
  distance?: number;
}

/**
 * Subtle vertical parallax tied to the element's scroll progress. Wrap an
 * over-scaled image so the drift never exposes an edge. No-op under
 * prefers-reduced-motion.
 */
export function Parallax({
  children,
  className,
  distance = 50,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
