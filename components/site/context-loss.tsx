import Image from "next/image";
import { SectionLabel } from "./section-label";

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
        <div className="relative mx-auto mt-16 max-w-[1200px]">
          <div className="relative aspect-[1704/624] w-full">
            <Image
              src="/tangled-cable.png"
              alt="Tangled workflows knotted across your stack"
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="select-none object-contain object-center mix-blend-multiply"
            />

            {/* Floating thought bubbles around the chaos */}
            <div className="absolute left-[6%] top-[8%] hidden rotate-[-3deg] rounded-2xl rounded-bl-sm border-hair bg-bg px-4 py-2 text-[12px] text-muted-fg shadow-lg sm:block">
              Where&apos;s that file?
            </div>
            <div className="absolute right-[6%] top-[12%] hidden rotate-[2deg] rounded-2xl rounded-br-sm border-hair bg-bg px-4 py-2 text-[12px] text-muted-fg shadow-lg sm:block">
              Did anyone follow up?
            </div>
            <div className="absolute left-[10%] bottom-[6%] hidden rotate-[2deg] rounded-2xl rounded-bl-sm border-hair bg-bg px-4 py-2 text-[12px] text-muted-fg shadow-lg sm:block">
              Is this the latest version?
            </div>
            <div className="absolute right-[8%] bottom-[8%] hidden rotate-[-2deg] rounded-2xl rounded-br-sm border-hair bg-bg px-4 py-2 text-[12px] text-muted-fg shadow-lg sm:block">
              What did the client say again?
            </div>
          </div>
        </div>

        {/* Three pillar cards */}
        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border-hair bg-line md:grid-cols-3">
          {cards.map((c) => (
            <div
              key={c.title}
              className="group relative bg-bg p-8 transition-colors hover:bg-cream/40 sm:p-10"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-blue">
                {c.label}
              </p>
              <h3 className="mt-3 font-display text-3xl font-semibold tracking-[-0.04em] text-fg sm:text-[34px]">
                {c.title}
              </h3>
              <p className="mt-4 text-pretty text-[15px] leading-[1.55] text-muted-fg">
                {c.body}
              </p>
              <div className="mt-8 flex items-baseline gap-2 border-t-hair pt-6">
                <span className="font-display text-[44px] font-semibold leading-none tracking-[-0.04em] text-fg">
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
