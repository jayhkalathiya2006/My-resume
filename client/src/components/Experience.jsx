import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MapPin, Calendar, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { HoverTarget } from '../context/CursorContext';

gsap.registerPlugin(ScrollTrigger);

export const Experience = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: Horizontal pin & scroll track
      mm.add('(min-width: 1024px)', () => {
        const track = containerRef.current.querySelector('.exp-track');
        if (!track) return;

        const scrollDistance = track.scrollWidth - window.innerWidth + 80;
        if (scrollDistance <= 60) {
          gsap.utils.toArray('.exp-card').forEach((card) => {
            gsap.from(card, {
              y: 40,
              opacity: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%'
              }
            });
          });
          return;
        }

        const anim = gsap.to(track, {
          x: () => -scrollDistance,
          ease: 'none',
          scrollTrigger: {
            trigger: '.exp-pin',
            pin: true,
            scrub: 0.8,
            start: 'top top',
            end: () => `+=${scrollDistance}`,
            invalidateOnRefresh: true
          }
        });

        // Rotate and scale cards smoothly as they scroll into view
        gsap.utils.toArray('.exp-card').forEach((card, idx) => {
          gsap.fromTo(
            card,
            { rotate: idx % 2 === 0 ? -6 : 6, scale: 0.88, y: idx % 2 === 0 ? 50 : -50 },
            {
              rotate: 0,
              scale: 1,
              y: 0,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                containerAnimation: anim,
                start: 'left 100%',
                end: 'left 45%',
                scrub: true
              }
            }
          );
        });
      });

      // Mobile: Vertical entrance animations
      mm.add('(max-width: 1023px)', () => {
        gsap.utils.toArray('.exp-card').forEach((card, idx) => {
          gsap.from(card, {
            x: idx % 2 === 0 ? -100 : 100,
            opacity: 0,
            duration: 0.8,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%'
            }
          });
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={containerRef} className="bg-[#f1f2ff] overflow-hidden">
      <div className="exp-pin layer flex flex-col py-24 lg:h-[100svh] lg:justify-center lg:overflow-hidden lg:py-0 lg:pt-16">
        <div className="exp-track flex flex-col gap-8 px-4 sm:px-8 mx-auto max-w-4xl lg:mx-0 lg:max-w-none lg:w-max lg:flex-row lg:items-center lg:gap-10 lg:pr-[12vw]">
          {/* Section Introduction Column */}
          <div className="lg:w-[42vw] lg:shrink-0">
            <h2 className="font-display text-[clamp(2.8rem,7.5vw,8rem)] font-black leading-[0.9] tracking-[-0.04em] text-[#0e1030]">
              Where I've shipped it
            </h2>

            <p className="mt-6 max-w-xl text-xl text-[#4a4e78] sm:text-2xl font-medium">
              Venture founder & industry development: building intelligent AI solutions at NO FOUND AI Tech Solution and high-performance cross-platform applications at Visyom AI.
            </p>

            {portfolioData.experiences.length > 1 && (
              <div className="mt-8 hidden items-center gap-3 font-display text-lg font-bold text-[#2f2bff] lg:flex">
                <span>Keep scrolling</span>
                <ArrowRight className="h-6 w-6 animate-pulse" />
              </div>
            )}
          </div>

          {/* Experience Cards */}
          {portfolioData.experiences.map((exp) => (
            <HoverTarget
              key={exp.id}
              as="article"
              variant="link"
              className={`exp-card relative flex flex-col rounded-[2rem] border-2 border-[#0e1030] p-5 shadow-[6px_6px_0_#0e1030] sm:p-6 lg:w-[min(32rem,40vw)] lg:shrink-0 ${exp.cardColor}`}
            >
              {/* Header row with badge & period */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#0e1030] bg-[#0e1030] font-display font-black text-lg text-[#ffd60a]">
                  {exp.id}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {exp.type && (
                    <span className="rounded-full border-2 border-[#0e1030] bg-[#f1f2ff] px-2.5 py-0.5 font-display text-[11px] font-bold text-[#0e1030] shadow-[2px_2px_0_#0e1030]">
                      {exp.type}
                    </span>
                  )}
                  <div className="inline-flex items-center gap-1 rounded-full border-2 border-[#0e1030] bg-[#f1f2ff] px-3 py-0.5 font-display text-[11px] font-bold text-[#0e1030] shadow-[2px_2px_0_#0e1030]">
                    <Calendar className="h-3 w-3" />
                    <span>{exp.period}</span>
                  </div>
                </div>
              </div>

              {/* Title & Organization */}
              <h3 className="mt-4 font-display text-xl font-black leading-tight tracking-tight sm:text-2xl">
                {exp.role}
              </h3>

              <div className="mt-1.5 flex items-center gap-2 text-sm font-semibold opacity-85">
                {exp.companyUrl ? (
                  <a
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Open LinkedIn page for ${exp.company}`}
                    className="group/link inline-flex items-center gap-1 font-bold underline decoration-2 underline-offset-2 transition-colors hover:text-[#2f2bff] hover:decoration-[#2f2bff]"
                  >
                    <span>{exp.company}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                  </a>
                ) : (
                  <span className="font-bold underline decoration-2">{exp.company}</span>
                )}
                <span>•</span>
                <span className="flex items-center gap-1 text-xs font-medium">
                  <MapPin className="h-3 w-3" />
                  {exp.location}
                </span>
              </div>

              {exp.overview && (
                <p className="mt-3 text-xs font-semibold leading-relaxed opacity-95 rounded-xl border border-current/20 bg-current/5 p-2.5">
                  {exp.overview}
                </p>
              )}

              {/* Bullet Points */}
              <ul className="mt-3.5 space-y-1.5">
                {exp.description.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2 text-xs sm:text-[13px] leading-relaxed opacity-90 font-medium">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#2f2bff]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Stack Pills */}
              <div className="mt-5 flex flex-wrap gap-1.5 pt-3 border-t-2 border-current/20">
                {exp.tech.map((t) => (
                  <span
                    key={t}
                    className={`rounded-full border-2 border-[#0e1030] px-2.5 py-0.5 text-[11px] font-bold shadow-[2px_2px_0_#0e1030] ${exp.tagColor}`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </HoverTarget>
          ))}
        </div>
      </div>
    </section>
  );
};
