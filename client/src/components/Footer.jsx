import React from 'react';
import { portfolioData } from '../data/portfolioData';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0e1030] pt-20 pb-12 text-[#f1f2ff] select-none">
      <div className="layer mx-auto max-w-7xl px-4 sm:px-8">
        {/* Giant Typographic Outline Footer */}
        <div className="overflow-hidden">
          <p className="font-display text-[15vw] font-black leading-none tracking-tighter text-[#2f2bff] opacity-90 sm:text-[14vw]">
            Jay H. Kalathiya
          </p>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="mt-12 flex flex-col gap-4 border-t border-[#f1f2ff]/20 pt-8 sm:flex-row sm:items-center sm:justify-between text-sm font-medium">
          <p className="text-[#f1f2ff]/80">
            © {currentYear} {portfolioData.name}. All rights reserved.
          </p>

          <p className="text-[#f1f2ff]/60">
            Built with React, GSAP, Framer Motion and Lenis • Flutter Developer Portfolio
          </p>
        </div>
      </div>
    </footer>
  );
};
