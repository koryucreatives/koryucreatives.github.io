"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

const STEPS = [
  {
    title: "Discover",
    copy: "We start by understanding your business, your customers, and where your digital presence is quietly falling short.",
  },
  {
    title: "Design",
    copy: "We map a look, voice, and content plan so your website, content, video, and ads all speak the same language from day one.",
  },
  {
    title: "Build",
    copy: "Our team builds the site, edits the content you provide, and sets up the ad campaigns: in parallel, not in sequence.",
  },
  {
    title: "Launch",
    copy: "Everything goes live together, as one coordinated presence, not disconnected pieces released months apart.",
  },
  {
    title: "Grow",
    copy: "We keep watching the numbers, refining the content, and optimizing ad spend: month over month, not set-and-forget.",
  },
];

export default function Process() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="process" className="relative bg-ink-900 px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-content">
        <Reveal className="text-center">
          <span className="label">How We Work</span>
        </Reveal>
        <Reveal delay={0.05} className="text-center">
          <h2 className="mx-auto mt-6 font-display text-[clamp(1.9rem,4.2vw,3.25rem)] font-semibold leading-[1.1] tracking-tight text-ink-50">
            Five steps.
            <br />
            No disconnected handoffs.
          </h2>
        </Reveal>

        {/* Desktop: horizontal stepper */}
        <div className="mt-24 hidden lg:block">
          <div className="relative grid grid-cols-5 gap-8">
            <div className="absolute left-0 right-0 top-[13px] h-px bg-ink-50/10" />
            <motion.div
              initial={shouldReduceMotion ? undefined : { scaleX: 0 }}
              whileInView={shouldReduceMotion ? undefined : { scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
              style={{ transformOrigin: "left" }}
              className="absolute left-0 right-0 top-[13px] h-px bg-ink-50/60"
            />

            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.12}>
                <div className="relative pt-10">
                  <span className="absolute left-0 top-0 h-[13px] w-[13px] -translate-y-1/2 rounded-full border-2 border-ink-50 bg-ink-900" />
                  <span className="font-display text-xs text-ink-500">
                    0{i + 1}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-medium text-ink-50">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-400">
                    {step.copy}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Mobile / tablet: vertical stepper */}
        <div className="relative mt-16 lg:hidden">
          <div className="absolute bottom-0 left-[6px] top-0 w-px bg-ink-50/10" />
          <motion.div
            initial={shouldReduceMotion ? undefined : { scaleY: 0 }}
            whileInView={shouldReduceMotion ? undefined : { scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
            style={{ transformOrigin: "top" }}
            className="absolute bottom-0 left-[6px] top-0 w-px bg-ink-50/60"
          />

          <div className="space-y-12">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08}>
                <div className="relative pl-10">
                  <span className="absolute left-0 top-1 h-[13px] w-[13px] rounded-full border-2 border-ink-50 bg-ink-900" />
                  <span className="font-display text-xs text-ink-500">
                    0{i + 1}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-medium text-ink-50">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-400">
                    {step.copy}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
