"use client";

import { useEffect } from "react";

const CRITICAL_SCROLL_ASSETS = [
  "/images/projects/medesy/whatsapp-mockup-opt.webp",
  "/images/projects/9jatrip/booking-ride-mockup-opt.webp",
  "/images/projects/somewhere/hotel-exterior-sunset-opt.webp",
  "/images/projects/buybuddy/store-landing-opt.webp",
  "/images/projects/stillwater/venue-exterior-opt.webp",
  "/images/projects/somewhere/suite-balcony-sunset-opt.webp",
  "/images/projects/buybuddy/whatsapp-chat-opt.webp",
  "/images/projects/stillwater/04_Auditorium_Threshold-opt.webp",
];

export default function AssetPreloader() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let cancelled = false;

    // Warm GPU bitmap and texture cache during idle time
    // so when the user scrolls from Hero & About to Work & Notebook,
    // decoding is already 100% complete and zero hitching occurs.
    const predecode = () => {
      if (cancelled) return;

      CRITICAL_SCROLL_ASSETS.forEach((src) => {
        const img = new Image();
        img.src = src;
        if ("decode" in img) {
          img.decode().catch(() => {});
        }
      });
    };

    if ("requestIdleCallback" in window) {
      const handle = (
        window as unknown as {
          requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number;
        }
      ).requestIdleCallback(predecode, { timeout: 1200 });

      return () => {
        cancelled = true;
        if ("cancelIdleCallback" in window) {
          (
            window as unknown as { cancelIdleCallback: (id: number) => void }
          ).cancelIdleCallback(handle);
        }
      };
    } else {
      const timer = setTimeout(predecode, 100);
      return () => {
        cancelled = true;
        clearTimeout(timer);
      };
    }
  }, []);

  return null;
}

