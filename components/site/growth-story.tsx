"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  MotionValue,
  AnimatePresence,
} from "framer-motion";

// ----- Layout constants (viewBox space) -----
const W = 1200;
const H = 640;
const padL = 40;
const padR = 40;
const padT = 40;
const padB = 80;
const innerW = W - padL - padR;
const innerH = H - padT - padB;

// Data: 12 weeks. "Without" stays flat-ish, "Nexin" takes off.
const weeks = 12;
const withoutData = [40, 41, 43, 42, 44, 45, 44, 46, 47, 48, 49, 50];
const nexinData = [40, 48, 58, 72, 90, 112, 138, 168, 200, 232, 260, 288];
const yMax = 320;

function x(i: number) {
  return padL + (i / (weeks - 1)) * innerW;
}
function y(v: number) {
  return padT + innerH - (v / yMax) * innerH;
}

function catmull(points: readonly (readonly [number, number])[]) {
  if (points.length < 2) return "";
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    const cx = (x0 + x1) / 2;
    d += ` C ${cx} ${y0}, ${cx} ${y1}, ${x1} ${y1}`;
  }
  return d;
}

const withoutPoints = withoutData.map((v, i) => [x(i), y(v)] as const);
const nexinPoints = nexinData.map((v, i) => [x(i), y(v)] as const);
const withoutPath = catmull(withoutPoints);
const nexinPath = catmull(nexinPoints);

// Narrative steps — ClickUp-style stepped storytelling
const steps = [
  {
    at: 0.08,
    eyebrow: "UKE 1",
    title: "Samme startpunkt.",
    body: "To B2B-team. Samme ICP. Samme kvote. Ett team tar i bruk Nexin på dag én. Det andre fortsetter med den gamle spilleboken.",
  },
  {
    at: 0.28,
    eyebrow: "UKE 3",
    title: "Nexin starter.",
    body: "Motoren beriker leads, personaliserer outbound og booker møter over natten. Det andre teamet renser fortsatt CRM-en sin.",
  },
  {
    at: 0.52,
    eyebrow: "UKE 6",
    title: "Gapet øker.",
    body: "Hvert booket møte mater modellen. Hvert svar skjerper kopien. Autopilot overgår manuelt med 2,5×.",
  },
  {
    at: 0.76,
    eyebrow: "UKE 12",
    title: "Forskjellig univers.",
    body: "288 kvalifiserte møter mot 50. Samme antall ansatte. Samme budsjett. Ett team ansetter closers — det andre skriver fortsatt e-postsekvenser.",
  },
];

