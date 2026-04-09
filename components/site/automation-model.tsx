"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  Radio,
  Sparkles,
  BrainCircuit,
  Zap,
  CalendarCheck,
  Play,
  Pause,
  type LucideIcon,
} from "lucide-react";

// ---------- Data ----------

type Stage = {
  id: string;
  icon: LucideIcon;
  label: string;
  title: string;
  body: string;
  log: string;
  meta: string;
  color: string;
};

const stages: Stage[] = [
  {
    id: "signal",
    icon: Radio,
    label: "01 · SIGNAL",
    title: "A signal fires.",
    body: "Form fill, LinkedIn view, email reply, intent spike. Nexin listens on every channel you already own — nothing gets missed.",
    log: "alex@acme.com · pricing page view",
    meta: "LinkedIn · 2s ago",
    color: "#6B8EFF",
  },
  {
    id: "enrich",
    icon: Sparkles,
    label: "02 · ENRICH",
    title: "Context gets loaded.",
    body: "Role, company, tech stack, funding, headcount, intent. The AI walks into the conversation already knowing the buyer cold.",
    log: "Acme Robotics · Series B · 84 HC · HubSpot",
    meta: "6 sources · 180ms",
    color: "#8BA6FF",
  },
  {
    id: "decide",
    icon: BrainCircuit,
    label: "03 · DECIDE",
    title: "The AI writes the play.",
    body: "Nexin picks the channel, drafts the copy, chooses the timing, and proposes the next best action — with your brand voice baked in.",
    log: "Draft: \u201cHey Alex — saw you\u2019re scaling ops\u2026\u201d",
    meta: "Confidence · 94%",
    color: "#1F44FF",
  },
  {
    id: "act",
    icon: Zap,
    label: "04 · ACT",
    title: "The work ships.",
    body: "Email sent, Slack pinged, CRM updated, calendar hold dropped in. Zero copy-paste. Your team stays out of the weeds.",
    log: "Email sent · CRM updated · #sales notified",
    meta: "3 tools · 0.4s",
    color: "#3B5CFF",
  },
  {
    id: "outcome",
    icon: CalendarCheck,
    label: "05 · OUTCOME",
    title: "Meeting on the calendar.",
    body: "Reply → calendar hold → qualified call confirmed. You show up prepped, the system logs everything back to the stack.",
    log: "Meeting booked · Acme · Tue 2:00pm",
    meta: "$24k pipeline · confirmed",
    color: "#10B981",
  },
];

// ---------- Layout constants (SVG viewBox space) ----------

const W = 1100;
const H = 280;
const nodeR = 46;
const nodeY = H / 2;
const firstX = 120;
const lastX = W - 120;
const step = (lastX - firstX) / (stages.length - 1);
const nodeX = (i: number) => firstX + i * step;

// ---------- Main component ----------

