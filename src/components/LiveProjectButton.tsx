import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Magnet } from './Magnet';

interface LiveProjectButtonProps {
  href?: string;
  onClick?: () => void;
  className?: string;
  label?: string;
  showIcon?: boolean;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({
  href,
  onClick,
  className = '',
  label = 'Live Project',
  showIcon = true,
}) => {
  const content = (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 420, damping: 22, mass: 0.6 }}
      className={`group inline-flex items-center justify-center gap-2 rounded-xl apple-glass-pill text-[#BAE6FD] font-medium uppercase tracking-[0.2em] hover:border-[#38BDF8]/70 hover:text-[#FFFFFF] px-6 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-[13px] cursor-pointer select-none whitespace-nowrap shadow-md ${className}`}
    >
      <span>{label}</span>
      {showIcon && (
        <ArrowUpRight className="w-3.5 h-3.5 text-[#38BDF8] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </motion.button>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block no-underline"
      >
        {content}
      </a>
    );
  }

  return content;
};
