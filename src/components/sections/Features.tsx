"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const features = [
  { title: "Spatial UX", desc: "Multi-dimensional depth that shatters the flat screen illusion.", speed: 1.2 },
  { title: "Kinetic Flow", desc: "Living typography that breathes, stretches, and commands attention.", speed: 0.8 },
  { title: "Brutalist Joy", desc: "Raw, unapologetic geometry colliding with fluid mechanics.", speed: 1.5 },
  { title: "Hyper Lighting", desc: "Volumetric illumination and refractions, minus the WebGL tax.", speed: 0.9 },
];

export default function Features() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    cardsRef.current.forEach((card, i) => {
      const speed = features[i].speed;

      // Entrance animation for opacity
      gsap.fromTo(card,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: card,
            start: "top 80%"
          }
        }
      );

      // Scrubbing parallax for Y axis only
      gsap.fromTo(card,
        { y: 150 * speed },
        {
          y: -150 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-40 bg-ivory overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h2 className="font-sans text-6xl md:text-8xl font-black uppercase mb-32 text-charcoal text-center">
          The <span className="font-mono text-moss italic">Anatomy</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 relative">
          {features.map((feature, i) => (
            <div
              key={i}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              className={`p-12 museum-frame bg-white quirky-border shadow-xl hover:-translate-y-4 hover:shadow-2xl transition-all duration-300 ${i % 2 === 0 ? "md:translate-y-24" : ""
                }`}
            >
              <h3 className="font-sans text-3xl font-bold uppercase text-moss mb-4">{feature.title}</h3>
              <p className="font-mono text-lg text-charcoal/80 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-moss/5 rounded-full blur-[100px] pointer-events-none z-0" />
    </section>
  );
}
