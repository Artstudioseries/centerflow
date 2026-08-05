import React from 'react';
import { METHOD_PRINCIPLES, METHOD_INFO } from '../data/philosophyData';

interface PhilosophyScreenProps {
  onBack: () => void;
  onStartJourney: () => void;
}

export const PhilosophyScreen: React.FC<PhilosophyScreenProps> = ({ onBack, onStartJourney }) => {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-5 md:px-16 pt-6 pb-32 flex flex-col gap-10">
      {/* Back Header Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2.5 text-gray-300 hover:text-white transition-colors rounded-full bg-[#1A1A1C] border border-white/10 hover:border-blue-500/40 shadow-md active:scale-95"
            aria-label="Go back"
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
          </button>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">STRETCH SMART</span>
            <span className="text-sm font-semibold text-white tracking-tight">Our Method</span>
          </div>
        </div>

        <span className="hidden sm:inline-flex items-center gap-2 text-xs font-medium text-gray-400 bg-[#1A1A1C] px-3.5 py-1.5 rounded-full border border-white/5">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          4 Pillars of Practice
        </span>
      </div>

      {/* Hero Banner Section */}
      <section className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-[#121214] p-6 md:p-12 flex flex-col justify-between min-h-[280px]">
        {/* Ambient Dark Image Background with Gradient Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 scale-105"
          style={{ backgroundImage: `url('${METHOD_INFO.studioImageUrl}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0B0B0C] via-[#0F0F12]/90 to-[#141824]/75" />
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-3.5 max-w-2xl">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300 bg-blue-600/20 border border-blue-400/30 px-3.5 py-1 rounded-full w-fit backdrop-blur-md">
            {METHOD_INFO.badge}
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            {METHOD_INFO.title}
          </h1>
          <p className="text-base md:text-xl font-semibold text-blue-300">
            {METHOD_INFO.subheading}
          </p>
          <p className="text-sm md:text-base text-gray-300 leading-relaxed font-normal mt-1">
            {METHOD_INFO.description}
          </p>
        </div>
      </section>

      {/* The Method Section Header */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-1 border-b border-white/5 pb-3">
          <span className="text-xs uppercase font-bold text-blue-400 tracking-widest">Framework</span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
            {METHOD_INFO.sectionHeader}
          </h2>
        </div>

        {/* 4 Cards / Bullets Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {METHOD_PRINCIPLES.map((principle, index) => (
            <div
              key={principle.id}
              className="bg-gradient-to-b from-[#1C1C20] to-[#141416] rounded-2xl p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-300 shadow-xl flex flex-col justify-between gap-6 group hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-md">
                  <span className="material-symbols-outlined text-2xl">
                    {principle.icon}
                  </span>
                </div>
                <span className="text-2xl font-bold text-white/10 group-hover:text-blue-500/30 transition-colors font-mono">
                  0{index + 1}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-blue-300 transition-colors">
                  {principle.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                  {principle.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Action Button */}
      <section className="flex justify-center pt-4">
        <button
          onClick={onStartJourney}
          className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm py-4 px-9 rounded-full shadow-lg shadow-blue-900/40 active:scale-95 transition-all flex items-center gap-2.5 border border-blue-400/30 group"
        >
          <span>Explore Guided Routines</span>
          <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </button>
      </section>
    </div>
  );
};
