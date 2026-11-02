import React, { useEffect, useRef } from 'react';

const SPACING = 30; // 30px grid spacing
const INFLUENCE_RADIUS = 150; // Cursor interaction radius

export const CanvasBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let dots = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let animId = 0;

    const pointer = { x: -9999, y: -9999, active: false };
    const ripples = [];
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      dots = [];
      const cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;
      const offsetX = (width - (cols - 1) * SPACING) / 2;
      const offsetY = (height - (rows - 1) * SPACING) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({
            ox: offsetX + c * SPACING,
            oy: offsetY + r * SPACING,
            dx: 0,
            dy: 0,
            vx: 0,
            vy: 0,
            s: 0
          });
        }
      }
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(14, 16, 48, 0.08)';
      for (const dot of dots) {
        ctx.beginPath();
        ctx.arc(dot.ox, dot.oy, 1.3, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const animate = (time) => {
      const currentScrollY = window.scrollY;
      scrollVelocity += (currentScrollY - lastScrollY - scrollVelocity) * 0.2;
      lastScrollY = currentScrollY;

      const tSec = time * 0.001;

      // Update and filter ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        ripples[i].r += 14;
        if (ripples[i].r > Math.max(width, height) * 1.2) {
          ripples.splice(i, 1);
        }
      }

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#0e1030';

      const scrollBend = Math.max(-40, Math.min(40, scrollVelocity * 1.4));

      for (const dot of dots) {
        let forceX = 0;
        let forceY = Math.sin(dot.ox * 0.012 + tSec * 2.2) * scrollBend * 0.35;
        let scaleTarget = 0;

        // Pointer repulsion
        if (pointer.active) {
          const distX = dot.ox - pointer.x;
          const distY = dot.oy - pointer.y;
          const dist = Math.hypot(distX, distY);
          if (dist < INFLUENCE_RADIUS) {
            const factor = 1 - dist / INFLUENCE_RADIUS;
            const push = factor * factor * 46;
            forceX += (distX / (dist || 1)) * push;
            forceY += (distY / (dist || 1)) * push;
            scaleTarget = Math.max(scaleTarget, factor);
          }
        }

        // Ripple waves
        for (const rip of ripples) {
          const rX = dot.ox - rip.x;
          const rY = dot.oy - rip.y;
          const rDist = Math.hypot(rX, rY);
          const diff = Math.abs(rDist - rip.r);
          if (diff < 60) {
            const wave = (1 - diff / 60) * rip.power * Math.max(0, 1 - rip.r / 1400);
            forceX += (rX / (rDist || 1)) * wave * 28;
            forceY += (rY / (rDist || 1)) * wave * 28;
            scaleTarget = Math.max(scaleTarget, wave);
          }
        }

        // Spring physics
        dot.vx += (forceX - dot.dx) * 0.14;
        dot.vy += (forceY - dot.dy) * 0.14;
        dot.vx *= 0.78;
        dot.vy *= 0.78;
        dot.dx += dot.vx;
        dot.dy += dot.vy;
        dot.s += (scaleTarget - dot.s) * 0.2;

        const breathe = 0.5 + 0.5 * Math.sin(tSec * 1.4 + dot.ox * 0.02 + dot.oy * 0.015);
        ctx.globalAlpha = 0.07 + breathe * 0.04 + dot.s * 0.45;

        ctx.beginPath();
        ctx.arc(dot.ox + dot.dx, dot.oy + dot.dy, 1.2 + dot.s * 3.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    };

    const handlePointerMove = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    const handleClick = (e) => {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        r: 0,
        power: 1
      });
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('click', handleClick);

    if (prefersReducedMotion) {
      drawStatic();
    } else {
      animId = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-90"
      aria-hidden="true"
    />
  );
};
