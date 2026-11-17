import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { useLanguage } from '../context/LanguageContext';

interface ApproachSectionProps {
  onContactClick?: () => void;
}

export const ApproachSection: React.FC<ApproachSectionProps> = ({ onContactClick }) => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const CARDS = [
    {
      num: '01',
      titleKey: 'approach.card1.title',
      descKey: 'approach.card1.desc',
      tags: ['approach.card1.tag1', 'approach.card1.tag2', 'approach.card1.tag3'],
    },
    {
      num: '02',
      titleKey: 'approach.card2.title',
      descKey: 'approach.card2.desc',
      tags: ['approach.card2.tag1', 'approach.card2.tag2', 'approach.card2.tag3'],
    },
    {
      num: '03',
      titleKey: 'approach.card3.title',
      descKey: 'approach.card3.desc',
      tags: ['approach.card3.tag1', 'approach.card3.tag2', 'approach.card3.tag3'],
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="approach"
      className="bg-[#000000] relative z-10 px-6 sm:px-10 md:px-16 lg:px-20 py-24 sm:py-32 border-t border-white/[0.06] select-none"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-white/[0.02] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="mb-14 sm:mb-20">
          <FadeIn delay={0} y={20} duration={0.7}>
            <span className="text-[11px] sm:text-[12px] font-mono tracking-[0.25em] text-zinc-400 uppercase select-none block mb-3">
              {t('approach.badge')}
            </span>
          </FadeIn>

          <FadeIn delay={0.1} y={25} duration={0.8}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight uppercase leading-[1.1] text-white">
              <span>{t('approach.title_p1')}</span>
              <br />
              <span className="text-zinc-500">{t('approach.title_p2')}</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.2} y={25} duration={0.8}>
            <p className="mt-6 max-w-2xl text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
              {t('approach.subtitle')}
            </p>
          </FadeIn>
        </div>

        {/* 3 Value Pillars / Approach Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {CARDS.map((card, idx) => (
            <FadeIn key={card.num} delay={0.15 + idx * 0.1} y={30} duration={0.85}>
              <motion.div
                whileHover={{
                  y: -8,
                  scale: 1.025,
                  transition: {
                    type: 'spring',
                    stiffness: 350,
                    damping: 20,
                    mass: 0.65,
                  },
                }}
                whileTap={{ scale: 0.98 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 24,
                  mass: 0.7,
                }}
                className="group relative h-full flex flex-col justify-between p-7 sm:p-8 rounded-2xl apple-glass-card hover:border-white/30 shadow-[0_15px_40px_rgba(0,0,0,0.85)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.95)] cursor-default"
              >
                {/* Card Top: Large Monospace Index and Corner Glow */}
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-white/[0.06]">
                    <span className="text-3xl sm:text-4xl font-mono font-light text-zinc-500 group-hover:text-white transition-colors duration-300">
                      {card.num}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-[#38BDF8] group-hover:shadow-[0_0_10px_#38BDF8] transition-all duration-300" />
                  </div>

                  <h3 className="mt-6 text-xl sm:text-2xl font-medium text-white tracking-tight leading-snug group-hover:text-zinc-100 transition-colors">
                    {t(card.titleKey)}
                  </h3>

                  <p className="mt-4 text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                    {t(card.descKey)}
                  </p>
                </div>

                {/* Card Bottom: Metadata Tags */}
                <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-wrap gap-2">
                  {card.tags.map((tagKey) => (
                    <span
                      key={tagKey}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-mono tracking-[0.14em] uppercase text-zinc-300 apple-glass-pill select-none"
                    >
                      {t(tagKey)}
                    </span>
                  ))}
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* Bottom CTA Hook */}
        <FadeIn delay={0.4} y={20} duration={0.8} className="mt-14 sm:mt-16 flex justify-center">
          <button
            type="button"
            onClick={onContactClick}
            className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-[#030305] hover:bg-white/[0.06] border border-white/[0.12] hover:border-white/30 text-xs sm:text-sm font-mono uppercase tracking-[0.16em] text-zinc-200 hover:text-white transition-all duration-300 cursor-pointer shadow-lg"
          >
            <span>{t('about.cta')}</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </FadeIn>
      </div>
    </section>
  );
};
