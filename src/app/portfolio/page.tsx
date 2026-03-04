"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

const works = [
  { id: 1, title: "Awwwards Pick", category: "Experimental", src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop" },
  { id: 2, title: "Godly.website", category: "E-Commerce", src: "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=1000&auto=format&fit=crop" },
  { id: 3, title: "Museumcore", category: "Installation", src: "https://images.unsplash.com/photo-1510936111840-65e151ad71bb?q=80&w=1000&auto=format&fit=crop" },
  { id: 4, title: "Hyperreal", category: "SaaS", src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1000&auto=format&fit=crop" },
  { id: 5, title: "Brutalist Base", category: "Agency", src: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop" },
  { id: 6, title: "Playful Grid", category: "Portfolio", src: "https://images.unsplash.com/photo-1506744626753-1fa44df31c7f?q=80&w=1000&auto=format&fit=crop" },
];

export default function PortfolioPage() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 100, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.2)",
        delay: 0.5
      }
    );
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen bg-charcoal text-ivory pt-32 px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-sans text-6xl md:text-8xl font-black mb-16 uppercase text-center quirky-border inline-block px-12 py-4 border-b border-moss">
          Complete <span className="font-mono text-moss italic font-light">Archive</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {works.map((work, i) => (
            <div
              key={work.id}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              className="group museum-frame aspect-square bg-white/5 cursor-pointer overflow-hidden quirky-border relative flex items-center justify-center"
            >
              <Image
                src={work.src}
                alt={work.title}
                fill
                className="object-cover opacity-70 transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-8 left-8 right-8 z-20 transform transition-transform duration-500 group-hover:-translate-y-4">
                <span className="font-mono text-xs tracking-[0.2em] text-moss mb-2 block uppercase">
                  {work.category}
                </span>
                <h3 className="font-sans text-2xl font-bold uppercase">
                  {work.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
