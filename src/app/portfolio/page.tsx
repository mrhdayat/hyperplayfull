"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

const works = [
  { id: 1, title: "Awwwards Pick", category: "Experimental", src: "https://picsum.photos/seed/aww/1000/1000" },
  { id: 2, title: "Godly.website", category: "E-Commerce", src: "https://picsum.photos/seed/godly/1000/1000" },
  { id: 3, title: "Museumcore", category: "Installation", src: "https://picsum.photos/seed/museum/1000/1000" },
  { id: 4, title: "Hyperreal", category: "SaaS", src: "https://picsum.photos/seed/saas/1000/1000" },
  { id: 5, title: "Brutalist Base", category: "Agency", src: "https://picsum.photos/seed/brut/1000/1000" },
  { id: 6, title: "Playful Grid", category: "Portfolio", src: "https://picsum.photos/seed/play/1000/1000" },
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
