"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import clsx from "clsx";
import { Reveal } from "@/components/ui/Reveal";

// A rod falls in vertically, topples over into a horizontal underline,
// "THE GAP" pops out from behind it, then the bar drops away under its
// own weight and disappears, leaving just the label. Plays once, on
// scroll-in.
const ROD_WIDTH = 5;
const ROD_LENGTH = 72;

const gapBarVariants: Variants = {
  hidden: { y: -140, rotate: 0, opacity: 1 },
  visible: {
    y: [-140, 0, -5, 0, 0, 0, 0, 56],
    rotate: [0, 0, 0, 0, 95, 90, 90, 90],
    opacity: [1, 1, 1, 1, 1, 1, 1, 0],
    transition: {
      duration: 1.7,
      times: [0, 0.28, 0.33, 0.38, 0.55, 0.68, 0.82, 1],
      ease: [
        "easeIn",
        "easeOut",
        "easeIn",
        "easeOut",
        "easeOut",
        "linear",
        "easeIn",
      ],
    },
  },
};

const gapTextVariants: Variants = {
  hidden: { opacity: 0, scale: 0.4 },
  visible: {
    opacity: [0, 0, 1, 1],
    scale: [0.4, 0.4, 1.15, 1],
    transition: {
      duration: 1.7,
      times: [0, 0.58, 0.7, 0.8],
      ease: ["linear", "easeOut", "easeOut"],
    },
  },
};

function GapLabel() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <span className="label">The Gap</span>;
  }

  return (
    <motion.span
      className="relative inline-block px-1"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2"
        style={{
          width: ROD_WIDTH,
          height: ROD_LENGTH,
          marginLeft: -ROD_WIDTH / 2,
          marginTop: -ROD_LENGTH / 2,
        }}
      >
        <motion.span
          className="block h-full w-full rounded-[2px] bg-ink-50"
          variants={gapBarVariants}
        />
      </span>
      <motion.span
        className="label relative z-10 inline-block"
        variants={gapTextVariants}
      >
        The Gap
      </motion.span>
    </motion.span>
  );
}

const BEATS = [
  {
    heading: "You're Good At What You Do",
    text: "You're good at what you do, good enough that most of your business still runs on word of mouth.",
  },
  {
    heading: "But Customers Check First",
    text: `But the next customer checks first: your name, your site, your last few posts, deciding in seconds whether you're worth trusting. That's your "digital footprint," whether you're managing it or not.`,
  },
  {
    heading: "Someone Else Shows Up Instead",
    text: "Most owners assume that doesn't apply to them, until a competitor with half their experience opens down the street with a clean website and starts winning the customers they never even knew were looking.",
  },
  {
    heading: "Patchwork Isn't One Business",
    text: `Some of you have tried to fix this piecemeal: a freelancer here, a cousin who "does social media" there. None of them were in the room together, so none of it looks like the same business.`,
  },
  {
    heading: "The Cost Is Quiet",
    text: "The cost isn't dramatic, it's quiet: the customer who almost called, saw nothing recent, and kept scrolling to the competitor who simply showed up.",
  },
];

// Wave geometry, in viewBox units (0-120 wide, 100 tall per beat).
const VIEW_W = 120;
const PERIOD = 100;
const CENTER_X = 60;
const LEFT_X = 42;
const RIGHT_X = 78;

function buildWavePath(count: number) {
  let d = `M ${CENTER_X} 0`;
  for (let i = 0; i < count; i++) {
    const y0 = i * PERIOD;
    const peakY = y0 + PERIOD / 2;
    const endY = y0 + PERIOD;
    const peakX = i % 2 === 0 ? RIGHT_X : LEFT_X;
    d += ` C ${CENTER_X} ${y0 + PERIOD * 0.25}, ${peakX} ${y0 + PERIOD * 0.25}, ${peakX} ${peakY}`;
    d += ` C ${peakX} ${y0 + PERIOD * 0.75}, ${CENTER_X} ${y0 + PERIOD * 0.75}, ${CENTER_X} ${endY}`;
  }
  return d;
}

