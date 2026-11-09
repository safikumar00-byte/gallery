'use client';

import React, { useState } from 'react';
import { Navigation } from '../../components/Navigation';
import { CaseStudiesGrid } from '../../components/CaseStudiesGrid';
import { ProjectModal } from '../../components/ProjectModal';
import { BookCallModal } from '../../components/BookCallModal';
import { projectsData } from '../../data/projectsData';
import { ProjectItem } from '../../types/gallery';

export default function WorkPage() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isBookCallOpen, setIsBookCallOpen] = useState(false);

  const handleSurpriseMe = () => {
    const randomIndex = Math.floor(Math.random() * projectsData.length);
    setSelectedProject(projectsData[randomIndex]);
  };

  return (
    <main className="relative min-h-screen w-full bg-[#F7F7F5]">
      <Navigation
        viewMode="grid"
        setViewMode={() => {
          window.location.href = '/';
        }}
        onOpenBookCall={() => setIsBookCallOpen(true)}
        onSurpriseMe={handleSurpriseMe}
      />

      <div className="pt-4">
        <CaseStudiesGrid
          projects={projectsData}
          onSelectProject={(proj) => setSelectedProject(proj)}
          onSurpriseMe={handleSurpriseMe}
        />
      </div>

      <ProjectModal
        project={selectedProject}
        projects={projectsData}
        onClose={() => setSelectedProject(null)}
        onNavigate={(proj) => setSelectedProject(proj)}
      />

      <BookCallModal
        isOpen={isBookCallOpen}
        onClose={() => setIsBookCallOpen(false)}
      />
    </main>
  );
}
