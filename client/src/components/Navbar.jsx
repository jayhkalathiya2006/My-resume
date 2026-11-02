import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import { HoverTarget } from '../context/CursorContext';

const NAV_ITEMS = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Work', href: '#projects' },
  { name: 'Contact', href: '#contact' }
];

export const RollText = ({ children, secondaryColor = 'text-[#2f2bff]' }) => (
  <span className="relative block overflow-hidden">
    <span className="block transition-transform duration-300 ease-[cubic-bezier(0.7,0,0.2,1)] group-hover:-translate-y-full">
      {children}
    </span>
    <span className={`absolute left-0 top-0 block translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.7,0,0.2,1)] group-hover:translate-y-0 ${secondaryColor}`}>
      {children}
    </span>
  </span>
);

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');
  const { scrollY } = useScroll();

  // Auto-hide navbar on scroll down, show on scroll up
  useEffect(() => {
    return scrollY.on('change', (latest) => {
      const prev = scrollY.getPrevious() ?? 0;
      setIsHidden(latest > prev && latest > 240 && !isOpen);
    });
  }, [scrollY, isOpen]);

  // Track active section with IntersectionObserver
  useEffect(() => {
    const sectionEls = NAV_ITEMS.map((item) => document.querySelector(item.href)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );

    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href) => (e) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      if (window.__lenis) {
        window.__lenis.scrollTo(target, { offset: -24, duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <motion.header
        animate={{ y: isHidden ? -120 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 32 }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border-2 border-[#0e1030] bg-[#f1f2ff]/90 py-2 pl-5 pr-2 shadow-[4px_4px_0_#0e1030] backdrop-blur-md">
          {/* Brand Name */}
          <HoverTarget
            as="a"
            href="#home"
            onClick={handleNavClick('#home')}
            className="group font-display text-base font-bold tracking-tight text-[#0e1030]"
            variant="link"
          >
            <RollText>Jay H. Kalathiya</RollText>
          </HoverTarget>

          {/* Desktop Nav Links */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Sections">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <HoverTarget
                  key={item.name}
                  as="a"
                  href={item.href}
                  onClick={handleNavClick(item.href)}
                  variant="link"
                  className={`group relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${isActive ? 'text-[#f1f2ff]' : 'text-[#0e1030] hover:text-[#2f2bff]'
                    }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-[#2f2bff]"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                  <span className="relative">
                    <RollText secondaryColor={isActive ? 'text-[#ffd60a]' : 'text-[#2f2bff]'}>
                      {item.name}
                    </RollText>
                  </span>
                </HoverTarget>
              );
            })}

            {/* Resume CV Download Button */}
            <HoverTarget
              as="a"
              href="/Jay_H_Kalathiya_Resume.pdf"
              download="Jay_H_Kalathiya_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              variant="link"
              label="PDF"
              className="group ml-2 flex items-center gap-1.5 rounded-full border-2 border-[#0e1030] bg-[#ffd60a] px-4 py-2 text-xs font-bold text-[#0e1030] transition-transform hover:scale-105"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Resume</span>
            </HoverTarget>

            {/* Let's Talk CTA */}
            <HoverTarget
              as="a"
              href="#contact"
              onClick={handleNavClick('#contact')}
              variant="link"
              className="group ml-2 block rounded-full bg-[#ff5ca8] px-5 py-2.5 text-sm font-bold text-[#0e1030] transition-colors hover:bg-[#ffd60a]"
            >
              <RollText secondaryColor="text-[#0e1030]">Let's talk</RollText>
            </HoverTarget>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0e1030] text-[#f1f2ff] lg:hidden"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-20 z-40 rounded-3xl border-2 border-[#0e1030] bg-[#f1f2ff] p-6 shadow-[8px_8px_0_#0e1030] lg:hidden"
          >
            <nav className="flex flex-col gap-3 font-display">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={handleNavClick(item.href)}
                  className="rounded-2xl border-2 border-transparent px-4 py-3 text-2xl font-black text-[#0e1030] transition-colors hover:border-[#0e1030] hover:bg-[#ffd60a]"
                >
                  {item.name}
                </a>
              ))}
              <div className="mt-4 flex flex-col gap-3 pt-3 border-t-2 border-[#0e1030]">
                <a
                  href="/Jay_H_Kalathiya_Resume.pdf"
                  download="Jay_H_Kalathiya_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full border-2 border-[#0e1030] bg-[#ffd60a] py-3 text-base font-bold text-[#0e1030]"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Resume</span>
                </a>
                <a
                  href="#contact"
                  onClick={handleNavClick('#contact')}
                  className="flex items-center justify-center rounded-full bg-[#ff5ca8] py-3.5 text-base font-bold text-[#0e1030]"
                >
                  Let's talk
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
