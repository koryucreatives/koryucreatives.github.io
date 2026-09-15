"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Vector re-creation of the KORYU ink-brush ring. Built as SVG (rather than
 * relying solely on the rasterized /images/logo/koryu-mark.png) so it can
 * draw itself on with an animated pathLength and rotate at any size without
 * artifacts.
 */
export default function AnimatedMark({
  className,
  size = 480,
  draw = true,
  spin = false,
  spinDuration = 90,
}: {
  className?: string;
  size?: number;
  draw?: boolean;
  spin?: boolean;
  spinDuration?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const shouldDraw = draw && !shouldReduceMotion;
  const shouldSpin = spin && !shouldReduceMotion;

  return (
    <motion.svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      animate={shouldSpin ? { rotate: 360 } : undefined}
      transition={
        shouldSpin
          ? { duration: spinDuration, repeat: Infinity, ease: "linear" }
          : undefined
      }
    >
      <motion.circle
        cx="50"
        cy="50"
        r="42"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        initial={shouldDraw ? { pathLength: 0, opacity: 0.5 } : { pathLength: 1, opacity: 1 }}
        whileInView={shouldDraw ? { pathLength: 1, opacity: 1 } : undefined}
        viewport={{ once: true }}
        transition={{ duration: 2.4, ease: [0.65, 0, 0.35, 1] }}
      />
      <motion.circle
        cx="50"
        cy="50"
        r="39"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.7"
        strokeLinecap="round"
        strokeDasharray="1.5 2.2"
        opacity={0.4}
        initial={shouldDraw ? { opacity: 0 } : { opacity: 0.4 }}
        whileInView={shouldDraw ? { opacity: 0.4 } : undefined}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 1.6 }}
      />
      <motion.circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeDasharray="1 3"
        opacity={0.25}
        initial={shouldDraw ? { opacity: 0 } : { opacity: 0.25 }}
        whileInView={shouldDraw ? { opacity: 0.25 } : undefined}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 1.8 }}
      />
    </motion.svg>
  );
}
