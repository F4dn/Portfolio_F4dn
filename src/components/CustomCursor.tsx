"use client";
import { useEffect, useRef } from "react";

/**
 * Renders a small dot + lagging ring cursor on desktop (pointer:fine) devices.
 * CSS in globals.css hides the default cursor and positions both elements.
 */
export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = 0, my = 0;   // mouse position
    let rx = 0, ry = 0;   // ring position (lagged)

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      // Dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.left = mx + "px";
        dotRef.current.style.top  = my + "px";
      }
    };

    let raf: number;
    const loop = () => {
      // Ring eases toward mouse
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      if (ringRef.current) {
        ringRef.current.style.left = rx + "px";
        ringRef.current.style.top  = ry + "px";
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cur-dot" />
      <div ref={ringRef} className="cur-ring" />
    </>
  );
}
