"use client";

import { useEffect, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide native cursor completely
    document.body.style.cursor = 'none';

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", updatePosition);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.body.style.cursor = 'auto';
    };
  }, [isVisible]);

  // Don't render cursor on mobile/touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 w-[6px] h-[6px] bg-[#c17f3a] rounded-full pointer-events-none z-[10000]"
      style={{
        transform: `translate(${position.x - 3}px, ${position.y - 3}px)`,
        opacity: isVisible ? 1 : 0,
        transition: "transform 0.1s ease-out, opacity 0.2s",
        boxShadow: "0 0 8px rgba(193, 127, 58, 0.8)"
      }}
    />
  );
}
