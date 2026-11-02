import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Lock, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { HoverTarget } from '../context/CursorContext';

const GithubIcon = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const CATEGORIES = ['All', 'Mobile Application', 'Real Estate CRM', 'Food Delivery Platform', 'Social Media Mobile Application'];

export const Projects = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [hoveredProject, setHoveredProject] = useState(null);

  const filteredProjects = selectedFilter === 'All'
    ? portfolioData.projects
    : portfolioData.projects.filter((p) => p.category === selectedFilter);

  return (
    <section id="projects" className="bg-[#ffd60a] py-24 text-[#0e1030] sm:py-32">
      <div className="layer mx-auto max-w-7xl px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ type: 'spring', stiffness: 90, damping: 15 }}
              className="font-display text-[clamp(3rem,10vw,9.5rem)] font-black leading-[0.88] tracking-[-0.05em]"
            >
              Selected
              <br />
              <span className="outline-text">work</span>
            </motion.h2>

            <p className="mt-6 max-w-xl text-xl font-medium sm:text-2xl">
              Production-grade mobile applications, multi-panel platforms, and responsive interfaces.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedFilter === cat;
              return (
                <HoverTarget
                  key={cat}
                  as="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedFilter(cat)}
                  variant="link"
                  className={`relative rounded-full border-2 border-[#0e1030] px-5 py-2.5 font-display text-sm font-bold transition-colors ${
                    isSelected ? 'text-[#f1f2ff]' : 'bg-[#f1f2ff] text-[#0e1030] hover:bg-[#ff5ca8]'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="project-filter"
                      className="absolute inset-0 rounded-full bg-[#0e1030]"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                  <span className="relative">{cat}</span>
                </HoverTarget>
              );
            })}
          </div>
        </div>

        {/* Project Rows */}
        <motion.ul
          layout
          className="mt-16 border-t-2 border-[#0e1030]"
          onMouseLeave={() => setHoveredProject(null)}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj, idx) => {
              const hasLive = Boolean(proj.link);

              return (
                <motion.li
                  key={proj.id}
                  layout
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -80 : 80 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ type: 'spring', stiffness: 140, damping: 18 }}
                  onMouseEnter={() => setHoveredProject(proj)}
                  className="group relative overflow-hidden border-b-2 border-[#0e1030] transition-colors"
                >
                  {/* Sliding Hover Underlay */}
                  <span className="absolute inset-0 origin-left scale-x-0 bg-[#0e1030] transition-transform duration-300 ease-out group-hover:scale-x-100" />

                  <HoverTarget
                    as={hasLive ? 'a' : 'div'}
                    {...(hasLive
                      ? {
                          href: proj.link,
                          target: '_blank',
                          rel: 'noreferrer'
                        }
                      : {})}
                    variant="view"
                    label={hasLive ? 'Open Play Store' : proj.github ? 'Code' : 'Private'}
                    className="relative z-10 flex flex-col justify-between gap-6 p-6 transition-colors duration-300 group-hover:text-[#f1f2ff] sm:p-10 lg:flex-row lg:items-center cursor-pointer"
                  >
                    {/* Left Details */}
                    <div className="lg:max-w-md">
                      <div className="flex items-center gap-3">
                        <span className="rounded-full border border-current px-3 py-1 font-display text-xs font-bold uppercase tracking-wider">
                          {proj.category}
                        </span>
                        <span className="text-sm font-semibold opacity-70">
                          {proj.period}
                        </span>
                      </div>

                      <h3 className="mt-3 font-display text-3xl font-black leading-tight sm:text-5xl transition-transform duration-300 group-hover:translate-x-2">
                        {proj.title}
                      </h3>
                      <p className="mt-1 text-base font-semibold text-[#2f2bff] group-hover:text-[#ffd60a]">
                        {proj.subtitle}
                      </p>
                    </div>

                    {/* Middle Description & Tech */}
                    <div className="lg:max-w-lg">
                      <p className="text-base leading-relaxed opacity-90 sm:text-lg font-medium">
                        {proj.description}
                      </p>

                      {proj.features && proj.features.length > 0 && (
                        <ul className="mt-3 grid grid-cols-1 gap-1 text-xs font-semibold opacity-85 sm:grid-cols-2">
                          {proj.features.slice(0, 4).map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-current" />
                              <span className="truncate">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="mt-4 flex flex-wrap gap-2">
                        {proj.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-current px-3 py-1 text-xs font-bold transition-colors group-hover:bg-[#f1f2ff]/10"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right Action Buttons */}
                    <div className="flex items-center gap-3 shrink-0">
                      {proj.isPrivate || (!proj.github && !proj.link) ? (
                        <div className="flex items-center gap-2 rounded-full border-2 border-current px-4 py-2 font-display text-xs font-bold">
                          <Lock className="h-4 w-4" />
                          <span>Private Project</span>
                        </div>
                      ) : (
                        <>
                          {proj.github && (
                            <span
                              aria-label={`GitHub repository for ${proj.title}`}
                              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#0e1030] bg-[#f1f2ff] text-[#0e1030] shadow-[3px_3px_0_#0e1030] transition-transform hover:scale-110 hover:bg-[#ffd60a]"
                            >
                              <GithubIcon className="h-5 w-5" />
                            </span>
                          )}
                          {proj.link && (
                            <span
                              aria-label={`Open link for ${proj.title}`}
                              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#0e1030] bg-[#2f2bff] text-[#f1f2ff] shadow-[3px_3px_0_#0e1030] transition-transform hover:scale-110 hover:bg-[#ff5ca8]"
                            >
                              <ArrowUpRight className="h-6 w-6" />
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </HoverTarget>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>

        {/* Floating Hover Badge Preview */}
        {hoveredProject && (
          <div className="mt-8 hidden lg:flex items-center justify-between rounded-2xl border-2 border-[#0e1030] bg-[#2f2bff] px-6 py-4 text-[#f1f2ff] shadow-[6px_6px_0_#0e1030]">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-[#ffd60a]" />
              <span className="font-display font-bold">Featured Highlight:</span>
              <span className="font-medium text-[#ffd60a]">{hoveredProject.highlight}</span>
            </div>
            <div className="font-display text-xs font-bold uppercase tracking-wider text-[#f1f2ff]/80">
              Stack: {hoveredProject.tech.slice(0, 3).join(' • ')}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
