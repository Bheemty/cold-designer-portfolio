"use client";

import React, { useEffect, useRef } from "react";

interface AutoPauseVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  threshold?: number;
}

/**
 * AutoPauseVideo: High-efficiency HTML5 video wrapper.
 * Automatically halts playback, audio decoding, and GPU surface rendering
 * whenever scrolled out of viewport or when the browser tab is inactive.
 * Seamlessly resumes when scrolled back into view.
 */
export default function AutoPauseVideo({
  threshold = 0.1,
  className = "",
  autoPlay = false,
  ...props
}: AutoPauseVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldAutoPlayRef = useRef(autoPlay);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isIntersecting = false;

    const playIfVisible = () => {
      if (isIntersecting && !document.hidden && shouldAutoPlayRef.current) {
        video.play().catch(() => {});
      }
    };

    const pauseIfNotVisible = () => {
      if (!video.paused) {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isIntersecting = entry?.isIntersecting ?? false;
        if (isIntersecting) {
          playIfVisible();
        } else {
          pauseIfNotVisible();
        }
      },
      { threshold }
    );

    observer.observe(video);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        pauseIfNotVisible();
      } else {
        playIfVisible();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [threshold]);

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay={autoPlay}
      {...props}
    />
  );
}
