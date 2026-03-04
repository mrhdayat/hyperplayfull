"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
      },
    });

    // Fade in independently
    gsap.fromTo(
      [textGroupRef.current, imageRef.current],
      { opacity: 0 },
      { opacity: 1, duration: 1, stagger: 0.2, scrollTrigger: { trigger: containerRef.current, start: "top 60%" } }
    );

    // Quirky jerky museum walk parallax only on transforms
    tl.fromTo(
      textGroupRef.current,
      { y: 100, rotateZ: 5 },
      { y: -50, rotateZ: -2, ease: "none", duration: 1 }
    ).fromTo(
      imageRef.current,
      { y: -80, scale: 0.9, rotateX: 10 },
      { y: 50, scale: 1.05, rotateX: 0, ease: "none", duration: 1 },
      "<"
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="about" className="py-32 px-6 min-h-screen flex items-center bg-ivory text-charcoal relative">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        <div ref={textGroupRef} className="space-y-8 z-10">
          <h2 className="font-sans text-5xl md:text-7xl font-bold leading-tight uppercase">
            Curated <span className="font-mono text-moss italic">Chaos</span>
          </h2>
          <p className="font-mono text-lg md:text-xl leading-relaxed text-charcoal/80">
            We operate at the bleeding edge of hyper-real aesthetics and unapologetic brutalism.
            A cinematic, spatial storytelling approach designed for visionary brands.
            Our codex is built on typographic tension, kinetic motion, and perfectly curated imperfections.
          </p>
          <button className="quirky-border border-2 border-charcoal px-8 py-4 font-bold text-lg hover:bg-moss hover:text-ivory hover:border-moss transition-colors duration-300">
            Enter the Codex
          </button>
        </div>

        <div ref={imageRef} className="museum-frame aspect-[4/5] bg-charcoal/5 flex items-center justify-center p-8 relative">
          {/* Faux 3D object using CSS */}
          <div className="absolute inset-0 bg-gradient-to-tr from-moss/20 to-transparent mix-blend-multiply" />
          <div className="w-full h-full quirky-border-alt bg-white/50 backdrop-blur-md shadow-2xl flex items-center justify-center transform transition-transform hover:scale-105 hover:rotate-3 duration-500">
            <div className="text-center">
              <span className="font-sans text-4xl block font-bold uppercase">Museumcore</span>
              <span className="font-mono text-sm text-moss mt-2 block tracking-widest uppercase">Est. 2026</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
