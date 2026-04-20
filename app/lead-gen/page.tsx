"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Check,
  Mail,
  MessageSquare,
  Plus,
  Search,
  Send,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";

const formatClock = (d: Date) =>
  `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(
    d.getSeconds(),
  ).padStart(2, "0")}`;

const feedSeed = [
  { tag: "BOOKED", who: "Alex T. · Sequoia Works", meta: "Onsdag 14:00", tone: "blue" },
  { tag: "REPLIED", who: "Sarah K. · Northwind", meta: "“send meg tider”", tone: "fg" },
  { tag: "ENRICHED", who: "42 leads · HubSpot", meta: "intensjon + stack", tone: "mute" },
  { tag: "SENT", who: "180 e-poster · steg 2", meta: "alle personalisert", tone: "mute" },
  { tag: "BOOKED", who: "Marcus V. · Helix", meta: "Torsdag 10:30", tone: "blue" },
  { tag: "REPLIED", who: "Ida H. · Lumen", meta: "“har 15 min fredag”", tone: "fg" },
  { tag: "BOOKED", who: "Jonas L. · Vantage", meta: "Fredag 09:15", tone: "blue" },
  { tag: "ENRICHED", who: "88 leads · Clearbit", meta: "finansiering + HC", tone: "mute" },
  { tag: "SENT", who: "240 LinkedIn DMs", meta: "dag-2 oppfølging", tone: "mute" },
  { tag: "BOOKED", who: "Nora F. · Atlas", meta: "Tirsdag 11:00", tone: "blue" },
];

