import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useLanguage } from '../context/LanguageContext';
import { FadeIn } from './FadeIn';
import { Layers, Box, Sparkles, Cpu, ArrowUpRight, Palette } from 'lucide-react';
import { MorphingText } from './ui/morphing-text';

interface CreativePlaygroundSectionProps {
  onContactClick?: (service?: string) => void;
}

const BOUNCE_CARDS = [
  { src: '/interactive-bounce/01.png', tag: '01 · 3D LIGHTING & MOOD' },
  { src: '/interactive-bounce/02.png', tag: '02 · INDUSTRIAL PRODUCT' },
  { src: '/interactive-bounce/03.png', tag: '03 · MONOCHROME PORTRAIT' },
  { src: '/interactive-bounce/04.png', tag: '04 · MINIMALIST STUDY' },
  { src: '/interactive-bounce/05.png', tag: '05 · TACTILE TEXTURE' },
  { src: '/interactive-bounce/06.png', tag: '06 · DARK MOOD PROFILE' },
  { src: '/interactive-bounce/07.png', tag: '07 · CHROME REFLECTION' },
  { src: '/interactive-bounce/08.png', tag: '08 · SCULPTURAL FORM' },
  { src: '/interactive-bounce/09.png', tag: '09 · GEOMETRIC HARMONY' },
  { src: '/interactive-bounce/10.png', tag: '10 · PBR SHADER RENDER' },
];

const MORPHING_WORDS = {
  PT: ['ANIMATION', '3D CREATOR', 'ART DIRECTION', 'CGI SHADERS', 'INTERACTION', 'KAUAN GABRIEL'],
  EN: ['ANIMATION', '3D CREATOR', 'ART DIRECTION', 'CGI SHADERS', 'INTERACTION', 'KAUAN GABRIEL'],
  ES: ['ANIMACIÓN', 'CREADOR 3D', 'DIRECCIÓN DE ARTE', 'CGI SHADERS', 'INTERACCIÓN', 'KAUAN GABRIEL'],
};

