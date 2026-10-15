import type { PointMark } from "./math";

export type Reveal = "formula" | "graph" | "points" | "flash";

export type Round = {
  m: number;
  c: number;
  /** Set for a vertical line x = vertical. */
  vertical?: number;
  reveal: Reveal;
  prompt: string;
  points?: PointMark[];
};

export type Duel = {
  id: string;
  name: string;
  epithet: string;
  accent: string;
  blurb: string;
  lesson: string;
  enemyQi: number;
  /** Player types the whole formula. No m / c fields. */
  freeform?: boolean;
  rounds: Round[];
};

export const DUELS: Duel[] = [
  {
    id: "qingzhu",
    name: "青竹",
    epithet: "水平之刃",
    accent: "#6ea88a",
    blurb: "剛入門的竹林劍客，出劍只肯放平。",
    lesson: "水平線寫成 y = c。",
    enemyQi: 96,
    rounds: [
      {
        m: 0,
        c: 1,
        reveal: "formula",
        prompt: "水平線。y = 1",
      },
      {
        m: 0,
        c: 2,
        reveal: "formula",
        prompt: "水平線。y = 2",
      },
      {
        m: 0,
        c: -1,
        reveal: "formula",
        prompt: "水平線。y = −1",
      },
    ],
  },
  {
    id: "lizhu",
    name: "立柱",
    epithet: "垂直之刃",
    accent: "#d8d2c8",
    blurb: "劍只肯直直劈下。",
    lesson: "垂直線寫成 x = k。",
    enemyQi: 96,
    rounds: [
      {
        m: 0,
        c: 0,
        vertical: 1,
        reveal: "formula",
        prompt: "垂直線。x = 1",
      },
      {
        m: 0,
        c: 0,
        vertical: -2,
        reveal: "formula",
        prompt: "垂直線。x = −2",
      },
      {
        m: 0,
        c: 0,
        vertical: 3,
        reveal: "graph",
        prompt: "垂直線。看它落在哪條直格。",
      },
    ],
  },
  {
    id: "chisui",
    name: "赤穗",
    epithet: "等斜",
    accent: "#c4523a",
    blurb: "劍路永遠向右上，一步一格，不快不慢。",
    lesson: "m = 1：向右 1，向上 1。",
    enemyQi: 96,
    rounds: [
      {
        m: 1,
        c: 0,
        reveal: "formula",
        prompt: "y = x",
      },
      {
        m: 1,
        c: 1,
        reveal: "formula",
        prompt: "y = x + 1",
      },
      {
        m: 1,
        c: -2,
        reveal: "graph",
        prompt: "斜率是 1。讀出 c。",
      },
    ],
  },
  {
    id: "douya",
    name: "陡崖",
    epithet: "看斜率",
    accent: "#d08a3a",
    blurb: "劍勢忽陡忽緩，專門考你的眼力。",
    lesson: "|m| 越大越陡。",
    enemyQi: 96,
    rounds: [
      {
        m: 2,
        c: 0,
        reveal: "graph",
        prompt: "過原點。向右 1 格升多少？",
      },
      {
        m: 0.5,
        c: 1,
        reveal: "graph",
        prompt: "先讀 c，再看坡度。",
      },
      {
        m: 2,
        c: -1,
        reveal: "graph",
        prompt: "很陡，c 在下方。",
      },
    ],
  },
  {
    id: "nifeng",
    name: "逆風",
    epithet: "負斜率",
    accent: "#8aa4b8",
    blurb: "劍從左上劈到右下。",
    lesson: "m 為負，直線往右下。",
    enemyQi: 96,
    rounds: [
      {
        m: -1,
        c: 0,
        reveal: "graph",
        prompt: "下坡，過原點。",
      },
      {
        m: -2,
        c: 2,
        reveal: "graph",
        prompt: "更陡的下坡。先讀 c。",
      },
      {
        m: -0.5,
        c: -1,
        reveal: "graph",
        prompt: "緩下坡，c 是負的。",
      },
    ],
  },
  {
    id: "shuangyin",
    name: "雙印",
    epithet: "兩點成線",
    accent: "#e2b15c",
    blurb: "不給你看整條氣脈，只留兩枚氣印。",
    lesson: "兩點定一線。",
    enemyQi: 96,
    rounds: [
      {
        m: 1,
        c: 0,
        reveal: "points",
        points: [
          { x: 0, y: 0, name: "甲" },
          { x: 2, y: 2, name: "乙" },
        ],
        prompt: "甲(0, 0)，乙(2, 2)。",
      },
      {
        m: 0.5,
        c: 1,
        reveal: "points",
        points: [
          { x: -2, y: 0, name: "甲" },
          { x: 2, y: 2, name: "乙" },
        ],
        prompt: "甲(−2, 0)，乙(2, 2)。",
      },
      {
        m: -1,
        c: 0,
        reveal: "points",
        points: [
          { x: -2, y: 2, name: "甲" },
          { x: 2, y: -2, name: "乙" },
        ],
        prompt: "甲(−2, 2)，乙(2, −2)。",
      },
    ],
  },
  {
    id: "wuyin",
    name: "霧隱",
    epithet: "一瞬",
    accent: "#7dcec0",
    blurb: "氣脈只肯亮一瞬間。",
    lesson: "看交點，再看向右一格的升降。",
    enemyQi: 150,
    rounds: [
      {
        m: 2,
        c: -1,
        reveal: "flash",
        prompt: "只亮一瞬。",
      },
      {
        m: -1.5,
        c: 2,
        reveal: "flash",
        prompt: "下坡。分數可寫 −3/2。",
      },
      {
        m: 0.5,
        c: -2,
        reveal: "flash",
        prompt: "緩上坡，c 較低。",
      },
    ],
  },
  {
    id: "wuming",
    name: "無銘",
    epithet: "終式",
    accent: "#e23b2b",
    blurb: "不留名的劍客。三劍之內，式子得自己寫。",
    lesson: "自己寫出式子。",
    enemyQi: 180,
    rounds: [
      {
        m: -0.5,
        c: -0.5,
        reveal: "points",
        points: [
          { x: -3, y: 1, name: "甲" },
          { x: 1, y: -1, name: "乙" },
        ],
        prompt: "甲(−3, 1)，乙(1, −1)。",
      },
      {
        m: 1.5,
        c: 1,
        reveal: "flash",
        prompt: "一閃。分數可寫 3/2。",
      },
      {
        m: -2,
        c: 3,
        reveal: "flash",
        prompt: "看交點和坡度。",
      },
    ],
  },
  {
    id: "diyu",
    name: "地獄",
    epithet: "無式",
    accent: "#9b1c1c",
    blurb: "沒有格子，也沒有現成的式子。",
    lesson: "自己寫出整條公式。",
    enemyQi: 120,
    freeform: true,
    rounds: [
      {
        m: 2,
        c: -1,
        reveal: "points",
        points: [
          { x: 0, y: -1, name: "甲" },
          { x: 2, y: 3, name: "乙" },
        ],
        prompt: "甲(0, −1)，乙(2, 3)。",
      },
      {
        m: -1,
        c: 2,
        reveal: "points",
        points: [
          { x: -2, y: 4, name: "甲" },
          { x: 1, y: 1, name: "乙" },
        ],
        prompt: "甲(−2, 4)，乙(1, 1)。",
      },
      {
        m: 0.5,
        c: -2,
        reveal: "points",
        points: [
          { x: -2, y: -3, name: "甲" },
          { x: 2, y: -1, name: "乙" },
        ],
        prompt: "甲(−2, −3)，乙(2, −1)。",
      },
    ],
  },
];

