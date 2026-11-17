import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface DepthCyberGridProps {
  mouseX?: MotionValue<number>;
  mouseY?: MotionValue<number>;
}

export const DepthCyberGrid: React.FC<DepthCyberGridProps> = ({ mouseX, mouseY }) => {
  // Subtle parallax tilt if mouse values are provided
  const tiltX = mouseX ? useTransform(mouseX, [-1, 1], [-6, 6]) : 0;
  const tiltY = mouseY ? useTransform(mouseY, [-1, 1], [4, -4]) : 0;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden max-w-full [clip-path:inset(0)] [perspective:1000px] z-0 select-none">
      {/* 3D Tilted Perspective Floor / Horizon Grid in Pure Dark Monochrome */}
      <motion.div
        style={{
          x: tiltX,
          y: tiltY,
          rotateX: 58,
          transformOrigin: '50% 85%',
        }}
        className="absolute -bottom-[20%] left-1/2 -translate-x-1/2 w-full sm:w-[160vw] max-w-[160vw] h-[120vh] opacity-10 [mask-image:radial-gradient(ellipse_at_center_bottom,black_20%,transparent_75%)]"
      >
        {/* Pure subtle monochrome grid lines */}
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
          }}
        />
      </motion.div>
    </div>
  );
};