export function GrowthStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Slower: real drawing runs across 0.10 → 0.90
  const draw = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);
  const areaOpacity = useTransform(scrollYProgress, [0.3, 0.9], [0, 0.9]);

  // Background color shifts slightly as user scrolls — subtle depth
  const bgGlow = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.15, 0.35, 0.55],
  );

  // Which narrative step is active
  const stepIndex = useTransform(scrollYProgress, (p) => {
    let active = 0;
    for (let i = 0; i < steps.length; i++) {
      if (p >= steps[i].at) active = i;
    }
    return active;
  });

  return (
    <section
      ref={ref}
      className="relative bg-[#05070D] text-white"
      style={{ height: "600vh" }}
      aria-label="Growth story"
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* Ambient radial glow */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 65% 45%, rgba(31,68,255,0.22), transparent 60%)",
            opacity: bgGlow,
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
              "radial-gradient(ellipse 70% 50% at 50% 50%, black, transparent)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 50% at 50% 50%, black, transparent)",
          }}
        />

        {/* Top eyebrow */}
        <div className="container relative z-10 pt-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue">
            <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-blue align-middle" />
            Rull · En 12-ukers historie i ett diagram
          </p>
        </div>

        {/* Chart area — full-bleed, no white box */}
        <div className="relative z-10 flex-1">
          <div className="absolute inset-0 flex items-center justify-center px-6 sm:px-12">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="h-full w-full max-w-[1400px]"
              role="img"
              aria-label="Pipeline-vekst over 12 uker"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="gs-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1F44FF" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#1F44FF" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="gs-line" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#6B8EFF" />
                  <stop offset="60%" stopColor="#1F44FF" />
                  <stop offset="100%" stopColor="#8BA6FF" />
                </linearGradient>
                <filter
                  id="gs-glow"
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <clipPath id="gs-reveal">
                  <motion.rect
                    x={padL}
                    y={0}
                    height={H}
                    style={{
                      width: useTransform(draw, (v) => innerW * v),
                    }}
                  />
                </clipPath>
              </defs>

              {/* Y gridlines */}
              {[0, 80, 160, 240, 320].map((v) => (
                <g key={v}>
                  <line
                    x1={padL}
                    x2={W - padR}
                    y1={y(v)}
                    y2={y(v)}
                    stroke="#FFFFFF"
                    strokeOpacity="0.06"
                  />
                  <text
                    x={padL + 6}
                    y={y(v) - 6}
                    fontSize="13"
                    fontFamily="ui-monospace, monospace"
                    fill="#FFFFFF"
                    fillOpacity="0.25"
                  >
                    {v}
                  </text>
                </g>
              ))}

              {/* X labels */}
              {[0, 2, 4, 6, 8, 10, 11].map((i) => (
                <text
                  key={i}
                  x={x(i)}
                  y={y(0) + 28}
                  textAnchor="middle"
                  fontSize="12"
                  fontFamily="ui-monospace, monospace"
                  fill="#FFFFFF"
                  fillOpacity="0.3"
                >
                  W{i + 1}
                </text>
              ))}

              {/* Without — dashed, static (no clip) */}
              <path
                d={withoutPath}
                fill="none"
                stroke="#475569"
                strokeWidth="2.5"
                strokeDasharray="6 8"
                strokeLinecap="round"
              />
              {/* End label for without */}
              <text
                x={x(weeks - 1) + 12}
                y={y(withoutData[weeks - 1]) + 4}
                fontSize="13"
                fontFamily="ui-monospace, monospace"
                fill="#94A3B8"
              >
                Uten · 50
              </text>

              {/* With Nexin — clipped by scroll */}
              <g clipPath="url(#gs-reveal)">
                <motion.path
                  d={`${nexinPath} L ${x(weeks - 1)} ${y(0)} L ${x(0)} ${y(0)} Z`}
                  fill="url(#gs-area)"
                  style={{ opacity: areaOpacity }}
                />
                <path
                  d={nexinPath}
                  fill="none"
                  stroke="url(#gs-line)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#gs-glow)"
                />
              </g>

              {/* End label for Nexin — tracks leading dot */}
              <LeadingLabel draw={draw} />

              {/* Leading dot */}
              <LeadingDot draw={draw} />
            </svg>
          </div>
        </div>

        {/* Bottom narrative block — steps swap on scroll */}
        <div className="container relative z-10 pb-14">
          <StepNarrator stepIndex={stepIndex} />
        </div>
      </div>
    </section>
  );
}

// ---------- helpers ----------

function LeadingDot({ draw }: { draw: MotionValue<number> }) {
  const cx = useTransform(draw, (d) => {
    const idx = d * (weeks - 1);
    const i0 = Math.floor(idx);
    const i1 = Math.min(weeks - 1, i0 + 1);
    const t = idx - i0;
    return x(i0) * (1 - t) + x(i1) * t;
  });
  const cy = useTransform(draw, (d) => {
    const idx = d * (weeks - 1);
    const i0 = Math.floor(idx);
    const i1 = Math.min(weeks - 1, i0 + 1);
    const t = idx - i0;
    const v0 = nexinData[i0];
    const v1 = nexinData[i1];
    return y(v0 * (1 - t) + v1 * t);
  });
  const opacity = useTransform(draw, [0, 0.02, 1], [0, 1, 1]);

  return (
    <g>
      <motion.circle
        cx={cx}
        cy={cy}
        r="24"
        fill="#1F44FF"
        style={{ opacity: useTransform(opacity, (v) => v * 0.18) }}
      />
      <motion.circle
        cx={cx}
        cy={cy}
        r="14"
        fill="#1F44FF"
        style={{ opacity: useTransform(opacity, (v) => v * 0.35) }}
      />
      <motion.circle
        cx={cx}
        cy={cy}
        r="7"
        fill="#FFFFFF"
        stroke="#1F44FF"
        strokeWidth="3"
        style={{ opacity }}
      />
    </g>
  );
}

