import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { useLanguage } from '../context/LanguageContext';
import { IconCloud } from './ui/icon-cloud';
import { CUSTOM_LOGOS } from '../data/customLogos';
import { AppleScrollRevealText } from './AppleScrollRevealText';
import { SpotlightCard } from './ui/SpotlightCard';
import { ArrowUpRight } from 'lucide-react';

interface AboutSectionProps {
  onContactClick?: () => void;
}

// 4 platforms specifically focused on digital creation, audience, and monetization
const MONETIZATION_TOOLS = [
  {
    id: 'youtube',
    name: 'YouTube',
    logo: '/logos/youtube.png',
    tagKey: 'about.tool.youtube.tag',
    descKey: 'about.tool.youtube.desc',
    url: 'https://youtube.com',
    spotlight: 'rgba(239, 68, 68, 0.14)',
    borderGlow: 'rgba(239, 68, 68, 0.35)',
    badgeClass: 'text-[#FF4D4D] bg-[#FF0000]/10 border-[#FF0000]/25',
    accentText: 'group-hover:text-[#FF4D4D]',
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT / OpenAI',
    logo: '/logos/chatgpt.png',
    tagKey: 'about.tool.chatgpt.tag',
    descKey: 'about.tool.chatgpt.desc',
    url: 'https://chatgpt.com',
    spotlight: 'rgba(16, 185, 129, 0.14)',
    borderGlow: 'rgba(16, 185, 129, 0.35)',
    badgeClass: 'text-[#10A37F] bg-[#10A37F]/10 border-[#10A37F]/25',
    accentText: 'group-hover:text-[#10A37F]',
  },
  {
    id: 'replit',
    name: 'Replit',
    logo: '/logos/replit.png',
    tagKey: 'about.tool.replit.tag',
    descKey: 'about.tool.replit.desc',
    url: 'https://replit.com',
    spotlight: 'rgba(99, 102, 241, 0.14)',
    borderGlow: 'rgba(99, 102, 241, 0.35)',
    badgeClass: 'text-[#818CF8] bg-[#6366F1]/10 border-[#6366F1]/25',
    accentText: 'group-hover:text-[#818CF8]',
  },
  {
    id: 'arc',
    name: 'Arc Browser',
    logo: '/logos/arc.png',
    tagKey: 'about.tool.arc.tag',
    descKey: 'about.tool.arc.desc',
    url: 'https://arc.net',
    spotlight: 'rgba(56, 189, 248, 0.14)',
    borderGlow: 'rgba(56, 189, 248, 0.35)',
    badgeClass: 'text-zinc-400 bg-[#38BDF8]/10 border-[#38BDF8]/25',
    accentText: 'group-hover:text-zinc-400',
  },
];

// All 11 custom logos requested by the user, duplicated to form a rich, balanced 22-node 3D sphere
const USER_SPHERE_LOGOS = [
  ...CUSTOM_LOGOS.map((l) => l.dataUri),
  ...CUSTOM_LOGOS.map((l) => l.dataUri),
];

