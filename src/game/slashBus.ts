type Listener = (t: number) => void;

let t = 0;
let raf = 0;
const listeners = new Set<Listener>();

export function getSlashT() {
  return t;
}

export function subscribeSlash(fn: Listener) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function emit(v: number) {
  t = v;
  listeners.forEach((fn) => fn(v));
}

export function runSlash(onDone: () => void) {
  cancelAnimationFrame(raf);
  const start = performance.now();
  const step = (now: number) => {
    const u = Math.min(1, (now - start) / 680);
    const eased = 1 - (1 - u) ** 3;
    emit(eased);
    const hold = typeof window !== "undefined" && window.__bladeHold === true;
    if (hold && u >= 0.42) return;
    if (u < 1) raf = requestAnimationFrame(step);
    else onDone();
  };
  emit(0);
  raf = requestAnimationFrame(step);
}

declare global {
  interface Window {
    __bladeHold?: boolean;
  }
}
