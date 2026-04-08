"use client";

import { ArrowUpRight } from "lucide-react";
import {
  AnimatedAreaChart,
  AnimatedNumber,
} from "@/components/ui/animated-area-chart";

const revenueSeries = [
  {
    label: "Pipeline",
    color: "#1F44FF",
    values: [12, 14, 18, 22, 28, 36, 44, 58, 72, 91, 112, 138],
    fillId: "rev",
  },
];

const xLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function LiveRevenueCard() {
  return (
    <div className="relative mx-auto mt-16 w-full max-w-3xl overflow-hidden rounded-3xl border-hair bg-bg shadow-[0_30px_80px_-30px_rgba(15,23,42,0.25)] animate-rise">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b-hair px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-2.5 w-2.5 animate-ping rounded-full bg-emerald-500 opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-fg">
            Live · Pipeline / qualified meetings
          </p>
        </div>
        <span className="rounded-full bg-blue/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-blue">
          Last 12 mo
        </span>
      </div>

      {/* Headline number */}
      <div className="flex items-end justify-between px-6 pt-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-fg">
            Booked this year
          </p>
          <div className="mt-2 flex items-baseline gap-3">
            <p className="font-display text-[44px] font-semibold leading-none tracking-[-0.04em] text-fg">
              <AnimatedNumber to={1284} duration={1.8} delay={0.4} />
            </p>
            <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[12px] font-semibold text-emerald-600">
              <ArrowUpRight className="h-3 w-3" />
              <AnimatedNumber to={326} duration={1.4} delay={0.6} />%
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-fg">
            Live now
          </p>
          <p className="mt-2 font-display text-[20px] font-semibold tabular-nums text-blue">
            +<AnimatedNumber to={47} delay={0.8} />
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="px-2 pb-2 pt-2 text-fg">
        <AnimatedAreaChart
          series={revenueSeries}
          xLabels={xLabels}
          height={260}
          yTicks={4}
          ariaLabel="Pipeline growth chart"
          className="h-[260px] w-full"
        />
      </div>
    </div>
  );
}
