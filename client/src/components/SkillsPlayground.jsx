import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Move } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { HoverTarget } from '../context/CursorContext';
import { TechIcon } from './TechIcon';

export const SkillsPlayground = () => {
  const [activeTab, setActiveTab] = useState(0);
  const sandboxRef = useRef(null);

  const currentLayer = portfolioData.skillLayers[activeTab];

  return (
    <section id="skills" className="bg-[#2f2bff] py-24 text-[#f1f2ff] sm:py-32">
      <div className="layer mx-auto max-w-7xl px-4 sm:px-8">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 80, skewY: 4 }}
          whileInView={{ opacity: 1, y: 0, skewY: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ type: 'spring', stiffness: 90, damping: 16 }}
          className="font-display text-[clamp(2.6rem,8vw,7.5rem)] font-black leading-[0.92] tracking-[-0.04em]"
        >
          The stack behind the code
        </motion.h2>

        <p className="mt-6 max-w-2xl text-xl text-[#f1f2ff]/85 sm:text-2xl font-medium">
          Pick a layer, then throw the pieces around. They're grouped the way I actually reach for them.
        </p>

        {/* Tab List & Draggable Playground */}
        <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)]">
          {/* Left Category Tabs */}
          <div
            className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0"
            role="tablist"
            aria-label="Skill categories"
          >
            {portfolioData.skillLayers.map((layer, idx) => {
              const isSelected = activeTab === idx;
              return (
                <HoverTarget
                  key={layer.id}
                  as="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveTab(idx)}
                  onFocus={() => setActiveTab(idx)}
                  variant="link"
                  className={`group relative flex shrink-0 items-center justify-between gap-4 rounded-full border-2 px-5 py-3 text-left font-display text-base font-bold transition-colors lg:rounded-none lg:border-0 lg:border-b-2 lg:border-[#f1f2ff]/25 lg:px-0 lg:py-5 lg:text-3xl ${
                    isSelected
                      ? 'border-[#ffd60a] bg-[#ffd60a] text-[#0e1030] lg:bg-transparent lg:text-[#ffd60a]'
                      : 'border-[#f1f2ff]/40 text-[#f1f2ff] hover:text-[#ffd60a]'
                  }`}
                >
                  <span className="transition-transform duration-300 group-hover:translate-x-2">
                    {layer.title}
                  </span>
                  <ArrowRight
                    className={`hidden h-7 w-7 shrink-0 transition-all duration-300 lg:block ${
                      isSelected
                        ? 'translate-x-0 opacity-100'
                        : '-translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-60'
                    }`}
                  />
                </HoverTarget>
              );
            })}
          </div>

          {/* Right Draggable Physics Sandbox */}
          <div
            ref={sandboxRef}
            className="relative min-h-[26rem] overflow-hidden rounded-[2rem] border-2 border-[#0e1030] bg-[#1d19c9] p-6 shadow-[8px_8px_0_#0e1030] sm:p-8"
            role="tabpanel"
            aria-label={currentLayer.title}
          >
            <p className="mb-6 flex items-center gap-2 text-sm font-semibold text-[#f1f2ff]/75">
              <Move className="h-4 w-4 text-[#ffd60a]" />
              <span>Drag any chip. It stays where you drop it.</span>
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentLayer.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="flex flex-wrap gap-3.5"
              >
                {currentLayer.tags.map((tag, tagIdx) => (
                  <motion.div
                    key={tag.name}
                    drag
                    dragConstraints={sandboxRef}
                    dragElastic={0.25}
                    dragMomentum={true}
                    whileHover={{ scale: 1.08, rotate: tagIdx % 2 ? 3 : -3 }}
                    whileDrag={{ scale: 1.15, zIndex: 50 }}
                    whileTap={{ scale: 0.95 }}
                    className={`cursor-grab active:cursor-grabbing rounded-full border-2 border-[#0e1030] px-5 py-2.5 font-display text-sm font-bold shadow-[4px_4px_0_#0e1030] select-none transition-shadow hover:shadow-[6px_6px_0_#0e1030] ${tag.bg}`}
                  >
                    {tag.name}
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* 24 Tech Icons Grid */}
        <div className="mt-20">
          <h3 className="mb-8 font-display text-xl font-bold tracking-tight text-[#ffd60a] sm:text-2xl">
            Technologies & Tools in Production
          </h3>

          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
            {portfolioData.techGridIcons.map((tech) => (
              <HoverTarget
                key={tech.name}
                variant="view"
                label={tech.category}
                className="group relative flex flex-col items-center justify-center rounded-2xl border-2 border-[#f1f2ff]/20 bg-[#1d19c9]/60 p-4 transition-all duration-300 hover:border-[#ffd60a] hover:bg-[#1d19c9] hover:shadow-[4px_4px_0_#ffd60a]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f1f2ff]/10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <TechIcon name={tech.name} className="h-6 w-6" />
                </div>
                <span className="mt-2 text-center font-display text-xs font-semibold text-[#f1f2ff] group-hover:text-[#ffd60a]">
                  {tech.name}
                </span>
              </HoverTarget>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
