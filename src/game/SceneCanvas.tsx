import { Canvas } from "@react-three/fiber";
import { DuelScene } from "./Scene";

export default function SceneCanvas() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 1.55, 3.7], fov: 46, near: 0.1, far: 42 }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
    >
      <DuelScene />
    </Canvas>
  );
}
