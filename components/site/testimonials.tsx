"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { SectionLabel } from "./section-label";

const quotes = [
  {
    quote:
      "Nexin erstattet to SDR-er og en deltids ops-konsulent i vår første måned. Lead-gen-motoren har satt 47 kvalifiserte møter i kalenderen vår de siste 30 dagene alene.",
    initials: "VS",
    role: "Vekstsjef",
    company: "B2B SaaS · Nordisk marked",
  },
  {
    quote:
      "Vi prøvde tre andre AI-byråer før Nexin. De solgte presentasjoner. Nexin leverte et fungerende system på tre uker. Det er ikke engang i nærheten.",
    initials: "GR",
    role: "Grunnlegger & CEO",
    company: "Hardware-scaleup · Oslo",
  },
  {
    quote:
      "ROI var tydelig innen uke seks. I løpet av måned tre hadde vi ansatt to reps bare for å håndtere inboundsene systemet genererte.",
    initials: "SS",
    role: "Salgssjef",
    company: "Proffservices · 50–200 ansatte",
  },
];

function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 22 });
  const sy = useSpring(y, { stiffness: 200, damping: 22 });
  const rotX = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const rotY = useTransform(sx, [-0.5, 0.5], [-6, 6]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{
        rotateX: rotX,
        rotateY: rotY,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Testimonials() {
  return (
    <section className="relative py-28 sm:py-36">
      <div className="container">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
          <div className="max-w-3xl">
            <SectionLabel number="05">Hva kunder sier</SectionLabel>
            <h2 className="mt-6 text-balance font-display text-display-xs font-semibold sm:text-display-sm md:text-display-md">
              Operatører anbefaler ikke
              <br />
              hype. De anbefaler{" "}
              <span className="font-serif italic text-blue">resultater.</span>
            </h2>
          </div>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {quotes.map((q, idx) => (
            <TiltCard
              key={q.company}
              className={`${idx === 1 ? "lg:translate-y-8" : ""}`}
            >
              <figure
                className={`flex h-full flex-col justify-between rounded-3xl border-hair p-8 sm:p-10 ${
                  idx === 0 ? "bg-cream" : "bg-bg"
                }`}
              >
                <div>
                  <span className="font-serif text-[80px] leading-none italic text-blue">
                    &ldquo;
                  </span>
                  <blockquote className="-mt-8 font-display text-[22px] font-medium leading-[1.3] tracking-[-0.025em] text-fg">
                    {q.quote}
                  </blockquote>
                </div>
                <figcaption className="mt-10 flex items-center gap-3 border-t-hair pt-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-fg font-mono text-[11px] font-semibold tracking-[0.08em] text-bg">
                    {q.initials}
                  </div>
                  <div>
                    <p className="text-[14px] font-medium text-fg">{q.role}</p>
                    <p className="text-[12px] text-muted-fg">{q.company}</p>
                  </div>
                </figcaption>
              </figure>
            </TiltCard>
          ))}
        </div>
        <p className="mt-10 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-muted-fg/60">
          Attribusjon anonymisert på kundeforespørsel
        </p>
      </div>
    </section>
  );
}
