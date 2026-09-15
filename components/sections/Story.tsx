"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

const PARAGRAPHS = [
  "You're good at what you do. Really good: good enough that most of your business still comes from word of mouth, from people who found you once and never looked anywhere else.",
  `But the next customer doesn't work that way. Before they call, before they walk in, they check. They search your name, glance at your site, scroll your last few posts, and in about the time it takes to blink, they've decided whether you're a business worth trusting. That's your "digital footprint": simply, the impression you leave everywhere someone can find you online, whether you're managing it or not.`,
  "A lot of business owners assume that doesn't apply to them: that their trade is too hands-on, too local, too old-school for any of this to matter. And then a competitor with half their experience opens down the street with a clean website and an active page, and starts winning the customers who were never going to call a number with no website attached to it.",
  "Some of you have already tried to fix this. A freelancer for the logo. Another for the website. A cousin who \"does social media\" who posted six times last spring and then disappeared. None of them were in the room together, so none of it looks or sounds like it came from the same business: what's usually called \"brand consistency,\" meaning your site, your page, and your ads all actually agree on who you are.",
  "The cost of that isn't dramatic. It's quiet. It's the customer who almost called, checked your page, saw nothing recent, and kept scrolling, straight to the competitor who simply showed up.",
];

function Beat({ index, text }: { index: number; text: string }) {
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
    <div ref={ref} className="relative pl-9 sm:pl-12">
      <motion.span
        aria-hidden="true"
        style={
          shouldReduceMotion
            ? undefined
            : { scale: dotScale, opacity: dotOpacity }
        }
        className="absolute left-[3px] top-2 h-2 w-2 -translate-x-1/2 rounded-full bg-ink-50 sm:left-1"
      />
      <motion.p
        style={shouldReduceMotion ? undefined : { opacity, y }}
        className="text-lg leading-relaxed text-ink-300 sm:text-xl"
      >
        {text}
      </motion.p>
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

  const strokeDashoffset = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <section id="story" className="relative bg-ink-950 px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <span className="label">The Gap</span>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-6 font-display text-[clamp(1.9rem,4.2vw,3.25rem)] font-semibold leading-[1.1] tracking-tight text-ink-50">
            You&rsquo;re excellent at what you do.
            <br />
            Online, you&rsquo;re invisible.
          </h2>
        </Reveal>

        <div ref={timelineRef} className="relative mt-16 space-y-16 sm:mt-20 sm:space-y-20">
          <svg
            aria-hidden="true"
            className="absolute left-[4px] top-0 h-full w-[2px] sm:left-[6px]"
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
                shouldReduceMotion ? { strokeDashoffset: 0 } : { strokeDashoffset }
              }
              className="text-ink-50/70"
            />
          </svg>

          {PARAGRAPHS.map((p, i) => (
            <Beat key={p} index={i} text={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
