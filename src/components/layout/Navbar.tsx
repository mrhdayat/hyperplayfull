"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Menu } from "lucide-react";
import gsap from "gsap";
import Magnetic from "@/components/ui/Magnetic";
import { useAudio } from "@/hooks/useAudio";

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const { playHover, playClick } = useAudio();

  useEffect(() => {
    // Entry animation
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0, rotate: -2 },
      { y: 0, opacity: 1, rotate: 0, duration: 1, ease: "bounce.out", delay: 1.5 }
    );
  }, []);

  const handleHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    playHover();
    gsap.to(e.currentTarget, {
      scale: 1.1,
      rotate: Math.random() * 6 - 3, // quirky rotate between -3 and 3
      color: "var(--color-moss)",
      duration: 0.3,
      ease: "back.out(2)",
    });
  };

  const handleHoverExit = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      rotate: 0,
      color: "var(--color-charcoal)",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[9000] w-[90%] max-w-4xl"
    >
      <div className="museum-frame bg-white/40 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <Magnetic>
          <Link href="/" onClick={playClick} className="inline-block font-sans font-bold text-2xl tracking-tighter hover:text-moss transition-colors">
            HYPER<span className="font-mono text-moss italic">PLAYFUL</span>
          </Link>
        </Magnetic>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-mono text-sm font-bold uppercase tracking-widest">
          {["About", "Portfolio", "Previews"].map((item) => (
            <Magnetic key={item}>
              <Link
                href={`/${item.toLowerCase()}`}
                className="inline-block transition-colors px-2 py-1"
                onMouseEnter={handleHover}
                onMouseLeave={handleHoverExit}
                onClick={playClick}
              >
                {item}
              </Link>
            </Magnetic>
          ))}
        </div>

        {/* Mobile Menu */}
        <Magnetic>
          <button onClick={playClick} onMouseEnter={playHover} className="md:hidden p-2 rounded-full hover:bg-black/5 transition-colors group">
            <Menu className="w-6 h-6 text-charcoal group-hover:text-moss transition-colors" />
          </button>
        </Magnetic>
      </div>
    </nav>
  );
}
