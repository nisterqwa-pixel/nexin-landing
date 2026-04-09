"use client";

import { Asterisk } from "lucide-react";

const phrases = [
  "From signal to booked meeting",
  "Operators over optics",
  "Pipeline on autopilot",
  "60 days to payback",
];

export function MarqueeBand() {
  return (
    <section
      aria-hidden
      className="relative overflow-hidden border-y-hair bg-fg py-8 text-bg"
    >
      <div className="flex w-max gap-12 animate-marquee whitespace-nowrap">
        {[...phrases, ...phrases, ...phrases].map((p, i) => (
          <div key={i} className="flex items-center gap-12">
            <span className="font-display text-[44px] font-semibold tracking-[-0.04em] sm:text-[64px]">
              {p}
            </span>
            <Asterisk
              className="h-7 w-7 text-blue sm:h-9 sm:w-9"
              strokeWidth={2.5}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
