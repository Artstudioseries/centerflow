import React from 'react';
import { MasterExercise } from '../types';
import masterLibrary from '../data/master_muscle_library.json';

interface ExerciseDetailModalProps {
  exercise: MasterExercise | null;
  onClose: () => void;
  onSelectMuscle: (muscleId: string) => void;
}

export const ExerciseDetailModal: React.FC<ExerciseDetailModalProps> = ({
  exercise,
  onClose,
  onSelectMuscle,
}) => {
  if (!exercise) return null;

  // Find all muscles associated with this exercise (Reverse Lookup)
  const targetedMuscles = masterLibrary.muscles.filter((m) =>
    m.associated_exercise_ids.includes(exercise.exercise_id)
  );

  return (
    <div className="fixed inset-0 z-50 p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto flex items-start sm:items-center justify-center animate-fade-in">
      <div className="relative w-full max-w-xl max-h-[85vh] sm:max-h-[90vh] bg-[#18181A] border border-white/10 rounded-3xl p-5 sm:p-6 md:p-8 shadow-2xl flex flex-col gap-6 my-auto text-gray-200 overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                  exercise.type === 'strengthening'
                    ? 'bg-emerald-600/20 text-emerald-400 border-emerald-500/30'
                    : exercise.type === 'stretching'
                    ? 'bg-blue-600/20 text-blue-400 border-blue-500/30'
                    : 'bg-purple-600/20 text-purple-400 border-purple-500/30'
                }`}
              >
                {exercise.type} Exercise
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-gray-500">fitness_center</span>
                {exercise.equipment}
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-white tracking-tight">
              {exercise.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all shrink-0"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between bg-[#202024] rounded-2xl p-4 border border-white/5">
            <span className="text-xs text-gray-400 font-medium">Equipment Required</span>
            <span className="text-xs font-semibold text-white bg-white/10 px-3 py-1 rounded-lg">
              {exercise.equipment}
            </span>
          </div>

          {/* Reverse Lookup Targeted Muscles */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-blue-400 text-base">vital_signs</span>
              Targeted Muscles ({targetedMuscles.length})
            </h3>

            {targetedMuscles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-60 overflow-y-auto no-scrollbar pr-1">
                {targetedMuscles.map((muscle) => (
                  <button
                    key={muscle.id}
                    onClick={() => {
                      onSelectMuscle(muscle.id);
                      onClose();
                    }}
                    className="flex flex-col items-start p-3 rounded-xl bg-[#202024] border border-white/5 hover:border-blue-500/50 hover:bg-[#25252a] text-left transition-all group"
                  >
                    <span className="text-[10px] font-semibold text-blue-400 truncate w-full">
                      {muscle.anatomical_region}
                    </span>
                    <span className="text-xs font-medium text-white group-hover:text-blue-300 transition-colors">
                      {muscle.muscle_name}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-500 italic bg-[#202024] p-3 rounded-xl border border-white/5">
                General systemic or auxiliary movement.
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl shadow-md transition-all"
          >
            Close Detail
          </button>
        </div>
      </div>
    </div>
  );
};
