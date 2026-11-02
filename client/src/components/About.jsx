import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const CARD_COLORS = [
  'bg-[#ffd60a] text-[#0e1030]',
  'bg-[#ff5ca8] text-[#0e1030]',
  'bg-[#f1f2ff] text-[#0e1030]',
  'bg-[#2f2bff] text-[#f1f2ff]'
];

export const TiltCard = ({ children, className = '' }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = -(y / (rect.height / 2)) * 8;
    const rotY = (x / (rect.width / 2)) * 8;
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-200 ease-out will-change-transform ${className}`}
    >
      {children}
    </div>
  );
};

export const About = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 30%']
  });

  const words = portfolioData.about.intro.split(' ');

  return (
    <section id="about" ref={sectionRef} className="bg-[#f1f2ff] py-24 sm:py-32">
      <div className="layer mx-auto max-w-7xl px-4 sm:px-8">
        {/* Word-by-word Scrub Intro */}
        <h2 className="max-w-6xl font-display text-[clamp(2rem,5.4vw,5rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[#0e1030]">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = (i + 1) / words.length;
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const opacity = useTransform(scrollYProgress, [start * 0.4, end * 0.55], [0.18, 1]);

            return (
              <motion.span
                key={i}
                style={{ opacity }}
                className="inline-block mr-[0.28em] will-change-transform"
              >
                {word}
              </motion.span>
            );
          })}
        </h2>

        {/* Philosophy Blockquote Card */}
        <motion.blockquote
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ type: 'spring', stiffness: 100, damping: 16 }}
          className="mt-14 max-w-4xl rounded-[2rem] border-2 border-[#0e1030] bg-[#2f2bff] p-7 text-xl font-medium leading-relaxed text-[#f1f2ff] shadow-[8px_8px_0_#0e1030] sm:p-10 sm:text-2xl"
        >
          "{portfolioData.about.philosophy}"
        </motion.blockquote>

        {/* 4 Interactive 3D Tilt Stats Cards */}
        <dl className="mt-20 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {portfolioData.about.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 60, rotate: i % 2 === 0 ? -6 : 6 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ type: 'spring', stiffness: 120, damping: 14, delay: i * 0.08 }}
            >
              <TiltCard className="h-full">
                <div
                  className={`flex h-full min-h-[14rem] flex-col justify-between rounded-[2rem] border-2 border-[#0e1030] p-6 shadow-[6px_6px_0_#0e1030] ${
                    CARD_COLORS[i % CARD_COLORS.length]
                  }`}
                >
                  <dd className="font-display text-[clamp(2.6rem,5.5vw,4.2rem)] font-black leading-none tracking-tight tabular-nums">
                    {stat.value}
                  </dd>
                  <dt className="mt-6 text-lg font-semibold leading-snug">
                    {stat.label}
                  </dt>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </dl>

        {/* Highlights List */}
        <ul className="mt-20 border-t-2 border-[#0e1030]">
          {portfolioData.about.highlights.map((h, i) => (
            <motion.li
              key={h.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ type: 'spring', stiffness: 140, damping: 18 }}
              className="group relative overflow-hidden border-b-2 border-[#0e1030] py-8 transition-[padding] duration-300 lg:group-hover:pl-4"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
                <span className="font-display text-2xl font-black text-[#0e1030] sm:text-3xl transition-colors group-hover:text-[#2f2bff]">
                  {h.title}
                </span>
                <span className="text-base text-[#4a4e78] sm:max-w-md sm:text-right font-medium">
                  {h.desc}
                </span>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};
