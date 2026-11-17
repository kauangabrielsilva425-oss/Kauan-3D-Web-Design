import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface FloatingDepthChipProps {
  label: string;
  icon?: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  depth?: 'back' | 'mid' | 'front';
  floatDuration?: number;
  floatY?: [number, number, number];
  delay?: number;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  dotColor?: string;
}

export const FloatingDepthChip: React.FC<FloatingDepthChipProps> = ({
  label,
  top,
  bottom,
  left,
  right,
  depth = 'mid',
  floatDuration = 5.0,
  floatY = [-6, 6, -6],
  delay = 0,
  mouseX,
  mouseY,
  dotColor = '#00BFFF',
}) => {
  // Parallax factors based on 3D depth layer
  const factor = depth === 'front' ? 18 : depth === 'mid' ? 10 : 5;
  const parallaxX = useTransform(mouseX, [-1, 1], [-factor, factor]);
  const parallaxY = useTransform(mouseY, [-1, 1], [-factor, factor]);

  const stylePosition: React.CSSProperties = {
    top,
    bottom,
    left,
    right,
    zIndex: depth === 'front' ? 25 : depth === 'mid' ? 12 : 5,
  };

  return (
    <motion.div
      style={{
        ...stylePosition,
        x: parallaxX,
        y: parallaxY,
      }}
      className="absolute pointer-events-auto select-none hidden sm:block"
    >
      <motion.div
        animate={{
          y: floatY,
        }}
        transition={{
          repeat: Infinity,
          duration: floatDuration,
          ease: 'easeInOut',
          delay,
        }}
        whileHover={{ scale: 1.08 }}
        className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#070B14]/60 backdrop-blur-md border border-[#1E293B]/70 hover:border-[#38BDF8]/60 shadow-[0_8px_24px_rgba(3,5,10,0.6)] hover:shadow-[0_8px_24px_rgba(3,5,10,0.8),0_0_16px_rgba(56,189,248,0.25)] transition-all duration-300 group cursor-pointer"
      >
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0 shadow-[0_0_8px_currentColor]"
          style={{ backgroundColor: dotColor, color: dotColor }}
        />
        <span className="text-[10px] md:text-[11px] font-mono tracking-[0.2em] uppercase font-medium text-[#94A3B8] group-hover:text-[#F8FAFC] transition-colors">
          {label}
        </span>
      </motion.div>
    </motion.div>
  );
};
