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
    <main
      className="min-h-screen bg-white relative"
      style={{ overflowX: 'clip', paddingLeft: '50px', paddingRight: '50px' }}
    >
      {/* Hero — full-bleed */}
      <div style={{ position: 'relative', zIndex: 1, marginLeft: '-50px', marginRight: '-50px' }}>
        <HeroSection />
      </div>

      {/* Road — full-bleed */}
      <div style={{ position: 'relative', zIndex: 200, marginLeft: '-50px', marginRight: '-50px' }}>
        <RoadSection />
      </div>

      {/* ScrollShowcase — full-bleed, directly after Road */}
      <div style={{ position: 'relative', zIndex: 1, marginLeft: '-50px', marginRight: '-50px' }}>
        <ScrollShowcase />
      </div>

      {/* FeatureSlider — tab-driven feature showcase */}
      <div style={{ position: 'relative', zIndex: 1, marginLeft: '-50px', marginRight: '-50px' }}>
        <FeatureSlider />
      </div>

      {/* SmartIoT — IoT features showcase */}
      <div style={{ position: 'relative', zIndex: 1, marginLeft: '-50px', marginRight: '-50px' }}>
        <SmartIoT />
      </div>

      {/* AnimatedGlobeHero — global network stats section */}
      <div style={{ position: 'relative', zIndex: 1, marginLeft: '-50px', marginRight: '-50px' }}>
        <AnimatedGlobeHero />
      </div>

      {/* VideoHeroSection — video showcase with floating blocks */}
      <div style={{ position: 'relative', zIndex: 1, marginLeft: '-50px', marginRight: '-50px' }}>
        <VideoHeroSection />
      </div>

      {/* TestimonialCarousel — client testimonials carousel */}
      <div style={{ position: 'relative', zIndex: 1, marginLeft: '-50px', marginRight: '-50px' }}>
        <TestimonialCarousel />
      </div>

      {/* LogoMarquee — partner/client logos marquee */}
      <div style={{ position: 'relative', zIndex: 1, marginLeft: '-50px', marginRight: '-50px' }}>
        <LogoMarquee />
      </div>
    </main>
  );
}
