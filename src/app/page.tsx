import HeroSection from "@/components/HeroSection";
import RoadSection from "@/components/RoadSection";
import ScrollShowcase from "@/components/ScrollShowcase";

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
    </main>
  );
}
