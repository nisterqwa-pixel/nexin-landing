"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";

// ----- Layout (viewBox space) -----
const W = 1200;
const H = 560;
const padL = 40;
const padR = 40;
const padT = 60;
const padB = 70;
const innerW = W - padL - padR;
const innerH = H - padT - padB;

// 12 months of pipeline growth
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const data = [12, 18, 28, 44, 62, 86, 118, 156, 198, 236, 268, 292];
const yMax = 320;

function x(i: number) {
  return padL + (i / (data.length - 1)) * innerW;
}
function y(v: number) {
  return padT + innerH - (v / yMax) * innerH;
}

function smoothPath(values: number[]) {
  const pts = values.map((v, i) => [x(i), y(v)] as const);
  if (pts.length < 2) return "";
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const cx = (x0 + x1) / 2;
    d += ` C ${cx} ${y0}, ${cx} ${y1}, ${x1} ${y1}`;
  }
  return d;
}

const path = smoothPath(data);

// Annotations — Vox-style editorial callouts
const annotations = [
  {
    idx: 3,
    at: 0.35,
    title: "Nexin starter",
    sub: "Første bookede møter",
  },
  {
    idx: 7,
    at: 0.7,
    title: "Forsterker seg",
    sub: "Modellen skjerpes, kopien strammes",
  },
  {
    idx: 11,
    at: 0.95,
    title: "292 møter",
    sub: "24× vs manuell baseline",
  },
];

export function LiveRevenueCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  // Core "draw" progress — slow, deliberate reveal after mount
  const draw = useMotionValue(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(draw, 1, {
      duration: 3.6,
      delay: 0.3,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => c.stop();
  }, [inView, draw]);

  // Live count at the leading dot
  const [liveVal, setLiveVal] = useState(0);
  useMotionValueEvent(draw, "change", (d) => {
    const idx = d * (data.length - 1);
    const i0 = Math.floor(idx);
    const i1 = Math.min(data.length - 1, i0 + 1);
    const t = idx - i0;
    setLiveVal(Math.round(data[i0] * (1 - t) + data[i1] * t));
  });

  const clipWidth = useTransform(draw, (d) => innerW * d);
  const areaOpacity = useTransform(draw, [0, 0.2, 1], [0, 0.2, 0.9]);

  return (
    <div
      ref={ref}
      className="relative mx-auto mt-16 w-full max-w-4xl overflow-hidden rounded-3xl bg-[#05070D] text-white shadow-[0_30px_80px_-30px_rgba(15,23,42,0.45)] animate-rise"
    >
      {/* Ambient blue glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 65% 45%, rgba(31,68,255,0.28), transparent 70%)",
        }}
      />
      {/* Faint grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent)",
        }}
      />

      {/* Top bar */}
      <div className="relative flex items-center justify-between px-6 pt-5">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/60">
            Live · Pipeline / kvalifiserte møter
          </p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/70">
          Siste 12 mnd
        </span>
      </div>

      {/* Headline */}
      <div className="relative flex items-end justify-between px-6 pt-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
            Booket i år
          </p>
          <div className="mt-2 flex items-baseline gap-3">
            <p className="font-display text-[52px] font-semibold leading-none tracking-[-0.05em] text-white">
              {liveVal * 4}
            </p>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[12px] font-semibold text-emerald-400">
              +326%
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
            Denne måneden
          </p>
          <p className="mt-2 font-display text-[22px] font-semibold tabular-nums text-blue">
            +{liveVal}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="relative px-2 pb-4 pt-2">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-[300px] w-full"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Pipeline-vekstkart"
        >
          <defs>
            <linearGradient id="hrc-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1F44FF" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#1F44FF" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="hrc-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6B8EFF" />
              <stop offset="55%" stopColor="#1F44FF" />
              <stop offset="100%" stopColor="#8BA6FF" />
            </linearGradient>
            <filter
              id="hrc-glow"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <clipPath id="hrc-clip">
              <motion.rect x={padL} y={0} height={H} style={{ width: clipWidth }} />
            </clipPath>
          </defs>

          {/* Y gridlines + labels */}
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
                x={padL + 4}
                y={y(v) - 6}
                fontSize="13"
                fontFamily="ui-monospace, monospace"
                fill="#FFFFFF"
                fillOpacity="0.3"
              >
                {v}
              </text>
            </g>
          ))}

          {/* X labels */}
          {months.map((m, i) => (
            <text
              key={i}
              x={x(i)}
              y={y(0) + 26}
              textAnchor="middle"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fill="#FFFFFF"
              fillOpacity="0.35"
            >
              {m}
            </text>
          ))}

          {/* Area + line clipped by the scroll reveal */}
          <g clipPath="url(#hrc-clip)">
            <motion.path
              d={`${path} L ${x(data.length - 1)} ${y(0)} L ${x(0)} ${y(0)} Z`}
              fill="url(#hrc-area)"
              style={{ opacity: areaOpacity }}
            />
            <path
              d={path}
              fill="none"
              stroke="url(#hrc-line)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#hrc-glow)"
            />
          </g>

          {/* Annotations — Vox-style callouts */}
          {annotations.map((a, i) => (
            <Annotation key={i} annotation={a} draw={draw} />
          ))}

          {/* Leading dot */}
          <LeadingDot draw={draw} />
        </svg>
      </div>
    </div>
  );
}

