import {
  Slack,
  Mail,
  Database,
  FileSpreadsheet,
  MessageCircle,
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  Box,
} from "lucide-react";

const inputs = [
  { icon: Slack, label: "Slack" },
  { icon: Mail, label: "Gmail" },
  { icon: Database, label: "HubSpot" },
  { icon: FileSpreadsheet, label: "Sheets" },
  { icon: MessageCircle, label: "Notion" },
];

const outputs = [
  { icon: Calendar, label: "Meetings booked", color: "#3B82F6" },
  { icon: Users, label: "Pipeline created", color: "#F59E0B" },
  { icon: TrendingUp, label: "Reports shipped", color: "#10B981" },
  { icon: DollarSign, label: "Revenue closed", color: "#EF4444" },
];

export function Framework() {
  return (
    <section className="relative overflow-hidden border-y-hair bg-fg py-28 text-bg sm:py-36">
      {/* subtle dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* radial blue glow */}
      <div className="pointer-events-none absolute left-1/3 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue/[0.18] blur-[120px]" />

      <div className="container relative">
        <div className="grid items-center gap-16 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
          {/* Node graph diagram */}
          <div className="relative">
            <div className="relative mx-auto aspect-[5/4] max-w-xl">
              <svg
                viewBox="0 0 500 400"
                className="absolute inset-0 h-full w-full"
                fill="none"
              >
                <defs>
                  {/* gradient strokes */}
                  <linearGradient id="line-blue" x1="0" x2="1">
                    <stop offset="0" stopColor="#3B82F6" stopOpacity="0.2" />
                    <stop offset="0.5" stopColor="#3B82F6" stopOpacity="1" />
                    <stop offset="1" stopColor="#3B82F6" stopOpacity="0.6" />
                  </linearGradient>
                  <linearGradient id="line-amber" x1="0" x2="1">
                    <stop offset="0" stopColor="#F59E0B" stopOpacity="0.2" />
                    <stop offset="0.5" stopColor="#F59E0B" stopOpacity="1" />
                    <stop offset="1" stopColor="#F59E0B" stopOpacity="0.6" />
                  </linearGradient>
                  <linearGradient id="line-green" x1="0" x2="1">
                    <stop offset="0" stopColor="#10B981" stopOpacity="0.2" />
                    <stop offset="0.5" stopColor="#10B981" stopOpacity="1" />
                    <stop offset="1" stopColor="#10B981" stopOpacity="0.6" />
                  </linearGradient>
                  <linearGradient id="line-red" x1="0" x2="1">
                    <stop offset="0" stopColor="#EF4444" stopOpacity="0.2" />
                    <stop offset="0.5" stopColor="#EF4444" stopOpacity="1" />
                    <stop offset="1" stopColor="#EF4444" stopOpacity="0.6" />
                  </linearGradient>
                  {/* Input lines (greys) */}
                  <linearGradient id="line-input" x1="0" x2="1">
                    <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.15" />
                    <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.5" />
                  </linearGradient>
                </defs>

                {/* Input lines from left column to hub */}
                {[60, 130, 200, 270, 340].map((y, i) => (
                  <path
                    key={`in-${i}`}
                    d={`M 70 ${y} L 220 200`}
                    stroke="url(#line-input)"
                    strokeWidth="1.5"
                  />
                ))}

                {/* Output curved lines from hub to right */}
                <path
                  d="M 280 200 C 360 200, 360 70, 440 70"
                  stroke="url(#line-blue)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M 280 200 C 360 200, 360 158, 440 158"
                  stroke="url(#line-amber)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M 280 200 C 360 200, 360 246, 440 246"
                  stroke="url(#line-green)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M 280 200 C 360 200, 360 334, 440 334"
                  stroke="url(#line-red)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Central hub: large rounded square with N */}
                <rect
                  x="220"
                  y="160"
                  width="80"
                  height="80"
                  rx="22"
                  fill="#FFFFFF"
                />
                <rect
                  x="220"
                  y="160"
                  width="80"
                  height="80"
                  rx="22"
                  fill="hsl(232 92% 54%)"
                  fillOpacity="0.08"
                />
                {/* N glyph */}
                <text
                  x="260"
                  y="218"
                  textAnchor="middle"
                  fill="#0A0A0A"
                  fontFamily="var(--font-geist-sans), system-ui"
                  fontSize="42"
                  fontWeight="700"
                  letterSpacing="-0.05em"
                >
                  N
                </text>
                {/* small ping dot */}
                <circle cx="290" cy="170" r="4" fill="hsl(232 92% 54%)">
                  <animate
                    attributeName="opacity"
                    values="1;0.3;1"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>

              {/* Input column (positioned absolutely) */}
              <div className="absolute left-0 top-0 flex h-full w-[14%] flex-col justify-between py-[5%]">
                {inputs.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-bg/15 bg-bg/[0.04] text-bg/80 backdrop-blur"
                    title={label}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </div>
                ))}
              </div>

              {/* Output column with labels */}
              <div className="absolute right-0 top-0 flex h-full flex-col justify-between py-[10%]">
                {outputs.map(({ icon: Icon, label, color }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-2xl border border-bg/15 bg-bg/[0.04] backdrop-blur"
                      style={{ color }}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </div>
                    <span className="hidden font-mono text-[11px] uppercase tracking-[0.14em] text-bg/70 sm:block">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Copy */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-bg/15 bg-bg/[0.04] px-3 py-1.5 backdrop-blur">
              <Box className="h-3.5 w-3.5 text-blue" />
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-bg/80">
                Outcome-Defined Automation
              </span>
            </div>
            <h2 className="mt-8 text-balance font-display text-display-xs font-semibold leading-[0.95] tracking-[-0.05em] sm:text-display-sm md:text-display-md">
              <span className="text-bg">From your existing stack</span>
              <br />
              <span className="font-serif italic text-blue">to outcomes</span>
              <span className="text-bg">,</span>
              <br />
              <span className="text-bg">in one architecture.</span>
            </h2>
            <p className="mt-8 max-w-lg text-pretty text-[17px] leading-[1.6] text-bg/55">
              Nexin sits between the tools you already pay for and the outcomes
              you actually want. We don&apos;t replace your stack — we make it
              work like it was always supposed to. Meetings, pipeline, reports,
              revenue. Wired to fire on its own.
            </p>

            {/* mini stat row */}
            <div className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-bg/15">
              {[
                { v: "30 days", l: "from kickoff to live" },
                { v: "500+", l: "tool integrations" },
                { v: "0", l: "tools to rip out" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="bg-bg/[0.02] p-5 backdrop-blur"
                >
                  <p className="font-display text-2xl font-semibold tracking-tight text-bg sm:text-[28px]">
                    {s.v}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-bg/50">
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
