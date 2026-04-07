import Link from "next/link";
import { NexinLogo } from "./logo";

const cols = [
  { title: "Product", links: ["Lead Gen", "AI Outreach", "Workflow", "Voice Agents"] },
  { title: "Company", links: ["About", "Process", "Clients", "Careers"] },
  { title: "Resources", links: ["ROI Calculator", "Playbooks", "Changelog", "Contact"] },
];

export function SiteFooter() {
  return (
    <footer className="relative bg-cream pt-24 pb-10">
      <div className="container">
        {/* Big wordmark */}
        <div className="mb-20 flex items-end justify-between border-b-hair pb-12">
          <div className="font-display text-[18vw] font-semibold leading-[0.85] tracking-[-0.07em] text-fg sm:text-[180px]">
            Nexin<span className="text-blue">.</span>
          </div>
          <NexinLogo className="hidden h-20 w-20 sm:block" size={80} />
        </div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="max-w-xs text-[15px] leading-[1.55] text-muted-fg">
              The AI automation studio for operators who&apos;d rather ship than
              talk about shipping.
            </p>
            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-fg/80">
              Built for operators · Brooklyn / Oslo
            </p>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-fg">
                {col.title}
              </p>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-[14px] text-fg transition-colors hover:text-blue"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t-hair pt-8 sm:flex-row sm:items-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-fg/80">
            © 2026 Nexin Labs Inc. — All rights reserved
          </p>
          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "SOC 2"].map((l) => (
              <Link
                key={l}
                href="#"
                className="text-[12px] text-muted-fg hover:text-fg"
              >
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
