import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ArrowDown, Sparkles } from 'lucide-react';
import { HoverTarget } from '../context/CursorContext';
import { portfolioData } from '../data/portfolioData';

const WAVE_BARS = 44;

export const Waveform = () => {
  const barsRef = useRef([]);

  useEffect(() => {
    let intensity = 0.15;
    let prevPos = { x: 0, y: 0 };
    let animId = 0;

    const onPointerMove = (e) => {
      const dist = Math.hypot(e.clientX - prevPos.x, e.clientY - prevPos.y);
      prevPos = { x: e.clientX, y: e.clientY };
      intensity = Math.min(1, intensity + dist / 380);
    };

    const loop = (time) => {
      intensity = Math.max(0.12, intensity * 0.96);
      barsRef.current.forEach((bar, idx) => {
        if (!bar) return;
        const wave = Math.sin(time * 0.006 + idx * 0.55) * 0.5 + Math.sin(time * 0.011 + idx * 1.3) * 0.5;
        const scale = 0.12 + Math.abs(wave) * intensity;
        bar.style.transform = `scaleY(${Math.min(1, Math.max(0.08, scale))})`;
      });
      animId = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  return (
    <div className="flex h-16 items-center gap-[3px] sm:h-20" aria-hidden="true">
      {Array.from({ length: WAVE_BARS }).map((_, i) => {
        const color = i % 7 === 0 ? 'bg-[#ff5ca8]' : i % 3 === 0 ? 'bg-[#ffd60a]' : 'bg-[#2f2bff]';
        return (
          <span
            key={i}
            ref={(el) => (barsRef.current[i] = el)}
            className={`block h-full w-[4px] origin-center rounded-full sm:w-[5px] ${color}`}
            style={{ transform: 'scaleY(0.2)' }}
          />
        );
      })}
    </div>
  );
};

export const Hero = ({ ready = true }) => {
  const containerRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const xLeft = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);
  const xRight = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const stickerRotate = useTransform(scrollYProgress, [0, 1], [0, 200]);

  // Rotate roles
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % portfolioData.rotatingRoles.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  // Entrance GSAP animation
  useEffect(() => {
    if (!ready) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set('.hero-letter, .hero-fade, .hero-sticker', { opacity: 1, scale: 1 });
      return;
    }

    const tl = gsap.timeline();
    tl.from('.hero-letter', {
      x: () => gsap.utils.random(-400, 400),
      y: () => gsap.utils.random(-300, 300),
      rotation: () => gsap.utils.random(-140, 140),
      scale: () => gsap.utils.random(0.3, 2.2),
      opacity: 0,
      duration: 1.1,
      ease: 'expo.out',
      stagger: { each: 0.035, from: 'random' }
    })
      .from('.hero-sticker', {
        scale: 0,
        rotation: -140,
        duration: 0.9,
        ease: 'back.out(1.8)'
      }, '-=0.7')
      .fromTo('.hero-fade', {
        y: 40,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.08
      }, '-=0.6');

    return () => {
      tl.kill();
    };
  }, [ready]);

  // Dynamic interactive font weight proximity tracking
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const letters = Array.from(containerRef.current?.querySelectorAll('.hero-letter') || []);
    if (!letters.length) return;

    let pointer = { x: -9999, y: -9999 };
    let weights = letters.map(() => 900);

    const onPointer = (e) => {
      pointer = { x: e.clientX, y: e.clientY };
    };

    let animId = 0;
    const update = () => {
      letters.forEach((letter, i) => {
        const rect = letter.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = Math.hypot(pointer.x - centerX, pointer.y - centerY);
        const intensity = Math.max(0, 1 - dist / 320);

        // Interpolate target weight between 300 and 900
        const targetWeight = 900 - intensity * 600;
        weights[i] += (targetWeight - weights[i]) * 0.18;
        letter.style.fontWeight = Math.round(weights[i]);
        letter.style.color = intensity > 0.5 ? '#2f2bff' : '#0e1030';
      });
      animId = requestAnimationFrame(update);
    };

    window.addEventListener('mousemove', onPointer, { passive: true });
    animId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onPointer);
    };
  }, []);

  const renderLetters = (word, align = '') => (
    <span className={`flex ${align}`} aria-hidden="true">
      {word.split('').map((char, i) => (
        <span
          key={i}
          className="hero-letter inline-block will-change-transform select-none"
          style={{ fontWeight: 900 }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-[100svh] overflow-hidden pt-28 pb-10 sm:pt-32"
    >
      <div className="layer mx-auto max-w-7xl px-4 sm:px-8">
        {/* Top Status Pill */}
        <div className="hero-fade inline-flex max-w-full items-center gap-2 rounded-full border-2 border-[#0e1030] bg-[#ffd60a] px-3.5 py-1.5 font-display text-xs font-bold text-[#0e1030] shadow-[3px_3px_0_#0e1030] sm:px-4 sm:py-2 sm:text-sm">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff5ca8] opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#ff5ca8]" />
          </span>
          <span className="truncate">{portfolioData.announcement}</span>
        </div>

        {/* Giant Main Typographic Headline */}
        <h1 className="relative mt-6 font-display leading-[0.88] tracking-[-0.04em] text-[#0e1030]">
          {/* First Name & Draggable Avatar Sticker Row */}
          <div className="flex items-center gap-2.5 sm:gap-6">
            <motion.span style={{ x: xLeft }} className="block shrink-0">
              {renderLetters('Jay H.', 'text-[13.5vw] sm:text-[clamp(3.5rem,13vw,13.5rem)]')}
            </motion.span>

            {/* Draggable Avatar Sticker */}
            <motion.div
              className="hero-sticker shrink-0 -mt-1 sm:-mt-4"
              style={{ rotate: stickerRotate }}
            >
              <HoverTarget variant="drag" label="Drag me" as="div">
                <motion.div
                  drag
                  dragSnapToOrigin
                  dragElastic={0.6}
                  whileHover={{ scale: 1.08 }}
                  whileDrag={{ scale: 1.18, rotate: 14 }}
                  className="relative h-[clamp(3.8rem,10.5vw,10.5rem)] w-[clamp(3.8rem,10.5vw,10.5rem)] cursor-grab active:cursor-grabbing"
                >
                  {/* Spinning circular badge text */}
                  <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-spin-slow">
                    <defs>
                      <path
                        id="ring"
                        d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0"
                      />
                    </defs>
                    <circle cx="100" cy="100" r="98" fill="#ff5ca8" />
                    <text className="fill-[#0e1030] font-display text-[14px] font-bold tracking-[0.22em] uppercase">
                      <textPath href="#ring">
                        flutter developer * mobile apps * dart * firebase *
                      </textPath>
                    </text>
                  </svg>

                  {/* Avatar Portrait */}
                  <img
                    src="/avatar.jpg"
                    alt="Jay H. Kalathiya"
                    draggable="false"
                    className="absolute inset-[18%] h-[64%] w-[64%] rounded-full border-2 border-[#0e1030] object-cover shadow-[4px_4px_0_#0e1030]"
                  />
                </motion.div>
              </HoverTarget>
            </motion.div>
          </div>

          {/* Last Name */}
          <motion.span style={{ x: xRight }} className="block mt-1 sm:mt-2">
            {renderLetters('Kalathiya', 'justify-start sm:justify-end text-[8.8vw] sm:text-[clamp(3rem,11.5vw,11.8rem)] sm:pr-[2vw]')}
          </motion.span>
        </h1>

        {/* Subtitle & Dynamic Rotating Tag */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <p className="hero-fade text-xl font-medium leading-relaxed text-[#0e1030] sm:text-2xl sm:leading-snug max-w-2xl">
              {portfolioData.intro}
            </p>

            <div className="hero-fade mt-6 flex flex-wrap items-center gap-3 font-display text-base font-bold sm:text-lg">
              <span className="text-[#4a4e78]">Right now that means</span>
              <div className="relative inline-block h-10 min-w-[14ch]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute left-0 top-0 inline-flex items-center rounded-full bg-[#2f2bff] px-4 py-1.5 text-sm font-bold text-[#f1f2ff] shadow-[2px_2px_0_#0e1030]"
                  >
                    {portfolioData.rotatingRoles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="hero-fade mt-10 flex flex-wrap gap-4">
              <HoverTarget
                as="a"
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.querySelector('#projects');
                  if (target) {
                    if (window.__lenis) window.__lenis.scrollTo(target, { offset: -24, duration: 1.2 });
                    else target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                variant="link"
                className="rounded-full border-2 border-[#0e1030] bg-[#2f2bff] px-8 py-4 font-display text-lg font-bold text-[#f1f2ff] shadow-[4px_4px_0_#0e1030] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#0e1030] hover:bg-[#1d19c9]"
              >
                See the work
              </HoverTarget>

              <HoverTarget
                as="a"
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.querySelector('#contact');
                  if (target) {
                    if (window.__lenis) window.__lenis.scrollTo(target, { offset: -24, duration: 1.2 });
                    else target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                variant="link"
                className="rounded-full border-2 border-[#0e1030] bg-[#f1f2ff] px-8 py-4 font-display text-lg font-bold text-[#0e1030] shadow-[4px_4px_0_#0e1030] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#0e1030] hover:bg-[#ffd60a]"
              >
                Start a project
              </HoverTarget>
            </div>
          </div>

          {/* Interactive Audio Waveform */}
          <div className="hero-fade lg:justify-self-end">
            <Waveform />
            <p className="mt-3 flex items-center gap-2 text-sm font-medium text-[#4a4e78]">
              <Sparkles className="h-4 w-4 text-[#2f2bff]" />
              <span>Move your cursor or finger. The waveform is listening.</span>
            </p>
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="mt-16 flex justify-center">
          <HoverTarget
            as="a"
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              const target = document.querySelector('#about');
              if (target) {
                if (window.__lenis) window.__lenis.scrollTo(target, { offset: -24, duration: 1.2 });
                else target.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            variant="link"
            aria-label="Scroll to about"
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#0e1030] text-[#0e1030] transition-colors hover:bg-[#0e1030] hover:text-[#f1f2ff]"
          >
            <ArrowDown className="h-5 w-5 animate-bounce" />
          </HoverTarget>
        </div>
      </div>
    </section>
  );
};
