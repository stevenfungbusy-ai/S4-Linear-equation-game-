import { create } from "zustand";
import { playHit, playMiss, playSlash, setMuted, unlockAudio } from "./audio";
import { DUELS, guardSet, isFinale, type Duel, type Round } from "./campaign";
import { clipLine, dodgeOk, formatLine, grade, gradeVertical, parseFormula, parseNum, SKILL_LABEL, toInput, type Grade, type SkillName, type StrokeLine } from "./math";
import { runSlash } from "./slashBus";

export type Phase = "title" | "codex" | "brief" | "aim" | "slash" | "omen" | "exchange" | "guard" | "victory" | "defeat";
export type Mode = "campaign" | "practice";

export type HistoryRow = {
  yours: string;
  answer: string;
  band: Grade["band"];
  score: number;
};

type Save = {
  version: 1;
  stars: Record<string, number>;
  mute: boolean;
};

const KEY = "renshi-save-v1";

const defaultSave = (): Save => ({ version: 1, stars: {}, mute: false });

function loadSave(): Save {
  if (typeof window === "undefined") return defaultSave();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultSave();
    const parsed = JSON.parse(raw) as Partial<Save>;
    if (parsed.version !== 1 || !parsed.stars || typeof parsed.stars !== "object") return defaultSave();
    return { version: 1, stars: parsed.stars, mute: Boolean(parsed.mute) };
  } catch {
    return defaultSave();
  }
}

function persist(save: Save) {
  try {
    localStorage.setItem(KEY, JSON.stringify(save));
  } catch {
    /* private mode */
  }
}

function makePractice(prev?: Round | null): Round {
  if (Math.random() < 0.25) {
    const xs = [-3, -2, -1, 1, 2, 3];
    const x = xs[Math.floor(Math.random() * xs.length)] ?? 1;
    if (prev?.vertical !== x) {
      return { m: 0, c: 0, vertical: x, reveal: "graph", prompt: "垂直線。" };
    }
  }
  const slopes = [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2, 3];
  const cuts = [-2, -1, 0, 1, 2];
  for (let k = 0; k < 24; k++) {
    const m = slopes[Math.floor(Math.random() * slopes.length)] ?? 1;
    const c = cuts[Math.floor(Math.random() * cuts.length)] ?? 0;
    if (prev && prev.vertical == null && m === prev.m && c === prev.c) continue;
    if (!clipLine(m, c)) continue;
    return {
      m,
      c,
      reveal: "graph",
      prompt: Math.abs(m) < 1e-9 ? "水平線。" : "讀青線。",
    };
  }
  return { m: 1, c: 0, reveal: "graph", prompt: "讀青線。" };
}

export type GameState = {
  phase: Phase;
  mode: Mode;
  duelIndex: number;
  roundIndex: number;
  playerQi: number;
  enemyQi: number;
  mText: string;
  cText: string;
  step: number;
  showTriangle: boolean;
  revealUntil: number;
  hintUsed: boolean;
  lastGrade: Grade | null;
  pending: { m: number; c: number; vertical?: number; grade: Grade; skill?: SkillName } | null;
  skill: SkillName | null;
  slashT: number;
  slashToken: number;
  practice: Round | null;
  streak: number;
  combo: number;
  guardLines: StrokeLine[];
  guardStep: number;
  guardResult: "dodge" | "cut" | null;
  guardDraw: StrokeLine | null;
  history: HistoryRow[];
  save: Save;
  leaving: boolean;
  flash: Grade["band"] | null;
  earnedStars: number;
  setSlashT: (v: number) => void;
  setM: (v: string) => void;
  setC: (v: string) => void;
  setTexts: (m: string, c: string) => void;
  setStep: (v: number) => void;
  nudge: (field: "m" | "c", dir: -1 | 1) => void;
  toggleTriangle: () => void;
  toggleMute: () => void;
  openCodex: () => void;
  openTitle: () => void;
  hydrateSave: () => void;
  askLeave: () => void;
  cancelLeave: () => void;
  startDuel: (index: number) => void;
  startPractice: () => void;
  beginAim: () => void;
  peek: () => void;
  strike: () => void;
  finishSlash: () => void;
  submitGuard: (drawn: StrokeLine | null) => void;
  ackGuard: () => void;
  continueRound: () => void;
};

function duelOf(index: number): Duel {
  return DUELS[index] ?? DUELS[0];
}

function roundOf(s: { mode: Mode; duelIndex: number; roundIndex: number; practice: Round | null }): Round | null {
  if (s.mode === "practice") return s.practice;
  return duelOf(s.duelIndex).rounds[s.roundIndex] ?? null;
}

const initial = defaultSave();

