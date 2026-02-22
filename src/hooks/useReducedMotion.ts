import { useReducedMotion as useFramerReducedMotion } from "motion/react";

/**
 * A wrapper hook that abstracts Framer Motion's useReducedMotion hook.
 * Returns true if the user has requested reduced motion in their OS/browser settings.
 * Returns false during SSR to avoid hydration mismatches, resolving to the actual value on the client.
 */
export function useReducedMotion() {
    // Framer motion's hook handles SSR hydration safely
    const shouldReduceMotion = useFramerReducedMotion();

    // It returns null during SSR, and boolean on client. We default to false (animations enabled).
    // If accessibility is paramount, one could default to true, but false is standard for progressive enhancement.
    return shouldReduceMotion === true;
}