export function AutomationModel() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const reduced = useReducedMotion();

  // Autoplay loop
  useEffect(() => {
    if (!playing || reduced) return;
    const t = setInterval(
      () => setActive((a) => (a + 1) % stages.length),
      2600,
    );
    return () => clearInterval(t);
  }, [playing, reduced]);

  const s = stages[active];
  const ActiveIcon = s.icon;

  const handleSelect = (i: number) => {
    setActive(i);
    setPlaying(false);
  };

  return (
    <section className="relative overflow-hidden bg-[#05070D] py-28 text-white sm:py-36">
      {/* Radial blue wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 45%, rgba(31,68,255,0.20), transparent 65%)",
        }}
      />
      {/* Grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent)",
        }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue">
            <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-blue align-middle" />
            How it works · an automation, alive
          </p>
          <h2 className="mt-6 text-balance font-display text-display-xs font-semibold sm:text-display-sm md:text-display-md">
            Watch the{" "}
            <span className="font-serif italic text-blue">wiring.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-[17px] leading-[1.55] text-white/55">
            One live signal, five stages, zero handoffs. Click any node to jump
            to that moment — or sit back and watch the loop play itself.
          </p>
        </div>

        {/* The model */}
        <div className="relative mx-auto mt-20 max-w-[1200px]">
          <FlowDiagram active={active} onSelect={handleSelect} />

          {/* Detail + live output */}
          <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            {/* Stage narrative */}
            <div className="min-h-[200px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p
                    className="font-mono text-[10px] uppercase tracking-[0.22em]"
                    style={{ color: s.color }}
                  >
                    {s.label}
                  </p>
                  <h3 className="mt-3 font-display text-[36px] font-semibold leading-[1] tracking-[-0.04em] text-white sm:text-[48px]">
                    {s.title}
                  </h3>
                  <p className="mt-5 max-w-lg text-pretty text-[15px] leading-[1.6] text-white/60 sm:text-[17px]">
                    {s.body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Live output card */}
            <div className="self-start rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur sm:p-7">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inset-0 animate-ping rounded-full bg-blue opacity-60" />
                    <span className="relative h-2 w-2 rounded-full bg-blue" />
                  </span>
                  Live output
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
                  Stage {active + 1} / {stages.length}
                </p>
              </div>

              <div className="mt-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/30 p-4"
                  >
                    <div
                      className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: `${s.color}26`,
                        color: s.color,
                        boxShadow: `0 0 30px -10px ${s.color}`,
                      }}
                    >
                      <ActiveIcon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[14px] font-medium text-white">
                        {s.log}
                      </p>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
                        {s.meta}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Stage progress bars */}
              <div className="mt-6 grid grid-cols-5 gap-1.5">
                {stages.map((stage, i) => (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => handleSelect(i)}
                    aria-label={`Jump to ${stage.title}`}
                    className="group relative h-1 overflow-hidden rounded-full bg-white/10 transition-colors hover:bg-white/20"
                  >
                    <motion.span
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{
                        backgroundColor:
                          i <= active ? stage.color : "transparent",
                      }}
                      animate={{ width: i <= active ? "100%" : "0%" }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </button>
                ))}
              </div>

              {/* Controls */}
              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                <button
                  type="button"
                  onClick={() => setPlaying((p) => !p)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/75 transition-colors hover:bg-white/10"
                >
                  {playing ? (
                    <Pause className="h-3 w-3" />
                  ) : (
                    <Play className="h-3 w-3" />
                  )}
                  {playing ? "Pause loop" : "Play loop"}
                </button>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
                  Click · any · node
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Flow diagram ----------

function FlowDiagram({
  active,
  onSelect,
}: {
  active: number;
  onSelect: (i: number) => void;
}) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Automation flow diagram"
    >
      <defs>
        <linearGradient id="am-active-line" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#6B8EFF" />
          <stop offset="50%" stopColor="#1F44FF" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
        <filter id="am-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background rail */}
      <line
        x1={nodeX(0) + nodeR}
        y1={nodeY}
        x2={nodeX(stages.length - 1) - nodeR}
        y2={nodeY}
        stroke="#FFFFFF"
        strokeOpacity="0.08"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Active segments (fade in as stages advance) */}
      {stages.slice(0, -1).map((_, i) => {
        const lit = i < active;
        return (
          <motion.line
            key={`seg-${i}`}
            x1={nodeX(i) + nodeR}
            y1={nodeY}
            x2={nodeX(i + 1) - nodeR}
            y2={nodeY}
            stroke="url(#am-active-line)"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#am-glow)"
            initial={false}
            animate={{ opacity: lit ? 1 : 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          />
        );
      })}

      {/* Flowing particles along every segment */}
      {stages.slice(0, -1).map((_, i) => {
        const x1 = nodeX(i) + nodeR;
        const x2 = nodeX(i + 1) - nodeR;
        const dur = 2.2 + i * 0.12;
        const delay = i * 0.35;
        return (
          <g key={`flow-${i}`}>
            <circle r="3.5" fill="#FFFFFF">
              <animate
                attributeName="cx"
                values={`${x1};${x2}`}
                dur={`${dur}s`}
                repeatCount="indefinite"
                begin={`${delay}s`}
              />
              <animate
                attributeName="cy"
                values={`${nodeY};${nodeY}`}
                dur={`${dur}s`}
                repeatCount="indefinite"
                begin={`${delay}s`}
              />
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                dur={`${dur}s`}
                repeatCount="indefinite"
                begin={`${delay}s`}
              />
            </circle>
          </g>
        );
      })}

      {/* Nodes */}
      {stages.map((s, i) => {
        const cx = nodeX(i);
        const cy = nodeY;
        const isActive = i === active;
        const isPast = i < active;

        return (
          <g
            key={s.id}
            onClick={() => onSelect(i)}
            style={{ cursor: "pointer" }}
            className="group"
          >
            {/* Hit target (larger, invisible) */}
            <circle cx={cx} cy={cy} r={nodeR + 18} fill="transparent" />

            {/* Pulsing halo on active */}
            {isActive && (
              <circle
                cx={cx}
                cy={cy}
                r={nodeR + 14}
                fill={s.color}
                fillOpacity="0.18"
              >
                <animate
                  attributeName="r"
                  values={`${nodeR + 10};${nodeR + 22};${nodeR + 10}`}
                  dur="2.2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="fill-opacity"
                  values="0.22;0.08;0.22"
                  dur="2.2s"
                  repeatCount="indefinite"
                />
              </circle>
            )}

            {/* Outer ring */}
            <circle
              cx={cx}
              cy={cy}
              r={nodeR}
              fill={
                isActive
                  ? s.color
                  : isPast
                    ? "rgba(31,68,255,0.18)"
                    : "rgba(255,255,255,0.04)"
              }
              stroke={isActive || isPast ? s.color : "rgba(255,255,255,0.18)"}
              strokeWidth={isActive ? "2.5" : "1.5"}
              className="transition-all"
            />

            {/* Icon — rendered via foreignObject so we can use lucide */}
            <foreignObject
              x={cx - 16}
              y={cy - 16}
              width="32"
              height="32"
              pointerEvents="none"
            >
              <div className="flex h-8 w-8 items-center justify-center">
                <StageIcon
                  Icon={s.icon}
                  active={isActive || isPast}
                />
              </div>
            </foreignObject>

            {/* Label below node */}
            <text
              x={cx}
              y={cy + nodeR + 28}
              textAnchor="middle"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
              fill="#FFFFFF"
              fillOpacity={isActive ? 1 : 0.5}
              letterSpacing="1.4"
              className="transition-opacity"
            >
              {s.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function StageIcon({
  Icon,
  active,
}: {
  Icon: LucideIcon;
  active: boolean;
}) {
  return (
    <Icon
      className="h-5 w-5"
      color={active ? "#FFFFFF" : "rgba(255,255,255,0.55)"}
      strokeWidth={2}
    />
  );
}
