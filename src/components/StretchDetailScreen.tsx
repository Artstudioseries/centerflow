import React from 'react';
import { Stretch } from '../types';

interface StretchDetailScreenProps {
  stretch: Stretch;
  onBack: () => void;
  onStartStretchTimer: (stretchId: string) => void;
  onToggleSave?: (stretchId: string) => void;
  isSaved?: boolean;
  onSearchQuery?: (query: string) => void;
}

export const StretchDetailScreen: React.FC<StretchDetailScreenProps> = ({
  stretch,
  onBack,
  onStartStretchTimer,
  onToggleSave,
  isSaved = false,
  onSearchQuery,
}) => {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-5 md:px-16 pt-6 pb-32 flex flex-col gap-8">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-2 -ml-2 text-gray-300 hover:text-white transition-colors rounded-full bg-[#1A1A1C] border border-white/10"
        >
          <span className="material-symbols-outlined text-xl">arrow_back</span>
        </button>
        <h2 className="text-xl md:text-2xl font-semibold text-white tracking-tight text-center">Movement Detail</h2>
        {onToggleSave ? (
          <button
            onClick={() => onToggleSave(stretch.id)}
            className="p-2 text-red-400 hover:text-red-300 transition-colors"
            aria-label="Save stretch"
          >
            <span
              className="material-symbols-outlined text-2xl"
              style={{ fontVariationSettings: `'FILL' ${isSaved ? 1 : 0}` }}
            >
              favorite
            </span>
          </button>
        ) : (
          <div className="w-10" />
        )}
      </div>

      {/* Hero Image / Video Section */}
      <section className="w-full relative rounded-2xl overflow-hidden shadow-xl border border-white/10 group bg-[#1A1A1C]">
        <div
          className="bg-cover bg-center w-full h-[320px] md:h-[440px] transition-transform duration-700 group-hover:scale-105 opacity-90"
          style={{ backgroundImage: `url('${stretch.imageUrl}')` }}
        />
        {/* Play Overlay */}
        <button
          onClick={() => onStartStretchTimer(stretch.id)}
          className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#0F0F10]/80 backdrop-blur-xl flex items-center justify-center text-blue-500 shadow-xl hover:scale-110 hover:bg-blue-600 hover:text-white border border-blue-500/30 transition-all"
        >
          <span className="material-symbols-outlined text-4xl ml-1" style={{ fontVariationSettings: "'FILL' 1" }}>
            play_arrow
          </span>
        </button>
      </section>

      {/* Title & Chips */}
      <section className="flex flex-col gap-3 items-start md:items-center text-left md:text-center">
        <div className="inline-flex items-center gap-2 bg-white/5 text-gray-300 px-4 py-1.5 rounded-full border border-white/10">
          <span className="material-symbols-outlined text-base text-blue-500">schedule</span>
          <span className="text-xs font-semibold">{stretch.durationLabel}</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-light text-white tracking-tight">{stretch.title}</h1>
        <p className="text-sm md:text-base text-gray-400 max-w-xl">{stretch.description}</p>
      </section>

      {/* Bento Details Grid */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Instructions Card */}
        <article className="md:col-span-7 bg-[#1A1A1C] rounded-2xl p-6 md:p-8 shadow-xl flex flex-col gap-6 border border-white/5">
          <div className="flex items-center gap-3 text-blue-500">
            <span
              className="material-symbols-outlined bg-blue-600/10 p-2 rounded-xl text-blue-500"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              list_alt
            </span>
            <h3 className="text-xl font-light text-white tracking-tight">Instructions</h3>
          </div>

          <div className="h-[1px] bg-white/5" />

          <ul className="flex flex-col gap-5 text-sm md:text-base text-gray-300 leading-relaxed">
            {stretch.instructions.map((step, i) => (
              <li key={i} className="flex gap-4 items-start">
                <span className="shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-xs mt-0.5">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </article>

        {/* Right Column Details */}
        <div className="md:col-span-5 flex flex-col gap-6">
          {/* Primary Focus */}
          <article
            onClick={() => onSearchQuery && onSearchQuery(stretch.primaryFocus)}
            className={`bg-[#1A1A1C] rounded-2xl p-6 border border-white/5 flex items-center justify-between gap-4 transition-all ${
              onSearchQuery ? 'hover:border-blue-500/50 hover:bg-[#222226] cursor-pointer group' : ''
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-500 shrink-0">
                <span className="material-symbols-outlined text-xl">accessibility_new</span>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Primary Focus</p>
                <p className="text-sm font-semibold text-gray-200 mt-0.5 group-hover:text-blue-400 transition-colors">
                  {stretch.primaryFocus}
                </p>
              </div>
            </div>
            {onSearchQuery && (
              <span className="material-symbols-outlined text-gray-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all text-xl">
                chevron_right
              </span>
            )}
          </article>

          {/* Muscle Groups */}
          {stretch.muscleGroups && stretch.muscleGroups.length > 0 && (
            <article className="bg-[#1A1A1C] rounded-2xl p-6 border border-white/5 flex flex-col gap-2.5">
              <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-blue-400">vital_signs</span>
                Targeted Muscle Groups
              </span>
              <div className="flex flex-wrap gap-2">
                {stretch.muscleGroups.map((m) => (
                  <button
                    key={m}
                    onClick={() => onSearchQuery && onSearchQuery(m)}
                    className="px-3 py-1 rounded-xl text-xs font-semibold bg-[#222226] text-blue-400 border border-blue-500/20 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all shadow-sm"
                  >
                    {m}
                  </button>
                ))}
              </div>
            </article>
          )}

          {/* Arturo's Cue Card */}
          <article className="bg-[#222224] rounded-2xl p-6 shadow-md flex flex-col gap-3 border border-white/10 relative overflow-hidden">
            <div className="flex items-center gap-3 text-blue-400">
              <span
                className="material-symbols-outlined bg-blue-600/10 p-2 rounded-xl text-blue-400"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                record_voice_over
              </span>
              <h3 className="text-base font-semibold text-white">Arturo's Cue</h3>
            </div>
            <blockquote className="text-base text-blue-300 italic leading-relaxed font-serif">
              {stretch.arturoCue}
            </blockquote>
          </article>

          {/* Breathing Focus */}
          <article className="bg-[#1A1A1C] rounded-2xl p-6 border border-white/5 flex flex-col gap-3">
            <div className="flex items-center gap-3 text-blue-400">
              <span
                className="material-symbols-outlined bg-blue-600/10 text-blue-400 p-2 rounded-xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                air
              </span>
              <h3 className="text-base font-semibold text-white">Breathing Focus</h3>
            </div>
            <p className="text-xs md:text-sm text-gray-400 leading-relaxed mt-1">{stretch.breathingFocus}</p>
          </article>

          {/* Safety Note or Form Tip */}
          {stretch.safetyNote && (
            <article className="bg-amber-950/20 rounded-2xl p-6 border border-amber-500/20 flex flex-col gap-2">
              <div className="flex items-center gap-3 text-amber-400">
                <span
                  className="material-symbols-outlined bg-amber-500/20 text-amber-400 p-2 rounded-xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  health_and_safety
                </span>
                <h3 className="text-base font-semibold text-amber-300">Safety Note</h3>
              </div>
              <p className="text-xs text-amber-200/80 leading-relaxed mt-1">{stretch.safetyNote}</p>
            </article>
          )}
        </div>
      </section>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 left-0 right-0 z-40 px-5 flex justify-center pointer-events-none">
        <button
          onClick={() => onStartStretchTimer(stretch.id)}
          className="pointer-events-auto bg-blue-600 text-white font-semibold text-sm px-8 py-3.5 rounded-full shadow-lg shadow-blue-900/30 hover:bg-blue-500 active:scale-95 transition-all flex items-center gap-2 max-w-sm w-full justify-center"
        >
          <span className="material-symbols-outlined text-xl">timer</span>
          <span>Start Stretch Timer ({stretch.defaultDurationSeconds}s)</span>
        </button>
      </div>
    </div>
  );
};
