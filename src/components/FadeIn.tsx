import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  scale?: number;
  blur?: boolean;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  id?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 1.15,
  x = 0,
  y = 30,
  scale = 1,
  blur = true,
  className = '',
  as = 'div',
  id,
}) => {
  // Use motion.create for dynamic element support in Framer Motion v12
  const MotionComponent = (motion as any).create
    ? (motion as any).create(as)
    : (motion as any)[as] || motion.div;

  return (
    <MotionComponent
      id={id}
      initial={{
        opacity: 0,
        x,
        y,
        scale: scale !== 1 ? scale : 1,
        filter: blur ? 'blur(8px)' : 'none',
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
      }}
      viewport={{ once: true, margin: '-20px', amount: 0.05 }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
};

