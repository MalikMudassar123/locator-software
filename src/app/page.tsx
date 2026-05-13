import HeroSection from "@/components/HeroSection";
import RoadSection from "@/components/RoadSection";
import RoadAnimationSection from "@/components/road-animation/RoadAnimationSection";

export default function Home() {
  return (
    <main
      className="min-h-screen bg-white overflow-x-hidden relative"
      style={{ paddingLeft: '50px', paddingRight: '50px' }}
    >
      {/* Hero — full-bleed: escape the 50px root padding with negative margins */}
      <div style={{ position: 'relative', zIndex: 1, marginLeft: '-50px', marginRight: '-50px' }}>
        <HeroSection />
      </div>

      {/* Road — full-bleed: same negative-margin escape */}
      <div style={{ position: 'relative', zIndex: 200, marginLeft: '-50px', marginRight: '-50px' }}>
        <RoadSection />
      </div>

      {/* RoadAnimationSection — full-bleed: escape the 50px root padding */}
      <div style={{ position: 'relative', zIndex: 1, marginLeft: '-50px', marginRight: '-50px' }}>
        <RoadAnimationSection />
      </div>
    </main>
  );
}
