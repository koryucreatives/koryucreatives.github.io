"use client";

import { forwardRef, useEffect, useRef, useState, type ComponentType } from "react";
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

const VisualFrame = forwardRef<HTMLDivElement, { children: React.ReactNode; compact?: boolean }>(
  function VisualFrame({ children, compact = false }, ref) {
    return (
      <div className={compact ? "h-full w-full p-5 sm:p-7" : "h-full w-full p-10 sm:p-14"}>
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

// Shared timing for every card that cycles between two visuals, so nothing
// in the grid drifts out of sync with anything else.
const CYCLE_INTERVAL_MS = 4500;
const CYCLE_FADE_S = 0.6;

function useCycleIndex(count: number) {
  const shouldReduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion || count < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), CYCLE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [shouldReduceMotion, count]);

  return index;
}

/** Cross-fades between a fixed set of visuals on a shared timer. */
function CyclingVisual({ visuals }: { visuals: ComponentType[] }) {
  const index = useCycleIndex(visuals.length);
  const Current = visuals[index];

  return (
    <div className="relative h-full w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: CYCLE_FADE_S }}
          className="absolute inset-0"
        >
          <Current />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Website Design & Development                                       */
/* ------------------------------------------------------------------ */

/** A wireframe layout drawing itself in. */
function WebsiteWireframeVisual() {
  const shouldReduceMotion = useReducedMotion();
  const { ref, visible } = useRevealTrigger();
  const initial = shouldReduceMotion ? false : "hidden";
  const animate = shouldReduceMotion ? undefined : visible ? "visible" : "hidden";

  return (
    <VisualFrame ref={ref}>
      {/* browser chrome - static */}
      <rect x="30" y="30" width="340" height="240" rx="10" stroke="currentColor" strokeWidth="1.5" className="text-ink-50/15" />
      <line x1="30" y1="64" x2="370" y2="64" stroke="currentColor" strokeWidth="1.5" className="text-ink-50/15" />
      <circle cx="46" cy="47" r="3" fill="currentColor" className="text-ink-50/15" />
      <circle cx="58" cy="47" r="3" fill="currentColor" className="text-ink-50/15" />
      <circle cx="70" cy="47" r="3" fill="currentColor" className="text-ink-50/15" />

      {/* layout - draws in */}
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

/** Desktop and mobile frames side by side - responsive design across devices. */
function WebsiteResponsiveVisual() {
  const shouldReduceMotion = useReducedMotion();
  const { ref, visible } = useRevealTrigger();
  const initial = shouldReduceMotion ? false : "hidden";
  const animate = shouldReduceMotion ? undefined : visible ? "visible" : "hidden";

  return (
    <VisualFrame ref={ref}>
      {/* desktop frame - static */}
      <rect x="30" y="40" width="220" height="150" rx="8" stroke="currentColor" strokeWidth="1.5" className="text-ink-50/15" />
      <line x1="30" y1="66" x2="250" y2="66" stroke="currentColor" strokeWidth="1.5" className="text-ink-50/15" />

      <motion.rect
        x="46" y="82" width="120" height="10" rx="2"
        stroke="currentColor" strokeWidth="1.5" className="text-ink-50/70"
        initial={initial} animate={animate}
        custom={0} variants={drawVariants}
      />
      <motion.rect
        x="46" y="102" width="188" height="70" rx="6"
        stroke="currentColor" strokeWidth="1.5" className="text-ink-50/45"
        initial={initial} animate={animate}
        custom={1} variants={drawVariants}
      />

      {/* mobile frame - static */}
      <rect x="272" y="30" width="98" height="180" rx="14" stroke="currentColor" strokeWidth="1.5" className="text-ink-50/15" />
      <line x1="272" y1="52" x2="370" y2="52" stroke="currentColor" strokeWidth="1.5" className="text-ink-50/15" />

      <motion.rect
        x="284" y="66" width="74" height="10" rx="2"
        stroke="currentColor" strokeWidth="1.5" className="text-ink-50/70"
        initial={initial} animate={animate}
        custom={1.5} variants={drawVariants}
      />
      <motion.rect
        x="284" y="86" width="74" height="44" rx="6"
        stroke="currentColor" strokeWidth="1.5" className="text-ink-50/45"
        initial={initial} animate={animate}
        custom={2} variants={drawVariants}
      />
      <motion.rect
        x="284" y="138" width="74" height="44" rx="6"
        stroke="currentColor" strokeWidth="1.5" className="text-ink-50/45"
        initial={initial} animate={animate}
        custom={2.25} variants={drawVariants}
      />
    </VisualFrame>
  );
}

/** Website Design & Development - cycles between the wireframe and the responsive layout. */
export function WebsiteVisual() {
  return <CyclingVisual visuals={[WebsiteWireframeVisual, WebsiteResponsiveVisual]} />;
}

/* ------------------------------------------------------------------ */
/* Video Editing and Content                                          */
/* ------------------------------------------------------------------ */

const CELLS = Array.from({ length: 9 });
const cellVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.07, ease: EASE },
  }),
};

/** A 3x3 content grid with crop marks. */
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

/** A waveform timeline with a moving playhead. */
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

/** Video Editing and Content - cycles between the photo grid and the waveform. */
export function SocialMediaVisual() {
  return <CyclingVisual visuals={[PhotoGridVisual, VideoWaveformVisual]} />;
}

/* ------------------------------------------------------------------ */
/* Ad Marketing                                                       */
/* ------------------------------------------------------------------ */

const AD_BARS = [28, 40, 36, 54, 48, 66, 60, 80, 94];
const barGrowVariants: Variants = {
  hidden: { scaleY: 0 },
  visible: (i: number) => ({
    scaleY: 1,
    transition: { duration: 0.6, delay: i * 0.06, ease: EASE },
  }),
};

/** A rising bar chart with a drawn trend line. */
function AdBarsVisual() {
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

/** Concentric target rings with an arrow landing on the bullseye - precise targeting. */
function AdTargetVisual() {
  const shouldReduceMotion = useReducedMotion();
  const { ref, visible } = useRevealTrigger();
  const initial = shouldReduceMotion ? false : "hidden";
  const animate = shouldReduceMotion ? undefined : visible ? "visible" : "hidden";
  const cx = 170;
  const cy = 150;

  const dotInitial = shouldReduceMotion ? false : { opacity: 0, scale: 0 };
  const dotAnimate = shouldReduceMotion
    ? undefined
    : visible
    ? { opacity: 1, scale: 1 }
    : { opacity: 0, scale: 0 };

  return (
    <VisualFrame ref={ref}>
      <motion.circle cx={cx} cy={cy} r="86" stroke="currentColor" strokeWidth="1.5" className="text-ink-50/20" initial={initial} animate={animate} custom={0} variants={drawVariants} />
      <motion.circle cx={cx} cy={cy} r="56" stroke="currentColor" strokeWidth="1.5" className="text-ink-50/35" initial={initial} animate={animate} custom={0.15} variants={drawVariants} />
      <motion.circle cx={cx} cy={cy} r="26" stroke="currentColor" strokeWidth="1.5" className="text-ink-50/55" initial={initial} animate={animate} custom={0.3} variants={drawVariants} />
      <motion.circle cx={cx} cy={cy} r="5" fill="currentColor" className="text-ink-50/90" initial={dotInitial} animate={dotAnimate} transition={{ duration: 0.3, delay: 0.7 }} />
      <motion.line x1="270" y1="60" x2={cx + 10} y2={cy - 10} stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-ink-50/80" initial={initial} animate={animate} custom={0.6} variants={drawVariants} />
      <motion.path d="M256 62 L270 60 L268 74" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink-50/80" fill="none" initial={initial} animate={animate} custom={0.75} variants={drawVariants} />
    </VisualFrame>
  );
}

/** Ad Marketing - cycles between the growth chart and the targeting visual. */
export function AdGrowthVisual() {
  return <CyclingVisual visuals={[AdBarsVisual, AdTargetVisual]} />;
}

/* ------------------------------------------------------------------ */
/* Branding & Graphic Design                                          */
/* ------------------------------------------------------------------ */

/** Overlapping circle and triangle drawing in - an abstract logomark. */
function BrandMarkVisual() {
  const shouldReduceMotion = useReducedMotion();
  const { ref, visible } = useRevealTrigger();
  const initial = shouldReduceMotion ? false : "hidden";
  const animate = shouldReduceMotion ? undefined : visible ? "visible" : "hidden";
  const cx = 175;
  const cy = 150;

  return (
    <VisualFrame ref={ref} compact>
      <motion.circle cx={cx - 30} cy={cy} r="60" stroke="currentColor" strokeWidth="1.5" className="text-accent-50/45" initial={initial} animate={animate} custom={0} variants={drawVariants} />
      <motion.polygon
        points={`${cx + 50},${cy - 72} ${cx + 112},${cy + 42} ${cx - 12},${cy + 42}`}
        stroke="currentColor" strokeWidth="1.5" className="text-accent-50/75"
        initial={initial} animate={animate} custom={0.25} variants={drawVariants}
      />
    </VisualFrame>
  );
}

const SWATCH_X = [80, 138, 196, 254, 312];
const SWATCH_OPACITY = ["/20", "/35", "/50", "/65", "/85"];
const swatchVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, delay: i * 0.08, ease: EASE },
  }),
};

