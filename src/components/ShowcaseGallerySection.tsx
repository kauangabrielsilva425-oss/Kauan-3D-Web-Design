import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FadeIn } from './FadeIn';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

interface ShowcaseItem {
  src: string;
  title: string;
  tag: string;
  year: string;
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    src: 'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
    title: 'Space Voyage',
    tag: '3D WebGL',
    year: '2026',
  },
  {
    src: 'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
    title: 'CodeNest Interactive',
    tag: 'UI / UX Dev',
    year: '2026',
  },
  {
    src: 'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
    title: 'Vex Ventures',
    tag: 'CGI Branding',
    year: '2025',
  },
  {
    src: 'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
    title: 'Stellar System',
    tag: 'Motion Reel',
    year: '2026',
  },
  {
    src: 'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
    title: 'ASME Concept',
    tag: '3D Render',
    year: '2025',
  },
  {
    src: 'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
    title: 'Data Kinetic',
    tag: 'Creative Dev',
    year: '2026',
  },
  {
    src: 'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
    title: 'Vitara Motors',
    tag: 'Automotive 3D',
    year: '2025',
  },
  {
    src: 'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
    title: 'Terra World',
    tag: 'Environment 3D',
    year: '2026',
  },
  {
    src: 'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
    title: 'SkyElite Jet',
    tag: 'Photoreal CGI',
    year: '2025',
  },
  {
    src: 'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
    title: 'Aethera OS',
    tag: 'Cyber Interface',
    year: '2026',
  },
  {
    src: 'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
    title: 'DesignPro Lab',
    tag: 'Interactive Dev',
    year: '2025',
  },
  {
    src: 'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
    title: 'Stellar Intelligence',
    tag: 'Real-Time WebGL',
    year: '2026',
  },
  {
    src: 'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
    title: 'X-Portfolio',
    tag: 'Kinetic Layout',
    year: '2025',
  },
  {
    src: 'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
    title: 'Orbit Decentralized',
    tag: 'Web3 & 3D',
    year: '2026',
  },
  {
    src: 'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
    title: 'Nexora Cyber',
    tag: 'Volumetric Lights',
    year: '2025',
  },
  {
    src: 'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
    title: 'Celestia Brand',
    tag: 'Identity & CGI',
    year: '2026',
  },
];

const ROW_1_SOURCE = SHOWCASE_ITEMS.slice(0, 8);
const ROW_1_ITEMS = [...ROW_1_SOURCE, ...ROW_1_SOURCE, ...ROW_1_SOURCE];

const ROW_2_SOURCE = SHOWCASE_ITEMS.slice(8);
const ROW_2_ITEMS = [...ROW_2_SOURCE, ...ROW_2_SOURCE, ...ROW_2_SOURCE];

export const ShowcaseGallerySection: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !row1Ref.current || !row2Ref.current) return;

    const ctx = gsap.context(() => {
      // Row 1 drifts smoothly to the right on scroll
      gsap.fromTo(
        row1Ref.current,
        { x: -350 },
        {
          x: 200,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.8,
          },
        }
      );

      // Row 2 drifts smoothly to the left on scroll
      gsap.fromTo(
        row2Ref.current,
        { x: 180 },
        {
          x: -370,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.8,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="showcase"
      className="bg-[#000000] relative z-10 pt-24 sm:pt-32 pb-16 overflow-hidden w-full select-none border-t border-white/[0.06]"
    >
      {/* Background Subtle Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[350px] bg-white/[0.015] rounded-full blur-[140px] pointer-events-none" />

      {/* Header Container */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-16 lg:px-20 mb-12 sm:mb-16 relative z-10">
        <FadeIn delay={0} y={20} duration={0.7}>
          <span className="text-[11px] sm:text-[12px] font-mono tracking-[0.25em] text-zinc-400 uppercase select-none block mb-3">
            {t('showcase.badge')}
          </span>
        </FadeIn>

        <FadeIn delay={0.1} y={25} duration={0.8}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight uppercase leading-[1.1] text-white">
            {t('showcase.title')}
          </h2>
        </FadeIn>

        <FadeIn delay={0.2} y={25} duration={0.8}>
          <p className="mt-4 max-w-2xl text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
            {t('showcase.subtitle')}
          </p>
        </FadeIn>
      </div>

      {/* Infinite Horizontal Parallax Stream */}
      <div className="flex flex-col gap-4 w-full relative z-10">
        {/* Row 1 - Drifts Right */}
        <div className="w-full overflow-hidden">
          <div ref={row1Ref} className="flex gap-4 w-max">
            {ROW_1_ITEMS.map((item, index) => (
              <div
                key={`row1-${index}`}
                className="group relative w-[360px] sm:w-[420px] h-[240px] sm:h-[270px] min-w-[360px] sm:min-w-[420px] rounded-2xl overflow-hidden bg-[#030305] border border-white/[0.08] hover:border-white/30 flex-shrink-0 shadow-[0_10px_30px_rgba(0,0,0,0.9)] transition-all duration-500"
              >
                {/* Image with grayscale filter like Harry Portugal, smoothly revealing color on hover */}
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover filter grayscale contrast-[1.05] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out pointer-events-none"
                  draggable={false}
                />

                {/* Subtle vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

                {/* Card Info Overlay */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono pointer-events-none">
                  <div className="flex flex-col">
                    <span className="text-white font-medium text-xs tracking-tight">
                      {item.title}
                    </span>
                    <span className="text-[10px] text-zinc-400 tracking-wider uppercase mt-0.5">
                      {item.tag}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-black/60 border border-white/10 text-[10px] text-zinc-400">
                    {item.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - Drifts Left */}
        <div className="w-full overflow-hidden">
          <div ref={row2Ref} className="flex gap-4 w-max">
            {ROW_2_ITEMS.map((item, index) => (
              <div
                key={`row2-${index}`}
                className="group relative w-[360px] sm:w-[420px] h-[240px] sm:h-[270px] min-w-[360px] sm:min-w-[420px] rounded-2xl overflow-hidden bg-[#030305] border border-white/[0.08] hover:border-white/30 flex-shrink-0 shadow-[0_10px_30px_rgba(0,0,0,0.9)] transition-all duration-500"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover filter grayscale contrast-[1.05] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out pointer-events-none"
                  draggable={false}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono pointer-events-none">
                  <div className="flex flex-col">
                    <span className="text-white font-medium text-xs tracking-tight">
                      {item.title}
                    </span>
                    <span className="text-[10px] text-zinc-400 tracking-wider uppercase mt-0.5">
                      {item.tag}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-black/60 border border-white/10 text-[10px] text-zinc-400">
                    {item.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
