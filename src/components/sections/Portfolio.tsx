"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const projects = [
  { id: 1, title: "Awwwards Pick", category: "Experimental" },
  { id: 2, title: "Godly.website", category: "E-Commerce" },
  { id: 3, title: "Museumcore", category: "Installation" },
];

export default function Portfolio() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 100, rotate: index % 2 === 0 ? -5 : 5 },
        {
          opacity: 1,
          y: 0,
          rotate: 0,
          duration: 1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        }
      );
    });

  }, { scope: containerRef });

  return (
    <section id="portfolio" className="py-32 px-6 bg-charcoal text-ivory" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        <h2 className="font-sans text-6xl md:text-8xl font-black mb-20 text-center quirky-border inline-block px-12 py-4 border-b border-moss uppercase">
          SELECTED <span className="font-mono text-moss italic font-light">WORKS</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.map((p, i) => (
            <div
              key={p.id}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              className="group museum-frame aspect-[3/4] bg-ivory/5 cursor-pointer flex flex-col justify-end p-8 relative overflow-hidden quirky-border"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent z-10 opacity-60" />

              {/* Fake Image Background */}
              <div className="absolute inset-0 bg-moss/20 transform origin-center transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-110 group-hover:rotate-2 group-hover:blur-[2px]" />

              <div className="relative z-20 transform transition-transform duration-500 group-hover:-translate-y-4">
                <span className="font-mono text-xs tracking-[0.2em] text-moss mb-2 block uppercase">
                  {p.category}
                </span>
                <h3 className="font-sans text-3xl font-bold uppercase">
                  {p.title}
                </h3>
              </div>

              {/* Quirky hover reveal element */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-moss rounded-full mix-blend-screen blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none scale-50 group-hover:scale-150" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