/** A row of color swatches with a drawn baseline - a palette. */
function ColorPaletteVisual() {
  const shouldReduceMotion = useReducedMotion();
  const { ref, visible } = useRevealTrigger();
  const initial = shouldReduceMotion ? false : "hidden";
  const animate = shouldReduceMotion ? undefined : visible ? "visible" : "hidden";

  return (
    <VisualFrame ref={ref} compact>
      <motion.line x1="60" y1="220" x2="320" y2="220" stroke="currentColor" strokeWidth="1.5" className="text-accent-50/30" initial={initial} animate={animate} custom={0} variants={drawVariants} />
      {SWATCH_X.map((x, i) => (
        <motion.circle
          key={x}
          cx={x} cy="150" r="30" fill="currentColor"
          className={`text-accent-50${SWATCH_OPACITY[i]}`}
          initial={initial} animate={animate}
          custom={i} variants={swatchVariants}
        />
      ))}
    </VisualFrame>
  );
}

/** Branding & Graphic Design - cycles between the logomark and the palette. */
export function BrandingVisual() {
  return <CyclingVisual visuals={[BrandMarkVisual, ColorPaletteVisual]} />;
}

/* ------------------------------------------------------------------ */
/* Social Media Management                                            */
/* ------------------------------------------------------------------ */

