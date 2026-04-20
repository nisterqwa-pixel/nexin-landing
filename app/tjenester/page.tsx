"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  Database,
  MessageSquare,
  Phone,
  Sparkles,
  Target,
  Workflow,
  X,
  Check,
} from "lucide-react";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";

const sideServices = [
  {
    n: "02",
    icon: MessageSquare,
    name: "AI-oppsøking",
    desc: "Flerkanalskampanjer skrevet av AI, godkjent av mennesker. Aldri maler, alltid on-brand.",
    tag: "Outbound",
  },
  {
    n: "03",
    icon: Workflow,
    name: "Arbeidsflytautomasjon",
    desc: "Koble sammen stacken din og eliminer manuelt arbeid mellom verktøy. Én trigger, ti handlinger.",
    tag: "Ops",
  },
  {
    n: "04",
    icon: Phone,
    name: "Stemmeagenter",
    desc: "AI-drevne stemmeagenter for innkommende og utgående samtaler. 24/7, flerspråklig, menneskelig tone.",
    tag: "Voice",
  },
  {
    n: "05",
    icon: Database,
    name: "CRM-automasjon",
    desc: "Automatisk hygiene, synkronisering og beriving. CRM-en din blir en kilde til sannhet, ikke et gravsted.",
    tag: "Data",
  },
  {
    n: "06",
    icon: BrainCircuit,
    name: "Tilpassede GPT-er",
    desc: "Interne kopilot trent på din virksomhet, dine prosesser, dine data. Alle i teamet har en ekspert.",
    tag: "GPT",
  },
  {
    n: "07",
    icon: BarChart3,
    name: "Rapportering & RevOps",
    desc: "Én sannhet på tvers av systemer. Dashboards teamet ditt faktisk bruker — ikke bare ser på.",
    tag: "Analytics",
  },
  {
    n: "08",
    icon: Sparkles,
    name: "AI-strategi",
    desc: "Revisjon, veikart og ROI-modell. Vi forteller deg hva som faktisk lønner seg — selv om svaret er nei.",
    tag: "Strategy",
  },
];

const compareRows = [
  { ours: "Et AI-ops-team, levert", theirs: "Programvarelisens, uten folk" },
  { ours: "Menneskegodkjent før utsendelse", theirs: "Helautomatisk spam-spray" },
  { ours: "Målt på møter i kalenderen", theirs: "Målt på seats solgt" },
  { ours: "Eier du data, din stack, dine regler", theirs: "Data i deres silo" },
  { ours: "Fast månedspris, ingen bindingstid", theirs: "Årlige kontrakter + implementation fees" },
];

