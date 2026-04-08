"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

// ----- Layout constants (viewBox space) -----
const W = 1000;
const H = 560;
const padL = 90;
const padR = 60;
const padT = 70;
const padB = 90;
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

// Annotation: appears at given scroll progress window
type Annotation = {
  at: number; // scroll progress [0,1]
  idx: number; // which data point to pin to
  title: string;
  sub: string;
  side: "left" | "right" | "top";
};

const annotations: Annotation[] = [
  {
    at: 0.25,
    idx: 2,
    title: "Week 2",
    sub: "Nexin goes live. First meetings landing.",
    side: "top",
  },
  {
    at: 0.5,
    idx: 5,
    title: "Week 5",
    sub: "Close rate catches up. Outbound compounds.",
    side: "top",
  },
  {
    at: 0.78,
    idx: 9,
    title: "Week 9",
    sub: "Pipeline 4× the manual baseline.",
    side: "top",
  },
];

export function GrowthStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Core drawing progress runs across scroll 0 → 0.85, then pin at full
  const draw = useTransform(scrollYProgress, [0.05, 0.85], [0, 1]);
  const areaOpacity = useTransform(scrollYProgress, [0.3, 0.85], [0, 0.45]);

  return (
    <section
      ref={ref}
      className="relative bg-bg"
      style={{ height: "340vh" }}
      aria-label="Growth story"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="container relative">
          <div className="grid items-center gap-10 lg:grid-cols-[380px_1fr] lg:gap-14">
            {/* Left — editorial copy */}
            <div className="max-w-md">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-blue">
                <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-blue align-middle" />
                Scroll to see it happen
              </p>
              <h2 className="mt-5 font-display text-[44px] font-semibold leading-[0.95] tracking-[-0.055em] text-fg sm:text-[56px]">
                Sixty days.
                <br />
                Same team.
                <br />
                <span className="relative inline-block">
                  <span className="relative z-10 font-serif italic text-fg">
                    Different curve.
                  </span>
                  <motion.span
                    aria-hidden
                    className="absolute inset-x-[-4px] bottom-[6px] -z-0 h-[18px] rounded-sm bg-blue/80"
                    style={{
                      scaleX: useTransform(
                        scrollYProgress,
                        [0.15, 0.35],
                        [0, 1],
                      ),
                      transformOrigin: "left center",
                    }}
                  />
                </span>
              </h2>
              <p className="mt-6 max-w-sm text-[16px] leading-[1.55] text-muted-fg">
                Two identical B2B teams. Same ICP. Same budget. One runs the
                old manual motion. The other ships Nexin in week one.
              </p>

              <div className="mt-8 flex items-center gap-6">
                <div className="flex items-center gap-2 text-[12px]">
                  <span className="h-[3px] w-8 rounded bg-blue" />
                  <span className="font-medium text-fg">With Nexin</span>
                </div>
                <div className="flex items-center gap-2 text-[12px]">
                  <span className="h-[2px] w-8 rounded border-t-2 border-dashed border-slate-400" />
                  <span className="text-muted-fg">Without</span>
                </div>
              </div>
            </div>

            {/* Right — chart */}
            <div className="relative">
              <svg
                viewBox={`0 0 ${W} ${H}`}
                className="w-full"
                role="img"
                aria-label="Pipeline growth over 12 weeks"
              >
                <defs>
                  <linearGradient id="gs-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1F44FF" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#1F44FF" stopOpacity="0" />
                  </linearGradient>
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

                {/* Y grid + ticks */}
                {[0, 80, 160, 240, 320].map((v) => (
                  <g key={v}>
                    <line
                      x1={padL}
                      x2={W - padR}
                      y1={y(v)}
                      y2={y(v)}
                      stroke="#0A0A0A"
                      strokeOpacity="0.08"
                      strokeDasharray="3 5"
                    />
                    <text
                      x={padL - 16}
                      y={y(v) + 5}
                      textAnchor="end"
                      fontSize="16"
                      fontFamily="ui-monospace, monospace"
                      fill="#0A0A0A"
                      fillOpacity="0.45"
                    >
                      {v}
                    </text>
                  </g>
                ))}

                {/* Baseline */}
                <line
                  x1={padL}
                  x2={W - padR}
                  y1={y(0)}
                  y2={y(0)}
                  stroke="#0A0A0A"
                  strokeOpacity="0.35"
                  strokeWidth="1.5"
                />

                {/* X ticks */}
                {[0, 2, 4, 6, 8, 10].map((i) => (
                  <g key={i}>
                    <line
                      x1={x(i)}
                      x2={x(i)}
                      y1={y(0)}
                      y2={y(0) + 6}
                      stroke="#0A0A0A"
                      strokeOpacity="0.35"
                    />
                    <text
                      x={x(i)}
                      y={y(0) + 26}
                      textAnchor="middle"
                      fontSize="16"
                      fontFamily="ui-monospace, monospace"
                      fill="#0A0A0A"
                      fillOpacity="0.5"
                    >
                      W{i + 1}
                    </text>
                  </g>
                ))}

                {/* Y axis label */}
                <text
                  x={padL - 70}
                  y={padT + innerH / 2}
                  textAnchor="middle"
                  fontSize="14"
                  fontFamily="ui-monospace, monospace"
                  fill="#0A0A0A"
                  fillOpacity="0.5"
                  transform={`rotate(-90, ${padL - 70}, ${padT + innerH / 2})`}
                >
                  QUALIFIED MEETINGS
                </text>

                <g clipPath="url(#gs-reveal)">
                  {/* Without — dashed grey */}
                  <path
                    d={withoutPath}
                    fill="none"
                    stroke="#94A3B8"
                    strokeWidth="3"
                    strokeDasharray="6 7"
                    strokeLinecap="round"
                  />

                  {/* With Nexin — bold blue + area */}
                  <motion.path
                    d={`${nexinPath} L ${x(weeks - 1)} ${y(0)} L ${x(0)} ${y(0)} Z`}
                    fill="url(#gs-area)"
                    style={{ opacity: areaOpacity }}
                  />
                  <path
                    d={nexinPath}
                    fill="none"
                    stroke="#1F44FF"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                {/* Leading pulse dot on Nexin line, position tied to scroll */}
                <LeadingDot draw={draw} />

                {/* Annotations */}
                {annotations.map((a, i) => (
                  <Annotation
                    key={i}
                    annotation={a}
                    scrollYProgress={scrollYProgress}
                  />
                ))}
              </svg>
            </div>
          </div>
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
  const opacity = useTransform(draw, [0, 0.02, 0.98, 1], [0, 1, 1, 0]);

  return (
    <g>
      <motion.circle
        cx={cx}
        cy={cy}
        r="16"
        fill="#1F44FF"
        opacity="0.2"
        style={{ opacity: useTransform(opacity, (v) => v * 0.25) }}
      />
      <motion.circle
        cx={cx}
        cy={cy}
        r="7"
        fill="#1F44FF"
        style={{ opacity }}
      />
      <motion.circle
        cx={cx}
        cy={cy}
        r="3"
        fill="#FFFFFF"
        style={{ opacity }}
      />
    </g>
  );
}

