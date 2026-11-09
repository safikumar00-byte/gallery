'use client';

import React, { useState, useEffect } from 'react';
import { Navigation } from '../components/Navigation';
import { Gallery3D } from '../components/Gallery3D';
import { CaseStudiesGrid } from '../components/CaseStudiesGrid';
import { ProjectModal } from '../components/ProjectModal';
import { BookCallModal } from '../components/BookCallModal';
import { projectsData } from '../data/projectsData';
import { ProjectItem } from '../types/gallery';
import { sound } from '../utils/sound';

export default function Home() {
  const [viewMode, setViewMode] = useState<'canvas' | 'grid'>('canvas');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isBookCallOpen, setIsBookCallOpen] = useState(false);

  // Surprise Me Handler
  const handleSurpriseMe = () => {
    const randomIndex = Math.floor(Math.random() * projectsData.length);
    const randomProject = projectsData[randomIndex];
    setSelectedProject(randomProject);
  };

  // Switch to grid mode when clicking "View all work"
  const handleExploreWork = () => {
    setViewMode('grid');
    // Smooth scroll down to grid
    window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' });
  };

  return (
    <main className="relative min-h-screen w-full bg-[#F7F7F5] overflow-x-hidden">
      {/* Top Floating Navigation */}
      <Navigation
        viewMode={viewMode}
        setViewMode={setViewMode}
        onOpenBookCall={() => setIsBookCallOpen(true)}
        onSurpriseMe={handleSurpriseMe}
      />

      {/* Main Content Area */}
      {viewMode === 'canvas' ? (
        <>
          {/* 3D Immersive Creative Gallery (Baked Design Home Canvas) */}
          <Gallery3D
            projects={projectsData}
            onSelectProject={(proj) => setSelectedProject(proj)}
            onExploreWork={handleExploreWork}
          />

          {/* Seamless Case Studies Grid below the 3D Hero */}
          <div className="relative z-30">
            <CaseStudiesGrid
              projects={projectsData}
              onSelectProject={(proj) => setSelectedProject(proj)}
              onSurpriseMe={handleSurpriseMe}
            />
          </div>
        </>
      ) : (
        /* Direct Case Studies Grid View (Baked Design /work/) */
        <div className="pt-8">
          <CaseStudiesGrid
            projects={projectsData}
            onSelectProject={(proj) => setSelectedProject(proj)}
            onSurpriseMe={handleSurpriseMe}
          />
        </div>
      )}

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        projects={projectsData}
        onClose={() => setSelectedProject(null)}
        onNavigate={(proj) => setSelectedProject(proj)}
      />

      {/* Book a Call Modal */}
      <BookCallModal
        isOpen={isBookCallOpen}
        onClose={() => setIsBookCallOpen(false)}
      />
    </main>
  );
}
