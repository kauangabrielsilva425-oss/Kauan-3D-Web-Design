import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { useLanguage } from '../context/LanguageContext';
import { AppleScrollRevealText } from './AppleScrollRevealText';

interface ServicesSectionProps {
  onContactClick?: () => void;
  onSelectService?: (slug: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onContactClick,
  onSelectService,
}) => {
  const { t, tLines, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const serviceCards = [
    {
      id: '01',
      slug: 'web-design',
      title: t('services.card1.title'),
      descriptionLines: tLines('services.card1.lines'),
      videoSrc: '/videos/service-video-2.mp4',
    },
    {
      id: '02',
      slug: 'creative-3d',
      title: t('services.card2.title'),
      descriptionLines: tLines('services.card2.lines'),
      videoSrc: '/videos/service-video-1.mp4',
    },
    {
      id: '03',
      slug: '3d-modeling',
      title: t('services.card3.title'),
      descriptionLines: tLines('services.card3.lines'),
      videoSrc: '/videos/service-video-3.mp4',
    },
    {
      id: '04',
      slug: 'motion-design',
      title: t('services.card4.title'),
      descriptionLines: tLines('services.card4.lines'),
      videoSrc: '/videos/service-video-4.mp4',
    },
  ];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const ambientGlowY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="bg-[#000000] text-[#F8FAFC] px-4 sm:px-6 md:px-10 py-20 sm:py-28 md:py-36 relative z-10 [overflow-x:clip]"
    >
      {/* Subtle Ambient Radial Backlight */}
      <motion.div
        style={{ y: ambientGlowY }}
        className="absolute top-[20%] left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[500px] bg-white/[0.01] rounded-full blur-[160px] pointer-events-none [clip-path:inset(0)]"
      />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16 md:mb-20">
          <FadeIn delay={0} y={30} duration={0.8}>
            <h2
              style={{ fontSize: 'clamp(2.5rem, 8vw, 84px)' }}
              className="font-black uppercase tracking-tight text-white leading-none select-none"
            >
              {t('services.title')}
            </h2>
          </FadeIn>

          <FadeIn delay={0.2} y={20} duration={0.8} className="w-full flex justify-center">
            <div className="mt-4 max-w-xl text-center">
              <AppleScrollRevealText
                text={t('services.subtitle') as string}
                className="text-sm sm:text-base md:text-lg text-zinc-400 font-light justify-center text-center"
                wordClassName="text-[#E2E8F0]"
              />
            </div>
          </FadeIn>
        </div>

        {/* 2x2 Bento Grid: Full-bleed Videos with Sleek Descriptions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-7">
          {serviceCards.map((card, index) => (
            <FadeIn key={card.id} delay={0.1 * (index + 1)} y={30} duration={0.8} className="h-full">
              <motion.div
                role="button"
                tabIndex={0}
                onClick={() => {
                  if (onSelectService) {
                    onSelectService(card.slug);
                  } else {
                    window.location.hash = `#/servico/${card.slug}`;
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (onSelectService) {
                      onSelectService(card.slug);
                    } else {
                      window.location.hash = `#/servico/${card.slug}`;
                    }
                  }
                }}
                whileHover={{
                  y: -16,
                  scale: 1.045,
                  transition: {
                    type: 'spring',
                    stiffness: 350,
                    damping: 18,
                    mass: 0.6,
                  },
                }}
                whileTap={{
                  scale: 0.965,
                  y: -4,
                  transition: {
                    type: 'spring',
                    stiffness: 600,
                    damping: 30,
                  },
                }}
                transition={{
                  type: 'spring',
                  stiffness: 320,
                  damping: 22,
                  mass: 0.7,
                }}
                className="group relative rounded-[28px] sm:rounded-[32px] md:rounded-[36px] apple-glass-card hover:border-white/50 hover:z-20 hover:shadow-[0_45px_100px_rgba(0,0,0,0.98),0_0_40px_rgba(255,255,255,0.12),inset_0_1px_1px_rgba(255,255,255,0.4)] overflow-hidden h-[380px] sm:h-[410px] md:h-[450px] cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col justify-between block no-underline select-none will-change-transform"
              >
                {/* Full-bleed HTML5 Video filling the entire card */}
                <video
                  src={card.videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-700 ease-out pointer-events-none select-none"
                />

                {/* Cinematic Vignette Overlay to ensure text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/75 pointer-events-none group-hover:opacity-90 transition-opacity duration-500" />

                {/* Card Title & Description at top-left */}
                <div className="relative z-10 px-6 sm:px-8 pt-6 sm:pt-8 max-w-lg">
                  <h3 className="text-white font-medium text-lg sm:text-xl md:text-[23px] tracking-tight drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
                    {card.title}
                  </h3>
                  <div className="mt-2.5 sm:mt-3 flex flex-col gap-1 max-w-[300px] sm:max-w-[340px] md:max-w-[380px]">
                    {card.descriptionLines.map((line, lIdx) => (
                      <p
                        key={lIdx}
                        className="text-[13.5px] sm:text-[15px] md:text-[16px] text-zinc-200/95 font-light leading-snug drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Bottom Row: Detail Action Badge on Hover */}
                <div className="relative z-10 px-6 sm:px-8 pb-6 sm:pb-8 flex items-center justify-between pointer-events-none">
                  <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-400">
                    // 0{index + 1}
                  </span>
                  <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg apple-glass-pill text-zinc-200 group-hover:bg-white group-hover:text-black group-hover:border-white text-[11px] font-mono tracking-wider transition-all duration-300 shadow-md">
                    <span>{language === 'EN' ? 'EXPLORE' : language === 'ES' ? 'VER DETALLES' : 'VER DETALHES'}</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
