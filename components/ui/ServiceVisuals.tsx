"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const drawVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.9, delay: i * 0.15, ease: EASE },
      opacity: { duration: 0.25, delay: i * 0.15 },
    },
  }),
};

const VisualFrame = forwardRef<HTMLDivElement, { children: React.ReactNode }>(
  function VisualFrame({ children }, ref) {
    return (
      <div className="h-full w-full p-10 sm:p-14">
        <div ref={ref} className="relative h-full w-full">
          <svg
            viewBox="0 0 400 300"
            className="absolute inset-0 h-full w-full overflow-visible"
            fill="none"
            aria-hidden="true"
          >
            {children}
          </svg>
        </div>
      </div>
    );
  }
);

/**
 * Drives the draw-in animation off whichever comes first: the element
 * actually scrolling into view, or a short fallback timer. Some mobile
 * browsers can fail to report intersection reliably (dynamic toolbars
 * resizing the viewport, momentum-scroll timing, etc.), so the timer
 * guarantees the visual never gets stuck permanently invisible.
 */
function useRevealTrigger(fallbackMs = 1000) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const [forced, setForced] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setForced(true), fallbackMs);
    return () => clearTimeout(id);
  }, [fallbackMs]);

  return { ref, visible: inView || forced };
}

/** Website Design & Development — a wireframe layout drawing itself in. */
export function WebsiteVisual() {
  const shouldReduceMotion = useReducedMotion();
  const { ref, visible } = useRevealTrigger();
  const initial = shouldReduceMotion ? false : "hidden";
  const animate = shouldReduceMotion ? undefined : visible ? "visible" : "hidden";

  return (
    <VisualFrame ref={ref}>
      {/* browser chrome — static */}
      <rect x="30" y="30" width="340" height="240" rx="10" stroke="currentColor" strokeWidth="1.5" className="text-ink-50/15" />
      <line x1="30" y1="64" x2="370" y2="64" stroke="currentColor" strokeWidth="1.5" className="text-ink-50/15" />
      <circle cx="46" cy="47" r="3" fill="currentColor" className="text-ink-50/15" />
      <circle cx="58" cy="47" r="3" fill="currentColor" className="text-ink-50/15" />
      <circle cx="70" cy="47" r="3" fill="currentColor" className="text-ink-50/15" />

      {/* layout — draws in */}
      <motion.rect
        x="54" y="86" width="120" height="12" rx="2"
        stroke="currentColor" strokeWidth="1.5" className="text-ink-50/70"
        initial={initial} animate={animate}
        custom={0} variants={drawVariants}
      />
      <motion.rect
        x="54" y="112" width="292" height="64" rx="6"
        stroke="currentColor" strokeWidth="1.5" className="text-ink-50/70"
        initial={initial} animate={animate}
        custom={1} variants={drawVariants}
      />
      <motion.rect
        x="54" y="192" width="88" height="62" rx="6"
        stroke="currentColor" strokeWidth="1.5" className="text-ink-50/45"
        initial={initial} animate={animate}
        custom={2} variants={drawVariants}
      />
      <motion.rect
        x="156" y="192" width="88" height="62" rx="6"
        stroke="currentColor" strokeWidth="1.5" className="text-ink-50/45"
        initial={initial} animate={animate}
        custom={2.25} variants={drawVariants}
      />
      <motion.rect
        x="258" y="192" width="88" height="62" rx="6"
        stroke="currentColor" strokeWidth="1.5" className="text-ink-50/45"
        initial={initial} animate={animate}
        custom={2.5} variants={drawVariants}
      />
    </VisualFrame>
  );
}

const CELLS = Array.from({ length: 9 });
const cellVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.07, ease: EASE },
  }),
};

/** Social Media Photo Editing — a 3x3 content grid with crop marks. */
export function PhotoGridVisual() {
  const shouldReduceMotion = useReducedMotion();
  const { ref, visible } = useRevealTrigger();
  const initial = shouldReduceMotion ? false : "hidden";
  const animate = shouldReduceMotion ? undefined : visible ? "visible" : "hidden";

  const gap = 14;
  const size = (340 - gap * 2) / 3;
  const tick = 8;

  return (
    <VisualFrame ref={ref}>
      {CELLS.map((_, i) => {
        const row = Math.floor(i / 3);
        const col = i % 3;
        const x = 30 + col * (size + gap);
        const y = 30 + row * (size + gap);
        return (
          <g key={i}>
            <motion.rect
              x={x} y={y} width={size} height={size} rx="4"
              stroke="currentColor" strokeWidth="1.25" className="text-ink-50/45"
              initial={initial} animate={animate}
              custom={i} variants={cellVariants}
            />
            {/* crop-mark corners */}
            <path
              d={`M${x} ${y + tick} V${y} H${x + tick}`}
              stroke="currentColor" strokeWidth="1.25" className="text-ink-50/70"
            />
            <path
              d={`M${x + size - tick} ${y + size} H${x + size} V${y + size - tick}`}
              stroke="currentColor" strokeWidth="1.25" className="text-ink-50/70"
            />
          </g>
        );
      })}
    </VisualFrame>
  );
}

const BAR_HEIGHTS = [14, 26, 42, 60, 86, 60, 102, 74, 46, 30, 52, 78, 98, 64, 40, 24, 14];
const waveVariants: Variants = {
  hidden: { scaleY: 0 },
  visible: (i: number) => ({
    scaleY: 1,
    transition: { duration: 0.5, delay: i * 0.02, ease: EASE },
  }),
};

