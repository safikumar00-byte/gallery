import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Code2, Palette, Sparkles, Layers } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F5] py-16 md:py-24 px-4 sm:px-6 lg:px-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-12">
        
        {/* Top Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-zinc-50 text-zinc-800 border border-black/[0.08] text-xs font-semibold shadow-sm transition-all hover:-translate-x-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to 3D Gallery</span>
          </Link>

          <span className="text-xs text-zinc-400 font-medium">About Sunil Kumar Reddy</span>
        </div>

        {/* Hero Introduction */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 p-8 bg-white rounded-3xl border border-black/[0.08] shadow-sm">
          <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden bg-zinc-100 flex-shrink-0 shadow-md">
            <Image
              src="/images/sunil-profile.jpg"
              alt="Sunil Kumar Reddy"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Multidisciplinary Designer & Developer
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
              Sunil Kumar Reddy
            </h1>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              Based in Visakhapatnam, India. Crafting dimensional brand identities, scalable design systems, and immersive web experiences for forward-thinking tech companies and startups.
            </p>
          </div>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl bg-white border border-black/[0.08] shadow-sm flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Palette className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-zinc-900 text-base">Brand & Identity</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Visual identities, typography systems, vector logos, editorial collateral, and guidelines crafted for market authority.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-black/[0.08] shadow-sm flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-zinc-900 text-base">UI/UX & Systems</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Figma design tokens, mobile native interfaces, enterprise HRMS dashboards, and high-converting product funnels.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-black/[0.08] shadow-sm flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-zinc-900 text-base">Interactive Web</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Next.js, React, Tailwind CSS, GSAP ScrollTrigger, and 3D transforms delivering silky 60 FPS spatial interactions.
            </p>
          </div>
        </div>

        {/* Toolkit Section */}
        <div className="p-8 bg-white rounded-3xl border border-black/[0.08] shadow-sm flex flex-col gap-5">
          <h2 className="text-xl font-bold tracking-tight text-zinc-950">
            Design & Engineering Toolkit
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {[
              'Figma',
              'Next.js 14/15',
              'React',
              'TypeScript',
              'Tailwind CSS',
              'GSAP & ScrollTrigger',
              'Framer Motion',
              'Cinema 4D',
              'Blender',
              'Photoshop',
              'Illustrator',
              'Three.js',
              'Web Audio API',
              'React Native',
              'Expo',
            ].map((tool) => (
              <span
                key={tool}
                className="px-3.5 py-1.5 rounded-xl bg-zinc-100 text-zinc-800 text-xs font-medium"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 bg-zinc-950 text-white rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold tracking-tight">Have a project in mind?</h3>
            <p className="text-zinc-400 text-sm mt-1">Let’s build something extraordinary together.</p>
          </div>
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-white text-zinc-950 text-xs font-semibold hover:bg-zinc-100 transition-all hover:scale-105"
          >
            Explore 3D Gallery
          </Link>
        </div>

      </div>
    </main>
  );
}
