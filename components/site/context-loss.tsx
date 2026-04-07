import Image from "next/image";
import {
  SiSlack,
  SiGmail,
  SiHubspot,
  SiNotion,
  SiGooglesheets,
  SiSalesforce,
  SiOpenai,
  SiLinear,
  SiZoom,
  SiAsana,
} from "react-icons/si";
import type { IconType } from "react-icons";
import { SectionLabel } from "./section-label";

function Badge({
  icon: Icon,
  color,
  className = "",
}: {
  icon: IconType;
  color: string;
  className?: string;
}) {
  return (
    <div
      className={`flex h-11 w-11 items-center justify-center rounded-[12px] border border-black/5 bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.25)] ${className}`}
    >
      <Icon className="h-[22px] w-[22px]" style={{ color }} />
    </div>
  );
}

function Bubble({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-full border border-black/5 bg-white px-4 py-2 text-[13px] text-fg shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)] ${className}`}
    >
      {children}
    </div>
  );
}

const cards = [
  {
    label: "TOOL SPRAWL",
    title: "Your stack is the bottleneck",
    body: "Slack, HubSpot, Notion, Sheets, Gmail. Every team bought their own SaaS and now nothing talks. Nexin wires them together so context flows where it has to.",
    stat: "14+",
    statSuffix: "tools, zero glue",
  },
  {
    label: "COLD PIPELINE",
    title: "Lead gen without the grind",
    body: "Lists go stale. Templates flop. Reps burn out. Nexin runs the find → enrich → reach → book loop on autopilot — your calendar fills while you sleep.",
    stat: "<2%",
    statSuffix: "industry reply rate",
  },
  {
    label: "AI WITHOUT CONTEXT",
    title: "AI that actually sees the work",
    body: "Generic copilots can't fix what they never see. Nexin gives AI the wiring it needs — your data, your tools, your outcomes — so it ships work, not suggestions.",
    stat: "96%",
    statSuffix: "of AI projects stall",
  },
];

export function ContextLoss() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      {/* Subtle texture */}
      <div className="pointer-events-none absolute inset-0 bg-grid-light opacity-50 [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]" />

      <div className="container relative">
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex justify-center">
            <SectionLabel>The cost of doing nothing</SectionLabel>
          </div>
          <h2 className="mt-8 text-balance font-display text-display-sm font-semibold sm:text-display-md md:text-display-lg">
            <span className="text-blue">60%</span> of revenue
            <br />
            is lost in{" "}
            <span className="font-serif italic text-fg">handoffs</span> —
            <br />
            and AI can&apos;t fix what it never sees.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-[18px] leading-[1.55] text-muted-fg">
            Tool sprawl is killing context. Context decay is killing pipeline.
            Pipeline decay is killing the quarter. Sound familiar?
          </p>
        </div>

        {/* Tangled cable visual — Gemini-rendered hero asset */}
        <div className="relative mx-auto mt-10 max-w-[1200px]">
          <div className="relative aspect-[1704/624] w-full">
            <Image
              src="/tangled-cable.png"
              alt="Tangled workflows knotted across your stack"
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="select-none object-contain object-center mix-blend-multiply [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
              style={{
                filter:
                  "drop-shadow(0 24px 30px rgba(15,23,42,0.18)) drop-shadow(0 6px 10px rgba(15,23,42,0.08))",
              }}
            />

            {/* Left knot — comms + GTM tools */}
            <div className="absolute left-[7%] top-[16%] hidden items-center gap-2 sm:flex">
              <Badge icon={SiZoom} color="#0B5CFF" />
              <Badge icon={SiAsana} color="#F06A6A" className="-ml-3 mt-7" />
            </div>
            <div className="absolute left-[4%] top-[54%] hidden items-center gap-2 sm:flex">
              <Badge icon={SiSlack} color="#E01E5A" />
              <Badge icon={SiGooglesheets} color="#0F9D58" className="-ml-2 -mt-5" />
              <Badge icon={SiHubspot} color="#FF7A59" className="-ml-2 mt-4" />
            </div>

            {/* Middle knot — data + AI */}
            <div className="absolute left-[46%] top-[12%] hidden sm:block">
              <Badge icon={SiNotion} color="#0A0A0A" />
            </div>
            <div className="absolute left-[42%] top-[40%] hidden items-center gap-2 sm:flex">
              <Badge icon={SiOpenai} color="#0A0A0A" />
              <Badge icon={SiSalesforce} color="#00A1E0" className="-ml-2 -mt-5" />
            </div>
            <div className="absolute left-[50%] top-[64%] hidden sm:block">
              <Badge icon={SiLinear} color="#5E6AD2" />
            </div>
            <div className="absolute left-[38%] top-[60%] hidden sm:block">
              <Badge icon={SiGmail} color="#EA4335" />
            </div>

            {/* Right knot — thought bubbles */}
            <Bubble className="absolute right-[14%] top-[18%] hidden rotate-[-2deg] sm:block">
              Where&apos;s that file?
            </Bubble>
            <Bubble className="absolute right-[2%] top-[38%] hidden rotate-[1deg] sm:block">
              Did anyone follow up?
            </Bubble>
            <Bubble className="absolute right-[10%] top-[60%] hidden rotate-[-1deg] sm:block">
              Is this the latest?
            </Bubble>
          </div>
        </div>

        {/* Three pillar columns tied to the knots above */}
        <div className="mx-auto mt-4 grid max-w-[1200px] gap-10 md:grid-cols-3 md:gap-6">
          {cards.map((c) => (
            <div key={c.title} className="relative px-4 sm:px-6">
              <div className="mx-auto h-10 w-px bg-line-strong/60" />
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-blue">
                {c.label}
              </p>
              <h3 className="mt-3 font-display text-[30px] font-semibold tracking-[-0.04em] text-fg sm:text-[34px]">
                {c.title}
              </h3>
              <p className="mt-3 text-pretty text-[15px] leading-[1.55] text-muted-fg">
                {c.body}
              </p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-display text-[40px] font-semibold leading-none tracking-[-0.04em] text-fg">
                  {c.stat}
                </span>
                <span className="text-[12px] text-muted-fg">
                  {c.statSuffix}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
