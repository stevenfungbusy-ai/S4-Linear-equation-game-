import { i as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@react-three/fiber+[...].mjs";
import { t as create } from "../_libs/zustand.mjs";
import { a as Star, i as Swords, n as Volume2, o as Lock, s as BookOpen, t as VolumeX } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BDUbnFci.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var DUELS = [
	{
		id: "qingzhu",
		name: "青竹",
		epithet: "水平之刃",
		accent: "#6ea88a",
		blurb: "剛入門的竹林劍客，出劍只肯放平。",
		lesson: "m = 0 時直線是水平的。這時 y 永遠等於 c，c 就是這條線的高度。",
		enemyQi: 80,
		rounds: [
			{
				m: 0,
				c: 1,
				reveal: "formula",
				prompt: "第一劍是水平的。水平線的斜率 m = 0，高度是 1，所以截距 c = 1。寫下這一式，再出劍。"
			},
			{
				m: 0,
				c: 2,
				reveal: "formula",
				prompt: "還是水平斬，整條線抬到高度 2。m 仍然是 0。c 要改成多少？"
			},
			{
				m: 0,
				c: -1,
				reveal: "formula",
				prompt: "還是水平，但落在原點下方。c 可以是負的。這一式的 c 是 −1。"
			}
		]
	},
	{
		id: "chisui",
		name: "赤穗",
		epithet: "等斜",
		accent: "#c4523a",
		blurb: "劍路永遠向右上，一步一格，不快不慢。",
		lesson: "m = 1 表示向右 1 單位就上升 1 單位。c 讓整條直線上下平移。",
		enemyQi: 80,
		rounds: [
			{
				m: 1,
				c: 0,
				reveal: "formula",
				prompt: "m = 1、c = 0：向右 1 就向上 1，而且穿過原點。這一式寫成 y = x。"
			},
			{
				m: 1,
				c: 1,
				reveal: "formula",
				prompt: "斜率仍是 1，直線上移，穿過 (0, 1)。所以 c = 1，式子是 y = x + 1。"
			},
			{
				m: 1,
				c: -2,
				reveal: "graph",
				prompt: "青線的斜率還是 1：向右一格、向上一格。它跟 y 軸交在哪裡？那個高度就是 c。這次不直接告訴你數字。"
			}
		]
	},
	{
		id: "douya",
		name: "陡崖",
		epithet: "看斜率",
		accent: "#d08a3a",
		blurb: "劍勢忽陡忽緩，專門考你的眼力。",
		lesson: "|m| 越大越陡。m = 2 是向右 1、向上 2；m = 1/2 是向右 1、只向上半格。",
		enemyQi: 80,
		rounds: [
			{
				m: 2,
				c: 0,
				reveal: "graph",
				prompt: "青線過原點，所以 c = 0。向右 1 格，它上升幾格？那就是 m。"
			},
			{
				m: .5,
				c: 1,
				reveal: "graph",
				prompt: "這條比較緩。先找它跟 y 軸的交點，得到 c；再看向右 1 格只上升了多少。"
			},
			{
				m: 2,
				c: -1,
				reveal: "graph",
				prompt: "很陡，而且不過原點。交點在 y 軸的負側。先讀 c，再數上升了幾格。"
			}
		]
	},
	{
		id: "nifeng",
		name: "逆風",
		epithet: "負斜率",
		accent: "#8aa4b8",
		blurb: "劍從左上劈到右下。",
		lesson: "m 為負時，直線從左上走到右下。m = −1 就是向右 1、向下 1。",
		enemyQi: 80,
		rounds: [
			{
				m: -1,
				c: 0,
				reveal: "graph",
				prompt: "向右走，青線在下降。下降就是負斜率。它過原點，c = 0。向右 1 格下降幾格？"
			},
			{
				m: -2,
				c: 2,
				reveal: "graph",
				prompt: "更陡的下坡。先讀 y 軸交點，再數向右 1 格掉了多少。掉 2 格就是 m = −2。"
			},
			{
				m: -.5,
				c: -1,
				reveal: "graph",
				prompt: "緩緩下降，而且整條線在原點之下。c 是負的，m 也是負的。"
			}
		]
	},
	{
		id: "shuangyin",
		name: "雙印",
		epithet: "兩點成線",
		accent: "#e2b15c",
		blurb: "不給你看整條氣脈，只留兩枚氣印。",
		lesson: "兩點定一線：m = (y₂ − y₁) ÷ (x₂ − x₁)，再代回任一點，c = y₁ − m·x₁。",
		enemyQi: 90,
		rounds: [
			{
				m: 1,
				c: 0,
				reveal: "points",
				points: [{
					x: 0,
					y: 0,
					name: "甲"
				}, {
					x: 2,
					y: 2,
					name: "乙"
				}],
				prompt: "氣脈藏起來了，只剩兩枚氣印。甲(0, 0)，乙(2, 2)。m = (y乙 − y甲) ÷ (x乙 − x甲)。"
			},
			{
				m: .5,
				c: 1,
				reveal: "points",
				points: [{
					x: -2,
					y: 0,
					name: "甲"
				}, {
					x: 2,
					y: 2,
					name: "乙"
				}],
				prompt: "甲(−2, 0)，乙(2, 2)。先算斜率，再用 c = y甲 − m × x甲。"
			},
			{
				m: -1,
				c: 0,
				reveal: "points",
				points: [{
					x: -2,
					y: 2,
					name: "甲"
				}, {
					x: 2,
					y: -2,
					name: "乙"
				}],
				prompt: "甲(−2, 2)，乙(2, −2)。這次是下坡，m 應該是負的。"
			}
		]
	},
	{
		id: "wuyin",
		name: "霧隱",
		epithet: "一瞬",
		accent: "#7dcec0",
		blurb: "氣脈只肯亮一瞬間。",
		lesson: "看線時只抓兩件事：它過 y 軸的高度（c），以及向右一格的升降（m）。",
		enemyQi: 90,
		rounds: [
			{
				m: 2,
				c: -1,
				reveal: "flash",
				prompt: "青線只亮一瞬間。記住它跟 y 軸的交點，以及向右一格升了多少。看丟了可以再看一眼，但會消耗氣。"
			},
			{
				m: -1.5,
				c: 2,
				reveal: "flash",
				prompt: "又是一閃，這次是下坡。半分之一這種數，可以輸入分數，例如 −3/2。"
			},
			{
				m: .5,
				c: -2,
				reveal: "flash",
				prompt: "最後一閃。緩緩上坡，截距在比較低的地方。"
			}
		]
	},
	{
		id: "wuming",
		name: "無銘",
		epithet: "終式",
		accent: "#e23b2b",
		blurb: "不留名的劍客。三劍之內，式子得自己寫。",
		lesson: "出劍前先問三句：往上還是往下？陡還是緩？過 y 軸的哪裡？",
		enemyQi: 90,
		rounds: [
			{
				m: -.5,
				c: -.5,
				reveal: "points",
				points: [{
					x: -3,
					y: 1,
					name: "甲"
				}, {
					x: 1,
					y: -1,
					name: "乙"
				}],
				prompt: "無銘不說話。甲(−3, 1)，乙(1, −1)。自己把 m 和 c 算出來。"
			},
			{
				m: 1.5,
				c: 1,
				reveal: "flash",
				prompt: "氣脈一閃即滅。若斜率是一帶分數，輸入 3/2 就好。"
			},
			{
				m: -2,
				c: 3,
				reveal: "flash",
				prompt: "最後一劍。看清交點與坡度，寫下式子，出劍。"
			}
		]
	}
];
var ROUND_NAME = [
	"第一劍",
	"第二劍",
	"第三劍"
];
var BAND_DAMAGE = {
	perfect: 46,
	hit: 32,
	graze: 18,
	miss: 0
};
var BAND_COUNTER = {
	perfect: 0,
	hit: 0,
	graze: 14,
	miss: 34
};
var BAND_LABEL = {
	perfect: "一線",
	hit: "命中",
	graze: "擦過",
	miss: "落空"
};
function gcd(a, b) {
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
function fmt(n) {
	if (!Number.isFinite(n)) return "?";
	const neg = n < -1e-9;
	const a = Math.abs(n);
	const q = Math.round(a * 4);
	let body;
	if (q <= 24 && Math.abs(a * 4 - q) < .001) {
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
function term(n) {
	const s = fmt(n);
	return n < -1e-9 ? `(${s})` : s;
}
function formatEq(m, c) {
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
function parseNum(raw) {
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
function toInput(n) {
	const r = Math.round(n * 1e3) / 1e3;
	return String(r);
}
function clipLine(m, c, bounds = {
	x0: -4,
	x1: 4,
	y0: -3,
	y1: 3
}) {
	if (!Number.isFinite(m) || !Number.isFinite(c)) return null;
	const pts = [];
	const push = (x, y) => {
		if (x >= bounds.x0 - 1e-5 && x <= bounds.x1 + 1e-5 && y >= bounds.y0 - 1e-5 && y <= bounds.y1 + 1e-5) {
			const xx = Math.min(bounds.x1, Math.max(bounds.x0, x));
			const yy = Math.min(bounds.y1, Math.max(bounds.y0, y));
			if (!pts.some((p) => Math.hypot(p.x - xx, p.y - yy) < 1e-4)) pts.push({
				x: xx,
				y: yy
			});
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
	for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
		const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
		if (d > bestD) {
			bestD = d;
			bestI = i;
			bestJ = j;
		}
	}
	if (bestD < .25) return null;
	const p = pts[bestI];
	const q = pts[bestJ];
	const leftFirst = p.x < q.x - 1e-6 || Math.abs(p.x - q.x) < 1e-6 && p.y <= q.y;
	const a = leftFirst ? p : q;
	const b = leftFirst ? q : p;
	return {
		x1: a.x,
		y1: a.y,
		x2: b.x,
		y2: b.y
	};
}
function triangleAnchor(m, c) {
	for (const x of [
		0,
		-1,
		1,
		-2,
		2,
		-3,
		3
	]) {
		const y1 = m * x + c;
		const y2 = m * (x + 1) + c;
		if (x >= -4 && x + 1 <= 4 && y1 >= -3 && y1 <= 3 && y2 >= -3 && y2 <= 3) return x;
	}
	return null;
}
function slopeHint(pm, tm) {
	if (Math.abs(pm) > .05 && Math.abs(tm) > .05 && Math.sign(pm) !== Math.sign(tm)) return tm > 0 ? "正解往右上，你的劍卻往右下。" : "正解往右下，你的劍卻往右上。";
	if (Math.abs(pm) > Math.abs(tm) + .08) return "你的劍太陡。";
	if (Math.abs(pm) + .08 < Math.abs(tm)) return "你的劍太緩。";
	return "方向對了，數字還差一點。";
}
function feedback(pm, pc, tm, tc, band) {
	if (band === "perfect") return "斜率與截距都對上了。這一劍就是那條直線。";
	const bits = [];
	if (Math.abs(pm - tm) > .08) bits.push(`斜率不對：你寫 m = ${fmt(pm)}，正解 m = ${fmt(tm)}。${slopeHint(pm, tm)}`);
	if (Math.abs(pc - tc) > .08) {
		const side = pc > tc ? "你的線整條偏高。" : "你的線整條偏低。";
		bits.push(`截距不對：你寫 c = ${fmt(pc)}，正解 c = ${fmt(tc)}。${side}`);
	}
	if (!bits.length) return "非常接近。再把 m 和 c 對齊一點點。";
	return bits.join("");
}
function grade(pm, pc, tm, tc) {
	const dm = pm - tm;
	const dc = pc - tc;
	const sigM = .45;
	const sigC = .55;
	const score = Math.round(100 * Math.exp(-(dm * dm) / (2 * sigM * sigM) - dc * dc / (2 * sigC * sigC)));
	let band;
	if (Math.abs(dm) <= .05 && Math.abs(dc) <= .05) band = "perfect";
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
		comment: feedback(pm, pc, tm, tc, band)
	};
}
function workings(m, c, points) {
	const head = `正解 ${formatEq(m, c)}`;
	if (points && points.length >= 2) {
		const a = points[0];
		const b = points[1];
		const dy = b.y - a.y;
		const dx = b.x - a.x;
		return [
			head,
			`m = (${term(b.y)} − ${term(a.y)}) ÷ (${term(b.x)} − ${term(a.x)}) = ${term(dy)} ÷ ${term(dx)} = ${fmt(m)}`,
			`c = ${term(a.y)} − ${term(m)} × ${term(a.x)} = ${fmt(c)}`
		];
	}
	return [
		head,
		Math.abs(m) < 1e-9 ? "向右走，y 不變，所以 m = 0，直線是水平的。" : `向右 1 單位，y 變化 ${fmt(m)}，所以 m = ${fmt(m)}。`,
		`與 y 軸交於 (0, ${fmt(c)})，所以 c = ${fmt(c)}。`
	];
}
function describeLine(m, c) {
	return `這條直線${m > .05 ? "向右上傾斜" : m < -.05 ? "向右下傾斜" : "是水平的"}，${Math.abs(m) < .05 ? "沒有坡度" : Math.abs(m) < .75 ? "坡度緩和" : Math.abs(m) < 1.5 ? "坡度明顯" : "非常陡"}，${Math.abs(c) < .05 ? "穿過原點" : c > 0 ? `與 y 軸交在原點上方 ${fmt(c)}` : `與 y 軸交在原點下方 ${fmt(Math.abs(c))}`}。式子是 ${formatEq(m, c)}。`;
}
var t = 0;
var raf = 0;
var listeners = /* @__PURE__ */ new Set();
function getSlashT() {
	return t;
}
function subscribeSlash(fn) {
	listeners.add(fn);
	return () => listeners.delete(fn);
}
function emit(v) {
	t = v;
	listeners.forEach((fn) => fn(v));
}
function runSlash(onDone) {
	cancelAnimationFrame(raf);
	const start = performance.now();
	const step = (now) => {
		const u = Math.min(1, (now - start) / 680);
		emit(1 - (1 - u) ** 3);
		if (typeof window !== "undefined" && window.__bladeHold === true && u >= .42) return;
		if (u < 1) raf = requestAnimationFrame(step);
		else onDone();
	};
	emit(0);
	raf = requestAnimationFrame(step);
}
var ctx = null;
var muted = false;
function setMuted(v) {
	muted = v;
}
function unlockAudio() {
	if (typeof window === "undefined") return;
	if (!ctx) ctx = new AudioContext();
	if (ctx.state === "suspended") ctx.resume();
}
function ac() {
	if (muted || !ctx || ctx.state !== "running") return null;
	return ctx;
}
function playSlash() {
	const c = ac();
	if (!c) return;
	const now = c.currentTime;
	const osc = c.createOscillator();
	const filter = c.createBiquadFilter();
	const gain = c.createGain();
	osc.type = "sawtooth";
	osc.frequency.setValueAtTime(380, now);
	osc.frequency.exponentialRampToValueAtTime(70, now + .28);
	filter.type = "lowpass";
	filter.frequency.setValueAtTime(1600, now);
	filter.frequency.exponentialRampToValueAtTime(240, now + .28);
	gain.gain.setValueAtTime(1e-4, now);
	gain.gain.exponentialRampToValueAtTime(.08, now + .02);
	gain.gain.exponentialRampToValueAtTime(1e-4, now + .32);
	osc.connect(filter);
	filter.connect(gain);
	gain.connect(c.destination);
	osc.start(now);
	osc.stop(now + .34);
	const len = Math.floor(c.sampleRate * .18);
	const buffer = c.createBuffer(1, len, c.sampleRate);
	const data = buffer.getChannelData(0);
	for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
	const noise = c.createBufferSource();
	noise.buffer = buffer;
	const hp = c.createBiquadFilter();
	hp.type = "highpass";
	hp.frequency.value = 900;
	const ng = c.createGain();
	ng.gain.value = .06;
	noise.connect(hp);
	hp.connect(ng);
	ng.connect(c.destination);
	noise.start(now);
}
function playHit(perfect) {
	const c = ac();
	if (!c) return;
	const now = c.currentTime;
	(perfect ? [660, 990] : [420, 630]).forEach((f, i) => {
		const osc = c.createOscillator();
		const gain = c.createGain();
		osc.type = "triangle";
		osc.frequency.value = f;
		gain.gain.setValueAtTime(1e-4, now + i * .05);
		gain.gain.exponentialRampToValueAtTime(perfect ? .09 : .06, now + i * .05 + .01);
		gain.gain.exponentialRampToValueAtTime(1e-4, now + .28 + i * .05);
		osc.connect(gain);
		gain.connect(c.destination);
		osc.start(now + i * .05);
		osc.stop(now + .36);
	});
}
function playMiss() {
	const c = ac();
	if (!c) return;
	const now = c.currentTime;
	const osc = c.createOscillator();
	const gain = c.createGain();
	osc.type = "sine";
	osc.frequency.setValueAtTime(140, now);
	osc.frequency.exponentialRampToValueAtTime(55, now + .22);
	gain.gain.setValueAtTime(1e-4, now);
	gain.gain.exponentialRampToValueAtTime(.09, now + .02);
	gain.gain.exponentialRampToValueAtTime(1e-4, now + .26);
	osc.connect(gain);
	gain.connect(c.destination);
	osc.start(now);
	osc.stop(now + .28);
}
function bindVisibility() {
	if (typeof document === "undefined") return;
	document.addEventListener("visibilitychange", () => {
		if (document.visibilityState === "visible" && ctx?.state === "suspended") ctx.resume();
	});
}
var KEY = "renshi-save-v1";
var defaultSave = () => ({
	version: 1,
	stars: {},
	mute: false
});
function loadSave() {
	if (typeof window === "undefined") return defaultSave();
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return defaultSave();
		const parsed = JSON.parse(raw);
		if (parsed.version !== 1 || !parsed.stars || typeof parsed.stars !== "object") return defaultSave();
		return {
			version: 1,
			stars: parsed.stars,
			mute: Boolean(parsed.mute)
		};
	} catch {
		return defaultSave();
	}
}
function persist(save) {
	try {
		localStorage.setItem(KEY, JSON.stringify(save));
	} catch {}
}
function makePractice(prev) {
	const slopes = [
		-2,
		-1.5,
		-1,
		-.5,
		0,
		.5,
		1,
		1.5,
		2,
		3
	];
	const cuts = [
		-2,
		-1,
		0,
		1,
		2
	];
	for (let k = 0; k < 24; k++) {
		const m = slopes[Math.floor(Math.random() * slopes.length)] ?? 1;
		const c = cuts[Math.floor(Math.random() * cuts.length)] ?? 0;
		if (prev && m === prev.m && c === prev.c) continue;
		if (!clipLine(m, c)) continue;
		return {
			m,
			c,
			reveal: "graph",
			prompt: "讀這條青線。它跟 y 軸交在哪裡，就是 c。向右一格上升或下降多少，就是 m。"
		};
	}
	return {
		m: 1,
		c: 0,
		reveal: "graph",
		prompt: "讀這條青線。它跟 y 軸交在哪裡，就是 c。向右一格上升或下降多少，就是 m。"
	};
}
function duelOf(index) {
	return DUELS[index] ?? DUELS[0];
}
function roundOf(s) {
	if (s.mode === "practice") return s.practice;
	return duelOf(s.duelIndex).rounds[s.roundIndex] ?? null;
}
var initial = defaultSave();
var useGame = create((set, get) => ({
	phase: "title",
	mode: "campaign",
	duelIndex: 0,
	roundIndex: 0,
	playerQi: 100,
	enemyQi: 80,
	mText: "",
	cText: "",
	step: .5,
	showTriangle: false,
	revealUntil: 0,
	hintUsed: false,
	lastGrade: null,
	pending: null,
	slashT: 0,
	slashToken: 0,
	practice: null,
	streak: 0,
	history: [],
	save: initial,
	leaving: false,
	flash: null,
	earnedStars: 0,
	setSlashT: (v) => set({ slashT: v }),
	setM: (v) => set({ mText: v }),
	setC: (v) => set({ cText: v }),
	setTexts: (m, c) => set({
		mText: m,
		cText: c
	}),
	setStep: (v) => set({ step: v }),
	toggleTriangle: () => set((s) => ({ showTriangle: !s.showTriangle })),
	askLeave: () => set({ leaving: true }),
	cancelLeave: () => set({ leaving: false }),
	nudge: (field, dir) => {
		const s = get();
		const cur = parseNum(field === "m" ? s.mText : s.cText) ?? 0;
		const next = Math.round((cur + dir * s.step) * 1e3) / 1e3;
		const text = toInput(Math.max(-6, Math.min(6, next)));
		if (field === "m") set({ mText: text });
		else set({ cText: text });
	},
	toggleMute: () => {
		const save = {
			...get().save,
			mute: !get().save.mute
		};
		setMuted(save.mute);
		persist(save);
		set({ save });
	},
	openCodex: () => set({
		phase: "codex",
		leaving: false
	}),
	openTitle: () => set((s) => ({
		phase: "title",
		leaving: false,
		slashToken: s.slashToken + 1,
		flash: null,
		pending: null
	})),
	hydrateSave: () => {
		const save = loadSave();
		setMuted(save.mute);
		set({ save });
	},
	startDuel: (index) => {
		const duel = duelOf(index);
		set((s) => ({
			mode: "campaign",
			phase: "brief",
			duelIndex: index,
			roundIndex: 0,
			playerQi: 100,
			enemyQi: duel.enemyQi,
			mText: "",
			cText: "",
			lastGrade: null,
			pending: null,
			history: [],
			hintUsed: false,
			revealUntil: 0,
			leaving: false,
			flash: null,
			earnedStars: 0,
			slashToken: s.slashToken + 1
		}));
	},
	startPractice: () => set((s) => ({
		mode: "practice",
		phase: "aim",
		practice: makePractice(null),
		roundIndex: 0,
		playerQi: 100,
		enemyQi: 100,
		mText: "",
		cText: "",
		lastGrade: null,
		pending: null,
		history: [],
		streak: 0,
		hintUsed: false,
		revealUntil: 0,
		leaving: false,
		flash: null,
		slashToken: s.slashToken + 1
	})),
	beginAim: () => {
		set({
			phase: "aim",
			mText: "",
			cText: "",
			lastGrade: null,
			hintUsed: false,
			revealUntil: roundOf(get())?.reveal === "flash" ? Date.now() + 2800 : 0
		});
	},
	peek: () => {
		const s = get();
		if (s.hintUsed || s.phase !== "aim") return;
		set({
			hintUsed: true,
			playerQi: Math.max(1, s.playerQi - 8),
			revealUntil: Date.now() + 1600
		});
	},
	strike: () => {
		const s = get();
		if (s.phase !== "aim") return;
		const m = parseNum(s.mText);
		const c = parseNum(s.cText);
		const round = roundOf(s);
		if (m === null || c === null || !round) return;
		unlockAudio();
		const g = grade(m, c, round.m, round.c);
		const token = s.slashToken + 1;
		set({
			phase: "slash",
			pending: {
				m,
				c,
				grade: g
			},
			slashToken: token,
			slashT: 0,
			leaving: false
		});
		playSlash();
		runSlash(() => {
			if (get().slashToken !== token) return;
			get().finishSlash();
		});
	},
	finishSlash: () => {
		const s = get();
		const pending = s.pending;
		const round = roundOf(s);
		if (!pending || !round) return;
		const g = pending.grade;
		if (s.mode === "practice") {
			if (g.band === "perfect") playHit(true);
			else if (g.band === "miss") playMiss();
			else playHit(false);
			set({
				phase: "exchange",
				lastGrade: g,
				pending: null,
				slashT: 1,
				streak: g.band === "perfect" ? s.streak + 1 : 0,
				flash: g.band,
				history: [...s.history, {
					yours: `${pending.m},${pending.c}`,
					answer: `${round.m},${round.c}`,
					band: g.band,
					score: g.score
				}]
			});
			window.setTimeout(() => {
				if (get().flash === g.band) set({ flash: null });
			}, 700);
			return;
		}
		const playerQi = Math.max(0, s.playerQi - g.counter);
		const enemyQi = Math.max(0, s.enemyQi - g.damage);
		if (g.band === "miss") playMiss();
		else playHit(g.band === "perfect");
		set({
			phase: "exchange",
			playerQi,
			enemyQi,
			lastGrade: g,
			pending: null,
			slashT: 1,
			flash: g.band,
			history: [...s.history, {
				yours: `${pending.m},${pending.c}`,
				answer: `${round.m},${round.c}`,
				band: g.band,
				score: g.score
			}]
		});
		window.setTimeout(() => {
			if (get().flash === g.band) set({ flash: null });
		}, 700);
	},
	continueRound: () => {
		const s = get();
		if (s.mode === "practice") {
			set({
				phase: "aim",
				practice: makePractice(s.practice),
				mText: "",
				cText: "",
				lastGrade: null,
				hintUsed: false,
				revealUntil: 0
			});
			return;
		}
		const duel = duelOf(s.duelIndex);
		if (s.playerQi <= 0) {
			set({ phase: "defeat" });
			return;
		}
		if (s.roundIndex + 1 >= duel.rounds.length) {
			if (s.enemyQi <= 0) {
				const stars = s.playerQi >= 80 ? 3 : s.playerQi >= 45 ? 2 : 1;
				const prev = s.save.stars[duel.id] ?? 0;
				const save = {
					...s.save,
					stars: {
						...s.save.stars,
						[duel.id]: Math.max(prev, stars)
					}
				};
				persist(save);
				set({
					phase: "victory",
					save,
					earnedStars: stars
				});
			} else set({ phase: "defeat" });
			return;
		}
		const next = s.roundIndex + 1;
		const upcoming = duel.rounds[next];
		set({
			roundIndex: next,
			phase: "aim",
			mText: "",
			cText: "",
			lastGrade: null,
			hintUsed: false,
			revealUntil: upcoming?.reveal === "flash" ? Date.now() + 2800 : 0
		});
	}
}));
function activeRound(s) {
	return roundOf(s);
}
function activeDuel(s) {
	return duelOf(s.duelIndex);
}
var VB = "-5.15 -4.15 10.3 8.3";
function HLabel({ x, y, children, fill, size = .3 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
		transform: `translate(${x} ${y}) scale(1 -1)`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
			textAnchor: "middle",
			dominantBaseline: "middle",
			fontSize: size,
			fill,
			fontFamily: "var(--font-mono), ui-monospace, monospace",
			children
		})
	});
}
function Stroke({ m, c, color, width, dashed, draw }) {
	const seg = clipLine(m, c);
	if (!seg) return null;
	const anim = draw != null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
		x1: seg.x1,
		y1: seg.y1,
		x2: seg.x2,
		y2: seg.y2,
		stroke: color,
		strokeWidth: width,
		strokeLinecap: "round",
		pathLength: 1,
		strokeDasharray: anim ? "1" : dashed ? "0.14 0.09" : void 0,
		strokeDashoffset: anim ? 1 - draw : void 0
	});
}
function lineOffscreen(m, c) {
	return clipLine(m, c) === null;
}
function GraphSvg({ player, target, points, triangle, draw, playerLive }) {
	const xs = [];
	for (let x = -4; x <= 4; x++) xs.push(x);
	const ys = [];
	for (let y = -3; y <= 3; y++) ys.push(y);
	const anchor = player && triangle ? triangleAnchor(player.m, player.c) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: VB,
		className: "h-full w-full",
		role: "img",
		"aria-label": "坐標平面上的斬擊直線",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			transform: "scale(1 -1)",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					className: "coord-grid",
					children: [
						xs.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							className: x === 0 ? "axis" : void 0,
							x1: x,
							x2: x,
							y1: -3,
							y2: 3,
							stroke: "var(--color-line)",
							strokeWidth: x === 0 ? .045 : .015
						}, `v${x}`)),
						ys.map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							className: y === 0 ? "axis" : void 0,
							y1: y,
							y2: y,
							x1: -4,
							x2: 4,
							stroke: "var(--color-line)",
							strokeWidth: y === 0 ? .045 : .015
						}, `h${y}`)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HLabel, {
							x: 3.85,
							y: -.32,
							fill: "var(--color-mute)",
							size: .32,
							children: "x"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HLabel, {
							x: .32,
							y: 2.95,
							fill: "var(--color-mute)",
							size: .32,
							children: "y"
						}),
						xs.filter((x) => x !== 0).map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HLabel, {
							x,
							y: -.34,
							fill: "var(--color-mute)",
							size: .26,
							children: String(x)
						}, `lx${x}`)),
						ys.filter((y) => y !== 0).map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HLabel, {
							x: -.38,
							y,
							fill: "var(--color-mute)",
							size: .26,
							children: String(y)
						}, `ly${y}`))
					]
				}),
				target && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stroke, {
					m: target.m,
					c: target.c,
					color: "var(--color-jade)",
					width: .16
				}),
				target && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stroke, {
					m: target.m,
					c: target.c,
					color: "var(--color-jade)",
					width: .045
				}),
				playerLive && player && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stroke, {
					m: player.m,
					c: player.c,
					color: "var(--color-cinnabar)",
					width: .18,
					dashed: draw == null,
					draw
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stroke, {
					m: player.m,
					c: player.c,
					color: "var(--color-parchment)",
					width: .035,
					dashed: draw == null,
					draw
				})] }),
				target && Math.abs(target.c) <= 3.05 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: 0,
					cy: target.c,
					r: .09,
					fill: "var(--color-jade)"
				}),
				playerLive && player && Math.abs(player.c) <= 3.05 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: 0,
					cy: player.c,
					r: .11,
					fill: "none",
					stroke: "var(--color-gold)",
					strokeWidth: .04
				}),
				player && anchor != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: anchor,
						y1: player.m * anchor + player.c,
						x2: anchor + 1,
						y2: player.m * anchor + player.c,
						stroke: "var(--color-gold)",
						strokeWidth: .03,
						strokeDasharray: "0.08 0.05"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: anchor + 1,
						y1: player.m * anchor + player.c,
						x2: anchor + 1,
						y2: player.m * (anchor + 1) + player.c,
						stroke: "var(--color-gold)",
						strokeWidth: .03,
						strokeDasharray: "0.08 0.05"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HLabel, {
						x: anchor + .5,
						y: player.m * anchor + player.c - .28 * Math.sign(player.m || 1),
						fill: "var(--color-gold)",
						size: .28,
						children: "1"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HLabel, {
						x: anchor + 1 + .36,
						y: (player.m * anchor + player.c + player.m * (anchor + 1) + player.c) / 2,
						fill: "var(--color-gold)",
						size: .28,
						children: fmt(player.m)
					})
				] }),
				points?.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
					transform: `translate(${p.x} ${p.y})`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
						points: "0,0.16 0.16,0 0,-0.16 -0.16,0",
						fill: "var(--color-gold)"
					})
				}, p.name)),
				points?.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HLabel, {
					x: p.x,
					y: p.y + .42,
					fill: "var(--color-gold)",
					size: .3,
					children: `${p.name}(${fmt(p.x)}, ${fmt(p.y)})`
				}, `lp${p.name}`))
			]
		})
	});
}
function Stars({ n, of = 3 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "inline-flex gap-0.5",
		"aria-label": `${n} 星，滿分 ${of}`,
		children: Array.from({ length: of }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: i < n ? "size-4 fill-gold text-gold" : "size-4 text-line" }, i))
	});
}
function MuteButton() {
	const mute = useGame((s) => s.save.mute);
	const toggle = useGame((s) => s.toggleMute);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: "icon-btn",
		onClick: toggle,
		"aria-label": mute ? "打開聲音" : "關閉聲音",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(mute ? VolumeX : Volume2, { className: "size-5" })
	});
}
function Title() {
	const save = useGame((s) => s.save);
	const startDuel = useGame((s) => s.startDuel);
	const startPractice = useGame((s) => s.startPractice);
	const openCodex = useGame((s) => s.openCodex);
	const total = Object.values(save.stars).reduce((a, b) => a + b, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "scroll-screen",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex w-full max-w-lg flex-col gap-6 px-5 py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "seal",
						"aria-hidden": true,
						children: "斬"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MuteButton, {})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs tracking-widest text-gold",
						children: "直線方程 · 第一人稱"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-serif text-6xl font-black tracking-widest text-parchment",
						children: "刃式"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-sm font-serif text-lg leading-relaxed text-parchment",
						children: "出劍的軌跡，就是你寫下的直線。"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-mono text-sm text-mute",
						children: "y = mx + c"
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-mute",
					children: "你是持劍的人。眼前的氣幕是坐標平面，向右是 +x，向上是 +y。斜率 m 決定劍有多陡、往上還是往下；截距 c 決定這一劍過 y 軸的高度。"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "btn-ghost",
						onClick: openCodex,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-4" }), "如何出劍"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "btn-ghost",
						onClick: startPractice,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Swords, { className: "size-4" }), "道場練習"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-baseline justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-xl text-parchment",
						children: "武帖"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-xs text-mute",
						children: [
							"星 ",
							total,
							" / 21"
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "flex flex-col gap-2",
					children: DUELS.map((duel, i) => {
						const unlocked = i === 0 || (save.stars[DUELS[i - 1].id] ?? 0) > 0;
						const stars = save.stars[duel.id] ?? 0;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "roster",
							disabled: !unlocked,
							onClick: () => startDuel(i),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs text-mute",
									children: String(i + 1).padStart(2, "0")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0 flex-1 text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "block font-serif text-lg text-parchment",
										children: [duel.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "ml-2 text-sm text-gold",
											children: duel.epithet
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block truncate text-sm text-mute",
										children: duel.blurb
									})]
								}),
								unlocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stars, { n: stars }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-4 text-mute" })
							]
						}) }, duel.id);
					})
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center text-xs text-mute",
					children: "七場對決，從水平線走到兩點成線。"
				})
			]
		})
	});
}
function Codex() {
	const openTitle = useGame((s) => s.openTitle);
	const startDuel = useGame((s) => s.startDuel);
	const [m, setM] = (0, import_react.useState)(1);
	const [c, setC] = (0, import_react.useState)(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "scroll-screen",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex w-full max-w-lg flex-col gap-5 px-5 py-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-3xl text-parchment",
						children: "如何出劍"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn-ghost",
						onClick: openTitle,
						children: "返回"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "flex flex-col gap-3 text-sm leading-relaxed text-parchment",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-gold",
							children: "斜率 m"
						}), "：向右 1 格時，直線上升或下降幾格。正的往右上，負的往右下，0 是水平。"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-gold",
							children: "截距 c"
						}), "：直線跟 y 軸（直的那條）相交的高度。正的在原點上方，負的在下方。"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-gold",
							children: "對決"
						}), "：青線是對手的氣脈。你的紅線越貼近它，這一劍越狠。差太遠就會被反擊。"] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "veil-frame h-64",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraphSvg, {
						player: {
							m,
							c
						},
						target: null,
						triangle: true,
						draw: null,
						playerLive: true
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "min-h-16 text-sm leading-relaxed text-parchment",
					children: describeLine(m, c)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-sm text-mute",
					children: [
						"斜率 m　",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-parchment",
							children: formatEq(m, c)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "range",
							type: "range",
							min: -3,
							max: 3,
							step: .5,
							value: m,
							"aria-label": "試斜率",
							onChange: (e) => setM(Number(e.target.value))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-sm text-mute",
					children: ["截距 c", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "range",
						type: "range",
						min: -3,
						max: 3,
						step: .5,
						value: c,
						"aria-label": "試截距",
						onChange: (e) => setC(Number(e.target.value))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn-primary",
					onClick: () => startDuel(0),
					children: "去會青竹"
				})
			]
		})
	});
}
function qiWidth(n) {
	return `${Math.max(0, Math.min(100, n))}%`;
}
function TopBar() {
	const phase = useGame((s) => s.phase);
	const mode = useGame((s) => s.mode);
	const duelIndex = useGame((s) => s.duelIndex);
	const roundIndex = useGame((s) => s.roundIndex);
	const playerQi = useGame((s) => s.playerQi);
	const enemyQi = useGame((s) => s.enemyQi);
	const streak = useGame((s) => s.streak);
	const leaving = useGame((s) => s.leaving);
	const askLeave = useGame((s) => s.askLeave);
	const cancelLeave = useGame((s) => s.cancelLeave);
	const openTitle = useGame((s) => s.openTitle);
	const duel = DUELS[duelIndex] ?? DUELS[0];
	const practice = mode === "practice";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "hud-top",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "truncate font-serif text-lg text-parchment",
					children: [practice ? "陪練" : duel.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-2 text-sm text-gold",
						children: practice ? "讀圖" : duel.epithet
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs text-mute",
					children: practice ? `連續一線 ${streak}` : `${ROUND_NAME[roundIndex] ?? ""}　／　三`
				})]
			}), leaving ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn-ghost px-3",
					onClick: openTitle,
					children: "離開"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn-ghost px-3",
					onClick: cancelLeave,
					children: "留下"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "btn-ghost px-3",
				onClick: phase === "brief" ? openTitle : askLeave,
				children: "返回"
			})]
		}), !practice && phase !== "brief" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2 grid grid-cols-2 gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Qi, {
				label: "你的氣",
				value: playerQi,
				tone: "gold"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Qi, {
				label: "敵氣",
				value: enemyQi,
				tone: "cinnabar"
			})]
		})]
	});
}
function Qi({ label, value, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-1 flex justify-between font-mono text-xs text-mute",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: value })]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "qi-track",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: tone === "gold" ? "qi-fill bg-gold" : "qi-fill bg-cinnabar",
			style: { width: qiWidth(value) }
		})
	})] });
}
function BriefCard() {
	const duelIndex = useGame((s) => s.duelIndex);
	const beginAim = useGame((s) => s.beginAim);
	const duel = DUELS[duelIndex] ?? DUELS[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "brief-wrap",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "panel",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs tracking-widest text-gold",
					children: duel.epithet
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-serif text-4xl text-parchment",
					children: duel.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-mute",
					children: duel.blurb
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 border-l-2 border-gold pl-3 text-sm leading-relaxed text-parchment",
					children: duel.lesson
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 font-mono text-xs text-mute",
					children: "三劍。你的氣盡，或三劍後敵氣仍在，這場就輸了。"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn-primary mt-4",
					onClick: beginAim,
					children: "拔劍"
				})
			]
		})
	});
}
function useNow(active) {
	const [now, setNow] = (0, import_react.useState)(() => Date.now());
	(0, import_react.useEffect)(() => {
		if (!active) return;
		const id = window.setInterval(() => setNow(Date.now()), 120);
		return () => window.clearInterval(id);
	}, [active]);
	return now;
}
function targetVisible(s, now) {
	const round = activeRound(s);
	if (!round) return false;
	if (s.phase === "slash" || s.phase === "exchange" || s.phase === "victory" || s.phase === "defeat") return true;
	if (s.phase !== "aim") return false;
	if (round.reveal === "formula" || round.reveal === "graph") return true;
	if (round.reveal === "flash") return now < s.revealUntil;
	return false;
}
function DuelScreen() {
	const phase = useGame((s) => s.phase);
	const showVeil = phase === "aim" || phase === "slash" || phase === "exchange" || phase === "victory" || phase === "defeat";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-auto flex h-full min-h-0 flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "view",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnemyBackdrop, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {}),
				phase === "brief" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BriefCard, {}),
				showVeil && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "veil-wrap",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "veil-frame",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveGraph, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Callout, {})
			]
		}), showVeil && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dock, {})]
	});
}
function EnemyBackdrop() {
	const mode = useGame((s) => s.mode);
	const duelIndex = useGame((s) => s.duelIndex);
	const phase = useGame((s) => s.phase);
	const pending = useGame((s) => s.pending);
	const last = useGame((s) => s.lastGrade);
	const duel = mode === "practice" ? DUELS[0] : DUELS[duelIndex] ?? DUELS[0];
	const band = phase === "slash" ? pending?.grade.band : last?.band;
	const face = !(phase === "slash" || phase === "exchange" || phase === "victory" || phase === "defeat") || !band ? "idle" : band === "miss" ? "smug" : "hurt";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "enemy-stage",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: `/enemies/${duel.id}-${face}.jpg`,
			alt: duel.name
		})
	});
}
function Legend() {
	const round = useGame(activeRound);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "legend",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "swatch bg-jade" }), "氣脈"] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "swatch bg-cinnabar" }), "你的劍"] }),
			round?.reveal === "points" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "swatch bg-gold" }), "氣印"] })
		]
	});
}
function Callout() {
	const flash = useGame((s) => s.flash);
	if (!flash) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: `callout callout-${flash}`,
		children: BAND_LABEL[flash]
	});
}
function LiveGraph() {
	const mText = useGame((s) => s.mText);
	const cText = useGame((s) => s.cText);
	const phase = useGame((s) => s.phase);
	const slashT = useGame((s) => s.slashT);
	const showTriangle = useGame((s) => s.showTriangle);
	const revealUntil = useGame((s) => s.revealUntil);
	const round = useGame(activeRound);
	const pending = useGame((s) => s.pending);
	const flashRound = round?.reveal === "flash" && phase === "aim";
	const now = useNow(Boolean(flashRound));
	const m = parseNum(mText);
	const c = parseNum(cText);
	const locked = phase === "slash" || phase === "exchange" || phase === "victory" || phase === "defeat";
	const pm = locked && pending ? pending.m : m;
	const pc = locked && pending ? pending.c : c;
	const player = pm != null && pc != null ? {
		m: pm,
		c: pc
	} : null;
	const showTarget = round ? targetVisible({
		...useGame.getState(),
		phase,
		revealUntil
	}, flashRound ? now : Date.now()) : false;
	const draw = phase === "slash" ? slashT : locked ? 1 : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraphSvg, {
		player,
		target: round && showTarget ? {
			m: round.m,
			c: round.c
		} : null,
		points: phase === "aim" || locked ? round?.points : void 0,
		triangle: showTriangle && phase === "aim",
		draw,
		playerLive: Boolean(player)
	});
}
function Dock() {
	const phase = useGame((s) => s.phase);
	if (phase === "victory" || phase === "defeat") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EndDock, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AimDock, {});
}
function AimDock() {
	const phase = useGame((s) => s.phase);
	const mText = useGame((s) => s.mText);
	const cText = useGame((s) => s.cText);
	const step = useGame((s) => s.step);
	const showTriangle = useGame((s) => s.showTriangle);
	const hintUsed = useGame((s) => s.hintUsed);
	const setM = useGame((s) => s.setM);
	const setC = useGame((s) => s.setC);
	const setStep = useGame((s) => s.setStep);
	const nudge = useGame((s) => s.nudge);
	const toggleTriangle = useGame((s) => s.toggleTriangle);
	const strike = useGame((s) => s.strike);
	const peek = useGame((s) => s.peek);
	const continueRound = useGame((s) => s.continueRound);
	const mode = useGame((s) => s.mode);
	const roundIndex = useGame((s) => s.roundIndex);
	const round = useGame(activeRound);
	const last = useGame((s) => s.lastGrade);
	const playerQi = useGame((s) => s.playerQi);
	const enemyQi = useGame((s) => s.enemyQi);
	const duel = useGame(activeDuel);
	const revealUntil = useGame((s) => s.revealUntil);
	const flashRound = round?.reveal === "flash" && phase === "aim";
	const now = useNow(Boolean(flashRound));
	const m = parseNum(mText);
	const c = parseNum(cText);
	const ready = m != null && c != null && phase === "aim";
	const off = m != null && c != null && lineOffscreen(m, c);
	const locked = phase !== "aim";
	let continueLabel = "下一劍";
	if (phase === "exchange" && mode === "practice") continueLabel = "下一式";
	else if (phase === "exchange" && mode === "campaign") {
		const lastRound = roundIndex + 1 >= duel.rounds.length;
		if (playerQi <= 0) continueLabel = "倒下";
		else if (!lastRound) continueLabel = "下一劍";
		else if (enemyQi <= 0) continueLabel = "破敵";
		else continueLabel = "收劍";
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "dock",
		onSubmit: (e) => {
			e.preventDefault();
			if (phase === "aim") strike();
			else if (phase === "exchange") continueRound();
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "dock-scroll",
			children: [
				round && phase === "aim" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-parchment",
					children: round.prompt
				}),
				flashRound && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs text-jade",
					children: now < revealUntil ? `氣脈還亮著 ${Math.ceil((revealUntil - now) / 1e3)} 秒` : "氣脈已隱。靠剛才看到的，或再看一眼。"
				}),
				phase === "slash" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-serif text-lg text-parchment",
					children: "出劍。"
				}),
				phase === "exchange" && last && round && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-serif text-2xl text-parchment",
							children: [BAND_LABEL[last.band], /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "ml-3 font-mono text-sm text-gold",
								children: ["準度 ", last.score]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-parchment",
							children: last.comment
						}),
						mode === "campaign" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-xs text-mute",
							children: [
								"敵氣 −",
								last.damage,
								"　你的氣 −",
								last.counter
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm leading-relaxed text-gold",
							children: workings(round.m, round.c, round.points).map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: line }, line))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-xs text-mute",
							children: ["你的式 ", m != null && c != null ? formatEq(m, c) : "—"]
						})
					]
				}),
				phase === "aim" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `text-center font-serif text-2xl sm:text-3xl ${ready ? "text-parchment" : "text-mute"}`,
						children: ready ? formatEq(m, c) : "y = mx + c"
					}),
					off && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-sm text-cinnabar",
						children: "這條線跑出氣幕了。把 m 或 c 拉回來看得到的範圍。"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "斜率 m",
							value: mText,
							disabled: locked,
							onChange: setM,
							onDec: () => nudge("m", -1),
							onInc: () => nudge("m", 1)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "截距 c",
							value: cText,
							disabled: locked,
							onChange: setC,
							onDec: () => nudge("c", -1),
							onInc: () => nudge("c", 1)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 overflow-x-auto",
						children: [
							[
								{
									v: 1,
									t: "步進 1"
								},
								{
									v: .5,
									t: "步進 1/2"
								},
								{
									v: .1,
									t: "步進 0.1"
								}
							].map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: step === opt.v ? "chip chip-on" : "chip",
								onClick: () => setStep(opt.v),
								children: opt.t
							}, opt.t)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: showTriangle ? "chip chip-on" : "chip",
								onClick: toggleTriangle,
								children: "斜率三角"
							}),
							round?.reveal === "flash" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "chip",
								onClick: peek,
								disabled: hintUsed,
								children: "再看一眼 −8 氣"
							})
						]
					})
				] })
			]
		}), phase === "aim" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "submit",
			className: "btn-primary",
			disabled: !ready,
			children: "出劍"
		}) : phase === "exchange" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "submit",
			className: "btn-primary",
			children: continueLabel
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "btn-primary",
			disabled: true,
			children: "出劍"
		})]
	});
}
function Field({ label, value, onChange, onDec, onInc, disabled }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "field",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-mono text-xs text-mute",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "step",
					onClick: onDec,
					disabled,
					"aria-label": `${label}減少`,
					children: "−"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "eq-input",
					inputMode: "text",
					autoComplete: "off",
					placeholder: "0",
					"aria-label": label,
					value,
					disabled,
					onChange: (e) => onChange(e.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "step",
					onClick: onInc,
					disabled,
					"aria-label": `${label}增加`,
					children: "+"
				})
			]
		})]
	});
}
function EndDock() {
	const phase = useGame((s) => s.phase);
	const mode = useGame((s) => s.mode);
	const duel = useGame(activeDuel);
	const duelIndex = useGame((s) => s.duelIndex);
	const earned = useGame((s) => s.earnedStars);
	const playerQi = useGame((s) => s.playerQi);
	const history = useGame((s) => s.history);
	const startDuel = useGame((s) => s.startDuel);
	const openTitle = useGame((s) => s.openTitle);
	const win = phase === "victory";
	const next = duelIndex + 1 < DUELS.length ? duelIndex + 1 : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "dock",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "dock-scroll",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-serif text-3xl text-parchment",
					children: win ? "破" : "未破"
				}),
				win ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stars, { n: earned }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-parchment",
						children: duel.lesson
					}),
					mode === "campaign" && playerQi >= 80 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-gold",
						children: "氣幾乎沒損。這就是一線。"
					})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-parchment",
					children: playerQi <= 0 ? "你的氣盡了。把剛才那幾式再寫一次。" : "三劍過後，對手還站著。看著正解，再來一場。"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-1 text-sm text-mute",
					children: history.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						ROUND_NAME[i] ?? `第${i + 1}劍`,
						" · ",
						BAND_LABEL[row.band],
						" · 準度 ",
						row.score
					] }, `${row.answer}-${i}`))
				}),
				win && next == null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center text-sm text-gold",
					children: "七式已盡。直線在你劍上。"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "btn-ghost w-full",
				onClick: () => startDuel(duelIndex),
				children: "再戰"
			}), win && next != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "btn-primary",
				onClick: () => startDuel(next),
				children: "下一場"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "btn-primary",
				onClick: openTitle,
				children: win && next == null ? "回府" : "武帖"
			})]
		})]
	});
}
var SceneCanvas = (0, import_react.lazy)(() => import("./SceneCanvas-DdVh-GMP.mjs"));
var SceneBoundary = class extends import_react.Component {
	state = { failed: false };
	static getDerivedStateFromError() {
		return { failed: true };
	}
	render() {
		if (this.state.failed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-full bg-ink" });
		return this.props.children;
	}
};
function Game() {
	const phase = useGame((s) => s.phase);
	const flash = useGame((s) => s.flash);
	const [webgl, setWebgl] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setWebgl(true);
		useGame.getState().hydrateSave();
		bindVisibility();
		const down = () => unlockAudio();
		window.addEventListener("pointerdown", down);
		window.__blade = {
			phase: () => useGame.getState().phase,
			setEq: (m, c) => useGame.getState().setTexts(m, c),
			strike: () => useGame.getState().strike(),
			startFirst: () => useGame.getState().startDuel(0),
			beginAim: () => useGame.getState().beginAim(),
			cont: () => useGame.getState().continueRound(),
			grade: () => useGame.getState().lastGrade,
			qi: () => ({
				p: useGame.getState().playerQi,
				e: useGame.getState().enemyQi
			}),
			practice: () => useGame.getState().startPractice()
		};
		const unsub = subscribeSlash((t) => useGame.getState().setSlashT(t));
		return () => {
			window.removeEventListener("pointerdown", down);
			unsub();
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "game-root",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "game-canvas",
				children: webgl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneBoundary, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
					fallback: null,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneCanvas, {})
				}) })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "game-ui",
				children: [
					phase === "title" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {}),
					phase === "codex" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Codex, {}),
					phase !== "title" && phase !== "codex" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DuelScreen, {})
				]
			}),
			flash && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `hitflash hitflash-${flash}` })
		]
	});
}
var routes_exports = /* @__PURE__ */ __exportAll({ component: () => SplitComponent });
var SplitComponent = Game;
//#endregion
export { DUELS as a, parseNum as i, useGame as n, getSlashT as r, routes_exports as t };
