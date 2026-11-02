import Hero from "@/components/home/Hero";
import SelectedWork from "@/components/home/SelectedWork";
import DesignManifesto from "@/components/home/DesignManifesto";
import CapabilitiesBento from "@/components/home/CapabilitiesBento";
import InteractivePlayground from "@/components/home/InteractivePlayground";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col">
      <Hero />
      <SelectedWork />
      <DesignManifesto />
      <CapabilitiesBento />
      <InteractivePlayground />
    </main>
  );
}
