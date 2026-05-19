import HeroSection from "@/components/HeroSection";
import RoadSection from "@/components/RoadSection";
import ScrollShowcase from "@/components/ScrollShowcase";
import FeatureSlider from "@/components/FeatureSlider";
import AnimatedGlobeHero from "@/components/AnimatedGlobeHero";
import VideoHeroSection from "@/components/VideoHeroSection";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import LogoMarquee from "@/components/Logomarquee";
import SmartIoT from "@/components/SmartIoT";

export default function Home() {
  return (
    <main className="min-h-screen bg-white relative">
      <HeroSection />

      {/* Road needs elevated z-index to layer over hero bottom edge */}
      <div style={{ position: 'relative', zIndex: 200 }}>
        <RoadSection />
      </div>

      <ScrollShowcase />
      <FeatureSlider />
      <SmartIoT />
      <AnimatedGlobeHero />
      <VideoHeroSection />
      <TestimonialCarousel />
      <LogoMarquee />
    </main>
  );
}
