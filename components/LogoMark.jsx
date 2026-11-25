/**
 * The logo mark, "Rendered": an O whose left half is square pixels (code) and whose
 * right half is a smooth curve (the finished site). Drawn on a 256 grid like the
 * master file in /public/brand.
 *
 * Colours come from CSS: the pixels use --mark-pixels (blue by default), the smooth
 * half uses currentColor, so it follows the text colour and the theme.
 */
const U = 20; // pixel size
const R = 100; // outer radius
const r = 52; // inner radius
const C = 128; // centre

// Pixel cells of the left half, top row first, so a hover can sweep them like a scan line
const CELLS = (() => {
  const cells = [];
  for (let gx = C - U; gx > C - R - U; gx -= U) {
    for (let gy = C - R; gy < C + R; gy += U) {
      const d = Math.hypot(gx + U / 2 - C, gy + U / 2 - C);
      if (d >= r - 1 && d <= R + 1) cells.push([gx, gy]);
    }
  }
  return cells.sort((a, b) => a[1] - b[1] || b[0] - a[0]);
})();

const SMOOTH = `M${C} ${C - R}A${R} ${R} 0 0 1 ${C} ${C + R}V${C + r}A${r} ${r} 0 0 0 ${C} ${C - r}Z`;

export default function LogoMark({ className = '' }) {
  return (
    <svg className={`mark ${className}`} viewBox="28 28 200 200" aria-hidden="true" focusable="false">
      <g className="mark__px">
        {CELLS.map(([x, y], i) => (
          // 0.6 of overlap hides hairline seams between neighbouring cells
          <rect key={`${x}-${y}`} x={x} y={y} width={U + 0.6} height={U + 0.6} style={{ '--i': i }} />
        ))}
      </g>
      <path className="mark__smooth" d={SMOOTH} />
    </svg>
  );
}
