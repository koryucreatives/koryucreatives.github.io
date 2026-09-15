"use client";

import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const POINTS = [
  {
    title: "One team, zero guesswork",
    copy: "The people building your site talk daily to the people shooting your content and running your ads, because they're the same team, not five inboxes you're managing yourself.",
  },
  {
    title: "One story, every platform",
    copy: "Your website, your feed, your ads, and your video all sound and look like they came from the same business, because they did.",
  },
  {
    title: "Built to compound",
    copy: "Content and campaigns are designed to build on each other month over month, not reset from scratch every time you swap providers.",
  },
];

export default function WhyKoryu() {
  return (
    <section className="relative bg-ink-900 px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-content">
        <Reveal>
          <span className="label">Why KORYU</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 max-w-xl font-display text-[clamp(1.9rem,4.2vw,3.25rem)] font-semibold leading-[1.1] tracking-tight text-ink-50">
            Not a checklist of services. A single point of ownership.
          </h2>
        </Reveal>

        <RevealGroup
          className="mt-16 grid grid-cols-1 gap-x-12 gap-y-14 sm:grid-cols-3"
          stagger={0.1}
        >
          {POINTS.map((point, i) => (
            <RevealItem key={point.title}>
              <span className="font-display text-sm text-ink-600">
                0{i + 1}
              </span>
              <h3 className="mt-4 font-display text-2xl font-medium text-ink-50">
                {point.title}
              </h3>
              <p className="mt-4 leading-relaxed text-ink-400">
                {point.copy}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
