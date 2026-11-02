import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Layers, Cpu, Database, Code2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { TiltCard } from './About';

export const Education = () => {
  return (
    <section id="education" className="bg-[#f1f2ff] py-24 sm:py-32">
      <div className="layer mx-auto max-w-7xl px-4 sm:px-8">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ type: 'spring', stiffness: 110, damping: 14 }}
          className="font-display text-[clamp(2.6rem,7vw,6.5rem)] font-black leading-[0.92] tracking-[-0.04em] text-[#0e1030]"
        >
          Academic foundation & technical growth
        </motion.h2>

        <p className="mt-6 max-w-2xl text-xl text-[#4a4e78] sm:text-2xl font-medium">
          Bachelor of Computer Applications (BCA): foundational computer science theory paired with hands-on cross-platform mobile and frontend application development.
        </p>

        {/* Degree Cards */}
        <div className={`mt-14 grid gap-6 ${portfolioData.education.length > 1 ? 'md:grid-cols-2' : 'max-w-2xl'}`}>
          {portfolioData.education.map((edu, idx) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: idx === 0 ? -80 : 80, rotate: idx === 0 ? -4 : 4 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ type: 'spring', stiffness: 100, damping: 15, delay: idx * 0.1 }}
            >
              <TiltCard className="h-full">
                <article
                  className={`group flex h-full flex-col rounded-[2rem] border-2 border-[#0e1030] p-7 shadow-[8px_8px_0_#0e1030] sm:p-10 ${
                    idx === 0 ? 'bg-[#ffd60a] text-[#0e1030]' : 'bg-[#ff5ca8] text-[#0e1030]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-[#0e1030] bg-[#f1f2ff] text-[#0e1030] transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110">
                      {idx === 0 ? (
                        <GraduationCap className="h-8 w-8 text-[#2f2bff]" />
                      ) : (
                        <Award className="h-8 w-8 text-[#2f2bff]" />
                      )}
                    </span>

                    <span className="rounded-full border-2 border-[#0e1030] bg-[#f1f2ff] px-4 py-1.5 font-display text-xs font-bold text-[#0e1030] shadow-[2px_2px_0_#0e1030]">
                      {edu.period}
                    </span>
                  </div>

                  <h3 className="mt-8 font-display text-2xl font-black leading-tight tracking-tight sm:text-3xl">
                    {edu.degree}
                  </h3>

                  <p className="mt-2 text-lg font-bold opacity-85">
                    {edu.institution}
                  </p>

                  <p className="mt-6 text-base leading-relaxed opacity-90 sm:text-lg font-medium">
                    {edu.description}
                  </p>
                </article>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Going Deeper Focus Pillars */}
        <h3 className="mt-20 font-display text-2xl font-black text-[#0e1030] sm:text-3xl">
          Going deeper on right now
        </h3>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {portfolioData.learningPillars.map((pillar, idx) => (
            <motion.article
              key={pillar.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              whileHover={{ y: -6, rotate: idx % 2 === 0 ? 1 : -1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="flex items-start gap-4 rounded-2xl border-2 border-[#0e1030] bg-[#f1f2ff] p-6 shadow-[5px_5px_0_#0e1030]"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-[#0e1030] bg-[#2f2bff] text-[#ffd60a]">
                {idx === 0 && <Layers className="h-6 w-6" />}
                {idx === 1 && <Cpu className="h-6 w-6" />}
                {idx === 2 && <Database className="h-6 w-6" />}
                {idx === 3 && <Code2 className="h-6 w-6" />}
              </div>

              <div>
                <h4 className="font-display text-lg font-bold text-[#0e1030]">
                  {pillar.title}
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-[#4a4e78] font-medium">
                  {pillar.desc}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
