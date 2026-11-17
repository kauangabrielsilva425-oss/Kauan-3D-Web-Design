import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onContactClick?: () => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onContactClick,
  onOpenPrivacy,
  onOpenTerms,
}) => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const handleNavClick = (
    e: React.MouseEvent,
    href: string,
    onClickAction?: () => void
  ) => {
    e.preventDefault();
    if (onClickAction) {
      onClickAction();
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      if (window.__lenis) {
        window.__lenis.scrollTo(target as HTMLElement, { offset: 0, duration: 1.8 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { label: t('footer.nav.services'), href: '#services' },
    { label: t('nav.spatial'), href: '#spatial-3d' },
    { label: t('footer.nav.about'), href: '#about' },
    { label: t('footer.nav.contact'), href: '#contact', onClick: onContactClick },
  ];

  return (
    <footer
      id="contact"
      className="w-full bg-[#000000] text-[#F8FAFC] relative z-20 border-t border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 py-8 sm:py-10 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 text-center md:text-left select-none">
        {/* Copyright & Legal Links */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs sm:text-[13px] text-zinc-400 font-light tracking-normal">
          <p>© {currentYear} Kauan Gabriel. {t('footer.rights')}</p>
          <div className="flex items-center gap-3 text-xs">
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="text-zinc-500 hover:text-white underline-offset-4 hover:underline transition-colors cursor-pointer"
            >
              {t('footer.privacy')}
            </button>
            <span className="text-zinc-700">|</span>
            <button
              type="button"
              onClick={onOpenTerms}
              className="text-zinc-500 hover:text-white underline-offset-4 hover:underline transition-colors cursor-pointer"
            >
              {t('footer.terms')}
            </button>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-wrap items-center justify-center md:justify-end gap-5 sm:gap-8">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href, item.onClick)}
              className="text-xs sm:text-[13px] text-zinc-400 hover:text-white transition-colors duration-200 cursor-pointer tracking-wider uppercase font-mono"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
