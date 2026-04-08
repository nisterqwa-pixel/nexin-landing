"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "./section-label";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { AnimatedAreaChart } from "@/components/ui/animated-area-chart";

const growthSeries = [
  {
    label: "Without Nexin",
    color: "#94A3B8",
    values: [40, 42, 44, 46, 47, 49, 50, 52, 53],
    fillId: "manual",
    dashed: true,
  },
  {
    label: "With Nexin",
    color: "#1F44FF",
    values: [40, 52, 68, 88, 112, 142, 178, 220, 268],
    fillId: "nexin",
  },
];

const months = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9"];

const sideStats = [
  {
    label: "HOURS SAVED / YR",
    to: 12400,
    blurb: "Per client. Six FTEs returned.",
  },
  {
    label: "CLOSE-RATE LIFT",
    to: 41,
    prefix: "+",
    suffix: "%",
    blurb: "Cleaner data, sharper timing.",
  },
  {
    label: "TIME TO PAYBACK",
    to: 60,
    prefix: "<",
    suffix: "d",
    blurb: "Most clients break even by invoice two.",
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

          <div className="space-y-px overflow-hidden rounded-3xl border-hair bg-line">
            {/* Big chart panel */}
            <div className="relative bg-bg p-8 sm:p-10">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-fg">
                    QUALIFIED PIPELINE / 60 DAYS
                  </p>
                  <p className="mt-3 font-display text-[56px] font-semibold leading-none tracking-[-0.06em] text-fg sm:text-[72px]">
                    <AnimatedCounter to={3.2} suffix="×" decimals={1} />
                  </p>
                  <p className="mt-2 text-[14px] text-muted-fg">
                    Median uplift across 40+ deployments
                  </p>
                </div>
                <div className="flex flex-col gap-2 text-[12px]">
                  <div className="flex items-center gap-2">
                    <span className="h-[2px] w-6 rounded bg-blue" />
                    <span className="text-fg">With Nexin</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-[2px] w-6 rounded border-t-2 border-dashed border-slate-400" />
                    <span className="text-muted-fg">Without</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 -mx-2 text-fg">
                <AnimatedAreaChart
                  series={growthSeries}
                  xLabels={months}
                  height={300}
                  yTicks={4}
                  ariaLabel="Pipeline growth comparison"
                  className="h-[300px] w-full"
                />
              </div>
            </div>

            {/* Side stats row */}
            <div className="grid gap-px bg-line sm:grid-cols-3">
              {sideStats.map((s) => (
                <div key={s.label} className="bg-bg p-8">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-fg">
                    {s.label}
                  </p>
                  <p className="mt-4 font-display text-[40px] font-semibold leading-none tracking-[-0.05em] text-fg">
                    <AnimatedCounter
                      to={s.to}
                      prefix={s.prefix}
                      suffix={s.suffix}
                    />
                  </p>
                  <p className="mt-3 text-[13px] leading-[1.5] text-muted-fg">
                    {s.blurb}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
