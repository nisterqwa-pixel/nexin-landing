import { Hourglass, MailX, Layers } from "lucide-react";

const problems = [
  {
    label: "MANUAL DRUDGERY",
    icon: Hourglass,
    title: "Your best people are doing robot work.",
    body: "SDRs copy-pasting from sheets. Ops chasing statuses in Slack. Hours of human attention burned on tasks a system should own.",
    stat: "23 hrs/wk",
    statLabel: "wasted per employee",
  },
  {
    label: "COLD PIPELINES",
    icon: MailX,
    title: "Your pipeline is a flat line.",
    body: "Outbound feels like guesswork. Lists go stale. Replies trickle in. Your forecast lives on hope and one big deal that might close.",
    stat: "<2%",
    statLabel: "average reply rate",
  },
  {
    label: "TOOL SPRAWL",
    icon: Layers,
    title: "Your stack is 14 tools that don't talk.",
    body: "Every team bought their own SaaS. Nothing syncs. Reporting is a Frankenstein of CSVs. AI is bolted on, not built in.",
    stat: "14+",
    statLabel: "disconnected tools",
  },
];

export function Problem() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-amber-400/80">
            // The cost of doing nothing
          </p>
          <h2 className="text-balance text-4xl font-semibold tracking-tighter sm:text-5xl md:text-6xl">
            You&apos;re paying $200k a year
            <br />
            for work a machine should do.
          </h2>
          <p className="mt-6 text-balance text-lg text-muted-foreground">
            Most companies don&apos;t have a strategy problem. They have an
            execution problem — and the bottleneck is human bandwidth.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          {problems.map(({ label, icon: Icon, title, body, stat, statLabel }) => (
            <div
              key={label}
              className="group relative bg-background p-8 transition-colors hover:bg-muted/30"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {label}
                </span>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <h3 className="text-balance text-xl font-semibold tracking-tight">
                {title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">{body}</p>
              <div className="mt-8 flex items-baseline gap-2 border-t border-border pt-6">
                <span className="text-3xl font-semibold tracking-tight text-amber-400">
                  {stat}
                </span>
                <span className="text-xs text-muted-foreground">
                  {statLabel}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
