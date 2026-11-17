import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';
import { useLanguage } from '../context/LanguageContext';

interface Spatial3DShowcaseProps {
  onContactClick?: (service?: string) => void;
}

const ARCHIVE_ITEMS = [
  {
    name: 'Ripple Bench',
    info: ['US / EU', 'Design Concept', 'Bench', 'Outdoor'],
  },
  {
    name: 'Arc Table',
    info: ['US / EU', 'Design Concept', 'Table', 'Modern'],
  },
  {
    name: 'Orb Vase',
    info: ['US / EU', 'Limited Edition', 'Decor', 'Contemporary'],
  },
  {
    name: 'Grid Shelving',
    info: ['US / EU', 'Project Details', 'Shelving', 'Industrial'],
  },
  {
    name: 'Halo Pendant',
    info: ['US / EU', 'Project Details', 'Lighting', 'Modern'],
  },
  {
    name: 'Flow Chair',
    info: ['US / EU', 'Design Concept', 'Armchair', 'Minimalist'],
    highlight: true,
  },
];

export const Spatial3DShowcaseSection: React.FC<Spatial3DShowcaseProps> = ({
  onContactClick,
}) => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasMountRef = useRef<HTMLDivElement>(null);

  // Scroll phase tracking (0: Intro, 1: Archive, 2: Outro)
  const [scrollProgress, setScrollProgress] = useState(0);
  const [, setModelLoaded] = useState(false);

  // Three.js internal references
  const pivotGroupRef = useRef<THREE.Group | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const maxDimRef = useRef<number>(1);

  useEffect(() => {
    const mount = canvasMountRef.current;
    const section = sectionRef.current;
    if (!mount || !section) return;

    let animId: number;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // 1. Scene & Camera Setup (Matching original script.js exactly)
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    cameraRef.current = camera;

    // Root pivot group to ensure tumbling happens cleanly around the model's true center of mass
    const pivotGroup = new THREE.Group();
    pivotGroupRef.current = pivotGroup;
    scene.add(pivotGroup);

    // 2. High-Performance WebGL Renderer (ACES Filmic Tone Mapping Exposure 2.4)
    const getPixelRatio = () =>
      window.innerWidth < 768
        ? Math.min(window.devicePixelRatio || 1, 1.5)
        : Math.min(window.devicePixelRatio || 1, 2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(width, height);
    renderer.setPixelRatio(getPixelRatio());
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 2.4;

    mount.innerHTML = '';
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 3. Cinematic Lighting (Matching original script.js)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 7.5);
    mainLight.position.set(0.5, 7.5, 2.5);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 2.5);
    fillLight.position.set(-15, 0, -5);
    scene.add(fillLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1.5);
    hemiLight.position.set(0, 0, 0);
    scene.add(hemiLight);

    // Cyan Rim Light for Subtle Contrast
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 2.5);
    rimLight.position.set(6, -2, -4);
    scene.add(rimLight);

    // 4. Load GLB Model (/models/chair.glb)
    const loader = new GLTFLoader();
    loader.load(
      '/models/chair.glb',
      (gltf) => {
        const model = gltf.scene;

        // Traverse mesh and calibrate PBR metallic finish (step 9796 original)
        model.traverse((node) => {
          if ((node as THREE.Mesh).isMesh) {
            const mesh = node as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            if (mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              mat.metalness = 0.85;
              mat.roughness = 0.22;
              mat.color.setHex(0x18181b);
              mat.needsUpdate = true;
            }
          }
        });

        // Center model inside pivotGroup so all rotations occur around the geometric centroid
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        maxDimRef.current = maxDim;

        model.position.set(-center.x, -center.y, -center.z);
        pivotGroup.add(model);

        // Normalize scale and camera distance (calibrated for mobile portrait window vs desktop)
        const isMobileInit = window.innerWidth < 768;
        camera.position.z = maxDim * (isMobileInit ? 2.5 : 1.7);

        pivotGroup.scale.set(0, 0, 0);
        pivotGroup.rotation.set(0, 0.5, 0);
        setModelLoaded(true);

        // Entrance scale animation
        gsap.to(pivotGroup.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 1.2,
          ease: 'power2.out',
        });
      },
      undefined,
      (err) => {
        console.error('Failed to load /models/chair.glb:', err);
      }
    );

    // 5. Scroll Interaction: Synchronize model 3D rotation with scroll through the section
    const floatAmplitude = 0.18;
    const floatSpeed = 1.5;
    let targetScrollProgress = 0;
    let smoothScrollProgress = 0;
    let lastReportedProgress = -1;

    const computeProgress = () => {
      if (!section) return 0;
      const rect = section.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return 0;
      return Math.max(0, Math.min(1, -rect.top / totalScrollable));
    };

    // 6. Responsive Resize Handler
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      const isMob = w < 768;
      const maxDim = maxDimRef.current;
      camera.position.z = maxDim * (isMob ? 2.5 : 1.7);
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(getPixelRatio());
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // 7. Continuous 60 FPS Render Loop with Sinusoidal Levitation + Exact Original Scroll Tumbling
    const animate = () => {
      targetScrollProgress = computeProgress();
      smoothScrollProgress += (targetScrollProgress - smoothScrollProgress) * 0.18;

      if (Math.abs(smoothScrollProgress - lastReportedProgress) > 0.003) {
        lastReportedProgress = smoothScrollProgress;
        setScrollProgress(smoothScrollProgress);
      }

      if (pivotGroupRef.current) {
        const pivot = pivotGroupRef.current;
        // Sinusoidal vertical floating
        const floatOffset = Math.sin(Date.now() * 0.001 * floatSpeed) * floatAmplitude;
        pivot.position.y = floatOffset;

        // Scroll progress drives 3D tumbling rotation around centroid (exact original formula)
        const baseTilt = 0.45;
        pivot.rotation.x = smoothScrollProgress * Math.PI * 4 + baseTilt;
        pivot.rotation.y = smoothScrollProgress * Math.PI * 2.2 + 0.35;
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      mount.innerHTML = '';
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="spatial-3d"
      className="relative w-full bg-[#000000] text-white select-none"
      style={{ height: '350vh' }}
    >
      {/* Sticky Viewport Container: Pinned 100vh / 100dvh window while user scrolls through 350vh */}
      <div className="sticky top-0 h-[100dvh] min-h-screen w-full overflow-hidden flex flex-col justify-between">
        
        {/* Fullscreen 3D Model Mount (Fixed in Center, exact replica of video) */}
        <div
          ref={canvasMountRef}
          className="absolute inset-0 z-10 pointer-events-none w-full h-full"
        />

        {/* Ambient Vignette & Space Lighting */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden [clip-path:inset(0)]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[700px] h-[500px] bg-[#38BDF8]/05 rounded-full blur-[160px]" />
        </div>

        {/* =========================================================================
            STAGE 1: INTRO (Active from 0% to 32% scroll) - Monumental Typography
           ========================================================================= */}
        <div
          className="absolute inset-0 z-20 flex flex-col justify-between sm:justify-center px-6 sm:px-12 md:px-20 pt-24 pb-12 sm:pt-0 sm:pb-0 transition-all duration-700 pointer-events-none"
          style={{
            opacity: scrollProgress < 0.32 ? 1 - scrollProgress * 2.8 : 0,
            transform: `translateY(${-scrollProgress * 140}px)`,
            display: scrollProgress > 0.38 ? 'none' : 'flex',
          }}
        >
          {/* Top Block: Mobile gets SPACES FOR + FUTURE; Desktop gets 3-line layout */}
          <div className="flex flex-col gap-0 select-none">
            <h1 className="text-[13vw] sm:text-[13vw] md:text-[11vw] font-normal uppercase leading-[0.85] tracking-tighter text-white font-['Anton',sans-serif]">
              SPACES FOR
            </h1>

            {/* Desktop Row: FUTURE on left, Paragraph on right */}
            <div className="hidden sm:flex sm:flex-row sm:items-center justify-between gap-2 sm:gap-6 my-1 sm:my-2">
              <h1 className="text-[13vw] sm:text-[13vw] md:text-[11vw] font-normal uppercase leading-[0.85] tracking-tighter text-white font-['Anton',sans-serif]">
                FUTURE
              </h1>
              <p className="max-w-xs text-[11px] sm:text-sm uppercase tracking-wider text-zinc-400 font-mono leading-relaxed pr-0 sm:pr-6">
                {t('spatial.stage1_p')}
              </p>
            </div>

            {/* Mobile-Only Top Second Line: FUTURE */}
            <h1 className="text-[13vw] font-normal uppercase leading-[0.85] tracking-tighter text-white font-['Anton',sans-serif] sm:hidden mt-1">
              FUTURE
            </h1>

            {/* Desktop-Only Third Line: LIVING HERE */}
            <h1 className="hidden sm:block text-[13vw] sm:text-[13vw] md:text-[11vw] font-normal uppercase leading-[0.85] tracking-tighter text-white font-['Anton',sans-serif]">
              LIVING HERE
            </h1>
          </div>

          {/* Mobile-Only Bottom Anchor: Paragraph + LIVING HERE */}
          <div className="flex sm:hidden flex-col gap-2 select-none">
            <p className="max-w-xs text-[11px] uppercase tracking-wider text-zinc-400 font-mono leading-relaxed">
              {t('spatial.stage1_p')}
            </p>
            <h1 className="text-[13vw] font-normal uppercase leading-[0.85] tracking-tighter text-white font-['Anton',sans-serif]">
              LIVING HERE
            </h1>
          </div>
        </div>

        {/* =========================================================================
            STAGE 2: ARCHIVE / COLLECTION (Active from 33% to 70% scroll)
           ========================================================================= */}
        <div
          className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-6 pt-16 sm:pt-0 transition-all duration-700 pointer-events-none"
          style={{
            opacity:
              scrollProgress >= 0.32 && scrollProgress <= 0.72
                ? Math.min(1, (scrollProgress - 0.32) * 5) * Math.min(1, (0.72 - scrollProgress) * 5)
                : 0,
            transform: `translateY(${(0.5 - scrollProgress) * 200}px)`,
            display: scrollProgress < 0.28 || scrollProgress > 0.76 ? 'none' : 'flex',
          }}
        >
          <div className="mb-4 sm:mb-6 select-none">
            <span className="text-[10px] sm:text-sm font-mono uppercase tracking-[0.3em] text-[#38BDF8]">
              {t('spatial.stage2_badge')}
            </span>
          </div>

          {/* Dynamic Cycling Archive List - Mobile Responsive Hierarchy */}
          <div className="flex flex-col gap-2 sm:gap-7 w-full max-w-4xl select-none">
            {ARCHIVE_ITEMS.map((item, idx) => {
              const isCurrent =
                idx ===
                Math.min(
                  ARCHIVE_ITEMS.length - 1,
                  Math.floor(((scrollProgress - 0.32) / 0.4) * ARCHIVE_ITEMS.length)
                );

              return (
                <div key={item.name} className="flex flex-col items-center">
                  <h2
                    className={`text-lg sm:text-5xl md:text-7xl font-light tracking-tight whitespace-nowrap transition-all duration-300 ${
                      isCurrent
                        ? 'text-white scale-105 drop-shadow-[0_0_30px_rgba(255,255,255,0.7)]'
                        : 'text-zinc-600/70 scale-95'
                    }`}
                  >
                    {item.name}
                  </h2>
                  <div className="flex items-center justify-center gap-2 sm:gap-6 mt-0.5 sm:mt-1 text-[9px] sm:text-xs font-mono uppercase tracking-wider text-zinc-500">
                    {item.info.map((inf, iIdx) => (
                      <span key={iIdx} className={isCurrent ? 'text-zinc-200' : ''}>
                        {inf}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            STAGE 3: OUTRO STATEMENT (Active from 72% to 100% scroll)
           ========================================================================= */}
        <div
          className="absolute inset-0 z-20 flex flex-col justify-end px-6 sm:px-12 md:px-20 pb-16 sm:pb-24 transition-all duration-700 pointer-events-none"
          style={{
            opacity: scrollProgress > 0.72 ? Math.min(1, (scrollProgress - 0.72) * 4) : 0,
            transform: `translateY(${(1 - scrollProgress) * 90}px)`,
            display: scrollProgress < 0.68 ? 'none' : 'flex',
          }}
        >
          <div className="max-w-4xl select-none">
            <h2 className="text-xl sm:text-4xl md:text-5xl font-light uppercase tracking-tight text-white leading-tight font-['Anton',sans-serif]">
              {t('spatial.stage3_h2')}
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Spatial3DShowcaseSection;