/** Video Editing — a waveform timeline with a moving playhead. */
export function VideoWaveformVisual() {
  const shouldReduceMotion = useReducedMotion();
  const { ref, visible } = useRevealTrigger();
  const initial = shouldReduceMotion ? false : "hidden";
  const animate = shouldReduceMotion ? undefined : visible ? "visible" : "hidden";

  const barWidth = 6;
  const gap = 4;
  const totalWidth = BAR_HEIGHTS.length * (barWidth + gap) - gap;
  const startX = (400 - totalWidth) / 2;
  const centerY = 150;

  return (
    <VisualFrame ref={ref}>
      <line x1="30" y1={centerY} x2="370" y2={centerY} stroke="currentColor" strokeWidth="1" className="text-ink-50/15" />

      {BAR_HEIGHTS.map((h, i) => {
        const x = startX + i * (barWidth + gap);
        return (
          <motion.rect
            key={i}
            x={x} y={centerY - h / 2} width={barWidth} height={h} rx="2"
            fill="currentColor" className="text-ink-50/55"
            style={{ transformOrigin: `${x + barWidth / 2}px ${centerY}px` }}
            initial={initial} animate={animate}
            custom={i} variants={waveVariants}
          />
        );
      })}

      {!shouldReduceMotion && visible && (
        <motion.g
          initial={{ x: startX }}
          animate={{ x: startX + totalWidth }}
          transition={{ duration: 3.2, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
        >
          <line x1="0" y1={centerY - 66} x2="0" y2={centerY + 66} stroke="currentColor" strokeWidth="1.5" className="text-ink-50/90" />
          <circle cx="0" cy={centerY - 66} r="4" fill="currentColor" className="text-ink-50/90" />
        </motion.g>
      )}
    </VisualFrame>
  );
}

const AD_BARS = [28, 40, 36, 54, 48, 66, 60, 80, 94];
const barGrowVariants: Variants = {
  hidden: { scaleY: 0 },
  visible: (i: number) => ({
    scaleY: 1,
    transition: { duration: 0.6, delay: i * 0.06, ease: EASE },
  }),
};

/** Paid Ad Management — a rising bar chart with a drawn trend line. */
export function AdGrowthVisual() {
  const shouldReduceMotion = useReducedMotion();
  const { ref, visible } = useRevealTrigger();
  const initial = shouldReduceMotion ? false : "hidden";
  const animate = shouldReduceMotion ? undefined : visible ? "visible" : "hidden";

  const barWidth = 26;
  const gap = 12;
  const totalWidth = AD_BARS.length * (barWidth + gap) - gap;
  const startX = (400 - totalWidth) / 2;
  const baseY = 240;
  const maxH = 170;

  const points = AD_BARS.map((h, i) => {
    const x = startX + i * (barWidth + gap) + barWidth / 2;
    const y = baseY - (h / 100) * maxH;
    return `${x},${y}`;
  });
  const [lastX, lastY] = points[points.length - 1].split(",");

  const lineInitial = shouldReduceMotion ? false : { pathLength: 0, opacity: 0 };
  const lineAnimate = shouldReduceMotion
    ? undefined
    : visible
    ? { pathLength: 1, opacity: 1 }
    : { pathLength: 0, opacity: 0 };
  const dotInitial = shouldReduceMotion ? false : { opacity: 0, scale: 0 };
  const dotAnimate = shouldReduceMotion
    ? undefined
    : visible
    ? { opacity: 1, scale: 1 }
    : { opacity: 0, scale: 0 };

  return (
    <VisualFrame ref={ref}>
      <line x1="30" y1={baseY} x2="370" y2={baseY} stroke="currentColor" strokeWidth="1" className="text-ink-50/15" />

      {AD_BARS.map((h, i) => {
        const x = startX + i * (barWidth + gap);
        const barH = (h / 100) * maxH;
        const y = baseY - barH;
        return (
          <motion.rect
            key={i}
            x={x} y={y} width={barWidth} height={barH} rx="2"
            fill="currentColor" className="text-ink-50/20"
            style={{ transformOrigin: `${x + barWidth / 2}px ${baseY}px` }}
            initial={initial} animate={animate}
            custom={i} variants={barGrowVariants}
          />
        );
      })}

      <motion.polyline
        points={points.join(" ")}
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        className="text-ink-50"
        initial={lineInitial}
        animate={lineAnimate}
        transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
      />
      <motion.circle
        cx={lastX} cy={lastY} r="4" fill="currentColor" className="text-ink-50"
        initial={dotInitial}
        animate={dotAnimate}
        transition={{ duration: 0.3, delay: 1.3 }}
      />
    </VisualFrame>
  );
}

/** Social Media Management — cycles between the photo grid and the waveform. */
export function SocialMediaVisual() {
  const shouldReduceMotion = useReducedMotion();
  const [which, setWhich] = useState<0 | 1>(0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const id = setInterval(() => setWhich((w) => (w === 0 ? 1 : 0)), 4500);
    return () => clearInterval(id);
  }, [shouldReduceMotion]);

  return (
    <div className="relative h-full w-full">
      <AnimatePresence mode="wait">
        {which === 0 ? (
          <motion.div
            key="photo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <PhotoGridVisual />
          </motion.div>
        ) : (
          <motion.div
            key="video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <VideoWaveformVisual />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
