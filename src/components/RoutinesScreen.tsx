import React from 'react';
import { Routine } from '../types';

interface RoutinesScreenProps {
  routines: Routine[];
  userTier?: 'friend' | 'supporter' | 'guardian' | 'pass' | null;
  isGuest?: boolean;
  onSelectRoutine: (routineId: string) => void;
  onSelectPhilosophy: () => void;
  onOpenPatronModal?: () => void;
  onOpenAuth?: () => void;
}

export const RoutinesScreen: React.FC<RoutinesScreenProps> = ({
  routines,
  userTier = 'friend',
  isGuest = false,
  onSelectRoutine,
  onSelectPhilosophy,
  onOpenPatronModal,
  onOpenAuth,
}) => {
  const getTierBadge = (requiredTier?: 'friend' | 'supporter' | 'guardian') => {
    if (requiredTier === 'guardian') {
      return (
        <span className="bg-blue-600/90 backdrop-blur-md text-white font-semibold text-[10px] px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1 border border-blue-400/30">
          <span className="material-symbols-outlined text-xs">shield_with_heart</span>
          Guardian Tier
        </span>
      );
    }
    if (requiredTier === 'supporter') {
      return (
        <span className="bg-emerald-600/90 backdrop-blur-md text-white font-semibold text-[10px] px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1 border border-emerald-400/30">
          <span className="material-symbols-outlined text-xs">favorite</span>
          Supporter Tier
        </span>
      );
    }
    return (
      <span className="bg-blue-950/80 backdrop-blur-md text-blue-300 font-semibold text-[10px] px-2.5 py-0.5 rounded-full shadow-md border border-blue-500/30">
        Free Friend Tier
      </span>
    );
  };

  const handleRoutineClick = (routine: Routine) => {
    // Anyone can view free friend routines
    const req = routine.tierRequired || 'friend';
    if (req === 'friend') {
      onSelectRoutine(routine.id);
      return;
    }

    // Checking if user has required tier
    const isGuardian = userTier === 'guardian' || userTier === 'pass';
    const isSupporter = userTier === 'supporter' || isGuardian;

    if (req === 'supporter' && !isSupporter) {
      if (isGuest && onOpenAuth) {
        onOpenAuth();
      } else if (onOpenPatronModal) {
        onOpenPatronModal();
      }
      return;
    }

    if (req === 'guardian' && !isGuardian) {
      if (isGuest && onOpenAuth) {
        onOpenAuth();
      } else if (onOpenPatronModal) {
        onOpenPatronModal();
      }
      return;
    }

    onSelectRoutine(routine.id);
  };
  return (
    <div className="w-full max-w-[1200px] mx-auto px-5 md:px-16 pt-6 pb-32 flex flex-col gap-10">
      {/* Main Screen Header */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-blue-400 text-xs font-semibold uppercase tracking-widest">
          <span className="material-symbols-outlined text-sm">event_note</span>
          Guided Sequences
        </div>
        <h1 className="text-3xl md:text-5xl font-light text-white tracking-tight">
          Guided <span className="font-semibold text-white">Routines</span>
        </h1>
        <p className="text-sm md:text-base text-gray-400 max-w-2xl leading-relaxed">
          Simple step-by-step routines to build control, mobility, and body awareness.
        </p>
      </section>

      {/* Featured "Our Method" Banner Card */}
      <section
        onClick={onSelectPhilosophy}
        className="relative w-full rounded-2xl overflow-hidden shadow-2xl cursor-pointer group border border-white/10 hover:border-blue-500/50 transition-all duration-300 p-6 md:p-8 flex flex-col justify-between min-h-[230px] bg-[#1A1A1C]"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35 transition-transform duration-700 group-hover:scale-105"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCcCXotSjxn6NmM0NmzLOB8634eMl8e5j2Jfz5ZSkzxPJRavZcXJLqIcTm-Xa8OG4C27jfTDYUhb6mBJoaVwWdNpx8PsCcbKAwe3V9yU4XE6J2RUfV41HIAxQP0MWpdy93mcMai9x9yaYmkbMUZ3GrWIfB-PPaPd542OjlGggk3gcuwyR3YjgNFJY11PIS38u4hGSuaw7WrRNrJeYlxPDrlTPYuRQoYpMaam5ze88uuuaHCNTocKg9g')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0E] via-[#0D0D0E]/85 to-transparent" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-2.5 max-w-xl">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300 bg-blue-600/20 border border-blue-400/30 px-3 py-1 rounded-full w-fit backdrop-blur-md">
            Our Method
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-1 tracking-tight">STRETCH SMART</h2>
          <p className="text-sm md:text-base text-blue-200 font-semibold">A daily practice to help you move better.</p>
          <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
            A simple stretching sequence for mobility, posture, breathing, and balance—designed to fit real daily routines.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-2 text-blue-400 font-semibold text-xs mt-5 group-hover:translate-x-1 group-hover:text-blue-300 transition-all">
          <span>Explore The Method</span>
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </div>
      </section>

      {/* Routine Grid */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h3 className="text-xl font-light text-white tracking-tight">
            All <span className="font-semibold text-white">Routines</span>
          </h3>
          <span className="text-xs text-gray-400 font-medium">{routines.length} Sequences</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {routines.map((routine) => (
            <div
              key={routine.id}
              onClick={() => handleRoutineClick(routine)}
              className="group bg-[#1A1A1C] rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer shadow-xl flex flex-col justify-between"
            >
              <div className="h-44 w-full relative overflow-hidden bg-[#121214]">
                <img
                  src={routine.imageUrl}
                  alt={routine.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1C] via-transparent to-transparent" />
                <div className="absolute top-3 right-3">
                  {getTierBadge(routine.tierRequired)}
                </div>
                <div className="absolute bottom-3 left-4">
                  <span className="bg-blue-600/90 backdrop-blur-md text-white font-semibold text-xs px-2.5 py-1 rounded-full shadow-md">
                    {routine.badge || `${routine.durationMinutes} MIN`}
                  </span>
                </div>
              </div>
              <div className="p-5 flex flex-col gap-1.5 flex-1 justify-between">
                <div>
                  <h4 className="text-base font-semibold text-gray-200 group-hover:text-blue-400 transition-colors">
                    {routine.title}
                  </h4>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mt-1">{routine.description}</p>
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-gray-500">fitness_center</span>
                    {routine.movementsCount || routine.movements.length} Movements
                  </span>
                  <span className="text-blue-400 font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    {routine.durationMinutes} min
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};


