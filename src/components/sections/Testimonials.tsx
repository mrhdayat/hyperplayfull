"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

const reviews = [
  { name: "Alex R.", role: "Creative Technologist", text: "A viscerally satisfying digital environment. The motion physics are immaculate." },
  { name: "Sarah J.", role: "Studio Founder", text: "It transcends standard web design—it feels like an interactive gallery exhibition." },
  { name: "Marcus T.", role: "Design Lead", text: "Finally, brutalist architecture translated into fluid, unapologetic kinetic typography." }
];

export default function Testimonials() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Continuous Marquee
    gsap.to(marqueeRef.current, {
      xPercent: -50,
      repeat: -1,
      duration: 20,
      ease: "linear"
    });

    // Bouncy stacked card reveal
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 150, rotate: index % 2 === 0 ? -15 : 15, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          rotate: index % 2 === 0 ? -3 : 3,
          scale: 1,
          duration: 1.2,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse"
          },
          delay: index * 0.2
        }
      );
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 bg-moss overflow-hidden relative">
      <div
        ref={marqueeRef}
        className="flex whitespace-nowrap mb-24 opacity-20"
      >
        <span className="font-sans text-9xl font-black uppercase text-ivory mr-10">THE WORD ON THE STREET • </span>
        <span className="font-sans text-9xl font-black uppercase text-ivory mr-10">THE WORD ON THE STREET • </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {reviews.map((r, i) => (
          <div
            key={i}
            ref={el => { if (el) cardsRef.current[i] = el; }}
            className="bg-ivory text-charcoal p-10 quirky-border shadow-2xl transform origin-bottom hover:-translate-y-4 hover:rotate-0 transition-transform duration-300"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden relative">
                <Image
                  src={`https://i.pravatar.cc/150?u=${i}`}
                  alt={r.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold font-sans text-lg">{r.name}</h4>
                <p className="font-mono text-xs text-moss uppercase tracking-widest">{r.role}</p>
              </div>
            </div>
            <p className="font-sans text-2xl italic leading-relaxed">"{r.text}"</p>
          </div>
        ))}
      </div>
    </section>
  );
}
