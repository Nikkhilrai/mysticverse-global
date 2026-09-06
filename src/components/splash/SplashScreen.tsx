"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./SplashScreen.module.css";

const SEEN_KEY = "mvg-splash-seen";
const FALLBACK_MS = 7000;

export default function SplashScreen() {
  const [show, setShow] = useState<boolean | null>(null);
  const [fading, setFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem(SEEN_KEY);
    setShow(!seen && !reduceMotion);
  }, []);

  useEffect(() => {
    if (!show) return;

    document.body.style.overflow = "hidden";
    const fallback = setTimeout(dismiss, FALLBACK_MS);

    function dismiss() {
      if (doneRef.current) return;
      doneRef.current = true;
      sessionStorage.setItem(SEEN_KEY, "1");
      setFading(true);
      setTimeout(() => setShow(false), 500);
    }

    const video = videoRef.current;
    video?.addEventListener("ended", dismiss);
    video?.addEventListener("error", dismiss);

    return () => {
      document.body.style.overflow = "";
      clearTimeout(fallback);
      video?.removeEventListener("ended", dismiss);
      video?.removeEventListener("error", dismiss);
    };
  }, [show]);

  if (!show) return null;

  function handleSkip() {
    if (doneRef.current) return;
    doneRef.current = true;
    sessionStorage.setItem(SEEN_KEY, "1");
    setFading(true);
    setTimeout(() => setShow(false), 500);
  }

  return (
    <div className={`${styles.overlay}${fading ? ` ${styles.fading}` : ""}`}>
      <video
        ref={videoRef}
        className={styles.video}
        src="/video/Mysticverse_logo_animation-web.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
      />
      <button type="button" className={styles.skip} onClick={handleSkip}>
        Skip
      </button>
    </div>
  );
}
