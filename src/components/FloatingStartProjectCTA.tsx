import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface FloatingStartProjectCTAProps {
  onContactClick: () => void;
  isVisible?: boolean;
}

export const FloatingStartProjectCTA: React.FC<FloatingStartProjectCTAProps> = ({
  onContactClick,
  isVisible: forceVisible,
}) => {
  const { t } = useLanguage();
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolledPastHero(scrollY > 350);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shouldShow = forceVisible !== undefined ? forceVisible : scrolledPastHero;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.button
          onClick={onContactClick}
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', stiffness: 280, damping: 20, mass: 0.8 }}
          className="glass-blur fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1c1c1c]/65 backdrop-blur-xl text-white rounded-xl flex items-center gap-2.5 h-12 min-[1600px]:h-14 px-6 sm:px-7 cursor-pointer border border-white/15 hover:bg-[#262626]/85 hover:border-white/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group select-none shadow-2xl shadow-black/70 whitespace-nowrap"
          aria-label="Iniciar um projeto"
        >
          <span className="text-white text-[13.5px] min-[1600px]:text-[15.5px] font-medium tracking-wide whitespace-nowrap">
            {t('contact.startProject') || 'Iniciar um projeto'}
          </span>
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-2.5 h-2.5 text-white/80 group-hover:text-white transition-colors group-hover:translate-x-0.5 duration-200"
          >
            <circle cx="2" cy="2" r="0.9" fill="currentColor" />
            <circle cx="4" cy="2" r="0.9" fill="currentColor" />
            <circle cx="4" cy="4" r="0.9" fill="currentColor" />
            <circle cx="6" cy="4" r="0.9" fill="currentColor" />
            <circle cx="6" cy="6" r="0.9" fill="currentColor" />
            <circle cx="8" cy="6" r="0.9" fill="currentColor" />
            <circle cx="4" cy="8" r="0.9" fill="currentColor" />
            <circle cx="6" cy="8" r="0.9" fill="currentColor" />
            <circle cx="2" cy="10" r="0.9" fill="currentColor" />
            <circle cx="4" cy="10" r="0.9" fill="currentColor" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default FloatingStartProjectCTA;
