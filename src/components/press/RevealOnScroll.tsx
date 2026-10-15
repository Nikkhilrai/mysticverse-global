"use client";

import { useEffect, useRef, type ReactNode } from "react";

/*
  Adds `inClass` to every [data-reveal] element inside it as that
  element scrolls into view (once). Lets the press release stay a
  server component — only this wrapper ships to the client.
*/
export default function RevealOnScroll({
  inClass,
  children,
}: {
  inClass: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add(inClass));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(inClass);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [inClass]);

  return <div ref={ref}>{children}</div>;
}
