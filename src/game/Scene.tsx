import { useFrame, useThree } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { DUELS } from "./campaign";
import { getSlashT } from "./slashBus";
import { useGame } from "./store";

function Bamboo() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const mats = useMemo(() => {
    const dummy = new THREE.Object3D();
    const spots: THREE.Matrix4[] = [];
    for (const side of [-1, 1]) {
      for (let k = 0; k < 26; k++) {
        const h = 3.2 + Math.random() * 3.4;
        dummy.position.set(side * (2.4 + Math.random() * 5.2), h / 2, -3 + Math.random() * 9);
        dummy.scale.set(0.035 + Math.random() * 0.03, h, 0.035 + Math.random() * 0.03);
        dummy.rotation.set(0, Math.random() * Math.PI, (Math.random() - 0.5) * 0.06);
        dummy.updateMatrix();
        spots.push(dummy.matrix.clone());
      }
    }
    return spots;
  }, []);
  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    mats.forEach((m, i) => mesh.setMatrixAt(i, m));
    mesh.instanceMatrix.needsUpdate = true;
  }, [mats]);
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, mats.length]}>
      <cylinderGeometry args={[1, 1, 1, 5]} />
      <meshStandardMaterial color="#243028" roughness={0.9} />
    </instancedMesh>
  );
}

function Petals() {
  const group = useRef<THREE.Group>(null);
  useLayoutEffect(() => {
    const count = 64;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = Math.random() * 4;
      pos[i * 3 + 2] = -1.5 + Math.random() * 7;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({
      color: "#e2b15c",
      size: 0.04,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
    });
    const pts = new THREE.Points(geo, mat);
    group.current?.add(pts);
    return () => {
      group.current?.remove(pts);
      geo.dispose();
      mat.dispose();
    };
  }, []);
  useFrame((_, delta) => {
    const pts = group.current?.children[0] as THREE.Points | undefined;
    if (!pts) return;
    const dt = Math.min(delta, 0.1);
    const attr = pts.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < attr.count; i++) {
      arr[i * 3 + 1] -= dt * 0.2;
      if (arr[i * 3 + 1] < 0) {
        arr[i * 3 + 1] = 4;
        arr[i * 3] = (Math.random() - 0.5) * 8;
      }
    }
    attr.needsUpdate = true;
  });
  return <group ref={group} />;
}

function Lantern({ position, glow }: { position: [number, number, number]; glow: number }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.7, 6]} />
        <meshStandardMaterial color="#2a241c" />
      </mesh>
      <mesh>
        <boxGeometry args={[0.18, 0.26, 0.18]} />
        <meshStandardMaterial color="#e2b15c" emissive="#c4523a" emissiveIntensity={0.85} roughness={0.45} />
      </mesh>
      <pointLight color="#e2b15c" intensity={glow} distance={7} decay={2} />
    </group>
  );
}

function Gate() {
  const wood = "#3a221c";
  return (
    <group position={[0, 0, -1.6]}>
      <mesh position={[-1.15, 1.15, 0]}>
        <boxGeometry args={[0.14, 2.3, 0.14]} />
        <meshStandardMaterial color={wood} roughness={0.8} />
      </mesh>
      <mesh position={[1.15, 1.15, 0]}>
        <boxGeometry args={[0.14, 2.3, 0.14]} />
        <meshStandardMaterial color={wood} roughness={0.8} />
      </mesh>
      <mesh position={[0, 2.2, 0]}>
        <boxGeometry args={[2.7, 0.16, 0.16]} />
        <meshStandardMaterial color="#6e221c" roughness={0.7} />
      </mesh>
      <mesh position={[0, 1.95, 0]}>
        <boxGeometry args={[2.15, 0.1, 0.1]} />
        <meshStandardMaterial color={wood} roughness={0.8} />
      </mesh>
    </group>
  );
}

