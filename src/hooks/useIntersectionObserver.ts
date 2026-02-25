"use client";

import { useEffect, useState, useRef, RefObject } from "react";

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
    freezeOnceVisible?: boolean;
}

/**
 * Hook to detect when an element enters the viewport.
 * Useful for triggering animations on scroll.
 */
export function useIntersectionObserver(
    elementRef: RefObject<Element | null>,
    {
        threshold = 0,
        root = null,
        rootMargin = "0%",
        freezeOnceVisible = true,
    }: UseIntersectionObserverOptions = {}
): boolean {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const element = elementRef?.current;
        if (!element) return;

        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        observerRef.current = new IntersectionObserver(
            ([entry]) => {
                const isElementVisible = entry.isIntersecting;
                setIsVisible(isElementVisible);

                if (isElementVisible && freezeOnceVisible && observerRef.current) {
                    observerRef.current.disconnect();
                }
            },
            { threshold, root, rootMargin }
        );

        observerRef.current.observe(element);

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [elementRef, threshold, root, rootMargin, freezeOnceVisible]);

    return isVisible;
}
