"use client";

import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import AnimatedMark from "@/components/ui/AnimatedMark";

const PILLARS = ["Website", "Content", "Video", "Ads"];

export default function Bridge() {
  return (
    <section className="relative overflow-hidden bg-ink-900 px-6 py-28 sm:px-10 sm:py-36">
      <div className="pointer-events-none absolute -right-40 top-1/2 hidden -translate-y-1/2 opacity-[0.06] lg:block">
        <AnimatedMark size={520} className="text-ink-50" draw={false} />
      </div>

      <div className="relative mx-auto max-w-3xl">
        <Reveal>
          <span className="label">The Bridge</span>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-6 font-display text-[clamp(1.9rem,4.2vw,3.25rem)] font-semibold leading-[1.1] tracking-tight text-ink-50">
            One team. One story.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 text-lg leading-relaxed text-ink-300 sm:text-xl">
            KORYU exists because that gap shouldn&rsquo;t be normal. Instead of
            handing your website to one freelancer, your photos to another,
            and your ad budget to whoever&rsquo;s cheapest this month, one team
            builds all of it together — so your site, your content, your
            video, and your ads are working from the same brief, not
            guessing at each other from across the internet.
          </p>
        </Reveal>

        <RevealGroup
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-50/10 bg-ink-50/10 sm:grid-cols-4"
          stagger={0.08}
        >
          {PILLARS.map((pillar, i) => (
            <RevealItem key={pillar} className="relative">
              <div className="flex h-full flex-col justify-between gap-8 bg-ink-900 px-6 py-8">
                <span className="font-display text-sm text-ink-500">
                  0{i + 1}
                </span>
                <span className="font-display text-lg font-medium tracking-wide text-ink-50">
                  {pillar}
                </span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1} className="mt-8">
          <p className="text-sm text-ink-500">
            Four pieces, one narrative — designed, written, and managed by
            the same team from day one.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