function Swordsman({ accent }: { accent: string }) {
  const ref = useRef<THREE.Group>(null);
  const blade = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const pose = useRef({ lean: 0, z: 0, arm: -0.9, roll: 0, drop: 0 });
  useFrame((_, delta) => {
    const g = ref.current;
    const b = blade.current;
    if (!g || !b) return;
    const dt = Math.min(delta, 0.1);
    const s = useGame.getState();
    const phase = s.phase;
    const band = s.phase === "slash" || s.phase === "omen" ? s.pending?.grade.band : s.lastGrade?.band ?? s.pending?.grade.band;
    const u = phase === "slash" ? getSlashT() : 1;
    const wounded = band === "hit" || band === "perfect" || band === "graze";
    const snap = wounded && (phase === "slash" || phase === "exchange" || phase === "omen") ? (phase === "slash" ? Math.max(0, (u - 0.38) / 0.22) : 1) : 0;
    let lean = 0;
    let z = 0;
    let arm = -0.85;
    let roll = 0;
    let drop = 0;
    const title = phase === "title" || phase === "codex";
    if (title) z = -0.15;
    if (phase === "victory") lean = 0.85;
    else if (phase === "defeat") {
      z = -0.35;
      arm = -0.2;
    } else if (phase === "guard") {
      if (s.guardResult === "dodge") {
        z = -0.3;
        lean = 0.22;
        arm = 0.15;
      } else if (s.guardResult === "cut") {
        z = 0.75;
        lean = 0.4;
        arm = 1.15;
      } else {
        z = 0.5;
        lean = 0.18;
        arm = 0.9;
      }
    } else if (phase === "slash" || phase === "exchange" || phase === "omen") {
      if (band === "miss") {
        z = -0.55;
        lean = 0.12;
        arm = 0.55;
        roll = 0.42;
      } else if (band === "graze") {
        z = 0.22;
        lean = -0.28 * Math.min(1, snap);
        arm = -0.45;
        roll = -0.12;
      } else if (band === "hit" || band === "perfect") {
        const hit = Math.min(1, snap);
        const jerk = phase === "slash" ? Math.sin(hit * Math.PI) : 0;
        z = -0.2 - hit * 0.7;
        lean = 0.62 * hit;
        arm = -1.55;
        roll = (band === "perfect" ? 0.34 : 0.22) * hit + jerk * 0.18;
        drop = hit * 0.22;
      }
    }
    const k = 1 - Math.exp(-dt * (snap > 0 && snap < 1 ? 18 : 7));
    pose.current.lean += (lean - pose.current.lean) * k;
    pose.current.z += (z - pose.current.z) * k;
    pose.current.arm += (arm - pose.current.arm) * k;
    pose.current.roll += (roll - pose.current.roll) * k;
    pose.current.drop += (drop - pose.current.drop) * k;
    const breathe = Math.sin(performance.now() / 900) * 0.015;
    g.position.set(pose.current.roll * 0.15, breathe - pose.current.drop, pose.current.z);
    g.rotation.x = pose.current.lean;
    g.rotation.z = pose.current.roll * 0.35;
    b.rotation.z = pose.current.arm;
    if (head.current) head.current.rotation.x = wounded && snap > 0 ? 0.16 * Math.min(1, snap) : 0;
  });
  return (
    <group ref={ref} scale={1.12}>
      <mesh position={[0, 0.02, 0.05]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.42, 20]} />
        <meshBasicMaterial color="#070605" transparent opacity={0.55} />
      </mesh>
      <mesh position={[0, 0.62, 0]}>
        <coneGeometry args={[0.42, 1.2, 7]} />
        <meshStandardMaterial color="#c4a07a" roughness={0.72} />
      </mesh>
      <mesh position={[0, 0.95, 0.06]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.2, 0.025, 6, 16]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.45} />
      </mesh>
      <group ref={head}>
        <mesh position={[0, 1.28, 0]}>
          <boxGeometry args={[0.58, 0.12, 0.22]} />
          <meshStandardMaterial color="#6b5848" roughness={0.8} />
        </mesh>
        <mesh position={[0, 1.48, 0]}>
          <cylinderGeometry args={[0.05, 0.06, 0.12, 8]} />
          <meshStandardMaterial color="#e4c4a4" roughness={0.6} />
        </mesh>
        <mesh position={[0, 1.66, 0]}>
          <sphereGeometry args={[0.16, 16, 16]} />
          <meshStandardMaterial color="#f6ddc4" roughness={0.45} />
        </mesh>
        <mesh position={[0, 1.74, -0.04]}>
          <sphereGeometry args={[0.17, 14, 14]} />
          <meshStandardMaterial color="#1c1612" roughness={1} />
        </mesh>
        <mesh position={[0, 1.66, 0.12]}>
          <boxGeometry args={[0.18, 0.1, 0.04]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.7} roughness={0.4} />
        </mesh>
      </group>
      <group ref={blade} position={[0.18, 1.12, 0.18]}>
        <mesh position={[0, 0.32, 0]}>
          <boxGeometry args={[0.025, 0.58, 0.008]} />
          <meshStandardMaterial color="#f2f4f6" metalness={0.7} roughness={0.22} />
        </mesh>
        <mesh>
          <boxGeometry args={[0.14, 0.02, 0.02]} />
          <meshStandardMaterial color="#e2b15c" metalness={0.5} roughness={0.35} emissive="#e2b15c" emissiveIntensity={0.25} />
        </mesh>
      </group>
    </group>
  );
}

