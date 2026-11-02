import React from 'react';
import { motion, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';

const StarIcon = ({ className = 'h-10 w-10' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`shrink-0 animate-spin-slow ${className}`}
  >
    <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
  </svg>
);

export const Marquee = ({
  items = [],
  className = 'bg-[#2f2bff] text-[#ffd60a]',
  reverse = false,
  baseVelocity = 2
}) => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const skewX = useTransform(smoothVelocity, [-2000, 0, 2000], [-6, 0, 6]);

  return (
    <div className={`overflow-hidden py-6 select-none sm:py-9 ${className}`} aria-label={items.join(', ')}>
      <motion.div
        className="flex w-max whitespace-nowrap"
        style={{ skewX }}
      >
        <motion.div
          className="flex shrink-0 items-center gap-6"
          animate={{
            x: reverse ? ['-50%', '0%'] : ['0%', '-50%']
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          {/* Double items for seamless infinite loop */}
          {[...items, ...items, ...items, ...items].map((item, idx) => (
            <span key={idx} className="flex items-center gap-6">
              <span
                className={`font-display text-4xl font-black tracking-tight transition-all duration-300 hover:scale-105 sm:text-7xl lg:text-8xl ${
                  idx % 2 === 1
                    ? 'outline-text hover:[-webkit-text-fill-color:currentColor]'
                    : 'hover:text-[#ff5ca8]'
                }`}
              >
                {item}
              </span>
              <StarIcon className="h-8 w-8 sm:h-12 sm:w-12" />
            </span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};
