import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface IntroScreenProps {
  onComplete: () => void;
  durationSeconds?: number;
}

const COSMOS_ARMS = [
  // Arm 0: img1 .. img10
  Array.from({ length: 10 }, (_, i) => `/intro/img${i + 1}.webp`),
  // Arm 1: img11 .. img20
  Array.from({ length: 10 }, (_, i) => `/intro/img${i + 11}.webp`),
  // Arm 2: img10 .. img1
  Array.from({ length: 10 }, (_, i) => `/intro/img${10 - i}.webp`),
  // Arm 3: img20 .. img11
  Array.from({ length: 10 }, (_, i) => `/intro/img${20 - i}.webp`),
  // Arm 4: img11 .. img20
  Array.from({ length: 10 }, (_, i) => `/intro/img${i + 11}.webp`),
];

export const IntroScreen: React.FC<IntroScreenProps> = ({
  onComplete,
  durationSeconds = 1.8,
}) => {
  useEffect(() => {
    const totalMs = durationSeconds * 1000;
    const timer = setTimeout(() => {
      onComplete();
    }, totalMs);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        clearTimeout(timer);
        onComplete();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [durationSeconds, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.08,
        filter: 'blur(14px)',
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#000000] overflow-hidden select-none cursor-pointer"
      onClick={onComplete}
    >
      {/* Dynamic CSS styles for the snappy circular cosmos vortex animation (Mobile-First Responsive) */}
      <style>{`
        .intro-container {
          position: absolute;
          inset: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          pointer-events: none;
        }

        .intro-cosmos {
          position: absolute;
          width: 64px;
          height: 116px;
        }

        @media (min-width: 640px) {
          .intro-cosmos {
            width: 86px;
            height: 156px;
          }
        }

        .intro-cosmos-item {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #18181b;
          border-radius: 9px;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.9), 0 0 12px rgba(255, 255, 255, 0.05);
          animation: intro-fall-mobile 2.4s infinite cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: bottom center;
          transform: scale(0);
          will-change: transform, opacity, top, left;
        }

        @media (min-width: 640px) {
          .intro-cosmos-item {
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.9), 0 0 15px rgba(255, 255, 255, 0.05);
            animation-name: intro-fall-desktop;
          }
        }

        .intro-cosmos-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Mobile Trajectory: proportional to 390px screens */
        @keyframes intro-fall-mobile {
          0% {
            opacity: 0;
            top: 0;
            left: 0;
            transform: scale(0.95);
          }
          20% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            top: -130px;
            transform: scale(1.02);
          }
          100% {
            top: -100px;
            left: -150px;
            transform: scale(0.1);
            opacity: 0;
          }
        }

        /* Desktop Trajectory: exact original scale */
        @keyframes intro-fall-desktop {
          0% {
            opacity: 0;
            top: 0;
            left: 0;
            transform: scale(0.95);
          }
          20% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            top: -210px;
            transform: scale(1.02);
          }
          100% {
            top: -160px;
            left: -320px;
            transform: scale(0.1);
            opacity: 0;
          }
        }
      `}</style>



      {/* The 5-arm circular spiral layout */}
      <div className="intro-container">
        {COSMOS_ARMS.map((armImages, armIdx) => {
          const total = COSMOS_ARMS.length;
          const angle = (360 / total) * armIdx;
          const isClient = typeof window !== 'undefined';
          const isMobile = isClient && window.innerWidth < 640;
          const transform = `rotate(${angle}deg) translate(${isMobile ? 'clamp(140px, 38vw, 190px)' : '55vh'})`;

          return (
            <div
              key={armIdx}
              className="intro-cosmos"
              style={{ transform }}
            >
              {armImages.map((src, itemIdx) => (
                <div
                  key={itemIdx}
                  className="intro-cosmos-item"
                  style={{ animationDelay: `${itemIdx * 0.18}s` }}
                >
                  <img src={src} alt="" loading="eager" />
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Centerpiece Luxury Minimalist Typography - ONLY KAUAN */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
        <motion.h1
          initial={{ opacity: 0, scale: 0.90 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-none drop-shadow-[0_8px_30px_rgba(0,0,0,0.95)]"
        >
          KAUAN
        </motion.h1>
      </div>
    </motion.div>
  );
};

export default IntroScreen;
