import React, { useRef } from 'react';
import { FadeIn } from './FadeIn';
import { useLanguage } from '../context/LanguageContext';

interface TestimonialItem {
  quoteKey: string;
  authorKey: string;
  roleKey: string;
  companyKey: string;
  initials: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    quoteKey: 'testimonials.q1.text',
    authorKey: 'testimonials.q1.author',
    roleKey: 'testimonials.q1.role',
    companyKey: 'testimonials.q1.company',
    initials: 'GM',
  },
  {
    quoteKey: 'testimonials.q2.text',
    authorKey: 'testimonials.q2.author',
    roleKey: 'testimonials.q2.role',
    companyKey: 'testimonials.q2.company',
    initials: 'LV',
  },
  {
    quoteKey: 'testimonials.q3.text',
    authorKey: 'testimonials.q3.author',
    roleKey: 'testimonials.q3.role',
    companyKey: 'testimonials.q3.company',
    initials: 'MS',
  },
];

export const TestimonialsSection: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="bg-[#000000] relative z-10 px-6 sm:px-10 md:px-16 lg:px-20 py-24 sm:py-32 border-t border-white/[0.06] select-none"
    >
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[350px] bg-white/[0.015] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Header */}
        <div className="mb-14 sm:mb-20">
          <FadeIn delay={0} y={20} duration={0.7}>
            <span className="text-[11px] sm:text-[12px] font-mono tracking-[0.25em] text-zinc-400 uppercase select-none block mb-3">
              {t('testimonials.badge')}
            </span>
          </FadeIn>

          <FadeIn delay={0.1} y={25} duration={0.8}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight uppercase leading-[1.1] text-white">
              {t('testimonials.title')}
            </h2>
          </FadeIn>

          <FadeIn delay={0.2} y={25} duration={0.8}>
            <p className="mt-4 max-w-2xl text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
              {t('testimonials.subtitle')}
            </p>
          </FadeIn>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((item, idx) => (
            <FadeIn key={item.initials} delay={0.15 + idx * 0.1} y={30} duration={0.85}>
              <div className="group relative h-full flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-[#030305] border border-white/[0.08] hover:border-white/20 transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.95)]">
                {/* Quote Body */}
                <div>
                  {/* Subtle Monochrome Quote Icon */}
                  <div className="text-2xl text-zinc-600 font-serif select-none mb-4 group-hover:text-zinc-400 transition-colors">
                    “
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                    {t(item.quoteKey)}
                  </p>
                </div>

                {/* Author Info */}
                <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center gap-3.5">
                  {/* Initials Avatar */}
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.1] flex items-center justify-center text-xs font-mono font-medium text-zinc-300 shrink-0">
                    {item.initials}
                  </div>

                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-medium text-white tracking-tight truncate">
                      {t(item.authorKey)}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400 tracking-wider truncate">
                      {t(item.roleKey)} • {t(item.companyKey)}
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
