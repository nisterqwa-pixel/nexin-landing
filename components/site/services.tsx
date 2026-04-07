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

const services = [
  {
    icon: Target,
    name: "Lead Gen",
    desc: "Find, enrich, reach, book — done.",
    flagship: true,
    span: "lg:col-span-2 lg:row-span-2",
  },
  { icon: MessageSquare, name: "AI Outreach", desc: "Personalized at scale." },
  { icon: Workflow, name: "Workflow Automation", desc: "Stitch your stack." },
  { icon: Phone, name: "Voice Agents", desc: "Inbound + outbound, 24/7." },
  { icon: Database, name: "CRM Automation", desc: "Hygiene, sync, enrich." },
  { icon: BrainCircuit, name: "Custom GPTs", desc: "Internal copilots that ship." },
  { icon: BarChart3, name: "Reporting & RevOps", desc: "One source of truth." },
  { icon: Sparkles, name: "AI Strategy", desc: "Audit, roadmap, ROI model." },
];

export function Services() {
  return (
    <section id="services" className="relative bg-cream py-28 sm:py-36">
      <div className="container">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
          <div className="max-w-3xl">
            <SectionLabel number="02">What we ship</SectionLabel>
            <h2 className="mt-6 text-balance font-display text-display-xs font-semibold sm:text-display-sm md:text-display-md">
              One studio.
              <br />
              <span className="font-serif italic text-blue">Every</span> automation
              surface.
            </h2>
          </div>
          <p className="max-w-sm text-pretty text-[16px] leading-[1.55] text-muted-fg">
            Lead Gen is our flagship. The rest is the toolkit we use to keep
            clients winning long after the first deployment goes live.
          </p>
        </div>

        {/* Bento grid */}
        <div className="mt-16 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-3">
          {services.map(({ icon: Icon, name, desc, flagship, span }) => (
            <div
              key={name}
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
              className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border-hair bg-bg p-7 transition-all hover:border-line-strong ${
                span ?? ""
              } ${flagship ? "min-h-[260px]" : "min-h-[180px]"}`}
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
                    Flagship
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
          ))}
        </div>
      </div>
    </section>
  );
}
