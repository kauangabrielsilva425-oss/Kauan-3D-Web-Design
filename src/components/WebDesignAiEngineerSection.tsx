import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface WebDesignAiEngineerSectionProps {
  onContactClick?: (service?: string) => void;
}

interface ProjectScreenData {
  id: string;
  title: string;
  videoSrc: string;
  posterSrc: string;
  // Starting pose: RafxVision 3D perspective wings outside the grid
  startPos: {
    x: number;
    y: number;
    z: number;
    rotateX: number;
    rotateY: number;
    rotateZ: number;
    scale: number;
  };
  // Landed grid pose: settling 100% flat into the 2x3 grid
  landedPos: {
    x: number;
    y: number;
    z: number;
    rotateX: number;
    rotateY: number;
    rotateZ: number;
  };
}

const AI_WEB_SCREENS: ProjectScreenData[] = [
  {
    id: 'tattoo-art',
    title: 'Crimson Rite // Dark Art',
    videoSrc: '/ai-craft/card-1-tattoo.mp4',
    posterSrc: '/ai-craft/card-1-tattoo-poster.webp',
    startPos: {
      x: -260,
      y: -30,
      z: -280,
      rotateX: 10,
      rotateY: 26,
      rotateZ: -4,
      scale: 0.82,
    },
    landedPos: {
      x: 0,
      y: 0,
      z: 0,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
    },
  },
  {
    id: 'lumen-roof',
    title: 'Solar Fog // Lumen Roof',
    videoSrc: '/ai-craft/card-2-lumen.mp4',
    posterSrc: '/ai-craft/card-2-lumen-poster.webp',
    startPos: {
      x: 0,
      y: -140,
      z: -220,
      rotateX: 20,
      rotateY: 0,
      rotateZ: 0,
      scale: 0.86,
    },
    landedPos: {
      x: 0,
      y: 0,
      z: 0,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
    },
  },
  {
    id: 'hover-ink',
    title: 'Hover Ink // Imagine Art',
    videoSrc: '/ai-craft/card-3-hoverink.mp4',
    posterSrc: '/ai-craft/card-3-hoverink-poster.webp',
    startPos: {
      x: 260,
      y: -30,
      z: -280,
      rotateX: 10,
      rotateY: -26,
      rotateZ: 4,
      scale: 0.82,
    },
    landedPos: {
      x: 0,
      y: 0,
      z: 0,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
    },
  },
  {
    id: 'new-era-auto',
    title: 'New Era // Automotive Spatial',
    videoSrc: '/ai-craft/card-4-newera.mp4',
    posterSrc: '/ai-craft/card-4-newera-poster.webp',
    startPos: {
      x: -260,
      y: 80,
      z: -280,
      rotateX: -10,
      rotateY: 26,
      rotateZ: 4,
      scale: 0.82,
    },
    landedPos: {
      x: 0,
      y: 0,
      z: 0,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
    },
  },
  {
    id: 'facet-glass',
    title: 'Facet Glass // Refração 3D',
    videoSrc: '/ai-craft/card-5-facetglass.mp4',
    posterSrc: '/ai-craft/card-5-facetglass-poster.webp',
    startPos: {
      x: 0,
      y: 140,
      z: -220,
      rotateX: -20,
      rotateY: 0,
      rotateZ: 0,
      scale: 0.86,
    },
    landedPos: {
      x: 0,
      y: 0,
      z: 0,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
    },
  },
  {
    id: 'human-machine',
    title: 'Human Machine // Neural Kinetics',
    videoSrc: '/ai-craft/card-6-humanmachine.mp4',
    posterSrc: '/ai-craft/card-6-humanmachine-poster.webp',
    startPos: {
      x: 260,
      y: 80,
      z: -280,
      rotateX: -10,
      rotateY: -26,
      rotateZ: -4,
      scale: 0.82,
    },
    landedPos: {
      x: 0,
      y: 0,
      z: 0,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
    },
  },
];

