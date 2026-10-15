import { Component, lazy, Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { bindVisibility, unlockAudio } from "./audio";
import { Codex, DuelScreen, Title } from "./Hud";
import { SKILL_LABEL, type SkillName } from "./math";
import { subscribeSlash } from "./slashBus";
import { useGame } from "./store";

const SceneCanvas = lazy(() => import("./SceneCanvas"));

const VW = 1000;
const VH = 640;

function wavePath(kind: "sin" | "cos") {
  const n = 420;
  let d = "";
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const y = kind === "cos" ? Math.cos(t * Math.PI * 5) : Math.sin(t * Math.PI * 5);
    d += `${i === 0 ? "M" : "L"}${(t * VW).toFixed(1)} ${(VH / 2 - y * 168).toFixed(1)}`;
  }
  return [d];
}

function tanPaths() {
  const left = -2.5 * Math.PI;
  const right = 2.5 * Math.PI;
  const limit = 4.4;
  const paths: string[] = [];
  for (let k = -3; k <= 2; k++) {
    const s0 = Math.max((k + 0.5) * Math.PI, left);
    const s1 = Math.min((k + 1.5) * Math.PI, right);
    if (s1 - s0 < 0.25) continue;
    let d = "";
    let on = false;
    for (let i = 0; i <= 100; i++) {
      const mx = s0 + ((s1 - s0) * i) / 100;
      const ty = Math.tan(mx);
      if (!Number.isFinite(ty) || Math.abs(ty) > limit) {
        on = false;
        continue;
      }
      const x = ((mx - left) / (right - left)) * VW;
      const y = VH / 2 - ty * 64;
      d += `${on ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
      on = true;
    }
    if (d) paths.push(d);
  }
  return paths;
}

function tipY(skill: SkillName, t: number) {
  if (skill === "tan") {
    const left = -2.5 * Math.PI;
    const ty = Math.tan(left + t * (5 * Math.PI));
    if (!Number.isFinite(ty) || Math.abs(ty) > 4.4) return null;
    return VH / 2 - ty * 64;
  }
  const y = skill === "cos" ? Math.cos(t * Math.PI * 5) : Math.sin(t * Math.PI * 5);
  return VH / 2 - y * 168;
}

function SkillCut({ skill }: { skill: SkillName }) {
  const mask = useRef<SVGRectElement>(null);
  const tip = useRef<SVGCircleElement>(null);
  const paths = useMemo(() => (skill === "tan" ? tanPaths() : wavePath(skill)), [skill]);
  useEffect(() => {
    const start = performance.now();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const step = (now: number) => {
      const u = Math.min(1, (now - start) / (reduce ? 1 : 1200));
      const eased = reduce ? 1 : 1 - (1 - u) ** 3;
      mask.current?.setAttribute("width", String(eased * VW));
      const y = tipY(skill, Math.min(eased, 0.995));
      if (tip.current) {
        tip.current.setAttribute("cx", String(eased * VW));
        if (y == null) tip.current.setAttribute("opacity", "0");
        else {
          tip.current.setAttribute("cy", String(y));
          tip.current.setAttribute("opacity", eased > 0.02 && eased < 0.995 ? "1" : "0");
        }
      }
      if (u < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [skill]);
  return (
    <svg className="omen-graph" viewBox={`0 0 ${VW} ${VH}`} aria-hidden>
      <defs>
        <filter id="omen-glow" x="-8%" y="-30%" width="116%" height="160%">
          <feGaussianBlur stdDeviation="7" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <mask id="omen-mask">
          <rect ref={mask} x="0" y="0" width="0" height={VH} fill="white" />
        </mask>
      </defs>
      <g mask="url(#omen-mask)" filter="url(#omen-glow)">
        {paths.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="#fff6ea" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
        ))}
        {paths.map((d, i) => (
          <path key={`core${i}`} d={d} fill="none" stroke="#e23b2b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        ))}
      </g>
      <circle ref={tip} r="12" fill="#fff6ea" opacity="0" />
    </svg>
  );
}

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) return <div className="h-full w-full bg-ink" />;
    return this.props.children;
  }
}

export function Game() {
  const phase = useGame((s) => s.phase);
  const flash = useGame((s) => s.flash);
  const skill = useGame((s) => s.skill);
  const pending = useGame((s) => s.pending);
  const slashBand = phase === "slash" ? pending?.grade.band : null;
  const [webgl, setWebgl] = useState(false);
  useEffect(() => {
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
      qi: () => ({ p: useGame.getState().playerQi, e: useGame.getState().enemyQi }),
      practice: () => useGame.getState().startPractice(),
    };
    const unsub = subscribeSlash((t) => useGame.getState().setSlashT(t));
    return () => {
      window.removeEventListener("pointerdown", down);
      unsub();
    };
  }, []);
  return (
    <div className="game-root">
      <div className="game-canvas">
        {webgl && (
          <SceneBoundary>
            <Suspense fallback={null}>
              <SceneCanvas />
            </Suspense>
          </SceneBoundary>
        )}
      </div>
      <div className="game-ui">
        {phase === "title" && <Title />}
        {phase === "codex" && <Codex />}
        {phase !== "title" && phase !== "codex" && <DuelScreen />}
      </div>
      {slashBand && slashBand !== "miss" && <div className={`slash-cut slash-cut-${slashBand}`} />}
      {flash && <div className={`hitflash hitflash-${flash}`} />}
      {phase === "omen" && skill && (
        <div className="omen">
          <p className="omen-name">{SKILL_LABEL[skill]}</p>
          <SkillCut skill={skill} />
        </div>
      )}
    </div>
  );
}
