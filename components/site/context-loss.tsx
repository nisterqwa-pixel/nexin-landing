import Image from "next/image";
import {
  Slack,
  Video,
  Trello,
  Grid3x3,
  Users,
  Sparkles,
  Bot,
  Globe,
  MessageSquare,
} from "lucide-react";
import { SectionLabel } from "./section-label";

function Badge({
  icon: Icon,
  color,
  className = "",
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  color: string;
  className?: string;
}) {
  return (
    <div
      className={`flex h-11 w-11 items-center justify-center rounded-[12px] border border-black/5 bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.25)] ${className}`}
    >
      <Icon className="h-5 w-5" strokeWidth={1.8} style={{ color }} />
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
    label: "MANUAL DRUDGERY",
    title: "Context Switching",
    body: "Your best people are flipping between 14 tabs an hour, leaking attention and momentum every single context switch.",
    stat: "23h",
    statSuffix: "/ wk wasted",
  },
  {
    label: "COLD PIPELINE",
    title: "Lost Signal",
    body: "Lists go stale. Templates flop. Replies trickle in. Your forecast lives on hope and one big deal that might close.",
    stat: "<2%",
    statSuffix: "reply rates",
  },
  {
    label: "TOOL SPRAWL",
    title: "Stack Stitching",
    body: "Every team bought their own SaaS. Nothing syncs. Reporting is a graveyard of CSVs glued together at midnight.",
    stat: "14+",
    statSuffix: "tools, no glue",
  },
];

export function ContextLoss() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
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
          <p className="mx-auto mt-8 max-w-xl text-pretty text-[18px] leading-[1.55] text-muted-fg">
            Tool sprawl is killing context. Context decay is killing pipeline.
            Pipeline decay is killing the quarter. Sound familiar?
          </p>
        </div>

        {/* Tangled cable visual — Gemini-rendered hero asset */}
        <div className="relative mx-auto mt-20 max-w-[1200px]">
          <div className="relative aspect-[1704/624] w-full">
            <Image
              src="/tangled-cable.png"
              alt="Tangled workflows knotted across your stack"
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="select-none object-contain object-center mix-blend-multiply"
            />

            {/* Left knot — tool badges cluster */}
            <div className="absolute left-[8%] top-[18%] hidden items-center gap-2 sm:flex">
              <Badge icon={Video} color="#2D8CFF" />
              <Badge icon={Trello} color="#0079BF" className="-ml-3 mt-6" />
            </div>
            <div className="absolute left-[5%] top-[52%] hidden items-center gap-2 sm:flex">
              <Badge icon={Slack} color="#E01E5A" />
              <Badge icon={Grid3x3} color="#FBBC05" className="-ml-2 -mt-4" />
              <Badge icon={Users} color="#6264A7" className="-ml-2 mt-3" />
            </div>

            {/* Middle knot — AI tool badges */}
            <div className="absolute left-[46%] top-[14%] hidden sm:block">
              <Badge icon={Sparkles} color="#1A73E8" />
            </div>
            <div className="absolute left-[42%] top-[40%] hidden items-center gap-2 sm:flex">
              <Badge icon={Bot} color="#FF6F00" />
              <Badge icon={Globe} color="#10A37F" className="-ml-2 -mt-5" />
            </div>
            <div className="absolute left-[50%] top-[62%] hidden sm:block">
              <Badge icon={MessageSquare} color="#0A0A0A" />
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
