export type Seg = { x1: number; y1: number; x2: number; y2: number };

export const X_MIN = -4;
export const X_MAX = 4;
export const Y_MIN = -3;
export const Y_MAX = 3;

export type Band = "perfect" | "hit" | "graze" | "miss";

export type Grade = {
  score: number;
  band: Band;
  damage: number;
  counter: number;
  dm: number;
  dc: number;
  comment: string;
};

const BAND_DAMAGE: Record<Band, number> = {
  perfect: 46,
  hit: 32,
  graze: 18,
  miss: 0,
};

const BAND_COUNTER: Record<Band, number> = {
  perfect: 0,
  hit: 0,
  graze: 14,
  miss: 34,
};

export const BAND_LABEL: Record<Band, string> = {
  perfect: "一線",
  hit: "命中",
  graze: "擦過",
  miss: "落空",
};

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const t = x % y;
    x = y;
    y = t;
  }
  return x || 1;
}

/** Display number: halves and quarters as fractions, minus sign U+2212. */
export function fmt(n: number): string {
  if (!Number.isFinite(n)) return "?";
  const neg = n < -1e-9;
  const a = Math.abs(n);
  const q = Math.round(a * 4);
  let body: string;
  if (q <= 24 && Math.abs(a * 4 - q) < 1e-3) {
    if (q === 0) body = "0";
    else {
      const g = gcd(q, 4);
      const num = q / g;
      const den = 4 / g;
      body = den === 1 ? String(num) : `${num}/${den}`;
    }
  } else {
    const r = Math.round(a * 100) / 100;
    body = String(r);
  }
  if (body === "0") return "0";
  return neg ? `−${body}` : body;
}

export function formatEq(m: number, c: number): string {
  const m0 = Math.abs(m) < 1e-9;
  const c0 = Math.abs(c) < 1e-9;
  let mPart = "";
  if (!m0) {
    if (Math.abs(Math.abs(m) - 1) < 1e-9) mPart = m < 0 ? "−x" : "x";
    else {
      const body = fmt(Math.abs(m));
      const coef = body.includes("/") ? `(${body})` : body;
      mPart = m < 0 ? `−${coef}x` : `${coef}x`;
    }
  }
  if (m0) return `y = ${fmt(c)}`;
  if (c0) return `y = ${mPart}`;
  if (c > 0) return `y = ${mPart} + ${fmt(c)}`;
  return `y = ${mPart} − ${fmt(Math.abs(c))}`;
}

export function formatLine(m: number, c: number, vertical?: number): string {
  if (vertical != null && Number.isFinite(vertical)) return `x = ${fmt(vertical)}`;
  return formatEq(m, c);
}

export function lineKind(r: { m: number; vertical?: number } | null | undefined): "mc" | "h" | "v" {
  if (r?.vertical != null && Number.isFinite(r.vertical)) return "v";
  if (r && Math.abs(r.m) < 1e-9) return "h";
  return "mc";
}