export const WebDesignAiEngineerSection: React.FC<WebDesignAiEngineerSectionProps> = () => {
  const { language } = useLanguage();
  const stageRef = useRef<HTMLDivElement>(null);

  // Smooth mouse tracking across stage
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 28, stiffness: 85, mass: 0.6 });
  const smoothMouseY = useSpring(mouseY, { damping: 28, stiffness: 85, mass: 0.6 });

  // Stage 3D Perspective Rotation
  const stageRotateX = useTransform(smoothMouseY, [-0.5, 0.5], [6, -6]);
  const stageRotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="ai-engineer"
      className="w-full bg-[#000000] text-white py-24 sm:py-32 md:py-40 relative overflow-hidden select-none"
    >
      {/* Editorial Header */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 mb-12 sm:mb-16 md:mb-20 text-center">
        <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 block mb-4">
          // 02 | {language === 'EN' ? 'AI ENGINEERING & WEB DESIGN' : language === 'ES' ? 'INGENIERÍA DE IA & DISEÑO WEB' : 'ENGENHARIA DE IA & WEB DESIGN'}
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white mb-6 uppercase">
          {language === 'EN'
            ? 'Sensory Interfaces & Autonomous Agents'
            : language === 'ES'
            ? 'Interfaces Sensoriales & Agentes Autónomos'
            : 'Interfaces Sensoriais & Agentes Autônomos'}
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
          {language === 'EN'
            ? 'Three-dimensional WebGL experiences, generative GPU shaders, and reactive artificial intelligence systems built to international standard.'
            : language === 'ES'
            ? 'Experiencias WebGL tridimensionales, shaders generativos en GPU y sistemas de inteligencia artificial reactiva de nivel internacional.'
            : 'Experiências WebGL tridimensionais, shaders generativos via GPU e sistemas de inteligência artificial reativa com acabamento internacional.'}
        </p>
      </div>

      {/* 3D Floating Pure Video Screens Stage (100% Clean: Edge-to-Edge Media, No Overlays, No Redirects) */}
      <div
        ref={stageRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 [perspective:1400px] relative"
      >
        <motion.div
          style={{
            rotateX: stageRotateX,
            rotateY: stageRotateY,
            transformStyle: 'preserve-3d',
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 transition-transform duration-200 ease-out"
        >
          {AI_WEB_SCREENS.map((screen, idx) => (
            <PureVideoScreenItem
              key={screen.id}
              screen={screen}
              index={idx}
            />
          ))}
        </motion.div>
      </div>

      {/* Minimalist Monospace Footer Tagline */}
      <div className="max-w-5xl mx-auto px-6 mt-16 sm:mt-20 md:mt-24 text-center">
        <p className="text-xs sm:text-sm font-mono tracking-[0.35em] text-zinc-500 uppercase">
          WEB DESIGN &nbsp;/&nbsp; DEVELOPMENT &nbsp;/&nbsp; DIGITAL &nbsp;/&nbsp; EXPERIMENTS
        </p>
      </div>
    </section>
  );
};

interface PureVideoScreenItemProps {
  screen: ProjectScreenData;
  index: number;
}

const PureVideoScreenItem: React.FC<PureVideoScreenItemProps> = ({
  screen,
  index,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Guarantee continuous 24/7 video playback without requiring hover
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const playVideo = () => {
      if (video.paused) {
        video.play().catch(() => {});
      }
    };

    playVideo();

    video.addEventListener('loadedmetadata', playVideo);
    video.addEventListener('loadeddata', playVideo);
    video.addEventListener('canplay', playVideo);
    video.addEventListener('canplaythrough', playVideo);
    video.addEventListener('pause', playVideo); // Automatically resume if browser pauses

    return () => {
      video.removeEventListener('loadedmetadata', playVideo);
      video.removeEventListener('loadeddata', playVideo);
      video.removeEventListener('canplay', playVideo);
      video.removeEventListener('canplaythrough', playVideo);
      video.removeEventListener('pause', playVideo);
    };
  }, [screen.videoSrc]);

  return (
    <motion.div
      // RafxVision 3D Arrival: Swooping smoothly into view from 3D perspective wings and locking 100% flat
      initial={{
        opacity: 0,
        x: screen.startPos.x,
        y: screen.startPos.y,
        z: screen.startPos.z,
        rotateX: screen.startPos.rotateX,
        rotateY: screen.startPos.rotateY,
        rotateZ: screen.startPos.rotateZ,
        scale: screen.startPos.scale,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        z: 0,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        scale: 1,
        transition: {
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
          delay: index * 0.08,
        },
      }}
      whileHover={{
        scale: 1.03,
        z: 35,
        transition: {
          duration: 0.35,
          ease: [0.16, 1, 0.3, 1],
        },
      }}
      onViewportEnter={() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => {});
        }
      }}
      viewport={{ once: true, amount: 0.15 }}
      style={{
        transformStyle: 'preserve-3d',
      }}
      // Pure edge-to-edge screen frame with no click redirection
      className="group relative rounded-xl sm:rounded-2xl overflow-hidden select-none border border-white/[0.08] hover:border-white/40 shadow-2xl shadow-black hover:shadow-[0_20px_50px_rgba(0,0,0,0.9)] transition-colors duration-300 bg-black z-10 hover:z-30"
    >
      {/* 16/10 Aspect Ratio Edge-to-Edge Pure Video Display (No text, no overlays, pure clean visual) */}
      <div className="relative aspect-[16/10] w-full bg-black overflow-hidden">
        <video
          ref={videoRef}
          src={screen.videoSrc}
          poster={screen.posterSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onLoadedMetadata={(e) => {
            const v = e.currentTarget;
            v.muted = true;
            v.play().catch(() => {});
          }}
          onCanPlay={(e) => {
            const v = e.currentTarget;
            v.muted = true;
            v.play().catch(() => {});
          }}
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105"
          style={{
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
          }}
        />

        {/* Subtle Edge Glow on Hover */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100 bg-white/[0.03]"
        />
      </div>
    </motion.div>
  );
};

export default WebDesignAiEngineerSection;