export default function TjenesterPage() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-bg pt-[100px]">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-grid-light bg-grid-fade" />
          <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue/[0.05] blur-[140px]" />

          <div className="container relative pb-20 pt-10 sm:pb-28 sm:pt-14">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-fg transition-colors hover:text-fg"
            >
              <ArrowLeft className="h-3 w-3" />
              Tilbake
            </Link>

            <div className="mt-14 grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-20">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-blue">
                  Nexin · arsenalet
                </p>
                <h1 className="mt-6 text-balance font-display text-[60px] font-semibold leading-[0.9] tracking-[-0.05em] text-fg sm:text-[88px] md:text-[112px]">
                  Hva vi
                  <br />
                  <span className="font-serif italic text-blue">leverer.</span>
                </h1>
              </div>
              <p className="max-w-md text-pretty text-[17px] leading-[1.6] text-muted-fg sm:text-[19px]">
                Lead Gen er flaggskipet. Resten er verktøykassen vi bruker for å holde klientene vinnende lenge etter at den første utrullingen er live.
              </p>
            </div>

            <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-3 border-t-hair pt-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-fg">
                Åtte tjenester · ett team
              </span>
              <div className="h-px flex-1 bg-line" />
              <span className="font-mono text-[11px] tabular-nums text-muted-fg">01 — 08</span>
            </div>
          </div>
        </section>

        {/* FLAGSHIP ROW */}
        <section className="container pb-8">
          <Link
            href="/lead-gen"
            className="group relative block overflow-hidden rounded-[32px] bg-fg"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.1]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
            <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue/[0.2] blur-[120px] transition-transform duration-700 group-hover:scale-110" />

            <div className="relative grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16 lg:p-16">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-blue">
                    01 · Flaggskip
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-blue/15 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-blue">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue opacity-70" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue" />
                    </span>
                    Live nå
                  </span>
                </div>
                <h2 className="mt-6 text-balance font-display text-[52px] font-semibold leading-[0.9] tracking-[-0.045em] text-bg sm:text-[72px] md:text-[88px]">
                  Lead Gen,
                  <br />
                  <span className="font-serif italic text-blue">på autopilot.</span>
                </h2>
                <p className="mt-6 max-w-md text-[16px] leading-[1.6] text-bg/65 sm:text-[17px]">
                  Finn · berik · nå · book. En AI SDR som fyller kalenderen din mens du sover — uten maler, uten robot-tone.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-6">
                  <span className="inline-flex items-center gap-2 rounded-full bg-bg px-5 py-3 text-[13px] font-medium text-fg transition-all group-hover:bg-blue group-hover:text-bg">
                    Utforsk Lead Gen
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-[26px] font-semibold text-bg">1 800+</span>
                    <span className="text-[12px] text-bg/55">møter / år</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-white/[0.03] p-5 backdrop-blur">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bg/60">
                      Pipeline · levende
                    </span>
                    <span className="font-mono text-[10px] tabular-nums text-bg/50">14:32:07</span>
                  </div>
                  <div className="mt-4 space-y-3">
                    {[
                      { t: "BOOKED", n: "Alex T. · Onsdag 14:00", blue: true },
                      { t: "REPLIED", n: "Sarah K. · “send tider”" },
                      { t: "ENRICHED", n: "42 nye dossier" },
                      { t: "SENT", n: "180 personaliserte" },
                    ].map((r, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.12 + 0.2, duration: 0.5 }}
                        className="flex items-center gap-3"
                      >
                        <span
                          className={`font-mono text-[9px] tracking-[0.2em] rounded px-1.5 py-0.5 ${
                            r.blue ? "bg-blue/20 text-blue" : "bg-white/[0.06] text-bg/60"
                          }`}
                        >
                          {r.t}
                        </span>
                        <span className="truncate text-[13px] text-bg/90">{r.n}</span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-5 flex items-baseline justify-between border-t border-white/[0.08] pt-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-bg/50">
                      30d
                    </span>
                    <span className="font-display text-[32px] font-semibold tabular-nums text-blue">
                      47 <span className="text-[12px] text-bg/50">møter</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* INDEX ROW */}
        <section className="container pt-4">
          <div className="flex items-end justify-between gap-6 border-b-hair pb-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-fg">
              Resten av verktøykassen
            </p>
            <p className="font-mono text-[11px] tabular-nums text-muted-fg">02 — 08</p>
          </div>
        </section>

        {/* SERVICES GRID */}
        <section className="container pb-28 pt-6 sm:pb-36">
          <div className="grid gap-0 border-b-hair sm:grid-cols-2 lg:grid-cols-3 [&>*]:border-t-hair sm:[&>*:nth-child(odd)]:border-r-hair lg:[&>*]:border-r-hair lg:[&>*:nth-child(3n)]:!border-r-0">
            {sideServices.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ delay: (i % 3) * 0.08, duration: 0.6 }}
                >
                  <Link
                    href="/bestill"
                    className="group relative flex h-full min-h-[300px] flex-col justify-between overflow-hidden p-8 transition-colors hover:bg-cream sm:p-10"
                  >
                    <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue/[0.04] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="flex items-start justify-between">
                      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-fg">
                        {s.n}
                      </span>
                      <span className="rounded-full border-hair bg-bg px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-fg">
                        {s.tag}
                      </span>
                    </div>
                    <div>
                      <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl border-hair bg-bg text-fg transition-colors group-hover:bg-fg group-hover:text-bg">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-display text-[26px] font-semibold leading-[1.05] tracking-[-0.03em] text-fg sm:text-[30px]">
                        {s.name}
                      </h3>
                      <p className="mt-3 text-[14px] leading-[1.6] text-muted-fg">{s.desc}</p>
                      <div className="mt-6 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-fg">
                        <span className="link-underline">Book demo</span>
                        <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* COMPARISON (DARK) */}
        <section className="relative overflow-hidden bg-fg py-24 sm:py-32">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
              maskImage:
                "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 85%)",
            }}
          />
          <div className="container relative">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-blue">
                Slik er vi annerledes
              </p>
              <h2 className="mt-6 text-balance font-display text-[40px] font-semibold leading-[0.95] tracking-[-0.04em] text-bg sm:text-[60px]">
                Nexin er ikke et
                <br />
                <span className="font-serif italic text-blue">SaaS-verktøy.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-[16px] leading-[1.6] text-bg/60">
                Vi er et AI-ops-team. Vi bygger og kjører systemene — du bruker tiden din på strategi.
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-4xl">
              <div className="grid grid-cols-[1fr_1fr] border-b border-white/[0.1]">
                <div className="p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue">
                    Nexin
                  </p>
                </div>
                <div className="border-l border-white/[0.1] p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-bg/40">
                    Standard SaaS
                  </p>
                </div>
              </div>
              {compareRows.map((row, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                  className="grid grid-cols-[1fr_1fr] border-b border-white/[0.07]"
                >
                  <div className="flex items-start gap-3 p-5">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue text-bg">
                      <Check className="h-3 w-3" />
                    </span>
                    <span className="text-[15px] leading-[1.5] text-bg">{row.ours}</span>
                  </div>
                  <div className="flex items-start gap-3 border-l border-white/[0.1] p-5">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-white/20 text-bg/40">
                      <X className="h-3 w-3" />
                    </span>
                    <span className="text-[15px] leading-[1.5] text-bg/55">{row.theirs}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative bg-bg py-28 sm:py-36">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-blue">
                Ikke sikker på hva du trenger?
              </p>
              <h2 className="mt-8 text-balance font-display text-[48px] font-semibold leading-[0.95] tracking-[-0.045em] text-fg sm:text-[72px] md:text-[88px]">
                Vi finner ut av det
                <br />
                <span className="font-serif italic text-blue">sammen.</span>
              </h2>
              <p className="mx-auto mt-8 max-w-md text-[17px] leading-[1.6] text-muted-fg">
                30 minutters samtale. Vi kartlegger din største flaskehals og gir deg et ærlig svar — selv om det ikke er oss.
              </p>
              <Link
                href="/bestill"
                className="group mt-12 inline-flex h-14 items-center gap-2 rounded-full bg-fg px-8 text-[15px] font-medium tracking-tight text-bg transition-all hover:bg-blue"
              >
                Bestill strategisamtale
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
