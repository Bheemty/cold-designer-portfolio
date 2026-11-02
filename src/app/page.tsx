import CursorGrid from "@/components/kokil/CursorGrid";
import HeroKokil from "@/components/kokil/HeroKokil";
import AboutKokil from "@/components/kokil/AboutKokil";
import WorkAccordion from "@/components/kokil/WorkAccordion";
import NotebookKokil from "@/components/kokil/NotebookKokil";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col bg-[#090b0f] text-[#ffffff] overflow-x-hidden">
      {/* Background Interactive Cursor Grid */}
      <CursorGrid
        cellSize={64}
        color="#a9ddf0"
        radius={180}
        falloff="smooth"
        holdTime={320}
        fadeDuration={750}
        lineWidth={1.2}
        maxOpacity={0.45}
        fillOpacity={0.04}
      />

      {/* Signature Rub-to-Reveal Hero with Interactive Googly Eyes */}
      <HeroKokil />

      {/* Scroll-Reveal About Section with Word Unblur Token Engine */}
      <AboutKokil />

      {/* Signature 5-Panel Horizontal Accordion Gallery */}
      <WorkAccordion />

      {/* Physical 3D Spiral Flippable Notebook */}
      <NotebookKokil />
    </main>
  );
}
