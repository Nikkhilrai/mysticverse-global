import styles from "./BangkokSkyline.module.css";

/*
  Hand-drawn line art of the Bangkok skyline over the Chao Phraya:
  Wat Arun's prangs (left), the mid-rise city, Baiyoke Tower II,
  King Power MahaNakhon with its stepped "pixel" cut, and the Rama
  VIII bridge (right). One continuous silhouette line draws itself
  left to right; details, lit windows and the river reflection
  follow. Purely decorative — aria-hidden.

  viewBox is 1440 × 360; the ground line sits at y = 272.
*/

const SILHOUETTE = [
  "M0 272 L0 236 L38 236 L38 220 L70 220 L70 244 L96 244 L96 210 L128 210 L128 250 L140 250 L140 258",
  // Wat Arun — left prang
  "L152 258 L158 238 L162 238 L165 214 L168 196 L171 214 L174 238 L178 238 L184 258",
  // Wat Arun — central prang
  "L196 258 L204 240 L211 240 L216 220 L222 220 L227 198 L232 198 L236 170 L240 170 L244 140 L247 140 L249 112 L250 90 L251 112 L253 140 L256 140 L260 170 L264 170 L268 198 L273 198 L278 220 L284 220 L289 240 L296 240 L304 258",
  // Wat Arun — right prang
  "L316 258 L322 238 L326 238 L329 214 L332 196 L335 214 L338 238 L342 238 L348 258",
  // mid-rise city
  "L360 258 L360 238 L392 238 L392 196 L430 196 L430 160 L452 160 L452 150 L470 150 L470 214 L500 214 L500 178 L540 178 L540 228 L566 228 L566 188 L600 188 L600 236 L628 236 L628 204 L660 204 L660 244 L706 244",
  // Baiyoke Tower II
  "L706 96 L700 96 L700 84 L752 84 L752 96 L746 96 L746 244 L774 244 L774 206 L806 206 L806 226 L852 226",
  // King Power MahaNakhon — stepped cut down the right face
  "L852 44 L900 44 L900 62 L890 62 L890 84 L900 84 L900 110 L888 110 L888 136 L900 136 L900 160 L892 160 L892 180 L900 180 L900 226",
  // east bank + Rama VIII deck + right edge
  "L930 226 L930 182 L966 182 L966 232 L990 232 L990 200 L1020 200 L1020 250 L1360 250 L1360 228 L1392 228 L1392 212 L1416 212 L1416 238 L1440 238 L1440 272",
].join(" ");

const DETAILS = [
  // Wat Arun tier bands
  "M211 240 L289 240 M222 220 L278 220 M232 198 L268 198 M240 170 L260 170",
  // Baiyoke antenna + crown band
  "M726 84 L726 30 M700 90 L752 90",
  // Rama VIII pylon (inverted Y) and crossbar
  "M1172 250 L1186 128 L1190 92 L1194 128 L1208 250 M1180 196 L1200 196",
  // Rama VIII fan cables
  "M1190 108 L1040 250 M1190 116 L1074 250 M1190 124 L1108 250 M1190 132 L1142 250 M1190 108 L1340 250 M1190 116 L1306 250 M1190 124 L1272 250 M1190 132 L1238 250",
  // river bank
  "M0 272 L1440 272",
].join(" ");

/* Deterministic "lit window" positions (same on server and client). */
const WINDOWS: Array<[number, number]> = (() => {
  const towers: Array<[number, number, number, number]> = [
    // x0, x1, yTop, yBottom
    [394, 428, 202, 236], [432, 450, 166, 236], [472, 498, 220, 244],
    [502, 538, 184, 226], [568, 598, 194, 234], [630, 658, 210, 242],
    [710, 742, 104, 240], [856, 884, 54, 222], [932, 964, 190, 228],
    [992, 1018, 206, 246], [1362, 1390, 234, 248],
  ];
  let seed = 7;
  const rand = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  const out: Array<[number, number]> = [];
  for (const [x0, x1, y0, y1] of towers) {
    for (let y = y0; y < y1; y += 9) {
      for (let x = x0; x < x1; x += 7) {
        if (rand() > 0.82) out.push([x, y]);
      }
    }
  }
  return out;
})();

/* Short shimmering strokes on the water, under the lit towers. */
const RIPPLES: Array<[number, number, number]> = [
  [180, 292, 60], [240, 312, 34], [420, 298, 48], [520, 322, 30],
  [700, 290, 70], [736, 316, 40], [860, 300, 56], [882, 334, 28],
  [1080, 296, 46], [1190, 310, 64], [1300, 328, 36], [60, 318, 32],
];

/*
  The towers are drawn at full height, then compressed vertically about
  the ground line so the tallest (MahaNakhon) tops out around y = 122.
  That keeps the upper third of the frame clear for the hero's buttons.
  Strokes use non-scaling-stroke, so line weight is unaffected.
*/
const COMPRESS = "translate(0 272) scale(1 0.66) translate(0 -272)";

export default function BangkokSkyline() {
  return (
    <svg
      className={styles.svg}
      viewBox="0 0 1440 360"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="bkkStroke" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#C9A04E" />
          <stop offset="0.45" stopColor="#F5C45A" />
          <stop offset="0.8" stopColor="#E3B3FF" />
          <stop offset="1" stopColor="#9B7CFF" />
        </linearGradient>
        <linearGradient id="bkkReflectFade" x1="0" y1="272" x2="0" y2="360" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="bkkReflectMask" maskUnits="userSpaceOnUse" x="0" y="272" width="1440" height="88">
          <rect x="0" y="272" width="1440" height="88" fill="url(#bkkReflectFade)" />
        </mask>
        <path id="bkkSilhouette" d={SILHOUETTE} />
      </defs>

      {/* River reflection — the silhouette mirrored across the bank */}
      <g className={styles.reflection} mask="url(#bkkReflectMask)">
        <g transform={COMPRESS}>
          <use href="#bkkSilhouette" transform="translate(0 544) scale(1 -1)" />
        </g>
      </g>

      <g className={styles.ripples}>
        {RIPPLES.map(([x, y, w], i) => (
          <line
            key={i}
            x1={x}
            y1={y}
            x2={x + w}
            y2={y}
            style={{ animationDelay: `${(i % 6) * 0.6}s` }}
          />
        ))}
      </g>

      <g className={styles.lines} transform={COMPRESS}>
        <path className={styles.silhouette} d={SILHOUETTE} pathLength={1} />
        <path className={styles.details} d={DETAILS} pathLength={1} />
      </g>

      <g className={styles.windows} transform={COMPRESS}>
        {WINDOWS.map(([x, y], i) => (
          <rect
            key={i}
            x={x}
            y={y}
            width="2.4"
            height="3.2"
            style={{ animationDelay: `${2.6 + (i % 13) * 0.17}s` }}
          />
        ))}
      </g>
    </svg>
  );
}
