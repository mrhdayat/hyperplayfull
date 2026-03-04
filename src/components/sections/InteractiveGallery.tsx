"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

const images = [
  "https://picsum.photos/seed/gal1/2564/1709",
  "https://picsum.photos/seed/gal2/2070/1380",
  "https://picsum.photos/seed/gal3/2070/1380",
  "https://picsum.photos/seed/gal4/2564/1709",
];

export default function InteractiveGallery() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const wrapper = scrollWrapperRef.current;

    if (!container || !wrapper) return;

    gsap.to(wrapper, {
      x: () => -(wrapper.scrollWidth - window.innerWidth + 100),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        end: () => `+=${wrapper.scrollWidth - window.innerWidth + 100}`,
        invalidateOnRefresh: true,
      }
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="h-screen bg-ivory flex items-center overflow-hidden">
      <div className="absolute top-20 left-10 z-10 font-mono text-charcoal/50 uppercase tracking-widest text-sm">
        [ Exhibition 01 ]
      </div>

      <div
        ref={scrollWrapperRef}
        className="flex gap-12 px-[10vw] items-center h-full w-[400vw] md:w-[300vw]"
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="group relative w-[80vw] md:w-[60vw] h-[60vh] md:h-[70vh] flex-shrink-0 museum-frame quirky-border overflow-hidden"
          >
            <div className="absolute inset-0 bg-charcoal/20 z-10 group-hover:bg-transparent transition-colors duration-500" />
            <Image
              src={src}
              alt={`Gallery Image ${i + 1}`}
              fill
              className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-110"
              sizes="(max-width: 768px) 80vw, 60vw"
            />
            {/* Playful hover element */}
            <div className="absolute bottom-10 left-10 p-4 bg-white/30 backdrop-blur-md quirky-border-alt opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 transform translate-y-10 group-hover:translate-y-0 text-charcoal font-sans text-2xl font-bold">
              Immerse Now
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
