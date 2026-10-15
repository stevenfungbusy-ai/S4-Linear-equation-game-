import { i as __toESM } from "../_runtime.mjs";
import { a as BufferAttribute, c as Points, f as require_jsx_runtime, l as PointsMaterial, n as useFrame, o as BufferGeometry, p as require_react, r as useThree, s as Object3D, t as Canvas, u as Vector3 } from "../_libs/@react-three/fiber+[...].mjs";
import { a as DUELS, i as parseNum, n as useGame, r as getSlashT } from "./routes-BDUbnFci.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SceneCanvas-DdVh-GMP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Bamboo() {
	const ref = (0, import_react.useRef)(null);
	const mats = (0, import_react.useMemo)(() => {
		const dummy = new Object3D();
		const spots = [];
		for (const side of [-1, 1]) for (let k = 0; k < 26; k++) {
			const h = 3.2 + Math.random() * 3.4;
			dummy.position.set(side * (2.4 + Math.random() * 5.2), h / 2, -3 + Math.random() * 9);
			dummy.scale.set(.035 + Math.random() * .03, h, .035 + Math.random() * .03);
			dummy.rotation.set(0, Math.random() * Math.PI, (Math.random() - .5) * .06);
			dummy.updateMatrix();
			spots.push(dummy.matrix.clone());
		}
		return spots;
	}, []);
	(0, import_react.useLayoutEffect)(() => {
		const mesh = ref.current;
		if (!mesh) return;
		mats.forEach((m, i) => mesh.setMatrixAt(i, m));
		mesh.instanceMatrix.needsUpdate = true;
	}, [mats]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("instancedMesh", {
		ref,
		args: [
			void 0,
			void 0,
			mats.length
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
			1,
			1,
			1,
			5
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: "#243028",
			roughness: .9
		})]
	});
}
function Petals() {
	const group = (0, import_react.useRef)(null);
	(0, import_react.useLayoutEffect)(() => {
		const count = 64;
		const geo = new BufferGeometry();
		const pos = /* @__PURE__ */ new Float32Array(192);
		for (let i = 0; i < count; i++) {
			pos[i * 3] = (Math.random() - .5) * 8;
			pos[i * 3 + 1] = Math.random() * 4;
			pos[i * 3 + 2] = -1.5 + Math.random() * 7;
		}
		geo.setAttribute("position", new BufferAttribute(pos, 3));
		const mat = new PointsMaterial({
			color: "#e2b15c",
			size: .04,
			transparent: true,
			opacity: .75,
			depthWrite: false
		});
		const pts = new Points(geo, mat);
		group.current?.add(pts);
		return () => {
			group.current?.remove(pts);
			geo.dispose();
			mat.dispose();
		};
	}, []);
	useFrame((_, delta) => {
		const pts = group.current?.children[0];
		if (!pts) return;
		const dt = Math.min(delta, .1);
		const attr = pts.geometry.getAttribute("position");
		const arr = attr.array;
		for (let i = 0; i < attr.count; i++) {
			arr[i * 3 + 1] -= dt * .2;
			if (arr[i * 3 + 1] < 0) {
				arr[i * 3 + 1] = 4;
				arr[i * 3] = (Math.random() - .5) * 8;
			}
		}
		attr.needsUpdate = true;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", { ref: group });
}
function Lantern({ position }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.55,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.012,
					.012,
					.7,
					6
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#2a241c" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.18,
				.26,
				.18
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#e2b15c",
				emissive: "#c4523a",
				emissiveIntensity: .85,
				roughness: .45
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
				color: "#e2b15c",
				intensity: 6,
				distance: 7,
				decay: 2
			})
		]
	});
}
function Gate() {
	const wood = "#3a221c";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			0,
			0,
			-1.6
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-1.15,
					1.15,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.14,
					2.3,
					.14
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: wood,
					roughness: .8
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					1.15,
					1.15,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.14,
					2.3,
					.14
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: wood,
					roughness: .8
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					2.2,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					2.7,
					.16,
					.16
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#6e221c",
					roughness: .7
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					1.95,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					2.15,
					.1,
					.1
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: wood,
					roughness: .8
				})]
			})
		]
	});
}
function SwordMesh({ accent }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				.4,
				0,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.72,
				.028,
				.008
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#d5d8de",
				metalness: .82,
				roughness: .22
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				.4,
				.012,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.7,
				.006,
				.006
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: accent,
				emissive: accent,
				emissiveIntensity: .35,
				metalness: .4,
				roughness: .35
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				.8,
				0,
				0
			],
			rotation: [
				0,
				0,
				-Math.PI / 2
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
				.016,
				.1,
				4
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#e7e9ee",
				metalness: .8,
				roughness: .25
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				.02,
				0,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.025,
				.16,
				.028
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#e2b15c",
				metalness: .65,
				roughness: .35
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-.1,
				0,
				0
			],
			rotation: [
				0,
				0,
				Math.PI / 2
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.016,
				.018,
				.2,
				8
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#241c16",
				roughness: .85
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-.16,
				-.05,
				.02
			],
			rotation: [
				.5,
				0,
				.4
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.055,
				.07,
				.22,
				7
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#161310",
				roughness: 1
			})]
		})
	] });
}
function Arms() {
	const rig = (0, import_react.useRef)(null);
	const sword = (0, import_react.useRef)(null);
	const { camera } = useThree();
	const accent = useGame((s) => s.mode === "practice" ? "#c4a574" : DUELS[s.duelIndex]?.accent ?? "#e23b2b");
	useFrame(() => {
		const rigG = rig.current;
		const sw = sword.current;
		if (!rigG || !sw) return;
		rigG.position.copy(camera.position);
		rigG.quaternion.copy(camera.quaternion);
		const s = useGame.getState();
		const phase = s.phase;
		const u = phase === "slash" || phase === "exchange" ? getSlashT() : 0;
		const m = parseNum(s.mText) ?? s.pending?.m ?? 0;
		const ang = Math.atan(Number.isFinite(m) ? m : 0);
		if (phase === "slash" || phase === "exchange" && u > .15) {
			const k = phase === "exchange" ? 1 : u;
			sw.rotation.set(.08, .12, ang);
			sw.position.set(.18 - k * .28, .14, -.52 - Math.sin(k * Math.PI) * .08);
			sw.scale.setScalar(1.55);
		} else {
			const bob = Math.sin(performance.now() / 700) * .01;
			sw.rotation.set(.2, .15, -.35);
			sw.position.set(.3, .12 + bob, -.52);
			sw.scale.setScalar(1.55);
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		ref: rig,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
			ref: sword,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwordMesh, { accent })
		})
	});
}
function Rig() {
	const { camera } = useThree();
	const look = (0, import_react.useRef)(new Vector3(0, 1.05, 0));
	const mouse = (0, import_react.useRef)({
		x: 0,
		y: 0
	});
	const reduce = (0, import_react.useRef)(false);
	(0, import_react.useLayoutEffect)(() => {
		reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const onMove = (e) => {
			mouse.current.x = e.clientX / window.innerWidth * 2 - 1;
			mouse.current.y = e.clientY / window.innerHeight * 2 - 1;
		};
		window.addEventListener("pointermove", onMove);
		return () => window.removeEventListener("pointermove", onMove);
	}, []);
	useFrame((_, delta) => {
		const dt = Math.min(delta, .1);
		const t = performance.now() / 1e3;
		const s = useGame.getState();
		const u = s.phase === "slash" ? getSlashT() : 0;
		const shake = reduce.current ? 0 : Math.sin(u * Math.PI) * .045;
		const sway = reduce.current ? 0 : Math.sin(t * .8) * .03;
		const bob = reduce.current ? 0 : Math.sin(t * 1.3) * .012;
		const px = reduce.current ? 0 : mouse.current.x * .18;
		const py = reduce.current ? 0 : -mouse.current.y * .08;
		const title = s.phase === "title" || s.phase === "codex";
		camera.position.set(sway + shake * .2, (title ? 1.55 : 1.4) + bob, title ? 3.7 : 5.1);
		const targetY = title ? 1.25 : .26;
		look.current.x += (px - look.current.x) * Math.min(1, dt * 3);
		look.current.y += (targetY + py + shake - look.current.y) * Math.min(1, dt * 3);
		look.current.z = 0;
		camera.lookAt(look.current);
	});
	return null;
}
function DuelScene() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("color", {
			attach: "background",
			args: ["#100e0c"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("fog", {
			attach: "fog",
			args: [
				"#100e0c",
				9,
				24
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", { intensity: .55 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: [
				1.5,
				4.5,
				5
			],
			intensity: 1.8,
			color: "#f3e6d0"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: [
				-3.5,
				5,
				-2
			],
			intensity: 1.6,
			color: "#b7c7d6"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			position: [
				0,
				1.7,
				2.4
			],
			intensity: 8,
			distance: 9,
			decay: 2,
			color: "#f3e6d0"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				2.6,
				4.4,
				-6.2
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				.95,
				24,
				24
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#f4ead8" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				2.6,
				4.4,
				-6.4
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				1.45,
				24,
				24
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				color: "#f4ead8",
				transparent: true,
				opacity: .16
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				0,
				0,
				1
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [16, 48] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#2a241e",
				roughness: 1
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				0,
				.012,
				.3
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ringGeometry", { args: [
				1.55,
				1.68,
				48
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#3c332b" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gate, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bamboo, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Petals, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lantern, { position: [
			-1.7,
			1.15,
			1.2
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lantern, { position: [
			1.85,
			1.05,
			.4
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arms, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rig, {})
	] });
}
function SceneCanvas() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canvas, {
		dpr: [1, 1.5],
		camera: {
			position: [
				0,
				1.55,
				3.7
			],
			fov: 46,
			near: .1,
			far: 42
		},
		gl: {
			antialias: true,
			alpha: false,
			powerPreference: "high-performance"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DuelScene, {})
	});
}
//#endregion
export { SceneCanvas as default };
