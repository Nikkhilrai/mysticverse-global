import { ImageResponse } from "next/og";

/*
  Branded share card for LinkedIn / WhatsApp / X.
  Built with ImageResponse rather than a static file so the date, venue
  and wordmark stay editable in code. Uses system-weight sans — custom
  fonts would need to be fetched and embedded per render.
*/
export const alt =
  "MysticVerse Global 2026 — Where Conscious Luxury Meets Inner Mastery. 11 September 2026, Dubai.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#08080E",
          backgroundImage:
            "radial-gradient(900px 500px at 12% 8%, rgba(245,196,90,0.20), transparent 60%), radial-gradient(900px 600px at 92% 100%, rgba(124,92,255,0.32), transparent 62%)",
        }}
      >
        {/* Top rule + eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 3,
              background: "linear-gradient(90deg,#F5C45A,#C77DFF)",
            }}
          />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#F5C45A",
              fontWeight: 700,
            }}
          >
            MysticVerse Global 2026
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 82,
              lineHeight: 1.04,
              letterSpacing: -2.5,
              color: "#F4F2F7",
              fontWeight: 700,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Where Conscious Luxury</span>
            <span
              style={{
                background: "linear-gradient(90deg,#F5C45A,#C77DFF,#7C5CFF)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Meets Inner Mastery.
            </span>
          </div>
        </div>

        {/* Footer facts */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            fontSize: 26,
            color: "#DAD8E2",
            borderTop: "1px solid rgba(245,196,90,0.28)",
            paddingTop: 28,
          }}
        >
          <span style={{ fontWeight: 700, color: "#F5C45A" }}>
            11 September 2026
          </span>
          <span style={{ color: "#5E5C6C" }}>·</span>
          <span>Taj Jumeirah Lakes Towers, Dubai</span>
          <span style={{ color: "#5E5C6C" }}>·</span>
          <span>Four Pillars. One Room.</span>
        </div>
      </div>
    ),
    size,
  );
}
