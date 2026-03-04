"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1, // smooth scrubbing
      },
    });

    // Parallax and stretch effect on scroll
    tl.to(textRef.current, {
      scaleY: 1.5,
      y: 150,
      opacity: 0.2,
      rotateX: 45,
      ease: "power2.inOut",
    }, 0)
      .to(subRef.current, {
        y: 100,
        opacity: 0,
      }, 0)
      .to(frameRef.current, {
        y: 50,
        rotateZ: 2,
        scale: 0.95,
      }, 0);

    // Initial load animation
    gsap.fromTo(
      textRef.current?.children || [],
      { y: 100, opacity: 0, rotate: 10 },
      {
        y: 0,
        opacity: 1,
        rotate: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "back.out(1.5)",
        delay: 1.5 // Wait for Loading Screen
      }
    );

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-6 overflow-hidden perspective-1000"
    >
      <div
        ref={frameRef}
        className="museum-frame w-full max-w-7xl h-[80vh] flex flex-col items-center justify-center bg-white/20 backdrop-blur-sm quirky-border-alt relative z-10"
      >
        <h1
          ref={textRef}
          className="font-sans text-6xl md:text-9xl font-black text-charcoal text-center leading-[0.8] mb-8 uppercase"
          style={{ textShadow: "4px 4px 0px rgba(0,0,0,0.1), -1px -1px 0px rgba(255,255,255,0.8)" }}
        >
          <span className="inline-block">HYPER</span><br />
          <span className="inline-block font-mono italic font-light text-moss">PLAYFUL</span><br />
          <span className="inline-block">EDITORIAL</span>
        </h1>

        <p
          ref={subRef}
          className="font-mono max-w-xl text-center text-lg md:text-xl text-charcoal/80"
        >
          A cinematic blend of hyperreality and playful brutalism.
          Scroll down to explore the museum.
        </p>

        {/* Floating decoration elements */}
        <div className="absolute top-10 left-10 w-24 h-24 border-2 border-moss rounded-full opacity-50 blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-moss/20 quirky-border blur-2xl" />
      </div>
    </section>
  );
}
