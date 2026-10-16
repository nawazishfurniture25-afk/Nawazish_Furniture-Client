import { useRef, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { buildSofa, disposeSofa } from '../../lib/sofaBuilder';

export default function Sofa3D() {
    const canvasRef = useRef(null);
    const { isDark } = useTheme();
    const sceneRef = useRef(null);

    useEffect(() => {
        let mounted = true;
        let rafId = null;

        // Load Three.js dynamically
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
            renderer.toneMappingExposure = 1.2;

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
            camera.position.set(6.5, 3.4, 7.5);
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

            // Floor shadow
            const floor = new THREE.Mesh(
                new THREE.PlaneGeometry(8, 8),
                new THREE.ShadowMaterial({ opacity: 0.45 })
            );
            floor.rotation.x = -Math.PI / 2;
            floor.position.y = 0.001;
            floor.receiveShadow = true;
            scene.add(floor);

            // Build sofa
            let sofa = buildSofa(THREE, isDark);
            const wide = () => window.innerWidth > 1080;
            sofa.position.x = wide() ? 1.8 : 0;
            floor.position.x = sofa.position.x;
            scene.add(sofa);

            sceneRef.current = { scene, sofa, floor, THREE, wide };

            // Animation loop
            let t = 0;
            let last = 0;
            let frameSkip = 0;

            const loop = (ts) => {
                if (!mounted) return;
                rafId = requestAnimationFrame(loop);

                frameSkip++;
                if (IS_MOBILE && frameSkip % 2 !== 0) return;

                const dt = Math.min((ts - last) / 1000, 0.05);
                last = ts;
                t += dt;

                sofa.rotation.y += dt * 0.1;
                sofa.position.y = Math.sin(t * 0.8) * 0.06;

                renderer.render(scene, camera);
            };

            const resize = () => {
                const w = canvas.clientWidth || stage.clientWidth;
                const h = canvas.clientHeight || stage.clientHeight;
                if (!w || !h) return;
                renderer.setSize(w, h, false);
                camera.aspect = w / h;
                camera.updateProjectionMatrix();
                sofa.position.x = wide() ? 1.8 : 0;
                floor.position.x = sofa.position.x;
                renderer.render(scene, camera);
            };

            // Initial resize
            resize();
            setTimeout(resize, 100);
            setTimeout(resize, 400);
            setTimeout(resize, 900);

            window.addEventListener('resize', resize);

            last = performance.now();
            rafId = requestAnimationFrame(loop);

            // Cleanup reference
            sceneRef.current.cleanup = () => {
                window.removeEventListener('resize', resize);
                cancelAnimationFrame(rafId);
                disposeSofa(sofa);
                renderer.dispose();
            };
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

    return (
        <div className="absolute inset-0 w-full h-full">
            <canvas
                ref={canvasRef}
                className="w-full h-full block touch-pan-y"
                aria-label="Rotating 3D brown velvet sofa"
            />
        </div>
    );
}