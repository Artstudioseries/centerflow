import React from 'react';
import { MuscleAnatomy } from '../types';
import masterLibrary from '../data/master_muscle_library.json';
import { MuscleRegionDiagram } from './MuscleRegionDiagram';

interface MuscleDetailModalProps {
  muscle: MuscleAnatomy | null;
  onClose: () => void;
  onFilterByTag?: (tag: string) => void;
}

export const MuscleDetailModal: React.FC<MuscleDetailModalProps> = ({
  muscle,
  onClose,
  onFilterByTag,
}) => {
  if (!muscle) return null;

  // Find associated relational exercises from master_muscle_library if available
  const masterMuscle = masterLibrary.muscles.find((m) => m.id === muscle.id);
  const associatedExercises = masterMuscle
    ? masterLibrary.exercises.filter((ex) => masterMuscle.associated_exercise_ids.includes(ex.exercise_id))
    : [];

  return (
    <div className="fixed inset-0 z-50 p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto flex items-start sm:items-center justify-center animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[85vh] sm:max-h-[90vh] bg-[#18181A] border border-white/10 rounded-3xl p-5 sm:p-6 md:p-8 shadow-2xl flex flex-col gap-6 my-auto text-gray-200 overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex items-start gap-4">
            <MuscleRegionDiagram
              region={muscle.anatomical_region}
              muscleId={muscle.id}
              size="lg"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-600/20 text-blue-400 border border-blue-500/20">
                  {muscle.anatomical_region}
                </span>
                {muscle.latin_origin && (
                  <span className="text-xs text-gray-400 italic">
                    Origin: "{muscle.latin_origin}"
                  </span>
                )}
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
                {muscle.muscle_name}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all shrink-0"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Content Sections */}
        <div className="flex flex-col gap-5 text-sm leading-relaxed">
          {/* Action & Functional Movement */}
          <div className="bg-[#202024] rounded-2xl p-4 border border-white/5 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-blue-400 font-semibold text-xs uppercase tracking-wider">
              <span className="material-symbols-outlined text-base">directions_run</span>
              Anatomical Action & Daily Movement
            </div>
            <p className="text-gray-200 font-medium">{muscle.action}</p>
            {muscle.basic_functional_movement && (
              <p className="text-xs text-gray-400">
                <span className="text-gray-300 font-medium">Functional: </span>
                {muscle.basic_functional_movement}
              </p>
            )}
          </div>

          {/* Origin, Insertion, Nerve Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-[#202024] rounded-2xl p-4 border border-white/5 flex flex-col gap-1">
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Origin</span>
              <p className="text-xs text-gray-300">{muscle.origin}</p>
            </div>
            <div className="bg-[#202024] rounded-2xl p-4 border border-white/5 flex flex-col gap-1">
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Insertion</span>
              <p className="text-xs text-gray-300">{muscle.insertion}</p>
            </div>
            <div className="bg-[#202024] rounded-2xl p-4 border border-white/5 flex flex-col gap-1">
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Nerve Supply</span>
              <p className="text-xs font-semibold text-blue-400">{muscle.nerve}</p>
            </div>
          </div>

          {/* Sports & Activity */}
          {muscle.sports_heavy_utilization && muscle.sports_heavy_utilization.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base text-blue-400">sports_tennis</span>
                Sports Heavily Utilizing This Muscle
              </span>
              <div className="flex flex-wrap gap-2">
                {muscle.sports_heavy_utilization.map((sport) => (
                  <button
                    key={sport}
                    onClick={() => {
                      if (onFilterByTag) {
                        onFilterByTag(sport);
                        onClose();
                      }
                    }}
                    className="px-3 py-1 rounded-xl text-xs font-medium bg-[#222226] text-gray-300 border border-white/10 hover:border-blue-500/50 hover:text-white transition-all"
                  >
                    {sport}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Clinical Insights: Injury Risks & Common Problems */}
          {(muscle.injury_risks || (muscle.common_problems && muscle.common_problems.length > 0)) && (
            <div className="bg-[#261E1E]/50 border border-red-500/20 rounded-2xl p-4 flex flex-col gap-2">
              <span className="text-xs font-semibold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">warning</span>
                Clinical Risks & Tightness Issues
              </span>
              {muscle.injury_risks && (
                <p className="text-xs text-gray-300">
                  <span className="font-semibold text-red-300">Injury Risk: </span>
                  {muscle.injury_risks}
                </p>
              )}
              {muscle.common_problems && muscle.common_problems.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {muscle.common_problems.map((prob) => (
                    <span key={prob} className="text-[11px] px-2.5 py-1 rounded-lg bg-red-950/40 text-red-300 border border-red-500/20">
                      {prob}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Relational Exercises */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* Strengthening */}
            <div className="flex flex-col gap-2 bg-[#202024] rounded-2xl p-4 border border-white/5">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-base">fitness_center</span>
                Strengthening Exercises ({muscle.strengthening_exercises.length})
              </span>
              <ul className="flex flex-col gap-1.5">
                {muscle.strengthening_exercises.map((ex) => (
                  <li key={ex} className="text-xs text-gray-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    {ex}
                  </li>
                ))}
              </ul>
            </div>

            {/* Stretching */}
            <div className="flex flex-col gap-2 bg-[#202024] rounded-2xl p-4 border border-white/5">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-base">self_improvement</span>
                Stretching Movements ({muscle.stretching_exercises.length})
              </span>
              <ul className="flex flex-col gap-1.5">
                {muscle.stretching_exercises.map((ex) => (
                  <li key={ex} className="text-xs text-gray-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                    {ex}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl shadow-lg transition-all"
          >
            Done Viewing
          </button>
        </div>
      </div>
    </div>
  );
};
