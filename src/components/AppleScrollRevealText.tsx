import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface AppleScrollRevealTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
}

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  wordClassName?: string;
}

const Word: React.FC<WordProps> = ({ children, progress, range, wordClassName }) => {
  // Clear, crisp base opacity (0.58) so the text is fully legible without any blurry haze
  const opacity = useTransform(progress, range, [0.58, 1]);
  const y = useTransform(progress, range, [1.5, 0]);

  return (
    <span className="relative inline-block mr-[0.26em] my-[0.06em] whitespace-nowrap">
      <motion.span
        style={{
          opacity,
          y,
        }}
        className={`inline-block transition-colors duration-200 select-text ${wordClassName || 'text-white'}`}
      >
        {children}
      </motion.span>
    </span>
  );
};

export const AppleScrollRevealText: React.FC<AppleScrollRevealTextProps> = ({
  text,
  className = '',
  wordClassName = '',
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.90', 'end 0.40'],
  });

  const words = text.split(' ');

  return (
    <p ref={containerRef} className={`flex flex-wrap leading-relaxed select-text ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[start, end]}
            wordClassName={wordClassName}
          >
            {word}
          </Word>
        );
      })}
    </p>
  );
};

export default AppleScrollRevealText;
