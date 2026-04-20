"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Pause,
  Play,
  RotateCcw,
} from "lucide-react";
import {
  SiHubspot,
  SiOpenai,
  SiGmail,
  SiSlack,
  SiGooglecalendar,
} from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import type { IconType } from "react-icons";

// ============================================================================
// Data — a real-feeling trace of one lead moving through the stack
// ============================================================================

type TraceEvent = {
  t: string; // display timestamp shown to the viewer
  revealAt: number; // ms into the scaled playback when this event fires
  brand: { Icon: IconType; name: string; color: string };
  slug: string;
  title: string;
  body: string;
  fills?: string[]; // dossier field keys this event fills in
};

const events: TraceEvent[] = [
  {
    revealAt: 300,
    t: "00.0s",
    brand: { Icon: FaLinkedin, name: "LinkedIn", color: "#0A66C2" },
    slug: "signal · pricing_page_view",
    title: "Alex besøker /pricing.",
    body: "Tredjeparts-piksel avfyrer et signal. Ingen rep ser på. Nexin gjør det allerede.",
    fills: ["name", "role", "company", "location"],
  },
  {
    revealAt: 1000,
    t: "00.4s",
    brand: { Icon: SiHubspot, name: "HubSpot", color: "#FF7A59" },
    slug: "enrich · dossier_built",
    title: "Dossieret bygges.",
    body: "CRM-historikk, firmografier, teknologistakk, intensjon, finansiering — hentet i én tur.",
    fills: ["headcount", "stage", "stack", "intent"],
  },
  {
    revealAt: 1900,
    t: "00.9s",
    brand: { Icon: SiOpenai, name: "OpenAI", color: "#10A37F" },
    slug: "decide · draft_generated",
    title: "AI skriver utkastet.",
    body: "En 74-ords e-post i din stemme, med referanse til Serie B-runden Acme annonserte i går.",
    fills: ["draft"],
  },
  {
    revealAt: 2800,
    t: "01.3s",
    brand: { Icon: SiGmail, name: "Gmail", color: "#EA4335" },
    slug: "act · email_sent",
    title: "E-post lander i innboksen.",
    body: "Sendt fra repens ekte adresse, trådet under prisbesøket, sporet for svar.",
  },
  {
    revealAt: 3500,
    t: "01.5s",
    brand: { Icon: SiSlack, name: "Slack", color: "#E01E5A" },
    slug: "notify · sales_pinged",
    title: "Teamet ditt får beskjed.",
    body: "Et kort dukker opp i #salg med dossieret, utkastet og en «ta over»-knapp.",
  },
  {
    revealAt: 5200,
    t: "05.8s",
    brand: { Icon: SiGooglecalendar, name: "Google Calendar", color: "#4285F4" },
    slug: "outcome · meeting_booked",
    title: "Alex svarer. Møtet er booket.",
    body: "AI SDR bekrefter et tidspunkt, sender invitasjonen, oppdaterer HubSpot. Du møter opp forberedt.",
    fills: ["meeting", "status"],
  },
];

const DURATION_MS = 7200;
const LOOP_HOLD_MS = 1800;

type DossierField = { key: string; label: string; value: string };

const dossierFields: DossierField[] = [
  { key: "name", label: "Navn", value: "Alex Rivera" },
  { key: "role", label: "Rolle", value: "Driftssjef" },
  { key: "company", label: "Selskap", value: "Acme Robotics" },
  { key: "location", label: "HK", value: "Brooklyn, NY" },
  { key: "headcount", label: "Antall ansatte", value: "84" },
  { key: "stage", label: "Fase", value: "Serie B · 2026" },
  { key: "stack", label: "Stack", value: "HubSpot, Linear, Slack" },
  { key: "intent", label: "Intensjonsscore", value: "94 / 100" },
  { key: "meeting", label: "Møte", value: "Tir 14:00 CET" },
  { key: "status", label: "Status", value: "KONVERTERT" },
];

