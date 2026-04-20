import Image from "next/image";
import Link from "next/link";
import { NexinLogo } from "./logo";

const cols = [
  { title: "Produkt", links: ["Lead Gen", "AI-oppsøking", "Arbeidsflyt", "Stemmeagenter"] },
  { title: "Selskap", links: ["Om oss", "Prosess", "Kunder", "Karriere"] },
  { title: "Ressurser", links: ["ROI-kalkulator", "Spillebøker", "Endringslogg", "Kontakt"] },
];

export function SiteFooter() {
  return (
    <footer className="relative bg-cream pt-24 pb-10">
      <div className="container">
        {/* Big wordmark */}
        <div className="mb-20 flex items-end justify-between border-b-hair pb-12">
          <div className="flex items-center font-display font-semibold leading-[0.85] tracking-[-0.07em] text-fg text-[18vw] sm:text-[180px]">
            <Image
              src="/nexin-logo-plain.png"
              alt="N"
              width={637}
              height={535}
              priority
              className="mr-[0.04em] inline-block h-[0.82em] w-auto select-none"
            />
            <span>exin</span>
            <span className="text-blue">.</span>
          </div>
        </div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="max-w-xs text-[15px] leading-[1.55] text-muted-fg">
              AI-automasjonsstudioet for operatører som heller leverer
              enn snakker om å levere.
            </p>
            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-fg/80">
              Bygget for operatører · Brooklyn / Oslo
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
            © 2026 Nexin Labs Inc. — Alle rettigheter forbeholdt
          </p>
          <div className="flex items-center gap-6">
            {["Personvern", "Vilkår", "SOC 2"].map((l) => (
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