function DesktopBeat({
  index,
  heading,
  text,
}: {
  index: number;
  heading: string;
  text: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isRight = index % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "center center", "end 0.3"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0.4]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [28, 0, 0]);
  const dotScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 1]);
  const dotOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.6]);

  const peakXPercent = ((isRight ? RIGHT_X : LEFT_X) / VIEW_W) * 100;

  return (
    <div className="relative flex min-h-[240px] items-center" ref={ref}>
      <motion.span
        aria-hidden="true"
        style={{
          left: `${peakXPercent}%`,
          ...(shouldReduceMotion ? {} : { scale: dotScale, opacity: dotOpacity }),
        }}
        className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink-50"
      />
      <motion.div
        style={shouldReduceMotion ? undefined : { opacity, y }}
        className={clsx(
          "w-[32%]",
          isRight ? "ml-auto text-left" : "mr-auto text-left"
        )}
      >
        <h3 className="font-display text-lg font-medium text-ink-50 sm:text-xl">
          {heading}
        </h3>
        <p className="mt-3 leading-relaxed text-ink-400">{text}</p>
      </motion.div>
    </div>
  );
}

function MobileBeat({ heading, text }: { heading: string; text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "center center", "end 0.3"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0.4]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [28, 0, 0]);
  const dotScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 1]);
  const dotOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.6]);

  return (
    <div ref={ref} className="relative pl-9">
      <motion.span
        aria-hidden="true"
        style={
          shouldReduceMotion
            ? undefined
            : { scale: dotScale, opacity: dotOpacity }
        }
        // Must match the mobile line's rendered center exactly: the line svg
        // below is positioned at left-[4px] with a 2px-wide viewBox="0 0 2 100"
        // and drawn at x="1" (the viewBox's midpoint), so its true center is
        // 4px + 1px = 5px from the container edge, not the svg's own left-4px.
        className="absolute left-[5px] top-2 h-2 w-2 -translate-x-1/2 rounded-full bg-ink-50"
      />
      <motion.div style={shouldReduceMotion ? undefined : { opacity, y }}>
        <h3 className="font-display text-lg font-medium text-ink-50">
          {heading}
        </h3>
        <p className="mt-2 leading-relaxed text-ink-400">{text}</p>
      </motion.div>
    </div>
  );
}

export default function Story() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });

  const wavePathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const straightLineDashoffset = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const wavePathD = buildWavePath(BEATS.length);

  return (
    <section id="story" className="relative bg-ink-950 px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-3xl sm:max-w-5xl">
        <div className="text-center">
          <GapLabel />
        </div>

        <Reveal delay={0.05}>
          <h2 className="mt-6 text-center font-display text-[clamp(1.9rem,4.2vw,3.25rem)] font-semibold leading-[1.1] tracking-tight text-ink-50">
            You&rsquo;re excellent at what you do.
            <br />
            Online, you&rsquo;re invisible.
          </h2>
        </Reveal>

        {/* Desktop: S-curve with beats alternating left/right */}
        <div ref={timelineRef} className="relative mt-16 hidden sm:block">
          <svg
            aria-hidden="true"
            className="absolute inset-0 h-full w-full"
            viewBox={`0 0 ${VIEW_W} ${BEATS.length * PERIOD}`}
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d={wavePathD}
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-ink-50/10"
            />
            <motion.path
              d={wavePathD}
              stroke="currentColor"
              strokeWidth="1.5"
              style={
                shouldReduceMotion
                  ? { pathLength: 1 }
                  : { pathLength: wavePathLength }
              }
              className="text-ink-50/70"
            />
          </svg>

          {BEATS.map((beat, i) => (
            <DesktopBeat
              key={beat.heading}
              index={i}
              heading={beat.heading}
              text={beat.text}
            />
          ))}
        </div>

        {/* Mobile: straight line, single column */}
        <div className="relative mt-14 space-y-14 sm:hidden">
          <svg
            aria-hidden="true"
            className="absolute left-[4px] top-0 h-full w-[2px]"
            viewBox="0 0 2 100"
            preserveAspectRatio="none"
            fill="none"
          >
            <line
              x1="1"
              y1="0"
              x2="1"
              y2="100"
              stroke="currentColor"
              strokeWidth="2"
              className="text-ink-50/10"
            />
            <motion.line
              x1="1"
              y1="0"
              x2="1"
              y2="100"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="100 100"
              style={
                shouldReduceMotion
                  ? { strokeDashoffset: 0 }
                  : { strokeDashoffset: straightLineDashoffset }
              }
              className="text-ink-50/70"
            />
          </svg>

          {BEATS.map((beat) => (
            <MobileBeat key={beat.heading} heading={beat.heading} text={beat.text} />
          ))}
        </div>
      </div>
    </section>
  );
}
