"use client";

import { useReducedMotion } from "framer-motion";

/**
 * Returns true when the user prefers reduced motion. All decorative
 * animation (rotation, parallax, scroll-driven transforms) must be
 * disabled when this is true — simple fades only.
 */
export function useReducedMotionSafe(): boolean {
  return useReducedMotion() ?? false;
}
