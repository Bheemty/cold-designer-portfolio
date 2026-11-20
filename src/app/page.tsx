import CursorGrid from "@/components/kokil/CursorGrid";
import HeroKokil from "@/components/kokil/HeroKokil";
import AboutKokil from "@/components/kokil/AboutKokil";
import SelectedWorkRows from "@/components/home/SelectedWorkRows";
import LabChapterBreak from "@/components/home/LabChapterBreak";
import EndorsementsKokil from "@/components/kokil/EndorsementsKokil";
import AssetPreloader from "@/components/kokil/AssetPreloader";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col bg-[#090b0f] text-[#FDFDFD] overflow-x-clip">
      {/* Background Interactive Cursor Grid */}
      <CursorGrid
        cellSize={64}
        color="#38bdf8"
        radius={180}
        falloff="smooth"
        holdTime={320}
        fadeDuration={750}
        lineWidth={1.2}
        maxOpacity={0.45}
        fillOpacity={0.04}
      />

      {/* Architectural Rub-to-Reveal Hero with Interactive Googly Eyes & Motion Choreography */}
      <HeroKokil />

      {/* Scroll-Reveal About Section with Word Unblur Token Engine */}
      <AboutKokil />

      {/* (02) Selected Work: Full-Width Asymmetric Editorial Feature Rows */}
      <SelectedWorkRows />

      {/* (03) Contrast Chapter Break: Full-Bleed Dark COLD // R&D Lab Instrument Panel */}
      <LabChapterBreak />

      {/* (04) Endorsements Pull-Quote Sticky Scrollytelling Section */}
      <EndorsementsKokil />

      {/* Background idle image pre-decoder for smooth scroll transitions */}
      <AssetPreloader />
    </main>
  );
}
