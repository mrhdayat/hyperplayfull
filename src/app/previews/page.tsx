"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function PreviewsPage() {
  const containerRef = useRef<HTMLElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Continuous floating animation
    gsap.to(productRef.current, {
      y: -20,
      rotateX: 5,
      rotateY: -5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Intro animation
    gsap.fromTo(
      textRef.current?.children || [],
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.1, duration: 1, ease: "power2.out", delay: 0.5 }
    );

    gsap.fromTo(
      productRef.current,
      { scale: 0, opacity: 0, rotateZ: -10 },
      { scale: 1, opacity: 1, rotateZ: 0, duration: 1.5, ease: "elastic.out(1, 0.7)", delay: 1 }
    );
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!productRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    const xPos = (clientX / innerWidth - 0.5) * 40; // max rotation degrees
    const yPos = (clientY / innerHeight - 0.5) * -40;

    gsap.to(productRef.current, {
      rotateX: yPos,
      rotateY: xPos,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    if (!productRef.current) return;
    gsap.to(productRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 1,
      ease: "elastic.out(1, 0.3)"
    });
  };

  return (
    <main
      ref={containerRef}
      className="min-h-screen bg-ivory pt-32 px-6 pb-20 overflow-hidden flex items-center justify-center perspective-[2000px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div ref={textRef} className="space-y-6 z-10 pointer-events-none">
          <h1 className="font-sans text-6xl md:text-8xl font-black uppercase leading-none">
            3D Space<br />
            <span className="font-mono text-moss italic">Without WebGL</span>
          </h1>
          <p className="font-mono text-xl text-charcoal/70">
            Move your cursor. Feel the spatial depth. We use advanced CSS 3D transforms driven by GSAP to create hyper-real product previews without the overhead of heavy 3D models.
          </p>
          <div className="pt-8">
            <button className="quirky-border bg-charcoal text-ivory px-8 py-4 font-bold uppercase tracking-widest hover:bg-moss transition-colors pointer-events-auto">
              Pre-order Concept
            </button>
          </div>
        </div>

        <div className="relative h-[60vh] w-full flex items-center justify-center transform-style-3d pointer-events-none">
          {/* Simulated 3D Object Stack */}
          <div
            ref={productRef}
            className="w-80 h-80 relative museum-frame quirky-border-alt shadow-2xl bg-white/50 backdrop-blur-xl flex items-center justify-center"
            style={{
              transformStyle: "preserve-3d",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25), inset 0 0 0 1px rgba(255,255,255,0.5)"
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-moss/20 to-transparent mix-blend-multiply" />
            <Image
              src="https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2070&auto=format&fit=crop"
              alt="Interactive Object"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              style={{ transform: "translateZ(50px)" }}
            />
            <div
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 font-sans font-bold text-3xl uppercase tracking-widest text-charcoal"
              style={{ transform: "translateZ(80px)" }}
            >
              HYPER.OBJ
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
