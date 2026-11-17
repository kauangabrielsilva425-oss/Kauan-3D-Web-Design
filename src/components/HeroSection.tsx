import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Navbar } from './Navbar';
import { FadeIn } from './FadeIn';
import { Magnet } from './Magnet';
import { InteractiveCharacter } from './InteractiveCharacter';
import { DepthCyberGrid } from './DepthCyberGrid';
import { useLanguage } from '../context/LanguageContext';

interface HeroSectionProps {
  onContactClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onContactClick }) => {
  const { t, language } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);

  // Mouse Parallax Springs for Depth Planes (Slow, Smooth, Cinematic inertia)
  const mouseNormX = useMotionValue(0);
  const mouseNormY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseNormX, { damping: 30, stiffness: 70, mass: 0.8 });
  const smoothMouseY = useSpring(mouseNormY, { damping: 30, stiffness: 70, mass: 0.8 });

  // Scroll Parallax: Title recedes deeper behind character as you scroll
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const titleScrollY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);
  const bgGlowY = useTransform(scrollYProgress, [0, 1], [0, 70]);

  // Ambient mouse tracking for 3D character head & grid parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const ny = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      mouseNormX.set(Math.max(-1, Math.min(1, nx)));
      mouseNormY.set(Math.max(-1, Math.min(1, ny)));
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const nx = (touch.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
        const ny = (touch.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
        mouseNormX.set(Math.max(-1, Math.min(1, nx)));
        mouseNormY.set(Math.max(-1, Math.min(1, ny)));
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [mouseNormX, mouseNormY]);

  // Restored full-screen majestic typography matching original scale exactly
  const getTitleClass = () => {
    switch (language) {
      case 'PT':
        return 'text-[11.8vw] sm:text-[12.6vw] md:text-[13.5vw] lg:text-[14.3vw]';
      case 'ES':
        return 'text-[10.8vw] sm:text-[11.6vw] md:text-[12.4vw] lg:text-[13.2vw]';
      case 'EN':
      default:
        return 'text-[13.5vw] sm:text-[14.5vw] md:text-[15.5vw] lg:text-[16.5vw]';
    }
  };

  return (
    <section
      ref={heroRef}
      className="h-screen w-full max-w-[100vw] flex flex-col justify-between relative bg-[#000000] overflow-hidden select-none"
    >
      {/* Layer 0: 3D Perspective Cyber Depth Grid in Pure Monochrome */}
      <DepthCyberGrid mouseX={smoothMouseX} mouseY={smoothMouseY} />

      {/* Layer 1: Background Atmospheric Pure Deep Black Vignette with Scroll Parallax */}
      <motion.div
        style={{ y: bgGlowY }}
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden [clip-path:inset(0)]"
      >
        {/* Subtle monochrome silver depth backlight */}
        <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-full max-w-[880px] h-[480px] bg-white/[0.015] rounded-full blur-[160px]" />
        {/* Deep pure black vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.98)_100%)]" />
      </motion.div>

      {/* Top Navbar */}
      <Navbar onContactClick={onContactClick} />

      {/* Layer 2: Main Background Typography with Depth Scroll Parallax */}
      <div className="w-full max-w-[100vw] absolute top-[13%] sm:top-[11%] md:top-[9%] lg:top-[8%] left-0 right-0 z-0 overflow-hidden pointer-events-none text-center px-2">
        {/* Subtle Monochrome Silver Radial Backlight behind Title */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[88vw] max-w-[1300px] h-[360px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04)_0%,transparent_70%)] blur-[80px] pointer-events-none -z-10" />

        <motion.div
          style={{
            y: titleScrollY,
            opacity: titleOpacity,
          }}
          className="w-full relative overflow-visible"
        >
          <FadeIn delay={0.15} y={30} duration={0.9} className="w-full overflow-visible">
            <h1
              className={`hero-metallic-title font-['Anton',sans-serif] uppercase tracking-tight leading-none whitespace-nowrap w-full mx-auto transition-all select-none overflow-visible ${getTitleClass()}`}
            >
              {t('hero.title')}
            </h1>
          </FadeIn>
        </motion.div>
      </div>

      {/* Layer 3: Centered 3D Character with Eye Tracking - Mobile-First Precision Scale */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 w-[220px] sm:w-[320px] md:w-[415px] lg:w-[460px] xl:w-[490px] top-[28%] sm:top-[28%] md:top-[25%] lg:top-[23%] translate-y-[20px] sm:translate-y-[45px] md:translate-y-[62px] pointer-events-auto">
        <FadeIn delay={0.3} y={20} duration={0.9} className="w-full flex justify-center">
          <InteractiveCharacter className="w-full" />
        </FadeIn>
      </div>

      {/* Layer 4: Bottom Headline Statement & High-Impact CTA */}
      <div className="w-full z-20 px-5 sm:px-8 md:px-12 lg:px-16 pb-6 sm:pb-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-4 relative mt-auto pointer-events-auto">
        {/* Left: Bio statement */}
        <div className="flex flex-col max-w-sm sm:max-w-md text-left">
          <span className="text-[#F8FAFC] font-medium text-xs sm:text-sm tracking-tight leading-snug">
            {t('hero.headline1')}
          </span>
          <span className="text-zinc-500 font-normal text-xs sm:text-sm tracking-tight leading-snug mt-0.5">
            {t('hero.headline2')}
          </span>
        </div>

        {/* Right: High-Converting International Elite CTA Button (Pure Platinum Monochrome - Min 44px Touch Target) */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Magnet strength={3.5} padding={100}>
            <motion.button
              type="button"
              onClick={onContactClick}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="w-full sm:w-auto min-h-[48px] group relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_35px_rgba(255,255,255,0.25)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] hover:bg-zinc-200 hover:text-black transition-all duration-300 cursor-pointer select-none"
            >
              <span>{t('hero.cta')}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-current transition-transform duration-300 group-hover:scale-150" />
            </motion.button>
          </Magnet>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
