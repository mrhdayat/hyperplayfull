"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function AboutPage() {
  const containerRef = useRef<HTMLElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const imageGroupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      textGroupRef.current?.children || [],
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power3.out", delay: 1.5 }
    ).fromTo(
      imageGroupRef.current,
      { scale: 0.9, opacity: 0, rotate: 5 },
      { scale: 1, opacity: 1, rotate: -2, duration: 1.2, ease: "back.out(1.5)" },
      "-=0.5"
    );
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen bg-ivory pt-32 px-6 pb-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        <div ref={textGroupRef} className="lg:w-1/2 space-y-8">
          <h1 className="font-sans text-6xl md:text-8xl font-black uppercase leading-[0.9]">
            The <span className="font-mono text-moss italic">History</span><br />of Chaos
          </h1>
          <p className="font-mono text-lg text-charcoal/80 leading-relaxed">
            Founded in 2026, we rebelled against the generic, sterile web.
            We embraced playful brutalism, creating digital museum experiences
            that are intentionally imperfect. Human. Quirky.
          </p>
          <div className="pt-8 border-t border-charcoal/10 grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-sans text-4xl font-bold text-moss">50+</h3>
              <p className="font-mono text-xs uppercase tracking-widest mt-2">Awards Won</p>
            </div>
            <div>
              <h3 className="font-sans text-4xl font-bold text-moss">12</h3>
              <p className="font-mono text-xs uppercase tracking-widest mt-2">Quirky Humans</p>
            </div>
          </div>
        </div>

        <div ref={imageGroupRef} className="lg:w-1/2 w-full h-[600px] relative museum-frame quirky-border shadow-2xl overflow-hidden group">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2670&auto=format&fit=crop"
            alt="Agency Space"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
            priority
          />
          <div className="absolute inset-0 bg-moss/20 mix-blend-multiply opacity-50 transition-opacity group-hover:opacity-0" />
        </div>
      </div>
    </main>
  );
}