export const useGame = create<GameState>((set, get) => ({
  phase: "title",
  mode: "campaign",
  duelIndex: 0,
  roundIndex: 0,
  playerQi: 100,
  enemyQi: 80,
  mText: "",
  cText: "",
  step: 0.5,
  showTriangle: false,
  revealUntil: 0,
  hintUsed: false,
  lastGrade: null,
  pending: null,
  skill: null,
  slashT: 0,
  slashToken: 0,
  practice: null,
  streak: 0,
  combo: 0,
  guardLines: [],
  guardStep: 0,
  guardResult: null,
  guardDraw: null,
  history: [],
  save: initial,
  leaving: false,
  flash: null,
  earnedStars: 0,

  setSlashT: (v) => set({ slashT: v }),
  setM: (v) => set({ mText: v }),
  setC: (v) => set({ cText: v }),
  setTexts: (m, c) => set({ mText: m, cText: c }),
  setStep: (v) => set({ step: v }),
  toggleTriangle: () => set((s) => ({ showTriangle: !s.showTriangle })),
  askLeave: () => set({ leaving: true }),
  cancelLeave: () => set({ leaving: false }),

  nudge: (field, dir) => {
    const s = get();
    const cur = parseNum(field === "m" ? s.mText : s.cText) ?? 0;
    const next = Math.round((cur + dir * s.step) * 1000) / 1000;
    const clamped = Math.max(-6, Math.min(6, next));
    const text = toInput(clamped);
    if (field === "m") set({ mText: text });
    else set({ cText: text });
  },

  toggleMute: () => {
    const save = { ...get().save, mute: !get().save.mute };
    setMuted(save.mute);
    persist(save);
    set({ save });
  },

  openCodex: () => set({ phase: "codex", leaving: false }),

  openTitle: () =>
    set((s) => ({
      phase: "title",
      leaving: false,
      slashToken: s.slashToken + 1,
      flash: null,
      pending: null,
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
      skill: null,
      history: [],
      hintUsed: false,
      revealUntil: 0,
      leaving: false,
      flash: null,
      earnedStars: 0,
      combo: 0,
      guardLines: [],
      guardStep: 0,
      guardResult: null,
      guardDraw: null,
      slashToken: s.slashToken + 1,
    }));
  },

  startPractice: () =>
    set((s) => ({
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
      combo: 0,
      guardLines: [],
      guardResult: null,
      hintUsed: false,
      revealUntil: 0,
      leaving: false,
      flash: null,
      slashToken: s.slashToken + 1,
    })),

  beginAim: () => {
    const round = roundOf(get());
    const flash = round?.reveal === "flash";
    set({
      phase: "aim",
      mText: "",
      cText: "",
      lastGrade: null,
      hintUsed: false,
      revealUntil: flash ? Date.now() + 2800 : 0,
    });
  },

  peek: () => {
    const s = get();
    if (s.hintUsed || s.phase !== "aim") return;
    const qi = Math.max(1, s.playerQi - 8);
    set({ hintUsed: true, playerQi: qi, revealUntil: Date.now() + 1600 });
  },

  strike: () => {
    const s = get();
    if (s.phase !== "aim") return;
    const round = roundOf(s);
    if (!round) return;
    const duel = duelOf(s.duelIndex);
    const c = parseNum(s.cText);
    let m = parseNum(s.mText);
    let vertical: number | undefined;
    let skill: SkillName | undefined;
    let cut = c ?? 0;
    let g: Grade;
    if (duel.freeform) {
      const parsed = parseFormula(s.mText);
      if (!parsed) return;
      if (parsed.kind === "skill") {
        skill = parsed.skill;
        m = 0;
        g = {
          score: 100,
          band: "perfect",
          damage: 999,
          counter: 0,
          dm: 0,
          dc: 0,
          comment: SKILL_LABEL[parsed.skill],
        };
      } else if (parsed.vertical != null) {
        vertical = parsed.vertical;
        m = 0;
        g = round.vertical != null ? gradeVertical(parsed.vertical, round.vertical) : grade(9, 9, round.m, round.c);
      } else if (round.vertical != null) {
        m = parsed.m;
        cut = parsed.c;
        g = gradeVertical(99, round.vertical);
      } else {
        m = parsed.m;
        cut = parsed.c;
        g = grade(parsed.m, parsed.c, round.m, round.c);
      }
    } else if (round.vertical != null) {
      if (c === null) return;
      vertical = c;
      m = 0;
      g = gradeVertical(c, round.vertical);
    } else if (Math.abs(round.m) < 1e-9) {
      if (c === null) return;
      m = 0;
      g = grade(0, c, 0, round.c);
    } else {
      if (m === null || c === null) return;
      g = grade(m, c, round.m, round.c);
    }
    unlockAudio();
    const token = s.slashToken + 1;
    if (skill) {
      set({
        phase: "omen",
        skill,
        pending: { m: 0, c: 0, grade: g, skill },
        slashToken: token,
        slashT: 1,
        leaving: false,
      });
      playSlash();
      window.setTimeout(() => {
        if (get().slashToken !== token) return;
        get().finishSlash();
      }, 1500);
      return;
    }
    set({
      phase: "slash",
      skill: null,
      pending: { m: m ?? 0, c: cut, vertical, grade: g },
      slashToken: token,
      slashT: 0,
      leaving: false,
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
      skill: null,
        lastGrade: g,
        pending: null,
        slashT: 1,
        streak: g.band === "perfect" ? s.streak + 1 : 0,
        flash: g.band,
        history: [
          ...s.history,
          { yours: pending.skill ? SKILL_LABEL[pending.skill] : formatLine(pending.m, pending.c, pending.vertical), answer: formatLine(round.m, round.c, round.vertical), band: g.band, score: g.score },
        ],
      });
      window.setTimeout(() => {
        if (get().flash === g.band) set({ flash: null });
      }, 700);
      return;
    }
    const finale = isFinale(s.duelIndex);
    let combo = s.combo;
    let damage = g.damage;
    if (finale) {
      if (g.band === "perfect" || g.band === "hit") {
        combo = Math.min(2, s.combo + 1);
        if (combo >= 2) damage = g.damage * 2;
      } else if (g.band === "miss") combo = 0;
    }
    const applied = { ...g, damage };
    const playerQi = Math.max(0, s.playerQi - g.counter);
    const enemyQi = Math.max(0, s.enemyQi - damage);
    if (g.band === "miss") playMiss();
    else playHit(g.band === "perfect");
    set({
      phase: "exchange",
      skill: null,
      playerQi,
      enemyQi,
      combo,
      lastGrade: applied,
      pending: null,
      slashT: 1,
      flash: g.band,
      history: [
        ...s.history,
        { yours: pending.skill ? SKILL_LABEL[pending.skill] : formatLine(pending.m, pending.c, pending.vertical), answer: formatLine(round.m, round.c, round.vertical), band: g.band, score: g.score },
      ],
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
        revealUntil: 0,
      });
      return;
    }
    if (s.playerQi <= 0) {
      set({ phase: "defeat" });
      return;
    }
    const duelNow = duelOf(s.duelIndex);
    if (duelNow.freeform && s.enemyQi <= 0) {
      const stars = s.playerQi >= 80 ? 3 : s.playerQi >= 45 ? 2 : 1;
      const prev = s.save.stars[duelNow.id] ?? 0;
      const save = { ...s.save, stars: { ...s.save.stars, [duelNow.id]: Math.max(prev, stars) } };
      persist(save);
      set({ phase: "victory", save, earnedStars: stars });
      return;
    }
    const lines = guardSet(s.duelIndex, s.roundIndex);
    set({
      phase: "guard",
      guardLines: lines,
      guardStep: 0,
      guardResult: null,
      guardDraw: null,
      lastGrade: null,
    });
  },

  submitGuard: (drawn) => {
    const s = get();
    if (s.phase !== "guard" || s.guardResult) return;
    const target = s.guardLines[s.guardStep];
    if (!target) return;
    const ok = dodgeOk(drawn, target);
    const cut = isFinale(s.duelIndex) ? 22 : 16;
    if (ok) playHit(false);
    else playMiss();
    set({
      guardResult: ok ? "dodge" : "cut",
      guardDraw: drawn,
      playerQi: ok ? s.playerQi : Math.max(0, s.playerQi - cut),
    });
  },

  ackGuard: () => {
    const s = get();
    if (s.mode === "practice") return;
    if (s.playerQi <= 0) {
      set({ phase: "defeat", guardResult: null });
      return;
    }
    if (s.phase === "guard" && s.guardStep + 1 < s.guardLines.length) {
      set({ guardStep: s.guardStep + 1, guardResult: null, guardDraw: null });
      return;
    }
    const duel = duelOf(s.duelIndex);
    const finished = s.roundIndex + 1 >= duel.rounds.length;
    if (finished) {
      if (s.enemyQi <= 0) {
        const stars = s.playerQi >= 80 ? 3 : s.playerQi >= 45 ? 2 : 1;
        const prev = s.save.stars[duel.id] ?? 0;
        const save = { ...s.save, stars: { ...s.save.stars, [duel.id]: Math.max(prev, stars) } };
        persist(save);
        set({ phase: "victory", save, earnedStars: stars, guardResult: null });
      } else {
        set({ phase: "defeat", guardResult: null });
      }
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
      guardResult: null,
      guardDraw: null,
      revealUntil: upcoming?.reveal === "flash" ? Date.now() + 2800 : 0,
    });
  },
}));

export function activeRound(s: Pick<GameState, "mode" | "duelIndex" | "roundIndex" | "practice">): Round | null {
  return roundOf(s);
}

export function activeDuel(s: Pick<GameState, "duelIndex">): Duel {
  return duelOf(s.duelIndex);
}

declare global {
  interface Window {
    __blade?: {
      phase: () => string;
      setEq: (m: string, c: string) => void;
      strike: () => void;
      startFirst: () => void;
      beginAim: () => void;
      cont: () => void;
      grade: () => Grade | null;
      qi: () => { p: number; e: number };
      practice: () => void;
    };
  }
}
