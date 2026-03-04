import Hero from "@/components/sections/Hero";
import Philosophy from "@/components/sections/Philosophy";
import Manifesto from "@/components/sections/Manifesto";
import VideoReel from "@/components/sections/VideoReel";
import InteractiveGallery from "@/components/sections/InteractiveGallery";
import Features from "@/components/sections/Features";
import About from "@/components/sections/About";
import Portfolio from "@/components/sections/Portfolio";
import Team from "@/components/sections/Team";
import Testimonials from "@/components/sections/Testimonials";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="bg-ivory selection:bg-moss selection:text-ivory">
      <Hero />
      <Philosophy />
      <Manifesto />
      <VideoReel />
      <InteractiveGallery />
      <Features />
      <About />
      <Portfolio />
      <Team />
      <Testimonials />
      <Footer />
    </main>
  );
}
