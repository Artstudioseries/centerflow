import React from 'react';
import { MasterMuscle, MasterExercise } from '../types';
import masterLibrary from '../data/master_muscle_library.json';

interface MuscleDetailModalProps {
  muscle: MasterMuscle;
  onClose: () => void;
  onSelectExercise?: (exercise: MasterExercise) => void;
}

export const MuscleDetailModal: React.FC<MuscleDetailModalProps> = ({
  muscle,
  onClose,
  onSelectExercise,
}) => {
  const allExercises: MasterExercise[] = (masterLibrary as any).exercises || [];

  const associatedExercises = allExercises.filter((e) =>
    muscle.associated_exercise_ids?.includes(e.exercise_id)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#18181A] rounded-3xl border border-white/10 p-6 md:p-8 shadow-2xl flex flex-col gap-6 max-h-[88vh] overflow-y-auto">
        <div className="flex items-start justify-between border-b border-white/5 pb-4">
          <div className="flex flex-col gap-1 pr-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 bg-blue-600/10 border border-blue-500/20 px-3 py-1 rounded-full w-fit">
              Anatomical Muscle Profile • {muscle.anatomical_region}
            </span>
            <h2 className="text-3xl font-bold text-white tracking-tight mt-1">{muscle.muscle_name}</h2>
            <span className="text-xs italic text-gray-400 font-serif">Origin: {muscle.latin_origin}</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-full bg-white/5 hover:bg-white/10 shrink-0"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[#121214] rounded-2xl border border-white/5 flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Origin</span>
            <p className="text-xs text-gray-300 leading-relaxed">{muscle.origin}</p>
          </div>

          <div className="p-4 bg-[#121214] rounded-2xl border border-white/5 flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Insertion</span>
            <p className="text-xs text-gray-300 leading-relaxed">{muscle.insertion}</p>
          </div>

          <div className="p-4 bg-[#121214] rounded-2xl border border-white/5 flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Nerve Innervation</span>
            <p className="text-xs text-gray-300 font-mono">{muscle.nerve}</p>
          </div>

          <div className="p-4 bg-[#121214] rounded-2xl border border-white/5 flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Primary Action</span>
            <p className="text-xs text-gray-300 leading-relaxed">{muscle.action}</p>
          </div>
        </div>

        <div className="p-4 bg-[#121214] rounded-2xl border border-white/5 flex flex-col gap-2">
          <span className="text-xs font-bold text-white">Functional Movement & Common Issues</span>
          <p className="text-xs text-gray-300 leading-relaxed">{muscle.basic_functional_movement}</p>
          {muscle.common_problems && muscle.common_problems.length > 0 && (
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="text-[10px] text-gray-500 font-bold uppercase">Common Risks:</span>
              {muscle.common_problems.map((prob, i) => (
                <span key={i} className="text-[10px] bg-red-500/10 text-red-300 border border-red-500/20 px-2 py-0.5 rounded-md font-medium">
                  {prob}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Mapped Exercises */}
        {associatedExercises.length > 0 && (
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-white">Targeted Exercises ({associatedExercises.length})</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {associatedExercises.map((ex) => (
                <div
                  key={ex.exercise_id}
                  onClick={() => onSelectExercise && onSelectExercise(ex)}
                  className="p-3 bg-[#121214] hover:bg-blue-600/15 border border-white/5 hover:border-blue-500/40 rounded-xl transition-all cursor-pointer flex items-center justify-between"
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-gray-200">{ex.name}</span>
                    <span className="text-[10px] text-gray-400">{ex.type} • {ex.equipment}</span>
                  </div>
                  <span className="material-symbols-outlined text-blue-400 text-sm">chevron_right</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
