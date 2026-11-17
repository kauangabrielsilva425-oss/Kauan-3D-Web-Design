import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface CharacterProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Character: React.FC<CharacterProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.3, 1]);
  const color = useTransform(progress, range, ['#475569', '#F8FAFC']);

  return (
    <span className="relative inline-block">
      {/* Invisible placeholder */}
      <span className="invisible select-none" aria-hidden="true">
        {char}
      </span>
      {/* Absolute positioned animated span */}
      <motion.span
        style={{ opacity, color }}
        className="absolute inset-0 left-0 top-0 select-text font-light"
      >
        {char}
      </motion.span>
    </span>
  );
};

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const totalChars = text.length;
  let charCounter = 0;

  const words = text.split(' ');

  return (
    <p
      ref={containerRef}
      className={`text-[#94A3B8] font-light text-center leading-[1.85] sm:leading-[1.9] tracking-[-0.01em] ${className}`}
    >
      {words.map((word, wordIndex) => {
        const wordChars = word.split('');
        return (
          <span key={wordIndex} className="inline-block whitespace-nowrap">
            {wordChars.map((char) => {
              const start = charCounter / totalChars;
              const step = 1 / totalChars;
              const end = Math.min(1, start + step);
              const charIndex = charCounter++;

              return (
                <Character
                  key={charIndex}
                  char={char}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
            {wordIndex < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        );
      })}
    </p>
  );
};
