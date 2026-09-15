"use client";

import { motion, useReducedMotion } from "framer-motion";
import AnimatedMark from "@/components/ui/AnimatedMark";
import MagneticButton from "@/components/ui/MagneticButton";
import { scrollToId } from "@/lib/smoothScroll";

const EASE = [0.16, 1, 0.3, 1] as const;

// Headline options considered — shipping the first:
// 1. "Your business is real. Is your digital presence?"
// 2. "You show up for your customers. Does your digital presence show up for you?"
// 3. "Great work deserves to be seen — everywhere your customers are already looking."
const HEADLINE_LINES = ["Your business is real.", "Is your digital presence?"];

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-ink-950 px-6 pt-28 text-center sm:px-10"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 -translate-x-1/2 -translate-y-1/2 opacity-[0.07]">
        <AnimatedMark size={780} spin spinDuration={140} className="text-ink-50" />
      </div>

      <div className="relative z-10 flex max-w-4xl flex-col items-center">
        <motion.span
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="label mb-8"
        >
          Digital Transformation Agency
        </motion.span>

        <h1 className="font-display font-semibold leading-[1.05] tracking-tight text-[clamp(2rem,7vw,4.75rem)] text-ink-50 sm:leading-[0.98]">
          {HEADLINE_LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden whitespace-normal pb-1 sm:whitespace-nowrap">
              <motion.span
                initial={shouldReduceMotion ? undefined : { y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.25 + i * 0.15, ease: EASE }}
                className="block"
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75, ease: EASE }}
          className="mt-8 max-w-xl text-balance text-base text-ink-300 sm:text-lg"
        >
          You built something worth trusting. We make sure the internet
          knows it: your website, content, video, and ads, built by one
          team as a single, cohesive story.
        </motion.p>

        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95, ease: EASE }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
        >
          <MagneticButton onClick={() => scrollToId("contact")}>
            Start Your Transformation
          </MagneticButton>
          <MagneticButton variant="outline" onClick={() => scrollToId("work")}>
            See Our Work
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="label">Scroll</span>
        <motion.div
          animate={shouldReduceMotion ? undefined : { y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-10 w-px bg-gradient-to-b from-ink-50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