export function parseNum(raw: string): number | null {
  const s = raw.trim().replace(/−/g, "-").replace(/[＋]/g, "+").replace(/\s+/g, "");
  if (!s || s === "+" || s === "-" || s === ".") return null;
  const frac = s.match(/^([+-]?\d+(?:\.\d+)?)\/([+-]?\d+(?:\.\d+)?)$/);
  if (frac) {
    const den = Number(frac[2]);
    if (den === 0) return null;
    const v = Number(frac[1]) / den;
    return Number.isFinite(v) ? v : null;
  }
  if (!/^[+-]?\d+(?:\.\d+)?$/.test(s)) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

export function toInput(n: number): string {
  const r = Math.round(n * 1000) / 1000;
  return String(r);
}

export type SkillName = "sin" | "cos" | "tan";

export const SKILL_LABEL: Record<SkillName, string> = {
  sin: "正弦斬",
  cos: "餘弦斬",
  tan: "正切斬",
};

export type Formula =
  | { kind: "skill"; skill: SkillName }
  | { kind: "line"; m: number; c: number; vertical?: number };

export function parseFormula(raw: string): Formula | null {
  const folded = raw.trim().replace(/\s+/g, "").replace(/＝/g, "=").replace(/[−–—]/g, "-").replace(/＋/g, "+");
  if (!folded) return null;
  const low = folded.toLowerCase();
  if (folded === "正弦斬" || low === "y=sinx" || low === "y=sin(x)" || low === "sinx" || low === "sin(x)") {
    return { kind: "skill", skill: "sin" };
  }
  if (folded === "餘弦斬" || low === "y=cosx" || low === "y=cos(x)" || low === "cosx" || low === "cos(x)") {
    return { kind: "skill", skill: "cos" };
  }
  if (folded === "正切斬" || low === "y=tanx" || low === "y=tan(x)" || low === "tanx" || low === "tan(x)") {
    return { kind: "skill", skill: "tan" };
  }
  if (low.startsWith("x=")) {
    const n = parseNum(low.slice(2));
    if (n === null) return null;
    return { kind: "line", m: 0, c: 0, vertical: n };
  }
  if (!low.startsWith("y=")) return null;
  let body = low.slice(2).replace(/\((\d+\/\d+)\)/g, "$1");
  if (!body || /sin|cos|tan/.test(body)) return null;
  const parts: string[] = [];
  let cur = "";
  for (let i = 0; i < body.length; i++) {
    const ch = body.charAt(i);
    if ((ch === "+" || ch === "-") && cur) {
      parts.push(cur);
      cur = ch;
    } else cur += ch;
  }
  if (cur) parts.push(cur);
  let m = 0;
  let c = 0;
  let saw = false;
  for (const part of parts) {
    const term = part.startsWith("+") ? part.slice(1) : part;
    if (!term) return null;
    if (term.includes("x")) {
      const coef = term.replace(/x/g, "");
      let mv: number;
      if (coef === "" ) mv = 1;
      else if (coef === "-") mv = -1;
      else {
        const n = parseNum(coef);
        if (n === null) return null;
        mv = n;
      }
      m += mv;
      saw = true;
    } else {
      const n = parseNum(term);
      if (n === null) return null;
      c += n;
      saw = true;
    }
  }
  if (!saw) return null;
  return { kind: "line", m, c };
}

export function clipLine(
  m: number,
  c: number,
  bounds: { x0: number; x1: number; y0: number; y1: number } = {
    x0: X_MIN,
    x1: X_MAX,
    y0: Y_MIN,
    y1: Y_MAX,
  },
): Seg | null {
  if (!Number.isFinite(m) || !Number.isFinite(c)) return null;
  const pts: { x: number; y: number }[] = [];
  const push = (x: number, y: number) => {
    if (
      x >= bounds.x0 - 1e-5 &&
      x <= bounds.x1 + 1e-5 &&
      y >= bounds.y0 - 1e-5 &&
      y <= bounds.y1 + 1e-5
    ) {
      const xx = Math.min(bounds.x1, Math.max(bounds.x0, x));
      const yy = Math.min(bounds.y1, Math.max(bounds.y0, y));
      if (!pts.some((p) => Math.hypot(p.x - xx, p.y - yy) < 1e-4)) pts.push({ x: xx, y: yy });
    }
  };
  push(bounds.x0, m * bounds.x0 + c);
  push(bounds.x1, m * bounds.x1 + c);
  if (Math.abs(m) > 1e-9) {
    push((bounds.y0 - c) / m, bounds.y0);
    push((bounds.y1 - c) / m, bounds.y1);
  }
  if (pts.length < 2) return null;
  let bestI = 0;
  let bestJ = 1;
  let bestD = -1;
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
      if (d > bestD) {
        bestD = d;
        bestI = i;
        bestJ = j;
      }
    }
  }
  if (bestD < 0.25) return null;
  const p = pts[bestI];
  const q = pts[bestJ];
  const leftFirst = p.x < q.x - 1e-6 || (Math.abs(p.x - q.x) < 1e-6 && p.y <= q.y);
  const a = leftFirst ? p : q;
  const b = leftFirst ? q : p;
  return { x1: a.x, y1: a.y, x2: b.x, y2: b.y };
}