export const AboutSection: React.FC<AboutSectionProps> = ({ onContactClick }) => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const aboutCardRef = useRef<HTMLDivElement>(null);

  // Mouse Parallax Tracking with Smooth Lerp Springs
  const mouseNormX = useMotionValue(0);
  const mouseNormY = useMotionValue(0);

  const springConfig = { damping: 32, stiffness: 75, mass: 0.9 };
  const smoothMouseX = useSpring(mouseNormX, springConfig);
  const smoothMouseY = useSpring(mouseNormY, springConfig);

  // Layered Scroll Parallax across depth planes
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundParallaxY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  // 3D Depth Entrance ("Vindo lá do fundo") calibrada em 1.3x de velocidade
  const { scrollYProgress: aboutScrollProgress } = useScroll({
    target: aboutCardRef,
    offset: ['start end', 'start 35%'],
  });

  // Mola calibrada para velocidade 1.3x (suave, fluida e com peso ideal)
  const smoothAboutProgress = useSpring(aboutScrollProgress, {
    stiffness: 135,
    damping: 24,
    mass: 0.52,
    restDelta: 0.001,
  });

  // Animação 3D marcante com surgimento do fundo (escala 0.68, y 180, tilt 18deg)
  // Conclui todo o movimento em 1.3x de velocidade (percurso 0 -> 0.77)
  const cardScale = useTransform(smoothAboutProgress, [0, 0.77, 1], [0.68, 1, 1]);
  const cardY = useTransform(smoothAboutProgress, [0, 0.77, 1], [180, 0, 0]);
  const cardRotateX = useTransform(smoothAboutProgress, [0, 0.77, 1], [18, 0, 0]);
  const cardOpacity = useTransform(smoothAboutProgress, [0, 0.25, 0.77, 1], [0, 0.6, 1, 1]);
  // O blur dissipa suavemente na curva 1.3x (em 0.52) para foco perfeito antes da parada de leitura
  const cardBlur = useTransform(smoothAboutProgress, [0, 0.52, 1], [14, 0, 0]);
  const cardFilter = useMotionTemplate`blur(${cardBlur}px)`;

  // Parallax 3D diferencial na foto do retrato em 1.3x
  const photoScale = useTransform(smoothAboutProgress, [0, 0.77, 1], [0.80, 1, 1]);
  const photoGlowOpacity = useTransform(smoothAboutProgress, [0, 0.52, 1], [0, 0.7, 0.7]);
  const photoTiltX = useTransform(smoothMouseY, [-1, 1], [6, -6]);
  const photoTiltY = useTransform(smoothMouseX, [-1, 1], [-6, 6]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();

      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const nx = (e.clientX - centerX) / (rect.width / 2);
      const ny = (e.clientY - centerY) / (rect.height / 2);

      mouseNormX.set(Math.max(-1, Math.min(1, nx)));
      mouseNormY.set(Math.max(-1, Math.min(1, ny)));
    };

    const handleMouseLeave = () => {
      mouseNormX.set(0);
      mouseNormY.set(0);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseNormX, mouseNormY]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 sm:px-10 md:px-16 lg:px-20 py-28 sm:py-36 bg-[#000000] overflow-hidden select-none"
    >
      {/* Background Ambient Ice-Blue Lighting */}
      <motion.div
        style={{ y: backgroundParallaxY }}
        className="absolute inset-0 pointer-events-none overflow-hidden [clip-path:inset(0)] max-w-full"
      >
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-full max-w-[700px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.015)_0%,transparent_70%)]" />
        <div className="absolute top-[20%] right-[10%] w-full max-w-[450px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.015)_0%,transparent_70%)]" />
      </motion.div>

      {/* Main Container */}
      <div className="relative z-20 max-w-6xl w-full mx-auto">
        
        {/* 2-Column About Me Content with 3D Depth Entrance ("Vindo lá do fundo") */}
        <motion.div
          ref={aboutCardRef}
          style={{
            scale: cardScale,
            y: cardY,
            rotateX: cardRotateX,
            opacity: cardOpacity,
            filter: cardFilter,
            transformPerspective: 1200,
            transformOrigin: 'center center',
          }}
          className="relative will-change-transform"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Portrait Photo with 3D Mouse Parallax */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start">
              <motion.div
                style={{
                  scale: photoScale,
                  rotateX: photoTiltX,
                  rotateY: photoTiltY,
                  transformPerspective: 800,
                }}
                className="w-full max-w-[380px] sm:max-w-[420px]"
              >
                <div className="relative group">
                  
                  {/* Ambient glowing aura expanding as card arrives */}
                  <motion.div
                    style={{ opacity: photoGlowOpacity }}
                    className="absolute -inset-3 bg-white/[0.03] rounded-[36px] blur-2xl group-hover:opacity-90 transition-opacity duration-700 pointer-events-none"
                  />

                  {/* Photo Card Container */}
                  <div className="relative aspect-[4/5] w-full rounded-[28px] overflow-hidden bg-[#000000] border border-white/[0.08] group-hover:border-white/25 shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_25px_rgba(255,255,255,0.03)] transition-all duration-500">
                    
                    {/* Photo of Kauan Gabriel */}
                    <img
                      src="/kauan-about.webp"
                      alt="Kauan Gabriel | Web Designer & AI Engineer"
                      loading="lazy"
                      decoding="async"
                      width="600"
                      height="750"
                      className="w-full h-full object-cover object-[center_16%] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />

                    {/* Subtle bottom gradient overlay for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 via-transparent to-transparent pointer-events-none" />

                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Clean, Elegant Bio Copy and CTA Button */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              
              {/* Architectural Section Indicator */}
              <div className="flex items-center gap-3 mb-6 select-none">
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-400">
                  {t('about.badge')}
                </span>
              </div>

              {/* Main Statement */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-medium leading-[1.28] tracking-tight text-white">
                {t('about.headline_pre')}
                <span className="text-white font-semibold underline decoration-white/30 decoration-2 underline-offset-8">
                  Kauan Gabriel
                </span>
                ,{' '}
                <span className="text-illumination-shimmer font-semibold">
                  {t('about.role')}
                </span>
                {t('about.headline_post')}
              </h2>

              {/* Apple-style Scroll-Driven Text Reveal (Word by Word lighting) */}
              <div className="mt-6">
                <AppleScrollRevealText
                  text={t('about.p1') as string}
                  className="text-base sm:text-lg md:text-[19px] text-[#94A3B8] font-light leading-relaxed"
                  wordClassName="text-[#E2E8F0]"
                />
              </div>

              <div className="mt-4">
                <AppleScrollRevealText
                  text={t('about.p2') as string}
                  className="text-base sm:text-lg md:text-[19px] text-[#94A3B8] font-light leading-relaxed"
                  wordClassName="text-[#E2E8F0]"
                />
              </div>

              {/* Bold Apple Callout Sentence */}
              <div className="mt-6">
                <AppleScrollRevealText
                  text={t('about.callout') as string}
                  className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight"
                  wordClassName="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                />
              </div>

              {/* CTA Button */}
              <div className="mt-8 sm:mt-10">
                <motion.button
                  type="button"
                  onClick={onContactClick}
                  whileHover={{ y: -3, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 20, mass: 0.6 }}
                  className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-4.5 rounded-xl bg-white text-[#000000] font-semibold text-sm sm:text-[15px] tracking-wide hover:bg-zinc-200 cursor-pointer shadow-md"
                >
                  <span>{t('about.cta')}</span>
                  <div className="w-7 h-7 rounded-lg bg-[#000000] text-white flex items-center justify-center transition-colors duration-300 group-hover:bg-zinc-800">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </div>
                </motion.button>
              </div>

            </div>

          </div>
        </motion.div>

        {/* 2-Column Showcase: Money-Making & Digital Creation Tools (Left) + 3D Interactive Sphere (Right) */}
        <div className="mt-16 sm:mt-24 w-full">
          <FadeIn delay={0.2} y={25} duration={0.8}>
            <div className="relative w-full overflow-hidden [clip-path:inset(0)]">
              
              {/* Subtle background ambient glows on pure black (Hardware Radial Gradients) */}
              <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.015)_0%,transparent_70%)] pointer-events-none" />
              <div className="absolute top-1/2 right-1/4 translate-x-1/4 -translate-y-1/2 w-full max-w-[450px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.015)_0%,transparent_70%)] pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                
                {/* Left Side ("do lado lá"): Apps e sites para fazer dinheiro / criar ativos */}
                <div className="lg:col-span-7 flex flex-col justify-center">
                  
                  {/* Badge */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-400">
                      {t('about.stack_badge')}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-3">
                    {t('about.stack_title')}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-sm sm:text-base text-[#94A3B8] font-light leading-relaxed mb-6 max-w-xl">
                    {t('about.stack_subtitle')}
                  </p>

                  {/* 2x2 Interactive Bento Grid of Value Platforms */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 max-w-xl">
                    {MONETIZATION_TOOLS.map((tool) => (
                      <a
                        key={tool.id}
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative block rounded-2xl bg-[#000000] hover:bg-[#060606] border border-white/[0.08] hover:border-white/[0.22] p-4 sm:p-4.5 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.8)] overflow-hidden"
                      >
                        {/* Dynamic Subtle Hover Aura */}
                        <div
                          className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                          style={{
                            background: `radial-gradient(280px circle at 50% 0%, ${tool.spotlight}, transparent 75%)`,
                          }}
                        />

                        <div className="relative z-10 flex flex-col justify-between h-full">
                          {/* Top: Icon + Badge */}
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-black/80 border border-white/10 flex items-center justify-center p-2 shrink-0 group-hover:scale-105 transition-transform duration-300">
                              <img
                                src={tool.logo}
                                alt={tool.name}
                                loading="lazy"
                                decoding="async"
                                width="24"
                                height="24"
                                className="w-full h-full object-contain"
                              />
                            </div>

                            <span
                              className={`text-[9.5px] sm:text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-full border ${tool.badgeClass}`}
                            >
                              {t(tool.tagKey)}
                            </span>
                          </div>

                          {/* Center: Title + Description */}
                          <div>
                            <div className="flex items-center justify-between">
                              <h4
                                className={`text-sm sm:text-[15px] font-bold text-white tracking-tight ${tool.accentText} transition-colors`}
                              >
                                {tool.name}
                              </h4>
                              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </div>

                            <p className="text-[11.5px] sm:text-xs text-zinc-400 font-light leading-relaxed mt-1.5 line-clamp-2">
                              {t(tool.descKey)}
                            </p>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>

                </div>

                {/* Right Side: The Interactive 3D Sphere directly on pure black */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center">
                  <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-square flex items-center justify-center">
                    <IconCloud images={USER_SPHERE_LOGOS} />
                  </div>
                </div>

              </div>

            </div>
          </FadeIn>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
