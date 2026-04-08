"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorBlob() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 260, damping: 32, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 32, mass: 0.4 });

  useEffect(() => {
    function onMove(e: MouseEvent) {
      x.set(e.clientX - 200);
      y.set(e.clientY - 200);
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[1] hidden h-[400px] w-[400px] rounded-full bg-blue/[0.06] blur-[80px] mix-blend-multiply md:block"
      style={{ x: sx, y: sy }}
    />
  );
}