function BladeArc() {
  const ref = useRef<THREE.Mesh>(null);
  const glow = useRef<THREE.PointLight>(null);
  useFrame(() => {
    const m = ref.current;
    const light = glow.current;
    const s = useGame.getState();
    const u = s.phase === "slash" ? getSlashT() : 0;
    const show = s.phase === "slash" && u > 0.08 && u < 0.88;
    if (m) {
      m.visible = show;
      if (show) {
        const sweep = Math.min(1, (u - 0.08) / 0.55);
        m.position.set(-1.55 + sweep * 3.1, 1.85 - sweep * 0.95, 0.85);
        m.rotation.z = 1.15 - sweep * 2.15;
        m.scale.set(0.4 + sweep * 2.6, 1.4 + sweep * 0.8, 1);
        const mat = m.material as THREE.MeshBasicMaterial;
        mat.opacity = Math.sin(sweep * Math.PI) * 0.95;
      }
    }
    if (light) {
      const band = s.pending?.grade.band;
      const connect = band === "hit" || band === "perfect" || band === "graze";
      light.intensity = show && connect ? Math.sin(Math.min(1, u / 0.7) * Math.PI) * (band === "perfect" ? 46 : band === "hit" ? 34 : 14) : 0;
    }
  });
  return (
    <>
      <mesh ref={ref} visible={false}>
        <planeGeometry args={[1.8, 0.16]} />
        <meshBasicMaterial color="#fff6ea" transparent opacity={0} depthWrite={false} toneMapped={false} />
      </mesh>
      <pointLight ref={glow} position={[0, 1.3, 0.8]} color="#e23b2b" intensity={0} distance={6} decay={2} />
    </>
  );
}
function Dummy() {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    const g = ref.current;
    if (!g) return;
    const s = useGame.getState();
    const band = s.phase === "exchange" ? s.lastGrade?.band : undefined;
    const kick = band === "hit" || band === "perfect" ? 0.18 : band === "miss" ? -0.05 : 0;
    g.rotation.x += (kick - g.rotation.x) * 0.12;
  });
  return (
    <group ref={ref} position={[0, 0, 0]}>
      <mesh position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.1, 0.13, 1.7, 8]} />
        <meshStandardMaterial color="#c4a07a" roughness={0.75} />
      </mesh>
      <mesh position={[0, 1.25, 0]}>
        <boxGeometry args={[0.7, 0.1, 0.1]} />
        <meshStandardMaterial color="#8a6a4e" roughness={0.85} />
      </mesh>
      <mesh position={[0, 1.25, 0.08]}>
        <torusGeometry args={[0.28, 0.02, 8, 24]} />
        <meshStandardMaterial color="#e23b2b" emissive="#e23b2b" emissiveIntensity={0.45} />
      </mesh>
      <mesh position={[0, 1.25, 0.09]}>
        <torusGeometry args={[0.14, 0.015, 8, 20]} />
        <meshStandardMaterial color="#e2b15c" emissive="#e2b15c" emissiveIntensity={0.35} />
      </mesh>
    </group>
  );
}

