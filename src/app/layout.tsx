import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/layout/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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
    url: "https://colddesigner.com",
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
    icon: "/favicon.ico",
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
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#090b0f] text-[#f2f1ec] selection:bg-[#a9ddf0] selection:text-[#090b0f]">
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
