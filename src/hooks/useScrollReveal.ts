"use client";
import { useEffect, useRef, useState } from "react";

interface Options {
  threshold?: number;
  rootMargin?: string;
}

/**
 * Returns a ref and a boolean `isVisible`.
 * Attach `ref` to any element — once it enters the viewport,
 * `isVisible` flips to true (and stays true).
 */
export const useScrollReveal = ({ threshold = 0.12, rootMargin = "0px 0px -60px 0px" }: Options = {}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isVisible };
};
