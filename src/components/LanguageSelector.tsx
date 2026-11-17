import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, Language } from '../context/LanguageContext';

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const languages: Language[] = ['PT', 'EN', 'ES'];

  // Scroll listener: visible only in the initial hero area, hides smoothly on scroll down
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 80) {
        setIsVisible(false);
        setIsOpen(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSelect = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: -16, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.92 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-4 sm:top-6 right-4 sm:right-8 z-50 select-none pointer-events-auto"
        >
          <div className="relative flex flex-col items-end">
            {/* Trigger Button showing current Language code */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.08, transition: { type: 'spring', stiffness: 450, damping: 22 } }}
              whileTap={{ scale: 0.92, transition: { type: 'spring', stiffness: 600, damping: 28 } }}
              onClick={() => setIsOpen((prev) => !prev)}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl apple-glass-pill flex items-center justify-center text-white font-medium text-xs sm:text-sm tracking-wider hover:border-[#38BDF8]/40 cursor-pointer shadow-lg"
              title={`Idioma atual: ${language}. Clique para alterar.`}
              aria-expanded={isOpen}
              aria-label="Selecionar idioma"
            >
              <span>{language}</span>
            </motion.button>

            {/* Dropdown Menu (matching the reference screenshot) */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.94, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: -4 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-full mt-2 w-11 sm:w-12 rounded-xl apple-glass-surface shadow-[0_20px_40px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col z-50"
                >
                  {languages.map((lang) => {
                    const isActive = language === lang;
                    return (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => handleSelect(lang)}
                        className={`w-full py-2.5 sm:py-3 text-xs sm:text-sm font-semibold tracking-wider text-center transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-white text-black font-bold'
                            : 'bg-transparent text-zinc-400 hover:text-white hover:bg-white/[0.08]'
                        }`}
                      >
                        {lang}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LanguageSelector;
