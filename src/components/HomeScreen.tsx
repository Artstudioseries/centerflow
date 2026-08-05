import React, { useState } from 'react';
import { Routine, Stretch } from '../types';

interface HomeScreenProps {
  userName: string;
  userAvatarUrl: string;
  onSelectRoutine: (routineId: string) => void;
  onSelectStretch: (stretchId: string) => void;
  onStartTimer: (routineId?: string, stretchId?: string) => void;
  onSearchQuery: (query: string) => void;
  onOpenPatronModal: () => void;
  routines: Routine[];
  stretches: Stretch[];
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  userName,
  onSelectRoutine,
  onSelectStretch,
  onStartTimer,
  onSearchQuery,
  onOpenPatronModal,
  routines,
  stretches,
}) => {
  const [queryInput, setQueryInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (queryInput.trim()) {
      onSearchQuery(queryInput.trim());
    }
  };

  const featuredRoutine = routines[0];

  return (
    <div className="w-full max-w-[1200px] mx-auto px-5 md:px-16 pt-6 pb-32 flex flex-col gap-10">
      {/* Hero Welcome Banner */}
      <section className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-gradient-to-r from-[#18181A] via-[#141416] to-[#101012] p-6 md:p-8 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col gap-2 max-w-xl z-10">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 bg-blue-600/10 border border-blue-500/20 px-3 py-1 rounded-full w-fit">
            Daily Movement & Desk Relief
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Welcome back, <span className="text-blue-400">{userName}</span>
          </h2>
          <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
            Realign your posture, relieve lower back & neck tension, and release physical fatigue with guided routines.
          </p>

          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <button
              onClick={() => onStartTimer(featuredRoutine.id)}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3 px-5 rounded-2xl shadow-lg shadow-blue-900/30 transition-all flex items-center gap-2 active:scale-95"
            >
              <span className="material-symbols-outlined text-base">play_arrow</span>
              <span>Start Quick Session ({featuredRoutine.durationMinutes} min)</span>
            </button>
            <button
              onClick={onOpenPatronModal}
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-semibold text-xs py-3 px-4 rounded-2xl transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm text-blue-400">favorite</span>
              <span>Patron & Gift</span>
            </button>
          </div>
        </div>
      </section>

      {/* Quick Search Bar */}
      <form onSubmit={handleSearchSubmit} className="relative w-full">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
          search
        </span>
        <input
          type="text"
          placeholder="Search by muscle (e.g., Lower Back, Neck, Hamstrings) or routine..."
          value={queryInput}
          onChange={(e) => setQueryInput(e.target.value)}
          className="w-full bg-[#1A1A1C] border border-white/10 focus:border-blue-500 text-sm text-white placeholder-gray-500 rounded-2xl pl-12 pr-28 py-3.5 focus:outline-none transition-all shadow-inner"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-4 py-2 rounded-xl transition-all shadow-md"
        >
          Search
        </button>
      </form>

      {/* Featured Routines Grid */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white tracking-tight">Featured Routines</h3>
          <span className="text-xs text-gray-400">{routines.length} Available</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {routines.map((routine) => (
            <div
              key={routine.id}
              onClick={() => onSelectRoutine(routine.id)}
              className="bg-[#1A1A1C] rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between group shadow-lg"
            >
              <div className="relative h-44 w-full overflow-hidden bg-[#121214]">
                <img
                  src={routine.imageUrl}
                  alt={routine.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                />
                <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {routine.category}
                </span>
                <span className="absolute bottom-3 right-3 bg-blue-600/90 text-white text-xs font-mono font-bold px-2.5 py-0.5 rounded-lg shadow-md">
                  {routine.durationMinutes} min
                </span>
              </div>

              <div className="p-5 flex flex-col gap-2">
                <h4 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                  {routine.title}
                </h4>
                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                  {routine.subtitle}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-400 mt-2 pt-3 border-t border-white/5">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-blue-400">schedule</span>
                    <span>{routine.movementsCount} Movements</span>
                  </span>
                  <span className="font-semibold text-blue-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                    View <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Movement Focus Stretches */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white tracking-tight">Movement Focus Stretches</h3>
          <span className="text-xs text-gray-400">{stretches.length} Stretches</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {stretches.map((stretch) => (
            <div
              key={stretch.id}
              onClick={() => onSelectStretch(stretch.id)}
              className="bg-[#1A1A1C] rounded-2xl p-4 border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer flex flex-col justify-between gap-3 group shadow-md"
            >
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-semibold text-blue-400 uppercase tracking-wider">
                  {stretch.category}
                </span>
                <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                  {stretch.title}
                </h4>
                <p className="text-[11px] text-gray-400 line-clamp-2 leading-snug">
                  {stretch.primaryFocus}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <span className="text-[10px] font-mono text-gray-400">{stretch.durationLabel}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onStartTimer(undefined, stretch.id);
                  }}
                  className="p-1.5 rounded-full bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white transition-all"
                  aria-label="Start Stretch"
                >
                  <span className="material-symbols-outlined text-sm">play_arrow</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
