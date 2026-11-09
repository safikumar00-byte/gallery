'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Volume2, VolumeX, Sparkles, PhoneCall, Grid, Box, Menu, X, ArrowUpRight } from 'lucide-react';
import { sound } from '../utils/sound';

interface NavigationProps {
  viewMode: 'canvas' | 'grid';
  setViewMode: (mode: 'canvas' | 'grid') => void;
  onOpenBookCall: () => void;
  onSurpriseMe: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  viewMode,
  setViewMode,
  onOpenBookCall,
  onSurpriseMe,
}) => {
  const [soundActive, setSoundActive] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setSoundActive(sound.isEnabled());
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const newState = sound.toggle();
    setSoundActive(newState);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none p-4 md:p-6 transition-all duration-300">
      <div className="max-w-[1920px] mx-auto flex items-center justify-between">
        
        {/* Left: Studio Identity Pill */}
        <div className="pointer-events-auto flex items-center gap-3">
          <Link
            href="/"
            onClick={() => {
              sound.playClick();
              setViewMode('canvas');
            }}
            className="group flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-white/80 hover:bg-white text-zinc-900 border border-black/[0.08] backdrop-blur-md shadow-sm transition-all duration-200 hover:scale-[1.02]"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-xs tracking-tight">sunil.studio</span>
            <span className="hidden sm:inline-block text-[11px] text-zinc-400 font-normal border-l border-zinc-200 pl-2">
              Creative Gallery
            </span>
          </Link>
        </div>

        {/* Center / Right: Nav Control Pills */}
        <div className="pointer-events-auto hidden md:flex items-center gap-2">
          
          {/* View Mode Toggle: 3D Gallery vs Case Studies */}
          <div className="flex items-center p-1 rounded-full bg-white/80 border border-black/[0.08] backdrop-blur-md shadow-sm">
            <button
              onClick={() => {
                sound.playClick();
                setViewMode('canvas');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                viewMode === 'canvas'
                  ? 'bg-zinc-900 text-white shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>3D Gallery</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setViewMode('grid');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                viewMode === 'grid'
                  ? 'bg-zinc-900 text-white shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Case Studies</span>
            </button>
          </div>

          {/* Surprise Me Button */}
          <button
            onClick={() => {
              sound.playChime();
              onSurpriseMe();
            }}
            title="Pick a random project showcase"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/80 hover:bg-white text-zinc-700 hover:text-zinc-950 border border-black/[0.08] backdrop-blur-md shadow-sm text-xs font-medium transition-all duration-200 hover:scale-[1.02]"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: '4s' }} />
            <span>Surprise me</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            title={soundActive ? 'Mute sound effects' : 'Enable sound effects'}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white/80 hover:bg-white text-zinc-600 hover:text-zinc-900 border border-black/[0.08] backdrop-blur-md shadow-sm transition-all duration-200"
          >
            {soundActive ? (
              <div className="flex items-center gap-0.5 h-3">
                <span className="w-0.5 h-3 bg-zinc-800 animate-pulseSubtle" />
                <span className="w-0.5 h-2 bg-zinc-800 animate-pulse" />
                <span className="w-0.5 h-3.5 bg-zinc-800 animate-pulseSubtle" />
              </div>
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
            )}
          </button>

          {/* Book a Call CTA */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenBookCall();
            }}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 hover:bg-black text-white text-xs font-medium shadow-md transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
          >
            <span>Book a call</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="pointer-events-auto md:hidden flex items-center gap-2">
          <button
            onClick={() => {
              sound.playClick();
              onOpenBookCall();
            }}
            className="px-3.5 py-1.5 rounded-full bg-zinc-900 text-white text-xs font-medium"
          >
            Book a call
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full bg-white/90 border border-black/[0.08] text-zinc-800 shadow-sm"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden mt-3 p-4 bg-white/95 backdrop-blur-xl rounded-2xl border border-black/[0.08] shadow-xl flex flex-col gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex rounded-xl bg-zinc-100 p-1">
            <button
              onClick={() => {
                sound.playClick();
                setViewMode('canvas');
                setMobileMenuOpen(false);
              }}
              className={`flex-1 py-2 text-xs font-medium rounded-lg ${
                viewMode === 'canvas' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-600'
              }`}
            >
              3D Gallery
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setViewMode('grid');
                setMobileMenuOpen(false);
              }}
              className={`flex-1 py-2 text-xs font-medium rounded-lg ${
                viewMode === 'grid' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-600'
              }`}
            >
              Case Studies
            </button>
          </div>

          <button
            onClick={() => {
              sound.playChime();
              onSurpriseMe();
              setMobileMenuOpen(false);
            }}
            className="flex items-center justify-between px-3 py-2 text-xs font-medium text-zinc-700 bg-zinc-50 rounded-lg"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Surprise me with a project
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
          </button>

          <button
            onClick={handleToggleSound}
            className="flex items-center justify-between px-3 py-2 text-xs font-medium text-zinc-700 bg-zinc-50 rounded-lg"
          >
            <span>Audio Sound Effects</span>
            <span className="text-zinc-500">{soundActive ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      )}
    </header>
  );
};
