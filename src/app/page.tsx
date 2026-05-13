import HeroSection from "@/components/HeroSection";
import RoadSection from "@/components/RoadSection";
import RoadAnimationSection from "@/components/road-animation/RoadAnimationSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden relative">
      <div style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection />
      </div>
      <div style={{ position: 'relative', zIndex: 200 }}>
        <RoadSection />
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <RoadAnimationSection />
      </div>
    </main>
  );
}
