import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "./section-label";
import { AnimatedCounter } from "@/components/ui/animated-counter";

type Stat = {
  label: string;
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  blurb: string;
};

const stats: Stat[] = [
  {
    label: "HOURS SAVED / YR",
    to: 12400,
    blurb: "Per client on average. Six FTEs of time, returned.",
  },
  {
    label: "PIPELINE LIFT",
    to: 3.2,
    suffix: "×",
    decimals: 1,
    blurb: "Median uplift in qualified pipeline within 90 days.",
  },
  {
    label: "CLOSE-RATE LIFT",
    to: 41,
    prefix: "+",
    suffix: "%",
    blurb: "Cleaner data, sharper timing, AI-assisted follow-up.",
  },
  {
    label: "TIME TO PAYBACK",
    to: 60,
    prefix: "<",
    suffix: "d",
    blurb: "Most clients break even before invoice two.",
  },
];

export function Stats() {
  return (
    <section id="results" className="relative py-28 sm:py-36">
      <div className="container">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <div>
            <SectionLabel number="03">The numbers</SectionLabel>
            <h2 className="mt-6 text-balance font-display text-display-xs font-semibold sm:text-display-sm md:text-display-md">
              Like adding
              <br />
              <span className="font-serif italic text-blue">six</span>
              <br />
              full-time hires.
            </h2>
            <p className="mt-8 max-w-md text-pretty text-[17px] leading-[1.6] text-muted-fg">
              Independent client data across 40+ deployments in the last twelve
              months. We don&apos;t hide our numbers — and we don&apos;t take
              clients we can&apos;t move.
            </p>
            <Link
              href="#contact"
              className="group mt-10 inline-flex items-center gap-2 text-[14px] font-medium tracking-tight text-fg"
            >
              <span className="link-underline">See the methodology</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-px rounded-3xl border-hair bg-line sm:grid-cols-2">
            {stats.map((s, idx) => (
              <div
                key={s.label}
                className={`relative bg-bg p-8 sm:p-10 ${
                  idx === 0 ? "rounded-tl-3xl sm:rounded-tr-none" : ""
                } ${idx === 1 ? "sm:rounded-tr-3xl" : ""} ${
                  idx === 2 ? "sm:rounded-bl-3xl" : ""
                } ${idx === 3 ? "rounded-br-3xl" : ""}`}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-fg">
                  {s.label}
                </p>
                <p className="mt-6 font-display text-[64px] font-semibold leading-none tracking-[-0.06em] text-fg sm:text-[88px]">
                  <AnimatedCounter
                    to={s.to}
                    prefix={s.prefix}
                    suffix={s.suffix}
                    decimals={s.decimals ?? 0}
                  />
                </p>
                <p className="mt-6 max-w-[28ch] text-[14px] leading-[1.55] text-muted-fg">
                  {s.blurb}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
