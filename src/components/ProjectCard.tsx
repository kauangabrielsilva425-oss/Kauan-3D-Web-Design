import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LiveProjectButton } from './LiveProjectButton';
import { useLanguage } from '../context/LanguageContext';

export interface ProjectData {
  id: string;
  name: string;
  category: 'Client' | 'Personal';
  tags: string[];
  col1Image1: string;
  col1Image2: string;
  col2Image: string;
  link?: string;
  sector?: string;
  scope?: string;
  year?: string;
}

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  totalCards: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  totalCards,
}) => {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);

  // Target scale calculation: 1 - (totalCards - 1 - index) * 0.035
  const targetScale = 1 - (totalCards - 1 - index) * 0.035;

  // Track scroll as subsequent cards slide over this card
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start start', 'end start'],
  });

  // Track viewport progress for internal image parallax & expansion on scroll
  const { scrollYProgress: cardViewProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const imgParallax1 = useTransform(cardViewProgress, [0, 1], [-20, 20]);
  const imgParallax2 = useTransform(cardViewProgress, [0, 1], [20, -20]);
  const imgParallaxMain = useTransform(cardViewProgress, [0, 1], [-28, 28]);

  // Image expansion on scroll: As user scrolls into view, images expand from deep inset to full view
  const imgScale1 = useTransform(cardViewProgress, [0, 0.45, 1], [1.25, 1.04, 1.16]);
  const imgScale2 = useTransform(cardViewProgress, [0, 0.45, 1], [1.20, 1.04, 1.22]);
  const imgScaleMain = useTransform(cardViewProgress, [0, 0.45, 1], [1.26, 1.02, 1.16]);

  // Card entrance expansion & reveal
  const cardEntranceScale = useTransform(cardViewProgress, [0, 0.32], [0.94, 1]);
  const cardEntranceOpacity = useTransform(cardViewProgress, [0, 0.22], [0.45, 1]);

  const stackScale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const scale = useTransform(
    [cardEntranceScale, stackScale],
    ([entry, stack]) => (entry as number) * (stack as number)
  );

  const brightness = useTransform(
    scrollYProgress,
    [0, 1],
    index === totalCards - 1
      ? ['brightness(1)', 'brightness(1)']
      : ['brightness(1)', 'brightness(0.78)']
  );

  // Progressive sticky top offset and z-index hierarchy
  const zIndex = (index + 1) * 10;

  return (
    <div
      ref={cardRef}
      className={`sticky w-full max-w-6xl mx-auto ${
        index < totalCards - 1 ? 'mb-[32vh] sm:mb-[36vh] md:mb-[42vh]' : 'mb-16'
      }`}
      style={{
        top: `calc(4rem + ${index * 84}px)`,
        zIndex,
      }}
    >
      <motion.div
        style={{
          scale,
          opacity: cardEntranceOpacity,
          filter: brightness,
        }}
        className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border border-white/[0.08] bg-[#030305] p-4 sm:p-6 md:p-8 flex flex-col justify-between shadow-[0_25px_60px_-15px_rgba(0,0,0,1),0_0_20px_rgba(56,189,248,0.08)] origin-top transition-colors duration-300 hover:border-[#38BDF8]/50"
      >
        {/* Top Row: Number, category label, project name, tag badges, Live Project button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 sm:pb-6 border-b border-white/[0.08]">
          <div className="flex items-start sm:items-center gap-4 sm:gap-6 md:gap-8">
            {/* Number */}
            <span
              style={{ fontSize: 'clamp(2.2rem, 5vw, 4.2rem)' }}
              className="font-light tracking-tight text-[#223044] leading-none select-none"
            >
              {project.id}
            </span>

            {/* Project info */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-zinc-400">
                {project.category}
              </span>
              <h3 className="text-lg sm:text-2xl md:text-3xl font-medium uppercase tracking-[0.04em] text-[#F8FAFC]">
                {project.name}
              </h3>

              {/* Tag Badges beneath client name */}
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mt-0.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.14em] font-medium bg-[#000000]/90 text-zinc-300 border border-white/[0.08] select-none"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Metadata Row: Sector | Scope | Year (Harry Portugal style) */}
              {(project.sector || project.scope || project.year) && (
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] sm:text-[11px] font-mono tracking-wider text-zinc-400 mt-1.5 select-none pt-1">
                  {project.sector && (
                    <span className="flex items-center gap-1.5">
                      <span className="text-zinc-600">{t('projects.sector_label')}:</span>
                      <span className="text-zinc-300">{project.sector}</span>
                    </span>
                  )}
                  {project.scope && (
                    <span className="flex items-center gap-1.5">
                      <span className="text-zinc-600">{t('projects.scope_label')}:</span>
                      <span className="text-zinc-300">{project.scope}</span>
                    </span>
                  )}
                  {project.year && (
                    <span className="flex items-center gap-1.5">
                      <span className="text-zinc-600">{t('projects.year_label')}:</span>
                      <span className="text-zinc-300">{project.year}</span>
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Live Project Button */}
          <div className="self-start sm:self-auto shrink-0">
            <LiveProjectButton href={project.link || '#'} />
          </div>
        </div>

        {/* Bottom Row: Two-column image grid with Inner Portal Parallax & Expansion (Left: 40%, Right: 60%) */}
        <div className="pt-4 sm:pt-6 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-stretch">
          {/* Left Column (40% width / 5 cols) - 2 stacked images */}
          <div className="md:col-span-5 flex flex-col gap-4 sm:gap-6 justify-between">
            {/* Top image with parallax + expansion on scroll */}
            <div
              data-cursor="view"
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
              className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#000000] border border-white/[0.08] hover:border-[#38BDF8]/50 transition-colors duration-300 relative group/img cursor-pointer"
            >
              <motion.img
                style={{ y: imgParallax1, scale: imgScale1 }}
                src={project.col1Image1}
                alt={`${project.name} preview 1`}
                loading="lazy"
                className="w-full h-[122%] -top-[11%] relative object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] group-hover/img:scale-[1.04] transition-transform duration-500 ease-out will-change-transform"
                draggable={false}
              />
            </div>

            {/* Bottom image with parallax + expansion on scroll */}
            <div
              data-cursor="view"
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
              className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#000000] border border-white/[0.08] hover:border-[#38BDF8]/50 transition-colors duration-300 relative group/img cursor-pointer"
            >
              <motion.img
                style={{ y: imgParallax2, scale: imgScale2 }}
                src={project.col1Image2}
                alt={`${project.name} preview 2`}
                loading="lazy"
                className="w-full h-[122%] -top-[11%] relative object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] group-hover/img:scale-[1.04] transition-transform duration-500 ease-out will-change-transform"
                draggable={false}
              />
            </div>
          </div>

          {/* Right Column (60% width / 7 cols) - 1 tall image with parallax + expansion on scroll */}
          <div
            data-cursor="view"
            className="md:col-span-7 h-[260px] sm:h-[340px] md:h-full min-h-[260px] sm:min-h-[340px] md:min-h-[460px] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#000000] border border-white/[0.08] hover:border-[#38BDF8]/50 transition-colors duration-300 relative group/img cursor-pointer"
          >
            <motion.img
              style={{ y: imgParallaxMain, scale: imgScaleMain }}
              src={project.col2Image}
              alt={`${project.name} main preview`}
              loading="lazy"
              className="w-full h-[122%] -top-[11%] relative object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] group-hover/img:scale-[1.04] transition-transform duration-500 ease-out will-change-transform"
              draggable={false}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
