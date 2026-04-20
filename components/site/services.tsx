"use client";

import {
  Target,
  MessageSquare,
  Workflow,
  Phone,
  Database,
  BrainCircuit,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { SectionLabel } from "./section-label";
import { Reveal } from "@/components/ui/reveal";

const services = [
  {
    icon: Target,
    name: "Lead Gen",
    desc: "Finn, berik, nå, book — ferdig.",
    flagship: true,
    span: "lg:col-span-2 lg:row-span-2",
  },
  { icon: MessageSquare, name: "AI-oppsøking", desc: "Personalisert i stor skala." },
  { icon: Workflow, name: "Arbeidsflytautomasjon", desc: "Sy sammen stacken din." },
  { icon: Phone, name: "Stemmeagenter", desc: "Innkommende + utgående, 24/7." },
  { icon: Database, name: "CRM-automasjon", desc: "Hygiene, synk, berik." },
  { icon: BrainCircuit, name: "Tilpassede GPT-er", desc: "Interne kopilot som leverer." },
  { icon: BarChart3, name: "Rapportering & RevOps", desc: "Én kilde til sannhet." },
  { icon: Sparkles, name: "AI-strategi", desc: "Revisjon, veikart, ROI-modell." },
];

export function Services() {
  return (
    <section id="services" className="relative bg-cream py-28 sm:py-36">
      <div className="container">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
          <div className="max-w-3xl">
            <SectionLabel number="02">Hva vi leverer</SectionLabel>
            <h2 className="mt-6 text-balance font-display text-display-xs font-semibold sm:text-display-sm md:text-display-md">
              Ett studio.
              <br />
              <span className="font-serif italic text-blue">Alle</span> automatiseringsflater.
            </h2>
          </div>
          <p className="max-w-sm text-pretty text-[16px] leading-[1.55] text-muted-fg">
            Lead Gen er flaggskipet vårt. Resten er verktøykassen vi bruker for å holde
            klientene vinnende lenge etter at den første utrullingen er live.
          </p>
        </div>

        {/* Bento grid */}
        <div className="mt-16 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-3">
          {services.map(({ icon: Icon, name, desc, flagship, span }, idx) => (
            <Reveal
              key={name}
              delay={idx * 0.06}
              className={span ?? ""}
            >
              <div
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty(
                    "--mx",
                    `${e.clientX - r.left}px`,
                  );
                  e.currentTarget.style.setProperty(
                    "--my",
                    `${e.clientY - r.top}px`,
                  );
                }}
                className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border-hair bg-bg p-7 transition-all duration-500 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_30px_70px_-30px_rgba(15,23,42,0.25)] ${
                  flagship ? "min-h-[260px]" : "min-h-[180px]"
                }`}
                style={{
                  backgroundImage:
                    "radial-gradient(360px circle at var(--mx,50%) var(--my,50%), rgba(31,68,255,0.08), transparent 60%)",
                }}
              >
              {flagship && (
                <>
                  {/* decorative */}
                  <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue/[0.08] blur-3xl" />
                  <div className="pointer-events-none absolute inset-0 bg-grid-light opacity-60" />
                </>
              )}
              <div className="relative flex items-start justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl border-hair transition-all ${
                    flagship
                      ? "bg-blue text-bg"
                      : "bg-cream text-fg group-hover:bg-fg group-hover:text-bg"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                {flagship && (
                  <span className="rounded-full bg-blue/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-blue">
                    Flaggskip
                  </span>
                )}
              </div>
              <div className="relative">
                <h3
                  className={`font-display font-semibold tracking-[-0.035em] text-fg ${
                    flagship ? "text-[40px] leading-none" : "text-xl"
                  }`}
                >
                  {name}
                </h3>
                <p
                  className={`mt-2 text-muted-fg ${
                    flagship ? "text-base" : "text-[14px]"
                  }`}
                >
                  {desc}
                </p>
              </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
