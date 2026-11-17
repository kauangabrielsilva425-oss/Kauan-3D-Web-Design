import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle, Mail, Lock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

export interface ServiceDetailPillar {
  titleKey: string;
  descKey: string;
}

export interface ServiceDeliverable {
  titleKey: string;
  descKey: string;
}

export interface ServiceItemData {
  slug: string;
  id: string;
  titleKey: string;
  subtitleKey: string;
  aboutP1Key: string;
  aboutP2Key: string;
  showcaseKey: string;
  liveUrlKey: string;
  videoSrc: string;
  tools: string[];
  deliverables: ServiceDeliverable[];
  pillars: ServiceDetailPillar[];
}

export const ALL_SERVICES_DATA: ServiceItemData[] = [
  {
    slug: 'web-design',
    id: '01',
    titleKey: 'sp.s1.title',
    subtitleKey: 'sp.s1.subtitle',
    aboutP1Key: 'sp.s1.about_p1',
    aboutP2Key: 'sp.s1.about_p2',
    showcaseKey: 'sp.s1.showcase',
    liveUrlKey: 'sp.s1.live_url',
    videoSrc: '/videos/service-video-2.mp4',
    tools: ['Figma', 'React 18', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Lenis Scroll'],
    deliverables: [
      { titleKey: 'sp.s1.d1.title', descKey: 'sp.s1.d1.desc' },
      { titleKey: 'sp.s1.d2.title', descKey: 'sp.s1.d2.desc' },
      { titleKey: 'sp.s1.d3.title', descKey: 'sp.s1.d3.desc' },
      { titleKey: 'sp.s1.d4.title', descKey: 'sp.s1.d4.desc' },
    ],
    pillars: [
      { titleKey: 'sp.s1.p1.title', descKey: 'sp.s1.p1.desc' },
      { titleKey: 'sp.s1.p2.title', descKey: 'sp.s1.p2.desc' },
      { titleKey: 'sp.s1.p3.title', descKey: 'sp.s1.p3.desc' },
      { titleKey: 'sp.s1.p4.title', descKey: 'sp.s1.p4.desc' },
    ],
  },
  {
    slug: 'creative-3d',
    id: '02',
    titleKey: 'sp.s2.title',
    subtitleKey: 'sp.s2.subtitle',
    aboutP1Key: 'sp.s2.about_p1',
    aboutP2Key: 'sp.s2.about_p2',
    showcaseKey: 'sp.s2.showcase',
    liveUrlKey: 'sp.s2.live_url',
    videoSrc: '/videos/service-video-1.mp4',
    tools: ['Three.js', 'React Three Fiber', 'WebGL', 'GLSL Shaders', 'Blender', 'GSAP'],
    deliverables: [
      { titleKey: 'sp.s2.d1.title', descKey: 'sp.s2.d1.desc' },
      { titleKey: 'sp.s2.d2.title', descKey: 'sp.s2.d2.desc' },
      { titleKey: 'sp.s2.d3.title', descKey: 'sp.s2.d3.desc' },
      { titleKey: 'sp.s2.d4.title', descKey: 'sp.s2.d4.desc' },
    ],
    pillars: [
      { titleKey: 'sp.s2.p1.title', descKey: 'sp.s2.p1.desc' },
      { titleKey: 'sp.s2.p2.title', descKey: 'sp.s2.p2.desc' },
      { titleKey: 'sp.s2.p3.title', descKey: 'sp.s2.p3.desc' },
      { titleKey: 'sp.s2.p4.title', descKey: 'sp.s2.p4.desc' },
    ],
  },
  {
    slug: '3d-modeling',
    id: '03',
    titleKey: 'sp.s3.title',
    subtitleKey: 'sp.s3.subtitle',
    aboutP1Key: 'sp.s3.about_p1',
    aboutP2Key: 'sp.s3.about_p2',
    showcaseKey: 'sp.s3.showcase',
    liveUrlKey: 'sp.s3.live_url',
    videoSrc: '/videos/service-video-3.mp4',
    tools: ['Blender', 'Cinema 4D', 'ZBrush', 'Substance Painter', 'Octane Render', 'Cycles'],
    deliverables: [
      { titleKey: 'sp.s3.d1.title', descKey: 'sp.s3.d1.desc' },
      { titleKey: 'sp.s3.d2.title', descKey: 'sp.s3.d2.desc' },
      { titleKey: 'sp.s3.d3.title', descKey: 'sp.s3.d3.desc' },
      { titleKey: 'sp.s3.d4.title', descKey: 'sp.s3.d4.desc' },
    ],
    pillars: [
      { titleKey: 'sp.s3.p1.title', descKey: 'sp.s3.p1.desc' },
      { titleKey: 'sp.s3.p2.title', descKey: 'sp.s3.p2.desc' },
      { titleKey: 'sp.s3.p3.title', descKey: 'sp.s3.p3.desc' },
      { titleKey: 'sp.s3.p4.title', descKey: 'sp.s3.p4.desc' },
    ],
  },
  {
    slug: 'motion-design',
    id: '04',
    titleKey: 'sp.s4.title',
    subtitleKey: 'sp.s4.subtitle',
    aboutP1Key: 'sp.s4.about_p1',
    aboutP2Key: 'sp.s4.about_p2',
    showcaseKey: 'sp.s4.showcase',
    liveUrlKey: 'sp.s4.live_url',
    videoSrc: '/videos/service-video-4.mp4',
    tools: ['Adobe After Effects', 'Adobe Premiere Pro', 'Cinema 4D', 'Illustrator', 'Photoshop'],
    deliverables: [
      { titleKey: 'sp.s4.d1.title', descKey: 'sp.s4.d1.desc' },
      { titleKey: 'sp.s4.d2.title', descKey: 'sp.s4.d2.desc' },
      { titleKey: 'sp.s4.d3.title', descKey: 'sp.s4.d3.desc' },
      { titleKey: 'sp.s4.d4.title', descKey: 'sp.s4.d4.desc' },
    ],
    pillars: [
      { titleKey: 'sp.s4.p1.title', descKey: 'sp.s4.p1.desc' },
      { titleKey: 'sp.s4.p2.title', descKey: 'sp.s4.p2.desc' },
      { titleKey: 'sp.s4.p3.title', descKey: 'sp.s4.p3.desc' },
      { titleKey: 'sp.s4.p4.title', descKey: 'sp.s4.p4.desc' },
    ],
  },
];

export interface ServicePageProps {
  slug: string;
  onBack: () => void;
  onOpenContact?: (serviceName?: string) => void;
  onSelectService?: (slug: string) => void;
}

export const ServicePage: React.FC<ServicePageProps> = ({
  slug,
  onBack,
  onOpenContact,
  onSelectService,
}) => {
  const { t, language } = useLanguage();

  const current =
    ALL_SERVICES_DATA.find((s) => s.slug === slug) ||
    ALL_SERVICES_DATA[0];

  useEffect(() => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [slug]);

  const serviceTitle = t(current.titleKey);
  const serviceSubtitle = t(current.subtitleKey);

  const getWhatsAppUrl = () => {
    let msg = `Olá Kauan! Gostaria de conversar sobre o serviço de ${serviceTitle} para o meu projeto.`;
    if (language === 'EN') {
      msg = `Hi Kauan! I would like to discuss the ${serviceTitle} service for my project.`;
    } else if (language === 'ES') {
      msg = `¡Hola Kauan! Me gustaría conversar sobre el servicio de ${serviceTitle} para mi proyecto.`;
    }
    return `https://wa.me/5531996571669?text=${encodeURIComponent(msg)}`;
  };

  const getMailtoUrl = () => {
    const subject = encodeURIComponent(`[Kauan Gabriel] Orçamento - ${serviceTitle}`);
    const body = encodeURIComponent(
      `Olá Kauan,\n\nTenho interesse em contratar o serviço de ${serviceTitle} e gostaria de entender escopo, valores e prazos disponíveis.\n\nAguardo retorno!`
    );
    return `mailto:kauangabrielsilva425@gmail.com?subject=${subject}&body=${body}`;
  };

  const otherServices = ALL_SERVICES_DATA.filter((s) => s.slug !== current.slug);

  return (
    <div className="w-full min-h-screen bg-[#000000] text-[#F8FAFC] font-['Kanit',sans-serif] selection:bg-white/20 select-none pb-28">
      {/* Top Fixed / Sticky Navigation Bar with Liquid Glass */}
      <header className="sticky top-0 z-40 w-full apple-glass-surface px-6 sm:px-10 md:px-16 py-4 flex items-center justify-between">
        <motion.button
          type="button"
          onClick={onBack}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 420, damping: 20, mass: 0.6 }}
          className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-xl apple-glass-pill text-xs font-mono uppercase tracking-[0.16em] text-zinc-300 hover:text-white cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          <span>{t('service_page.back')}</span>
        </motion.button>

        <span className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400 hidden sm:inline-block">
          KAUAN GABRIEL // {t('sp.badge_specialty')} 0{current.id} DE 04
        </span>

        <div className="flex items-center">
          <LanguageSelector />
        </div>
      </header>

      {/* Main Container - Lightweight, Breathable Editorial Architecture */}
      <main className="max-w-5xl mx-auto px-6 sm:px-10 pt-10 sm:pt-16 flex flex-col gap-12 sm:gap-16">
        
        {/* 1. Header: Big Bold Headline + Elegant Subtitle + Subtle Stack Pills */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-300 text-xs font-mono tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
            <span>{t('sp.badge_specialty')} // 0{current.id}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-[1.08]">
            {serviceTitle}
          </h1>

          <p className="mt-4 text-base sm:text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-2xl">
            {serviceSubtitle}
          </p>

          {/* Minimalist Tech Stack Badges directly integrated */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {current.tools.map((tool, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg bg-zinc-950/60 border border-white/[0.06] text-xs font-mono text-zinc-300 tracking-wide"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* 2. Hero Video Showcase: The Project Star (Full-bleed Browser Mockup) */}
        <div className="w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/[0.1] bg-[#020203] shadow-[0_30px_90px_rgba(0,0,0,0.95)]">
          {/* Minimalist Browser Frame Top Bar */}
          <div className="px-5 py-3.5 bg-black/60 backdrop-blur-xl border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            </div>
            
            <div className="px-4 py-1.5 rounded-lg apple-glass-pill text-[11px] font-mono text-zinc-300 flex items-center gap-2 max-w-[280px] sm:max-w-[360px] truncate">
              <Lock className="w-3 h-3 text-zinc-400" />
              <span className="truncate">{t(current.liveUrlKey)}</span>
            </div>

            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-zinc-400">
              <span className="hidden sm:inline">{t('sp.live_showcase')}</span>
            </div>
          </div>

          {/* Video Container */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9.5] w-full bg-[#020203] overflow-hidden flex items-center justify-center">
            <video
              src={current.videoSrc}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-contain sm:object-cover pointer-events-none"
              style={{ imageRendering: 'auto' }}
            />
          </div>
        </div>

        {/* 3. Concise Overview: Clean editorial paragraph on pure black (No heavy floating card) */}
        <div className="max-w-3xl mx-auto text-center px-4">
          <p className="text-base sm:text-lg md:text-xl text-zinc-200 font-light leading-relaxed">
            {t(current.aboutP1Key)}
          </p>
        </div>

        {/* 4. Deliverables & Capabilities: 4 Clean, High-Impact Cards (Eliminating redundant boxes) */}
        <div className="flex flex-col gap-6 w-full">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-[0.22em] text-[#38BDF8]">
              // {t('sp.deliverables_title')}
            </span>
            <div className="h-px flex-1 bg-white/[0.08]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {current.deliverables.map((item, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl bg-zinc-950/40 border border-white/[0.06] hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 block mb-2 tracking-widest uppercase">
                    0{idx + 1} // {language === 'EN' ? 'DELIVERABLE' : language === 'ES' ? 'ENTREGABLE' : 'ENTREGA'}
                  </span>
                  <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight uppercase leading-snug">
                    {t(item.titleKey)}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 font-light mt-2.5 leading-relaxed">
                    {t(item.descKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Direct Conversion Card: Streamlined, Elegant, No Duplicated Clutter */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-zinc-950/80 to-black border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col text-center md:text-left">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#38BDF8] mb-1">
              // {language === 'EN' ? 'READY TO START?' : language === 'ES' ? '¿LISTO PARA COMENZAR?' : 'PRONTO PARA INICIAR?'}
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight uppercase">
              {t('service_page.cta_title')}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-light mt-1 max-w-lg">
              {t('service_page.cta_desc')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <motion.a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white text-black font-semibold text-xs font-mono uppercase tracking-wider hover:bg-zinc-200 transition-colors shadow-lg cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-black" />
              <span>{language === 'EN' ? 'Direct WhatsApp' : language === 'ES' ? 'WhatsApp Directo' : 'WhatsApp Direto'}</span>
            </motion.a>

            <motion.a
              href={getMailtoUrl()}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-zinc-900/80 border border-white/10 text-white font-medium text-xs font-mono uppercase tracking-wider hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <Mail className="w-4 h-4 text-zinc-400" />
              <span>E-mail</span>
            </motion.a>

            {onOpenContact && (
              <motion.button
                type="button"
                onClick={() => onOpenContact(serviceTitle)}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-transparent border border-white/[0.08] text-zinc-400 hover:text-white text-xs font-mono uppercase tracking-wider cursor-pointer"
              >
                <span>{t('service_detail.btn_form')}</span>
                <span>→</span>
              </motion.button>
            )}
          </div>
        </div>

        {/* 6. Explore Other Specialties: Subtle, Compact Navigation at Bottom */}
        <div className="flex flex-col gap-4 pt-4 border-t border-white/[0.06]">
          <span className="text-xs font-mono uppercase tracking-[0.22em] text-zinc-500">
            // {t('sp.other_services_title')}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {otherServices.map((other) => (
              <motion.button
                key={other.slug}
                type="button"
                onClick={() => {
                  if (onSelectService) {
                    onSelectService(other.slug);
                  } else {
                    window.location.hash = `#/servico/${other.slug}`;
                  }
                }}
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 rounded-xl bg-zinc-950/40 border border-white/[0.05] hover:border-white/20 text-left cursor-pointer flex flex-col justify-between group transition-all"
              >
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 block">
                    // 0{other.id}
                  </span>
                  <span className="text-xs font-bold text-white uppercase block mt-1 group-hover:text-zinc-200">
                    {t(other.titleKey)}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-zinc-400 mt-3 group-hover:text-white transition-colors flex items-center gap-1">
                  <span>{language === 'EN' ? 'View service' : language === 'ES' ? 'Ver detalles' : 'Ver detalhes'}</span>
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </span>
              </motion.button>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
};

export default ServicePage;
