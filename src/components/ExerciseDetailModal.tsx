import React from 'react';
import { MasterExercise } from '../types';

interface ExerciseDetailModalProps {
  exercise: MasterExercise;
  onClose: () => void;
}

export const ExerciseDetailModal: React.FC<ExerciseDetailModalProps> = ({ exercise, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#18181A] rounded-3xl border border-white/10 p-6 shadow-2xl flex flex-col gap-6 max-h-[85vh] overflow-y-auto">
        <div className="flex items-start justify-between border-b border-white/5 pb-4">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 bg-blue-600/10 border border-blue-500/20 px-3 py-1 rounded-full w-fit">
              Exercise Technique • {exercise.type}
            </span>
            <h3 className="text-2xl font-bold text-white tracking-tight mt-1">{exercise.name}</h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-full bg-white/5 hover:bg-white/10"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="p-4 bg-[#121214] rounded-2xl border border-white/5 flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400">Equipment Needed</span>
            <span className="text-xs font-bold text-white bg-blue-600/20 border border-blue-500/30 px-3 py-1 rounded-full">
              {exercise.equipment}
            </span>
          </div>

          <div className="p-4 bg-[#121214] rounded-2xl border border-white/5 flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400">Movement Classification</span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded-full capitalize">
              {exercise.type}
            </span>
          </div>

          <div className="p-4 bg-[#121214] rounded-2xl border border-white/5 flex flex-col gap-2">
            <span className="text-xs font-bold text-white">Anatomical Focus</span>
            <p className="text-xs text-gray-400 leading-relaxed">
              Targeted strain relief and kinetic chain activation for stability, flexibility, and post-desk posture reset.
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3 px-6 rounded-2xl shadow-lg transition-all"
        >
          Close Inspection
        </button>
      </div>
    </div>
  );
};
