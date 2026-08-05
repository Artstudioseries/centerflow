import React from 'react';
import { Routine } from '../types';

interface RoutinesScreenProps {
  onSelectRoutine: (routine: Routine) => void;
  onSelectPhilosophy: () => void;
  routines: Routine[];
}

export const RoutinesScreen: React.FC<RoutinesScreenProps> = ({
  onSelectRoutine,
  onSelectPhilosophy,
  routines,
}) => {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-5 md:px-16 pt-6 pb-32 flex flex-col gap-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight">
            Guided Movement <span className="font-semibold text-white">Routines</span>
          </h2>
          <p className="text-xs md:text-sm text-gray-400 max-w-xl leading-relaxed">
            Curated sequence sessions designed to counteract long sitting periods, desk neck strain, and hamstring tightness.
          </p>
        </div>

        <button
          onClick={onSelectPhilosophy}
          className="flex items-center gap-2 bg-[#1A1A1C] hover:bg-[#222224] border border-white/10 text-blue-400 font-semibold text-xs py-2.5 px-4 rounded-xl transition-all w-fit"
        >
          <span className="material-symbols-outlined text-sm">menu_book</span>
          <span>Movement Guidance</span>
        </button>
      </section>

      {/* Routines Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {routines.map((routine) => (
          <div
            key={routine.id}
            onClick={() => onSelectRoutine(routine)}
            className="bg-[#1A1A1C] rounded-3xl border border-white/5 hover:border-blue-500/30 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between group shadow-xl"
          >
            <div className="relative h-48 w-full overflow-hidden bg-[#121214]">
              <img
                src={routine.imageUrl}
                alt={routine.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
              />
              <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {routine.category}
              </span>
              <span className="absolute bottom-4 right-4 bg-blue-600/90 text-white text-xs font-mono font-bold px-3 py-1 rounded-xl shadow-md">
                {routine.durationMinutes} min
              </span>
            </div>

            <div className="p-6 flex flex-col gap-3">
              <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                {routine.title}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                {routine.subtitle}
              </p>

              <div className="flex items-center justify-between text-xs text-gray-400 mt-2 pt-4 border-t border-white/5">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base text-blue-400">schedule</span>
                  <span>{routine.movementsCount} Movements</span>
                </span>
                <span className="font-semibold text-blue-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                  Start Routine <span className="material-symbols-outlined text-sm">chevron_right</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
