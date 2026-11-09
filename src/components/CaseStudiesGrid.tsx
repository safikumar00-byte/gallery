'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Sparkles, Search, Filter } from 'lucide-react';
import { ProjectItem, ProjectCategory } from '../types/gallery';
import { CATEGORIES } from '../data/projectsData';
import { sound } from '../utils/sound';

interface CaseStudiesGridProps {
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
  onSurpriseMe: () => void;
}

export const CaseStudiesGrid: React.FC<CaseStudiesGridProps> = ({
  projects,
  onSelectProject,
  onSurpriseMe,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: projects.length };
    CATEGORIES.forEach((cat) => {
      if (cat !== 'All') {
        counts[cat] = projects.filter((p) => p.category === cat).length;
      }
    });
    return counts;
  }, [projects]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory;
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <section className="relative w-full min-h-screen bg-[#F7F7F5] py-24 md:py-28 px-4 sm:px-6 lg:px-12">
      <div className="max-w-[1720px] mx-auto">
        
        {/* Header Block matching Baked Design /work/ */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-black/[0.08]">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-950">
              Case studies
            </h1>
            <p className="mt-2 text-sm sm:text-base text-zinc-600 max-w-xl">
              {projects.length} curated creative projects, filed by craft and medium. Explore deep dives and technical architectures below.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects or tags..."
                className="pl-9 pr-4 py-2 rounded-full bg-white text-xs text-zinc-900 placeholder:text-zinc-400 border border-black/[0.08] shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 w-48 sm:w-64"
              />
            </div>

            {/* Surprise Me Button */}
            <button
              onClick={() => {
                sound.playChime();
                onSurpriseMe();
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-zinc-50 text-zinc-800 border border-black/[0.08] shadow-sm text-xs font-medium transition-all duration-200 hover:scale-[1.02]"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Surprise me</span>
            </button>
          </div>
        </div>

        {/* Filter Tags */}
        <div className="flex items-center gap-2 py-6 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((cat) => {
            const count = categoryCounts[cat] || 0;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  sound.playClick();
                  setSelectedCategory(cat);
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? 'bg-zinc-900 text-white shadow-sm'
                    : 'bg-white/80 hover:bg-white text-zinc-600 border border-black/[0.08]'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-100 text-zinc-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              onClick={() => {
                sound.playClick();
                onSelectProject(project);
              }}
              className="group cursor-pointer flex flex-col gap-3"
            >
              {/* Media Container */}
              <div className="relative aspect-[16/11] w-full rounded-2xl overflow-hidden bg-white border border-black/[0.08] shadow-sm group-hover:shadow-baked-hover transition-all duration-300">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className={`transition-transform duration-500 group-hover:scale-105 ${
                    project.isCutout ? 'object-contain p-4' : 'object-cover'
                  }`}
                />

                {/* Corner Badges */}
                {project.badge && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-semibold text-zinc-900 shadow-sm">
                      {project.badge}
                    </span>
                  </div>
                )}

                {/* Hover View Button */}
                <div className="absolute bottom-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-zinc-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md group-hover:scale-110">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Title & Metadata */}
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-zinc-900 text-sm group-hover:text-black">
                    {project.title}
                  </h3>
                  <span className="text-xs text-zinc-400 font-normal">{project.year}</span>
                </div>
                <p className="text-xs text-zinc-500 mt-0.5 line-clamp-1">
                  {project.subtitle}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-200/60 text-zinc-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-zinc-500 text-sm">No projects found matching your criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-3 px-4 py-2 rounded-full bg-zinc-900 text-white text-xs font-medium"
            >
              Reset filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
