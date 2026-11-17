import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useLanguage } from '../context/LanguageContext';
import { FadeIn } from './FadeIn';
import { SpotlightCard } from './ui/SpotlightCard';
import { Box, Palette, Cpu, Sparkles, RefreshCw, ArrowUpRight } from 'lucide-react';
import { MorphingText } from './ui/morphing-text';

interface WorkCraftSectionProps {
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
  PT: ['MEU TRABALHO', 'MODELAGEM 3D', 'DIREÇÃO DE ARTE', 'ENGENHARIA WEBGL', 'PADRÃO GLOBAL', 'KAUAN GABRIEL'],
  EN: ['MY WORK', '3D MODELING', 'ART DIRECTION', 'WEBGL ENGINEERING', 'GLOBAL STANDARD', 'KAUAN GABRIEL'],
  ES: ['MI TRABAJO', 'MODELADO 3D', 'DIRECCIÓN DE ARTE', 'INGENIERÍA WEBGL', 'ESTÁNDAR GLOBAL', 'KAUAN GABRIEL'],
};

export const WorkCraftSection: React.FC<WorkCraftSectionProps> = ({ onContactClick }) => {
  const { language } = useLanguage();
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const triggerCascadeRef = useRef<() => void>(() => {});
  const clearCanvasRef = useRef<() => void>(() => {});

  const tContent = {
    PT: {
      badge: '// 04 | MEU TRABALHO & FILOSOFIA CRIATIVA',
      title: 'COMO TRABALHO & MEU PROCESSO',
      subtitle:
        'Meu trabalho une a precisão cirúrgica do 3D fotorrealista à sofisticação de interfaces interativas de alto padrão. Cada projeto é concebido com pesquisa estética profunda, shaders autorais e código WebGL de alto desempenho.',
      pillars: [
        {
          icon: Box,
          num: '01',
          title: 'Modelagem 3D & CGI',
          desc: 'Geometrias autorais, iluminação cinemática realista, shaders táteis e renderização PBR para marcas de alto padrão.',
          tags: ['Blender', 'Cinema 4D', 'PBR Shaders', 'Octane'],
        },
        {
          icon: Palette,
          num: '02',
          title: 'Direção de Arte & Branding',
          desc: 'Identidades visuais com narrativa cinematográfica, tipografia calculada e estética dark-mode refinada.',
          tags: ['Identidade Visual', 'Editorial', 'Tipografia', 'Design System'],
        },
        {
          icon: Cpu,
          num: '03',
          title: 'Engenharia WebGL & Interação',
          desc: 'Interatividade com física natural, Three.js nativo e microinterações fluidas a 60 FPS sem gargalos.',
          tags: ['Three.js', 'WebGL', 'React', 'Framer Motion'],
        },
      ],
      processTitle: 'METODOLOGIA EM 4 ETAPAS',
      steps: [
        {
          num: '01',
          title: 'Imersão & Direção de Arte',
          desc: 'Definição da narrativa visual, paleta sóbria, hierarquia e referências internacionais de alto calibre.',
        },
        {
          num: '02',
          title: 'Escultura 3D & Shaders PBR',
          desc: 'Geometria autoral, reflexos táteis, iluminação cinemática avançada e materiais realistas.',
        },
        {
          num: '03',
          title: 'Engenharia WebGL & Frontend',
          desc: 'Desenvolvimento limpo com React, shaders customizados e microinterações calculadas.',
        },
        {
          num: '04',
          title: 'Otimização 60 FPS & Deploy',
          desc: 'Calibração de física natural, rolagem suave com Lenis e performance máxima em todas as telas.',
        },
      ],
      canvasBadge: 'CANVAS INTERATIVO DO MEU TRABALHO',
      canvasHint: 'PASSE O CURSOR OU CLIQUE PARA SOLTAR PEÇAS DO PROCESSO',
      btnDrop: 'SOLTAR PEÇAS',
      btnClear: 'LIMPAR',
      statsCount: '10 ESTUDOS VISUAIS SELECIONADOS',
      archiveTitle: 'KAUAN // VISUAL ARCHIVE',
      archiveSubtitle: 'ESTÉTICA, TEXTURA & FÍSICA CINÉTICA',
      ctaProjects: 'Explorar Projetos Completos',
      ctaContact: 'Solicitar Projeto Criativo',
    },
    EN: {
      badge: '// 04 | MY WORK & CREATIVE PHILOSOPHY',
      title: 'HOW I WORK & MY PROCESS',
      subtitle:
        'My work bridges the surgical precision of photorealistic 3D with the sophistication of high-end interactive interfaces. Every project is engineered with deep aesthetic research, custom shaders, and high-performance WebGL.',
      pillars: [
        {
          icon: Box,
          num: '01',
          title: '3D Modeling & CGI',
          desc: 'Bespoke geometries, realistic cinematic lighting, tactile shaders, and PBR rendering for premium brands.',
          tags: ['Blender', 'Cinema 4D', 'PBR Shaders', 'Octane'],
        },
        {
          icon: Palette,
          num: '02',
          title: 'Art Direction & Branding',
          desc: 'Visual identities with cinematic narrative, calculated typography, and refined dark-mode aesthetics.',
          tags: ['Visual Identity', 'Editorial', 'Typography', 'Design System'],
        },
        {
          icon: Cpu,
          num: '03',
          title: 'WebGL & Interaction Engineering',
          desc: 'Natural physics interactivity, native Three.js, and silky 60 FPS microinteractions with zero friction.',
          tags: ['Three.js', 'WebGL', 'React', 'Framer Motion'],
        },
      ],
      processTitle: '4-STAGE CRAFT METHODOLOGY',
      steps: [
        {
          num: '01',
          title: 'Immersion & Art Direction',
          desc: 'Visual narrative formulation, restrained palette, typography hierarchy, and global benchmarks.',
        },
        {
          num: '02',
          title: '3D Sculpting & PBR Shaders',
          desc: 'Bespoke geometries, tactile reflections, advanced cinematic lighting, and realistic materials.',
        },
        {
          num: '03',
          title: 'WebGL & Frontend Engineering',
          desc: 'Clean React development, custom GLSL shaders, and tactile micro-interactions.',
        },
        {
          num: '04',
          title: '60 FPS Optimization & Deploy',
          desc: 'Natural physics calibration, Lenis velvet scroll, and rock-solid performance across all viewports.',
        },
      ],
      canvasBadge: 'INTERACTIVE CRAFT CANVAS',
      canvasHint: 'MOVE CURSOR OR CLICK TO RELEASE PROCESS PIECES',
      btnDrop: 'RELEASE PIECES',
      btnClear: 'CLEAR',
      statsCount: '10 SELECTED VISUAL STUDIES',
      archiveTitle: 'KAUAN // VISUAL ARCHIVE',
      archiveSubtitle: 'AESTHETICS, TEXTURE & KINETIC PHYSICS',
      ctaProjects: 'Explore Full Projects',
      ctaContact: 'Request Creative Project',
    },
    ES: {
      badge: '// 04 | MI TRABAJO & FILOSOFÍA CREATIVA',
      title: 'CÓMO TRABAJO & MI PROCESO',
      subtitle:
        'Mi trabajo une la precisión quirúrgica del 3D fotorrealista con la sofisticación de interfaces interactivas de alto nivel. Cada proyecto nace de una investigación estética profunda, shaders propios y código WebGL de alto rendimiento.',
      pillars: [
        {
          icon: Box,
          num: '01',
          title: 'Modelado 3D & CGI',
          desc: 'Geometrías exclusivas, iluminación de cine realista, shaders táctiles y renderizado PBR para marcas de élite.',
          tags: ['Blender', 'Cinema 4D', 'PBR Shaders', 'Octane'],
        },
        {
          icon: Palette,
          num: '02',
          title: 'Dirección de Arte & Branding',
          desc: 'Identidades visuales con narrativa cinematográfica, tipografía calculada y estética dark-mode refinada.',
          tags: ['Identidad Visual', 'Editorial', 'Tipografía', 'Design System'],
        },
        {
          icon: Cpu,
          num: '03',
          title: 'Ingeniería WebGL & Interacción',
          desc: 'Interactividad con física natural, Three.js nativo y microinteracciones fluidas a 60 FPS sin retrasos.',
          tags: ['Three.js', 'WebGL', 'React', 'Framer Motion'],
        },
      ],
      processTitle: 'METODOLOGÍA EN 4 ETAPAS',
      steps: [
        {
          num: '01',
          title: 'Inmersión & Dirección de Arte',
          desc: 'Definición de narrativa visual, paleta sobria, jerarquía tipográfica y referentes internacionales.',
        },
        {
          num: '02',
          title: 'Escultura 3D & Shaders PBR',
          desc: 'Geometría autoral, reflejos táctiles, iluminación cinematográfica avanzada y materiales realistas.',
        },
        {
          num: '03',
          title: 'Ingeniería WebGL & Frontend',
          desc: 'Desarrollo limpio con React, shaders personalizados y microinteracciones táctiles.',
        },
        {
          num: '04',
          title: 'Optimización 60 FPS & Deploy',
          desc: 'Calibración de física natural, scroll suave con Lenis y máximo rendimiento en cualquier pantalla.',
        },
      ],
      canvasBadge: 'CANVAS INTERACTIVO DE MI TRABAJO',
      canvasHint: 'MUEVA EL CURSOR O HAGA CLIC PARA SOLTAR PIEZAS DEL PROCESO',
      btnDrop: 'SOLTAR PIEZAS',
      btnClear: 'LIMPIAR',
      statsCount: '10 PROJETOS VISUAIS SELECIONADOS',
      archiveTitle: 'KAUAN // VISUAL ARCHIVE',
      archiveSubtitle: 'ESTÉTICA, TEXTURA & FÍSICA CINÉTICA',
      ctaProjects: 'Explorar Proyectos Completos',
      ctaContact: 'Solicitar Proyecto Creativo',
    },
  }[language] || {
    badge: '// 04 | MEU TRABALHO & FILOSOFIA CRIATIVA',
    title: 'COMO TRABALHO & MEU PROCESSO',
    subtitle:
      'Meu trabalho une a precisão cirúrgica do 3D fotorrealista à sofisticação de interfaces interativas de alto padrão.',
    pillars: [],
    processTitle: 'METODOLOGIA EM 4 ETAPAS',
    steps: [],
    canvasBadge: 'CANVAS INTERATIVO DO MEU TRABALHO',
    canvasHint: 'PASSE O CURSOR OU CLIQUE PARA SOLTAR PEÇAS DO PROCESSO',
    btnDrop: 'SOLTAR PEÇAS',
    btnClear: 'LIMPAR',
    statsCount: '10 ESTUDOS VISUAIS SELECIONADOS',
    archiveTitle: 'KAUAN // VISUAL ARCHIVE',
    archiveSubtitle: 'ESTÉTICA, TEXTURA & FÍSICA CINÉTICA',
    ctaProjects: 'Explorar Projetos Completos',
    ctaContact: 'Solicitar Projeto Criativo',
  };

  useEffect(() => {
    // Preload all 10 cards
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
      const resetDist = isMobile ? 32 : 42;

      function createBounceMedia(x: number, y: number, isInitial = false) {
        if (!canvasRef.current || !stageRef.current) return;
        const currentCanvas = canvasRef.current;
        const currentStage = stageRef.current;
        const H = currentCanvas.clientHeight || currentStage.clientHeight || 520;
        const W = currentCanvas.clientWidth || currentStage.clientWidth || 800;

        const sizePx = isMobile
          ? Math.min(130, Math.max(95, W * 0.28))
          : Math.min(160, Math.max(120, W * 0.16));

        if (y > H - 120 && !isInitial) return;

        // Keep at most 8 cards resting gracefully on floor
        if (currentCanvas.children.length >= 8) {
          const oldest = currentCanvas.firstElementChild as HTMLElement | null;
          if (oldest && oldest.parentNode === currentCanvas) {
            gsap.to(oldest, {
              opacity: 0,
              scale: 0.75,
              duration: 0.35,
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

        const clampedX = Math.max(12, Math.min(x, W - sizePx - 12));
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
          'object-cover rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_25px_rgba(56,189,248,0.25)] border border-white/20 select-none pointer-events-none';

        const tagBadge = document.createElement('span');
        tagBadge.textContent = cardData.tag;
        tagBadge.className =
          'mt-1.5 px-2.5 py-0.5 text-[9px] font-mono tracking-wider text-cyan-300 bg-black/85 backdrop-blur-md border border-cyan-500/25 rounded-full whitespace-nowrap opacity-90 shadow-sm pointer-events-none';

        wrapper.appendChild(image);
        wrapper.appendChild(tagBadge);
        currentCanvas.appendChild(wrapper);

        const startY = Math.max(10, Math.min(y, 80));
        const stackOffset = (Math.random() - 0.5) * 24;
        const targetY = H - sizePx - 38 + stackOffset;

        gsap.fromTo(
          wrapper,
          {
            y: startY,
            scale: 0.82,
            opacity: 0,
            rotation: (Math.random() - 0.5) * 24,
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

      // Auto-cascade helper: Drops 4 initial pieces
      let hasAutoCascaded = false;
      const triggerAutoCascade = () => {
        if (hasAutoCascaded) return;
        hasAutoCascaded = true;
        const currentStage = stageRef.current;
        const W = currentStage?.clientWidth || 800;
        const drops = [
          { x: W * 0.16, y: 30 },
          { x: W * 0.38, y: 50 },
          { x: W * 0.60, y: 35 },
          { x: W * 0.80, y: 45 },
        ];
        drops.forEach((d, idx) => {
          setTimeout(() => {
            if (!isCancelled && canvasRef.current) {
              createBounceMedia(d.x, d.y, true);
            }
          }, idx * 240);
        });
      };

      triggerCascadeRef.current = () => {
        const currentStage = stageRef.current;
        const W = currentStage?.clientWidth || 800;
        const drops = [
          { x: W * (0.18 + Math.random() * 0.25), y: 30 },
          { x: W * (0.52 + Math.random() * 0.25), y: 40 },
        ];
        drops.forEach((d, idx) => {
          setTimeout(() => {
            if (!isCancelled && canvasRef.current) {
              createBounceMedia(d.x, d.y, true);
            }
          }, idx * 180);
        });
      };

      clearCanvasRef.current = () => {
        if (!canvasRef.current) return;
        const children = Array.from(canvasRef.current.children);
        children.forEach((child) => {
          gsap.to(child, {
            opacity: 0,
            scale: 0.6,
            duration: 0.3,
            ease: 'power2.out',
            onComplete: () => {
              if (child.parentNode === canvasRef.current) {
                canvasRef.current.removeChild(child);
              }
            },
          });
        });
      };

      const autoTimer = setTimeout(triggerAutoCascade, 250);
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
          createBounceMedia(relX - 70, relY);
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
        createBounceMedia(relX, relY);
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
      id="meu-trabalho"
      className="w-full relative bg-[#000000] py-28 sm:py-36 px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden border-t border-white/[0.08]"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-[#38BDF8]/[0.035] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[350px] bg-[#0284C7]/[0.025] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
          <FadeIn delay={0.1} y={20}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-sky-400/20 bg-sky-500/10 mb-5 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] shadow-[0_0_8px_#38BDF8]" />
              <span className="text-xs font-mono uppercase tracking-[0.22em] text-[#38BDF8]">
                {tContent.badge}
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} y={25}>
            <div className="py-2 mb-4">
              <MorphingText
                texts={MORPHING_WORDS[language] || MORPHING_WORDS.PT}
                className="text-white drop-shadow-[0_0_35px_rgba(56,189,248,0.25)] select-none"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.3} y={20}>
            <p className="text-sm sm:text-base md:text-lg text-zinc-400 font-light leading-relaxed max-w-3xl mx-auto">
              {tContent.subtitle}
            </p>
          </FadeIn>
        </div>

        {/* 3 Pillars of Kauan's Work (Spotlight Cards - Exactly from user reference print) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-16 sm:mb-20 items-stretch">
          {tContent.pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <FadeIn key={idx} delay={0.35 + idx * 0.1} y={25} className="h-full">
                <SpotlightCard
                  spotlightColor="rgba(56, 189, 248, 0.15)"
                  borderColor="rgba(56, 189, 248, 0.4)"
                  className="flex flex-col justify-between h-full bg-zinc-950/80 border-white/[0.08] hover:border-sky-400/30 p-6 sm:p-7"
                >
                  <div>
                    {/* Top indicator & icon */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-500/25 flex items-center justify-center text-sky-400 group-hover:scale-105 transition-transform duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs text-zinc-500 font-semibold tracking-wider">
                        // {pillar.num}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-white mb-2.5 group-hover:text-sky-300 transition-colors">
                      {pillar.title}
                    </h3>

                    <p className="text-xs sm:text-[13px] text-zinc-400 leading-relaxed font-light mb-4">
                      {pillar.desc}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-2">
                      {pillar.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono tracking-wider bg-black/60 text-zinc-400 border border-white/[0.06] select-none"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-500 select-none">
                    <span>PADRÃO KAUAN GABRIEL</span>
                    <span className="text-sky-400/80 font-medium">PRODUÇÃO</span>
                  </div>
                </SpotlightCard>
              </FadeIn>
            );
          })}
        </div>

        {/* 4-Step Methodology Pipeline */}
        <div className="mb-16 sm:mb-20">
          <div className="text-center mb-8 select-none">
            <span className="text-xs font-mono uppercase tracking-[0.22em] text-[#38BDF8]">
              // {tContent.processTitle}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tContent.steps.map((step, sIdx) => (
              <FadeIn key={sIdx} delay={0.15 * sIdx} y={20} className="h-full">
                <div className="p-5 rounded-2xl bg-zinc-950/60 border border-white/[0.06] hover:border-white/[0.14] transition-all h-full flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#38BDF8] mb-2 block">
                      // {step.num}
                    </span>
                    <h4 className="text-sm sm:text-[15px] font-semibold text-white tracking-tight mb-2">
                      {step.title}
                    </h4>
                    <p className="text-xs text-zinc-400 font-light leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]/60" />
                    <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">
                      Fase {step.num}
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* The Interactive Kinetic Canvas (Efeito de Fotos Caindo do Cursor) */}
        <div className="relative rounded-3xl border border-white/[0.12] bg-zinc-950/90 overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.95)]">
          {/* Top HUD */}
          <div className="px-5 sm:px-8 py-4 border-b border-white/[0.08] bg-zinc-900/50 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 select-none">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#38BDF8]" />
              <span className="text-[11px] sm:text-xs font-mono font-medium uppercase tracking-wider text-cyan-300">
                {tContent.canvasBadge}
              </span>
            </div>

            <div className="text-[10px] sm:text-xs font-mono text-zinc-400 flex items-center gap-2">
              <span className="hidden sm:inline text-zinc-600">//</span>
              <span>{tContent.canvasHint}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => triggerCascadeRef.current()}
                className="px-3 py-1 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/30 text-cyan-300 text-[10px] sm:text-xs font-mono uppercase tracking-wider transition-all cursor-pointer active:scale-95 flex items-center gap-1.5"
              >
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>{tContent.btnDrop}</span>
              </button>

              <button
                type="button"
                onClick={() => clearCanvasRef.current()}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white text-[10px] sm:text-xs font-mono uppercase tracking-wider transition-all cursor-pointer active:scale-95 flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>{tContent.btnClear}</span>
              </button>

              <span className="hidden md:inline-flex text-[10px] font-mono tracking-wider px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-zinc-400">
                {tContent.statsCount}
              </span>
            </div>
          </div>

          {/* Interactive Physics Stage */}
          <div
            ref={stageRef}
            className="relative w-full h-[480px] sm:h-[520px] md:h-[560px] overflow-hidden cursor-crosshair select-none bg-[#030305]"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          >
            {/* Center Watermark & Branding */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0 px-4 text-center">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900/60 border border-white/10 flex items-center justify-center mb-4 text-zinc-600">
                <Box className="w-7 h-7" />
              </div>
              <h4 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white/[0.07] font-mono">
                {tContent.archiveTitle}
              </h4>
              <p className="text-[11px] sm:text-xs md:text-sm font-mono tracking-[0.25em] uppercase text-white/[0.04] mt-2">
                {tContent.archiveSubtitle}
              </p>
            </div>

            {/* DOM Container for Falling Cards */}
            <div
              ref={canvasRef}
              className="absolute inset-0 pointer-events-none overflow-hidden"
            />
          </div>

          {/* Bottom Bar */}
          <div className="px-5 sm:px-8 py-3.5 border-t border-white/[0.08] bg-zinc-900/30 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-500 select-none">
            <div className="flex items-center gap-3">
              <span className="text-zinc-400">DISCIPLINAS:</span>
              <span className="text-zinc-300">BLENDER</span>
              <span>·</span>
              <span className="text-zinc-300">THREE.JS</span>
              <span>·</span>
              <span className="text-zinc-300">FIGMA</span>
              <span>·</span>
              <span className="text-zinc-300">REACT</span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="#projects"
                className="px-3.5 py-1.5 rounded-lg border border-white/10 hover:border-white/30 text-white hover:text-sky-300 text-xs font-mono transition-colors flex items-center gap-1.5"
              >
                <span>{tContent.ctaProjects}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={() => onContactClick?.('Modelagem 3D & WebGL')}
                className="px-4 py-1.5 rounded-lg bg-sky-500 text-black font-semibold text-xs font-mono hover:bg-sky-400 transition-colors shadow-[0_0_20px_rgba(56,189,248,0.4)]"
              >
                {tContent.ctaContact}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkCraftSection;
