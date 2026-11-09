'use client';

import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [targetPos, setTargetPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only on devices with fine pointer (mouse)
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasPointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      setTargetPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable =
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') !== null ||
          target.closest('a') !== null ||
          target.getAttribute('role') === 'button';
        setIsPointer(isClickable);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Smooth spring lerp loop
  useEffect(() => {
    let animId: number;
    const lerp = () => {
      setPos((prev) => ({
        x: prev.x + (targetPos.x - prev.x) * 0.25,
        y: prev.y + (targetPos.y - prev.y) * 0.25,
      }));
      animId = requestAnimationFrame(lerp);
    };
    animId = requestAnimationFrame(lerp);
    return () => cancelAnimationFrame(animId);
  }, [targetPos]);

  if (!isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-50 transition-opacity duration-300 hidden md:block"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
    >
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full border border-black/20 bg-white/40 backdrop-blur-[2px] transition-all duration-200 ${
          isPointer
            ? 'w-10 h-10 bg-black/10 scale-125'
            : 'w-5 h-5 bg-black/5 scale-100'
        }`}
      />
    </div>
  );
};