const CAL_COLS = 5;
const CAL_ROWS = 3;
const CAL_CELLS = Array.from({ length: CAL_COLS * CAL_ROWS });
const CAL_SCHEDULED = [2, 6, 11];

/** A content calendar grid with a few days marked as scheduled. */
function CalendarScheduleVisual() {
  const shouldReduceMotion = useReducedMotion();
  const { ref, visible } = useRevealTrigger();
  const initial = shouldReduceMotion ? false : "hidden";
  const animate = shouldReduceMotion ? undefined : visible ? "visible" : "hidden";

  const gap = 10;
  const cellSize = (340 - gap * (CAL_COLS - 1)) / CAL_COLS;
  const startX = 30;
  const startY = 80;

  return (
    <VisualFrame ref={ref} compact>
      <motion.rect x="30" y="34" width="340" height="26" rx="6" stroke="currentColor" strokeWidth="1.5" className="text-accent-50/45" initial={initial} animate={animate} custom={0} variants={drawVariants} />
      {CAL_CELLS.map((_, i) => {
        const row = Math.floor(i / CAL_COLS);
        const col = i % CAL_COLS;
        const x = startX + col * (cellSize + gap);
        const y = startY + row * (cellSize + gap);
        const isScheduled = CAL_SCHEDULED.includes(i);
        return (
          <motion.rect
            key={i}
            x={x} y={y} width={cellSize} height={cellSize} rx="4"
            stroke="currentColor" strokeWidth="1.25"
            fill={isScheduled ? "currentColor" : "none"}
            className={isScheduled ? "text-accent-50/60" : "text-accent-50/20"}
            initial={initial} animate={animate}
            custom={i} variants={cellVariants}
          />
        );
      })}
    </VisualFrame>
  );
}