export const CreativePlaygroundSection: React.FC<CreativePlaygroundSectionProps> = ({
  onContactClick,
}) => {
  const { t, language } = useLanguage();
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const activeTimelinesRef = useRef<gsap.core.Timeline[]>([]);
  const triggerCascadeRef = useRef<() => void>(() => {});

  // Informational copy about Kauan's work
  const content = {
    PT: {
      badge: '// 05 · ARQUIVO VISUAL INTERATIVO // KINETIC LAB',
      titleP1: 'DIREÇÃO DE ARTE, 3D',
      titleP2: '& EXPERIMENTAÇÃO VISUAL',
      subtitle:
        'Cada projeto de alto impacto nasce de um laboratório contínuo de pesquisa estética: exploração de iluminação de cinema, shaders PBR, simulações físicas e protótipos interativos para posicionar marcas no topo.',
      canvasStatus: 'CANVAS INTERATIVO ATIVO',
      canvasHint: 'PASSE O CURSOR OU CLIQUE PARA SOLTAR PEÇAS',
      btnDrop: 'SOLTAR PEÇAS',
      statsCount: '10 ESTUDOS VISUAIS SELECIONADOS',
      pillars: [
        {
          icon: Box,
          num: '01',
          title: 'Modelagem 3D & CGI',
          desc: 'Geometrias autorais, iluminação cinemática realista, shaders táteis e renderização PBR para marcas de alto padrão.',
        },
        {
          icon: Palette,
          num: '02',
          title: 'Direção de Arte & Branding',
          desc: 'Identidades visuais com narrativa cinematográfica, tipografia calculada e estética dark-mode refinada.',
        },
        {
          icon: Cpu,
          num: '03',
          title: 'Engenharia WebGL & Interação',
          desc: 'Interatividade com física natural, Three.js nativo e microinterações fluidas a 60 FPS sem gargalos.',
        },
      ],
      ctaProjects: 'Explorar Projetos Completos',
      ctaContact: 'Solicitar Projeto Criativo',
    },
    EN: {
      badge: '// 05 · INTERACTIVE VISUAL ARCHIVE // KINETIC LAB',
      titleP1: 'ART DIRECTION, 3D',
      titleP2: '& VISUAL EXPERIMENTATION',
      subtitle:
        'Every high-impact project starts from an ongoing aesthetic research lab: cinematic lighting exploration, PBR shaders, physics simulations, and interactive prototypes built to position brands at the forefront.',
      canvasStatus: 'INTERACTIVE CANVAS ACTIVE',
      canvasHint: 'MOVE CURSOR OR CLICK TO RELEASE PIECES',
      btnDrop: 'RELEASE PIECES',
      statsCount: '10 SELECTED VISUAL STUDIES',
      pillars: [
        {
          icon: Box,
          num: '01',
          title: '3D Modeling & CGI',
          desc: 'Bespoke geometries, realistic cinematic lighting, tactile shaders, and PBR rendering for premium brands.',
        },
        {
          icon: Palette,
          num: '02',
          title: 'Art Direction & Branding',
          desc: 'Visual identities with cinematic narrative, precise typography, and refined dark-mode aesthetics.',
        },
        {
          icon: Cpu,
          num: '03',
          title: 'WebGL & Interaction Engineering',
          desc: 'Natural physics interactivity, native Three.js, and silky 60 FPS microinteractions with zero friction.',
        },
      ],
      ctaProjects: 'Explore Full Projects',
      ctaContact: 'Request Creative Project',
    },
    ES: {
      badge: '// 05 · ARCHIVO VISUAL INTERACTIVO // KINETIC LAB',
      titleP1: 'DIRECCIÓN DE ARTE, 3D',
      titleP2: '& EXPERIMENTACIÓN VISUAL',
      subtitle:
        'Cada proyecto de alto impacto nace de un laboratorio continuo de investigación estética: exploración de iluminación de cine, shaders PBR, simulaciones físicas y prototipos interactivos para posicionar marcas en la cima.',
      canvasStatus: 'CANVAS INTERACTIVO ACTIVO',
      canvasHint: 'MUEVA EL CURSOR O HAGA CLIC PARA SOLTAR PIEZAS',
      btnDrop: 'SOLTAR PIEZAS',
      statsCount: '10 PROJETOS VISUAIS SELECIONADOS',
      pillars: [
        {
          icon: Box,
          num: '01',
          title: 'Modelado 3D & CGI',
          desc: 'Geometrías exclusivas, iluminación de cine realista, shaders táctiles y renderizado PBR de alta gama.',
        },
        {
          icon: Palette,
          num: '02',
          title: 'Dirección de Arte & Branding',
          desc: 'Identidades visuales con narrativa cinematográfica, tipografía calculada y estética dark refinada.',
        },
        {
          icon: Cpu,
          num: '03',
          title: 'Ingeniería WebGL & Interacción',
          desc: 'Interactividad con física natural, Three.js nativo y microinteracciones fluidas a 60 FPS sin retrasos.',
        },
      ],
      ctaProjects: 'Explorar Proyectos Completos',
      ctaContact: 'Solicitar Proyecto Creativo',
    },
  }[language] || {
    badge: '// 05 · ARQUIVO VISUAL INTERATIVO // KINETIC LAB',
    titleP1: 'DIREÇÃO DE ARTE, 3D',
    titleP2: '& EXPERIMENTAÇÃO VISUAL',
    subtitle:
      'Cada projeto de alto impacto nasce de um laboratório contínuo de pesquisa estética: exploração de iluminação de cinema, shaders PBR, simulações físicas e protótipos interativos para posicionar marcas no topo.',
    canvasStatus: 'CANVAS INTERATIVO ATIVO',
    canvasHint: 'PASSE O CURSOR OU DESLIZE PARA LIBERAR PEÇAS DO ARQUIVO',
    statsCount: '10 ESTUDOS VISUAIS SELECIONADOS',
    pillars: [
      {
        icon: Box,
        num: '01',
        title: 'Modelagem 3D & CGI',
        desc: 'Geometrias autorais, iluminação cinemática realista, shaders táteis e renderização PBR para marcas de alto padrão.',
      },
      {
        icon: Palette,
        num: '02',
        title: 'Direção de Arte & Branding',
        desc: 'Identidades visuais com narrativa cinematográfica, tipografia calculada e estética dark-mode refinada.',
      },
      {
        icon: Cpu,
        num: '03',
        title: 'Engenharia WebGL & Interação',
        desc: 'Interatividade com física natural, Three.js nativo e microinterações fluidas a 60 FPS sem gargalos.',
      },
    ],
    ctaProjects: 'Explorar Projetos Completos',
    ctaContact: 'Solicitar Projeto Criativo',
  };

  useEffect(() => {
    // Preload images
    BOUNCE_CARDS.forEach((c) => {
      const img = new Image();
      img.src = c.src;
    });

    const cleanupFns: (() => void)[] = [];
    let isCancelled = false;

    const init = () => {
      if (isCancelled) return;
      const stage = stageRef.current;
      const canvas = canvasRef.current;
      if (!stage || !canvas) {
        requestAnimationFrame(init);
        return;
      }

      let incr = 0;
      let oldIncrX = 0;
      let oldIncrY = 0;
      let firstMove = true;
      let indexImg = 0;

      const isMobile = window.innerWidth < 768;
      const resetDist = isMobile ? 30 : 45;

      function createBounceMedia(x: number, y: number, deltaX = 0, isInitial = false) {
        if (!canvasRef.current || !stageRef.current) return;
        const currentCanvas = canvasRef.current;
        const currentStage = stageRef.current;
        const H = currentCanvas.clientHeight || currentStage.clientHeight || 550;
        const W = currentCanvas.clientWidth || currentStage.clientWidth || 800;

        const sizePx = isMobile
          ? Math.min(130, Math.max(95, W * 0.28))
          : Math.min(160, Math.max(120, W * 0.16));

        if (y > H - 120 && !isInitial) return;

        // Keep up to 7 cards gracefully resting on the floor
        if (currentCanvas.children.length >= 7) {
          const oldest = currentCanvas.firstElementChild as HTMLElement | null;
          if (oldest && oldest.parentNode === currentCanvas) {
            gsap.to(oldest, {
              opacity: 0,
              scale: 0.75,
              duration: 0.4,
              ease: 'power2.out',
              onComplete: () => {
                if (oldest.parentNode === currentCanvas) {
                  currentCanvas.removeChild(oldest);
                }
              },
            });
          }
        }

        const cardData = BOUNCE_CARDS[indexImg];
        indexImg = (indexImg + 1) % BOUNCE_CARDS.length;

        const wrapper = document.createElement('div');
        wrapper.className =
          'absolute pointer-events-auto select-none z-10 will-change-transform flex flex-col items-center cursor-pointer';

        const clampedX = Math.max(10, Math.min(x, W - sizePx - 10));
        wrapper.style.width = `${sizePx}px`;
        wrapper.style.left = `${clampedX}px`;
        wrapper.style.top = '0px';

        const image = document.createElement('img');
        image.src = cardData.src;
        image.alt = cardData.tag;
        image.loading = 'eager';
        image.style.width = `${sizePx}px`;
        image.style.height = `${sizePx}px`;
        image.className =
          'object-cover rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_25px_rgba(56,189,248,0.22)] border border-white/20 select-none pointer-events-none';

        const tagBadge = document.createElement('span');
        tagBadge.textContent = cardData.tag;
        tagBadge.className =
          'mt-1.5 px-2 py-0.5 text-[9px] font-mono tracking-wider text-cyan-300/90 bg-black/80 backdrop-blur-md border border-cyan-500/20 rounded-full whitespace-nowrap opacity-90 shadow-sm pointer-events-none';

        wrapper.appendChild(image);
        wrapper.appendChild(tagBadge);
        currentCanvas.appendChild(wrapper);

        const startY = Math.max(10, Math.min(y, 80));
        const stackOffset = (Math.random() - 0.5) * 24;
        const targetY = H - sizePx - 36 + stackOffset;

        gsap.fromTo(
          wrapper,
          {
            y: startY,
            scale: 0.85,
            opacity: 0,
            rotation: (Math.random() - 0.5) * 25,
          },
          {
            y: targetY,
            scale: 1,
            opacity: 1,
            rotation: (Math.random() - 0.5) * 16,
            duration: 0.95,
            ease: 'bounce.out',
          }
        );
      }

      // Auto-cascade helper: Drops 4 pieces naturally across the stage
      let hasAutoCascaded = false;
      const triggerAutoCascade = () => {
        if (hasAutoCascaded) return;
        hasAutoCascaded = true;
        const currentStage = stageRef.current;
        const W = currentStage?.clientWidth || 800;
        const drops = [
          { x: W * 0.16, y: 30, deltaX: 10 },
          { x: W * 0.38, y: 50, deltaX: -8 },
          { x: W * 0.60, y: 35, deltaX: 12 },
          { x: W * 0.80, y: 45, deltaX: -10 },
        ];
        drops.forEach((d, idx) => {
          setTimeout(() => {
            if (!isCancelled && canvasRef.current) {
              createBounceMedia(d.x, d.y, d.deltaX, true);
            }
          }, idx * 260);
        });
      };

      // Wire manual trigger
      triggerCascadeRef.current = () => {
        const currentStage = stageRef.current;
        const W = currentStage?.clientWidth || 800;
        const drops = [
          { x: W * (0.2 + Math.random() * 0.2), y: 30 },
          { x: W * (0.5 + Math.random() * 0.3), y: 40 },
        ];
        drops.forEach((d, idx) => {
          setTimeout(() => {
            if (!isCancelled && canvasRef.current) {
              createBounceMedia(d.x, d.y, 0, true);
            }
          }, idx * 200);
        });
      };

      // Trigger auto-cascade immediately and on intersection
      const autoTimer = setTimeout(triggerAutoCascade, 200);
      cleanupFns.push(() => clearTimeout(autoTimer));

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              triggerAutoCascade();
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(stage);
      cleanupFns.push(() => observer.disconnect());

      const handlePointer = (clientX: number, clientY: number) => {
        const rect = stage.getBoundingClientRect();
        const relX = clientX - rect.left;
        const relY = clientY - rect.top;

        if (relX < 0 || relX > rect.width || relY < 0 || relY > rect.height) {
          firstMove = true;
          return;
        }

        if (firstMove) {
          oldIncrX = relX;
          oldIncrY = relY;
          firstMove = false;
          return;
        }

        incr += Math.hypot(relX - oldIncrX, relY - oldIncrY);
        if (incr > resetDist) {
          createBounceMedia(relX - 70, relY, relX - oldIncrX);
          incr = 0;
        }
        oldIncrX = relX;
        oldIncrY = relY;
      };

      const onMouseMove = (e: MouseEvent) => {
        handlePointer(e.clientX, e.clientY);
      };

      const onTouchMove = (e: TouchEvent) => {
        if (e.touches && e.touches[0]) {
          handlePointer(e.touches[0].clientX, e.touches[0].clientY);
        }
      };

      const onClick = (e: MouseEvent) => {
        const rect = stage.getBoundingClientRect();
        const relX = e.clientX - rect.left - 70;
        const relY = Math.max(30, Math.min(e.clientY - rect.top, 100));
        createBounceMedia(relX, relY, 0);
      };

      stage.addEventListener('mousemove', onMouseMove, { passive: true });
      stage.addEventListener('touchmove', onTouchMove, { passive: true });
      stage.addEventListener('click', onClick);

      cleanupFns.push(() => {
        stage.removeEventListener('mousemove', onMouseMove);
        stage.removeEventListener('touchmove', onTouchMove);
        stage.removeEventListener('click', onClick);
      });
    };

    init();

    return () => {
      isCancelled = true;
      cleanupFns.forEach((fn) => fn());
    };
  }, []);

  return (
    <section
      id="creative-lab"
      className="w-full relative bg-[#000000] py-28 sm:py-36 px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden border-t border-white/[0.06]"
    >
      {/* Background Ambient Cyber Blue Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-sky-500/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[300px] bg-cyan-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
          <FadeIn delay={0.1} y={15}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-400/20 bg-sky-500/10 mb-5">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-sky-300">
                {content.badge}
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} y={20}>
            <div className="py-2 mb-4">
              <MorphingText
                texts={MORPHING_WORDS[language] || MORPHING_WORDS.PT}
                className="text-white drop-shadow-[0_0_35px_rgba(56,189,248,0.25)]"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.3} y={20}>
            <p className="text-base sm:text-lg text-zinc-400 font-['Kanit',sans-serif] font-light leading-relaxed max-w-3xl mx-auto">
              {content.subtitle}
            </p>
          </FadeIn>
        </div>

        {/* 3 Pillars of Kauan's Work (Linear-style Glass Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {content.pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <FadeIn key={idx} delay={0.35 + idx * 0.1} y={25}>
                <div className="group relative p-6 sm:p-7 rounded-2xl bg-zinc-950/70 border border-white/[0.08] hover:border-sky-400/30 transition-all duration-300 hover:bg-zinc-900/60 backdrop-blur-xl h-full flex flex-col justify-between">
                  {/* Subtle top indicator */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 group-hover:scale-105 transition-transform duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs text-zinc-500 font-semibold">
                        // {pillar.num}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 tracking-tight group-hover:text-sky-300 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-zinc-500">
                    <span>PADRÃO KAUAN GABRIEL</span>
                    <span className="text-sky-400/70">PRODUÇÃO</span>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* The Dedicated Interactive Kinetic Canvas */}
        <div className="relative rounded-3xl border border-white/[0.12] bg-zinc-950/90 overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.95)]">
            {/* Top Bar / HUD */}
            <div className="px-5 sm:px-8 py-4 border-b border-white/[0.08] bg-zinc-900/40 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 select-none">
              <div className="flex items-center gap-3">
                <span className="text-[11px] sm:text-xs font-mono font-medium uppercase tracking-wider text-cyan-300">
                  {content.canvasStatus}
                </span>
              </div>

              <div className="text-[10px] sm:text-xs font-mono text-zinc-400 flex items-center gap-2">
                <span className="hidden sm:inline text-zinc-600">//</span>
                <span>{content.canvasHint}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => triggerCascadeRef.current()}
                  className="px-3 py-1 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/30 text-cyan-300 text-[10px] sm:text-xs font-mono uppercase tracking-wider transition-all cursor-pointer active:scale-95 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>{content.btnDrop}</span>
                </button>
                <div className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[10px] sm:text-xs font-mono text-zinc-400">
                  {content.statsCount}
                </div>
              </div>
            </div>

            {/* The Interactive Stage Area */}
            <div
              ref={stageRef}
              className="relative w-full h-[480px] sm:h-[560px] md:h-[620px] bg-gradient-to-b from-black/60 via-zinc-950/80 to-black overflow-hidden cursor-crosshair select-none"
            >
              {/* Perspective grid lines background */}
              <div
                className="absolute inset-0 opacity-[0.14] pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)',
                  backgroundSize: '48px 48px',
                }}
              />

              {/* Central radial watermark branding */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none text-center px-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-white/[0.02] border border-white/[0.08] flex items-center justify-center mb-4 backdrop-blur-sm">
                  <Box className="w-8 h-8 text-white/20" />
                </div>
                <h4 className="text-2xl sm:text-3xl md:text-4xl font-['Anton',sans-serif] uppercase tracking-wider text-white/[0.12]">
                  KAUAN // VISUAL ARCHIVE
                </h4>
                <p className="text-xs sm:text-sm font-mono text-white/20 tracking-widest mt-1">
                  ESTÉTICA, TEXTURA & FÍSICA CINÉTICA
                </p>
              </div>

              {/* Dedicated Spawn Layer - Pure DOM, Zero React Children */}
              <div
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none z-20 overflow-hidden"
              />

              {/* Floor boundary glow line */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none z-30" />
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-cyan-950/20 to-transparent pointer-events-none z-30" />
            </div>

            {/* Bottom Bar: Action & Summary */}
            <div className="px-5 sm:px-8 py-4 sm:py-5 border-t border-white/[0.08] bg-zinc-900/50 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                <span className="text-white font-medium">DISCIPLINAS:</span>
                <span className="text-zinc-500">BLENDER</span>
                <span className="text-zinc-600">·</span>
                <span className="text-zinc-500">THREE.JS</span>
                <span className="text-zinc-600">·</span>
                <span className="text-zinc-500">FIGMA</span>
                <span className="text-zinc-600">·</span>
                <span className="text-zinc-500">REACT</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href="#projects"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-medium text-white transition-all duration-200"
                >
                  {content.ctaProjects}
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
                </a>

                {onContactClick && (
                  <button
                    onClick={() => onContactClick('3D Design & CGI')}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-sky-400 to-cyan-400 hover:from-sky-300 hover:to-cyan-300 text-black text-xs font-semibold tracking-wide transition-all duration-200 shadow-[0_0_20px_rgba(56,189,248,0.3)]"
                  >
                    {content.ctaContact}
                  </button>
                )}
              </div>
            </div>
          </div>
      </div>
    </section>
  );
};
