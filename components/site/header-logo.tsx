"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const DOCK_THRESHOLD = 120;

/**
 * Tracks whether the page is scrolled past the threshold.
 * Bidirectional: flips back to false when the user scrolls back to the top,
 * so the "exin" letters can re-appear.
 */
function useDocked() {
  const [docked, setDocked] = useState(false);

  useEffect(() => {
    const update = () => setDocked(window.scrollY > DOCK_THRESHOLD);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return docked;
}

/**
 * Anthropic-style letter-morph nav logo.
 *
 * At rest (top of page): full wordmark — N mark + "exin" + blue dot.
 * Scrolled:               compact — N mark + blue dot, sitting right next to each other.
 *
 * Mechanics:
 *   - The N image is a static anchor — it never moves.
 *   - "exin" lives inside <AnimatePresence mode="popLayout"> so when it exits
 *     it's yanked out of the flow immediately (goes absolute), letting the
 *     dot start its layout animation while the exit plays.
 *   - The blue dot uses framer-motion's `layout` prop, so its position
 *     automatically tweens from "far right of wordmark" to "right next to N"
 *     when "exin" leaves the flow — and back again when it returns.
 *
 * The pair of `layout` + `popLayout` is the React equivalent of the FLIP
 * technique behind Anthropic's ANTHROP\C → A\ morph.
 */
export function NavLogo() {
  const docked = useDocked();
  const reduced = useReducedMotion();

  const layoutTransition = reduced
    ? { duration: 0 }
    : { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const };

  const exinTransition = reduced
    ? { duration: 0 }
    : { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div className="flex items-center font-display text-[22px] font-semibold leading-none tracking-[-0.05em] text-fg">
      <Image
        src="/nexin-logo-plain.png"
        alt="Nexin"
        width={637}
        height={535}
        priority
        className="mr-[2px] inline-block h-[0.95em] w-auto select-none"
      />

      <AnimatePresence initial={false} mode="popLayout">
        {!docked && (
          <motion.span
            key="exin"
            initial={{ opacity: 0, filter: "blur(4px)", x: -4 }}
            animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
            exit={{ opacity: 0, filter: "blur(4px)", x: -4 }}
            transition={exinTransition}
            className="inline-block"
          >
            exin
          </motion.span>
        )}
      </AnimatePresence>

      <motion.span
        layout
        transition={layoutTransition}
        className="text-blue"
      >
        .
      </motion.span>
    </div>
  );
}
