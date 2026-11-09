'use client';

import React, { useState } from 'react';
import { X, Check, Send, Calendar, Clock, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';

interface BookCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookCallModal: React.FC<BookCallModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Design & Frontend Engineering',
    budget: '$5k – $15k',
    timeline: 'Within 2–4 weeks',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playChime();
    setSubmitted(true);
    setTimeout(() => {
      // Auto close after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2500);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={() => {
          sound.playClick();
          onClose();
        }}
        className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-3xl border border-black/[0.08] shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Available for Q1 / Q2 Projects
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-950 mt-1">
              Book a Creative Session
            </h3>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 animate-bounce">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-zinc-900">Message Received!</h4>
            <p className="text-sm text-zinc-600 mt-2 max-w-sm">
              Thank you! Sunil will review your brief and reply within 24 hours to schedule your introductory call.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                required
                placeholder="Ada Lovelace"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                Work Email
              </label>
              <input
                type="email"
                required
                placeholder="ada@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Scope
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                >
                  <option>3D & Interactive Web</option>
                  <option>Brand Identity & Design</option>
                  <option>Product UI/UX & Mobile</option>
                  <option>Full-Stack Application</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Budget
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                >
                  <option>$3k – $8k</option>
                  <option>$8k – $20k</option>
                  <option>$20k – $50k</option>
                  <option>Custom Enterprise</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                Brief Overview
              </label>
              <textarea
                rows={3}
                placeholder="Tell us about what you're building..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 resize-none"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full py-3 rounded-full bg-zinc-900 hover:bg-black text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <Send className="w-4 h-4" />
              <span>Send Project Inquiry</span>
            </button>

            <div className="flex items-center justify-center gap-4 text-[11px] text-zinc-400 mt-2">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-zinc-400" /> &lt; 24h Response
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" /> Direct with Sunil
              </span>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
