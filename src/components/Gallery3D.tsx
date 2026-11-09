'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ProjectItem } from '../types/gallery';
import { GalleryCard } from './GalleryCard';
import { sound } from '../utils/sound';
import { Pause, Play, Compass, ArrowDown } from 'lucide-react';

interface Gallery3DProps {
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
  onExploreWork: () => void;
}

export const Gallery3D: React.FC<Gallery3DProps> = ({
  projects,
  onSelectProject,
  onExploreWork,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMotionPaused, setIsMotionPaused] = useState(false);
  const [columnCount, setColumnCount] = useState(6);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [scrollYOffset, setScrollYOffset] = useState(0);

  // Parallax rates per column
  const columnSpeeds = [0.85, 1.25, 0.95, 1.35, 0.9, 1.15];
  const columnOffsets = [0, -60, -20, -100, -40, -80];

  // Responsive column count
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setColumnCount(2);
      } else if (width < 1024) {
        setColumnCount(3);
      } else if (width < 1440) {
        setColumnCount(5);
      } else {
        setColumnCount(6);
      }
    };
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Mouse lookaround tracking
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const normX = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
    const normY = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
    setMouseOffset({
      x: normX * 4, // Max tilt deg
      y: -normY * 4,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // Ambient continuous drift & scroll handling
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (!isMotionPaused) {
        // Continuous subtle vertical drift
        setScrollYOffset((prev) => prev + 18 * delta);
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isMotionPaused]);

  // Handle wheel scrolling for natural fluid motion without hijacking
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Natural scroll dampening
      setScrollYOffset((prev) => prev + e.deltaY * 0.75);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  // Split projects across columns
  const columns: ProjectItem[][] = Array.from({ length: columnCount }, () => []);
  projects.forEach((item, index) => {
    columns[index % columnCount].push(item);
  });

  // Duplicate items in each column to allow infinite seamless feel
  const duplicatedColumns = columns.map((col) => [...col, ...col]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#F7F7F5] select-none"
      style={{ perspective: '1400px' }}
    >
      {/* 3D Moving Perspective Canvas */}
      <div
        className="absolute inset-x-[-8vw] inset-y-[-12vh] w-[116vw] h-[124vh] flex items-start justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 will-change-transform transition-transform duration-700 ease-out"
        style={{
          transform: `perspective(1200px) rotateX(${mouseOffset.y}deg) rotateY(${mouseOffset.x}deg) scale(0.97)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {duplicatedColumns.map((colItems, colIdx) => {
          const speed = columnSpeeds[colIdx % columnSpeeds.length];
          const initialOffset = columnOffsets[colIdx % columnOffsets.length];
          
          // Calculate column parallax position with modulo loop to avoid clipping
          const rawTranslate = -(scrollYOffset * speed) + initialOffset;
          // Approximate height of one full set of cards ~2400px
          const loopHeight = 2400;
          const normalizedTranslate = ((rawTranslate % loopHeight) - loopHeight) % loopHeight;

          return (
            <div
              key={colIdx}
              className="flex-1 flex flex-col gap-4 md:gap-5 will-change-transform"
              style={{
                transform: `translate3d(0, ${normalizedTranslate}px, 0)`,
                transition: isMotionPaused ? 'transform 0.4s ease-out' : 'none',
              }}
            >
              {colItems.map((project, cardIdx) => (
                <GalleryCard
                  key={`${project.id}-${cardIdx}`}
                  project={project}
                  onSelect={onSelectProject}
                  priority={colIdx < 3 && cardIdx < 3}
                />
              ))}
            </div>
          );
        })}
      </div>

      {/* Subtle Viewport Vignette Edge Blending */}
      <div className="pointer-events-none absolute inset-0 z-30 bg-radial-vignette" />

      {/* Floating Bottom Left Control Pill: Pause / Play Motion */}
      <div className="absolute bottom-6 left-6 z-40">
        <button
          onClick={() => {
            sound.playClick();
            setIsMotionPaused(!isMotionPaused);
          }}
          className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/85 hover:bg-white text-zinc-800 border border-black/[0.08] backdrop-blur-md shadow-md text-xs font-medium transition-all duration-200 hover:scale-[1.03]"
          aria-label={isMotionPaused ? 'Play motion' : 'Pause motion'}
        >
          {isMotionPaused ? (
            <>
              <Play className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
              <span>Resume motion</span>
            </>
          ) : (
            <>
              <Pause className="w-3.5 h-3.5 text-zinc-600" />
              <span>Pause motion</span>
            </>
          )}
        </button>
      </div>

      {/* Floating Bottom Center Hint: Look around & explore */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 z-40 hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white/75 backdrop-blur-md text-zinc-600 text-xs font-normal border border-black/[0.06] shadow-sm animate-pulseSubtle">
        <Compass className="w-3.5 h-3.5 text-zinc-500 animate-spin" style={{ animationDuration: '8s' }} />
        <span>Move to look around, scroll to explore</span>
      </div>

      {/* Floating Bottom Right Button: Explore Grid */}
      <div className="absolute bottom-6 right-6 z-40">
        <button
          onClick={() => {
            sound.playClick();
            onExploreWork();
          }}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/85 hover:bg-white text-zinc-800 border border-black/[0.08] backdrop-blur-md shadow-md text-xs font-medium transition-all duration-200 hover:scale-[1.03]"
        >
          <span>View all work</span>
          <ArrowDown className="w-3.5 h-3.5 text-zinc-600" />
        </button>
      </div>
    </div>
  );
};
