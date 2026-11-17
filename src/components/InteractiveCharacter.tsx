import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface InteractiveCharacterProps {
  className?: string;
}

interface BlobCircle {
  dx: number;
  dy: number;
  radius: number;
}

interface Stamp {
  x: number;
  y: number;
  createdAt: number;
  circles: BlobCircle[];
}

export const InteractiveCharacter: React.FC<InteractiveCharacterProps> = ({
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Master character aspect ratio (exact matching image 1241x1268)
  const ORIGINAL_WIDTH = 1241;
  const ORIGINAL_HEIGHT = 1268;

  // Normalized cursor coordinates [-1, 1] for 3D perspective orientation
  const mouseNormX = useMotionValue(0);
  const mouseNormY = useMotionValue(0);

  // Layer 1: Torso / Shoulder foundation (heavier mass, smooth delayed counter-lean)
  const torsoSpringConfig = { damping: 35, stiffness: 65, mass: 1.2 };
  const smoothTorsoX = useSpring(mouseNormX, torsoSpringConfig);
  const smoothTorsoY = useSpring(mouseNormY, torsoSpringConfig);

  const torsoRotateZ = useTransform(smoothTorsoX, [-1, 1], [-1.4, 1.4]);
  const torsoX = useTransform(smoothTorsoX, [-1, 1], [-10, 10]);
  const torsoY = useTransform(smoothTorsoY, [-1, 1], [-6, 6]);

  // Layer 2: Head & Neck 3D orientation (smooth, calm, perspective tracking)
  const headSpringConfig = { damping: 28, stiffness: 85, mass: 0.85 };
  const smoothHeadX = useSpring(mouseNormX, headSpringConfig);
  const smoothHeadY = useSpring(mouseNormY, headSpringConfig);

  const headRotateY = useTransform(smoothHeadX, [-1, 1], [-8.0, 8.0]);
  const headRotateX = useTransform(smoothHeadY, [-1, 1], [5.5, -5.5]);
  const headRotateZ = useTransform(smoothHeadX, [-1, 1], [-2.5, 2.5]);
  const headParallaxX = useTransform(smoothHeadX, [-1, 1], [-16, 16]);
  const headParallaxY = useTransform(smoothHeadY, [-1, 1], [-10, 10]);

  // 3D Rim Atmosphere Lighting (Counter-Parallax Depth Glow)
  const glowTranslateX = useTransform(smoothHeadX, [-1, 1], [22, -22]);
  const glowTranslateY = useTransform(smoothHeadY, [-1, 1], [16, -16]);

  // Organic Brush Trail Reveal state & refs
  const stampsRef = useRef<Stamp[]>([]);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  // Offscreen canvases
  const maskCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const bufCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Image references
  const imgBaseRef = useRef<HTMLImageElement | null>(null);
  const imgGlassesRef = useRef<HTMLImageElement | null>(null);
  const bothLoadedRef = useRef(false);

  // Animation frame ref
  const animFrameIdRef = useRef<number>(0);

  // Lifetime configuration: 1100ms total
  const LIFE = 1100;

  // Helper to get base brush radius relative to canvas size
  const getBaseRadius = (canvasWidth: number, dpr: number) => {
    // Generates a fluid organic blob radius proportional to character width
    return (canvasWidth / dpr) * 0.085 * dpr;
  };

  // Helper to create an organic blob stamp with 3 to 5 overlapping circles
  const createBlobStamp = (x: number, y: number, baseR: number): Stamp => {
    const count = 3 + Math.floor(Math.random() * 3); // 3 to 5 circles
    const circles: BlobCircle[] = [];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * (baseR * 0.42);
      const r = baseR * (0.75 + Math.random() * 0.5);
      circles.push({
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist,
        radius: r,
      });
    }

    return {
      x,
      y,
      createdAt: performance.now(),
      circles,
    };
  };

  // Add stamps with distance interpolation for smooth continuous strokes
  const addPointerStamp = (canvasX: number, canvasY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const baseR = getBaseRadius(canvas.width, dpr);
    const step = Math.max(8 * dpr, baseR * 0.32);

    if (lastPointRef.current === null) {
      stampsRef.current.push(createBlobStamp(canvasX, canvasY, baseR));
      lastPointRef.current = { x: canvasX, y: canvasY };
      return;
    }

    const dx = canvasX - lastPointRef.current.x;
    const dy = canvasY - lastPointRef.current.y;
    const dist = Math.hypot(dx, dy);

    if (dist >= step) {
      const steps = Math.ceil(dist / step);
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        const ix = lastPointRef.current.x + dx * t;
        const iy = lastPointRef.current.y + dy * t;
        stampsRef.current.push(createBlobStamp(ix, iy, baseR));
      }
      lastPointRef.current = { x: canvasX, y: canvasY };
    } else if (dist > 3 * dpr) {
      stampsRef.current.push(createBlobStamp(canvasX, canvasY, baseR));
      lastPointRef.current = { x: canvasX, y: canvasY };
    }
  };

  useEffect(() => {
    // Initialize offscreen canvases
    if (!maskCanvasRef.current) {
      maskCanvasRef.current = document.createElement('canvas');
    }
    if (!bufCanvasRef.current) {
      bufCanvasRef.current = document.createElement('canvas');
    }

    const maskCanvas = maskCanvasRef.current;
    const bufCanvas = bufCanvasRef.current;
    const maskCtx = maskCanvas.getContext('2d', { willReadFrequently: false });
    const bufCtx = bufCanvas.getContext('2d', { willReadFrequently: false });

    // Load Base image (without glasses) & Revelation image (with Oakley Plantaris glasses)
    const imgBase = new Image();
    const imgGlasses = new Image();

    imgBaseRef.current = imgBase;
    imgGlassesRef.current = imgGlasses;

    let baseLoaded = false;
    let glassesLoaded = false;

    const checkBothLoaded = () => {
      if (baseLoaded && glassesLoaded) {
        bothLoadedRef.current = true;
        setImageLoaded(true);
        updateCanvasDimensions();
      }
    };

    imgBase.onload = () => {
      baseLoaded = true;
      checkBothLoaded();
    };

    imgGlasses.onload = () => {
      glassesLoaded = true;
      checkBothLoaded();
    };

    imgBase.src = '/hero-character-noglasses.webp?v=clean-v4-opt';
    imgGlasses.src = '/hero-character-glasses.webp?v=clean-v4-opt';

    // Canvas sizing with Retina devicePixelRatio (max 2)
    const updateCanvasDimensions = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const rect = container.getBoundingClientRect();
      if (rect.width === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const targetW = Math.round(rect.width * dpr);
      const targetH = Math.round(rect.width * (ORIGINAL_HEIGHT / ORIGINAL_WIDTH) * dpr);

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
        maskCanvas.width = targetW;
        maskCanvas.height = targetH;
        bufCanvas.width = targetW;
        bufCanvas.height = targetH;
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      updateCanvasDimensions();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    const onWindowResize = () => {
      updateCanvasDimensions();
    };
    window.addEventListener('resize', onWindowResize, { passive: true });

    // Head orientation tracking
    const updateHeadOrientation = (cursorScreenX: number, cursorScreenY: number) => {
      const nx = (cursorScreenX - window.innerWidth / 2) / (window.innerWidth / 2);
      const ny = (cursorScreenY - window.innerHeight * 0.50) / (window.innerHeight / 2);
      mouseNormX.set(Math.max(-1, Math.min(1, nx)));
      mouseNormY.set(Math.max(-1, Math.min(1, ny)));
    };

    // Global pointer move listener
    const onGlobalPointerMove = (e: PointerEvent) => {
      updateHeadOrientation(e.clientX, e.clientY);

      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const x = (e.clientX - rect.left) * dpr;
        const y = (e.clientY - rect.top) * dpr;
        addPointerStamp(x, y);
      } else {
        lastPointRef.current = null;
      }
    };

    const onPointerLeaveWindow = () => {
      mouseNormX.set(0);
      mouseNormY.set(0);
      lastPointRef.current = null;
    };

    window.addEventListener('pointermove', onGlobalPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeaveWindow);

    // =========================================================================
    // Composite Operations RequestAnimationFrame Loop
    // =========================================================================
    const render = (time: number) => {
      const canvas = canvasRef.current;
      if (!canvas) {
        animFrameIdRef.current = requestAnimationFrame(render);
        return;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx || !maskCtx || !bufCtx || !bothLoadedRef.current) {
        animFrameIdRef.current = requestAnimationFrame(render);
        return;
      }

      const w = canvas.width;
      const h = canvas.height;
      if (w === 0 || h === 0) {
        animFrameIdRef.current = requestAnimationFrame(render);
        return;
      }

      // Filter out expired stamps (LIFE = 1100ms)
      const stamps = stampsRef.current;
      const activeStamps: Stamp[] = [];
      for (let i = 0; i < stamps.length; i++) {
        if (time - stamps[i].createdAt < LIFE) {
          activeStamps.push(stamps[i]);
        }
      }
      stampsRef.current = activeStamps;

      // 1. Draw Organic Mask onto maskCanvas
      maskCtx.clearRect(0, 0, w, h);
      if (activeStamps.length > 0) {
        maskCtx.fillStyle = '#000000';
        for (let i = 0; i < activeStamps.length; i++) {
          const stamp = activeStamps[i];
          const elapsed = time - stamp.createdAt;
          const progress = elapsed / LIFE;

          // Lifetime curve: First 25% full size (scale 1.0); remaining 75% smoothly shrinks to 0
          let scale = 1.0;
          if (progress > 0.25) {
            const fade = (progress - 0.25) / 0.75;
            scale = Math.max(0, 1.0 - Math.pow(fade, 1.3));
          }
          if (scale <= 0.01) continue;

          for (let j = 0; j < stamp.circles.length; j++) {
            const c = stamp.circles[j];
            const r = c.radius * scale;
            if (r <= 0.5) continue;
            maskCtx.beginPath();
            maskCtx.arc(stamp.x + c.dx * scale, stamp.y + c.dy * scale, r, 0, Math.PI * 2);
            maskCtx.fill();
          }
        }
      }

      // Perfectly aligned centered drawing parameters
      const imgW = imgBase.naturalWidth || ORIGINAL_WIDTH;
      const imgH = imgBase.naturalHeight || ORIGINAL_HEIGHT;
      const imgRatio = imgW / imgH;
      const canvasRatio = w / h;

      let drawW = w;
      let drawH = h;
      let drawX = 0;
      let drawY = 0;

      if (canvasRatio > imgRatio) {
        drawH = h;
        drawW = drawH * imgRatio;
        drawX = (w - drawW) / 2;
      } else {
        drawW = w;
        drawH = drawW / imgRatio;
        drawY = (h - drawH) / 2;
      }

      // Step 1: Desenhe a imagem base (sem óculos) no canvas principal
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(imgBase, drawX, drawY, drawW, drawH);

      if (activeStamps.length > 0) {
        // Step 2: Use globalCompositeOperation = "destination-out" com o canvas mask para apagar temporariamente a imagem base
        ctx.globalCompositeOperation = 'destination-out';
        ctx.drawImage(maskCanvas, 0, 0);

        // Step 3: No canvas buf, desenhe o mask e use globalCompositeOperation = "source-in" para desenhar a imagem com óculos
        bufCtx.clearRect(0, 0, w, h);
        bufCtx.globalCompositeOperation = 'source-over';
        bufCtx.drawImage(maskCanvas, 0, 0);

        bufCtx.globalCompositeOperation = 'source-in';
        bufCtx.drawImage(imgGlasses, drawX, drawY, drawW, drawH);

        // Step 4: Desenhe o buf por cima do canvas principal com source-over
        ctx.globalCompositeOperation = 'source-over';
        ctx.drawImage(bufCanvas, 0, 0);
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameIdRef.current);
      resizeObserver.disconnect();
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('pointermove', onGlobalPointerMove);
      window.removeEventListener('pointerleave', onPointerLeaveWindow);
    };
  }, []);

  // Direct canvas pointer event helpers
  const handleCanvasPointer = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const x = (clientX - rect.left) * dpr;
    const y = (clientY - rect.top) * dpr;
    addPointerStamp(x, y);
  };

  return (
    <div
      ref={containerRef}
      className={`relative select-none pointer-events-auto perspective-[1200px] cursor-default ${className}`}
    >
      {/* 3D Atmospheric Rim Light (Electric Cyan/Ice Blue Aura matching reference) */}
      <motion.div
        style={{
          x: glowTranslateX,
          y: glowTranslateY,
        }}
        className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none"
      >
        <div className="w-[100%] h-[100%] rounded-full bg-[#0284C7]/12 blur-[90px] md:blur-[120px]" />
        <div className="w-[72%] h-[72%] rounded-full bg-[#0EA5E9]/22 blur-[65px] md:blur-[85px]" />
        <div className="w-[42%] h-[42%] rounded-full bg-[#38BDF8]/18 blur-[40px]" />
      </motion.div>

      {/* Breathing Cycle Container: Gentle, calm vertical bobbing on slow loop */}
      <motion.div
        animate={{
          y: [-3.5, 3.5, -3.5],
          scaleY: [1, 1.008, 1],
          scaleX: [1, 0.998, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 5.6,
          ease: 'easeInOut',
        }}
        style={{ transformOrigin: '50% 65%' }}
        className="w-full flex justify-center items-center pointer-events-auto"
      >
        {/* Natural Resting Torso Sway */}
        <motion.div
          animate={{
            rotateZ: [0, 0.4, 0, -0.4, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 9.5,
            ease: 'easeInOut',
          }}
          style={{ transformOrigin: '50% 65%', transformStyle: 'preserve-3d' }}
          className="w-full flex justify-center items-center pointer-events-auto"
        >
          {/* Layer 1: Torso / Shoulder Reactive Parallax Lean */}
          <motion.div
            style={{
              x: torsoX,
              y: torsoY,
              rotateZ: torsoRotateZ,
              transformStyle: 'preserve-3d',
              transformOrigin: '50% 65%',
            }}
            className="w-full flex justify-center items-center pointer-events-auto"
          >
            {/* Layer 2: Head & Neck 3D Perspective Rotation & Parallax */}
            <motion.div
              style={{
                x: headParallaxX,
                y: headParallaxY,
                rotateX: headRotateX,
                rotateY: headRotateY,
                rotateZ: headRotateZ,
                transformStyle: 'preserve-3d',
                transformOrigin: '50% 65%',
              }}
              className="w-full flex justify-center items-center will-change-transform pointer-events-auto"
            >
              <canvas
                ref={canvasRef}
                onPointerDown={(e) => handleCanvasPointer(e.clientX, e.clientY)}
                onPointerMove={(e) => handleCanvasPointer(e.clientX, e.clientY)}
                onPointerUp={() => {
                  lastPointRef.current = null;
                }}
                onPointerLeave={() => {
                  lastPointRef.current = null;
                }}
                onTouchStart={(e) => {
                  if (e.touches.length > 0) {
                    handleCanvasPointer(e.touches[0].clientX, e.touches[0].clientY);
                  }
                }}
                onTouchMove={(e) => {
                  if (e.touches.length > 0) {
                    handleCanvasPointer(e.touches[0].clientX, e.touches[0].clientY);
                  }
                }}
                onTouchEnd={() => {
                  lastPointRef.current = null;
                }}
                className={`w-full h-auto object-contain filter drop-shadow-[0_25px_60px_rgba(0,0,0,1)] drop-shadow-[0_0_35px_rgba(56,189,248,0.28)] contrast-[1.03] brightness-[1.02] saturate-[1.04] transition-opacity duration-300 touch-none pointer-events-auto ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* Fallback image while loading */}
              {!imageLoaded && (
                <img
                  src="/hero-character-noglasses.png"
                  alt="3D Character"
                  className="w-full h-auto object-contain filter drop-shadow-[0_25px_60px_rgba(0,0,0,1)] drop-shadow-[0_0_35px_rgba(56,189,248,0.28)] contrast-[1.03] brightness-[1.02] saturate-[1.04]"
                />
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default InteractiveCharacter;