function formatTime(ms: number) {
  const clamped = Math.max(0, Math.min(DURATION_MS, ms));
  const seconds = clamped / 1000;
  const whole = Math.floor(seconds);
  const tenths = Math.floor((seconds - whole) * 10);
  const mm = String(Math.floor(whole / 60)).padStart(2, "0");
  const ss = String(whole % 60).padStart(2, "0");
  return `${mm}:${ss}.${tenths}`;
}

// ============================================================================
// Main section
// ============================================================================

export function AutomationModel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20%" });
  const reduced = useReducedMotion();

  const [elapsed, setElapsed] = useState(0);
  const [playRequested, setPlayRequested] = useState(false);
  const [loopKey, setLoopKey] = useState(0);
  const hasAutoStartedRef = useRef(false);

  const rafRef = useRef<number | null>(null);
  const lastFrameRef = useRef<number>(0);
  const holdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelRaf = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const clearHold = useCallback(() => {
    if (holdRef.current !== null) {
      clearTimeout(holdRef.current);
      holdRef.current = null;
    }
  }, []);

  // Auto-start once, the first time the section scrolls into view
  useEffect(() => {
    if (!inView || hasAutoStartedRef.current) return;
    hasAutoStartedRef.current = true;
    if (reduced) {
      setElapsed(DURATION_MS);
    } else {
      setPlayRequested(true);
    }
  }, [inView, reduced]);

  // rAF playback loop — continuous, frame-accurate progression
  useEffect(() => {
    if (!playRequested || !inView || reduced) {
      cancelRaf();
      return;
    }

    lastFrameRef.current = performance.now();

    const tick = (now: number) => {
      const dt = now - lastFrameRef.current;
      lastFrameRef.current = now;
      let reachedEnd = false;
      setElapsed((prev) => {
        const next = prev + dt;
        if (next >= DURATION_MS) {
          reachedEnd = true;
          return DURATION_MS;
        }
        return next;
      });
      if (reachedEnd) {
        rafRef.current = null;
        clearHold();
        holdRef.current = setTimeout(() => {
          setElapsed(0);
          setLoopKey((k) => k + 1);
        }, LOOP_HOLD_MS);
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelRaf();
    };
  }, [playRequested, inView, reduced, loopKey, cancelRaf, clearHold]);

  // Tear-down on unmount
  useEffect(() => {
    return () => {
      cancelRaf();
      clearHold();
    };
  }, [cancelRaf, clearHold]);

  const visibleCount = events.filter((e) => elapsed >= e.revealAt).length;
  const visibleEvents = useMemo(
    () => events.slice(0, visibleCount),
    [visibleCount],
  );
  const allRevealed = visibleCount === events.length;
  const playbackComplete = elapsed >= DURATION_MS;

  const filledKeys = useMemo(() => {
    const set = new Set<string>();
    visibleEvents.forEach((e) => e.fills?.forEach((k) => set.add(k)));
    return set;
  }, [visibleEvents]);

  const handlePlayPause = useCallback(() => {
    clearHold();
    if (playbackComplete) {
      setElapsed(0);
      setLoopKey((k) => k + 1);
      setPlayRequested(true);
      return;
    }
    setPlayRequested((p) => !p);
  }, [clearHold, playbackComplete]);

  const handleReplay = useCallback(() => {
    clearHold();
    setElapsed(0);
    setLoopKey((k) => k + 1);
    setPlayRequested(true);
  }, [clearHold]);

  const isPlaying = playRequested && !playbackComplete;
  const statusText = !playRequested
    ? "paused"
    : playbackComplete
      ? "ferdig · looper"
      : "spiller nå";

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#0A0C12] py-28 text-white sm:py-32"
      aria-label="Live automation trace"
    >
      <BackgroundDecor />

      <div className="container relative z-10">
        <SectionHeader />

        <div className="relative mx-auto mt-14 max-w-[1220px] lg:mt-16">
          <FrameTopBar statusText={statusText} />

          <div className="relative mt-3 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-8">
            <LeadDossier filled={filledKeys} done={allRevealed} />
            <EventStream
              visible={visibleEvents}
              totalCount={events.length}
              done={allRevealed}
            />
          </div>

          <PlayerChrome
            elapsed={elapsed}
            playing={isPlaying}
            onPlayPause={handlePlayPause}
            onReplay={handleReplay}
          />
        </div>

        <Outro />
      </div>
    </section>
  );
}

