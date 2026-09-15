"use client";

import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

type FoundingPerk = {
  number: string;
  title: string;
  description: string;
};

const FOUNDING_PERKS: FoundingPerk[] = [
  {
    number: "01",
    title: "Direct access to the full team",
    description:
      "No account managers, no hand-offs. You work directly with the people actually doing the work.",
  },
  {
    number: "02",
    title: "Founding-rate pricing",
    description:
      "Locked-in rates that reflect where we are now — not what we'll charge once we're at capacity.",
  },
  {
    number: "03",
    title: "First case study featured on this site",
    description:
      "Your results become the proof we don't have yet — front and center, with your permission.",
  },
  {
    number: "04",
    title: "Priority turnaround",
    description:
      "Founding clients sit at the top of the queue, not in it. Fewer clients, more attention per project.",
  },
];

// Heading options — pick whichever reads better once copy is finalized:
// A) "Be one of our first."
// B) "Founding client spots open now."
export default function Work() {
  return (
    <section id="work" className="relative bg-ink-900 px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-content">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Reveal>
              <span className="label">Founding Clients</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 max-w-xl font-display text-[clamp(1.9rem,4.2vw,3.25rem)] font-semibold leading-[1.1] tracking-tight text-ink-50">
                Be one of our first.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm text-ink-500">
              We&rsquo;re a new studio — no invented metrics, no borrowed case
              studies. Our first clients get hands-on, high-attention work at
              founding pricing, and in exchange we ask to feature the results
              as our first case studies.
            </p>
          </Reveal>
        </div>

        <RevealGroup
          className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2"
          stagger={0.1}
        >
          {FOUNDING_PERKS.map((perk) => (
            <RevealItem key={perk.number} className="group">
              <div className="relative flex aspect-[4/5] w-full flex-col justify-between overflow-hidden rounded-2xl border border-ink-50/10 bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950 p-8 transition-transform duration-500 group-hover:scale-[1.02] sm:p-10">
                <span
                  aria-hidden="true"
                  className="font-display text-7xl font-bold leading-none text-ink-50/5 sm:text-8xl"
                >
                  {perk.number}
                </span>

                <div>
                  <h3 className="font-display text-xl font-medium text-ink-50 sm:text-2xl">
                    {perk.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-400 sm:text-base">
                    {perk.description}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