/** Chat bubble outlines with a heart - engagement across the feed. */
function EngagementBubblesVisual() {
  const shouldReduceMotion = useReducedMotion();
  const { ref, visible } = useRevealTrigger();
  const initial = shouldReduceMotion ? false : "hidden";
  const animate = shouldReduceMotion ? undefined : visible ? "visible" : "hidden";

  const heartInitial = shouldReduceMotion ? false : { opacity: 0, scale: 0.5 };
  const heartAnimate = shouldReduceMotion
    ? undefined
    : visible
    ? { opacity: 1, scale: 1 }
    : { opacity: 0, scale: 0.5 };

  return (
    <VisualFrame ref={ref} compact>
      <motion.path
        d="M60 100 H200 a10 10 0 0 1 10 10 V160 a10 10 0 0 1 -10 10 H140 L120 194 V170 H60 a10 10 0 0 1 -10 -10 V110 a10 10 0 0 1 10 -10 Z"
        stroke="currentColor" strokeWidth="1.5" className="text-accent-50/55"
        initial={initial} animate={animate} custom={0} variants={drawVariants}
      />
      <motion.path
        d="M230 60 H340 a8 8 0 0 1 8 8 V114 a8 8 0 0 1 -8 8 H270 L254 140 V122 H230 a8 8 0 0 1 -8 -8 V68 a8 8 0 0 1 8 -8 Z"
        stroke="currentColor" strokeWidth="1.5" className="text-accent-50/30"
        initial={initial} animate={animate} custom={0.2} variants={drawVariants}
      />
      <motion.path
        d="M118 138 c0 -12 18 -12 18 -1 c0 -11 18 -11 18 1 c0 14 -18 23 -18 23 c0 0 -18 -9 -18 -23 z"
        fill="currentColor" className="text-accent-50/80"
        initial={heartInitial} animate={heartAnimate}
        transition={{ duration: 0.4, delay: 0.5 }}
      />
    </VisualFrame>
  );
}

/** Social Media Management - cycles between the content calendar and engagement. */
export function SocialManagementVisual() {
  return <CyclingVisual visuals={[CalendarScheduleVisual, EngagementBubblesVisual]} />;
}

/* ------------------------------------------------------------------ */
/* SEO & Local Growth                                                 */
/* ------------------------------------------------------------------ */

const SEARCH_BARS = [34, 56, 82, 112];

/** Rising search-ranking bars behind a magnifying glass. */
function SearchRankVisual() {
  const shouldReduceMotion = useReducedMotion();
  const { ref, visible } = useRevealTrigger();
  const initial = shouldReduceMotion ? false : "hidden";
  const animate = shouldReduceMotion ? undefined : visible ? "visible" : "hidden";

  const barWidth = 34;
  const gap = 18;
  const startX = 40;
  const baseY = 230;

  return (
    <VisualFrame ref={ref} compact>
      <line x1="30" y1={baseY} x2="370" y2={baseY} stroke="currentColor" strokeWidth="1" className="text-accent-50/15" />
      {SEARCH_BARS.map((h, i) => {
        const x = startX + i * (barWidth + gap);
        const y = baseY - h;
        return (
          <motion.rect
            key={i}
            x={x} y={y} width={barWidth} height={h} rx="3"
            fill="currentColor" className="text-accent-50/30"
            style={{ transformOrigin: `${x + barWidth / 2}px ${baseY}px` }}
            initial={initial} animate={animate}
            custom={i} variants={barGrowVariants}
          />
        );
      })}
      <motion.circle cx="265" cy="110" r="46" stroke="currentColor" strokeWidth="2" className="text-accent-50/80" initial={initial} animate={animate} custom={0.5} variants={drawVariants} />
      <motion.line x1="298" y1="143" x2="336" y2="181" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-accent-50/80" initial={initial} animate={animate} custom={0.7} variants={drawVariants} />
    </VisualFrame>
  );
}

