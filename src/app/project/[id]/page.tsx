import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { projectsData } from '../../../data/projectsData';
import { ArrowLeft, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';

export function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id,
  }));
}

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projectsData.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5] py-16 md:py-24 px-4 sm:px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between pb-8">
          <Link
            href="/"
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-zinc-50 text-zinc-800 border border-black/[0.08] text-xs font-semibold shadow-sm transition-all hover:-translate-x-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to 3D Gallery</span>
          </Link>

          <span className="text-xs text-zinc-400 font-medium">
            {project.client} • {project.year}
          </span>
        </div>

        {/* Hero Image Container */}
        <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden bg-white border border-black/[0.08] shadow-lg">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
            className={`transition-all ${
              project.isCutout ? 'object-contain p-12 drop-shadow-2xl' : 'object-cover'
            }`}
          />
          {project.badge && (
            <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-white text-xs font-medium shadow-md">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>{project.badge}</span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="mt-10 flex flex-col gap-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-zinc-200/80 text-zinc-800 text-xs font-semibold">
              {project.category}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-950 mt-3">
              {project.title}
            </h1>
            <p className="text-lg sm:text-xl text-zinc-600 font-medium mt-2">
              {project.subtitle}
            </p>
            <p className="text-zinc-700 text-base leading-relaxed mt-5">
              {project.overview}
            </p>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-full bg-zinc-900 hover:bg-black text-white text-xs font-semibold shadow-md transition-transform hover:scale-[1.02]"
              >
                <span>Visit Live Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {/* Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-6 bg-white rounded-2xl border border-black/[0.08] shadow-sm">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-bold text-zinc-950">
                    {m.value}
                  </span>
                  <span className="text-xs text-zinc-500 font-medium mt-1">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Challenge & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-black/[0.08] shadow-sm flex flex-col gap-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                The Challenge
              </h3>
              <p className="text-sm text-zinc-700 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-black/[0.08] shadow-sm flex flex-col gap-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                The Solution
              </h3>
              <p className="text-sm text-zinc-700 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Key Deliverables */}
          <div className="p-6 rounded-2xl bg-white border border-black/[0.08] shadow-sm">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">
              Key Deliverables
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.deliverables.map((deliv, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm text-zinc-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{deliv}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="p-6 rounded-2xl bg-white border border-black/[0.08] shadow-sm">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">
              Technologies & Tooling
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3.5 py-1.5 rounded-lg bg-zinc-100 text-zinc-800 text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {project.credits && (
            <p className="text-xs text-zinc-400 italic pt-2">
              {project.credits}
            </p>
          )}

        </div>

      </div>
    </main>
  );
}
