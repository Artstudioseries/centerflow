import React, { useState, useMemo } from 'react';
import { Routine, Stretch, MasterMuscle, MasterExercise } from '../types';
import masterLibrary from '../data/master_muscle_library.json';
import { MuscleRegionDiagram } from './MuscleRegionDiagram';
import { MuscleDetailModal } from './MuscleDetailModal';
import { ExerciseDetailModal } from './ExerciseDetailModal';

interface SearchScreenProps {
  initialQuery?: string;
  onSelectRoutine: (routineId: string) => void;
  onSelectStretch: (stretchId: string) => void;
  routines: Routine[];
  stretches: Stretch[];
}

type TabMode = 'muscles' | 'routines' | 'stretches' | 'exercises';

export const SearchScreen: React.FC<SearchScreenProps> = ({
  initialQuery = '',
  onSelectRoutine,
  onSelectStretch,
  routines,
  stretches,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<TabMode>('muscles');
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>('All');
  const [selectedMuscle, setSelectedMuscle] = useState<MasterMuscle | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<MasterExercise | null>(null);

  const masterMuscles: MasterMuscle[] = (masterLibrary as any).muscles || [];
  const masterExercises: MasterExercise[] = (masterLibrary as any).exercises || [];

  const regions = useMemo(() => {
    const set = new Set<string>();
    masterMuscles.forEach((m) => {
      if (m.anatomical_region) set.add(m.anatomical_region);
    });
    return ['All', ...Array.from(set).sort()];
  }, [masterMuscles]);

  const filteredMuscles = useMemo(() => {
    const q = query.toLowerCase().trim();
    return masterMuscles.filter((m) => {
      const matchesRegion = selectedRegionFilter === 'All' || m.anatomical_region === selectedRegionFilter;
      const matchesQuery =
        !q ||
        m.muscle_name.toLowerCase().includes(q) ||
        m.latin_origin.toLowerCase().includes(q) ||
        m.anatomical_region.toLowerCase().includes(q) ||
        m.action.toLowerCase().includes(q) ||
        m.common_problems.some((p) => p.toLowerCase().includes(q));
      return matchesRegion && matchesQuery;
    });
  }, [masterMuscles, selectedRegionFilter, query]);

  const filteredRoutines = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return routines;
    return routines.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.subtitle.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.movements.some((m) => m.name.toLowerCase().includes(q))
    );
  }, [routines, query]);

  const filteredStretches = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return stretches;
    return stretches.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.primaryFocus.toLowerCase().includes(q) ||
        s.muscleGroups.some((mg) => mg.toLowerCase().includes(q))
    );
  }, [stretches, query]);

  const filteredExercises = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return masterExercises;
    return masterExercises.filter(
      (e) => e.name.toLowerCase().includes(q) || e.equipment.toLowerCase().includes(q) || e.type.toLowerCase().includes(q)
    );
  }, [masterExercises, query]);

  return (
    <div className="w-full max-w-[1200px] mx-auto px-5 md:px-16 pt-6 pb-32 flex flex-col gap-8">
      {/* Header */}
      <section className="flex flex-col gap-2">
        <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight">
          Anatomy & <span className="font-semibold text-white">Movement Library</span>
        </h2>
        <p className="text-xs md:text-sm text-gray-400 max-w-2xl leading-relaxed">
          Explore relational anatomy mappings across {masterMuscles.length} anatomical muscles and {masterExercises.length} targeted exercises.
        </p>
      </section>

      {/* Search Input */}
      <div className="relative w-full">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
          search
        </span>
        <input
          type="text"
          placeholder="Search by muscle name, area (Lower Back, Neck, Shoulders), or exercise..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-[#1A1A1C] border border-white/10 focus:border-blue-500 text-sm text-white placeholder-gray-500 rounded-2xl pl-12 pr-10 py-3.5 focus:outline-none transition-all shadow-lg"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        )}
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 border-b border-white/5 pb-3 overflow-x-auto no-scrollbar">
        {[
          { id: 'muscles', label: `Muscles (${filteredMuscles.length})`, icon: 'view_in_ar' },
          { id: 'stretches', label: `Stretches (${filteredStretches.length})`, icon: 'self_improvement' },
          { id: 'routines', label: `Routines (${filteredRoutines.length})`, icon: 'schedule' },
          { id: 'exercises', label: `Exercises (${filteredExercises.length})`, icon: 'fitness_center' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabMode)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-[#1A1A1C] text-gray-400 hover:text-white border border-white/5'
            }`}
          >
            <span className="material-symbols-outlined text-sm">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: MUSCLES */}
      {activeTab === 'muscles' && (
        <div className="flex flex-col gap-6">
          {/* Anatomical Region Diagram */}
          <MuscleRegionDiagram
            selectedRegion={selectedRegionFilter}
            onSelectRegion={(r) => setSelectedRegionFilter(r)}
          />

          {/* Region Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider shrink-0 mr-1">Region:</span>
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegionFilter(region)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all whitespace-nowrap border ${
                  selectedRegionFilter === region
                    ? 'bg-blue-600/20 text-blue-300 border-blue-500/50'
                    : 'bg-[#121214] text-gray-400 border-white/5 hover:text-white'
                }`}
              >
                {region}
              </button>
            ))}
          </div>

          {/* Muscle Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredMuscles.map((muscle) => (
              <div
                key={muscle.id}
                onClick={() => setSelectedMuscle(muscle)}
                className="bg-[#1A1A1C] p-5 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer flex flex-col justify-between gap-3 group shadow-md"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                    {muscle.anatomical_region}
                  </span>
                  <h4 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                    {muscle.muscle_name}
                  </h4>
                  <span className="text-xs italic text-gray-400 font-serif">{muscle.latin_origin}</span>
                </div>

                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{muscle.action}</p>

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="text-[10px] text-gray-500">
                    {muscle.associated_exercise_ids?.length || 0} Exercises
                  </span>
                  <span className="text-xs font-semibold text-blue-400 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                    Details <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: STRETCHES */}
      {activeTab === 'stretches' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredStretches.map((stretch) => (
            <div
              key={stretch.id}
              onClick={() => onSelectStretch(stretch.id)}
              className="bg-[#1A1A1C] p-5 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer flex flex-col justify-between gap-3 group shadow-md"
            >
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">{stretch.category}</span>
                <h4 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">{stretch.title}</h4>
                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{stretch.primaryFocus}</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <span className="text-xs font-mono text-gray-400">{stretch.durationLabel}</span>
                <span className="text-xs font-semibold text-blue-400 flex items-center gap-0.5">
                  View <span className="material-symbols-outlined text-sm">chevron_right</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: ROUTINES */}
      {activeTab === 'routines' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {filteredRoutines.map((routine) => (
            <div
              key={routine.id}
              onClick={() => onSelectRoutine(routine.id)}
              className="bg-[#1A1A1C] rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer overflow-hidden flex flex-col justify-between group shadow-lg"
            >
              <div className="relative h-40 w-full overflow-hidden bg-[#121214]">
                <img src={routine.imageUrl} alt={routine.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85" />
                <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {routine.category}
                </span>
              </div>
              <div className="p-5 flex flex-col gap-2">
                <h4 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">{routine.title}</h4>
                <p className="text-xs text-gray-400 line-clamp-2">{routine.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: EXERCISES */}
      {activeTab === 'exercises' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredExercises.map((ex) => (
            <div
              key={ex.exercise_id}
              onClick={() => setSelectedExercise(ex)}
              className="bg-[#1A1A1C] p-5 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer flex flex-col justify-between gap-3 group shadow-md"
            >
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">{ex.type}</span>
                <h4 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">{ex.name}</h4>
                <span className="text-xs text-gray-400">Equipment: {ex.equipment}</span>
              </div>

              <div className="flex items-center justify-end pt-2 border-t border-white/5">
                <span className="text-xs font-semibold text-blue-400 flex items-center gap-0.5">
                  Inspect <span className="material-symbols-outlined text-sm">chevron_right</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Muscle Detail Modal */}
      {selectedMuscle && (
        <MuscleDetailModal
          muscle={selectedMuscle}
          onClose={() => setSelectedMuscle(null)}
          onSelectExercise={(ex) => {
            setSelectedMuscle(null);
            setSelectedExercise(ex);
          }}
        />
      )}

      {/* Exercise Detail Modal */}
      {selectedExercise && (
        <ExerciseDetailModal
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
        />
      )}
    </div>
  );
};