/** A map pin with radiating rings - local reach. */
function LocalPinVisual() {
  const shouldReduceMotion = useReducedMotion();
  const { ref, visible } = useRevealTrigger();
  const initial = shouldReduceMotion ? false : "hidden";
  const animate = shouldReduceMotion ? undefined : visible ? "visible" : "hidden";
  const cx = 190;

  const dotInitial = shouldReduceMotion ? false : { opacity: 0, scale: 0 };
  const dotAnimate = shouldReduceMotion
    ? undefined
    : visible
    ? { opacity: 1, scale: 1 }
    : { opacity: 0, scale: 0 };

  return (
    <VisualFrame ref={ref} compact>
      <motion.circle cx={cx} cy="160" r="40" stroke="currentColor" strokeWidth="1.5" className="text-accent-50/20" initial={initial} animate={animate} custom={0} variants={drawVariants} />
      <motion.circle cx={cx} cy="160" r="68" stroke="currentColor" strokeWidth="1.5" className="text-accent-50/12" initial={initial} animate={animate} custom={0.15} variants={drawVariants} />
      <motion.path
        d={`M${cx} 90 c-28 0 -48 20 -48 46 c0 34 48 84 48 84 c0 0 48 -50 48 -84 c0 -26 -20 -46 -48 -46 z`}
        stroke="currentColor" strokeWidth="1.5" className="text-accent-50/75"
        initial={initial} animate={animate} custom={0.35} variants={drawVariants}
      />
      <motion.circle cx={cx} cy="136" r="14" fill="currentColor" className="text-accent-50/75" initial={dotInitial} animate={dotAnimate} transition={{ duration: 0.3, delay: 0.9 }} />
    </VisualFrame>
  );
}

/** SEO & Local Growth - cycles between search ranking and local reach. */
export function SEOVisual() {
  return <CyclingVisual visuals={[SearchRankVisual, LocalPinVisual]} />;
}

/* ------------------------------------------------------------------ */
/* Automation & AI Solutions                                          */
/* ------------------------------------------------------------------ */

const FLOW_NODES = [
  { x: 70, y: 150 },
  { x: 200, y: 90 },
  { x: 200, y: 210 },
  { x: 330, y: 150 },
];
const FLOW_LINES = [
  { a: FLOW_NODES[0], b: FLOW_NODES[1], d: 0 },
  { a: FLOW_NODES[0], b: FLOW_NODES[2], d: 0.1 },
  { a: FLOW_NODES[1], b: FLOW_NODES[3], d: 0.2 },
  { a: FLOW_NODES[2], b: FLOW_NODES[3], d: 0.3 },
];

/** Connected workflow nodes drawing themselves in - automation. */
function AutomationFlowVisual() {
  const shouldReduceMotion = useReducedMotion();
  const { ref, visible } = useRevealTrigger();
  const initial = shouldReduceMotion ? false : "hidden";
  const animate = shouldReduceMotion ? undefined : visible ? "visible" : "hidden";

  return (
    <VisualFrame ref={ref} compact>
      {FLOW_LINES.map((l, i) => (
        <motion.line
          key={i}
          x1={l.a.x} y1={l.a.y} x2={l.b.x} y2={l.b.y}
          stroke="currentColor" strokeWidth="1.5" className="text-accent-50/40"
          initial={initial} animate={animate} custom={l.d} variants={drawVariants}
        />
      ))}
      {FLOW_NODES.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x} cy={n.y} r="13" fill="none"
          stroke="currentColor" strokeWidth="1.5" className="text-accent-50/80"
          initial={initial} animate={animate} custom={0.4 + i * 0.1} variants={drawVariants}
        />
      ))}
    </VisualFrame>
  );
}

const AI_LAYER_1 = [{ x: 70, y: 110 }, { x: 70, y: 190 }];
const AI_LAYER_2 = [{ x: 200, y: 75 }, { x: 200, y: 150 }, { x: 200, y: 225 }];
const AI_LAYER_3 = [{ x: 330, y: 110 }, { x: 330, y: 190 }];
const AI_NODES = [...AI_LAYER_1, ...AI_LAYER_2, ...AI_LAYER_3];
const AI_CONNECTIONS = [
  ...AI_LAYER_1.flatMap((a, i) => AI_LAYER_2.map((b, j) => ({ a, b, d: (i + j) * 0.05 }))),
  ...AI_LAYER_2.flatMap((a, i) => AI_LAYER_3.map((b, j) => ({ a, b, d: 0.3 + (i + j) * 0.05 }))),
];

