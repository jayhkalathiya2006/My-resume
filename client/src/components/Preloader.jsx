import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const Preloader = ({ onDone }) => {
  const containerRef = useRef(null);
  const countRef = useRef(null);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // If user prefers reduced motion, skip preloader
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsDone(true);
      if (onDone) onDone();
      return;
    }

    const counter = { val: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        setIsDone(true);
        if (onDone) onDone();
      }
    });

    tl.to(counter, {
      val: 100,
      duration: 1.2,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (countRef.current) {
          countRef.current.textContent = Math.round(counter.val);
        }
      }
    })
      .to('.loader-word', {
        yPercent: -110,
        duration: 0.45,
        ease: 'power3.in',
        stagger: 0.05
      }, '-=0.1')
      .to('.loader-panel-front', {
        yPercent: -100,
        duration: 0.7,
        ease: 'expo.inOut'
      }, '-=0.1')
      .to('.loader-panel-back', {
        yPercent: -100,
        duration: 0.7,
        ease: 'expo.inOut'
      }, '-=0.55');

    return () => {
      tl.kill();
    };
  }, [onDone]);

  if (isDone) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[200] select-none" aria-hidden="true">
      {/* Back Accent Yellow Panel */}
      <div className="loader-panel-back absolute inset-0 bg-[#ffd60a]" />

      {/* Front Volt Blue Panel */}
      <div className="loader-panel-front absolute inset-0 flex flex-col justify-between bg-[#2f2bff] p-6 text-[#f1f2ff] sm:p-10">
        <div className="overflow-hidden">
          <p className="loader-word font-display text-lg font-bold sm:text-2xl tracking-tight">
            Jay H. Kalathiya
          </p>
        </div>

        <div className="flex items-end justify-between gap-6">
          <div className="hidden overflow-hidden sm:block">
            <p className="loader-word max-w-sm text-base text-[#f1f2ff]/80 sm:text-lg font-medium">
              Warming up the widgets, the animations, and the interface.
            </p>
          </div>

          <div className="overflow-hidden">
            <p className="loader-word font-display text-[28vw] font-black leading-[0.8] text-[#ffd60a] sm:text-[20vw] tracking-tighter">
              <span ref={countRef}>0</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
