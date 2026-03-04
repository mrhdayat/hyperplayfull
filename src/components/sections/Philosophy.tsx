"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function Philosophy() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!textRef.current || !containerRef.current) return;

    const lines = textRef.current.querySelectorAll(".reveal-line");

    gsap.fromTo(
      lines,
      { opacity: 0.1, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 1,
          pin: true,
        },
      }
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="h-screen bg-ivory flex items-center justify-center px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto" ref={textRef}>
        <div className="reveal-line font-sans text-5xl md:text-8xl font-black uppercase mb-4 text-charcoal">
          Design isn't just
        </div>
        <div className="reveal-line font-sans text-5xl md:text-8xl font-black uppercase mb-4 text-moss">
          how it looks.
        </div>
        <div className="reveal-line font-mono text-2xl md:text-4xl italic text-charcoal/80 mb-4 tracking-tight">
          It's how it makes you
        </div>
        <div className="reveal-line font-sans text-7xl md:text-9xl font-black uppercase text-moss quirky-border inline-block px-12 py-4 border-2 border-charcoal bg-white/50 backdrop-blur-md rotate-[-2deg]">
          FEEL
        </div>
      </div>
    </section>
  );
}
