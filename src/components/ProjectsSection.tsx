import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { SpotlightCard } from './ui/SpotlightCard';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUpRight, Sparkles, FolderGit2 } from 'lucide-react';
import { Magnet } from './Magnet';

export type ProjectCategory = 'all' | 'landing' | 'ecommerce' | 'institutional';

export interface ProjectItem {
  id: string;
  category: 'landing' | 'ecommerce' | 'institutional';
  categoryLabel: { PT: string; EN: string; ES: string };
  title: string;
  subtitle: { PT: string; EN: string; ES: string };
  description: { PT: string; EN: string; ES: string };
  tags: string[];
  year: string;
  image: string;
  link?: string;
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: '01',
    category: 'landing',
    categoryLabel: { PT: 'Landing Page', EN: 'Landing Page', ES: 'Landing Page' },
    title: 'Nextlevel Space',
    subtitle: {
      PT: 'Plataforma Criativa & Experiência Espacial',
      EN: 'Creative Platform & Spatial Experience',
      ES: 'Plataforma Creativa & Experiencia Espacial',
    },
    description: {
      PT: 'Landing page de altíssima conversão com ambiente 3D interativo, transições fluidas e direção de arte cinematográfica.',
      EN: 'High-converting landing page featuring an interactive 3D environment, fluid transitions, and cinematic art direction.',
      ES: 'Landing page de alta conversión con entorno 3D interactivo, transiciones fluidas y dirección de arte cinematográfica.',
    },
    tags: ['WebGL 3D', 'React', 'Three.js', 'Tailwind CSS'],
    year: '2026',
    image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
  },
  {
    id: '02',
    category: 'institutional',
    categoryLabel: { PT: 'Institucional', EN: 'Institutional', ES: 'Institucional' },
    title: 'Aura Tech',
    subtitle: {
      PT: 'Hardware de Luxo & Inteligência Espacial',
      EN: 'Luxury Hardware & Spatial Intelligence',
      ES: 'Hardware de Lujo & Inteligencia Espacial',
    },
    description: {
      PT: 'Portal institucional para marca de hardware premium com iluminação cinemática e microinterações de precisão.',
      EN: 'Institutional portal for a premium hardware brand with photorealistic cinematic lighting and precision micro-interactions.',
      ES: 'Portal institucional para marca de hardware premium con iluminación cinematográfica fotorrealista y microinteracciones de precisión.',
    },
    tags: ['Branding', 'Modelagem 3D', 'UI/UX', 'Framer'],
    year: '2026',
    image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
  },
  {
    id: '03',
    category: 'ecommerce',
    categoryLabel: { PT: 'E-Commerce & 3D', EN: 'E-Commerce & 3D', ES: 'E-Commerce & 3D' },
    title: 'Solaris Digital',
    subtitle: {
      PT: 'Plataforma Web3 & Ativos Digitais',
      EN: 'Web3 Platform & Digital Assets',
      ES: 'Plataforma Web3 & Activos Digitales',
    },
    description: {
      PT: 'E-commerce imersivo com vitrine dinâmica de produtos em 3D tempo real e checkout ultra-rápido sem fricção.',
      EN: 'Immersive e-commerce featuring real-time 3D product display and frictionless ultra-fast checkout.',
      ES: 'E-commerce inmersivo con escaparate dinámico de productos en 3D en tiempo real y checkout ultra-rápido sin fricción.',
    },
    tags: ['E-Commerce', 'Web3', 'Three.js', 'Next.js'],
    year: '2026',
    image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
  },
  {
    id: '04',
    category: 'landing',
    categoryLabel: { PT: 'Landing Page', EN: 'Landing Page', ES: 'Landing Page' },
    title: 'Space Voyage',
    subtitle: {
      PT: 'Aeroespacial & Exploração Científica',
      EN: 'Aerospace & Scientific Exploration',
      ES: 'Aeroespacial & Exploración Científica',
    },
    description: {
      PT: 'Experiência web interativa guiando o visitante através da física espacial, propulsão orbital e design imersivo.',
      EN: 'Interactive web experience guiding visitors through space physics, orbital propulsion, and immersive design.',
      ES: 'Experiencia web interactiva que guía al visitante a través de la física espacial, propulsión orbital y diseño inmersivo.',
    },
    tags: ['Landing Page', 'WebGL', 'GSAP', 'Shader GLSL'],
    year: '2026',
    image: '/cubes/img10.jpeg',
  },
  {
    id: '05',
    category: 'ecommerce',
    categoryLabel: { PT: 'E-Commerce & 3D', EN: 'E-Commerce & 3D', ES: 'E-Commerce & 3D' },
    title: 'Vitara Motors',
    subtitle: {
      PT: 'Configurador 3D Real-Time',
      EN: 'Real-Time 3D Configurator',
      ES: 'Configurador 3D en Tiempo Real',
    },
    description: {
      PT: 'Configurador automotivo interativo com renderização em 360°, troca dinâmica de materiais PBR e simulação de iluminação HDR.',
      EN: 'Interactive 3D car configurator with 360° rendering, real-time PBR material swap, and HDR cinematic simulation.',
      ES: 'Configurador automotivo interactivo con renderizado 360°, cambio de materiales PBR en tiempo real y simulación HDR.',
    },
    tags: ['Configurador 3D', 'WebGL', 'PBR Materials', 'React'],
    year: '2026',
    image: '/cubes/img16.jpeg',
  },
  {
    id: '06',
    category: 'institutional',
    categoryLabel: { PT: 'Institucional', EN: 'Institutional', ES: 'Institucional' },
    title: 'Aethera OS',
    subtitle: {
      PT: 'Sistema Cyber & Design System',
      EN: 'Cyber OS & Design System',
      ES: 'Sistema Cyber & Design System',
    },
    description: {
      PT: 'Arquitetura de design system futurista para ecossistemas de software, com tipografia de alta densidade e acentos de luz ciano.',
      EN: 'Futuristic design system architecture for modern software suites, featuring dense typography and cyan light accents.',
      ES: 'Arquitectura de design system futurista para software moderno, con tipografía de alta densidad y acentos de luz ciano.',
    },
    tags: ['Design System', 'UI/UX', 'Microinterações', 'React'],
    year: '2026',
    image: '/cubes/img14.jpeg',
  },
];

