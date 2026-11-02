import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const CursorContext = createContext({
  setCursor: () => {},
  variant: 'default',
  label: ''
});

const cursorSizes = {
  default: 20,
  link: 48,
  view: 68,
  drag: 74,
  text: 32,
  hidden: 0
};

export const CursorProvider = ({ children }) => {
  const [cursorState, setCursorState] = useState({ variant: 'default', label: '' });
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 320, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setIsFinePointer(true);
    document.documentElement.classList.add('has-cursor');

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseX, mouseY]);

  const setCursor = (variant, label = '') => {
    setCursorState({ variant, label });
  };

  const currentSize = cursorSizes[cursorState.variant] ?? cursorSizes.default;

  return (
    <CursorContext.Provider value={{ setCursor, variant: cursorState.variant, label: cursorState.label }}>
      {children}

      {isFinePointer && (
        <>
          {/* Main Difference Ring */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full bg-white mix-blend-difference"
            animate={{
              width: currentSize,
              height: currentSize,
              scale: isMouseDown ? 0.8 : 1
            }}
            transition={{ type: 'spring', stiffness: 380, damping: 26 }}
            style={{
              x: smoothX,
              y: smoothY,
              translateX: '-50%',
              translateY: '-50%'
            }}
          />

          {/* Floating Pill Label */}
          <AnimatePresence>
            {cursorState.label && (
              <motion.div
                aria-hidden="true"
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.4 }}
                className="pointer-events-none fixed left-0 top-0 z-[101] whitespace-nowrap font-display text-xs font-bold text-[#0e1030]"
                style={{
                  x: smoothX,
                  y: smoothY,
                  translateX: '-50%',
                  translateY: '-50%'
                }}
              >
                <span className="rounded-full bg-[#ffd60a] px-3 py-1.5 shadow-[2px_2px_0_#0e1030]">
                  {cursorState.label}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Center Precision Pop Dot */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-[#ff5ca8]"
            style={{
              x: mouseX,
              y: mouseY,
              translateX: '-50%',
              translateY: '-50%'
            }}
          />
        </>
      )}
    </CursorContext.Provider>
  );
};

export const useCursor = () => useContext(CursorContext);

export const HoverTarget = ({
  variant = 'link',
  label = '',
  as: Component = 'div',
  className = '',
  children,
  onMouseEnter,
  onMouseLeave,
  ...props
}) => {
  const { setCursor } = useCursor();

  return (
    <Component
      className={className}
      onMouseEnter={(e) => {
        setCursor(variant, label);
        if (onMouseEnter) onMouseEnter(e);
      }}
      onMouseLeave={(e) => {
        setCursor('default');
        if (onMouseLeave) onMouseLeave(e);
      }}
      {...props}
    >
      {children}
    </Component>
  );
};
