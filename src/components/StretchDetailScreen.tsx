import React from 'react';
import { Stretch } from '../types';

interface StretchDetailScreenProps {
  stretch: Stretch;
  onBack: () => void;
  onStartStretchTimer: (stretchId: string) => void;
  onToggleSave: (stretchId: string) => void;
  isSaved: boolean;
  onSearchQuery: (query: string) => void;
}

export const StretchDetailScreen: React.FC<StretchDetailScreenProps> = ({
  stretch,
  onBack,
  onStartStretchTimer,
  onToggleSave,
  isSaved,
  onSearchQuery,
}) => {
  return (
    <div className="w-full max-w-[1000px] mx-auto px-5 md:px-16 pt-6 pb-32 flex flex-col gap-8">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          <span>Back</span>
        </button>

        <button
          onClick={() => onToggleSave(stretch.id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
            isSaved
              ? 'bg-blue-600/20 text-blue-300 border-blue-500/40'
              : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
          }`}
        >
          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0" }}>
            favorite
          </span>
          <span>{isSaved ? 'Saved' : 'Save Stretch'}</span>
        </button>
      </div>

      {/* Stretch Header Card */}
      <div className="bg-[#1A1A1C] rounded-3xl p-6 md:p-8 border border-white/5 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2 max-w-xl">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 bg-blue-600/10 border border-blue-500/20 px-3 py-1 rounded-full w-fit">
            {stretch.category} • {stretch.level}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{stretch.title}</h2>
          <p className="text-xs md:text-sm text-gray-300 leading-relaxed">{stretch.primaryFocus}</p>

          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {stretch.muscleGroups.map((mg) => (
              <button
                key={mg}
                onClick={() => onSearchQuery(mg)}
                className="px-2.5 py-1 rounded-lg bg-[#121214] text-[10px] font-semibold text-gray-400 border border-white/5 hover:text-white transition-colors"
              >
                {mg}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => onStartStretchTimer(stretch.id)}
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3.5 px-8 rounded-2xl shadow-xl shadow-blue-900/30 transition-all flex items-center justify-center gap-2 active:scale-95 shrink-0"
        >
          <span className="material-symbols-outlined text-lg">play_arrow</span>
          <span>Start Timer ({stretch.durationLabel})</span>
        </button>
      </div>

      {/* Step by Step Instructions */}
      <section className="bg-[#1A1A1C] rounded-3xl p-6 md:p-8 border border-white/5 shadow-lg flex flex-col gap-4">
        <h3 className="text-xl font-bold text-white tracking-tight">Step-by-Step Instructions</h3>

        <div className="flex flex-col gap-3">
          {stretch.instructions.map((step, idx) => (
            <div key={idx} className="flex items-start gap-4 p-3.5 bg-[#121214] rounded-2xl border border-white/5">
              <span className="w-7 h-7 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="text-xs text-gray-300 leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