interface ProjectsSectionProps {
  onContactClick?: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onContactClick }) => {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');

  const filterTabs = useMemo(
    () => [
      {
        id: 'all' as ProjectCategory,
        label: language === 'EN' ? 'All' : language === 'ES' ? 'Todos' : 'Todos',
        count: PROJECTS_DATA.length,
      },
      {
        id: 'landing' as ProjectCategory,
        label: 'Landing Pages',
        count: PROJECTS_DATA.filter((p) => p.category === 'landing').length,
      },
      {
        id: 'ecommerce' as ProjectCategory,
        label: 'E-Commerce & 3D',
        count: PROJECTS_DATA.filter((p) => p.category === 'ecommerce').length,
      },
      {
        id: 'institutional' as ProjectCategory,
        label: language === 'EN' ? 'Institutional' : language === 'ES' ? 'Institucionales' : 'Institucionais',
        count: PROJECTS_DATA.filter((p) => p.category === 'institutional').length,
      },
    ],
    [language]
  );

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') return PROJECTS_DATA;
    return PROJECTS_DATA.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="bg-[#000000] z-10 relative px-5 sm:px-8 md:px-12 lg:px-16 pt-24 sm:pt-32 md:pt-40 pb-28 [overflow-x:clip] border-t border-white/[0.08]"
    >
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[#38BDF8]/[0.035] rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[350px] bg-[#0284C7]/[0.025] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header */}
        <FadeIn delay={0} y={30} duration={0.8} className="w-full text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/[0.08] bg-zinc-950/80 backdrop-blur-md mb-4 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] shadow-[0_0_8px_#38BDF8]" />
            <span className="text-xs font-mono uppercase tracking-[0.22em] text-[#38BDF8]">
              {language === 'EN'
                ? '// 03 | SELECTED WORK SHOWCASE'
                : language === 'ES'
                ? '// 03 | PORTAFOLIO DE PROYECTOS'
                : '// 03 | PORTFÓLIO DE PROJETOS SELECIONADOS'}
            </span>
          </div>

          <h2
            style={{ fontSize: 'clamp(2.5rem, 7vw, 90px)' }}
            className="hero-heading font-black uppercase leading-none tracking-tight text-center select-none text-white"
          >
            {language === 'EN' ? 'Projects' : language === 'ES' ? 'Proyectos' : 'Projetos'}
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base md:text-lg font-light max-w-2xl mx-auto mt-4 leading-relaxed">
            {language === 'EN'
              ? 'A curated selection of high-end digital experiences, uniting real-time WebGL 3D, precision interaction design, and cinematic art direction.'
              : language === 'ES'
              ? 'Una selección de experiencias digitales de alto impacto, combinando WebGL 3D en tiempo real, diseño de interacción y dirección de arte cinematográfica.'
              : 'Uma seleção de experiências digitais de alto impacto, combinando WebGL 3D em tempo real, design de interação e direção de arte cinematográfica.'}
          </p>
        </FadeIn>

        {/* Category Filter Bar */}
        <div className="w-full flex justify-center mb-12 sm:mb-16">
          <div className="p-1.5 rounded-full bg-zinc-950/90 border border-white/[0.08] backdrop-blur-md inline-flex flex-wrap items-center justify-center gap-1 sm:gap-2 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            {filterTabs.map((tab) => {
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-mono tracking-wider transition-colors duration-200 select-none cursor-pointer flex items-center gap-2 ${
                    isActive ? 'text-black font-semibold' : 'text-zinc-400 hover:text-white font-medium'
                  }`}
                >
                  {/* Sliding Spring Active Pill (layoutId) */}
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 rounded-full bg-white -z-10 shadow-[0_0_25px_rgba(255,255,255,0.45)]"
                      transition={{
                        type: 'spring',
                        stiffness: 420,
                        damping: 30,
                        mass: 0.6,
                      }}
                    />
                  )}
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full transition-colors ${
                      isActive ? 'bg-black/10 text-black font-bold' : 'bg-white/5 text-zinc-500'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modular Grid Showcase */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 24 }}
                transition={{
                  duration: 0.4,
                  delay: idx * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="h-full"
              >
                <SpotlightCard
                  spotlightColor="rgba(56, 189, 248, 0.14)"
                  borderColor="rgba(56, 189, 248, 0.45)"
                  className="flex flex-col justify-between h-full bg-[#050508]/85 border-white/[0.08] hover:border-[#38BDF8]/40 p-5 sm:p-6"
                >
                  <div className="flex flex-col">
                    {/* Top Thumbnail Container */}
                    <div className="relative aspect-[16/10] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-black border border-white/[0.06] mb-5 group/thumb cursor-pointer">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover/thumb:scale-[1.06] transition-transform duration-700 ease-out"
                      />
                      {/* Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                      {/* Floating Badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider bg-black/80 backdrop-blur-md text-[#38BDF8] border border-white/[0.1] shadow-sm select-none">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                          {project.id} // {project.categoryLabel[language]}
                        </span>
                      </div>

                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono tracking-wider bg-black/70 backdrop-blur-md text-zinc-400 border border-white/[0.08] select-none">
                          {project.year}
                        </span>
                      </div>
                    </div>

                    {/* Metadata & Title */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#38BDF8]">
                        {project.subtitle[language]}
                      </span>

                      <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white group-hover:text-[#38BDF8] transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-zinc-400 text-xs sm:text-[13px] font-light leading-relaxed mt-1 line-clamp-2">
                        {project.description[language]}
                      </p>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono tracking-wider bg-black/60 text-zinc-300 border border-white/[0.06] select-none"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom Action */}
                  <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="text-[11px] font-mono tracking-wider text-zinc-500 uppercase">
                      {language === 'EN' ? 'Production Case' : language === 'ES' ? 'Caso de Producción' : 'Case de Produção'}
                    </span>

                    <button
                      type="button"
                      onClick={onContactClick}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-medium tracking-wider text-white group-hover:text-[#38BDF8] transition-colors cursor-pointer select-none"
                    >
                      <span>
                        {language === 'EN'
                          ? 'Review Details'
                          : language === 'ES'
                          ? 'Ver Detalles'
                          : 'Ver Detalhes'}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Conversion Callout */}
        <div className="mt-20 sm:mt-24 p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-zinc-950 to-black border border-white/[0.08] text-center relative overflow-hidden">
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-[#38BDF8]/10 blur-[90px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#38BDF8] mb-3 select-none">
              {language === 'EN'
                ? '// BESPOKE ENGINEERING & 3D'
                : language === 'ES'
                ? '// INGENIERÍA BESPOKE & 3D'
                : '// ENGENHARIA BESPOKE & 3D'}
            </span>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-4">
              {language === 'EN'
                ? 'Ready to build something iconic together?'
                : language === 'ES'
                ? '¿Listo para crear algo icónico juntos?'
                : 'Pronto para criar algo icônico juntos?'}
            </h3>

            <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed mb-8">
              {language === 'EN'
                ? 'From interactive 3D WebGL scenes to high-converting flagship web platforms, let us engineer your vision to perfection.'
                : language === 'ES'
                ? 'Desde escenas 3D WebGL interactivas hasta plataformas web de alta conversión, diseñamos su visión a la perfección.'
                : 'De cenas 3D WebGL interativas a plataformas web de alta conversão, transformo sua visão em realidade.'}
            </p>

            <Magnet strength={3} padding={80}>
              <motion.button
                type="button"
                onClick={onContactClick}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-white text-black font-bold text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:bg-[#38BDF8] hover:text-white hover:shadow-[0_0_45px_rgba(56,189,248,0.6)] transition-all duration-300 cursor-pointer select-none"
              >
                <span>
                  {language === 'EN'
                    ? 'Start a Project'
                    : language === 'ES'
                    ? 'Iniciar Proyecto'
                    : 'Iniciar Projeto'}
                </span>
                <ArrowUpRight className="w-4 h-4" />
              </motion.button>
            </Magnet>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
