import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Lab — Experiments & Interface Explorations | Cold Designer",
  description:
    "Interactive design experiments, state lifecycle studies, adaptive themes, density ergonomics, and micro-interaction prototypes by Cold Designer (Taye Abolarin).",
  openGraph: {
    title: "The Lab — Cold Designer",
    description:
      "Interactive design experiments, state lifecycle studies, adaptive themes, density ergonomics, and micro-interaction prototypes.",
    url: "https://cold-designer-portfolio.vercel.app/lab",
    siteName: "Cold Designer Portfolio",
    type: "website",
  },
};

export default function LabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

