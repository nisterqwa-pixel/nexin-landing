"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

type Series = {
  label: string;
  color: string;
  values: number[];
  fillId?: string;
  dashed?: boolean;
};

export function AnimatedAreaChart({
  series,
  xLabels,
  height = 280,
  yTicks = 4,
  yMax,
  className = "",
  showDots = true,
  showAxis = true,
  ariaLabel = "chart",
}: {
  series: Series[];
  xLabels: string[];
  height?: number;
  yTicks?: number;
  yMax?: number;
  className?: string;
  showDots?: boolean;
  showAxis?: boolean;
  ariaLabel?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  // Layout
  const W = 800;
  const H = height;
  const padL = showAxis ? 56 : 16;
  const padR = 16;
  const padT = 24;
  const padB = showAxis ? 36 : 16;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;

  const allValues = series.flatMap((s) => s.values);
  const max = yMax ?? Math.max(...allValues) * 1.1;
  const xCount = Math.max(...series.map((s) => s.values.length)) - 1 || 1;

  function pointFor(s: Series, i: number) {
    const x = padL + (i / xCount) * innerW;
    const y = padT + innerH - (s.values[i] / max) * innerH;
    return [x, y] as const;
  }

  function pathFor(s: Series) {
    // Smooth path using catmull-rom-ish cubic interpolation
    const pts = s.values.map((_, i) => pointFor(s, i));
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

  function areaFor(s: Series) {
    const path = pathFor(s);
    if (!path) return "";
    const last = pointFor(s, s.values.length - 1);
    const first = pointFor(s, 0);
    return `${path} L ${last[0]} ${padT + innerH} L ${first[0]} ${padT + innerH} Z`;
  }

  const yTickValues = Array.from({ length: yTicks + 1 }, (_, i) =>
    Math.round((max / yTicks) * i),
  );

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      role="img"
      aria-label={ariaLabel}
    >
      <defs>
        {series.map((s, idx) => (
          <linearGradient
            key={`g-${idx}`}
            id={`area-${s.fillId ?? idx}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor={s.color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={s.color} stopOpacity="0" />
          </linearGradient>
        ))}
      </defs>

      {/* Y grid lines + labels */}
      {showAxis &&
        yTickValues.map((v, i) => {
          const y = padT + innerH - (i / yTicks) * innerH;
          return (
            <g key={`yt-${i}`}>
              <motion.line
                x1={padL}
                x2={W - padR}
                y1={y}
                y2={y}
                stroke="currentColor"
                strokeOpacity="0.08"
                strokeDasharray="3 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.05 }}
              />
              <motion.text
                x={padL - 12}
                y={y + 4}
                textAnchor="end"
                fontSize="11"
                className="fill-current opacity-50"
                fontFamily="ui-monospace, monospace"
                initial={{ opacity: 0, x: padL - 20 }}
                animate={inView ? { opacity: 0.5, x: padL - 12 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.05 }}
              >
                {v.toLocaleString()}
              </motion.text>
            </g>
          );
        })}

      {/* X labels */}
      {showAxis &&
        xLabels.map((label, i) => {
          const x = padL + (i / (xLabels.length - 1 || 1)) * innerW;
          return (
            <motion.text
              key={`xl-${i}`}
              x={x}
              y={H - padB + 22}
              textAnchor="middle"
              fontSize="11"
              className="fill-current opacity-50"
              fontFamily="ui-monospace, monospace"
              initial={{ opacity: 0, y: H - padB + 30 }}
              animate={inView ? { opacity: 0.5, y: H - padB + 22 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.04 }}
            >
              {label}
            </motion.text>
          );
        })}

      {/* Baseline x-axis */}
      {showAxis && (
        <motion.line
          x1={padL}
          x2={W - padR}
          y1={padT + innerH}
          y2={padT + innerH}
          stroke="currentColor"
          strokeOpacity="0.25"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        />
      )}

      {/* Areas */}
      {series.map((s, idx) => (
        <motion.path
          key={`a-${idx}`}
          d={areaFor(s)}
          fill={`url(#area-${s.fillId ?? idx})`}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.2 + idx * 0.2 }}
        />
      ))}

      {/* Lines */}
      {series.map((s, idx) => (
        <motion.path
          key={`l-${idx}`}
          d={pathFor(s)}
          fill="none"
          stroke={s.color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={s.dashed ? "6 6" : undefined}
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{
            duration: 1.6,
            delay: 0.4 + idx * 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      ))}

      {/* Dots on the latest series only */}
      {showDots &&
        series.length > 0 &&
        series[series.length - 1].values.map((_, i) => {
          const s = series[series.length - 1];
          const [x, y] = pointFor(s, i);
          return (
            <motion.g key={`d-${i}`}>
              <motion.circle
                cx={x}
                cy={y}
                r="4"
                fill="#fff"
                stroke={s.color}
                strokeWidth="2.5"
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{
                  duration: 0.4,
                  delay: 1.4 + (i / s.values.length) * 1.2,
                  type: "spring",
                  stiffness: 220,
                  damping: 16,
                }}
              />
            </motion.g>
          );
        })}

      {/* Pulsing latest dot */}
      {showDots &&
        series.length > 0 &&
        (() => {
          const s = series[series.length - 1];
          const [x, y] = pointFor(s, s.values.length - 1);
          return (
            <g>
              <motion.circle
                cx={x}
                cy={y}
                r="8"
                fill={s.color}
                opacity="0.25"
                animate={
                  inView
                    ? {
                        r: [8, 16, 8],
                        opacity: [0.35, 0, 0.35],
                      }
                    : {}
                }
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 2.8,
                  ease: "easeOut",
                }}
              />
            </g>
          );
        })()}
    </svg>
  );
}

export function AnimatedNumber({
  to,
  duration = 1.6,
  delay = 0,
  className = "",
  format = (v: number) => Math.round(v).toLocaleString(),
}: {
  to: number;
  duration?: number;
  delay?: number;
  className?: string;
  format?: (v: number) => string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => c.stop();
  }, [inView, to, duration, delay]);
  return (
    <span ref={ref} className={className}>
      {format(val)}
    </span>
  );
}
