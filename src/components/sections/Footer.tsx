"use client";

import { useRef } from "react";
import gsap from "gsap";
import Magnetic from "@/components/ui/Magnetic";
import { useAudio } from "@/hooks/useAudio";

export default function Footer() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { playHover, playClick } = useAudio();

  const handleBackToTop = () => {
    playClick();
    // Playful burst animation
    gsap.to(buttonRef.current, {
      scale: 1.5,
      rotate: 360,
      opacity: 0,
      duration: 0.5,
      ease: "back.in(2)",
      onComplete: () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        gsap.set(buttonRef.current, { scale: 1, rotate: 0, opacity: 1 });
      }
    });
  };

  const handleHover = () => {
    playHover();
    gsap.to(buttonRef.current, {
      y: -10,
      scale: 1.1,
      duration: 0.3,
      ease: "bounce.out"
    });
  };

  const handleLeave = () => {
    gsap.to(buttonRef.current, {
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <footer className="relative bg-ivory pt-32 pb-12 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <h2 className="font-sans text-5xl md:text-8xl font-black text-charcoal text-center mb-12 uppercase">
          LET'S MAKE IT <span className="font-mono text-moss italic">QUIRKY</span>
        </h2>

        <Magnetic>
          <button
            ref={buttonRef}
            onClick={handleBackToTop}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            className="quirky-border w-32 h-32 bg-moss text-ivory flex items-center justify-center font-mono font-bold uppercase tracking-widest shadow-2xl hover:bg-moss-light transition-colors"
          >
            Top
          </button>
        </Magnetic>

        <div className="mt-24 w-full flex flex-col md:flex-row justify-between items-center font-mono text-sm text-charcoal/60 border-t border-charcoal/10 pt-8">
          <p>© 2026 Hyper Playful Editorial. All rites reversed.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            {["Twitter", "Awwwards", "Instagram"].map((link) => (
              <a
                key={link}
                href="#"
                onClick={playClick}
                onMouseEnter={playHover}
                className="hover:text-moss transition-colors uppercase tracking-widest"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
