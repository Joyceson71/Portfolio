"use client";

import { useEffect, useState, RefObject } from "react";

interface CustomIntersectionObserverInit extends IntersectionObserverInit {
  triggerOnce?: boolean;
}

export function useIntersectionObserver(
  ref: RefObject<HTMLElement | null>,
  options: CustomIntersectionObserverInit = { threshold: 0.12, triggerOnce: true }
) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        if (options.triggerOnce && ref.current) {
          observer.unobserve(ref.current);
        }
      } else if (!options.triggerOnce) {
        setIsIntersecting(false);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return isIntersecting;
}
