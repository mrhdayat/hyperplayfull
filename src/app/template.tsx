"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Template({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // GSAP Page Transition Entrance
    if (ref.current && wipeRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          ScrollTrigger.refresh();
        }
      });

      tl.to(wipeRef.current, {
        height: 0,
        duration: 0.8,
        ease: "power4.inOut"
      })
        .fromTo(
          ref.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", clearProps: "transform" },
          "-=0.4"
        );
    }
  }, { scope: ref });

  return (
    <>
      <div
        ref={wipeRef}
        className="fixed inset-0 z-[8000] bg-charcoal w-full h-full pointer-events-none"
        style={{ transformOrigin: "top" }}
      />
      <div ref={ref}>
        {children}
      </div>
    </>
  );
}
