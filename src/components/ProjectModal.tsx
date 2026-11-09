'use client';

import React, { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ExternalLink, ArrowRight, ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';
import { ProjectItem } from '../types/gallery';
import { sound } from '../utils/sound';

interface ProjectModalProps {
  project: ProjectItem | null;
  projects: ProjectItem[];
  onClose: () => void;
  onNavigate: (project: ProjectItem) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  projects,
  onClose,
  onNavigate,
}) => {
  // Find next and previous projects
  const currentIndex = project
    ? projects.findIndex((p) => p.id === project.id)
    : -1;
  const prevProject =
    currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        sound.playClick();
        onClose();
      } else if (e.key === 'ArrowRight') {
        sound.playHover();
        onNavigate(nextProject);
      } else if (e.key === 'ArrowLeft') {
        sound.playHover();
        onNavigate(prevProject);
      }
    },
    [onClose, onNavigate, nextProject, prevProject]
  );

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, handleKeyDown]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 animate-in fade-in duration-200">
      
      {/* Blurred Backdrop */}
      <div
        onClick={() => {
          sound.playClick();
          onClose();
        }}
        className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer transition-opacity"
      />

      {/* Modal Container */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl border border-black/[0.08] shadow-2xl flex flex-col no-scrollbar animate-in zoom-in-95 duration-200"
      >
        {/* Sticky Header Close Button & Category */}
        <div className="sticky top-0 z-30 flex items-center justify-between p-4 sm:p-6 bg-white/90 backdrop-blur-md border-b border-zinc-100">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-zinc-100 text-zinc-900 text-xs font-semibold">
              {project.category}
            </span>
            <span className="text-xs text-zinc-400 font-normal">
              {project.client} • {project.year}
            </span>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 flex items-center justify-center transition-all duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Hero Visual Mockup */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-zinc-50 overflow-hidden flex items-center justify-center">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 1024px) 100vw, 900px"
            className={`transition-all duration-300 ${
              project.isCutout ? 'object-contain p-8 drop-shadow-xl' : 'object-cover'
            }`}
          />
          {project.badge && (
            <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md text-white text-xs font-medium shadow-md">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>{project.badge}</span>
            </div>
          )}
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 lg:p-10 flex flex-col gap-8">
          
          {/* Title & Overview */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">
              {project.title}
            </h2>
            <p className="text-base sm:text-lg text-zinc-600 font-medium mt-1">
              {project.subtitle}
            </p>
            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed mt-4">
              {project.overview}
            </p>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-zinc-900 hover:bg-black text-white text-xs font-medium transition-transform hover:scale-[1.02]"
              >
                <span>Visit Live Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {/* Metrics Grid */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 sm:p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900">
                    {m.value}
                  </span>
                  <span className="text-xs text-zinc-500 font-medium mt-0.5">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Challenge & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-100 flex flex-col gap-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                The Challenge
              </h4>
              <p className="text-sm text-zinc-700 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-100 flex flex-col gap-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                The Solution
              </h4>
              <p className="text-sm text-zinc-700 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Deliverables */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
              Key Deliverables
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.deliverables.map((deliv, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm text-zinc-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{deliv}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
              Technologies & Tools
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg bg-zinc-100 text-zinc-800 text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {project.credits && (
            <p className="text-xs text-zinc-400 italic pt-2 border-t border-zinc-100">
              {project.credits}
            </p>
          )}

        </div>

        {/* Modal Footer - Project Slider Navigation */}
        <div className="p-4 sm:p-6 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between">
          <button
            onClick={() => {
              sound.playHover();
              onNavigate(prevProject);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-zinc-100 text-zinc-800 text-xs font-medium border border-zinc-200 transition-all hover:-translate-x-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Previous:</span>
            <span className="font-semibold truncate max-w-[120px]">{prevProject.title}</span>
          </button>

          <button
            onClick={() => {
              sound.playHover();
              onNavigate(nextProject);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-zinc-100 text-zinc-800 text-xs font-medium border border-zinc-200 transition-all hover:translate-x-1"
          >
            <span className="hidden sm:inline">Next:</span>
            <span className="font-semibold truncate max-w-[120px]">{nextProject.title}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
