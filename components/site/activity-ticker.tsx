"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, Mail, Phone, Sparkles, Users } from "lucide-react";

type Event = {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  meta: string;
  color: string;
};

const events: Event[] = [
  {
    icon: CalendarCheck,
    text: "Meeting booked with Acme Robotics",
    meta: "Outbound · Tier 1",
    color: "text-emerald-600",
  },
  {
    icon: Mail,
    text: "47 personalized emails sent",
    meta: "Sequence · Q2 launch",
    color: "text-blue",
  },
  {
    icon: Users,
    text: "12 new qualified leads enriched",
    meta: "Source · LinkedIn intent",
    color: "text-violet-600",
  },
  {
    icon: Phone,
    text: "Voice agent answered 9 calls",
    meta: "Inbound · 24/7",
    color: "text-amber-600",
  },
  {
    icon: Sparkles,
    text: "Pipeline updated in HubSpot",
    meta: "Sync · 3 stages moved",
    color: "text-pink-600",
  },
  {
    icon: CalendarCheck,
    text: "Strategy call confirmed · Helix",
    meta: "Inbound · 11 min ago",
    color: "text-emerald-600",
  },
];

export function ActivityTicker() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % events.length), 2400);
    return () => clearInterval(t);
  }, []);

  // Build a stack of 3 visible events
  const visible = [0, 1, 2].map((offset) => events[(i + offset) % events.length]);

  return (
    <section className="relative overflow-hidden bg-cream py-24 sm:py-28">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-blue">
              <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-blue align-middle" />
              Live from production
            </p>
            <h2 className="mt-5 text-balance font-display text-display-xs font-semibold sm:text-display-sm md:text-display-md">
              Right now,
              <br />
              Nexin is{" "}
              <span className="font-serif italic text-blue">working.</span>
            </h2>
            <p className="mt-6 max-w-md text-pretty text-[17px] leading-[1.55] text-muted-fg">
              Every event below is the same kind of work happening across our
              client deployments — meetings, replies, enrichment, calls. While
              you read this, the system is shipping.
            </p>
          </div>

          {/* Event stack */}
          <div className="relative h-[260px]">
            <AnimatePresence initial={false}>
              {visible.map((e, idx) => {
                const Icon = e.icon;
                const key = `${i}-${idx}`;
                return (
                  <motion.div
                    key={key}
                    initial={{ y: 80, opacity: 0, scale: 0.94 }}
                    animate={{
                      y: idx * 86,
                      opacity: idx === 0 ? 1 : idx === 1 ? 0.65 : 0.3,
                      scale: 1 - idx * 0.04,
                    }}
                    exit={{ y: -90, opacity: 0, scale: 0.94 }}
                    transition={{
                      duration: 0.7,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="absolute inset-x-0 top-0 flex items-center gap-4 rounded-2xl border-hair bg-bg p-5 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.18)]"
                    style={{ zIndex: 10 - idx }}
                  >
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl bg-cream ${e.color}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[15px] font-medium text-fg">
                        {e.text}
                      </p>
                      <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-fg">
                        {e.meta}
                      </p>
                    </div>
                    {idx === 0 && (
                      <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-emerald-600">
                        Just now
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