function LiveOpsCard() {
  const [clock, setClock] = useState("14:32:07");
  const [feedStart, setFeedStart] = useState(0);
  const [bookedCount, setBookedCount] = useState(42);

  useEffect(() => {
    const start = new Date();
    start.setHours(14, 32, 7, 0);
    const t = setInterval(() => {
      start.setSeconds(start.getSeconds() + 1);
      setClock(formatClock(start));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setFeedStart((n) => (n + 1) % feedSeed.length);
    }, 2200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setBookedCount((n) => (n < 50 ? n + 1 : 47));
    }, 4400);
    return () => clearInterval(t);
  }, []);

  const visible = useMemo(() => {
    return Array.from({ length: 4 }, (_, i) => feedSeed[(feedStart + i) % feedSeed.length]);
  }, [feedStart]);

  return (
    <div className="relative w-full">
      {/* glow */}
      <div className="pointer-events-none absolute -inset-6 rounded-[48px] bg-blue/[0.07] blur-3xl" />
      <div className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0A0A0B] shadow-[0_40px_120px_-40px_rgba(31,68,255,0.5)]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
              Live · nexin ops
            </span>
          </div>
          <span className="font-mono text-[11px] tabular-nums text-white/50">{clock}</span>
        </div>

        {/* Feed */}
        <div className="relative h-[252px] overflow-hidden px-5 py-4">
          <AnimatePresence initial={false}>
            {visible.map((row, idx) => (
              <motion.div
                key={`${feedStart}-${idx}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1 - idx * 0.18, y: idx * 58 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-x-5"
              >
                <div className="flex items-center gap-3 py-3">
                  <span
                    className={`font-mono text-[9px] tracking-[0.2em] rounded-md px-1.5 py-1 ${
                      row.tone === "blue"
                        ? "bg-blue/15 text-blue"
                        : row.tone === "fg"
                          ? "bg-emerald-400/10 text-emerald-300"
                          : "bg-white/5 text-white/55"
                    }`}
                  >
                    {row.tag}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium text-white/90">{row.who}</p>
                    <p className="mt-0.5 truncate font-mono text-[10px] text-white/40">{row.meta}</p>
                  </div>
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white/[0.04]">
                    {row.tag === "BOOKED" && <Calendar className="h-3 w-3 text-blue" />}
                    {row.tag === "REPLIED" && <MessageSquare className="h-3 w-3 text-emerald-300" />}
                    {row.tag === "ENRICHED" && <Sparkles className="h-3 w-3 text-white/60" />}
                    {row.tag === "SENT" && <Send className="h-3 w-3 text-white/60" />}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {/* fade */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0A0A0B] to-transparent" />
        </div>

        {/* Stat strip */}
        <div className="grid grid-cols-3 border-t border-white/[0.07]">
          {[
            { v: bookedCount, l: "møter booket · 30d", glow: true },
            { v: "8×", l: "svarrate vs kald" },
            { v: "< 24t", l: "til første lead" },
          ].map((s, i) => (
            <div
              key={i}
              className={`flex flex-col gap-1 px-5 py-4 ${
                i !== 2 ? "border-r border-white/[0.07]" : ""
              }`}
            >
              <span
                className={`font-display text-[26px] font-semibold leading-none tabular-nums ${
                  s.glow ? "text-blue" : "text-white"
                }`}
              >
                {s.v}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/45">
                {s.l}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating dossier chip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.7 }}
        className="absolute -right-4 -top-5 hidden rounded-2xl border-hair bg-bg/95 px-4 py-3 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.25)] backdrop-blur md:block"
      >
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-fg">
          nytt dossier
        </p>
        <div className="mt-1.5 flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue to-blue-ink" />
          <div>
            <p className="text-[13px] font-medium text-fg">Alex Thorvaldsen</p>
            <p className="font-mono text-[10px] text-muted-fg">VP Sales · Sequoia Works</p>
          </div>
        </div>
      </motion.div>

      {/* Floating calendar slot */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.7 }}
        className="absolute -bottom-6 -left-6 hidden rounded-2xl border-hair bg-bg/95 px-4 py-3 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.25)] backdrop-blur sm:block"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 flex-col items-center justify-center rounded-xl bg-blue text-bg">
            <span className="font-mono text-[8px] uppercase tracking-[0.14em] opacity-80">Ons</span>
            <span className="text-[14px] font-semibold leading-none">14</span>
          </div>
          <div>
            <p className="text-[13px] font-medium text-fg">14:00 · booket</p>
            <p className="font-mono text-[10px] text-muted-fg">av Nexin AI SDR</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function StatCounter({ target, suffix = "", duration = 1.6 }: { target: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 18 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (inView) mv.set(target);
  }, [inView, mv, target]);

  useMotionValueEvent(spring, "change", (v) => setValue(Math.round(v)));

  return (
    <span ref={ref} className="tabular-nums">
      {value.toLocaleString("nb-NO")}
      {suffix}
    </span>
  );
}

// ---------- Phase visuals ----------

function FinnVisual() {
  const filters = [
    { label: "ICP · SaaS B2B, 50–500 ansatte", active: true },
    { label: "Intensjon · prisside sett siste 14d", active: true },
    { label: "Teknologistakk · HubSpot + Segment", active: true },
    { label: "Finansiering · Serie B siste 12m", active: true },
    { label: "Geografi · Norge, Sverige, DK", active: true },
  ];
  return (
    <div className="relative">
      <div className="rounded-2xl border-hair bg-bg p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Search className="h-3.5 w-3.5 text-blue" />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-fg">
              Filter · kjøre segment
            </span>
          </div>
          <span className="font-mono text-[10px] text-muted-fg">200M+ base</span>
        </div>
        <div className="mt-4 space-y-2.5">
          {filters.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ delay: i * 0.1 + 0.15, duration: 0.45 }}
              className="flex items-center gap-3 rounded-lg border-hair bg-cream px-3 py-2.5"
            >
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue">
                <Check className="h-2.5 w-2.5 text-bg" />
              </span>
              <span className="text-[13px] text-fg">{f.label}</span>
            </motion.div>
          ))}
        </div>
        <div className="mt-5 flex items-baseline justify-between border-t border-line pt-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-fg">
            kandidater funnet
          </span>
          <span className="font-display text-[32px] font-semibold tracking-tight text-fg">
            <StatCounter target={1247} />
          </span>
        </div>
      </div>
    </div>
  );
}

function BerikVisual() {
  const fields = [
    { k: "Rolle", v: "VP Sales", delay: 0.2 },
    { k: "Stack", v: "HubSpot, Segment, Outreach", delay: 0.45 },
    { k: "Signal", v: "Besøkte /pricing × 3 siste 7d", delay: 0.7 },
    { k: "Funding", v: "Serie B · 18M USD, mar 2026", delay: 0.95 },
    { k: "HC vekst", v: "+18% YoY · +12 salg", delay: 1.2 },
    { k: "Intent score", v: "94 / 100", delay: 1.45 },
  ];
  return (
    <div className="relative">
      <div className="rounded-2xl border-hair bg-bg p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue to-blue-ink text-bg font-display text-[14px] font-semibold">
            AT
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[14px] font-semibold text-fg">Alex Thorvaldsen</p>
            <p className="truncate font-mono text-[10px] uppercase tracking-[0.16em] text-muted-fg">
              Sequoia Works · Oslo
            </p>
          </div>
          <span className="rounded-full bg-blue/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-blue">
            ICP match
          </span>
        </div>
        <div className="mt-5 space-y-2.5">
          {fields.map((f) => (
            <motion.div
              key={f.k}
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ delay: f.delay, duration: 0.5 }}
              className="flex items-baseline justify-between border-b border-line/60 pb-2"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-fg">
                {f.k}
              </span>
              <span className="text-right text-[13px] text-fg">{f.v}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NaaVisual() {
  const body = `Hei Alex,

så Sequoia kunngjorde Serie B forrige uke — gratulerer. Et team
som deres vokser fort, og kalde SDR-leads pleier å bli en ops-skatt.

Vi bygde en AI SDR for Helix som booker 40+ møter/mnd — null maler,
null robot-tone. Åpent for 20 minutter tirsdag?

— Mustafa`;

  const [typed, setTyped] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);
  const inView = useInView(bodyRef, { once: true, margin: "-20% 0px" });

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const t = setInterval(() => {
      i += 3;
      setTyped(body.slice(0, i));
      if (i >= body.length) clearInterval(t);
    }, 22);
    return () => clearInterval(t);
  }, [inView, body]);

  return (
    <div ref={bodyRef} className="rounded-2xl border-hair bg-bg p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Mail className="h-3.5 w-3.5 text-blue" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-fg">
            Utkast · AI-skrevet
          </span>
        </div>
        <span className="font-mono text-[10px] text-muted-fg">74 ord</span>
      </div>
      <div className="mt-4 rounded-lg border-hair bg-cream p-4 font-mono text-[12px] leading-[1.7] text-fg whitespace-pre-wrap min-h-[180px]">
        {typed}
        <span className="inline-block h-3 w-[2px] animate-pulse bg-blue align-middle" />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400/10">
            <Check className="h-3 w-3 text-emerald-500" />
          </span>
          <span className="text-[12px] text-muted-fg">Menneske-godkjent</span>
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-full bg-fg px-3 py-1.5 text-[11px] font-medium text-bg">
          Send
          <Send className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

function BookVisual() {
  const days = ["Man", "Tir", "Ons", "Tor", "Fre"];
  const slots = ["09:00", "10:30", "12:00", "14:00", "15:30"];
  const booked = new Set(["0-1", "2-0", "2-3", "3-2", "4-0", "4-4"]);
  const newlyBooked = "2-3";

  return (
    <div className="rounded-2xl border-hair bg-bg p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-3.5 w-3.5 text-blue" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-fg">
            Uke 16 · kalender
          </span>
        </div>
        <span className="font-mono text-[10px] text-blue">6 møter</span>
      </div>
      <div className="mt-4 grid grid-cols-5 gap-1.5">
        {days.map((d) => (
          <div
            key={d}
            className="text-center font-mono text-[9px] uppercase tracking-[0.16em] text-muted-fg"
          >
            {d}
          </div>
        ))}
        {slots.map((slot, slotIdx) =>
          days.map((_, dayIdx) => {
            const key = `${dayIdx}-${slotIdx}`;
            const isBooked = booked.has(key);
            const isNew = key === newlyBooked;
            return (
              <motion.div
                key={key}
                initial={isNew ? { scale: 0.85, opacity: 0 } : false}
                whileInView={isNew ? { scale: 1, opacity: 1 } : undefined}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ delay: 1.0, duration: 0.5 }}
                className={`aspect-square rounded-md text-center flex items-center justify-center ${
                  isBooked
                    ? isNew
                      ? "bg-blue text-bg shadow-[0_0_0_4px_rgba(31,68,255,0.18)]"
                      : "bg-fg text-bg"
                    : "border-hair bg-cream"
                }`}
              >
                <span className="font-mono text-[9px] tabular-nums">{slot.slice(0, 2)}</span>
              </motion.div>
            );
          }),
        )}
      </div>
      <div className="mt-5 rounded-lg border-hair bg-cream p-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue" />
          </span>
          <span className="text-[12px] text-fg">
            Ons 14:00 · <span className="font-medium">Alex Thorvaldsen</span>
          </span>
          <span className="ml-auto font-mono text-[10px] text-muted-fg">nytt</span>
        </div>
      </div>
    </div>
  );
}

// ---------- Phases ----------

const phases = [
  {
    n: "01",
    label: "FINN",
    title: "Identifiser kjøperne dine.",
    body: "Vi profilerer ICP-en din, kjører den mot 200M+ verifiserte kontakter, og kombinerer intensjon, firmografi og hendelsesdata. Ingen spray. Ingen søppelskraping. Kirurgiske lister.",
    bullets: ["ICP-modellering", "Intent + firmografi", "Daglige oppdateringer"],
    Visual: FinnVisual,
  },
  {
    n: "02",
    label: "BERIK",
    title: "Legg til signalet.",
    body: "Hvert lead ankommer med en grunn til å nå ut i dag — finansiering, ansettelser, teknologistakk, prisbesøk. Ikke bare et navn og en e-post.",
    bullets: ["40+ datapunkter", "Intent-scoring 0–100", "Real-time signaler"],
    Visual: BerikVisual,
  },
  {
    n: "03",
    label: "NÅ",
    title: "Personalisert i stor skala.",
    body: "Flerkanals sekvenser — e-post, LinkedIn, stemme — skrevet av AI i din stemme, godkjent av mennesker. On-brand. Aldri maler. Aldri robotaktig.",
    bullets: ["AI-skrevet, menneske-godkjent", "3 kanaler, én inbox", "A/B på alt"],
    Visual: NaaVisual,
  },
  {
    n: "04",
    label: "BOOK",
    title: "Møter på autopilot.",
    body: "En AI SDR svarer på innkommende, håndterer innvendinger, og booker direkte i kalenderen din. Du dukker opp til kvalifiserte samtaler med ferdig brief.",
    bullets: ["24/7 responstid", "Direkte til kalender", "Brief før hver samtale"],
    Visual: BookVisual,
  },
];

export default function LeadGenPage() {
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <>
      <SiteNav />
      <motion.div
        style={{ scaleX: progressScale }}
        className="fixed left-0 right-0 top-[68px] z-40 h-[2px] origin-left bg-blue"
      />
      <main className="min-h-screen bg-bg pt-[100px]">
        {/* ============== HERO ============== */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-grid-light bg-grid-fade" />
          <div className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue/[0.06] blur-[140px]" />

          <div className="container relative pb-24 pt-10 sm:pb-32 sm:pt-14">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-fg transition-colors hover:text-fg"
            >
              <ArrowLeft className="h-3 w-3" />
              Tilbake
            </Link>

            <div className="mt-14 grid items-center gap-16 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border-hair bg-bg/80 py-1.5 pl-1.5 pr-4 backdrop-blur">
                  <span className="rounded-full bg-blue/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-blue">
                    Flaggskip · 01
                  </span>
                  <span className="text-[12px] font-medium text-fg/80">
                    Vår mest etterspurte motor
                  </span>
                </div>

                <h1 className="mt-8 text-balance font-display text-[58px] font-semibold leading-[0.9] tracking-[-0.05em] text-fg sm:text-[84px] md:text-[108px]">
                  Lead Gen,
                  <br />
                  <span className="font-serif italic text-blue">på autopilot.</span>
                </h1>

                <p className="mt-10 max-w-[52ch] text-pretty text-[18px] leading-[1.55] text-muted-fg sm:text-[20px]">
                  Vi finner dem. Vi beriker dem. Vi når dem. Vi booker dem.
                  <br />
                  Du dukker opp til møtet.
                </p>

                <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5">
                  <Link
                    href="/bestill"
                    className="group inline-flex h-14 items-center gap-2 rounded-full bg-fg px-7 text-[15px] font-medium tracking-tight text-bg transition-all hover:bg-blue"
                  >
                    Bestill strategisamtale
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="#hvordan"
                    className="group inline-flex h-14 items-center gap-2 px-2 text-[14px] font-medium tracking-tight text-fg"
                  >
                    <span className="link-underline">Se hvordan det fungerer</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </div>

                {/* Inline proof */}
                <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 border-t-hair pt-8">
                  {[
                    { k: "1 800+", l: "møter i klientkalendere" },
                    { k: "12 mnd", l: "dokumentert motor" },
                    { k: "40+", l: "aktive kunder" },
                  ].map((p) => (
                    <div key={p.l} className="flex items-baseline gap-2">
                      <span className="font-display text-[22px] font-semibold tracking-tight text-fg">
                        {p.k}
                      </span>
                      <span className="text-[12px] text-muted-fg">{p.l}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:pl-4">
                <LiveOpsCard />
              </div>
            </div>
          </div>
        </section>

        {/* ============== LIVE TICKER ============== */}
        <section className="relative overflow-hidden border-y-hair bg-fg">
          <div className="relative flex items-center gap-16 whitespace-nowrap py-5">
            <div className="animate-marquee flex gap-16">
              {[...Array(2)].map((_, k) => (
                <div key={k} className="flex items-center gap-16">
                  {[
                    "47 møter booket siste 30 dager",
                    "8× svarrate vs kalde lister",
                    "< 24t til første lead",
                    "−87% ops-tid for salgsteam",
                    "200M+ verifiserte kontakter",
                    "40+ datapunkter per lead",
                    "24/7 responstid fra AI SDR",
                  ].map((t) => (
                    <div key={t} className="flex items-center gap-4">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue opacity-70" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue" />
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-bg/80">
                        {t}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============== BIG STATS SLAB ============== */}
        <section className="relative bg-cream py-24 sm:py-32">
          <div className="container">
            <div className="flex items-end justify-between gap-10">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-blue">
                  Dokumenterte resultater · 12 mnd
                </p>
                <h2 className="mt-5 max-w-2xl font-display text-[44px] font-semibold leading-[0.95] tracking-[-0.04em] text-fg sm:text-[64px]">
                  Tall før teori.
                </h2>
              </div>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-0 border-t-hair border-b-hair sm:grid-cols-2 lg:grid-cols-4 [&>*]:border-t-hair [&>*:first-child]:border-t-0 sm:[&>*:nth-child(2)]:border-t-0 sm:[&>*:nth-child(even)]:border-l-hair lg:[&>*]:!border-t-0 lg:[&>*:not(:first-child)]:!border-l-hair">
              {[
                { k: 1800, s: "+", l: "kvalifiserte møter booket siste året" },
                { k: 8, s: "×", l: "høyere svarrate enn manuell prospektering" },
                { k: 47, s: "", l: "møter per måned i snitt per klient" },
                { k: 24, s: "t", l: "fra onboarding til første lead i kalenderen" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="relative flex flex-col justify-between gap-10 px-6 py-10 sm:py-14"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-fg">
                    0{i + 1}
                  </span>
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-[68px] font-semibold leading-[0.85] tracking-[-0.06em] text-fg sm:text-[96px]">
                        <StatCounter target={s.k} />
                      </span>
                      <span className="font-display text-[42px] font-semibold leading-none text-blue sm:text-[56px]">
                        {s.s}
                      </span>
                    </div>
                    <p className="mt-4 max-w-[22ch] text-pretty text-[14px] leading-[1.5] text-muted-fg">
                      {s.l}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============== PROCESS (DARK) ============== */}
        <section id="hvordan" className="relative overflow-hidden bg-fg py-28 sm:py-36">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
              maskImage:
                "radial-gradient(ellipse 100% 70% at 50% 40%, black 30%, transparent 85%)",
            }}
          />
          <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-blue/[0.12] blur-[160px]" />

          <div className="container relative">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-blue">
                Slik fungerer motoren
              </p>
              <h2 className="mt-6 text-balance font-display text-[44px] font-semibold leading-[0.95] tracking-[-0.04em] text-bg sm:text-[64px]">
                Fire stasjoner,
                <br />
                <span className="font-serif italic text-blue">én pipeline.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-[16px] leading-[1.6] text-bg/60">
                Hver stasjon er en autonom AI-agent, orkestrert som ett system. Du ser det som ett kontinuerlig flow.
              </p>
            </div>

            <div className="mt-24 space-y-32 sm:space-y-40">
              {phases.map((phase, i) => {
                const Visual = phase.Visual;
                const reverse = i % 2 === 1;
                return (
                  <motion.div
                    key={phase.n}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className={`grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20 ${
                      reverse ? "lg:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    <div>
                      <div className="flex items-baseline gap-5">
                        <span className="font-display text-[110px] font-semibold leading-[0.8] tracking-[-0.07em] text-blue/30 sm:text-[160px]">
                          {phase.n}
                        </span>
                        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-blue">
                          {phase.label}
                        </span>
                      </div>
                      <h3 className="mt-4 text-balance font-display text-[36px] font-semibold leading-[1.0] tracking-[-0.035em] text-bg sm:text-[52px]">
                        {phase.title}
                      </h3>
                      <p className="mt-6 max-w-md text-[16px] leading-[1.6] text-bg/65">
                        {phase.body}
                      </p>
                      <ul className="mt-8 space-y-2.5">
                        {phase.bullets.map((b) => (
                          <li key={b} className="flex items-center gap-3 text-[14px] text-bg/80">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-blue/40 bg-blue/10">
                              <Plus className="h-3 w-3 text-blue" />
                            </span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-4 shadow-[0_40px_120px_-40px_rgba(31,68,255,0.3)] backdrop-blur">
                      <Visual />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============== TESTIMONIAL ============== */}
        <section className="relative bg-bg py-28 sm:py-36">
          <div className="container">
            <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-blue">
                  Fra kunden · Helix
                </p>
                <blockquote className="mt-8 text-balance font-display text-[34px] font-semibold leading-[1.1] tracking-[-0.03em] text-fg sm:text-[48px]">
                  “Vi gikk fra <span className="font-serif italic text-blue">3 møter i måneden</span> til
                  <span className="font-serif italic text-blue"> 40+</span> — uten å ansette en eneste SDR. Nexin er
                  ikke et verktøy. Det er et team.”
                </blockquote>
                <div className="mt-10 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue to-blue-ink" />
                  <div>
                    <p className="text-[14px] font-semibold text-fg">Kristine Aas</p>
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-fg">
                      CRO · Helix Analytics
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                {[
                  { k: "40+", l: "møter / mnd", s: "fra 3/mnd manuelt" },
                  { k: "−92%", l: "ops-tid", s: "frigjort til strategi" },
                  { k: "3.4M", l: "NOK pipeline", s: "generert på 90 dager" },
                ].map((c, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20% 0px" }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    className="flex items-baseline justify-between rounded-2xl border-hair bg-cream px-6 py-5"
                  >
                    <div>
                      <p className="font-display text-[36px] font-semibold leading-none tracking-tight text-fg">
                        {c.k}
                      </p>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-fg">
                        {c.l}
                      </p>
                    </div>
                    <p className="max-w-[140px] text-right text-[12px] leading-[1.4] text-muted-fg">
                      {c.s}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============== FAQ ============== */}
        <section className="relative bg-cream py-24 sm:py-32">
          <div className="container">
            <div className="grid gap-16 lg:grid-cols-[1fr_1.5fr] lg:gap-24">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-blue">FAQ</p>
                <h2 className="mt-6 font-display text-[40px] font-semibold leading-[0.95] tracking-[-0.04em] text-fg sm:text-[56px]">
                  Spørsmål vi
                  <br />
                  <span className="font-serif italic text-blue">får ofte.</span>
                </h2>
                <p className="mt-6 max-w-sm text-[15px] leading-[1.6] text-muted-fg">
                  Finner du ikke svaret? Book en samtale — vi gir deg et ærlig svar på 15 minutter.
                </p>
              </div>

              <div className="divide-y divide-line">
                {[
                  {
                    q: "Hvor lang tid tar onboarding?",
                    a: "Typisk 10–14 dager. Uke 1: ICP-modellering og signal-mapping. Uke 2: første utrulling og kalibrering. Du ser leads i kalenderen innen 24 timer etter go-live.",
                  },
                  {
                    q: "Eier vi dataene og kontaktlistene?",
                    a: "Ja. All data — kontakter, sekvenser, svar, dossier — lever i din HubSpot, Salesforce, eller hvor du vil. Vi forlater ingenting bak oss om du slutter.",
                  },
                  {
                    q: "Hva hvis AI-en skriver noe off-brand?",
                    a: "Alt godkjennes av et menneske før utsendelse. Vi trener agenten på din stemme, case-studier, og tabuord. Revisjonsspor på hver melding.",
                  },
                  {
                    q: "Hvordan prises dette?",
                    a: "Månedlig abonnement knyttet til antall aktive sekvenser og volum. Ingen bindingstid. Garanti: 20+ kvalifiserte møter innen 60 dager, eller vi jobber gratis til vi er der.",
                  },
                  {
                    q: "Fungerer det for min bransje?",
                    a: "Best for B2B SaaS, proffservices og tech-selskaper med gjennomsnittlig deal > 50k NOK. Hvis vi ikke er en match, sier vi det på strategisamtalen.",
                  },
                ].map((item, i) => (
                  <FaqRow key={i} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============== FINAL CTA ============== */}
        <section className="relative overflow-hidden bg-fg py-32 sm:py-40">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
              maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 80%)",
            }}
          />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue/[0.15] blur-[140px]" />

          <div className="container relative text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-blue">
              Nexin · flaggskip
            </p>
            <h2 className="mx-auto mt-8 max-w-[14ch] text-balance font-display text-[56px] font-semibold leading-[0.9] tracking-[-0.05em] text-bg sm:text-[88px] md:text-[108px]">
              Sett pipelinen
              <br />
              <span className="font-serif italic text-blue">på autopilot.</span>
            </h2>
            <p className="mx-auto mt-8 max-w-md text-[17px] leading-[1.6] text-bg/60">
              30 minutters samtale. Vi kartlegger flaskehalsen og viser deg nøyaktig hva motoren gjør for din ICP.
            </p>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
              <Link
                href="/bestill"
                className="group inline-flex h-14 items-center gap-2 rounded-full bg-bg px-8 text-[15px] font-medium tracking-tight text-fg transition-all hover:bg-blue hover:text-bg"
              >
                <Zap className="h-4 w-4" />
                Bestill strategisamtale
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/tjenester"
                className="group inline-flex h-14 items-center gap-2 px-2 text-[14px] font-medium tracking-tight text-bg/80 hover:text-bg"
              >
                <span className="link-underline">Se andre tjenester</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="mt-20 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 border-t border-white/[0.08] pt-10 text-bg/50">
              {["Northwind", "Helix", "Forge & Co.", "Atlas", "Lumen", "Vantage"].map((n) => (
                <span
                  key={n}
                  className="font-display text-[16px] font-semibold tracking-[-0.02em]"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function FaqRow({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOpen((v) => !v)}
      className="group w-full py-6 text-left"
    >
      <div className="flex items-center justify-between gap-6">
        <h3 className="text-[18px] font-semibold tracking-tight text-fg sm:text-[20px]">{q}</h3>
        <span
          className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-hair transition-colors ${
            open ? "bg-blue text-bg" : "bg-bg text-fg group-hover:bg-fg group-hover:text-bg"
          }`}
        >
          <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }}>
            <Plus className="h-4 w-4" />
          </motion.div>
        </span>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="mt-4 max-w-2xl text-[15px] leading-[1.65] text-muted-fg">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