export const ROUND_NAME = ["第一劍", "第二劍", "第三劍"];

export function isFinale(index: number) {
  const id = DUELS[index]?.id;
  return id === "wuyin" || id === "wuming";
}

const GUARD_LINES: { m: number; c: number; vertical?: number }[][] = [
  [
    { m: 0, c: 1 },
    { m: 0, c: -1 },
    { m: 0, c: 2 },
  ],
  [
    { m: 0, c: 0, vertical: 1 },
    { m: 0, c: 0, vertical: -2 },
    { m: 0, c: 0, vertical: 2 },
  ],
  [
    { m: 1, c: 0 },
    { m: 1, c: -1 },
    { m: 1, c: 1 },
  ],
  [
    { m: 2, c: 0 },
    { m: 0.5, c: 1 },
    { m: -1, c: 1 },
  ],
  [
    { m: -1, c: 0 },
    { m: -2, c: 1 },
    { m: 0, c: -1 },
  ],
  [
    { m: 1, c: 0 },
    { m: -1, c: 1 },
    { m: 0.5, c: -1 },
  ],
  [
    { m: 2, c: -1 },
    { m: -1, c: 2 },
    { m: 0.5, c: 1 },
  ],
  [
    { m: -2, c: 1 },
    { m: 1, c: -1 },
    { m: 0, c: 0, vertical: -1 },
  ],
  [
    { m: 1, c: -1 },
    { m: -1, c: 2 },
    { m: 2, c: 0 },
  ],
];

export function guardSet(duelIndex: number, roundIndex: number) {
  const pool = GUARD_LINES[duelIndex] ?? GUARD_LINES[0];
  const first = pool[roundIndex % pool.length] ?? pool[0];
  if (!isFinale(duelIndex)) return [first];
  const swings = DUELS[duelIndex]?.id === "wuming" ? 2 : Math.min(2, roundIndex + 1);
  if (swings < 2) return [first];
  const second = pool[(roundIndex + 1) % pool.length] ?? first;
  return [first, second];
}
