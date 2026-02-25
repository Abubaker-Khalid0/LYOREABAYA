"use client";

import { useEffect, useState } from "react";

/**
 * Hook to generate staggered animation delays for mapped items.
 * @param count - The total number of items to animate
 * @param staggerDelay - The delay between each item's animation start (in seconds)
 * @param initialDelay - The initial delay before the first item starts (in seconds)
 * @returns An array of delay values matching the requested count
 */
export function useStaggerAnimation(
    count: number,
    staggerDelay: number = 0.1,
    initialDelay: number = 0
): number[] {
    const [delays, setDelays] = useState<number[]>([]);

    useEffect(() => {
        const calculatedDelays = Array.from(
            { length: count },
            (_, index) => initialDelay + index * staggerDelay
        );
        setDelays(calculatedDelays);
    }, [count, staggerDelay, initialDelay]);

    return delays;
}
