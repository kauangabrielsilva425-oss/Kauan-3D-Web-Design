import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

interface CubeKeyframe {
  top: number;
  left: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  z: number;
}

interface CubeData {
  initial: CubeKeyframe;
  final: CubeKeyframe;
}

const CUBES_CONFIG: Record<string, CubeData> = {
  'cube-1': {
    initial: { top: -55, left: 37.5, rotateX: 360, rotateY: -360, rotateZ: -48, z: -30000 },
    final: { top: 50, left: 15, rotateX: 0, rotateY: 3, rotateZ: 0, z: 0 },
  },
  'cube-2': {
    initial: { top: -35, left: 32.5, rotateX: -360, rotateY: 360, rotateZ: 90, z: -30000 },
    final: { top: 75, left: 25, rotateX: 1, rotateY: 2, rotateZ: 0, z: 0 },
  },
  'cube-3': {
    initial: { top: -65, left: 50, rotateX: -360, rotateY: -360, rotateZ: -180, z: -30000 },
    final: { top: 25, left: 25, rotateX: -1, rotateY: 2, rotateZ: 0, z: 0 },
  },
  'cube-4': {
    initial: { top: -35, left: 50, rotateX: -360, rotateY: -360, rotateZ: -180, z: -30000 },
    final: { top: 75, left: 75, rotateX: 1, rotateY: -2, rotateZ: 0, z: 0 },
  },
  'cube-5': {
    initial: { top: -55, left: 62.5, rotateX: 360, rotateY: 360, rotateZ: -135, z: -30000 },
    final: { top: 25, left: 75, rotateX: -1, rotateY: -2, rotateZ: 0, z: 0 },
  },
  'cube-6': {
    initial: { top: -35, left: 67.5, rotateX: -180, rotateY: -360, rotateZ: -180, z: -30000 },
    final: { top: 50, left: 85, rotateX: 0, rotateY: -3, rotateZ: 0, z: 0 },
  },
};

// Calibrated perimeter positions for mobile portrait screens (opens up clean central reading space)
const CUBES_CONFIG_MOBILE: Record<string, CubeData> = {
  'cube-1': {
    initial: { top: -55, left: 37.5, rotateX: 360, rotateY: -360, rotateZ: -48, z: -30000 },
    final: { top: 50, left: 11, rotateX: 0, rotateY: 3, rotateZ: 0, z: 0 },
  },
  'cube-2': {
    initial: { top: -35, left: 32.5, rotateX: -360, rotateY: 360, rotateZ: 90, z: -30000 },
    final: { top: 82, left: 14, rotateX: 1, rotateY: 2, rotateZ: 0, z: 0 },
  },
  'cube-3': {
    initial: { top: -65, left: 50, rotateX: -360, rotateY: -360, rotateZ: -180, z: -30000 },
    final: { top: 18, left: 14, rotateX: -1, rotateY: 2, rotateZ: 0, z: 0 },
  },
  'cube-4': {
    initial: { top: -35, left: 50, rotateX: -360, rotateY: -360, rotateZ: -180, z: -30000 },
    final: { top: 82, left: 86, rotateX: 1, rotateY: -2, rotateZ: 0, z: 0 },
  },
  'cube-5': {
    initial: { top: -55, left: 62.5, rotateX: 360, rotateY: 360, rotateZ: -135, z: -30000 },
    final: { top: 18, left: 86, rotateX: -1, rotateY: -2, rotateZ: 0, z: 0 },
  },
  'cube-6': {
    initial: { top: -35, left: 67.5, rotateX: -180, rotateY: -360, rotateZ: -180, z: -30000 },
    final: { top: 50, left: 89, rotateX: 0, rotateY: -3, rotateZ: 0, z: 0 },
  },
};

const interpolate = (start: number, end: number, progress: number) => {
  return start + (end - start) * progress;
};

// Balanced 18-image distribution: exactly 3 real portfolio projects and 3 conceptual 3D renders per cube.
// Every image 1..18 appears exactly 2 times across the 36 faces (6 cubes x 6 faces).
const CUBE_FACE_IMAGE_MAPPING: number[][] = [
  [1, 10, 4, 13, 7, 16], // Cube 1
  [2, 11, 5, 14, 8, 17], // Cube 2
  [3, 12, 6, 15, 9, 18], // Cube 3
  [16, 7, 13, 4, 10, 1], // Cube 4
  [17, 8, 14, 5, 11, 2], // Cube 5
  [18, 9, 15, 6, 12, 3], // Cube 6
];

