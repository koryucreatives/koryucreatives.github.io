"use client";

import { motion } from "framer-motion";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import AnimatedMark from "@/components/ui/AnimatedMark";

const OLD_WAY = [
  "A freelancer for the website",
  "A cousin who \"does social media\"",
  "Whoever's cheapest for the ads",
];

const KORYU_WAY = [
  "Website Design & Development",
  "Video & Photo Editing for Your Socials",
  "Ad Marketing",
];

export default function Bridge() {
  return (
    <section className="relative overflow-hidden bg-ink-900 px-6 py-28 sm:px-10 sm:py-36">
      <div className="pointer-events-none absolute -right-40 top-1/2 hidden -translate-y-1/2 opacity-[0.06] lg:block">
        <AnimatedMark size={520} className="text-ink-50" draw={false} />
      </div>

      <div className="relative mx-auto max-w-content">
        <Reveal>
          <span className="label">The Bridge</span>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-6 max-w-2xl font-display text-[clamp(1.9rem,4.2vw,3.25rem)] font-semibold leading-[1.1] tracking-tight text-ink-50">
            One team. One story.
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-300">
            KORYU exists because that gap shouldn&rsquo;t be normal: one team,
            working from the same brief, instead of three people who&rsquo;ve
            never spoken.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 items-center gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-10">
          <RevealGroup className="space-y-4" stagger={0.08}>
            <RevealItem>
              <span className="label text-ink-600">The Old Way</span>
            </RevealItem>
            {OLD_WAY.map((item, i) => (
              <RevealItem key={item}>
                <div className="flex items-center gap-4 rounded-xl border border-dashed border-ink-50/15 bg-ink-950/30 px-5 py-4">
                  <span className="font-display text-sm text-ink-600">
                    0{i + 1}
                  </span>
                  <span className="text-ink-400">{item}</span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.15} className="flex justify-center">
            <motion.svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              className="rotate-90 text-ink-500 lg:rotate-0"
              aria-hidden="true"
            >
              <motion.path
                d="M4 20H34M34 20L24 10M34 20L24 30"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </motion.svg>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="rounded-2xl border border-ink-50/20 bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950 p-8">
              <span className="label text-ink-50">The KORYU Way</span>
              <div className="mt-6 space-y-4">
                {KORYU_WAY.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-ink-50"
                    />
                    <span className="font-display font-medium tracking-wide text-ink-50">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-ink-400">
                One team, same brief, every time.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-8 text-center">
          <p className="text-sm text-ink-500">
            Three disciplines, one team, one narrative from day one.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
