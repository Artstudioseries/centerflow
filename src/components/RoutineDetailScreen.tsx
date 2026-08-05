import React from 'react';
import { Routine } from '../types';

interface RoutineDetailScreenProps {
  routine: Routine;
  onBack: () => void;
  onStartRoutine: (routineId: string) => void;
  onSelectStretch: (stretchId: string) => void;
  onSearchQuery: (query: string) => void;
}

export const RoutineDetailScreen: React.FC<RoutineDetailScreenProps> = ({
  routine,
  onBack,
  onStartRoutine,
  onSelectStretch,
  onSearchQuery,
}) => {
  return (
    <div className="w-full max-w-[1000px] mx-auto px-5 md:px-16 pt-6 pb-32 flex flex-col gap-8">
      {/* Banner */}
      <div className="relative w-full h-64 md:h-80 rounded-3xl overflow-hidden bg-[#121214] border border-white/10 shadow-2xl">
        <img src={routine.imageUrl} alt={routine.title} className="w-full h-full object-cover opacity-85" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F10] via-[#0F0F10]/50 to-transparent flex flex-col justify-end p-6 md:p-10 gap-2">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400 bg-blue-600/20 border border-blue-500/30 px-3 py-1 rounded-full w-fit">
            {routine.category} Routine
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">{routine.title}</h2>
          <p className="text-xs md:text-sm text-gray-300 max-w-2xl leading-relaxed">{routine.subtitle}</p>
        </div>
      </div>

      {/* Start Button & Meta Stats */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-[#1A1A1C] rounded-2xl border border-white/5 shadow-lg">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Duration</span>
            <span className="text-lg font-bold font-mono text-white">{routine.durationMinutes} Minutes</span>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Movements</span>
            <span className="text-lg font-bold font-mono text-white">{routine.movementsCount} Steps</span>
          </div>
        </div>

        <button
          onClick={() => onStartRoutine(routine.id)}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm py-3.5 px-8 rounded-2xl shadow-xl shadow-blue-900/30 transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          <span className="material-symbols-outlined text-xl">play_arrow</span>
          <span>Start Full Routine</span>
        </button>
      </div>

      {/* Routine Steps List */}
      <section className="flex flex-col gap-4">
        <h3 className="text-xl font-bold text-white tracking-tight">Sequence Steps ({routine.movements.length})</h3>

        <div className="flex flex-col gap-3">
          {routine.movements.map((step, idx) => (
            <div
              key={step.id}
              onClick={() => step.stretchId && onSelectStretch(step.stretchId)}
              className="bg-[#1A1A1C] p-5 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all flex items-center justify-between gap-4 group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm shrink-0">
                  {idx + 1}
                </div>
                <div className="flex flex-col gap-0.5">
                  <h4 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                    {step.name}
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-1">{step.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-mono font-bold text-gray-400 bg-[#121214] px-3 py-1 rounded-full border border-white/5">
                  {step.durationMinutes} min
                </span>
                <span className="material-symbols-outlined text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all text-lg">
                  chevron_right
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
