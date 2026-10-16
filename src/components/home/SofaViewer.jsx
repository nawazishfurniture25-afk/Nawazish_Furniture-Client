import { useRef, useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { buildSofa, disposeSofa } from '../../lib/sofaBuilder';

export default function SofaViewer() {
    const canvasRef = useRef(null);
    const sceneRef = useRef(null);
    const { isDark } = useTheme();
    const [activeView, setActiveView] = useState('R');

    useEffect(() => {
        let mounted = true;
        let rafId = null;

        const loadThree = () => {
            if (window.THREE) {
                initScene(window.THREE);
                return;
            }
            const script = document.createElement('script');
            script.src =
                'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
            script.async = true;
            script.onload = () => {
                if (mounted) initScene(window.THREE);
            };
            document.head.appendChild(script);
        };

        const initScene = (THREE) => {
            const canvas = canvasRef.current;
            if (!canvas || !mounted) return;

            const stage = canvas.parentElement;
            const IS_MOBILE = window.innerWidth < 768;
            const DPR = Math.min(window.devicePixelRatio || 1, IS_MOBILE ? 1.5 : 2);

            const renderer = new THREE.WebGLRenderer({
                canvas,
                antialias: !IS_MOBILE,
                alpha: true,
                powerPreference: 'high-performance',
            });
            renderer.setPixelRatio(DPR);
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = IS_MOBILE
                ? THREE.PCFShadowMap
                : THREE.PCFSoftShadowMap;
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1.28;

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
            camera.position.set(6, 3, 7);
            camera.lookAt(0, 1, 0);

            // Lights
            scene.add(new THREE.AmbientLight(0xfff1dc, 0.55));

            const key = new THREE.DirectionalLight(0xfff0d8, 1.1);
            key.position.set(5, 8, 5);
            key.castShadow = true;
            const shadowSize = IS_MOBILE ? 1024 : 2048;
            key.shadow.mapSize.set(shadowSize, shadowSize);
            Object.assign(key.shadow.camera, {
                left: -6,
                right: 6,
                top: 6,
                bottom: -6,
            });
            key.shadow.bias = -0.0005;
            scene.add(key);

            [
                [0xc8a464, 0.9, -6, 4, -4],
                [0xffd9a0, 0.5, -5, 2, 6],
                [0x8a5a30, 0.4, 0, -1, 4],
            ].forEach(([color, intensity, x, y, z]) => {
                const p = new THREE.PointLight(color, intensity, 30);
                p.position.set(x, y, z);
                scene.add(p);
            });

            // Floor
            const floor = new THREE.Mesh(
                new THREE.PlaneGeometry(8, 8),
                new THREE.ShadowMaterial({ opacity: 0.45 })
            );
            floor.rotation.x = -Math.PI / 2;
            floor.position.y = 0.001;
            floor.receiveShadow = true;
            scene.add(floor);

            // Sofa
            const sofa = buildSofa(THREE, isDark);
            scene.add(sofa);

            // ==================== INTERACTION STATE ====================
            const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

            let az = 0.71;
            let el = 0.2;
            let d = 9.2;
            let tAz = az;
            let tEl = el;
            let tD = d;

            let t = 0;
            let last = 0;
            let lastDrag = -9;
            let drag = false;
            let vis = true;
            let frameSkip = 0;

            // Pointer state
            const ptrs = new Map();
            let pd = 0;

            // ==================== EVENT HANDLERS ====================
            const onPointerDown = (e) => {
                try {
                    canvas.setPointerCapture(e.pointerId);
                } catch (x) { }
                ptrs.set(e.pointerId, [e.clientX, e.clientY]);
                drag = true;
                canvas.style.cursor = 'grabbing';
            };

            const onPointerMove = (e) => {
                const o = ptrs.get(e.pointerId);
                if (!o) return;

                if (ptrs.size === 1) {
                    tAz -= (e.clientX - o[0]) * 0.008;
                    tEl = clamp(tEl + (e.clientY - o[1]) * 0.006, 0.03, 1.45);
                }
                ptrs.set(e.pointerId, [e.clientX, e.clientY]);

                // Pinch zoom
                if (ptrs.size === 2) {
                    const p = [...ptrs.values()];
                    const dd = Math.hypot(p[0][0] - p[1][0], p[0][1] - p[1][1]);
                    if (pd) tD = clamp((tD * pd) / dd, 5, 15);
                    pd = dd;
                }
            };

            const onPointerUp = (e) => {
                ptrs.delete(e.pointerId);
                pd = 0;
                drag = ptrs.size > 0;
                lastDrag = t;
                canvas.style.cursor = 'grab';
            };

            const onWheel = (e) => {
                e.preventDefault();
                tD = clamp(tD + e.deltaY * 0.01, 5, 15);
                lastDrag = t;
            };

            canvas.addEventListener('pointerdown', onPointerDown);
            canvas.addEventListener('pointermove', onPointerMove);
            canvas.addEventListener('pointerup', onPointerUp);
            canvas.addEventListener('pointercancel', onPointerUp);
            canvas.addEventListener('wheel', onWheel, { passive: false });

            // ==================== VIEW BUTTONS ====================
            const views = {
                F: [0, 0.12, 9.2],
                S: [Math.PI / 2, 0.12, 9.2],
                T: [0, 1.35, 10],
                R: [0.71, 0.2, 9.2],
            };

            sceneRef.current = {
                setView: (viewKey) => {
                    const v = views[viewKey];
                    if (!v) return;
                    tAz = Math.round(az / (2 * Math.PI)) * 2 * Math.PI + v[0];
                    tEl = v[1];
                    tD = v[2];
                    lastDrag = t;
                },
                cleanup: () => {
                    canvas.removeEventListener('pointerdown', onPointerDown);
                    canvas.removeEventListener('pointermove', onPointerMove);
                    canvas.removeEventListener('pointerup', onPointerUp);
                    canvas.removeEventListener('pointercancel', onPointerUp);
                    canvas.removeEventListener('wheel', onWheel);
                    cancelAnimationFrame(rafId);
                    disposeSofa(sofa);
                    renderer.dispose();
                },
                resize: null,
            };

            // ==================== PLACE CAMERA ====================
            const place = () => {
                camera.position.set(
                    Math.sin(az) * Math.cos(el) * d,
                    1 + Math.sin(el) * d,
                    Math.cos(az) * Math.cos(el) * d
                );
                camera.lookAt(0, 1, 0);
            };

            // ==================== ANIMATION LOOP ====================
            const loop = (ts) => {
                rafId = requestAnimationFrame(loop);
                if (!vis || document.hidden) return;

                frameSkip++;
                if (IS_MOBILE && frameSkip % 2 !== 0) return;

                const dt = Math.min((ts - last) / 1000, 0.05);
                last = ts;
                t += dt;

                // Idle auto-rotate
                if (!drag && t - lastDrag > 3) {
                    tAz += dt * 0.2;
                }

                // Smooth lerp
                const k = 1 - Math.pow(0.001, dt);
                az += (tAz - az) * k;
                el += (tEl - el) * k;
                d += (tD - d) * k;

                place();
                renderer.render(scene, camera);
            };

            // ==================== RESIZE ====================
            const resize = () => {
                const w = canvas.clientWidth || stage.clientWidth;
                const h = canvas.clientHeight || stage.clientHeight;
                if (!w || !h) return;
                renderer.setSize(w, h, false);
                camera.aspect = w / h;
                camera.updateProjectionMatrix();
                renderer.render(scene, camera);
            };

            sceneRef.current.resize = resize;

            // Pause when off-screen
            const observer = new IntersectionObserver(
                (entries) => {
                    vis = entries[0].isIntersecting;
                },
                { threshold: 0.01 }
            );
            observer.observe(stage);

            document.addEventListener('visibilitychange', () => {
                if (!document.hidden) last = performance.now();
            });

            // Init
            resize();
            setTimeout(resize, 100);
            setTimeout(resize, 400);
            setTimeout(resize, 900);
            window.addEventListener('resize', resize);

            place();
            last = performance.now();
            rafId = requestAnimationFrame(loop);
        };

        loadThree();

        return () => {
            mounted = false;
            if (sceneRef.current?.cleanup) {
                sceneRef.current.cleanup();
            }
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [isDark]);

    const handleViewClick = (view) => {
        setActiveView(view);
        sceneRef.current?.setView?.(view);
    };

    return (
        <div
            className="relative w-full h-full"
            style={{ background: 'var(--bg2)' }}
        >
            <canvas
                ref={canvasRef}
                className="w-full h-full block touch-none cursor-grab"
                aria-label="Interactive 3D sofa. Drag to rotate, scroll to zoom."
            />

            {/* View buttons */}
            <div className="absolute top-4 right-4 flex gap-1.5 z-[2]">
                {['F', 'S', 'T', 'R'].map((view) => (
                    <button
                        key={view}
                        onClick={() => handleViewClick(view)}
                        aria-label={`${view} view`}
                        className="w-10 h-10 md:w-11 md:h-11 border text-xs tracking-wider transition-colors"
                        style={{
                            background:
                                activeView === view ? 'var(--gold)' : 'var(--card)',
                            borderColor:
                                activeView === view ? 'var(--gold)' : 'var(--line-strong)',
                            color: activeView === view ? '#fff' : 'var(--ink2)',
                        }}
                    >
                        {view}
                    </button>
                ))}
            </div>

            {/* Hint */}
            <p
                className="absolute bottom-4 left-0 right-0 text-center text-[10px] tracking-[0.28em] uppercase pointer-events-none"
                style={{ color: 'var(--muted)' }}
            >
                Drag to rotate · Scroll to zoom
            </p>
        </div>
    );
}