import {
  Search,
  Sparkles,
  Send,
  CalendarCheck,
  ArrowRight,
} from "lucide-react";
import { SectionLabel } from "./section-label";
import Link from "next/link";

const pipeline = [
  {
    n: "01",
    icon: Search,
    label: "FIND",
    title: "Pinpoint your buyers",
    body: "We profile your ICP and pull from 200M+ verified contacts. No spray, no scraping junk — surgical lists only.",
  },
  {
    n: "02",
    icon: Sparkles,
    label: "ENRICH",
    title: "Add the signal",
    body: "Intent, hiring, tech stack, funding events. Every lead arrives with a reason to reach out today.",
  },
  {
    n: "03",
    icon: Send,
    label: "REACH",
    title: "Personalized at scale",
    body: "Multi-channel sequences, AI-written, human-reviewed. On-brand. Never templated. Never robotic.",
  },
  {
    n: "04",
    icon: CalendarCheck,
    label: "BOOK",
    title: "Meetings on autopilot",
    body: "An AI SDR handles replies and books straight to your calendar. You show up to qualified calls.",
  },
];

export function LeadGen() {
  return (
    <section id="lead-gen" className="relative py-28 sm:py-36">
      <div className="container">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionLabel number="01">Flagship product</SectionLabel>
            <h2 className="mt-6 text-balance font-display text-display-xs font-semibold sm:text-display-sm md:text-display-md">
              Lead Gen,
              <br />
              <span className="font-serif italic text-blue">on autopilot.</span>
            </h2>
            <p className="mt-8 max-w-md text-pretty text-[17px] leading-[1.6] text-muted-fg">
              We find them. We enrich them. We reach them. We book them. You
              show up to the meeting. Our proven engine has put 1,800+ qualified
              meetings on client calendars in the last year alone.
            </p>
            <Link
              href="#contact"
              className="group mt-10 inline-flex items-center gap-2 text-[14px] font-medium tracking-tight text-fg"
            >
              <span className="link-underline">See a live demo</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            {/* Inline result chip */}
            <div className="mt-12 inline-flex items-baseline gap-3 rounded-2xl border-hair bg-cream px-5 py-4">
              <span className="font-display text-[44px] font-semibold leading-none tracking-tight text-fg">
                47
              </span>
              <span className="text-sm text-muted-fg">
                meetings booked
                <br />
                last 30 days
              </span>
            </div>
          </div>

          {/* Pipeline cards */}
          <div className="relative">
            <div className="space-y-4">
              {pipeline.map(({ n, icon: Icon, label, title, body }, idx) => (
                <div
                  key={n}
                  className="group relative rounded-3xl border-hair bg-bg p-6 transition-all hover:border-line-strong sm:p-8"
                  style={{
                    transform: `translateX(${idx * 12}px)`,
                  }}
                >
                  <div className="flex items-start gap-5 sm:gap-7">
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border-hair bg-cream text-fg transition-colors group-hover:bg-blue group-hover:text-bg">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-blue">
                          {n} · {label}
                        </span>
                      </div>
                      <h3 className="mt-2 font-display text-2xl font-semibold tracking-[-0.035em] text-fg sm:text-[28px]">
                        {title}
                      </h3>
                      <p className="mt-2 text-pretty text-[15px] leading-[1.55] text-muted-fg">
                        {body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
