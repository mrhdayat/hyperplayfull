"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

export default function VideoReel() {
  const containerRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=150%",
        scrub: 1,
        pin: true,
      }
    });

    tl.to(mediaRef.current, {
      width: "100vw",
      height: "100vh",
      borderRadius: "0px",
      ease: "power2.inOut",
    })
      .to(textRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        ease: "back.out(1.5)"
      }, "-=0.2");

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="h-screen bg-charcoal flex flex-col items-center justify-center relative overflow-hidden">
      <div
        ref={mediaRef}
        className="w-[80vw] h-[60vh] md:w-[60vw] museum-frame quirky-border-alt overflow-hidden relative z-10"
      >
        <Image
          src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2832&auto=format&fit=crop"
          alt="Showreel Thumbnail"
          fill
          className="object-cover opacity-80"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-moss/30 mix-blend-multiply" />

        {/* Play Button Indicator */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/50 animate-pulse">
          <div className="w-0 h-0 border-t-[15px] border-t-transparent border-l-[25px] border-l-white border-b-[15px] border-b-transparent ml-2" />
        </div>
      </div>

      <div
        ref={textRef}
        className="absolute z-20 opacity-0 scale-50 translate-y-20 pointer-events-none mix-blend-difference"
      >
        <h2 className="font-sans text-6xl md:text-9xl font-black uppercase text-ivory text-center leading-none">
          Experience<br />
          <span className="font-mono italic text-moss stroke-text">The Codex</span>
        </h2>
      </div>
    </section>
  );
}
