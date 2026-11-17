import React from 'react';
import { motion } from 'framer-motion';
import { Magnet } from './Magnet';

interface HeroContactButtonProps {
  onClick?: () => void;
  href?: string;
  className?: string;
  label?: string;
}

export const HeroContactButton: React.FC<HeroContactButtonProps> = ({
  onClick,
  href = '#contact',
  className = '',
  label = 'GET IN TOUCH →',
}) => {
  const content = (
    <button
      type="button"
      onClick={onClick}
      className={`group relative p-[1.5px] rounded-xl bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.35)] transition-colors duration-200 cursor-pointer select-none ${className}`}
    >
      <div className="rounded-xl bg-[#030305]/95 backdrop-blur-md px-6 py-3 sm:px-8 sm:py-3.5 md:px-9 md:py-4 flex items-center justify-center transition-colors duration-200 group-hover:bg-[#08080c]/90">
        <span className="text-[#F8FAFC] font-medium uppercase tracking-[0.2em] text-xs sm:text-[13px] md:text-sm whitespace-nowrap transition-colors duration-200 group-hover:text-white">
          {label}
        </span>
      </div>
    </button>
  );

  if (href && !onClick) {
    return (
      <a href={href} className="inline-block no-underline">
        {content}
      </a>
    );
  }

  return content;
};
