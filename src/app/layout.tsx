import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/layout/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AskCold from "@/components/ask-cold/AskCold";
import { ThemeProvider } from "@/context/ThemeContext";
import { ColdGlassFilterDefs } from "@/components/ui/ColdGlassSurface";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};

export const metadata: Metadata = {
  title: "Taye Abolarin — Cold Designer | Independent Product Designer",
  description:
    "Portfolio of Taye Abolarin (Cold Designer) — Independent Product Designer & Design Technologist crafting conversational UX, transit systems, and editorial web experiences.",
  keywords: [
    "Product Designer",
    "Conversational UX",
    "Design Systems",
    "Mobile Design",
    "Cold Designer",
    "Taye Abolarin",
  ],
  authors: [{ name: "Taye Abolarin (Cold Designer)" }],
  creator: "Taye Abolarin",
  openGraph: {
    title: "Taye Abolarin — Cold Designer | Independent Product Designer",
    description:
      "Crafting conversational UX, transit systems, and tactile editorial web experiences.",
    url: "https://cold-designer-portfolio.vercel.app",
    siteName: "Cold Designer Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Taye Abolarin — Cold Designer | Independent Product Designer",
    description:
      "Crafting conversational UX, transit systems, and tactile editorial web experiences.",
    creator: "@taye_abolarin2",
  },
  icons: {
    icon: "/images/cold-designer-avatar.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} h-full antialiased dark`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Gochi+Hand&family=Inter+Tight:wght@700;800&family=JetBrains+Mono:wght@400;500;600&family=Patrick+Hand&family=Poppins:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Anti-flash synchronous theme initialization */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('cold-designer-theme');
                  var theme = (saved === 'light' || saved === 'dark') ? saved : 'dark';
                  document.documentElement.setAttribute('data-theme', theme);
                  if (theme === 'light') {
                    document.documentElement.classList.add('theme-light');
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('theme-light');
                  }
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                  document.documentElement.classList.add('dark');
                }
                try {
                  var heroRevealed = sessionStorage.getItem('cold_designer_hero_revealed');
                  if (heroRevealed === 'true') {
                    document.documentElement.setAttribute('data-hero-revealed', 'true');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--bg-primary,#090b0f)] text-[var(--text-primary,#f2f1ec)] selection:bg-[var(--accent,#a9ddf0)] selection:text-[var(--bg-primary,#090b0f)]">
        <ThemeProvider>
          <SmoothScroll>
            <ColdGlassFilterDefs />
            <CustomCursor />
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
            <AskCold />
          </SmoothScroll>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