export const OrchestraCubesSection: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const cubesContainerRef = useRef<HTMLDivElement>(null);
  const header1Ref = useRef<HTMLDivElement>(null);
  const header2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stickySection = stickyRef.current;
    if (!stickySection) return;

    // Pin scroll length: 2.6x viewport height for a snappy, rich 3D scroll
    const stickyHeight = window.innerHeight * 2.6;

    const cubeElements: HTMLElement[] = [];
    for (let i = 1; i <= 6; i++) {
      const el = stickySection.querySelector(`.orchestra-cube-${i}`) as HTMLElement;
      if (el) cubeElements.push(el);
    }

    const trigger = ScrollTrigger.create({
      trigger: stickySection,
      start: 'top top',
      end: `+=${stickyHeight}px`,
      scrub: 1.2,
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        // Cubes container fade-in
        const cubesOpacityProgress =
          self.progress >= 0.01 ? Math.min((self.progress - 0.01) * 100, 1) : 0;
        if (cubesContainerRef.current) {
          cubesContainerRef.current.style.opacity = `${cubesOpacityProgress}`;
        }

        // Header 1: Scales up, blurs, and fades out (filter blur disabled on mobile to prevent WebKit jank)
        const isMobile = window.innerWidth < 768;
        const header1Progress = Math.min(self.progress * 2.4, 1);
        if (header1Ref.current) {
          const scale = interpolate(1, 1.4, header1Progress);
          const blur = isMobile ? 0 : interpolate(0, 18, header1Progress);
          const opacity = 1 - header1Progress;
          header1Ref.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
          if (!isMobile) header1Ref.current.style.filter = `blur(${blur}px)`;
          header1Ref.current.style.opacity = `${opacity}`;
        }

        // Header 2: Fades in from blur at middle of sequence
        const header2StartProgress = (self.progress - 0.38) * 6;
        const header2Progress = Math.max(0, Math.min(header2StartProgress, 1));
        if (header2Ref.current) {
          const scale = interpolate(0.8, 1, header2Progress);
          const blur = isMobile ? 0 : interpolate(14, 0, header2Progress);
          header2Ref.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
          if (!isMobile) header2Ref.current.style.filter = `blur(${blur}px)`;
          header2Ref.current.style.opacity = `${header2Progress}`;
        }

        // Phase 1 (Fly-in from deep space z: -30000px) & Phase 2 (Rotation)
        const firstPhaseProgress = Math.min(self.progress * 1.9, 1);
        const secondPhaseProgress =
          self.progress >= 0.5 ? Math.min((self.progress - 0.5) * 2.2, 1) : 0;

        const isMob = window.innerWidth < 768;
        const activeConfig = isMob ? CUBES_CONFIG_MOBILE : CUBES_CONFIG;

        cubeElements.forEach((cube, index) => {
          const cubeClass = `cube-${index + 1}`;
          const data = activeConfig[cubeClass];
          if (!data) return;
          const { initial, final } = data;

          const currentTop = interpolate(initial.top, final.top, firstPhaseProgress);
          const currentLeft = interpolate(initial.left, final.left, firstPhaseProgress);
          const currentRotateX = interpolate(initial.rotateX, final.rotateX, firstPhaseProgress);
          const currentRotateY = interpolate(initial.rotateY, final.rotateY, firstPhaseProgress);
          const currentRotateZ = interpolate(initial.rotateZ, final.rotateZ, firstPhaseProgress);
          const currentZ = interpolate(initial.z, final.z, firstPhaseProgress);

          let additionalRotation = 0;
          if (cubeClass === 'cube-2') {
            additionalRotation = interpolate(0, 180, secondPhaseProgress);
          } else if (cubeClass === 'cube-4') {
            additionalRotation = interpolate(0, -180, secondPhaseProgress);
          }

          cube.style.top = `${currentTop}%`;
          cube.style.left = `${currentLeft}%`;
          cube.style.transform = `
            translate3d(-50%, -50%, ${currentZ}px)
            rotateX(${currentRotateX}deg)
            rotateY(${currentRotateY + additionalRotation}deg)
            rotateZ(${currentRotateZ}deg)
          `;
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section id="cubes" ref={sectionRef} className="relative w-full overflow-hidden bg-[#000000] text-[#F8FAFC]">
      <style>{`
        .orchestra-cubes-space {
          position: absolute;
          inset: 0;
          -webkit-transform-style: preserve-3d;
          transform-style: preserve-3d;
          perspective: 10000px;
          pointer-events: none;
        }

        .orchestra-cube {
          --cube-radius: 10px;
          --cube-half: 36px;
          position: absolute;
          width: 72px;
          height: 72px;
          -webkit-transform-style: preserve-3d;
          transform-style: preserve-3d;
          will-change: transform;
        }

        @media (min-width: 768px) {
          .orchestra-cube {
            --cube-radius: 18px;
            --cube-half: 80px;
            width: 160px;
            height: 160px;
          }
        }

        .orchestra-cube > div {
          position: absolute;
          inset: 0;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          -webkit-transform-style: flat;
          transform-style: flat;
          overflow: hidden;
          background: #09090b;
        }

        .face-front,
        .face-back {
          border-radius: var(--cube-radius);
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.95), inset 0 0 12px rgba(255, 255, 255, 0.08);
        }

        @media (min-width: 768px) {
          .face-front,
          .face-back {
            box-shadow: 0 20px 45px rgba(0, 0, 0, 0.95), inset 0 0 20px rgba(255, 255, 255, 0.08);
          }
        }

        .face-top,
        .face-bottom {
          left: var(--cube-radius);
          width: calc(100% - (var(--cube-radius) * 2));
          border-radius: 3px;
          border: 1px solid rgba(255, 255, 255, 0.04);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.85);
        }

        .face-left,
        .face-right {
          top: var(--cube-radius);
          height: calc(100% - (var(--cube-radius) * 2));
          border-radius: 3px;
          border: 1px solid rgba(255, 255, 255, 0.04);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.85);
        }

        .orchestra-cube img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }

        .face-front  { -webkit-transform: translateZ(var(--cube-half)); transform: translateZ(var(--cube-half)); }
        .face-back   { -webkit-transform: translateZ(calc(-1 * var(--cube-half))) rotateY(180deg); transform: translateZ(calc(-1 * var(--cube-half))) rotateY(180deg); }
        .face-right  { -webkit-transform: translateX(var(--cube-half)) rotateY(90deg); transform: translateX(var(--cube-half)) rotateY(90deg); }
        .face-left   { -webkit-transform: translateX(calc(-1 * var(--cube-half))) rotateY(-90deg); transform: translateX(calc(-1 * var(--cube-half))) rotateY(-90deg); }
        .face-top    { -webkit-transform: translateY(calc(-1 * var(--cube-half))) rotateX(90deg); transform: translateY(calc(-1 * var(--cube-half))) rotateX(90deg); }
        .face-bottom { -webkit-transform: translateY(var(--cube-half)) rotateX(-90deg); transform: translateY(var(--cube-half)) rotateX(-90deg); }
      `}</style>

      {/* Sticky Scroll Container */}
      <div
        ref={stickyRef}
        className="relative w-full h-[100dvh] min-h-screen overflow-hidden bg-[#000000] flex items-center justify-center select-none"
      >
        {/* Subtle Ambient Space Backlights (Optimized Hardware Radial Gradients) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden [clip-path:inset(0)]">
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-full max-w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.015)_0%,transparent_70%)]" />
          <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-full max-w-[650px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.015)_0%,transparent_70%)]" />
        </div>

        {/* 6 3D Spatial Cubes with 36 Real Visual Faces */}
        <div ref={cubesContainerRef} className="orchestra-cubes-space opacity-0">
          {[1, 2, 3, 4, 5, 6].map((cubeNum) => {
            const cubeIdx = cubeNum - 1;
            const cubeMapping = CUBE_FACE_IMAGE_MAPPING[cubeIdx] || [1, 2, 3, 4, 5, 6];
            const faces = [
              { class: 'face-front', imgNum: cubeMapping[0] },
              { class: 'face-back', imgNum: cubeMapping[1] },
              { class: 'face-right', imgNum: cubeMapping[2] },
              { class: 'face-left', imgNum: cubeMapping[3] },
              { class: 'face-top', imgNum: cubeMapping[4] },
              { class: 'face-bottom', imgNum: cubeMapping[5] },
            ];

            return (
              <div
                key={cubeNum}
                className={`orchestra-cube orchestra-cube-${cubeNum}`}
              >
                {faces.map((f, fIdx) => (
                  <div key={fIdx} className={f.class}>
                    <img
                      src={`/cubes/img${f.imgNum}.webp`}
                      alt={`3D cube ${cubeNum} face`}
                      loading="eager"
                      decoding="async"
                      width="180"
                      height="180"
                    />
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Phase 1 Center Statement */}
        <div
          ref={header1Ref}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[75%] md:w-[60%] text-center pointer-events-none z-10"
        >
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-400 block mb-4">
            {t('manifesto.badge')}
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.08] drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
            {t('manifesto.h1')}
          </h2>
        </div>

        {/* Phase 2 Center Statement: Where Innovation Meets Precision */}
        <div
          ref={header2Ref}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[88%] sm:w-[65%] md:w-[48%] text-center pointer-events-none z-10 opacity-0 px-4 py-5 sm:p-0 rounded-2xl bg-black/60 sm:bg-transparent backdrop-blur-[2px] sm:backdrop-blur-none border border-white/[0.08] sm:border-0 shadow-2xl sm:shadow-none"
        >
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-[#38BDF8] block mb-2 sm:mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            {t('manifesto.h2_badge') || 'KAUAN GABRIEL // APPROACH'}
          </span>
          <h3 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mb-2 sm:mb-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            {t('manifesto.h2_title')}
          </h3>
          <p className="text-xs sm:text-base md:text-lg text-zinc-300 font-light leading-relaxed max-w-xl mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
            {t('manifesto.h2_desc')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default OrchestraCubesSection;
