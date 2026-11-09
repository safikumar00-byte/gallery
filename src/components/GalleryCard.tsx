'use client';

import React, { useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { ProjectItem } from '../types/gallery';
import { sound } from '../utils/sound';

interface GalleryCardProps {
  project: ProjectItem;
  onSelect: (project: ProjectItem) => void;
  speedFactor?: number;
  priority?: boolean;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({
  project,
  onSelect,
  priority = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle 3D tilt angles (-10 to 10 deg)
    const rotX = -((y - centerY) / centerY) * 9;
    const rotY = ((x - centerX) / centerX) * 9;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    sound.playHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const handleClick = () => {
    sound.playClick();
    onSelect(project);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  // Determine aspect ratio class
  const getAspectClass = () => {
    switch (project.aspectRatio) {
      case 'tall':
        return 'aspect-[3/4.2] min-h-[380px] md:min-h-[440px]';
      case 'portrait':
        return 'aspect-[3/4] min-h-[340px] md:min-h-[400px]';
      case 'landscape':
        return 'aspect-[16/11] min-h-[240px] md:min-h-[270px]';
      case 'wide':
        return 'aspect-[16/9] min-h-[220px] md:min-h-[250px]';
      case 'cutout':
        return 'aspect-square min-h-[260px] md:min-h-[310px] bg-transparent shadow-none border-none';
      case 'square':
      default:
        return 'aspect-square min-h-[280px] md:min-h-[330px]';
    }
  };

  const isCutout = project.isCutout || project.aspectRatio === 'cutout';

  return (
    <div
      ref={cardRef}
      tabIndex={0}
      role="button"
      aria-label={`View ${project.title} - ${project.category}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative w-full cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-4 transition-transform duration-300 ease-out will-change-transform ${
        isCutout
          ? 'p-3 flex items-center justify-center'
          : 'rounded-2xl overflow-hidden bg-white border border-black/[0.08] shadow-[0_6px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.18)]'
      } ${getAspectClass()}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${
          isHovered ? '24px' : '0px'
        }) scale(${isHovered ? 1.03 : 1})`,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Visual Media Container */}
      <div className={`relative w-full h-full overflow-hidden ${isCutout ? '' : 'rounded-2xl'}`}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className={`transition-all duration-500 ease-out ${
            isCutout
              ? 'object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.18)] group-hover:scale-110 group-hover:-translate-y-2'
              : 'object-cover group-hover:scale-105'
          }`}
        />

        {/* Dynamic Sheen / Specular Glare Effect for Non-cutout Cards */}
        {!isCutout && (
          <div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
            style={{
              background: `radial-gradient(circle 320px at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.35), transparent 70%)`,
            }}
          />
        )}

        {/* Cutout Floating Category Pill */}
        {isCutout && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-zinc-900 text-[11px] font-semibold border border-black/[0.08] shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-y-0 translate-y-2 whitespace-nowrap z-20">
            {project.title}
          </div>
        )}

        {/* Standard Card Overlay - Hover Elevation Details */}
        {!isCutout && (
          <div className="absolute inset-0 z-20 flex flex-col justify-between p-4 md:p-5 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {/* Top Badges */}
            <div className="flex items-center justify-between gap-2 translate-y-[-8px] group-hover:translate-y-0 transition-transform duration-300">
              <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-semibold text-zinc-900 tracking-tight shadow-sm">
                {project.category}
              </span>
              {project.badge && (
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-900/80 backdrop-blur-md text-[10px] font-medium text-white/90 border border-white/10 shadow-sm">
                  <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                  {project.badge}
                </span>
              )}
            </div>

            {/* Bottom Project Metadata */}
            <div className="translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
              <div className="flex items-end justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-semibold text-white text-sm md:text-base leading-snug truncate drop-shadow-sm">
                    {project.title}
                  </h3>
                  <p className="text-zinc-300 text-xs truncate mt-0.5 font-normal drop-shadow-sm">
                    {project.subtitle}
                  </p>
                </div>
                
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white text-zinc-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