export function triangleAnchor(m: number, c: number): number | null {
  const candidates = [0, -1, 1, -2, 2, -3, 3];
  for (const x of candidates) {
    const y1 = m * x + c;
    const y2 = m * (x + 1) + c;
    if (x >= X_MIN && x + 1 <= X_MAX && y1 >= Y_MIN && y1 <= Y_MAX && y2 >= Y_MIN && y2 <= Y_MAX) {
      return x;
    }
  }
  return null;
}

export function feedback(pm: number, pc: number, tm: number, tc: number, band: Band): string {
  if (band === "perfect") return "對上了。";
  if (Math.abs(pm - tm) <= 0.08 && Math.abs(pc - tc) <= 0.08) return "很接近。";
  return `正解 ${formatEq(tm, tc)}。`;
}

export function grade(pm: number, pc: number, tm: number, tc: number): Grade {
  const dm = pm - tm;
  const dc = pc - tc;
  const sigM = 0.45;
  const sigC = 0.55;
  const score = Math.round(
    100 * Math.exp(-(dm * dm) / (2 * sigM * sigM) - (dc * dc) / (2 * sigC * sigC)),
  );
  let band: Band;
  if (Math.abs(dm) <= 0.05 && Math.abs(dc) <= 0.05) band = "perfect";
  else if (score >= 75) band = "hit";
  else if (score >= 48) band = "graze";
  else band = "miss";
  return {
    score,
    band,
    damage: BAND_DAMAGE[band],
    counter: BAND_COUNTER[band],
    dm,
    dc,
    comment: feedback(pm, pc, tm, tc, band),
  };
}

export type PointMark = { x: number; y: number; name: string };

export function gradeVertical(px: number, tx: number): Grade {
  const dx = px - tx;
  const score = Math.round(100 * Math.exp(-(dx * dx) / (2 * 0.45 * 0.45)));
  let band: Band;
  if (Math.abs(dx) <= 0.05) band = "perfect";
  else if (score >= 75) band = "hit";
  else if (score >= 48) band = "graze";
  else band = "miss";
  return {
    score,
    band,
    damage: BAND_DAMAGE[band],
    counter: BAND_COUNTER[band],
    dm: dx,
    dc: 0,
    comment: band === "perfect" ? "對上了。" : `正解 x = ${fmt(tx)}。`,
  };
}

export function workings(m: number, c: number, _points?: PointMark[], vertical?: number): string[] {
  return [formatLine(m, c, vertical)];
}

export type StrokeLine = { m: number; c: number; vertical?: number };

export function fitStroke(pts: { x: number; y: number }[]): StrokeLine | null {
  if (pts.length < 4) return null;
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (const p of pts) {
    minX = Math.min(minX, p.x);
    maxX = Math.max(maxX, p.x);
    minY = Math.min(minY, p.y);
    maxY = Math.max(maxY, p.y);
  }
  const dx = maxX - minX;
  const dy = maxY - minY;
  if (Math.max(dx, dy) < 0.9) return null;
  if (dx < 0.45 && dy >= 0.9) {
    let sx = 0;
    for (const p of pts) sx += p.x;
    return { m: 0, c: 0, vertical: sx / pts.length };
  }
  let n = 0;
  let sx = 0;
  let sy = 0;
  let sxx = 0;
  let sxy = 0;
  for (const p of pts) {
    n += 1;
    sx += p.x;
    sy += p.y;
    sxx += p.x * p.x;
    sxy += p.x * p.y;
  }
  const den = n * sxx - sx * sx;
  if (Math.abs(den) < 1e-4) return { m: 0, c: 0, vertical: sx / n };
  const m = (n * sxy - sx * sy) / den;
  const c = (sy - m * sx) / n;
  if (!Number.isFinite(m) || !Number.isFinite(c)) return null;
  return { m, c };
}

export function dodgeOk(drawn: StrokeLine | null, target: StrokeLine): boolean {
  if (!drawn) return false;
  if (target.vertical != null) return drawn.vertical != null && Math.abs(drawn.vertical - target.vertical) <= 0.65;
  if (drawn.vertical != null) return false;
  return Math.abs(drawn.m - target.m) <= 0.5 && Math.abs(drawn.c - target.c) <= 0.6;
}
