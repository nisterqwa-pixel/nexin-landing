"use client";

import Link from "next/link";
import {
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  Clock,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";

function StatCounter({
  target,
  suffix = "",
  prefix = "",
}: {
  target: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 18 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (inView) mv.set(target);
  }, [inView, mv, target]);

  useMotionValueEvent(spring, "change", (v) => setValue(Math.round(v)));

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {value.toLocaleString("nb-NO")}
      {suffix}
    </span>
  );
}

function NextSlot() {
  const slots = useMemo(
    () => [
      { day: "ONS", date: 22, time: "14:00" },
      { day: "TOR", date: 23, time: "10:30" },
      { day: "FRE", date: 24, time: "09:15" },
      { day: "MAN", date: 27, time: "13:00" },
    ],
    [],
  );
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slots.length), 2800);
    return () => clearInterval(t);
  }, [slots.length]);

  const active = slots[i];

  return (
    <div className="relative overflow-hidden rounded-2xl border-hair bg-bg p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-fg">
            Neste ledige · april
          </span>
        </div>
        <Calendar className="h-3.5 w-3.5 text-muted-fg" />
      </div>
      <div className="mt-4 flex items-center gap-5">
        <motion.div
          key={`${active.day}${active.date}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex h-14 w-14 flex-col items-center justify-center rounded-xl bg-blue text-bg"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] opacity-80">
            {active.day}
          </span>
          <span className="font-display text-[20px] font-semibold leading-none">
            {active.date}
          </span>
        </motion.div>
        <div>
          <motion.p
            key={active.time}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-display text-[28px] font-semibold leading-none tracking-tight text-fg"
          >
            {active.time}
          </motion.p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-fg">
            30 min · Google Meet
          </p>
        </div>
      </div>
    </div>
  );
}

export default function BestillPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-bg pt-[100px]">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-grid-light bg-grid-fade" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue/[0.05] blur-[140px]" />

          <div className="container relative pb-20 pt-10 sm:pt-14">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-fg transition-colors hover:text-fg"
            >
              <ArrowLeft className="h-3 w-3" />
              Tilbake
            </Link>

            <div className="mt-14 grid gap-16 lg:grid-cols-[1fr_1.15fr] lg:gap-24">
              {/* LEFT */}
              <div className="lg:sticky lg:top-32 lg:self-start">
                <div className="inline-flex items-center gap-2 rounded-full border-hair bg-bg/80 py-1.5 pl-1.5 pr-4 backdrop-blur">
                  <span className="rounded-full bg-blue/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-blue">
                    30 min
                  </span>
                  <span className="text-[12px] font-medium text-fg/80">
                    Gratis · ingen bindinger
                  </span>
                </div>

                <h1 className="mt-8 text-balance font-display text-[60px] font-semibold leading-[0.9] tracking-[-0.05em] text-fg sm:text-[84px] md:text-[100px]">
                  Bestill
                  <br />
                  <span className="font-serif italic text-blue">strategisamtale.</span>
                </h1>

                <p className="mt-8 max-w-md text-pretty text-[17px] leading-[1.6] text-muted-fg">
                  30 minutter. Vi kartlegger din største flaskehals og forteller deg om automatisering er riktig løsning — selv om svaret er nei.
                </p>

                <div className="mt-10 space-y-3">
                  {[
                    { icon: Shield, t: "Ingen salgspresentasjoner" },
                    { icon: Zap, t: "Ingen skjulte agendaer" },
                    { icon: Sparkles, t: "Ingen oppfølging uten at du ber om det" },
                  ].map((r, i) => {
                    const I = r.icon;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 + 0.2, duration: 0.5 }}
                        className="flex items-center gap-3"
                      >
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue/10">
                          <I className="h-3.5 w-3.5 text-blue" />
                        </span>
                        <span className="text-[15px] text-fg/85">{r.t}</span>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Next slot */}
                <div className="mt-10">
                  <NextSlot />
                </div>

                {/* Result stat grid */}
                <div className="mt-10 rounded-2xl border-hair bg-cream p-6">
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-fg">
                      Resultat etter 60 dager
                    </p>
                    <span className="font-mono text-[9px] text-muted-fg/70">snitt · n=40</span>
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-6">
                    {[
                      { k: 47, suffix: "", l: "møter / mnd" },
                      { k: 8, suffix: "×", l: "høyere svarrate" },
                      { k: 87, suffix: "%", prefix: "−", l: "ops-tid" },
                      { k: 24, suffix: "t", prefix: "<", l: "til første lead" },
                    ].map((s, i) => (
                      <div key={i}>
                        <p className="font-display text-[32px] font-semibold leading-none tracking-tight text-fg">
                          <StatCounter target={s.k} suffix={s.suffix} prefix={s.prefix} />
                        </p>
                        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-fg">
                          {s.l}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Testimonial */}
                <div className="mt-10 border-l-2 border-blue pl-5">
                  <p className="text-[15px] leading-[1.55] text-fg/85">
                    “De tok oss fra 3 møter i måneden til 40+ uten å ansette en eneste SDR. Det var ikke et demo-trick — det var motoren.”
                  </p>
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-fg">
                    Kristine Aas · CRO, Helix
                  </p>
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
                <div className="relative overflow-hidden rounded-[28px] border-hair bg-cream">
                  {/* Header */}
                  <div className="flex items-center justify-between border-b-hair px-8 py-6 sm:px-10">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue">
                        /bestill
                      </p>
                      <p className="mt-1 text-[15px] font-semibold text-fg">
                        Fyll inn — vi tar resten.
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full bg-bg px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-fg">
                      <Clock className="h-3 w-3" />
                      ~2 min
                    </div>
                  </div>

                  <div className="p-8 sm:p-10">
                    {sent ? (
                      <div className="flex min-h-[520px] flex-col items-center justify-center text-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 18 }}
                          className="flex h-20 w-20 items-center justify-center rounded-full bg-blue text-bg"
                        >
                          <Check className="h-9 w-9" strokeWidth={2.5} />
                        </motion.div>
                        <h2 className="mt-8 font-display text-[36px] font-semibold leading-none tracking-tight text-fg">
                          Bestilling mottatt.
                        </h2>
                        <p className="mt-4 max-w-sm text-[15px] leading-[1.6] text-muted-fg">
                          Vi bekrefter et tidspunkt innen én arbeidsdag. Du får en e-post med kalenderinvitasjon og en kort brief å forberede.
                        </p>
                        <div className="mt-10 grid w-full max-w-sm grid-cols-1 gap-3 text-left">
                          {[
                            { n: "01", t: "Sjekk innboksen din", s: "innen 1 arbeidsdag" },
                            { n: "02", t: "Bekreft tidspunkt", s: "med ett klikk" },
                            { n: "03", t: "Møt oss på samtalen", s: "Google Meet, 30 min" },
                          ].map((r) => (
                            <div
                              key={r.n}
                              className="flex items-start gap-4 rounded-xl border-hair bg-bg p-4"
                            >
                              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue">
                                {r.n}
                              </span>
                              <div>
                                <p className="text-[14px] font-medium text-fg">{r.t}</p>
                                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-fg">
                                  {r.s}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          setSent(true);
                        }}
                        className="space-y-7"
                      >
                        <div className="grid gap-7 sm:grid-cols-2">
                          {[
                            {
                              id: "navn",
                              label: "Navn",
                              type: "text",
                              placeholder: "Ola Nordmann",
                              required: true,
                            },
                            {
                              id: "epost",
                              label: "E-post",
                              type: "email",
                              placeholder: "ola@selskap.no",
                              required: true,
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
                                required={f.required}
                                className="w-full border-b border-line-strong bg-transparent py-3 text-[15px] text-fg placeholder:text-muted-fg/50 outline-none transition-colors focus:border-blue"
                              />
                            </div>
                          ))}
                        </div>

                        <div className="grid gap-7 sm:grid-cols-2">
                          {[
                            {
                              id: "selskap",
                              label: "Selskap",
                              type: "text",
                              placeholder: "Selskap AS",
                              required: true,
                            },
                            {
                              id: "telefon",
                              label: "Telefon (valgfritt)",
                              type: "tel",
                              placeholder: "+47 000 00 000",
                              required: false,
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
                                required={f.required}
                                className="w-full border-b border-line-strong bg-transparent py-3 text-[15px] text-fg placeholder:text-muted-fg/50 outline-none transition-colors focus:border-blue"
                              />
                            </div>
                          ))}
                        </div>

                        <div>
                          <label
                            htmlFor="utfordring"
                            className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-muted-fg"
                          >
                            Hva er din største utfordring?
                          </label>
                          <textarea
                            id="utfordring"
                            rows={4}
                            placeholder="Fortell oss kort — vi leser alt før samtalen."
                            className="w-full resize-none border-b border-line-strong bg-transparent py-3 text-[15px] text-fg placeholder:text-muted-fg/50 outline-none transition-colors focus:border-blue"
                          />
                        </div>

                        <div className="pt-4">
                          <button
                            type="submit"
                            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-fg py-4 text-[14px] font-medium tracking-tight text-bg transition-all hover:bg-blue"
                          >
                            Bestill samtale
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </button>
                          <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted-fg/60">
                            Ingen presentasjoner · ingen spam
                          </p>
                        </div>
                      </form>
                    )}
                  </div>
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
