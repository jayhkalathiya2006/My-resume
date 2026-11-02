import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { CursorProvider } from './context/CursorContext';
import { Preloader } from './components/Preloader';
import { CanvasBackground } from './components/CanvasBackground';
import { ProgressBar } from './components/ProgressBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { About } from './components/About';
import { SkillsPlayground } from './components/SkillsPlayground';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 1.1
    });

    window.__lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    if (isReady) {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);
    }
  }, [isReady]);

  return (
    <CursorProvider>
      <Preloader onDone={() => setIsReady(true)} />
      <CanvasBackground />
      <ProgressBar />
      <Navbar />

      <main>
        <Hero ready={isReady} />

        <Marquee
          items={[
            'Flutter',
            'Dart',
            'Firebase',
            'HTML',
            'CSS',
            'UI/UX',
            'Mobile Development',
            'AI Tools'
          ]}
          className="bg-[#2f2bff] text-[#ffd60a]"
        />

        <About />

        <SkillsPlayground />

        <Experience />

        <Marquee
          items={[
            'Flutter Developer',
            'Visyom AI',
            '1 Year Experience',
            'Cross-Platform Apps',
            'Figma to Flutter',
            'Google Play Store'
          ]}
          className="bg-[#ffd60a] text-[#0e1030]"
          reverse={true}
        />

        <Projects />

        <Education />

        <Contact />

        <Footer />
      </main>
    </CursorProvider>
  );
}