function Annotation({
  annotation,
  scrollYProgress,
}: {
  annotation: Annotation;
  scrollYProgress: MotionValue<number>;
}) {
  const { at, idx, title, sub } = annotation;
  const opacity = useTransform(
    scrollYProgress,
    [at - 0.06, at - 0.02, at + 0.22, at + 0.3],
    [0, 1, 1, 0.7],
  );
  const ty = useTransform(
    scrollYProgress,
    [at - 0.06, at - 0.02],
    [-8, 0],
  );

  const px = x(idx);
  const py = y(nexinData[idx]);

  // Place callout above the point
  const boxW = 210;
  const boxH = 58;
  const boxX = Math.min(Math.max(px - boxW / 2, 80), W - boxW - 40);
  const boxY = Math.max(py - 110, 20);

  return (
    <motion.g style={{ opacity, y: ty }}>
      {/* Leader line from box to point */}
      <line
        x1={boxX + boxW / 2}
        y1={boxY + boxH + 4}
        x2={px}
        y2={py - 14}
        stroke="#0A0A0A"
        strokeOpacity="0.4"
        strokeWidth="1.5"
        strokeDasharray="3 4"
      />
      {/* Point marker circle */}
      <circle
        cx={px}
        cy={py}
        r="10"
        fill="none"
        stroke="#0A0A0A"
        strokeWidth="2"
      />
      <circle cx={px} cy={py} r="4" fill="#0A0A0A" />

      {/* Callout box */}
      <rect
        x={boxX}
        y={boxY}
        rx="10"
        ry="10"
        width={boxW}
        height={boxH}
        fill="#FFFFFF"
        stroke="#0A0A0A"
        strokeOpacity="0.2"
      />
      <text
        x={boxX + 14}
        y={boxY + 24}
        fontSize="15"
        fontWeight="600"
        fontFamily="ui-sans-serif, system-ui"
        fill="#0A0A0A"
      >
        {title}
      </text>
      <text
        x={boxX + 14}
        y={boxY + 44}
        fontSize="13"
        fontFamily="ui-sans-serif, system-ui"
        fill="#0A0A0A"
        fillOpacity="0.6"
      >
        {sub}
      </text>
    </motion.g>
  );
}
