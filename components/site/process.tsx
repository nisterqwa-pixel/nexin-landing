import { SectionLabel } from "./section-label";

const steps = [
  {
    n: "01",
    label: "AUDIT",
    title: "We map your workflow.",
    body: "One week. Every tool, every handoff, every leak. You leave with an ROI model — even if you never hire us.",
    deliverable: "ROI Model · Workflow Map",
    duration: "Week 1",
  },
  {
    n: "02",
    label: "ARCHITECT",
    title: "We design the system.",
    body: "Spec, diagrams, success metrics. Approved by you before a single workflow gets shipped.",
    deliverable: "Spec · Approval Gate",
    duration: "Week 2",
  },
  {
    n: "03",
    label: "AUTOMATE",
    title: "We ship in 30 days.",
    body: "Two-week sprints. Working software, not slideware. Your team is in the loop the whole way.",
    deliverable: "Working System",
    duration: "Weeks 3-6",
  },
  {
    n: "04",
    label: "ITERATE",
    title: "We compound the wins.",
    body: "Monthly retro, monthly upgrade. Automation is a flywheel — and we keep yours spinning faster.",
    deliverable: "Monthly Upgrade",
    duration: "Ongoing",
  },
];

export function Process() {
  return (
    <section id="process" className="relative bg-fg py-28 text-bg sm:py-36">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-bg/60">
              <span className="text-blue">04</span>
              <span className="h-px w-8 bg-bg/30" />
              <span>How we work</span>
            </div>
          </div>
          <h2 className="mt-6 text-balance font-display text-display-xs font-semibold tracking-tight sm:text-display-sm md:text-display-md">
            Audit. Architect.
            <br />
            Automate.{" "}
            <span className="font-serif italic text-blue">Iterate.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-pretty text-[17px] leading-[1.6] text-bg/60">
            Four phases. No fluff. No discovery decks that gather dust. We move
            from kickoff to shipped system in under 30 days.
          </p>
        </div>

        <div className="mt-20 overflow-hidden rounded-3xl border border-bg/15">
          {steps.map(({ n, label, title, body, deliverable, duration }, idx) => (
            <div
              key={n}
              className={`group grid items-center gap-6 px-7 py-8 transition-colors hover:bg-bg/[0.03] sm:grid-cols-[80px_1fr_220px_140px] sm:px-10 sm:py-10 ${
                idx !== steps.length - 1 ? "border-b border-bg/15" : ""
              }`}
            >
              <div className="font-display text-[44px] font-semibold leading-none tracking-tight text-bg/30 transition-colors group-hover:text-blue sm:text-[56px]">
                {n}
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-blue">
                  {label}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold tracking-[-0.035em] text-bg sm:text-[28px]">
                  {title}
                </h3>
                <p className="mt-2 max-w-[55ch] text-[15px] leading-[1.55] text-bg/55">
                  {body}
                </p>
              </div>
              <div className="hidden text-[13px] text-bg/50 sm:block">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-bg/40">
                  Deliverable
                </p>
                <p className="mt-1.5 text-bg/80">{deliverable}</p>
              </div>
              <div className="hidden text-right sm:block">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-bg/60">
                  {duration}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
