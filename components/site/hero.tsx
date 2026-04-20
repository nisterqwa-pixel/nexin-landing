"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";
import {
  SiHubspot,
  SiSalesforce,
  SiOpenai,
  SiAnthropic,
  SiSlack,
  SiGmail,
  SiNotion,
  SiZapier,
  SiGooglecalendar,
} from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

const verbs = ["sover.", "skalerer.", "leverer.", "vinner."];

export function Hero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % verbs.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative overflow-hidden pt-[120px] pb-24 sm:pt-[140px] sm:pb-28">
      {/* Subtle grid wash */}
      <div className="pointer-events-none absolute inset-0 bg-grid-light bg-grid-fade" />
      {/* Soft blue radial */}
      <div className="pointer-events-none absolute left-1/2 top-[40%] h-[640px] w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue/[0.05] blur-[140px]" />

      <div className="container relative">
        {/* Kicker pill */}
        <div className="mb-10 flex justify-center">
          <Link
            href="/lead-gen"
            className="group inline-flex items-center gap-2 rounded-full border-hair bg-bg/60 py-1.5 pl-1.5 pr-4 text-[12px] font-medium tracking-tight text-fg/80 backdrop-blur transition-colors hover:border-line-strong"
          >
            <span className="rounded-full bg-blue/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-blue">
              New
            </span>
            Lead Gen v2 — booker 30+ møter/mnd på autopilot
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Headline — editorial mix of sans + serif italic */}
        <h1 className="mx-auto max-w-[18ch] text-balance text-center font-display text-display-sm font-semibold text-fg sm:text-display-md md:text-display-lg lg:text-display-xl">
          AI-ops-teamet
          <br />
          som jobber mens
          <br />
          <span className="inline-flex items-baseline">
            <span className="font-serif text-[1.05em] italic text-blue">du&nbsp;</span>
            <span className="relative inline-block overflow-hidden align-baseline">
              {/* invisible spacer keeps width = widest verb */}
              <span className="invisible font-serif text-[1.05em] italic">
                skalerer.
              </span>
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={verbs[i]}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 font-serif text-[1.05em] italic text-blue"
                >
                  {verbs[i]}
                </motion.span>
              </AnimatePresence>
            </span>
          </span>
        </h1>

        {/* Sub */}
        <p className="mx-auto mt-10 max-w-[58ch] text-balance text-center text-[17px] leading-[1.55] text-muted-fg sm:text-[19px]">
          Nexin er et AI-automasjonsstudio for operatører. Vi designer og leverer
          systemer teamet ditt faktisk vil bruke — starter med lead-gen-motoren
          som booker kvalifiserte møter i kalenderen din over natten.
        </p>

        {/* CTAs */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
          <Magnetic>
            <Link
              href="/bestill"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-fg px-6 text-[14px] font-medium tracking-tight text-bg transition-all hover:bg-blue"
            >
              <Calendar className="h-4 w-4" />
              Bestill strategisamtale
            </Link>
          </Magnetic>
          <Link
            href="/lead-gen"
            className="group inline-flex h-12 items-center gap-2 px-2 text-[14px] font-medium tracking-tight text-fg"
          >
            <span className="link-underline">Se lead-gen i aksjon</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Integration row */}
        <div className="mt-16 flex flex-col items-center gap-5">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-fg/80">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue/60 opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue" />
            </span>
            Kobles til stacken du allerede kjører
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-fg/55 sm:gap-x-10">
            {[
              { Icon: SiHubspot, name: "HubSpot" },
              { Icon: SiSalesforce, name: "Salesforce" },
              { Icon: SiOpenai, name: "OpenAI" },
              { Icon: SiAnthropic, name: "Anthropic" },
              { Icon: FaLinkedin, name: "LinkedIn" },
              { Icon: SiGmail, name: "Gmail" },
              { Icon: SiGooglecalendar, name: "Calendar" },
              { Icon: SiSlack, name: "Slack" },
              { Icon: SiNotion, name: "Notion" },
              { Icon: SiZapier, name: "Zapier" },
            ].map(({ Icon, name }) => (
              <div
                key={name}
                className="group flex items-center gap-2 transition-colors hover:text-fg"
                aria-label={name}
              >
                <Icon className="h-[18px] w-[18px]" />
                <span className="font-display text-[15px] font-semibold tracking-[-0.025em]">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
