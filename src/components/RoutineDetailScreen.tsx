import React from 'react';
import { Routine } from '../types';

interface RoutineDetailScreenProps {
  routine: Routine;
  onBack: () => void;
  onStartRoutine: (routineId: string) => void;
  onSelectStretch?: (stretchId: string) => void;
  onSearchQuery?: (query: string) => void;
}

export const RoutineDetailScreen: React.FC<RoutineDetailScreenProps> = ({
  routine,
  onBack,
  onStartRoutine,
  onSelectStretch,
  onSearchQuery,
}) => {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-5 md:px-16 pt-6 pb-32 flex flex-col gap-8">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-2 -ml-2 text-gray-300 hover:text-white transition-colors rounded-full bg-[#1A1A1C] border border-white/10"
        >
          <span className="material-symbols-outlined text-xl">arrow_back</span>
        </button>
        <h2 className="text-xl md:text-2xl font-semibold text-white truncate max-w-[70%] text-center tracking-tight">
          {routine.title}
        </h2>
        <div className="w-10" />
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column: Hero & Overview */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <div className="relative w-full aspect-[4/3] md:aspect-square rounded-2xl overflow-hidden shadow-xl border border-white/10 group bg-[#1A1A1C]">
            <img
              src={routine.imageUrl}
              alt={routine.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F10] via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
              <span className="bg-[#0F0F10]/80 text-gray-300 text-xs font-semibold px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
                {routine.movementsCount} MOVEMENTS
              </span>
              <span className="bg-[#0F0F10]/80 text-blue-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-500/30 backdrop-blur-md flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">schedule</span>
                {routine.durationMinutes} MINS
              </span>
            </div>
          </div>

          <p className="text-sm md:text-base text-gray-400 leading-relaxed">{routine.description}</p>
        </div>

        {/* Right Column: Routine Breakdown Steps */}
        <div className="md:col-span-7 flex flex-col gap-6">
          <h3 className="text-xl font-light text-white tracking-tight">Routine Breakdown</h3>

          <div className="flex flex-col gap-4 relative">
            {routine.movements.map((step, idx) => (
              <div
                key={step.id}
                onClick={() => step.stretchId && onSelectStretch && onSelectStretch(step.stretchId)}
                className="bg-[#1A1A1C] border border-white/5 hover:border-blue-500/50 rounded-2xl p-5 flex gap-4 items-start cursor-pointer transition-all duration-300 shadow-md group"
              >
                <div className="w-9 h-9 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-semibold text-sm shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  {idx + 1}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <h4 className="text-base font-semibold text-gray-200 group-hover:text-blue-400 transition-colors">
                      {step.name}
                    </h4>
                    <span className="text-xs font-semibold text-blue-400 bg-blue-600/20 px-2.5 py-0.5 rounded-md border border-blue-500/30 shrink-0">
                      {step.durationMinutes}m
                    </span>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed mb-3">{step.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {step.muscleGroups.map((m) => (
                      <button
                        key={m}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onSearchQuery) onSearchQuery(m);
                        }}
                        className="text-[11px] bg-[#222226] text-blue-400 font-medium px-2.5 py-1 rounded-md border border-blue-500/20 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 left-0 right-0 z-40 px-5 flex justify-center pointer-events-none">
        <button
          onClick={() => onStartRoutine(routine.id)}
          className="pointer-events-auto bg-blue-600 text-white font-semibold text-sm px-8 py-3.5 rounded-full shadow-lg shadow-blue-900/30 hover:bg-blue-500 active:scale-95 transition-all flex items-center gap-2 max-w-sm w-full justify-center"
        >
          <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            play_arrow
          </span>
          <span>Start Routine</span>
        </button>
      </div>
    </div>
  );
};
