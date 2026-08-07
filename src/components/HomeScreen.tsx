import React, { useState } from 'react';
import { Routine, Stretch } from '../types';

interface HomeScreenProps {
  userName?: string;
  userAvatarUrl?: string;
  isGuest?: boolean;
  onOpenAuth?: () => void;
  onSelectRoutine: (routineId: string) => void;
  onSelectStretch: (stretchId: string) => void;
  onStartTimer: (routineId?: string, stretchId?: string) => void;
  onSearchQuery: (query: string) => void;
  onOpenPatronModal?: () => void;
  routines: Routine[];
  stretches: Stretch[];
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  userName = '',
  isGuest = false,
  onOpenAuth,
  onSelectRoutine,
  onStartTimer,
  onSearchQuery,
  onOpenPatronModal,
  routines,
}) => {
  const [searchInput, setSearchInput] = useState('');

  const getGreetingText = () => {
    const hour = new Date().getHours();
    let timeStr = 'Good Morning';
    if (hour >= 12 && hour < 18) {
      timeStr = 'Good Afternoon';
    } else if (hour >= 18 || hour < 5) {
      timeStr = 'Good Evening';
    }

    if (isGuest || !userName || !userName.trim()) {
      return timeStr;
    }

    const firstName = userName.trim().split(' ')[0];
    if (!firstName || firstName.toLowerCase() === 'alex') {
      return timeStr;
    }

    return `${timeStr}, ${firstName}`;
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchQuery(searchInput);
    }
  };

  // Weekly rotation calculations
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const pastDaysOfYear = (now.getTime() - startOfYear.getTime()) / 86400000;
  const currentWeekNum = Math.floor((pastDaysOfYear + startOfYear.getDay() + 1) / 7);

  // Rotate Featured Focus weekly through routine library
  const weeklyFocusRoutine = routines[currentWeekNum % routines.length] || routines[0];

  // Rotate Today's Routine Reset list weekly
  const rotatedIndices = [
    (currentWeekNum + 1) % routines.length,
    (currentWeekNum + 2) % routines.length,
    (currentWeekNum + 3) % routines.length,
  ];
  const todaysRoutineResetList = rotatedIndices.map((i) => routines[i] || routines[0]);

  return (
    <div className="w-full max-w-[1200px] mx-auto px-5 md:px-16 pt-6 pb-32 flex flex-col gap-10">
      {/* Guest Banner */}
      {isGuest && (
        <section className="bg-gradient-to-r from-blue-900/40 via-[#181820] to-indigo-900/40 border border-blue-500/30 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/30">
              <span className="material-symbols-outlined text-2xl">verified_user</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/20 px-2 py-0.5 rounded-full border border-blue-500/30">
                  CenterFlow Friend
                </span>
                <span className="text-xs text-gray-400">Always 100% Free</span>
              </div>
              <h3 className="text-base font-bold text-white mt-1">Welcome to CenterFlow</h3>
              <p className="text-xs text-gray-300 max-w-xl leading-relaxed">
                Enjoy free access to morning routines, mobility guides, and personal progress tracking. Payment is never required to create an account.
              </p>
            </div>
          </div>
          {onOpenAuth && (
            <button
              onClick={onOpenAuth}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-5 py-3 rounded-xl transition-all shadow-md active:scale-95 shrink-0 flex items-center gap-2"
            >
              <span>Create Free Account</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          )}
        </section>
      )}

      {/* Greeting & Search */}
      <section className="flex flex-col gap-3">
        <h2 className="text-2xl md:text-4xl font-light text-white tracking-tight">
          {getGreetingText()}
        </h2>
        <form onSubmit={handleSearchSubmit} className="relative w-full mt-2">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-gray-500 text-xl">search</span>
          </div>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="What is your body feeling today? e.g. Stiff neck, tight hips"
            className="block w-full pl-11 pr-20 py-3.5 bg-[#1A1A1C] border border-white/5 rounded-2xl text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-blue-500/50 transition-all shadow-lg"
          />
          {searchInput && (
            <button
              type="submit"
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-blue-500 hover:text-blue-400 font-medium text-xs"
            >
              Search
            </button>
          )}
        </form>
      </section>

      {/* Today's Focus Card (Weekly Rotation) */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            Today's Focus • <span className="text-blue-400">Weekly Library Rotation</span>
          </p>
          <span className="text-[10px] text-gray-500 font-medium bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
            Week #{currentWeekNum} Pick
          </span>
        </div>
        <div
          onClick={() => onSelectRoutine(weeklyFocusRoutine.id)}
          className="relative w-full h-[290px] md:h-[350px] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer flex flex-col justify-end p-6 md:p-8 border border-blue-500/20 hover:border-blue-400/60 transition-all duration-300 bg-[#161618]"
        >
          <img
            src={weeklyFocusRoutine.imageUrl}
            alt={weeklyFocusRoutine.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/60 to-transparent z-10" />

          <div className="relative z-20 flex flex-col gap-3 text-white">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 bg-blue-600/90 backdrop-blur-md rounded-full text-xs font-semibold text-white border border-blue-400/40 shadow-md flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">autorenew</span>
                Weekly Focus
              </span>
              <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-gray-200 border border-white/10">
                {weeklyFocusRoutine.badge || `${weeklyFocusRoutine.durationMinutes} MIN`}
              </span>
            </div>
            <div>
              <h4 className="text-2xl md:text-3xl font-bold text-white tracking-tight group-hover:text-blue-300 transition-colors">
                {weeklyFocusRoutine.title}
              </h4>
              <p className="text-sm md:text-base text-gray-300 mt-1 max-w-2xl line-clamp-2">
                {weeklyFocusRoutine.description}
              </p>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onStartTimer(weeklyFocusRoutine.id);
                }}
                className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-500 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-blue-900/40"
                aria-label="Play Routine"
              >
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  play_arrow
                </span>
              </button>
              <span className="text-xs text-gray-400 font-medium">Start Routine</span>
            </div>
          </div>
        </div>
      </section>

      {/* Targeted Relief (Where do you feel tension? - Redesigned) */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-[10px] uppercase tracking-[0.2em] text-blue-400 font-bold">Targeted Relief</p>
          <h3 className="text-xl md:text-2xl font-light text-white tracking-tight">
            Where do you feel <span className="font-semibold text-white">tension?</span>
          </h3>
        </div>

        {/* Enhanced Glassmorphic Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 md:gap-4 mt-1">
          <button
            onClick={() => onSearchQuery('Upper Body')}
            className="group relative bg-gradient-to-b from-[#1E1E22] to-[#141416] rounded-2xl p-5 md:p-6 flex flex-col justify-between items-start gap-4 border border-white/10 hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 active:scale-95 text-left overflow-hidden min-h-[140px]"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all" />
            <div className="w-11 h-11 rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/30 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
              <span className="material-symbols-outlined text-2xl">accessibility_new</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold text-white group-hover:text-blue-300 transition-colors">Upper Body</span>
              <span className="text-[11px] text-gray-400 mt-0.5">Neck, shoulders & wrists</span>
            </div>
          </button>

          <button
            onClick={() => onSearchQuery('Lower Body')}
            className="group relative bg-gradient-to-b from-[#1E1E22] to-[#141416] rounded-2xl p-5 md:p-6 flex flex-col justify-between items-start gap-4 border border-white/10 hover:border-emerald-500/60 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 active:scale-95 text-left overflow-hidden min-h-[140px]"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all" />
            <div className="w-11 h-11 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-inner">
              <span className="material-symbols-outlined text-2xl">directions_walk</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold text-white group-hover:text-emerald-300 transition-colors">Lower Body</span>
              <span className="text-[11px] text-gray-400 mt-0.5">Hips, quads & ankles</span>
            </div>
          </button>

          <button
            onClick={() => onSearchQuery('Morning')}
            className="group relative bg-gradient-to-b from-[#1E1E22] to-[#141416] rounded-2xl p-5 md:p-6 flex flex-col justify-between items-start gap-4 border border-white/10 hover:border-amber-500/60 hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300 active:scale-95 text-left overflow-hidden min-h-[140px]"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all" />
            <div className="w-11 h-11 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-all shadow-inner">
              <span className="material-symbols-outlined text-2xl">wb_sunny</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold text-white group-hover:text-amber-300 transition-colors">Morning Flow</span>
              <span className="text-[11px] text-gray-400 mt-0.5">Sunrise energy reset</span>
            </div>
          </button>

          <button
            onClick={() => onSearchQuery('Sleep')}
            className="group relative bg-gradient-to-b from-[#1E1E22] to-[#141416] rounded-2xl p-5 md:p-6 flex flex-col justify-between items-start gap-4 border border-white/10 hover:border-indigo-500/60 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 active:scale-95 text-left overflow-hidden min-h-[140px]"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all" />
            <div className="w-11 h-11 rounded-xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
              <span className="material-symbols-outlined text-2xl">bedtime</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold text-white group-hover:text-indigo-300 transition-colors">Better Sleep</span>
              <span className="text-[11px] text-gray-400 mt-0.5">Evening decompression</span>
            </div>
          </button>
        </div>

        {/* Featured Full Body Focus Strip */}
        <button
          onClick={() => onSearchQuery('Full Body')}
          className="w-full bg-gradient-to-r from-blue-900/40 via-blue-800/30 to-indigo-900/40 border border-blue-500/40 rounded-2xl p-4 md:p-5 flex items-center justify-between gap-4 hover:border-blue-400 transition-all active:scale-95 shadow-xl group mt-1"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                self_improvement
              </span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">Complete Full Body Alignment</span>
              <span className="text-xs text-gray-300">Target every posture chain in a single unified session</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-blue-400 group-hover:translate-x-1 transition-transform text-xl shrink-0">
            arrow_forward
          </span>
        </button>
      </section>

      {/* Today's Routine Reset / Quick Start Routines (Weekly Rotating) */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl md:text-2xl font-light text-white tracking-tight">
            Today's <span className="font-semibold text-white">Routine Reset</span>
          </h3>
          <span className="text-xs text-blue-400 font-medium flex items-center gap-1 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            <span className="material-symbols-outlined text-sm">update</span>
            Rotates Weekly
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {todaysRoutineResetList.map((routine) => (
            <div
              key={routine.id}
              onClick={() => onSelectRoutine(routine.id)}
              className="group bg-[#1A1A1C] rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer shadow-xl"
            >
              <div className="h-44 w-full relative overflow-hidden bg-[#121214]">
                <img
                  src={routine.imageUrl}
                  alt={routine.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1C] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <span className="bg-blue-600 text-white font-semibold text-xs px-2.5 py-1 rounded-full shadow-md">
                    {routine.badge || `${routine.durationMinutes} MIN`}
                  </span>
                </div>
              </div>
              <div className="p-5 flex flex-col gap-1.5">
                <h4 className="text-base font-semibold text-gray-200 group-hover:text-blue-400 transition-colors">
                  {routine.title}
                </h4>
                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{routine.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Explore by Need / Symptom */}
      <section className="flex flex-col gap-3">
        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Quick Filters</p>
        <div className="flex flex-wrap gap-2.5">
          {[
            { label: 'Sitting All Day', icon: 'chair' },
            { label: 'Lower Back Relief', icon: 'airline_seat_recline_extra' },
            { label: 'Ankle Mobility', icon: 'directions_walk' },
            { label: 'Upper Body Tension', icon: 'self_improvement' },
            { label: 'Rotator Cuff', icon: 'vital_signs' },
            { label: 'Deltoid', icon: 'fitness_center' },
          ].map((chip) => (
            <button
              key={chip.label}
              onClick={() => onSearchQuery(chip.label)}
              className="bg-[#1A1A1C] text-gray-300 px-4 py-2.5 rounded-full text-xs font-medium hover:bg-white/10 hover:text-white border border-white/5 transition-all active:scale-95 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base text-gray-400">{chip.icon}</span>
              {chip.label}
            </button>
          ))}
        </div>
      </section>

      {/* Sponsor CenterFlow / Patron Banner */}
      {onOpenPatronModal && (
        <section
          onClick={onOpenPatronModal}
          className="bg-gradient-to-r from-blue-950/40 via-[#1A1A1C] to-[#18181A] border border-blue-500/30 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl hover:border-blue-400/50 transition-all cursor-pointer group"
        >
          <div className="flex flex-col gap-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] bg-blue-600/30 text-blue-400 border border-blue-500/30">
                Patron & Gift Membership
              </span>
              <span className="text-xs text-gray-400">Independent Body Relief Platform</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Sponsor CenterFlow
            </h3>
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
              CenterFlow is an independent body relief platform. Support development or gift a membership to a friend or coworker dealing with desk fatigue.
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenPatronModal();
            }}
            className="shrink-0 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-blue-900/30 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 group-hover:bg-blue-500"
          >
            <span className="material-symbols-outlined text-base">favorite</span>
            Become a Patron
          </button>
        </section>
      )}

      {/* Anatomical Muscle Database Banner */}
      <section className="bg-gradient-to-r from-blue-900/30 via-[#1A1A1C] to-[#1A1A1C] border border-blue-500/20 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="flex flex-col gap-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-600/30 text-blue-400 border border-blue-500/30">
              Interactive Master Database
            </span>
            <span className="text-xs text-gray-400">71 Audited Muscles • 207 Exercises</span>
          </div>
          <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight">
            Explore Full Muscle Anatomy & Nerves
          </h3>
          <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
            Look up nerve innervations (C5–S2), origin/insertion points, sports utilization, and targeted strengthening or stretching exercises for any muscle group.
          </p>
        </div>
        <button
          onClick={() => onSearchQuery('')}
          className="shrink-0 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-blue-900/30 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
        >
          <span className="material-symbols-outlined text-base">search</span>
          Open Muscle Library
        </button>
      </section>
    </div>
  );
};
