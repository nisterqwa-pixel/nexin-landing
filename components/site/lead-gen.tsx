import {
  Search,
  Sparkles,
  Send,
  CalendarCheck,
  ArrowRight,
} from "lucide-react";
import { SectionLabel } from "./section-label";
import { Reveal } from "@/components/ui/reveal";
import Link from "next/link";

const pipeline = [
  {
    n: "01",
    icon: Search,
    label: "FINN",
    title: "Identifiser kjøperne dine",
    body: "Vi profilerer din ICP og henter fra 200M+ verifiserte kontakter. Ingen spray, ingen søppelskraping — kirurgiske lister kun.",
  },
  {
    n: "02",
    icon: Sparkles,
    label: "BERIK",
    title: "Legg til signalet",
    body: "Intensjon, ansettelser, teknologistakk, finansieringshendelser. Hvert lead ankommer med en grunn til å nå ut i dag.",
  },
  {
    n: "03",
    icon: Send,
    label: "NÅ",
    title: "Personalisert i stor skala",
    body: "Flerkanalssekvenser, AI-skrevet, menneskegodkjent. On-brand. Aldri maler. Aldri robotaktig.",
  },
  {
    n: "04",
    icon: CalendarCheck,
    label: "BOOK",
    title: "Møter på autopilot",
    body: "En AI SDR håndterer svar og booker direkte i kalenderen din. Du dukker opp til kvalifiserte samtaler.",
  },
];

export function LeadGen() {
  return (
    <section id="lead-gen" className="relative py-28 sm:py-36">
      <div className="container">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionLabel number="01">Flaggskipprodukt</SectionLabel>
            <h2 className="mt-6 text-balance font-display text-display-xs font-semibold sm:text-display-sm md:text-display-md">
              Lead Gen,
              <br />
              <span className="font-serif italic text-blue">på autopilot.</span>
            </h2>
            <p className="mt-8 max-w-md text-pretty text-[17px] leading-[1.6] text-muted-fg">
              Vi finner dem. Vi beriker dem. Vi når dem. Vi booker dem. Du
              dukker opp til møtet. Vår dokumenterte motor har satt 1 800+ kvalifiserte
              møter i klienters kalendere det siste året alene.
            </p>
            <Link
              href="/bestill"
              className="group mt-10 inline-flex items-center gap-2 text-[14px] font-medium tracking-tight text-fg"
            >
              <span className="link-underline">Se en live demo</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            {/* Inline result chip */}
            <div className="mt-12 inline-flex items-baseline gap-3 rounded-2xl border-hair bg-cream px-5 py-4">
              <span className="font-display text-[44px] font-semibold leading-none tracking-tight text-fg">
                47
              </span>
              <span className="text-sm text-muted-fg">
                møter booket
                <br />
                siste 30 dager
              </span>
            </div>
          </div>

          {/* Pipeline cards */}
          <div className="relative">
            <div className="space-y-4">
              {pipeline.map(({ n, icon: Icon, label, title, body }, idx) => (
                <Reveal key={n} delay={idx * 0.08}>
                  <div
                    className="group relative rounded-3xl border-hair bg-bg p-6 transition-all hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_24px_60px_-30px_rgba(15,23,42,0.25)] sm:p-8"
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
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
