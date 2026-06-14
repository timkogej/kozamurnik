"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { EASE_ARRIVE } from "@/lib/motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Vertical travel in px (ignored when reduced motion is on) */
  y?: number;
};

/**
 * Standard scroll-reveal wrapper: fade + rise on first viewport entry.
 * Falls back to a plain fade under prefers-reduced-motion.
 */
export function Reveal({ children, className, delay = 0, y = 28 }: RevealProps) {
  const reduced = useReducedMotionSafe();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.6, delay, ease: EASE_ARRIVE }}
    >
      {children}
    </motion.div>
  );
}
