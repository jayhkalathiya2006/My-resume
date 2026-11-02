import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    mass: 0.2
  });

  return (
    <motion.div
      className="fixed left-0 top-0 z-[60] h-1.5 w-full origin-left bg-[#ff5ca8]"
      style={{ scaleX }}
    />
  );
};
