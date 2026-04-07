"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Calendar, Sparkles } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";

const verbs = ["sleep.", "scale.", "ship.", "win."];

export function Hero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % verbs.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative overflow-hidden pt-[120px] pb-24 sm:pt-[140px] sm:pb-28">
      {/* Subtle grid wash */}
      <div className="pointer-events-none absolute inset-0 bg-grid-light bg-grid-fade" />
      {/* Soft blue radial */}
      <div className="pointer-events-none absolute left-1/2 top-[40%] h-[640px] w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue/[0.05] blur-[140px]" />

      <div className="container relative">
        {/* Kicker pill */}
        <div className="mb-10 flex justify-center">
          <Link
            href="#lead-gen"
            className="group inline-flex items-center gap-2 rounded-full border-hair bg-bg/60 py-1.5 pl-1.5 pr-4 text-[12px] font-medium tracking-tight text-fg/80 backdrop-blur transition-colors hover:border-line-strong"
          >
            <span className="rounded-full bg-blue/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-blue">
              New
            </span>
            Lead Gen v2 — booking 30+ meetings/mo on autopilot
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Headline — editorial mix of sans + serif italic */}
        <h1 className="mx-auto max-w-[18ch] text-balance text-center font-display text-display-sm font-semibold text-fg sm:text-display-md md:text-display-lg lg:text-display-xl">
          The AI ops team
          <br />
          that works while
          <br />
          <span className="inline-flex items-baseline">
            <span className="font-serif text-[1.05em] italic text-blue">you&nbsp;</span>
            <span className="relative inline-block overflow-hidden align-baseline">
              {/* invisible spacer keeps width = widest verb */}
              <span className="invisible font-serif text-[1.05em] italic">
                scale.
              </span>
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={verbs[i]}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 font-serif text-[1.05em] italic text-blue"
                >
                  {verbs[i]}
                </motion.span>
              </AnimatePresence>
            </span>
          </span>
        </h1>

        {/* Sub */}
        <p className="mx-auto mt-10 max-w-[58ch] text-balance text-center text-[17px] leading-[1.55] text-muted-fg sm:text-[19px]">
          Nexin is an AI automation studio for operators. We architect and ship
          systems your team will actually use — starting with the lead-gen
          engine that books qualified meetings on your calendar overnight.
        </p>

        {/* CTAs */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
          <Magnetic>
            <Link
              href="#contact"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-fg px-6 text-[14px] font-medium tracking-tight text-bg transition-all hover:bg-blue"
            >
              <Calendar className="h-4 w-4" />
              Book a strategy call
            </Link>
          </Magnetic>
          <Link
            href="#lead-gen"
            className="group inline-flex h-12 items-center gap-2 px-2 text-[14px] font-medium tracking-tight text-fg"
          >
            <span className="link-underline">See lead-gen in action</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Trust micro-row */}
        <div className="mt-14 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-fg/80">
            <Sparkles className="h-3 w-3" />
            Trusted by 40+ teams shipping real revenue
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-fg/60">
            {["Northwind", "Helix", "Forge & Co.", "Atlas", "Lumen", "Vantage"].map(
              (n) => (
                <span
                  key={n}
                  className="font-display text-[18px] font-semibold tracking-[-0.03em]"
                >
                  {n}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
