import React, { useEffect, useRef, useState, type FC } from 'react';
import { motion, useSpring } from 'framer-motion';

interface Position {
  x: number;
  y: number;
}

export interface SmoothCursorProps {
  cursor?: React.ReactNode;
  containerRef?: React.RefObject<HTMLElement | null>;
  springConfig?: {
    damping: number;
    stiffness: number;
    mass: number;
    restDelta?: number;
  };
}

const DESKTOP_POINTER_QUERY = '(any-hover: hover) and (any-pointer: fine)';

function isTrackablePointer(pointerType: string) {
  return pointerType !== 'touch';
}

const isInteractiveElement = (target: EventTarget | null): boolean => {
  if (!target || !(target instanceof Element)) return false;
  return Boolean(
    target.closest('a, button, [role="button"], input, select, textarea, [data-interactive="true"]')
  );
};

export const DefaultCursorSVG: FC<{ isHovering?: boolean }> = ({ isHovering = false }) => {
  return (
    <div className="relative flex items-center justify-center select-none pointer-events-none">
      {/* Subtle Cyan Glow Aura only on Hover */}
      <div
        className={`absolute inset-0 rounded-full bg-[#38BDF8] blur-md transition-opacity duration-300 pointer-events-none ${
          isHovering ? 'opacity-35 scale-125' : 'opacity-0 scale-75'
        }`}
      />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={26}
        height={28}
        viewBox="0 0 50 54"
        fill="none"
        shapeRendering="geometricPrecision"
        className="transition-colors duration-200"
        style={{
          filter: isHovering
            ? 'drop-shadow(0 0 6px rgba(56, 189, 248, 0.65)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.7))'
            : 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.6))',
        }}
      >
        <defs>
          <linearGradient id="cursorBodyGrad" x1="25" y1="5" x2="25" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0B1329" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
        </defs>
        <path
          d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
          fill="url(#cursorBodyGrad)"
          stroke={isHovering ? '#38BDF8' : '#FFFFFF'}
          strokeWidth={2.6}
          strokeLinejoin="round"
          strokeLinecap="round"
          className="transition-colors duration-200"
        />
      </svg>
    </div>
  );
};

export const SmoothCursor: React.FC<SmoothCursorProps> = ({
  cursor,
  containerRef,
  springConfig = {
    damping: 45,
    stiffness: 400,
    mass: 1,
    restDelta: 0.001,
  },
}) => {
  const lastMousePos = useRef<Position>({ x: 0, y: 0 });
  const velocity = useRef<Position>({ x: 0, y: 0 });
  const lastUpdateTime = useRef(Date.now());
  const previousAngle = useRef(0);
  const accumulatedRotation = useRef(0);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);
  const rotation = useSpring(0, {
    ...springConfig,
    damping: 55,
    stiffness: 320,
  });
  const scale = useSpring(1, {
    ...springConfig,
    stiffness: 500,
    damping: 35,
  });

  // Check pointer capability (disabled on touch devices)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia(DESKTOP_POINTER_QUERY);

    const updateEnabled = () => {
      const nextIsEnabled = mediaQuery.matches;
      setIsEnabled(nextIsEnabled);
      if (!nextIsEnabled) {
        setIsVisible(false);
      }
    };

    updateEnabled();
    mediaQuery.addEventListener('change', updateEnabled);

    return () => {
      mediaQuery.removeEventListener('change', updateEnabled);
    };
  }, []);

  useEffect(() => {
    if (!isEnabled || typeof window === 'undefined') return;

    let timeout: ReturnType<typeof setTimeout> | null = null;
    let rafId = 0;

    const updateVelocity = (currentPos: Position) => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastUpdateTime.current;

      if (deltaTime > 0) {
        velocity.current = {
          x: (currentPos.x - lastMousePos.current.x) / deltaTime,
          y: (currentPos.y - lastMousePos.current.y) / deltaTime,
        };
      }

      lastUpdateTime.current = currentTime;
      lastMousePos.current = currentPos;
    };

    const isInsideContainer = (clientX: number, clientY: number): boolean => {
      if (!containerRef || !containerRef.current) return true;
      const rect = containerRef.current.getBoundingClientRect();
      return (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      );
    };

    const smoothPointerMove = (e: PointerEvent) => {
      if (!isTrackablePointer(e.pointerType)) return;

      const inside = isInsideContainer(e.clientX, e.clientY);

      if (!inside) {
        setIsVisible(false);
        setIsHovering(false);
        return;
      }

      setIsVisible(true);
      const interactive = isInteractiveElement(e.target);
      setIsHovering(interactive);

      const currentPos = { x: e.clientX, y: e.clientY };
      updateVelocity(currentPos);

      const speed = Math.sqrt(
        Math.pow(velocity.current.x, 2) + Math.pow(velocity.current.y, 2)
      );

      cursorX.set(currentPos.x);
      cursorY.set(currentPos.y);

      if (speed > 0.1) {
        const currentAngle =
          Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI) + 90;

        let angleDiff = currentAngle - previousAngle.current;
        if (angleDiff > 180) angleDiff -= 360;
        if (angleDiff < -180) angleDiff += 360;
        accumulatedRotation.current += angleDiff;
        rotation.set(accumulatedRotation.current);
        previousAngle.current = currentAngle;

        scale.set(interactive ? 1.15 : 0.92);

        if (timeout !== null) {
          clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
          scale.set(interactive ? 1.15 : 1);
        }, 140);
      } else {
        scale.set(interactive ? 1.15 : 1);
      }
    };

    const throttledPointerMove = (e: PointerEvent) => {
      if (!isTrackablePointer(e.pointerType)) return;

      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        smoothPointerMove(e);
        rafId = 0;
      });
    };

    const handlePointerLeave = () => {
      setIsVisible(false);
      setIsHovering(false);
    };

    const targetElement = containerRef?.current;
    if (targetElement) {
      targetElement.style.cursor = 'none';
      targetElement.addEventListener('pointerleave', handlePointerLeave);
    } else {
      document.body.style.cursor = 'none';
    }

    const handlePointerDown = () => scale.set(0.82);
    const handlePointerUp = () => scale.set(isHovering ? 1.15 : 1);

    window.addEventListener('pointermove', throttledPointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', throttledPointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      if (targetElement) {
        targetElement.style.cursor = 'auto';
        targetElement.removeEventListener('pointerleave', handlePointerLeave);
      } else {
        document.body.style.cursor = 'auto';
      }
      if (rafId) cancelAnimationFrame(rafId);
      if (timeout !== null) clearTimeout(timeout);
    };
  }, [cursorX, cursorY, rotation, scale, isEnabled, containerRef, isHovering]);

  if (!isEnabled) return null;

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: cursorX,
        top: cursorY,
        translateX: '-50%',
        translateY: '-50%',
        rotate: rotation,
        scale: scale,
        zIndex: 9999,
        pointerEvents: 'none',
        transformOrigin: 'center center',
      }}
      initial={false}
      animate={{
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        duration: 0.15,
        ease: 'easeOut',
      }}
    >
      {cursor || <DefaultCursorSVG isHovering={isHovering} />}
    </motion.div>
  );
};

export default SmoothCursor;
