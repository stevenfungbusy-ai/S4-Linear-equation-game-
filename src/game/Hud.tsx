import { BookOpen, Lock, Star, Swords, Volume2, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";
import { DUELS, isFinale, ROUND_NAME } from "./campaign";
import { GraphSvg, lineOffscreen } from "./GraphSvg";
import {
  BAND_LABEL,
  formatEq,
  formatLine,
  lineKind,
  parseFormula,
  parseNum,
  workings,
} from "./math";
import { activeDuel, activeRound, useGame, type GameState } from "./store";

function Stars({ n, of = 3 }: { n: number; of?: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${n} 星，滿分 ${of}`}>
      {Array.from({ length: of }, (_, i) => (
        <Star key={i} className={i < n ? "size-4 fill-gold text-gold" : "size-4 text-line"} />
      ))}
    </span>
  );
}

function MuteButton() {
  const mute = useGame((s) => s.save.mute);
  const toggle = useGame((s) => s.toggleMute);
  const Icon = mute ? VolumeX : Volume2;
  return (
    <button type="button" className="icon-btn" onClick={toggle} aria-label={mute ? "打開聲音" : "關閉聲音"}>
      <Icon className="size-5" />
    </button>
  );
}

export function Title() {
  const save = useGame((s) => s.save);
  const startDuel = useGame((s) => s.startDuel);
  const startPractice = useGame((s) => s.startPractice);
  const openCodex = useGame((s) => s.openCodex);
  const total = Object.values(save.stars).reduce((a, b) => a + b, 0);
  return (
    <div className="scroll-screen">
      <div className="mx-auto flex w-full max-w-lg flex-col gap-6 px-5 py-8">
        <div className="flex items-start justify-between">
          <div className="seal" aria-hidden>
            斬
          </div>
          <MuteButton />
        </div>
        <header>
          <p className="font-mono text-xs tracking-widest text-gold">直線方程 · 第一人稱</p>
          <h1 className="mt-2 font-serif text-6xl font-black tracking-widest text-parchment">刃式</h1>
          <p className="mt-3 max-w-sm font-serif text-lg leading-relaxed text-parchment">
            出劍的軌跡，就是你寫下的直線。
          </p>
          <p className="mt-2 font-mono text-sm text-mute">y = mx + c　·　y = c　·　x = k</p>
        </header>
        <div className="grid grid-cols-2 gap-3">
          <button type="button" className="btn-ghost" onClick={openCodex}>
            <BookOpen className="size-4" />
            如何出劍
          </button>
          <button type="button" className="btn-ghost" onClick={startPractice}>
            <Swords className="size-4" />
            道場練習
          </button>
        </div>
        <section>
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="font-serif text-xl text-parchment">武帖</h2>
            <p className="font-mono text-xs text-mute">星 {total} / {DUELS.length * 3}</p>
          </div>
          <ol className="flex flex-col gap-2">
            {DUELS.map((duel, i) => {
              const unlocked = i === 0 || (save.stars[DUELS[i - 1].id] ?? 0) > 0;
              const stars = save.stars[duel.id] ?? 0;
              return (
                <li key={duel.id}>
                  <button
                    type="button"
                    className="roster"
                    disabled={!unlocked}
                    onClick={() => startDuel(i)}
                  >
                    <span className="font-mono text-xs text-mute">{String(i + 1).padStart(2, "0")}</span>
                    <span className="min-w-0 flex-1 text-left">
                      <span className="block font-serif text-lg text-parchment">
                        {duel.name}
                        <span className="ml-2 text-sm text-gold">{duel.epithet}</span>
                      </span>
                      <span className="block truncate text-sm text-mute">{duel.blurb}</span>
                    </span>
                    {unlocked ? <Stars n={stars} /> : <Lock className="size-4 text-mute" />}
                  </button>
                </li>
              );
            })}
          </ol>
        </section>
        <p className="text-center text-xs text-mute">{DUELS.length}場對決。</p>
      </div>
    </div>
  );
}

export function Codex() {
  const openTitle = useGame((s) => s.openTitle);
  const startDuel = useGame((s) => s.startDuel);
  const [m, setM] = useState(1);
  const [c, setC] = useState(0);
  return (
    <div className="scroll-screen">
      <div className="mx-auto flex w-full max-w-lg flex-col gap-5 px-5 py-6">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-3xl text-parchment">如何出劍</h2>
          <button type="button" className="btn-ghost" onClick={openTitle}>
            返回
          </button>
        </div>
        <ul className="flex flex-col gap-2 text-sm text-parchment">
          <li><span className="text-gold">y = mx + c</span>　斜率 m，截距 c。</li>
          <li><span className="text-gold">y = c</span>　水平線。</li>
          <li><span className="text-gold">x = k</span>　垂直線。</li>
        </ul>
        <div className="veil-frame h-64">
          <GraphSvg player={{ m, c }} target={null} triangle draw={null} playerLive />
        </div>
        <label className="block text-sm text-mute">
          斜率 m　<span className="font-mono text-parchment">{formatEq(m, c)}</span>
          <input
            className="range"
            type="range"
            min={-3}
            max={3}
            step={0.5}
            value={m}
            aria-label="試斜率"
            onChange={(e) => setM(Number(e.target.value))}
          />
        </label>
        <label className="block text-sm text-mute">
          截距 c
          <input
            className="range"
            type="range"
            min={-3}
            max={3}
            step={0.5}
            value={c}
            aria-label="試截距"
            onChange={(e) => setC(Number(e.target.value))}
          />
        </label>
        <button type="button" className="btn-primary" onClick={() => startDuel(0)}>
          去會青竹
        </button>
      </div>
    </div>
  );
}

function qiWidth(n: number) {
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
  const combo = useGame((s) => s.combo);
  const leaving = useGame((s) => s.leaving);
  const askLeave = useGame((s) => s.askLeave);
  const cancelLeave = useGame((s) => s.cancelLeave);
  const openTitle = useGame((s) => s.openTitle);
  const duel = DUELS[duelIndex] ?? DUELS[0];
  const practice = mode === "practice";
  return (
    <header className="hud-top">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-serif text-lg text-parchment">
            {practice ? "陪練" : duel.name}
            <span className="ml-2 text-sm text-gold">{practice ? "讀圖" : duel.epithet}</span>
          </p>
          <p className="font-mono text-xs text-mute">
            {practice
              ? `連續一線 ${streak}`
              : isFinale(duelIndex)
                ? `${ROUND_NAME[roundIndex] ?? ""}　／　三　·　連擊 ${combo}/2`
                : `${ROUND_NAME[roundIndex] ?? ""}　／　三`}
          </p>
        </div>
        {leaving ? (
          <div className="flex gap-2">
            <button type="button" className="btn-ghost px-3" onClick={openTitle}>
              離開
            </button>
            <button type="button" className="btn-ghost px-3" onClick={cancelLeave}>
              留下
            </button>
          </div>
        ) : (
          <button type="button" className="btn-ghost px-3" onClick={phase === "brief" ? openTitle : askLeave}>
            返回
          </button>
        )}
      </div>
      {!practice && phase !== "brief" && (
        <div className="mt-2 grid grid-cols-2 gap-3">
          <Qi label="你的氣" value={playerQi} tone="gold" />
          <Qi label="敵氣" value={enemyQi} tone="cinnabar" />
        </div>
      )}
    </header>
  );
}

function Qi({ label, value, tone }: { label: string; value: number; tone: "gold" | "cinnabar" }) {
  return (
    <div>
      <div className="mb-1 flex justify-between font-mono text-xs text-mute">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="qi-track">
        <div className={tone === "gold" ? "qi-fill bg-gold" : "qi-fill bg-cinnabar"} style={{ width: qiWidth(value) }} />
      </div>
    </div>
  );
}

function BriefCard() {
  const duelIndex = useGame((s) => s.duelIndex);
  const beginAim = useGame((s) => s.beginAim);
  const duel = DUELS[duelIndex] ?? DUELS[0];
  return (
    <div className="brief-wrap">
      <article className="panel">
        <p className="font-mono text-xs tracking-widest text-gold">{duel.epithet}</p>
        <h2 className="mt-1 font-serif text-4xl text-parchment">{duel.name}</h2>
        <p className="mt-2 text-sm text-mute">{duel.blurb}</p>
        <p className="mt-3 font-mono text-sm text-gold">{duel.lesson}</p>
        <button type="button" className="btn-primary mt-4" onClick={beginAim}>
          拔劍
        </button>
      </article>
    </div>
  );
}

function useNow(active: boolean) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => setNow(Date.now()), 120);
    return () => window.clearInterval(id);
  }, [active]);
  return now;
}

function targetVisible(s: GameState, now: number) {
  const round = activeRound(s);
  if (!round) return false;
  if (s.phase === "slash" || s.phase === "exchange" || s.phase === "victory" || s.phase === "defeat") return true;
  if (s.phase !== "aim") return false;
  if (round.reveal === "formula" || round.reveal === "graph") return true;
  if (round.reveal === "flash") return now < s.revealUntil;
  return false;
}

export function DuelScreen() {
  const phase = useGame((s) => s.phase);
  const guardResult = useGame((s) => s.guardResult);
  const showVeil = phase === "aim" || phase === "slash" || phase === "exchange" || phase === "guard" || phase === "victory" || phase === "defeat";
  const showDock = showVeil;
  const drawing = phase === "guard" && !guardResult;
  return (
    <div className="pointer-events-auto flex h-full min-h-0 flex-col">
      <div className="view">
        <TopBar />
        {phase === "brief" && <BriefCard />}
        {showVeil && phase !== "slash" && (
          <div className={drawing ? "veil-wrap live" : "veil-wrap"}>
            <div className="veil-frame">
              <LiveGraph />
            </div>
            <Legend />
          </div>
        )}
        <Callout />
      </div>
      {showDock && <Dock />}
    </div>
  );
}

function Legend() {
  const phase = useGame((s) => s.phase);
  const guardResult = useGame((s) => s.guardResult);
  const round = useGame(activeRound);
  const showJade = phase !== "guard" || guardResult != null;
  return (
    <div className="legend">
      {showJade && (
        <span>
          <i className="swatch bg-jade" />
          氣脈
        </span>
      )}
      <span>
        <i className="swatch bg-cinnabar" />
        你的劍
      </span>
      {round?.reveal === "points" && (
        <span>
          <i className="swatch bg-gold" />
          氣印
        </span>
      )}
    </div>
  );
}

function Callout() {
  const flash = useGame((s) => s.flash);
  if (!flash) return null;
  return <p className={`callout callout-${flash}`}>{BAND_LABEL[flash]}</p>;
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
  const guardLines = useGame((s) => s.guardLines);
  const guardStep = useGame((s) => s.guardStep);
  const guardResult = useGame((s) => s.guardResult);
  const guardDraw = useGame((s) => s.guardDraw);
  const submitGuard = useGame((s) => s.submitGuard);
  const freeform = Boolean(useGame(activeDuel).freeform);
  const flashRound = round?.reveal === "flash" && phase === "aim";
  const now = useNow(Boolean(flashRound));
  const m = parseNum(mText);
  const c = parseNum(cText);
  const kind = lineKind(round);
  const locked = phase === "slash" || phase === "exchange" || phase === "victory" || phase === "defeat";
  const pm = locked && pending ? pending.m : m;
  const pc = locked && pending ? pending.c : c;
  const px = locked && pending?.vertical != null ? pending.vertical : c;
  const player =
    kind === "v"
      ? px != null
        ? { m: 0, c: 0, vertical: px }
        : null
      : kind === "h"
        ? pc != null
          ? { m: 0, c: pc }
          : null
        : pm != null && pc != null
          ? { m: pm, c: pc }
          : null;
  const showTarget = round
    ? targetVisible(
        {
          ...useGame.getState(),
          phase,
          revealUntil,
        },
        flashRound ? now : Date.now(),
      )
    : false;
  const draw = phase === "slash" ? slashT : locked ? 1 : null;
  const target =
    round && showTarget
      ? round.vertical != null
        ? { m: 0, c: 0, vertical: round.vertical }
        : { m: round.m, c: round.c }
      : null;
  const attack = guardLines[guardStep] ?? null;
  const guarding = phase === "guard";
  const bare = freeform && !guarding;
  const graphPlayer = guarding ? guardDraw : player;
  const graphTarget = guarding ? (guardResult && attack ? attack : null) : target;
  return (
    <GraphSvg
      player={graphPlayer}
      target={graphTarget}
      points={!bare && !guarding && (phase === "aim" || locked) ? round?.points : undefined}
      triangle={!bare && !guarding && showTriangle && phase === "aim" && kind === "mc"}
      draw={guarding ? null : draw}
      playerLive={Boolean(graphPlayer) && !bare}
      plane={!bare}
      interactive={guarding && !guardResult}
      onStrokeEnd={submitGuard}
    />
  );
}

function Dock() {
  const phase = useGame((s) => s.phase);
  if (phase === "victory" || phase === "defeat") return <EndDock />;
  if (phase === "guard") return <GuardDock />;
  return <AimDock />;
}

function GuardDock() {
  const lines = useGame((s) => s.guardLines);
  const step = useGame((s) => s.guardStep);
  const result = useGame((s) => s.guardResult);
  const ack = useGame((s) => s.ackGuard);
  const mode = useGame((s) => s.mode);
  const duelIndex = useGame((s) => s.duelIndex);
  const line = lines[step];
  const eq = line ? formatLine(line.m, line.c, line.vertical) : "";
  return (
    <div className="dock">
      <div className="dock-scroll">
        <p className="font-serif text-lg text-parchment">對手出劍</p>
        {mode === "campaign" && duelIndex === 0 && (
          <p className="coach">畫出直線，就是預測對手的氣，避開這一劍。</p>
        )}
        {lines.length > 1 && <p className="font-mono text-xs text-gold">連擊 {step + 1}/{lines.length}</p>}
        <p className="text-center font-serif text-3xl text-parchment">{eq}</p>
        {!result && <p className="text-center text-sm text-mute">在氣幕上畫出這條線。</p>}
        {result === "dodge" && <p className="text-center font-serif text-2xl text-jade">避開。</p>}
        {result === "cut" && <p className="text-center font-serif text-2xl text-cinnabar">被斬中。</p>}
      </div>
      <button type="button" className="btn-primary" disabled={!result} onClick={ack}>
        {result ? "繼續" : "畫線"}
      </button>
    </div>
  );
}

function applyKey(prev: string, key: string, formula: boolean) {
  if (key === "刪") return prev.slice(0, -1);
  if (key === "−") {
    if (formula) return prev.endsWith("-") ? prev.slice(0, -1) : `${prev}-`;
    return prev.startsWith("-") ? prev.slice(1) : `-${prev}`;
  }
  if (key === ".") {
    if (formula) return prev.endsWith(".") ? prev : `${prev}.`;
    if (prev.includes(".")) return prev;
    return `${prev || "0"}.`;
  }
  return prev + key;
}

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "−", "0", ".", "刪"];

function AimDock() {
  const phase = useGame((s) => s.phase);
  const mText = useGame((s) => s.mText);
  const cText = useGame((s) => s.cText);
  const showTriangle = useGame((s) => s.showTriangle);
  const hintUsed = useGame((s) => s.hintUsed);
  const setM = useGame((s) => s.setM);
  const setC = useGame((s) => s.setC);
  const toggleTriangle = useGame((s) => s.toggleTriangle);
  const strike = useGame((s) => s.strike);
  const peek = useGame((s) => s.peek);
  const continueRound = useGame((s) => s.continueRound);
  const mode = useGame((s) => s.mode);
  const round = useGame(activeRound);
  const last = useGame((s) => s.lastGrade);
  const playerQi = useGame((s) => s.playerQi);
  const combo = useGame((s) => s.combo);
  const duelIndex = useGame((s) => s.duelIndex);
  const revealUntil = useGame((s) => s.revealUntil);
  const flashRound = round?.reveal === "flash" && phase === "aim";
  const now = useNow(Boolean(flashRound));
  const m = parseNum(mText);
  const c = parseNum(cText);
  const kind = lineKind(round);
  const duel = useGame(activeDuel);
  const freeform = Boolean(duel.freeform);
  const written = parseFormula(mText);
  const ready = phase === "aim" && (freeform ? written != null : kind === "mc" ? m != null && c != null : c != null);
  const off =
    kind === "v"
      ? c != null && lineOffscreen(0, 0, c)
      : kind === "h"
        ? c != null && lineOffscreen(0, c)
        : m != null && c != null && lineOffscreen(m, c);
  const locked = phase !== "aim";
  const shown = freeform
    ? mText.trim()
    : kind === "v"
      ? c != null
        ? formatLine(0, 0, c)
        : "x = k"
      : kind === "h"
        ? c != null
          ? formatLine(0, c)
          : "y = c"
        : m != null && c != null
          ? formatEq(m, c)
          : "y = mx + c";
  const yours = freeform
    ? mText.trim() || "—"
    : kind === "v"
      ? c != null
        ? formatLine(0, 0, c)
        : "—"
      : kind === "h"
        ? c != null
          ? formatLine(0, c)
          : "—"
        : m != null && c != null
          ? formatEq(m, c)
          : "—";
  const [focus, setFocus] = useState<"m" | "c">(kind === "mc" ? "m" : "c");
  const teach = mode === "campaign" && duelIndex === 0;

  function press(key: string) {
    if (freeform || (kind === "mc" && focus === "m")) setM(applyKey(mText, key, freeform));
    else setC(applyKey(cText, key, false));
  }

  let continueLabel = "下一劍";
  if (phase === "exchange" && mode === "practice") continueLabel = "下一式";
  else if (phase === "exchange" && mode === "campaign") {
    continueLabel = playerQi <= 0 ? "倒下" : "對方出劍";
  }

  return (
    <form
      className="dock"
      onSubmit={(e) => {
        e.preventDefault();
        if (phase === "aim") strike();
        else if (phase === "exchange") continueRound();
      }}
    >
      <div className="dock-scroll">
      {round && phase === "aim" && <p className="text-sm leading-relaxed text-parchment">{round.prompt}</p>}
      {teach && phase === "aim" && <p className="coach">輸入數字，就是向對手揮劍。</p>}
      {flashRound && (
        <p className="font-mono text-xs text-jade">
          {now < revealUntil ? `還亮著 ${Math.ceil((revealUntil - now) / 1000)} 秒` : "已隱。"}
        </p>
      )}
      {phase === "slash" && <p className="font-serif text-lg text-parchment">出劍。</p>}
      {phase === "exchange" && last && round && (
        <div className="flex flex-col gap-2">
          <p className="font-serif text-2xl text-parchment">
            {BAND_LABEL[last.band]}
            <span className="ml-3 font-mono text-sm text-gold">準度 {last.score}</span>
          </p>
          <p className="text-sm leading-relaxed text-parchment">{last.comment}</p>
          {mode === "campaign" && (
            <p className="font-mono text-xs text-mute">
              敵氣 −{last.damage}　你的氣 −{last.counter}
              {isFinale(duelIndex) ? `　連擊 ${combo}/2` : ""}
            </p>
          )}
          <div className="text-sm leading-relaxed text-gold">
            {workings(round.m, round.c, round.points, round.vertical).map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <p className="font-mono text-xs text-mute">你的式 {yours}</p>
        </div>
      )}

      {phase === "aim" && !freeform && (
        <>
          <p className={`text-center font-serif text-2xl sm:text-3xl ${ready ? "text-parchment" : "text-mute"}`}>
            {shown}
          </p>
          {off && <p className="text-center text-sm text-cinnabar">這條線跑出氣幕了。</p>}
          <div className={kind === "mc" ? "grid grid-cols-2 gap-2" : "grid grid-cols-1 gap-2"}>
            {kind === "mc" && (
              <Field
                label="斜率 m"
                value={mText}
                disabled={locked}
                active={focus === "m"}
                onFocus={() => setFocus("m")}
                onChange={setM}
              />
            )}
            <Field
              label={kind === "v" ? "x" : kind === "h" ? "y" : "截距 c"}
              value={cText}
              disabled={locked}
              active={kind !== "mc" || focus === "c"}
              onFocus={() => setFocus("c")}
              onChange={setC}
            />
          </div>
          <Keypad onKey={press} />
          <div className="flex gap-2 overflow-x-auto">
            {kind === "mc" && (
              <button type="button" className={showTriangle ? "chip chip-on" : "chip"} onClick={toggleTriangle}>
                斜率三角
              </button>
            )}
            {round?.reveal === "flash" && (
              <button type="button" className="chip" onClick={peek} disabled={hintUsed}>
                再看一眼 −8 氣
              </button>
            )}
          </div>
        </>
      )}
      {phase === "aim" && freeform && (
        <>
          <input
            className="eq-input w-full text-center font-serif text-2xl"
            value={mText}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label="公式"
            onChange={(e) => setM(e.target.value)}
          />
          <Keypad onKey={press} />
        </>
      )}
      </div>

      {phase === "aim" ? (
        <button type="submit" className="btn-primary" disabled={!ready}>
          出劍
        </button>
      ) : phase === "exchange" ? (
        <button type="submit" className="btn-primary">
          {continueLabel}
        </button>
      ) : (
        <button type="button" className="btn-primary" disabled>
          出劍
        </button>
      )}
    </form>
  );
}

function Keypad({ onKey }: { onKey: (key: string) => void }) {
  return (
    <div className="keypad">
      {KEYS.map((key) => (
        <button key={key} type="button" className="key" onClick={() => onKey(key)}>
          {key}
        </button>
      ))}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  disabled,
  active,
  onFocus,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  disabled: boolean;
  active: boolean;
  onFocus: () => void;
}) {
  return (
    <div className={active ? "field field-on" : "field"}>
      <span className="font-mono text-xs text-mute">{label}</span>
      <input
        className="eq-input"
        inputMode="text"
        autoComplete="off"
        placeholder="0"
        aria-label={label}
        value={value}
        disabled={disabled}
        onFocus={onFocus}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
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
  const reason =
    playerQi <= 0 ? "你的氣盡了。把剛才那幾式再寫一次。" : "三劍過後，對手還站著。看著正解，再來一場。";
  return (
    <div className="dock">
      <div className="dock-scroll">
        <p className="font-serif text-3xl text-parchment">{win ? "破" : "未破"}</p>
        {win ? (
          <>
            <Stars n={earned} />
            <p className="text-sm leading-relaxed text-parchment">{duel.lesson}</p>
            {mode === "campaign" && playerQi >= 80 && <p className="text-sm text-gold">氣幾乎沒損。這就是一線。</p>}
          </>
        ) : (
          <p className="text-sm leading-relaxed text-parchment">{reason}</p>
        )}
        <ul className="flex flex-col gap-1 text-sm text-mute">
          {history.map((row, i) => (
            <li key={`${row.answer}-${i}`}>
              {ROUND_NAME[i] ?? `第${i + 1}劍`} · {BAND_LABEL[row.band]} · 準度 {row.score}
            </li>
          ))}
        </ul>
        {win && next == null && <p className="text-center text-sm text-gold">七式已盡。直線在你劍上。</p>}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button type="button" className="btn-ghost w-full" onClick={() => startDuel(duelIndex)}>
          再戰
        </button>
        {win && next != null ? (
          <button type="button" className="btn-primary" onClick={() => startDuel(next)}>
            下一場
          </button>
        ) : (
          <button type="button" className="btn-primary" onClick={openTitle}>
            {win && next == null ? "回府" : "武帖"}
          </button>
        )}
      </div>
    </div>
  );
}
