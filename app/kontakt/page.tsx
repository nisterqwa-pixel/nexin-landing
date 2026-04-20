"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock,
  Mail,
  MapPin,
} from "lucide-react";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";

function Clockette({ zone, offset, label }: { zone: string; offset: number; label: string }) {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const local = new Date(utc + 3600000 * offset);
      setTime(
        `${String(local.getHours()).padStart(2, "0")}:${String(local.getMinutes()).padStart(2, "0")}`,
      );
    };
    update();
    const t = setInterval(update, 15000);
    return () => clearInterval(t);
  }, [offset]);
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-fg">{label}</p>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="font-display text-[28px] font-semibold tabular-nums tracking-tight text-fg">
          {time}
        </span>
        <span className="font-mono text-[10px] text-muted-fg">{zone}</span>
      </div>
    </div>
  );
}

export default function KontaktPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-bg pt-[100px]">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-grid-light bg-grid-fade" />
          <div className="pointer-events-none absolute left-1/4 top-1/3 h-[500px] w-[700px] -translate-y-1/2 rounded-full bg-blue/[0.05] blur-[140px]" />

          <div className="container relative pb-16 pt-10 sm:pt-14">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-fg transition-colors hover:text-fg"
            >
              <ArrowLeft className="h-3 w-3" />
              Tilbake
            </Link>

            <div className="mt-14 grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
              {/* LEFT */}
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-blue">
                  Nexin · kontakt
                </p>
                <h1 className="mt-6 text-balance font-display text-[60px] font-semibold leading-[0.9] tracking-[-0.05em] text-fg sm:text-[84px] md:text-[100px]">
                  Ta
                  <br />
                  <span className="font-serif italic text-blue">kontakt.</span>
                </h1>
                <p className="mt-8 max-w-sm text-pretty text-[17px] leading-[1.6] text-muted-fg">
                  Vi svarer raskt. Ingen salgspress, ingen lange e-postkjeder — bare en ærlig samtale om hva du trenger.
                </p>

                {/* Contact tiles */}
                <div className="mt-12 space-y-3">
                  <a
                    href="mailto:hello@nexin.ai"
                    className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border-hair bg-cream p-5 transition-all hover:border-line-strong"
                  >
                    <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue/[0.06] opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
                    <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-bg">
                      <Mail className="h-[18px] w-[18px] text-blue" />
                    </div>
                    <div className="relative flex-1">
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-fg">
                        E-post
                      </p>
                      <p className="mt-0.5 text-[15px] font-medium text-fg transition-colors group-hover:text-blue">
                        hello@nexin.ai
                      </p>
                    </div>
                    <ArrowUpRight className="relative h-4 w-4 text-muted-fg transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue" />
                  </a>

                  <div className="flex items-center gap-4 rounded-2xl border-hair bg-cream p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-bg">
                      <MapPin className="h-[18px] w-[18px] text-blue" />
                    </div>
                    <div className="flex-1">
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-fg">
                        Lokasjon
                      </p>
                      <p className="mt-0.5 text-[15px] font-medium text-fg">Brooklyn / Oslo</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 rounded-2xl border-hair bg-cream p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-bg">
                      <Clock className="h-[18px] w-[18px] text-blue" />
                    </div>
                    <div className="flex-1">
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-fg">
                        Responstid
                      </p>
                      <p className="mt-0.5 text-[15px] font-medium text-fg">Innen 4 timer, mandag–fredag</p>
                    </div>
                  </div>
                </div>

                {/* Clocks */}
                <div className="mt-10 grid grid-cols-2 gap-4 border-t-hair pt-8">
                  <Clockette label="Oslo" zone="CET" offset={1} />
                  <Clockette label="Brooklyn" zone="EST" offset={-5} />
                </div>

                <div className="mt-10">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-fg/70">
                    Foretrekker du å booke direkte?
                  </p>
                  <Link
                    href="/bestill"
                    className="group mt-3 inline-flex items-center gap-2 text-[14px] font-medium tracking-tight text-fg"
                  >
                    <span className="link-underline border-b border-fg/30 pb-0.5 transition-colors group-hover:border-blue group-hover:text-blue">
                      Bestill strategisamtale
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>

              {/* RIGHT — FORM */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className="pointer-events-none absolute -inset-4 rounded-[36px] bg-blue/[0.06] blur-2xl" />
                <div className="relative overflow-hidden rounded-[28px] border-hair bg-cream p-8 sm:p-10">
                  {/* Form header */}
                  <div className="flex items-center justify-between border-b-hair pb-6">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue">
                        Skjema · /kontakt
                      </p>
                      <p className="mt-1 text-[16px] font-semibold text-fg">
                        Fortell oss hva du driver med.
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-bg px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-fg">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      </span>
                      Åpen
                    </span>
                  </div>

                  {sent ? (
                    <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 18 }}
                        className="flex h-16 w-16 items-center justify-center rounded-full bg-blue text-bg"
                      >
                        <Check className="h-7 w-7" strokeWidth={2.5} />
                      </motion.div>
                      <h3 className="mt-6 font-display text-[32px] font-semibold tracking-tight text-fg">
                        Melding sendt.
                      </h3>
                      <p className="mt-3 max-w-xs text-[15px] text-muted-fg">
                        Vi kommer tilbake til deg innen én arbeidsdag.
                      </p>
                      <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-fg/60">
                        Sjekk innboksen · og spam-mappen for sikkerhets skyld
                      </p>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setSent(true);
                      }}
                      className="mt-8 space-y-6"
                    >
                      <div className="grid gap-6 sm:grid-cols-2">
                        {[
                          { id: "navn", label: "Navn", type: "text", placeholder: "Ola Nordmann" },
                          {
                            id: "epost",
                            label: "E-post",
                            type: "email",
                            placeholder: "ola@selskap.no",
                          },
                        ].map((f) => (
                          <div key={f.id}>
                            <label
                              htmlFor={f.id}
                              className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-muted-fg"
                            >
                              {f.label}
                            </label>
                            <input
                              id={f.id}
                              type={f.type}
                              placeholder={f.placeholder}
                              required
                              className="w-full border-b border-line-strong bg-transparent py-3 text-[15px] text-fg placeholder:text-muted-fg/50 outline-none transition-colors focus:border-blue"
                            />
                          </div>
                        ))}
                      </div>

                      <div>
                        <label
                          htmlFor="selskap"
                          className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-muted-fg"
                        >
                          Selskap
                        </label>
                        <input
                          id="selskap"
                          type="text"
                          placeholder="Selskap AS"
                          required
                          className="w-full border-b border-line-strong bg-transparent py-3 text-[15px] text-fg placeholder:text-muted-fg/50 outline-none transition-colors focus:border-blue"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="melding"
                          className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-muted-fg"
                        >
                          Melding
                        </label>
                        <textarea
                          id="melding"
                          rows={5}
                          placeholder="Hva kan vi hjelpe deg med?"
                          required
                          className="w-full resize-none border-b border-line-strong bg-transparent py-3 text-[15px] text-fg placeholder:text-muted-fg/50 outline-none transition-colors focus:border-blue"
                        />
                      </div>

                      <div className="flex items-center justify-between gap-4 pt-4">
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-fg">
                          Ingen spam · noensinne
                        </p>
                        <button
                          type="submit"
                          className="group inline-flex h-12 items-center gap-2 rounded-full bg-fg px-6 text-[14px] font-medium tracking-tight text-bg transition-all hover:bg-blue"
                        >
                          Send melding
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
