"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import HTMLFlipBook from "react-pageflip";
import styles from "./MagazineReader.module.css";

/* A single flip page — react-pageflip requires forwardRef children. */
const Page = forwardRef<HTMLDivElement, { children: ReactNode; hard?: boolean }>(
  function Page({ children, hard }, ref) {
    return (
      <div
        className={styles.page}
        ref={ref}
        data-density={hard ? "hard" : "soft"}
      >
        {children}
      </div>
    );
  },
);

interface Props {
  url: string;
  title: string;
  onClose: () => void;
}

/* Render window: pages within this distance of the current spread render. */
const WINDOW = 3;
const RENDER_WIDTH = 1100; // canvas pixel width for crisp text

export default function MagazineReader({ url, title, onClose }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pdfRef = useRef<any>(null);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const rendered = useRef<Set<number>>(new Set());
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bookRef = useRef<any>(null);

  const [numPages, setNumPages] = useState(0);
  const [aspect, setAspect] = useState(0.707); // w / h, default A4 portrait
  const [current, setCurrent] = useState(0);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  /* ── Render a single PDF page into its canvas ──────────── */
  const renderPage = useCallback(async (i: number) => {
    const pdf = pdfRef.current;
    if (!pdf || rendered.current.has(i)) return;
    rendered.current.add(i);
    try {
      const page = await pdf.getPage(i + 1);
      const base = page.getViewport({ scale: 1 });
      const scale = Math.min(RENDER_WIDTH / base.width, 3);
      const viewport = page.getViewport({ scale });
      const canvas = canvasRefs.current[i];
      if (!canvas) { rendered.current.delete(i); return; }
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      await page.render({ canvasContext: ctx, viewport }).promise;
    } catch {
      rendered.current.delete(i);
    }
  }, []);

  const renderWindow = useCallback(
    (center: number) => {
      for (let i = center - WINDOW; i <= center + WINDOW; i++) {
        if (i >= 0 && i < numPages) renderPage(i);
      }
    },
    [numPages, renderPage],
  );

  /* ── Load the document (streamed, not fully downloaded) ── */
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.mjs";
        const task = pdfjs.getDocument({
          url,
          disableAutoFetch: true, // don't pull all 52 MB up front
          disableStream: false,
        });
        const pdf = await task.promise;
        if (cancelled) return;
        pdfRef.current = pdf;
        const first = await pdf.getPage(1);
        const vp = first.getViewport({ scale: 1 });
        setAspect(vp.width / vp.height);
        setNumPages(pdf.numPages);
        setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();
    return () => { cancelled = true; };
  }, [url]);

  /* ── Lock body scroll while the reader is open ─────────── */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  /* ── Keyboard: arrows flip, Esc closes ─────────────────── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") bookRef.current?.pageFlip()?.flipNext();
      else if (e.key === "ArrowLeft") bookRef.current?.pageFlip()?.flipPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  /* ── Stable page elements (built once per document) ────── */
  const pages = useMemo(() => {
    return Array.from({ length: numPages }, (_, i) => (
      <Page key={i} hard={i === 0 || i === numPages - 1}>
        <canvas
          className={styles.canvas}
          ref={(el) => { canvasRefs.current[i] = el; }}
        />
      </Page>
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numPages]);

  const baseW = 540;
  const baseH = Math.round(baseW / aspect);

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label={`${title} — reader`}>
      <div className={styles.backdrop} onClick={onClose} />

      {/* Top bar */}
      <div className={styles.bar}>
        <p className={styles.barTitle}>{title}</p>
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close reader">
          <span aria-hidden="true">✕</span>
        </button>
      </div>

      {/* Stage */}
      <div className={styles.stage}>
        {status === "loading" && (
          <div className={styles.state}>
            <span className={styles.spinner} aria-hidden="true" />
            <p>Opening the magazine…</p>
          </div>
        )}
        {status === "error" && (
          <div className={styles.state}>
            <p>We couldn&rsquo;t open this magazine. Please try again.</p>
            <a href={url} target="_blank" rel="noopener noreferrer" className={styles.fallback}>
              Open the PDF instead →
            </a>
          </div>
        )}
        {status === "ready" && numPages > 0 && (
          <HTMLFlipBook
            width={baseW}
            height={baseH}
            size="stretch"
            minWidth={300}
            maxWidth={620}
            minHeight={Math.round(300 / aspect)}
            maxHeight={Math.round(620 / aspect)}
            drawShadow
            maxShadowOpacity={0.5}
            showCover
            usePortrait
            mobileScrollSupport
            flippingTime={750}
            startPage={0}
            startZIndex={0}
            autoSize
            clickEventForward
            useMouseEvents
            swipeDistance={30}
            showPageCorners
            disableFlipByClick={false}
            renderOnlyPageLengthChange
            className={styles.book}
            style={{}}
            ref={bookRef}
            onInit={() => renderWindow(0)}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onFlip={(e: any) => { setCurrent(e.data); renderWindow(e.data); }}
          >
            {pages}
          </HTMLFlipBook>
        )}
      </div>

      {/* Controls */}
      {status === "ready" && (
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.navBtn}
            onClick={() => bookRef.current?.pageFlip()?.flipPrev()}
            aria-label="Previous page"
          >
            <span aria-hidden="true">←</span>
          </button>
          <span className={styles.counter}>
            {Math.min(current + 1, numPages)} <span className={styles.counterSep}>/</span> {numPages}
          </span>
          <button
            type="button"
            className={styles.navBtn}
            onClick={() => bookRef.current?.pageFlip()?.flipNext()}
            aria-label="Next page"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      )}
    </div>
  );
}
