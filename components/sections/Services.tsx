"use client";

import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { scrollToId } from "@/lib/smoothScroll";
import {
  WebsiteVisual,
  SocialMediaVisual,
  AdGrowthVisual,
} from "@/components/ui/ServiceVisuals";

type Service = {
  name: string;
  short: string;
  why: string;
  visual: React.ComponentType;
};

const SERVICES: Service[] = [
  {
    name: "Website Design & Development",
    short: "Your storefront, open 24 hours a day.",
    why: "First impressions happen in milliseconds. We design and build fast, conversion-focused websites that make your business look as credible online as it already is in person.",
    visual: WebsiteVisual,
  },
  {
    name: "Video & Photo Editing for Your Socials",
    short: "Content that looks like one brand, in every format.",
    why: "Your feed is often the first thing a potential customer sees before they ever visit. We shoot, edit, and manage your photo and video content, so every post looks consistent, current, and credible.",
    visual: SocialMediaVisual,
  },
  {
    name: "Ad Marketing",
    short: "Budget that turns into customers, not impressions.",
    why: "Great content still needs the right audience. We run and continuously optimize ad campaigns so your budget turns into customers, not just impressions.",
    visual: AdGrowthVisual,
  },
];

export default function Services() {
  return (
    <section id="services" className="relative bg-ink-950 px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-content">
        <Reveal>
          <span className="label">What We Do</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 max-w-2xl font-display text-[clamp(1.9rem,4.2vw,3.25rem)] font-semibold leading-[1.1] tracking-tight text-ink-50">
            Three services. Build the mix you need.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-5 max-w-xl text-ink-400">
            Mix and match, or keep it simple. Every service works on its own or together.
          </p>
        </Reveal>

        <RevealGroup
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3"
          stagger={0.1}
        >
          {SERVICES.map((s, i) => {
            const Visual = s.visual;
            return (
              <RevealItem key={s.name} className="group h-full">
                <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-ink-50/10 bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950 transition-transform duration-500 group-hover:scale-[1.02]">
                  <span
                    aria-hidden="true"
                    className="absolute left-6 top-5 font-display text-sm text-ink-50/40"
                  >
                    0{i + 1}
                  </span>
                  <div className="h-48 sm:h-56">
                    <Visual />
                  </div>
                  <div className="flex-1 p-6 sm:p-8">
                    <h3 className="font-display text-xl font-medium text-ink-50 sm:text-2xl">
                      {s.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-200 sm:text-base">
                      {s.short}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-ink-500">
                      {s.why}
                    </p>
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal delay={0.15}>
          <div className="mt-6 flex flex-col items-center gap-6 rounded-2xl border border-ink-50/10 bg-ink-900/60 p-8 text-center sm:flex-row sm:justify-between sm:p-10 sm:text-left">
            <div>
              <h3 className="font-display text-xl font-medium text-ink-50 sm:text-2xl">
                Want to customise your needs?
              </h3>
              <p className="mt-2 max-w-md text-ink-400">
                Every service works on its own or combined. Tell us what you actually need, and we&rsquo;ll scope around it, not the other way around.
              </p>
            </div>
            <MagneticButton variant="outline" onClick={() => scrollToId("contact")}>
              Talk to us
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
