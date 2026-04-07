"use client";

import Link from "next/link";
import { ArrowUpRight, Calendar } from "lucide-react";
import { TextScramble } from "@/components/ui/text-scramble";
import { useEffect, useState } from "react";

export function FinalCta() {
  const [k, setK] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setK((v) => v + 1), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-y-hair bg-bg"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-light bg-grid-fade" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue/[0.07] blur-[140px]" />

      <div className="container relative py-32 sm:py-40">
        <div className="mx-auto max-w-5xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-fg">
            Ready when you are
          </p>
          <h2 className="mt-8 text-balance font-display text-display-sm font-semibold sm:text-display-md md:text-display-lg lg:text-display-xl">
            Stop doing what
            <br />
            <span className="font-serif italic text-blue">
              <TextScramble
                key={k}
                as="span"
                duration={1.2}
                speed={0.04}
              >
                a machine could do.
              </TextScramble>
            </span>
          </h2>
          <p className="mx-auto mt-10 max-w-xl text-pretty text-[18px] leading-[1.55] text-muted-fg">
            Thirty-minute strategy call. We&apos;ll map your biggest bottleneck
            and tell you whether automation is the right fix — even if the
            answer is no.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
            <Link
              href="#"
              className="group inline-flex h-14 items-center gap-2.5 rounded-full bg-fg px-8 text-[15px] font-medium tracking-tight text-bg transition-all hover:bg-blue"
            >
              <Calendar className="h-4 w-4" />
              Book your strategy call
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="mailto:hello@nexin.ai"
              className="inline-flex h-14 items-center gap-2 px-2 text-[15px] font-medium tracking-tight text-fg"
            >
              <span className="link-underline">hello@nexin.ai</span>
            </Link>
          </div>

          <p className="mt-12 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-fg/70">
            No decks. No spam. No follow-up unless you ask.
          </p>
        </div>
      </div>
    </section>
  );
}