// ============================================================================
// Background — coordinates, grid, ambient blue glow
// ============================================================================

function BackgroundDecor() {
  return (
    <>
      {/* radial blue wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 72% 40%, rgba(31,68,255,0.20), transparent 65%)",
        }}
      />
      {/* tech grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 75% 70% at 50% 50%, black, transparent)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 70% at 50% 50%, black, transparent)",
        }}
      />
      {/* corner coordinates — schematic frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden text-white/20 sm:block"
      >
        <span className="absolute left-8 top-8 font-mono text-[10px] uppercase tracking-[0.22em]">
          lat 40.7128 · lng −74.0060
        </span>
        <span className="absolute right-8 top-8 font-mono text-[10px] uppercase tracking-[0.22em]">
          run · 2874 / 12,401
        </span>
        <span className="absolute bottom-8 left-8 font-mono text-[10px] uppercase tracking-[0.22em]">
          nexin · ops deck
        </span>
        <span className="absolute bottom-8 right-8 font-mono text-[10px] uppercase tracking-[0.22em]">
          rev 0.1 · 26q2
        </span>
      </div>
    </>
  );
}

// ============================================================================
// Header — editorial intro
// ============================================================================

function SectionHeader() {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-balance font-display text-display-xs font-semibold leading-[0.95] sm:text-display-sm md:text-display-md">
        Én lead.
        <br />
        <span className="font-serif italic text-blue">Seks sekunder.</span>
      </h2>
      <p className="mx-auto mt-6 max-w-xl text-pretty text-[17px] leading-[1.55] text-white/55">
        Se en ekte lead bevege seg gjennom stacken — fra prisside-besøk til
        møte i kalenderen. Samme verktøy du allerede bruker. Ingen
        kopiering og liming.
      </p>
    </div>
  );
}

// ============================================================================
// Frame top bar — live-trace status strip above the frame
// ============================================================================

function FrameTopBar({ statusText }: { statusText: string }) {
  return (
    <div className="flex items-center justify-between px-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
      <div className="flex items-center gap-2.5">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inset-0 animate-ping rounded-full bg-blue opacity-70" />
          <span className="relative h-1.5 w-1.5 rounded-full bg-blue" />
        </span>
        <span>Nexin · live trace</span>
        <span className="text-white/20">·</span>
        <span>run #2874</span>
        <span className="hidden text-white/20 sm:inline">·</span>
        <span className="hidden text-blue/80 sm:inline">{statusText}</span>
      </div>
      <div className="hidden items-center gap-2 sm:flex">
        <span>REC</span>
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#E11D48]" />
      </div>
    </div>
  );
}

// ============================================================================
// Lead Dossier — cream "paper" card, reveals fields progressively
// ============================================================================

function LeadDossier({
  filled,
  done,
}: {
  filled: Set<string>;
  done: boolean;
}) {
  return (
    <div className="relative lg:sticky lg:top-24 lg:self-start">
      {/* Tape at top-left — small design flourish */}
      <div
        aria-hidden
        className="absolute -left-4 -top-3 z-20 h-6 w-24 -rotate-6 bg-blue/70 shadow-[0_4px_18px_-6px_rgba(31,68,255,0.6)]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0 4px, transparent 4px 8px)",
        }}
      />

      <div
        className="relative overflow-hidden rounded-2xl bg-[#F6F1E7] text-[#0A0C12] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(10,12,18,0.045) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-black/10 px-6 pb-3 pt-5">
          <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-black/50">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E11D48]" />
            Konfidensielt · lead-fil
          </div>
          <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-black/50">
            RUN · 2874
          </div>
        </div>

        {/* Body */}
        <div className="relative px-6 pb-7 pt-6 sm:px-8">
          {/* Identity block */}
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-[#0A0C12] font-display text-[18px] font-semibold tracking-tight text-[#F6F1E7]">
              AR
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-black/45">
                Subjekt
              </p>
              <h3 className="mt-1 font-display text-[28px] font-semibold leading-[1] tracking-[-0.035em] text-black">
                Alex Rivera
              </h3>
              <p className="mt-1 text-[13px] leading-[1.4] text-black/60">
                Driftssjef · Acme Robotics
              </p>
            </div>
          </div>

          {/* Divider with label */}
          <div className="mt-7 flex items-center gap-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-black/45">
              Dossier
            </span>
            <div className="h-px flex-1 bg-black/10" />
          </div>

          {/* Field table — fills progressively */}
          <dl className="mt-4 space-y-[11px]">
            {dossierFields.map((f) => (
              <DossierRow key={f.key} field={f} visible={filled.has(f.key)} />
            ))}
          </dl>

          {/* Draft preview (appears when AI drafts it) */}
          <div className="mt-6">
            <AnimatePresence>
              {filled.has("draft") && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: 8 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="rounded-xl border border-black/10 bg-white/60 p-4">
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-black/45">
                      Utkast · 74 ord · sikkerhet 94%
                    </p>
                    <p className="mt-2 font-serif text-[14px] italic leading-[1.5] text-black/80">
                      &ldquo;Hei Alex — så at du skalerer ops hos Acme
                      rett etter Serie B. Vi hjalp nettopp Helix med å booke 47
                      møter i sin første måned på autopilot. Verdt en
                      15-minutters prat?&rdquo;
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* CONVERTED stamp */}
        <AnimatePresence>
          {done && (
            <motion.div
              initial={{ opacity: 0, scale: 1.4, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: -8 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
              transition={{
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.1,
              }}
              className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 sm:right-10"
              aria-hidden
            >
              <div className="relative">
                <div className="rounded-md border-[3px] border-[#D1342F] px-4 py-2 text-[#D1342F] shadow-[0_0_0_2px_#F6F1E7_inset] mix-blend-multiply">
                  <p className="font-display text-[22px] font-semibold uppercase leading-none tracking-[0.18em]">
                    Konvertert
                  </p>
                  <p className="mt-1 text-center font-mono text-[9px] uppercase tracking-[0.18em]">
                    5.8s · $24k pipeline
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function DossierRow({
  field,
  visible,
}: {
  field: DossierField;
  visible: boolean;
}) {
  const statusEmphasis = field.key === "status" && visible;
  return (
    <div className="grid grid-cols-[96px_1fr] items-baseline gap-3">
      <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-black/45">
        {field.label}
      </dt>
      <dd className="relative min-h-[20px] overflow-hidden">
        <AnimatePresence mode="wait">
          {visible ? (
            <motion.span
              key="v"
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={`block text-[14px] leading-[1.35] ${
                statusEmphasis
                  ? "font-display font-semibold tracking-[-0.02em] text-[#10713C]"
                  : "text-black/85"
              }`}
            >
              {field.value}
            </motion.span>
          ) : (
            <motion.span
              key="e"
              className="block h-[2px] w-12 translate-y-[9px] rounded bg-black/15"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>
      </dd>
    </div>
  );
}

// ============================================================================
// Event Stream — dark "terminal" with streaming events
// ============================================================================

function EventStream({
  visible,
  totalCount,
  done,
}: {
  visible: TraceEvent[];
  totalCount: number;
  done: boolean;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0F1117]/90 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] backdrop-blur">
      {/* Terminal-style header */}
      <div className="flex items-center justify-between border-b border-white/10 px-6 pb-3 pt-5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
            nexin.trace · event_stream
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
          <span>{Math.max(0, visible.length)}</span>
          <span className="text-white/20">/</span>
          <span>{totalCount}</span>
        </div>
      </div>

      {/* Events */}
      <div className="relative px-4 pb-5 pt-2 sm:px-6">
        <ol className="relative">
          {/* Vertical rail */}
          <span
            aria-hidden
            className="absolute bottom-6 left-[26px] top-6 w-px bg-gradient-to-b from-white/10 via-white/20 to-white/5 sm:left-[30px]"
          />

          <AnimatePresence initial={false}>
            {visible.map((e, i) => (
              <EventRow
                key={e.slug}
                event={e}
                isLatest={i === visible.length - 1 && !done}
              />
            ))}
          </AnimatePresence>

          {/* Cursor row — shows while more events are pending */}
          {visible.length < totalCount && (
            <li className="flex items-center gap-4 py-3 pl-[52px] font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 sm:pl-[60px]">
              <span className="inline-block h-3 w-[2px] animate-pulse bg-blue" />
              venter på neste hendelse…
            </li>
          )}
        </ol>

        {/* Footer totals — after all events revealed */}
        <AnimatePresence>
          {done && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8, transition: { duration: 0.3 } }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 border-t border-white/10 pt-4"
            >
              <div className="grid grid-cols-3 gap-4">
                <Metric label="Forsinkelse" value="5.8s" />
                <Metric label="Verktøy brukt" value="6" />
                <Metric label="Menneskelige tastetrykk" value="0" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function EventRow({
  event,
  isLatest,
}: {
  event: TraceEvent;
  isLatest: boolean;
}) {
  const { Icon, name, color } = event.brand;
  return (
    <motion.li
      initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="relative grid grid-cols-[60px_1fr] gap-4 py-3 sm:grid-cols-[68px_1fr]"
    >
      {/* Timestamp */}
      <div className="pt-1 text-right font-mono text-[11px] tabular-nums text-white/40">
        {event.t}
      </div>

      {/* Body column with brand chip on the rail */}
      <div className="relative min-w-0">
        {/* Rail dot — brand colored */}
        <span
          aria-hidden
          className="absolute -left-[30px] top-1 flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-[#0F1117] sm:-left-[34px]"
          style={{
            backgroundColor: `${color}1F`,
            boxShadow: isLatest
              ? `0 0 0 3px ${color}44, 0 0 24px ${color}66`
              : undefined,
          }}
        >
          <Icon className="h-[13px] w-[13px]" style={{ color }} />
        </span>

        {/* Slug */}
        <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em]">
          <span style={{ color }}>{name}</span>
          <span className="text-white/20">·</span>
          <span className="text-white/50">
            {event.slug.split(" · ")[1] ?? event.slug}
          </span>
        </p>
        {/* Title */}
        <p className="mt-1.5 font-display text-[17px] font-semibold leading-[1.25] tracking-[-0.02em] text-white sm:text-[18px]">
          {event.title}
        </p>
        {/* Body */}
        <p className="mt-1 max-w-[48ch] text-[13.5px] leading-[1.5] text-white/55">
          {event.body}
        </p>
      </div>
    </motion.li>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">
        {label}
      </p>
      <p className="mt-1 font-display text-[24px] font-semibold tabular-nums leading-none tracking-[-0.02em] text-white">
        {value}
      </p>
    </div>
  );
}

// ============================================================================
// Player chrome — video-like controls under the frame
// ============================================================================

function PlayerChrome({
  elapsed,
  playing,
  onPlayPause,
  onReplay,
}: {
  elapsed: number;
  playing: boolean;
  onPlayPause: () => void;
  onReplay: () => void;
}) {
  const progress = Math.min(1, elapsed / DURATION_MS);
  const current = formatTime(elapsed);
  const total = formatTime(DURATION_MS);

  return (
    <div className="mt-5 rounded-2xl border border-white/10 bg-black/40 px-4 py-3.5 backdrop-blur sm:px-5 sm:py-4">
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={onPlayPause}
          aria-label={playing ? "Sett på pause" : "Spill av"}
          className="group flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white text-[#0A0C12] transition-all hover:scale-[1.06] hover:bg-blue hover:text-white"
        >
          {playing ? (
            <Pause className="h-4 w-4" fill="currentColor" strokeWidth={0} />
          ) : (
            <Play
              className="h-4 w-4 translate-x-[1px]"
              fill="currentColor"
              strokeWidth={0}
            />
          )}
        </button>

        <div className="hidden font-mono text-[11px] tabular-nums text-white/60 sm:block">
          <span className="text-white/90">{current}</span>
          <span className="mx-1.5 text-white/20">/</span>
          <span>{total}</span>
        </div>

        <Scrubber progress={progress} />

        <div className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-white/40 md:block">
          1×
        </div>

        <button
          type="button"
          onClick={onReplay}
          aria-label="Spill av fra start"
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-white/15 text-white/60 transition-all hover:border-white/40 hover:text-white"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

function Scrubber({ progress }: { progress: number }) {
  const pct = Math.min(100, Math.max(0, progress * 100));
  return (
    <div className="relative h-3 flex-1">
      {/* Track */}
      <div className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-white/10" />
      {/* Event tick marks — brand colored */}
      {events.map((e) => {
        const left = (e.revealAt / DURATION_MS) * 100;
        return (
          <span
            key={e.slug}
            aria-hidden
            className="absolute top-1/2 h-[8px] w-[2px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: `${left}%`,
              backgroundColor: e.brand.color,
              opacity: 0.55,
            }}
          />
        );
      })}
      {/* Filled portion */}
      <div
        className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-gradient-to-r from-blue to-white"
        style={{ width: `${pct}%` }}
      />
      {/* Playhead */}
      <div
        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${pct}%` }}
      >
        <div className="h-3 w-3 rounded-full bg-white shadow-[0_0_0_3px_rgba(31,68,255,0.35),0_0_16px_rgba(31,68,255,0.8)]" />
      </div>
    </div>
  );
}

// ============================================================================
// Outro — conversion moment + CTA
// ============================================================================

function Outro() {
  return (
    <div className="relative mx-auto mt-16 max-w-[1220px]">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-7 backdrop-blur sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-10">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue">
              Kvitteringen
            </p>
            <p className="mt-4 font-display text-[30px] font-semibold leading-[1.05] tracking-[-0.03em] text-white sm:text-[42px] md:text-[52px]">
              Nexin leverte dette på{" "}
              <span className="font-serif italic text-blue">5,8 sekunder.</span>
              <br />
              <span className="text-white/35">
                Teamet ditt bruker{" "}
                <span className="relative inline-block">
                  <span className="font-serif italic">elleve dager</span>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-0 right-0 top-[58%] h-[2px] -rotate-[2deg] bg-white/40"
                  />
                </span>
                .
              </span>
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 lg:items-end">
            <Link
              href="/bestill"
              className="group inline-flex h-14 items-center gap-2.5 rounded-full bg-white px-7 text-[14px] font-medium tracking-tight text-[#0A0C12] transition-all hover:bg-blue hover:text-white"
            >
              Bestill strategisamtale
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
              Ingen presentasjon. Ingen labyrint. Bare kjøringen.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-white/10 pt-5">
          <OutcomeChip label="Møte booket" />
          <OutcomeChip label="$24k pipeline lagt til" />
          <OutcomeChip label="0 rep-timer" />
          <OutcomeChip label="6 verktøy orkestrert" />
          <OutcomeChip label="1 fornøyd closer" check />
        </div>
      </div>
    </div>
  );
}

function OutcomeChip({ label, check }: { label: string; check?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/70">
      {check && <Check className="h-3 w-3 text-emerald-400" />}
      {label}
    </span>
  );
}
