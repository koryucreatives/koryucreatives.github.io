"use client";

import { useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  useVelocity,
} from "framer-motion";
import clsx from "clsx";

const BASE_SPEED = 40; // px/s while idle
const MAX_EXTRA_SPEED = 320; // px/s added at the top of scroll velocity
const VELOCITY_SENSITIVITY = 0.12;
const DOT = "●";
// Repeated enough times that one copy's width comfortably exceeds any
// realistic viewport, so the wrap point never runs out of content to show.
const COPIES = 6;

export default function Marquee({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [hovered, setHovered] = useState(false);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const speed = useTransform(scrollVelocity, (v) =>
    BASE_SPEED + Math.min(Math.abs(v) * VELOCITY_SENSITIVITY, MAX_EXTRA_SPEED)
  );

  useAnimationFrame((_, delta) => {
    if (shouldReduceMotion || hovered) return;
    const unitWidth = trackRef.current ? trackRef.current.scrollWidth / COPIES : 0;
    if (!unitWidth) return;

    // Modulo (not a single conditional add) so a large frame gap - e.g. the
    // tab regaining focus after being backgrounded - can never overshoot the
    // wrap point and cause a visible jump/blank gap in the loop.
    const next = (x.get() - speed.get() * (delta / 1000)) % unitWidth;
    x.set(next);
  });

  const sequence = items.flatMap((item) => [item, DOT]);
  const repeated = Array.from({ length: COPIES }, () => sequence).flat();

  return (
    <div
      className={clsx(
        "marquee-row relative overflow-hidden border-y border-ink-50/10 py-6",
        className
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        ref={trackRef}
        style={{ x }}
        className="flex w-max items-center gap-6 sm:gap-10"
      >
        {repeated.map((node, i) =>
          node === DOT ? (
            <span key={i} aria-hidden="true" className="label text-ink-600">
              {DOT}
            </span>
          ) : (
            <span key={i} className="label whitespace-nowrap text-ink-400">
              {node}
            </span>
          )
        )}
      </motion.div>
    </div>
  );
}