// ---------- helpers ----------

function LeadingDot({ draw }: { draw: import("framer-motion").MotionValue<number> }) {
  const cx = useTransform(draw, (d) => {
    const idx = d * (data.length - 1);
    const i0 = Math.floor(idx);
    const i1 = Math.min(data.length - 1, i0 + 1);
    const t = idx - i0;
    return x(i0) * (1 - t) + x(i1) * t;
  });
  const cy = useTransform(draw, (d) => {
    const idx = d * (data.length - 1);
    const i0 = Math.floor(idx);
    const i1 = Math.min(data.length - 1, i0 + 1);
    const t = idx - i0;
    return y(data[i0] * (1 - t) + data[i1] * t);
  });
  const opacity = useTransform(draw, [0, 0.05, 1], [0, 1, 1]);

  return (
    <g>
      <motion.circle cx={cx} cy={cy} r="22" fill="#1F44FF" style={{ opacity: useTransform(opacity, (v) => v * 0.18) }} />
      <motion.circle cx={cx} cy={cy} r="12" fill="#1F44FF" style={{ opacity: useTransform(opacity, (v) => v * 0.4) }} />
      <motion.circle
        cx={cx}
        cy={cy}
        r="6"
        fill="#FFFFFF"
        stroke="#1F44FF"
        strokeWidth="3"
        style={{ opacity }}
      />
    </g>
  );
}

function Annotation({
  annotation,
  draw,
}: {
  annotation: { idx: number; at: number; title: string; sub: string };
  draw: import("framer-motion").MotionValue<number>;
}) {
  const { idx, at, title, sub } = annotation;
  const px = x(idx);
  const py = y(data[idx]);

  const opacity = useTransform(
    draw,
    [at - 0.08, at - 0.02, 1],
    [0, 1, 1],
  );
  const ty = useTransform(draw, [at - 0.08, at - 0.02], [-8, 0]);

  // Box above the point
  const boxW = 170;
  const boxH = 54;
  const boxX = Math.min(Math.max(px - boxW / 2, padL + 20), W - padR - boxW - 20);
  const boxY = Math.max(py - 100, padT - 20);

  return (
    <motion.g style={{ opacity, y: ty }}>
      {/* Leader line */}
      <line
        x1={boxX + boxW / 2}
        y1={boxY + boxH + 4}
        x2={px}
        y2={py - 14}
        stroke="#FFFFFF"
        strokeOpacity="0.35"
        strokeWidth="1.5"
        strokeDasharray="3 4"
      />
      {/* Target marker */}
      <circle cx={px} cy={py} r="10" fill="none" stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="2" />
      {/* Box */}
      <rect
        x={boxX}
        y={boxY}
        rx="10"
        ry="10"
        width={boxW}
        height={boxH}
        fill="#0A0F1C"
        stroke="#FFFFFF"
        strokeOpacity="0.12"
      />
      <text
        x={boxX + 14}
        y={boxY + 22}
        fontSize="14"
        fontWeight="600"
        fontFamily="ui-sans-serif, system-ui"
        fill="#FFFFFF"
      >
        {title}
      </text>
      <text
        x={boxX + 14}
        y={boxY + 40}
        fontSize="12"
        fontFamily="ui-sans-serif, system-ui"
        fill="#FFFFFF"
        fillOpacity="0.55"
      >
        {sub}
      </text>
    </motion.g>
  );
}
