import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onContactClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onContactClick }) => {
  const { t, language } = useLanguage();
  const [activeSection, setActiveSection] = useState('about');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { id: 'about', label: t('nav.about'), href: '#about' },
    { id: 'ai-engineer', label: t('nav.ai_engineer'), href: '#ai-engineer' },
    { id: 'services', label: t('nav.services'), href: '#services' },
    { id: 'spatial-3d', label: t('nav.spatial'), href: '#spatial-3d' },
    { id: 'contact', label: t('nav.contact'), href: '#contact', onClick: onContactClick },
  ];

  // Active section tracking on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      const contactEl = document.getElementById('contact');
      const spatialEl = document.getElementById('spatial-3d');
      const servicesEl = document.getElementById('services');
      const aiEl = document.getElementById('ai-engineer');
      const aboutEl = document.getElementById('about');

      if (contactEl && scrollPos >= contactEl.offsetTop) {
        setActiveSection('contact');
      } else if (spatialEl && scrollPos >= spatialEl.offsetTop) {
        setActiveSection('spatial-3d');
      } else if (servicesEl && scrollPos >= servicesEl.offsetTop) {
        setActiveSection('services');
      } else if (aiEl && scrollPos >= aiEl.offsetTop) {
        setActiveSection('ai-engineer');
      } else if (aboutEl && scrollPos >= aboutEl.offsetTop) {
        setActiveSection('about');
      } else {
        setActiveSection('about');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside to collapse
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleMenu = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleItemClick = (
    e: React.MouseEvent,
    item: { label: string; href?: string; onClick?: () => void }
  ) => {
    e.preventDefault();
    if (item.onClick) {
      item.onClick();
    } else if (item.href?.startsWith('#')) {
      const target = document.querySelector(item.href);
      if (target) {
        if (window.__lenis) {
          window.__lenis.scrollTo(target as HTMLElement, {
            offset: -30,
            duration: 1.8,
          });
        } else {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    // Smooth collapse after navigation
    setTimeout(() => {
      setIsExpanded(false);
    }, 350);
  };

  return (
    <div
      ref={navRef}
      className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto max-w-[95vw] w-auto flex flex-col items-center"
    >
      <FadeIn delay={0} y={-20} duration={0.7}>
        <motion.nav
          layout
          transition={{ type: 'spring', damping: 28, stiffness: 350 }}
          className="inline-flex items-center p-1.5 sm:p-2 rounded-2xl apple-glass-surface shadow-[0_15px_40px_rgba(0,0,0,0.85),0_0_25px_rgba(56,189,248,0.12)] select-none hover:border-[#38BDF8]/40 transition-all duration-300 overflow-hidden"
        >
          {/* Diamond Brand Logo Button - Click to Toggle Menu */}
          <button
            type="button"
            onClick={toggleMenu}
            className="flex items-center justify-center p-1 sm:p-1.5 rounded-xl hover:bg-white/[0.08] active:scale-95 transition-all cursor-pointer group/logo relative"
            title={
              language === 'EN'
                ? isExpanded ? 'Collapse navigation' : 'Open navigation'
                : language === 'ES'
                ? isExpanded ? 'Plegar navegación' : 'Abrir navegación'
                : isExpanded ? 'Recolher navegação' : 'Abrir navegação'
            }
            aria-expanded={isExpanded}
            aria-label={
              language === 'EN'
                ? 'Navigation Menu'
                : language === 'ES'
                ? 'Menú de Navegación'
                : 'Menu de Navegação'
            }
          >
            {/* Ambient Cyan Aura behind Logo */}
            <div
              className={`absolute inset-0 bg-[#38BDF8]/20 rounded-xl blur-md transition-opacity duration-300 ${
                isExpanded ? 'opacity-100' : 'opacity-0 group-hover/logo:opacity-100'
              }`}
            />
            <img
              src="/diamond-logo.webp"
              alt="Kauan Gabriel Logo"
              width="32"
              height="32"
              decoding="async"
              className="w-7 h-7 sm:w-8 sm:h-8 object-contain relative z-10 transition-transform duration-300 group-hover/logo:scale-110 drop-shadow-[0_0_12px_rgba(56,189,248,0.6)]"
            />
          </button>

          {/* Desktop Horizontal Navigation Options (Excluded from DOM on mobile screens) */}
          <AnimatePresence>
            {!isMobile && isExpanded && (
              <motion.div
                key="nav-links-expanded-desktop"
                initial={{ opacity: 0, width: 0, scale: 0.95 }}
                animate={{ opacity: 1, width: 'auto', scale: 1 }}
                exit={{ opacity: 0, width: 0, scale: 0.95 }}
                transition={{
                  duration: 0.28,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex items-center overflow-hidden whitespace-nowrap"
              >
                <div className="w-[1px] h-5 bg-white/15 mx-1.5 flex-shrink-0" />
                <div className="flex items-center gap-1 pl-0.5 pr-1">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <a
                        key={item.id}
                        href={item.href}
                        onClick={(e) => handleItemClick(e, item)}
                        className={`relative px-3.5 md:px-5 py-2 rounded-xl font-medium uppercase tracking-[0.16em] text-xs transition-all duration-300 cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                          isActive
                            ? 'bg-white/[0.14] text-white shadow-[0_2px_12px_rgba(0,0,0,0.5)] border border-white/[0.15]'
                            : 'text-[#94A3B8] hover:text-white hover:bg-white/[0.06]'
                        }`}
                      >
                        <span>{item.label}</span>
                      </a>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </FadeIn>

      {/* Mobile Vertical Dropdown Menu (Centered, Zero Overflow, 44px Touch Targets) */}
      <AnimatePresence>
        {isMobile && isExpanded && (
          <motion.div
            key="mobile-nav-dropdown"
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mt-2 w-[min(260px,calc(100vw-32px))] mx-auto rounded-2xl bg-black/95 backdrop-blur-2xl border border-white/15 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(56,189,248,0.15)] flex flex-col gap-1 select-none overflow-hidden"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleItemClick(e, item)}
                  className={`w-full min-h-[44px] px-4 py-2.5 rounded-xl font-medium uppercase tracking-[0.15em] text-xs transition-all duration-200 cursor-pointer flex items-center justify-between ${
                    isActive
                      ? 'bg-white/15 text-white font-semibold border border-white/20'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.08]'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-[10px] text-zinc-500 font-mono tracking-normal">→</span>
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
