"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

/** Waypoints along the route, as fractions of total page scroll. */
const STOPS = [0, 1 / 3, 2 / 3, 1];

/**
 * A little travel route pinned to the right edge — a dashed flight path with
 * waypoints that light up gold as you pass them, and a tiny plane that flies
 * down the page with the scroll. Pure decoration: hidden from the
 * accessibility tree, no pointer events, and absent under reduced motion.
 */
export function ScrollJourney() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.4,
  });
  const planeTop = useTransform(progress, (v) => `calc(${v * 100}% - 9px)`);

  if (reduce) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-2 top-1/2 z-40 h-[52vh] w-[18px] -translate-y-1/2 md:right-5"
    >
      {/* Dashed flight path */}
      <span className="absolute inset-y-0 left-1/2 border-l border-dashed border-line-strong" />

      {/* The travelled stretch, drawn in gold from the top */}
      <motion.span
        style={{ scaleY: progress }}
        className="absolute inset-y-0 left-1/2 w-[2px] origin-top -translate-x-[0.5px] bg-gold"
      />

      {/* Waypoints */}
      {STOPS.map((at) => (
        <Waypoint key={at} at={at} progress={progress} />
      ))}

      {/* The plane, nose down the route */}
      <motion.span
        style={{ top: planeTop }}
        className="absolute left-1/2 -ml-[9px] block h-[18px] w-[18px] text-deep drop-shadow-[0_1px_3px_rgba(250,248,244,0.9)]"
      >
        <svg viewBox="0 0 18 18" fill="currentColor" aria-hidden="true">
          {/* Compact plane silhouette pointing down */}
          <path d="M9 17.2 7.6 14.9l-3.8 1.3.2-1.4 3.4-2V8.6L1 11V9.4l6.4-4.6V1.6a1.6 1.6 0 113.2 0v3.2L17 9.4V11l-6.4-2.4v4.2l3.4 2 .2 1.4-3.8-1.3L9 17.2z" />
        </svg>
      </motion.span>
    </div>
  );
}

function Waypoint({
  at,
  progress,
}: {
  at: number;
  progress: MotionValue<number>;
}) {
  // The dot warms to gold just as the plane reaches it.
  const passed = useTransform(progress, [Math.max(at - 0.04, 0), at], [0, 1]);
  return (
    <span
      className="absolute left-1/2 h-[7px] w-[7px] -translate-x-1/2"
      style={{ top: `calc(${at * 100}% - 3.5px)` }}
    >
      <span className="absolute inset-0 rounded-full border border-line-strong bg-ivory" />
      <motion.span
        style={{ opacity: passed }}
        className="absolute inset-0 rounded-full bg-gold"
      />
    </span>
  );
}