/** A three-layer node network - AI. */
function AINetworkVisual() {
  const shouldReduceMotion = useReducedMotion();
  const { ref, visible } = useRevealTrigger();
  const initial = shouldReduceMotion ? false : "hidden";
  const animate = shouldReduceMotion ? undefined : visible ? "visible" : "hidden";

  const nodeInitial = shouldReduceMotion ? false : { opacity: 0, scale: 0 };
  const nodeAnimate = shouldReduceMotion
    ? undefined
    : visible
    ? { opacity: 1, scale: 1 }
    : { opacity: 0, scale: 0 };

  return (
    <VisualFrame ref={ref} compact>
      {AI_CONNECTIONS.map((c, i) => (
        <motion.line
          key={i}
          x1={c.a.x} y1={c.a.y} x2={c.b.x} y2={c.b.y}
          stroke="currentColor" strokeWidth="1" className="text-accent-50/20"
          initial={initial} animate={animate} custom={c.d} variants={drawVariants}
        />
      ))}
      {AI_NODES.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x} cy={n.y} r="7" fill="currentColor" className="text-accent-50/85"
          initial={nodeInitial} animate={nodeAnimate}
          transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
        />
      ))}
    </VisualFrame>
  );
}

/** Automation & AI Solutions - cycles between the workflow diagram and the network. */
export function AutomationVisual() {
  return <CyclingVisual visuals={[AutomationFlowVisual, AINetworkVisual]} />;
}

/* ------------------------------------------------------------------ */
/* E-commerce & Online Stores                                         */
/* ------------------------------------------------------------------ */

/** A shopping cart with products dropping in. */
function ShoppingCartVisual() {
  const shouldReduceMotion = useReducedMotion();
  const { ref, visible } = useRevealTrigger();
  const initial = shouldReduceMotion ? false : "hidden";
  const animate = shouldReduceMotion ? undefined : visible ? "visible" : "hidden";

  return (
    <VisualFrame ref={ref} compact>
      <motion.rect x="150" y="30" width="30" height="30" rx="4" stroke="currentColor" strokeWidth="1.5" className="text-accent-50/40" initial={initial} animate={animate} custom={0} variants={drawVariants} />
      <motion.rect x="204" y="20" width="26" height="26" rx="4" stroke="currentColor" strokeWidth="1.5" className="text-accent-50/40" initial={initial} animate={animate} custom={0.15} variants={drawVariants} />
      <motion.path
        d="M50 70 H80 L104 190 H274 L294 100 H110"
        stroke="currentColor" strokeWidth="1.5" className="text-accent-50/75"
        initial={initial} animate={animate} custom={0.35} variants={drawVariants}
      />
      <motion.circle cx="134" cy="220" r="12" stroke="currentColor" strokeWidth="1.5" className="text-accent-50/60" initial={initial} animate={animate} custom={0.65} variants={drawVariants} />
      <motion.circle cx="244" cy="220" r="12" stroke="currentColor" strokeWidth="1.5" className="text-accent-50/60" initial={initial} animate={animate} custom={0.75} variants={drawVariants} />
    </VisualFrame>
  );
}

const STORE_CELLS = Array.from({ length: 6 });

/** A storefront product grid with price-tag markers. */
function StorefrontGridVisual() {
  const shouldReduceMotion = useReducedMotion();
  const { ref, visible } = useRevealTrigger();
  const initial = shouldReduceMotion ? false : "hidden";
  const animate = shouldReduceMotion ? undefined : visible ? "visible" : "hidden";

  const gap = 14;
  const cols = 3;
  const size = (340 - gap * (cols - 1)) / cols;

  const tagInitial = shouldReduceMotion ? false : { opacity: 0, scale: 0 };
  const tagAnimate = (v: boolean) =>
    shouldReduceMotion ? undefined : v ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 };

  return (
    <VisualFrame ref={ref} compact>
      {STORE_CELLS.map((_, i) => {
        const row = Math.floor(i / cols);
        const col = i % cols;
        const x = 30 + col * (size + gap);
        const y = 46 + row * (size + gap);
        return (
          <g key={i}>
            <motion.rect
              x={x} y={y} width={size} height={size} rx="6"
              stroke="currentColor" strokeWidth="1.25" className="text-accent-50/40"
              initial={initial} animate={animate} custom={i} variants={cellVariants}
            />
            <motion.circle
              cx={x + size - 16} cy={y + 16} r="6" fill="currentColor" className="text-accent-50/75"
              initial={tagInitial} animate={tagAnimate(visible)}
              transition={{ duration: 0.25, delay: 0.3 + i * 0.08 }}
            />
          </g>
        );
      })}
    </VisualFrame>
  );
}

/** E-commerce & Online Stores - cycles between the cart and the storefront grid. */
export function EcommerceVisual() {
  return <CyclingVisual visuals={[ShoppingCartVisual, StorefrontGridVisual]} />;
}