function Rig() {
  const { camera } = useThree();
  const look = useRef(new THREE.Vector3(0, 1.05, 0));
  const mouse = useRef({ x: 0, y: 0 });
  const reduce = useRef(false);
  useLayoutEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    const t = performance.now() / 1000;
    const s = useGame.getState();
    const u = s.phase === "slash" ? getSlashT() : 0;
    const band = s.pending?.grade.band;
    const connect = band === "hit" || band === "perfect" || band === "graze";
    const punch = connect ? Math.sin(Math.min(1, Math.max(0, (u - 0.4) / 0.32)) * Math.PI) : Math.sin(u * Math.PI) * 0.45;
    const amp = band === "perfect" ? 0.48 : band === "hit" ? 0.36 : band === "graze" ? 0.16 : 0.06;
    const shake = reduce.current ? 0 : punch * amp;
    const sway = reduce.current ? 0 : Math.sin(t * 0.8) * 0.03;
    const bob = reduce.current ? 0 : Math.sin(t * 1.3) * 0.012;
    const px = reduce.current ? 0 : mouse.current.x * 0.18;
    const py = reduce.current ? 0 : -mouse.current.y * 0.08;
    const title = s.phase === "title" || s.phase === "codex";
    camera.position.set(sway + shake * 0.35, (title ? 1.55 : 1.4) + bob, (title ? 3.7 : 5.1) - punch * (connect ? 0.55 : 0.12));
    const targetY = title ? 1.25 : 0.26;
    look.current.x += (px - look.current.x) * Math.min(1, dt * 3);
    look.current.y += (targetY + py + shake - look.current.y) * Math.min(1, dt * 3);
    look.current.z = 0;
    camera.lookAt(look.current);
  });
  return null;
}

