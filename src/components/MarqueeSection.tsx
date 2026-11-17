import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ALL_IMAGES = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
];

// Row 1: first 11 images, tripled
const ROW_1_SOURCE = ALL_IMAGES.slice(0, 11);
const ROW_1_ITEMS = [...ROW_1_SOURCE, ...ROW_1_SOURCE, ...ROW_1_SOURCE];

// Row 2: remaining 10 images, tripled
const ROW_2_SOURCE = ALL_IMAGES.slice(11);
const ROW_2_ITEMS = [...ROW_2_SOURCE, ...ROW_2_SOURCE, ...ROW_2_SOURCE];

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !row1Ref.current || !row2Ref.current) return;

    const ctx = gsap.context(() => {
      // Row 1 drifts smoothly to the right as user scrolls down (Slow, High-Inertia Drift)
      gsap.fromTo(
        row1Ref.current,
        { x: -380 },
        {
          x: 240,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2.0,
          },
        }
      );

      // Row 2 drifts smoothly to the left as user scrolls down
      gsap.fromTo(
        row2Ref.current,
        { x: 180 },
        {
          x: -440,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2.0,
          },
        }
      );

      // Image expansion and reveal on scroll as gallery enters viewport
      gsap.fromTo(
        '.marquee-card',
        { scale: 0.88, opacity: 0.55 },
        {
          scale: 1,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            end: 'top 20%',
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
      className="bg-[#000000] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden w-full select-none relative"
    >
      {/* Background subtle radial blue lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[350px] bg-[#0EA5E9]/05 rounded-full blur-[140px] pointer-events-none" />

      <div className="flex flex-col gap-3.5 w-full relative z-10">
        {/* Row 1 - Moves RIGHT on scroll via GSAP ScrollTrigger */}
        <div className="w-full overflow-hidden">
          <div
            ref={row1Ref}
            className="flex gap-3.5 w-max"
          >
            {ROW_1_ITEMS.map((src, index) => (
              <div
                key={`row1-${index}`}
                className="marquee-card w-[420px] h-[270px] min-w-[420px] rounded-2xl overflow-hidden bg-[#030305] border border-white/[0.08] flex-shrink-0 shadow-[0_8px_25px_rgba(0,0,0,0.95)] hover:border-[#38BDF8]/50 transition-colors will-change-transform"
              >
                <img
                  src={src}
                  alt={`Marquee preview ${index + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover rounded-2xl pointer-events-none"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - Moves LEFT on scroll via GSAP ScrollTrigger */}
        <div className="w-full overflow-hidden">
          <div
            ref={row2Ref}
            className="flex gap-3.5 w-max"
          >
            {ROW_2_ITEMS.map((src, index) => (
              <div
                key={`row2-${index}`}
                className="marquee-card w-[420px] h-[270px] min-w-[420px] rounded-2xl overflow-hidden bg-[#030305] border border-white/[0.08] flex-shrink-0 shadow-[0_8px_25px_rgba(0,0,0,0.95)] hover:border-[#38BDF8]/50 transition-colors will-change-transform"
              >
                <img
                  src={src}
                  alt={`Marquee preview ${index + 12}`}
                  loading="lazy"
                  className="w-full h-full object-cover rounded-2xl pointer-events-none"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
