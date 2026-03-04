"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function Manifesto() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!textRef.current) return;

    // Filter out any empty strings from newlines/extra spaces
    const words = textRef.current.innerText.split(/\s+/).filter(w => w.length > 0);
    textRef.current.innerHTML = "";

    words.forEach((word) => {
      const span = document.createElement("span");
      span.innerHTML = word + "&nbsp;";
      span.className = "inline-block opacity-20 transition-colors tracking-tight";
      textRef.current?.appendChild(span);
    });

    const spans = textRef.current.querySelectorAll("span");

    gsap.to(spans, {
      opacity: 1,
      color: "var(--color-moss)",
      stagger: 0.1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 40%",
        scrub: true,
      }
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-40 px-6 bg-charcoal text-ivory flex flex-col items-center justify-center min-h-[70vh]">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="font-mono text-sm tracking-widest uppercase text-moss mb-12 animate-pulse">
          Our Manifesto
        </h2>
        <p
          ref={textRef}
          className="font-sans text-4xl md:text-7xl font-bold leading-snug"
        >
          We architect digital experiences that breathe. Where motion fuels emotion, perfection is obsolete, and every interaction triggers a visceral response. Welcome to the era of playful brutalism and hyper-real aesthetics.
        </p>
      </div>
    </section >
  );
}
