"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, motion } from "framer-motion";
import { SectionLabel } from "./section-label";

type Row = {
  label: string;
  manualPct: number; // 0-100, slow crawl
  manualVal: string;
  nexinPct: number; // ~100, slams in
  nexinVal: string;
};

const rows: Row[] = [
  {
    label: "Møter booket / måned",
    manualPct: 18,
    manualVal: "6",
    nexinPct: 100,
    nexinVal: "47",
  },
  {
    label: "Timer brukt på ops / uke",
    manualPct: 92,
    manualVal: "31t",
    nexinPct: 14,
    nexinVal: "4t",
  },
  {
    label: "Tid til første kvalifiserte lead",
    manualPct: 88,
    manualVal: "11 dager",
    nexinPct: 9,
    nexinVal: "< 24t",
  },
  {
    label: "Kostnad per booket møte",
    manualPct: 95,
    manualVal: "$420",
    nexinPct: 22,
    nexinVal: "$96",
  },
];

function Bar({ row, play }: { row: Row; play: boolean }) {
  const [m, setM] = useState(0);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!play) return;
    const c1 = animate(0, row.manualPct, {
      duration: 3.4,
      ease: "linear",
      onUpdate: setM,
    });
    const c2 = animate(0, row.nexinPct, {
      duration: 0.7,
      delay: 0.3,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: setN,
    });
    return () => {
      c1.stop();
      c2.stop();
    };
  }, [play, row]);

  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-fg">
          {row.label}
        </p>
      </div>

      {/* Without Nexin */}
      <div className="mb-3 grid grid-cols-[100px_1fr_70px] items-center gap-4 sm:grid-cols-[140px_1fr_90px]">
        <span className="text-[12px] font-medium text-muted-fg">Uten</span>
        <div className="relative h-6 overflow-hidden rounded-full bg-cream">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-fg/80"
            style={{ width: `${m}%` }}
          />
        </div>
        <span className="text-right font-display text-[18px] font-semibold tabular-nums text-fg">
          {row.manualVal}
        </span>
      </div>

      {/* With Nexin */}
      <div className="grid grid-cols-[100px_1fr_70px] items-center gap-4 sm:grid-cols-[140px_1fr_90px]">
        <span className="text-[12px] font-semibold text-blue">Med Nexin</span>
        <div className="relative h-6 overflow-hidden rounded-full bg-cream">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-blue shadow-[0_0_24px_rgba(31,68,255,0.45)]"
            style={{ width: `${n}%` }}
          />
        </div>
        <span className="text-right font-display text-[18px] font-semibold tabular-nums text-blue">
          {row.nexinVal}
        </span>
      </div>
    </div>
  );
}

export function Comparison() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section className="relative overflow-hidden border-y-hair bg-bg py-24 sm:py-28">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <SectionLabel>Side ved side</SectionLabel>
          </div>
          <h2 className="mt-6 text-balance font-display text-display-xs font-semibold sm:text-display-sm md:text-display-md">
            Manuell ops kravler.
            <br />
            <span className="font-serif italic text-blue">Nexin leverer.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-[17px] leading-[1.55] text-muted-fg">
            Se forskjellen i sanntid. Samme mål, samme uke — ett team på autopilot,
            det andre kopierer fortsatt.
          </p>
        </div>

        <div ref={ref} className="mx-auto mt-16 grid max-w-4xl gap-10">
          {rows.map((r) => (
            <Bar key={r.label} row={r} play={inView} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mx-auto mt-14 max-w-xl text-center text-[13px] text-muted-fg"
        >
          Median klientresultater etter 60 dager. Vi velger ikke ut — og
          vi publiserer metodikken.
        </motion.p>
      </div>
    </section>
  );
}
