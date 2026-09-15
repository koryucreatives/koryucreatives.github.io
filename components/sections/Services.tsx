"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { Reveal } from "@/components/ui/Reveal";
import {
  WebsiteVisual,
  PhotoGridVisual,
  VideoWaveformVisual,
  AdGrowthVisual,
} from "@/components/ui/ServiceVisuals";

type Service = {
  name: string;
  short: string;
  why: string;
  included: string[];
  visual: React.ComponentType;
};

const SERVICES: Service[] = [
  {
    name: "Website Design & Development",
    short: "Your storefront, open 24 hours a day.",
    why: "First impressions happen in milliseconds. We design and build fast, conversion-focused websites that make your business look as credible online as it already is in person.",
    included: [
      "Custom design & user experience",
      "Responsive development for every device",
      "SEO-ready structure & fast load times",
      "Ongoing performance & security upkeep",
    ],
    visual: WebsiteVisual,
  },
  {
    name: "Social Media Photo Editing",
    short: "Content that looks like it belongs to one brand.",
    why: "Your feed is often the first thing a potential customer sees before they ever visit. We shoot, edit, and package photo content that looks consistent, current, and credible.",
    included: [
      "Product & service photo editing",
      "On-brand templates & visual system",
      "Batch content calendars",
      "Platform-ready formatting for every channel",
    ],
    visual: PhotoGridVisual,
  },
  {
    name: "Video Editing",
    short: "Motion builds trust faster than anything else.",
    why: "Video earns attention and trust faster than any other format. We turn raw footage into short- and long-form content that holds attention and drives action.",
    included: [
      "Reels & short-form editing",
      "Brand intros, captions & motion graphics",
      "Ad-ready cutdowns for every placement",
      "Monthly content batching",
    ],
    visual: VideoWaveformVisual,
  },
  {
    name: "Paid Ad Management",
    short: "Budget that turns into customers, not impressions.",
    why: "Great content still needs the right audience. We run and continuously optimize ad campaigns so your budget turns into customers, not just impressions.",
    included: [
      "Campaign setup & audience targeting",
      "Creative testing across formats",
      "Ongoing budget optimization",
      "Plain-language monthly reporting",
    ],
    visual: AdGrowthVisual,
  },
];

export default function Services() {
  const [active, setActive] = useState(0);
  const service = SERVICES[active];
  const ActiveVisual = service.visual;

  return (
    <section id="services" className="relative bg-ink-950 px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-content">
        <Reveal>
          <span className="label">What We Do</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 max-w-2xl font-display text-[clamp(1.9rem,4.2vw,3.25rem)] font-semibold leading-[1.1] tracking-tight text-ink-50">
            Four services. One integrated team.
          </h2>
        </Reveal>

        {/* Desktop: interactive list + panel */}
        <Reveal delay={0.1} className="mt-16 hidden lg:block">
          <div className="grid grid-cols-12 gap-12">
            <div className="col-span-5">
              <ul>
                {SERVICES.map((s, i) => (
                  <li key={s.name} className="border-b border-ink-50/10">
                    <button
                      type="button"
                      data-cursor="link"
                      onClick={() => setActive(i)}
                      onMouseEnter={() => setActive(i)}
                      className="group flex w-full items-center gap-6 py-7 text-left"
                    >
                      <span
                        className={clsx(
                          "font-display text-sm transition-colors",
                          i === active ? "text-ink-50" : "text-ink-600"
                        )}
                      >
                        0{i + 1}
                      </span>
                      <h3
                        className={clsx(
                          "font-display text-2xl font-medium tracking-tight transition-colors",
                          i === active ? "text-ink-50" : "text-ink-500 group-hover:text-ink-300"
                        )}
                      >
                        {s.name}
                      </h3>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-7">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-ink-800 to-ink-950">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                  >
                    <ActiveVisual />
                  </motion.div>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={active}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="pointer-events-none absolute -bottom-6 -right-4 font-display text-[10rem] font-bold leading-none text-ink-50/5"
                  >
                    0{active + 1}
                  </motion.span>
                </AnimatePresence>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-8"
                >
                  <p className="text-lg text-ink-200">{service.short}</p>
                  <p className="mt-4 leading-relaxed text-ink-400">
                    {service.why}
                  </p>
                  <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3">
                    {service.included.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-ink-300"
                      >
                        <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-ink-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>

        {/* Mobile / tablet: accordion */}
        <div className="mt-14 space-y-4 lg:hidden">
          {SERVICES.map((s, i) => {
            const isOpen = active === i;
            return (
              <Reveal key={s.name} delay={i * 0.05}>
                <div className="overflow-hidden rounded-2xl border border-ink-50/10">
                  <button
                    type="button"
                    data-cursor="link"
                    onClick={() => setActive(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-6 text-left"
                  >
                    <span className="flex items-center gap-4">
                      <span className="font-display text-sm text-ink-500">
                        0{i + 1}
                      </span>
                      <h3 className="font-display text-xl font-medium text-ink-50">
                        {s.name}
                      </h3>
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      className="text-2xl font-light text-ink-400"
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-8">
                          <p className="text-ink-200">{s.short}</p>
                          <p className="mt-3 leading-relaxed text-ink-400">
                            {s.why}
                          </p>
                          <ul className="mt-5 space-y-2">
                            {s.included.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2 text-sm text-ink-300"
                              >
                                <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-ink-500" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
