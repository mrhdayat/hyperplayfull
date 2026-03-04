"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

const team = [
  { name: "SARA", role: "Creative Dir", seed: 44 },
  { name: "JOHN", role: "Motion Dev", seed: 68 },
  { name: "MIA", role: "3D Artist", seed: 23 },
  { name: "LEO", role: "UX Playmaker", seed: 15 },
];

export default function Team() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
      }
    });

    tl.fromTo(titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.5)" }
    );

    tl.fromTo(gridRef.current?.children || [],
      { opacity: 0, scale: 0.5, rotate: -20 },
      { opacity: 1, scale: 1, rotate: 0, stagger: 0.15, duration: 1, ease: "elastic.out(1, 0.6)" },
      "-=0.4"
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-40 bg-charcoal text-ivory px-6">
      <div className="max-w-7xl mx-auto">
        <h2 ref={titleRef} className="font-sans text-6xl md:text-8xl font-black uppercase mb-24 text-center">
          The <span className="font-mono text-moss italic">Visionaries</span>
        </h2>

        <div ref={gridRef} className="flex flex-wrap justify-center gap-16 md:gap-24">
          {team.map((member, i) => (
            <div key={i} className="group flex flex-col items-center">
              <div className="w-48 h-48 md:w-64 md:h-64 relative museum-frame rounded-full quirky-border-alt overflow-hidden transition-all duration-500 group-hover:quirky-border group-hover:scale-110 group-hover:rotate-6">
                <Image
                  src={`https://i.pravatar.cc/400?u=${member.seed}`}
                  alt={member.name}
                  fill
                  className="object-cover transition-all duration-700 group-hover:contrast-125 saturate-50 group-hover:saturate-100"
                  sizes="(max-width: 768px) 192px, 256px"
                />
                <div className="absolute inset-0 bg-moss/40 mix-blend-multiply opacity-50 group-hover:opacity-0 transition-opacity duration-300" />
              </div>

              <div className="mt-8 text-center transform transition-transform duration-300 group-hover:-translate-y-2">
                <h3 className="font-sans text-3xl font-bold uppercase">{member.name}</h3>
                <p className="font-mono text-sm tracking-widest text-moss mt-2 uppercase">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
