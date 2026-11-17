import React, { useState } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface FloatingAboutIconProps {
  src: string;
  alt: string;
  className?: string;
  floatY?: [number, number, number];
  floatRotate?: [number, number, number];
  duration?: number;
  delay?: number;
  parallaxFactor?: number;
  glowColor: string;
  glowSecondaryColor?: string;
  smoothMouseX: MotionValue<number>;
  smoothMouseY: MotionValue<number>;
}

export const FloatingAboutIcon: React.FC<FloatingAboutIconProps> = ({
  src,
  alt,
  className = '',
  floatY = [-10, 10, -10],
  floatRotate = [-2.5, 2.5, -2.5],
  duration = 5.0,
  delay = 0,
  parallaxFactor = 9,
  glowColor,
  glowSecondaryColor,
  smoothMouseX,
  smoothMouseY,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Smooth cursor depth parallax (moves opposite to pointer direction)
  const parallaxX = useTransform(smoothMouseX, [-1, 1], [parallaxFactor, -parallaxFactor]);
  const parallaxY = useTransform(smoothMouseY, [-1, 1], [parallaxFactor, -parallaxFactor]);

  // Subtle 3D orient toward cursor on hover
  const tiltX = useTransform(smoothMouseY, [-1, 1], [5, -5]);
  const tiltY = useTransform(smoothMouseX, [-1, 1], [-5, 5]);

  return (
    <motion.div
      style={{
        x: parallaxX,
        y: parallaxY,
        transform: 'translate3d(0,0,0)',
        willChange: 'transform',
      }}
      className={`relative select-none pointer-events-auto cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient Levitation Loop */}
      <motion.div
        animate={{
          y: floatY,
          rotate: floatRotate,
        }}
        transition={{
          repeat: Infinity,
          duration,
          delay,
          ease: 'easeInOut',
        }}
        style={{
          transform: 'translate3d(0,0,0)',
          willChange: 'transform',
        }}
        className="relative w-full h-full"
      >
        {/* Interactive Hover Scale & Orientation */}
        <motion.div
          animate={{
            scale: isHovered ? 1.08 : 1.0,
            rotateX: isHovered ? tiltX.get() : 0,
            rotateY: isHovered ? tiltY.get() : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 340,
            damping: 22,
          }}
          style={{
            transformStyle: 'preserve-3d',
            transform: 'translate3d(0,0,0)',
            willChange: 'transform, filter',
          }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* Glass Neon Ambient Glow */}
          <motion.div
            animate={{
              opacity: isHovered ? 0.75 : 0.22,
              scale: isHovered ? 1.3 : 1.0,
            }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{
              backgroundColor: glowColor,
              boxShadow: isHovered ? `0 0 45px ${glowColor}` : 'none',
            }}
            className="absolute inset-0 rounded-full blur-2xl sm:blur-3xl -z-10 pointer-events-none transition-all"
          />

          {glowSecondaryColor && (
            <motion.div
              animate={{
                opacity: isHovered ? 0.55 : 0.15,
                scale: isHovered ? 1.2 : 0.9,
              }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              style={{
                backgroundColor: glowSecondaryColor,
              }}
              className="absolute inset-[10%] rounded-full blur-xl -z-10 pointer-events-none transition-all"
            />
          )}

          {/* 3D Glass / Holographic Element Image */}
          <img
            src={src}
            alt={alt}
            loading="lazy"
            draggable={false}
            className={`relative w-full h-auto object-contain transition-all duration-300 ${
              isHovered
                ? 'drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] brightness-110'
                : 'drop-shadow-[0_15px_30px_rgba(3,5,10,0.8)]'
            }`}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