function LeadingLabel({ draw }: { draw: MotionValue<number> }) {
  const currentValue = useTransform(draw, (d) => {
    const idx = d * (weeks - 1);
    const i0 = Math.floor(idx);
    const i1 = Math.min(weeks - 1, i0 + 1);
    const t = idx - i0;
    const v0 = nexinData[i0];
    const v1 = nexinData[i1];
    return Math.round(v0 * (1 - t) + v1 * t);
  });
  const cx = useTransform(draw, (d) => {
    const idx = d * (weeks - 1);
    const i0 = Math.floor(idx);
    const i1 = Math.min(weeks - 1, i0 + 1);
    const t = idx - i0;
    return x(i0) * (1 - t) + x(i1) * t + 22;
  });
  const cy = useTransform(draw, (d) => {
    const idx = d * (weeks - 1);
    const i0 = Math.floor(idx);
    const i1 = Math.min(weeks - 1, i0 + 1);
    const t = idx - i0;
    const v0 = nexinData[i0];
    const v1 = nexinData[i1];
    return y(v0 * (1 - t) + v1 * t) - 8;
  });
  const opacity = useTransform(draw, [0, 0.05, 1], [0, 1, 1]);

  return (
    <motion.text
      x={cx}
      y={cy}
      fontSize="26"
      fontWeight="700"
      fontFamily="ui-sans-serif, system-ui"
      fill="#FFFFFF"
      style={{ opacity }}
    >
      <motion.tspan>{currentValue}</motion.tspan>
    </motion.text>
  );
}

function StepNarrator({ stepIndex }: { stepIndex: MotionValue<number> }) {
  const [active, setActive] = useState(0);
  useMotionValueEvent(stepIndex, "change", (latest) => {
    const rounded = Math.round(latest);
    if (rounded !== active) setActive(rounded);
  });
  const s = steps[active];
  return (
    <div className="mx-auto max-w-[1400px]">
      <div className="grid gap-8 lg:grid-cols-[auto_1fr_auto] lg:items-end">
        {/* Step dots */}
        <div className="flex items-center gap-3">
          {steps.map((_, i) => (
            <button
              key={i}
              aria-hidden
              className="relative h-[3px] w-14 overflow-hidden rounded-full bg-white/15"
            >
              <motion.div
                className="absolute inset-0 origin-left bg-blue"
                animate={{ scaleX: i <= active ? 1 : 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </button>
          ))}
        </div>

        {/* Narrative copy */}
        <div className="min-h-[160px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue">
                {s.eyebrow}
              </p>
              <h3 className="mt-3 font-display text-[36px] font-semibold leading-[1] tracking-[-0.04em] text-white sm:text-[52px]">
                {s.title}
              </h3>
              <p className="mt-4 max-w-xl text-[15px] leading-[1.6] text-white/60 sm:text-[17px]">
                {s.body}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-3 text-[12px]">
          <div className="flex items-center gap-2">
            <span
              className="h-[3px] w-10 rounded"
              style={{
                background:
                  "linear-gradient(to right, #6B8EFF, #1F44FF, #8BA6FF)",
              }}
            />
            <span className="font-medium text-white">Med Nexin</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-[2px] w-10 rounded border-t-2 border-dashed border-slate-400" />
            <span className="text-white/50">Uten</span>
          </div>
        </div>
      </div>
    </div>
  );
}

