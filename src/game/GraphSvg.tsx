import { useRef, useState } from "react";
import { clipLine, fitStroke, fmt, triangleAnchor, X_MAX, X_MIN, Y_MAX, Y_MIN, type PointMark, type StrokeLine } from "./math";

type LineSpec = { m: number; c: number; vertical?: number };

type Props = {
  player: LineSpec | null;
  target: LineSpec | null;
  points?: PointMark[];
  triangle: boolean;
  /** 0..1 draws the player cut; null means a steady preview. */
  draw: number | null;
  playerLive: boolean;
  interactive?: boolean;
  onStrokeEnd?: (line: StrokeLine | null) => void;
  plane?: boolean;
};

const VB = "-5.15 -4.15 10.3 8.3";

function HLabel({ x, y, children, fill, size = 0.3 }: { x: number; y: number; children: string; fill: string; size?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(1 -1)`}>
      <text
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={size}
        fill={fill}
        fontFamily="var(--font-mono), ui-monospace, monospace"
      >
        {children}
      </text>
    </g>
  );
}

function Stroke({
  m,
  c,
  vertical,
  color,
  width,
  dashed,
  draw,
}: {
  m: number;
  c: number;
  vertical?: number;
  color: string;
  width: number;
  dashed?: boolean;
  draw?: number | null;
}) {
  const verticalOk = vertical != null && vertical >= X_MIN - 1e-6 && vertical <= X_MAX + 1e-6;
  const seg = verticalOk ? { x1: vertical, y1: Y_MIN, x2: vertical, y2: Y_MAX } : vertical != null ? null : clipLine(m, c);
  if (!seg) return null;
  const anim = draw != null;
  return (
    <line
      x1={seg.x1}
      y1={seg.y1}
      x2={seg.x2}
      y2={seg.y2}
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      pathLength={1}
      strokeDasharray={anim ? "1" : dashed ? "0.14 0.09" : undefined}
      strokeDashoffset={anim ? 1 - draw : undefined}
    />
  );
}

export function lineOffscreen(m: number, c: number, vertical?: number) {
  if (vertical != null) return vertical < X_MIN - 1e-6 || vertical > X_MAX + 1e-6;
  return clipLine(m, c) === null;
}

export function GraphSvg({ player, target, points, triangle, draw, playerLive, interactive, onStrokeEnd, plane = true }: Props) {
  const xs: number[] = [];
  for (let x = X_MIN; x <= X_MAX; x++) xs.push(x);
  const ys: number[] = [];
  for (let y = Y_MIN; y <= Y_MAX; y++) ys.push(y);
  const anchor = player && player.vertical == null && triangle ? triangleAnchor(player.m, player.c) : null;
  const gRef = useRef<SVGGElement>(null);
  const pts = useRef<{ x: number; y: number }[]>([]);
  const dragging = useRef(false);
  const [sketch, setSketch] = useState<{ x: number; y: number }[]>([]);

  function localPoint(e: { clientX: number; clientY: number }) {
    const node = gRef.current;
    const ctm = node?.getScreenCTM();
    if (!node || !ctm) return null;
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
    if (!Number.isFinite(p.x) || !Number.isFinite(p.y)) return null;
    return { x: p.x, y: p.y };
  }

  return (
    <svg
      viewBox={VB}
      className="h-full w-full touch-none"
      role="img"
      aria-label="坐標平面上的斬擊直線"
      onPointerDown={(e) => {
        if (!interactive) return;
        e.currentTarget.setPointerCapture(e.pointerId);
        const p = localPoint(e);
        dragging.current = true;
        pts.current = p ? [p] : [];
        setSketch(pts.current);
      }}
      onPointerMove={(e) => {
        if (!dragging.current) return;
        const p = localPoint(e);
        if (!p) return;
        const last = pts.current[pts.current.length - 1];
        if (last && Math.hypot(last.x - p.x, last.y - p.y) < 0.08) return;
        pts.current = [...pts.current, p];
        setSketch(pts.current);
      }}
      onPointerUp={() => {
        if (!dragging.current) return;
        dragging.current = false;
        const fitted = fitStroke(pts.current);
        pts.current = [];
        setSketch([]);
        onStrokeEnd?.(fitted);
      }}
    >
      <g ref={gRef} transform="scale(1 -1)">
        {plane && (
        <g className="coord-grid">
          {xs.map((x) => (
            <line
              key={`v${x}`}
              className={x === 0 ? "axis" : undefined}
              x1={x}
              x2={x}
              y1={Y_MIN}
              y2={Y_MAX}
              stroke="var(--color-line)"
              strokeWidth={x === 0 ? 0.045 : 0.015}
            />
          ))}
          {ys.map((y) => (
            <line
              key={`h${y}`}
              className={y === 0 ? "axis" : undefined}
              y1={y}
              y2={y}
              x1={X_MIN}
              x2={X_MAX}
              stroke="var(--color-line)"
              strokeWidth={y === 0 ? 0.045 : 0.015}
            />
          ))}
          <HLabel x={X_MAX - 0.15} y={-0.32} fill="var(--color-mute)" size={0.32}>
            x
          </HLabel>
          <HLabel x={0.32} y={Y_MAX - 0.05} fill="var(--color-mute)" size={0.32}>
            y
          </HLabel>
          {xs
            .filter((x) => x !== 0)
            .map((x) => (
              <HLabel key={`lx${x}`} x={x} y={-0.34} fill="var(--color-mute)" size={0.26}>
                {String(x)}
              </HLabel>
            ))}
          {ys
            .filter((y) => y !== 0)
            .map((y) => (
              <HLabel key={`ly${y}`} x={-0.38} y={y} fill="var(--color-mute)" size={0.26}>
                {String(y)}
              </HLabel>
            ))}
        </g>
        )}

        {target && (
          <Stroke m={target.m} c={target.c} vertical={target.vertical} color="var(--color-jade)" width={0.16} />
        )}
        {target && <Stroke m={target.m} c={target.c} vertical={target.vertical} color="var(--color-jade)" width={0.045} />}

        {playerLive && player && (
          <>
            <Stroke
              m={player.m}
              c={player.c}
              vertical={player.vertical}
              color="var(--color-cinnabar)"
              width={0.18}
              dashed={draw == null}
              draw={draw}
            />
            <Stroke
              m={player.m}
              c={player.c}
              vertical={player.vertical}
              color="var(--color-parchment)"
              width={0.035}
              dashed={draw == null}
              draw={draw}
            />
          </>
        )}

        {target && target.vertical == null && Math.abs(target.c) <= Y_MAX + 0.05 && (
          <circle cx={0} cy={target.c} r={0.09} fill="var(--color-jade)" />
        )}
        {playerLive && player && player.vertical == null && Math.abs(player.c) <= Y_MAX + 0.05 && (
          <circle cx={0} cy={player.c} r={0.11} fill="none" stroke="var(--color-gold)" strokeWidth={0.04} />
        )}

        {player && player.vertical == null && anchor != null && (
          <g>
            <line
              x1={anchor}
              y1={player.m * anchor + player.c}
              x2={anchor + 1}
              y2={player.m * anchor + player.c}
              stroke="var(--color-gold)"
              strokeWidth={0.03}
              strokeDasharray="0.08 0.05"
            />
            <line
              x1={anchor + 1}
              y1={player.m * anchor + player.c}
              x2={anchor + 1}
              y2={player.m * (anchor + 1) + player.c}
              stroke="var(--color-gold)"
              strokeWidth={0.03}
              strokeDasharray="0.08 0.05"
            />
            <HLabel
              x={anchor + 0.5}
              y={player.m * anchor + player.c - 0.28 * Math.sign(player.m || 1)}
              fill="var(--color-gold)"
              size={0.28}
            >
              1
            </HLabel>
            <HLabel
              x={anchor + 1 + 0.36}
              y={(player.m * anchor + player.c + player.m * (anchor + 1) + player.c) / 2}
              fill="var(--color-gold)"
              size={0.28}
            >
              {fmt(player.m)}
            </HLabel>
          </g>
        )}

        {sketch.length > 1 && (
          <polyline
            points={sketch.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="none"
            stroke="var(--color-cinnabar)"
            strokeWidth={0.09}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {points?.map((p) => (
          <g key={p.name} transform={`translate(${p.x} ${p.y})`}>
            <polygon points="0,0.16 0.16,0 0,-0.16 -0.16,0" fill="var(--color-gold)" />
          </g>
        ))}

        {points?.map((p) => (
          <HLabel key={`lp${p.name}`} x={p.x} y={p.y + 0.42} fill="var(--color-gold)" size={0.3}>
            {`${p.name}(${fmt(p.x)}, ${fmt(p.y)})`}
          </HLabel>
        ))}
      </g>
    </svg>
  );
}
