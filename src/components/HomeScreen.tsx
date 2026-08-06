import React, { useState } from 'react';
import { Routine, Stretch } from '../types';
import { BodyMuscleMap } from './BodyMuscleMap';

interface HomeScreenProps {
  userName: string;
  userAvatarUrl: string;
  onSelectRoutine: (routineId: string) => void;
  onSelectStretch: (stretchId: string) => void;
  onStartTimer: (routineId?: string, stretchId?: string) => void;
  onSearchQuery: (query: string) => void;
  onOpenPatronModal?: () => void;
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
  const [searchInput, setSearchInput] = useState('');

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Good Morning';
    if (hour >= 12 && hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getFirstName = (name?: string) => {
    if (!name) return '';
    const trimmed = name.trim();
    if (!trimmed || trimmed.toLowerCase() === 'alex' || trimmed.toLowerCase() === 'guest') return '';
    return trimmed.split(' ')[0];
  };

  const firstName = getFirstName(userName);
  const timeGreeting = getTimeGreeting();
  const fullGreeting = firstName ? `${timeGreeting}, ${firstName}` : timeGreeting;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchQuery(searchInput);
    }
  };

  const dailyResetRoutine = routines.find((r) => r.id === 'daily-reset') || routines[0];

  return (
    <div className="w-full max-w-[1200px] mx-auto px-5 md:px-16 pt-6 pb-32 flex flex-col gap-10">
      {/* Greeting & Search */}
      <section className="flex flex-col gap-3">
        <h2 className="text-2xl md:text-4xl font-light text-white tracking-tight">
          {fullGreeting}
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

      {/* Today's Focus Card */}
      <section className="flex flex-col gap-3">
        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Today's Focus</p>
        <div
          onClick={() => onSelectRoutine(dailyResetRoutine.id)}
          className="relative w-full h-[280px] md:h-[340px] rounded-2xl overflow-hidden shadow-xl group cursor-pointer flex flex-col justify-end p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-300 bg-[#1A1A1C]"
        >
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHo1l7d4Eylo_Q9MympkmQQsAnfbqk0OX6zioDNYfA_i_pJlCdyJhwt5BlBWocOPdKEhTItvOm5BUxEIw-0fr0PJIVnwRsTUc0_EBu-MEl0Xjg6c7mF0vmv8JbeGwlLXjHvpcOveX2NURbAK-Ggn4E1NFXW7P4zYKCAr9lyPk90NGZZXAn--TOyYYv1yykCUuOm-MQ9nYEN53Z7HyA8nwslWriaoNDAHvRVJdeyHKU5g3UVeDoR3Gt"
            alt="Daily Reset Studio"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F10] via-[#0F0F10]/50 to-transparent z-10" />

          <div className="relative z-20 flex flex-col gap-3 text-white">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-blue-600/80 backdrop-blur-md rounded-full text-xs font-semibold text-white border border-blue-400/30">
                15 Min
              </span>
              <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-gray-200 border border-white/10">
                Recovery
              </span>
            </div>
            <div>
              <h4 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">Daily Reset</h4>
              <p className="text-sm md:text-base text-gray-400 mt-1">Gentle mobilization to start your day.</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onStartTimer(dailyResetRoutine.id);
              }}
              className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center mt-1 hover:bg-blue-500 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-blue-900/30"
              aria-label="Play Routine"
            >
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                play_arrow
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Body Muscle Map & Target Relief */}
      <section className="flex flex-col gap-3">
        <BodyMuscleMap
          onSelectRoutine={onSelectRoutine}
          onSelectStretch={onSelectStretch}
          onStartTimer={onStartTimer}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mt-1">
          <button
            onClick={() => onSearchQuery('Upper Body')}
            className="bg-[#1A1A1C] rounded-2xl p-6 flex flex-col items-center justify-center gap-3 aspect-square border border-white/5 hover:border-blue-500/50 hover:bg-[#222224] transition-all active:scale-95 shadow-md group"
          >
            <div className="w-12 h-12 rounded-full bg-blue-600/10 text-blue-500 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
              <span className="material-symbols-outlined text-2xl">accessibility_new</span>
            </div>
            <span className="text-sm font-medium text-gray-300 text-center group-hover:text-white">Upper Body</span>
          </button>

          <button
            onClick={() => onSearchQuery('Lower Body')}
            className="bg-[#1A1A1C] rounded-2xl p-6 flex flex-col items-center justify-center gap-3 aspect-square border border-white/5 hover:border-blue-500/50 hover:bg-[#222224] transition-all active:scale-95 shadow-md group"
          >
            <div className="w-12 h-12 rounded-full bg-blue-600/10 text-blue-500 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
              <span className="material-symbols-outlined text-2xl">directions_walk</span>
            </div>
            <span className="text-sm font-medium text-gray-300 text-center group-hover:text-white">Lower Body</span>
          </button>

          <button
            onClick={() => onSearchQuery('Morning')}
            className="bg-[#1A1A1C] rounded-2xl p-6 flex flex-col items-center justify-center gap-3 aspect-square border border-white/5 hover:border-blue-500/50 hover:bg-[#222224] transition-all active:scale-95 shadow-md group"
          >
            <div className="w-12 h-12 rounded-full bg-blue-600/10 text-blue-500 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
              <span className="material-symbols-outlined text-2xl">wb_sunny</span>
            </div>
            <span className="text-sm font-medium text-gray-300 text-center group-hover:text-white">Morning Flow</span>
          </button>

          <button
            onClick={() => onSearchQuery('Sleep')}
            className="bg-[#1A1A1C] rounded-2xl p-6 flex flex-col items-center justify-center gap-3 aspect-square border border-white/5 hover:border-blue-500/50 hover:bg-[#222224] transition-all active:scale-95 shadow-md group"
          >
            <div className="w-12 h-12 rounded-full bg-blue-600/10 text-blue-500 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
              <span className="material-symbols-outlined text-2xl">bedtime</span>
            </div>
            <span className="text-sm font-medium text-gray-300 text-center group-hover:text-white">Better Sleep</span>
          </button>

          <button
            onClick={() => onSearchQuery('Full Body')}
            className="col-span-2 md:col-span-1 bg-blue-600 text-white rounded-2xl p-6 flex flex-row md:flex-col items-center justify-center gap-3 md:aspect-square shadow-lg shadow-blue-900/20 hover:bg-blue-500 transition-all active:scale-95"
          >
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                self_improvement
              </span>
            </div>
            <span className="text-sm font-semibold text-center">Full Body Flow</span>
          </button>
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