function mixHex(a: string, b: string, t: number) {
  const n = (i: number) => {
    const av = parseInt(a.slice(i, i + 2), 16);
    const bv = parseInt(b.slice(i, i + 2), 16);
    return Math.round(av + (bv - av) * t)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${n(1)}${n(3)}${n(5)}`;
}

type Sky = {
  sky: string;
  fog: string;
  ground: string;
  ambient: number;
  sun: string;
  sunAt: [number, number, number];
  sunScale: number;
  halo: number;
  key: number;
  keyColor: string;
  fill: number;
  front: number;
  lantern: number;
};

const SKY_STOPS: Sky[] = [
  {
    sky: "#f0c98a",
    fog: "#e4d0b0",
    ground: "#6d7a58",
    ambient: 0.95,
    sun: "#fff4d6",
    sunAt: [3.4, 2.5, -7],
    sunScale: 0.72,
    halo: 0.22,
    key: 2.3,
    keyColor: "#fff1d2",
    fill: 1.05,
    front: 8,
    lantern: 2,
  },
  {
    sky: "#7eb6e6",
    fog: "#b7d0e4",
    ground: "#5e704c",
    ambient: 1.15,
    sun: "#fffaf0",
    sunAt: [0.5, 5.3, -6.4],
    sunScale: 0.86,
    halo: 0.14,
    key: 2.45,
    keyColor: "#fff8ee",
    fill: 1.25,
    front: 7,
    lantern: 1.4,
  },
  {
    sky: "#d15a3a",
    fog: "#8a4038",
    ground: "#3d2a22",
    ambient: 0.5,
    sun: "#ffb15a",
    sunAt: [-2.8, 1.2, -6.2],
    sunScale: 1.05,
    halo: 0.3,
    key: 1.55,
    keyColor: "#ffc089",
    fill: 0.42,
    front: 9,
    lantern: 9,
  },
  {
    sky: "#070910",
    fog: "#10131c",
    ground: "#14161c",
    ambient: 0.28,
    sun: "#d5e4f7",
    sunAt: [2.3, 4.3, -7.2],
    sunScale: 0.5,
    halo: 0.1,
    key: 1.2,
    keyColor: "#c5d4ea",
    fill: 0.22,
    front: 11,
    lantern: 16,
  },
];

function mixSky(a: Sky, b: Sky, t: number): Sky {
  const n = (x: number, y: number) => x + (y - x) * t;
  return {
    sky: mixHex(a.sky, b.sky, t),
    fog: mixHex(a.fog, b.fog, t),
    ground: mixHex(a.ground, b.ground, t),
    ambient: n(a.ambient, b.ambient),
    sun: mixHex(a.sun, b.sun, t),
    sunAt: [n(a.sunAt[0], b.sunAt[0]), n(a.sunAt[1], b.sunAt[1]), n(a.sunAt[2], b.sunAt[2])],
    sunScale: n(a.sunScale, b.sunScale),
    halo: n(a.halo, b.halo),
    key: n(a.key, b.key),
    keyColor: mixHex(a.keyColor, b.keyColor, t),
    fill: n(a.fill, b.fill),
    front: n(a.front, b.front),
    lantern: n(a.lantern, b.lantern),
  };
}

function skyFor(index: number) {
  const t = Math.min(1, Math.max(0, index / Math.max(1, DUELS.length - 1))) * (SKY_STOPS.length - 1);
  const i = Math.min(SKY_STOPS.length - 2, Math.floor(t));
  const a = SKY_STOPS[i];
  const b = SKY_STOPS[i + 1];
  if (!a || !b) return SKY_STOPS[0];
  return mixSky(a, b, t - i);
}

export function DuelScene() {
  const mode = useGame((s) => s.mode);
  const phase = useGame((s) => s.phase);
  const duelIndex = useGame((s) => s.duelIndex);
  const accent = useGame((s) => DUELS[duelIndex]?.accent ?? "#6ea88a");
  const title = phase === "title" || phase === "codex";
  const sky = title ? SKY_STOPS[3] : mode === "practice" ? SKY_STOPS[1] : skyFor(duelIndex);
  const dummy = mode === "practice" && !title;
  return (
    <>
      <color attach="background" args={[sky.sky]} />
      <fog attach="fog" args={[sky.fog, 9, 24]} />
      <ambientLight intensity={sky.ambient} />
      <directionalLight position={[sky.sunAt[0], sky.sunAt[1] + 1.2, 4]} intensity={sky.key} color={sky.keyColor} />
      <directionalLight position={[-3.5, 5, -2]} intensity={sky.fill} color={sky.keyColor} />
      <pointLight position={[0, 1.7, 2.4]} intensity={sky.front} distance={9} decay={2} color={sky.keyColor} />
      <pointLight position={[0, 1.8, -1.4]} intensity={sky.front * 0.65} distance={7} decay={2} color={sky.sun} />
      <mesh position={sky.sunAt}>
        <sphereGeometry args={[sky.sunScale, 24, 24]} />
        <meshBasicMaterial color={sky.sun} />
      </mesh>
      <mesh position={[sky.sunAt[0], sky.sunAt[1], sky.sunAt[2] - 0.2]}>
        <sphereGeometry args={[sky.sunScale * 1.55, 24, 24]} />
        <meshBasicMaterial color={sky.sun} transparent opacity={sky.halo} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 1]}>
        <circleGeometry args={[16, 48]} />
        <meshStandardMaterial color={sky.ground} roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 0.3]}>
        <ringGeometry args={[1.55, 1.68, 48]} />
        <meshBasicMaterial color="#3c332b" />
      </mesh>
      <Gate />
      <Bamboo />
      <Petals />
      <Lantern position={[-1.7, 1.15, 1.2]} glow={sky.lantern} />
      <Lantern position={[1.85, 1.05, 0.4]} glow={sky.lantern} />
      {dummy ? <Dummy /> : <Swordsman accent={accent} />}
      <BladeArc />
      <Rig />
    </>
  );
}
