"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "auto";
        ScrollTrigger.refresh();
      },
    });

    let currentProgress = 0;

    // Quirky jerky progress
    const interval = setInterval(() => {
      // Random jump between 2 and 15
      currentProgress += Math.floor(Math.random() * 14) + 2;

      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);

        // Final animations
        tl.to(textRef.current, {
          scale: 1.5,
          opacity: 0,
          duration: 0.5,
          ease: "back.in(1.7)",
        })
          .to(containerRef.current, {
            yPercent: -100,
            duration: 0.8,
            ease: "power4.inOut",
            borderBottomRightRadius: "50%",
            borderBottomLeftRadius: "50%",
          });
      }
      setProgress(currentProgress);
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] bg-ivory flex items-center justify-center origin-top border-b border-black/10"
    >
      <div
        ref={textRef}
        className="font-sans text-8xl md:text-9xl font-bold text-charcoal flex flex-col items-center"
      >
        <span className="text-xl font-mono mb-4 uppercase tracking-[0.3em] text-moss">
          Loading Museum
        </span>
        <div className="flex items-baseline quirky-border border-4 border-charcoal px-8 py-4 bg-white/50 backdrop-blur-sm">
          {progress}
          <span className="text-4xl ml-2">%</span>
        </div>
      </div>
    </div>
  );
}
