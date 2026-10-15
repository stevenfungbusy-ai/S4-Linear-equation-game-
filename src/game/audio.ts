let ctx: AudioContext | null = null;
let muted = false;
let music: HTMLAudioElement | null = null;

function track() {
  if (music) return music;
  const audio = new Audio("/detention.mp3");
  audio.loop = true;
  audio.preload = "auto";
  audio.volume = muted ? 0 : 0.18;
  music = audio;
  return audio;
}

export function setMuted(v: boolean) {
  muted = v;
  if (music) music.volume = v ? 0 : 0.18;
}

export function unlockAudio() {
  if (typeof window === "undefined") return;
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === "suspended") void ctx.resume();
  startMusic();
}

function ac(): AudioContext | null {
  if (muted || !ctx || ctx.state !== "running") return null;
  return ctx;
}

export function startMusic() {
  if (typeof window === "undefined") return;
  const audio = track();
  audio.volume = muted ? 0 : 0.18;
  if (audio.paused) void audio.play().catch(() => undefined);
}

export function playSlash() {
  const c = ac();
  if (!c) return;
  const now = c.currentTime;
  const osc = c.createOscillator();
  const filter = c.createBiquadFilter();
  const gain = c.createGain();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(380, now);
  osc.frequency.exponentialRampToValueAtTime(70, now + 0.28);
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(1600, now);
  filter.frequency.exponentialRampToValueAtTime(240, now + 0.28);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.08, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(c.destination);
  osc.start(now);
  osc.stop(now + 0.34);

  const len = Math.floor(c.sampleRate * 0.18);
  const buffer = c.createBuffer(1, len, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
  const noise = c.createBufferSource();
  noise.buffer = buffer;
  const hp = c.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 900;
  const ng = c.createGain();
  ng.gain.value = 0.06;
  noise.connect(hp);
  hp.connect(ng);
  ng.connect(c.destination);
  noise.start(now);
}

export function playHit(perfect: boolean) {
  const c = ac();
  if (!c) return;
  const now = c.currentTime;
  const freqs = perfect ? [660, 990] : [420, 630];
  freqs.forEach((f, i) => {
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = "triangle";
    osc.frequency.value = f;
    gain.gain.setValueAtTime(0.0001, now + i * 0.05);
    gain.gain.exponentialRampToValueAtTime(perfect ? 0.09 : 0.06, now + i * 0.05 + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28 + i * 0.05);
    osc.connect(gain);
    gain.connect(c.destination);
    osc.start(now + i * 0.05);
    osc.stop(now + 0.36);
  });
}

export function playMiss() {
  const c = ac();
  if (!c) return;
  const now = c.currentTime;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(140, now);
  osc.frequency.exponentialRampToValueAtTime(55, now + 0.22);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.09, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.26);
  osc.connect(gain);
  gain.connect(c.destination);
  osc.start(now);
  osc.stop(now + 0.28);
}

export function bindVisibility() {
  if (typeof document === "undefined") return;
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      if (ctx?.state === "suspended") void ctx.resume();
      startMusic();
    }
  });
}
