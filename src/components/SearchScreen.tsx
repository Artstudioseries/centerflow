import React, { useState, useEffect } from 'react';
import { CategoryCard, Routine, Stretch, MuscleAnatomy, MasterExercise } from '../types';
import { MUSCLE_ANATOMY_DATA } from '../data/muscleAnatomyData';
import masterLibrary from '../data/master_muscle_library.json';
import { MuscleDetailModal } from './MuscleDetailModal';
import { ExerciseDetailModal } from './ExerciseDetailModal';
import { MuscleRegionDiagram } from './MuscleRegionDiagram';
import { BodyMuscleMap } from './BodyMuscleMap';

interface SearchScreenProps {
  onSelectRoutine: (routineId: string) => void;
  onSelectStretch: (stretchId: string) => void;
  onStartTimer?: (routineId?: string, stretchId?: string) => void;
  initialQuery?: string;
  stretches: Stretch[];
  routines: Routine[];
}

type SearchTabType = 'all' | 'anatomy_map' | 'muscles' | 'exercises' | 'stretches' | 'routines';

const CATEGORIES: CategoryCard[] = [
  {
    id: 'cat-1',
    title: 'Morning Routine',
    icon: 'wb_sunny',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9PZxtvb0q4nvXGFP0x7I0F8WIm6SyhDfvk0sWeAG-4vTABdAyad8MUqLpucs8fN83CziWu_LBlHo_z-_5h1sbv8uyWRLBr8Z8qh0ao4sKed1uPkeeLsFKxuDs1UdxX0WLW9CbdgOEMH4c6HvZx3SSyBPeTPOPg7aIZZQhvQEeNy3Gz6TC8Yga93IqK9A8YJjNHTAjkMc_sK4Md1Szqi6divVkip9qUgKx2l6axC4dQk66Lrt2xGGt',
    searchTag: 'Morning',
  },
  {
    id: 'cat-2',
    title: 'Post-Workout',
    icon: 'fitness_center',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBT4qRrdDDddF3JxcCtKgxSs_GKvy6bpgrzIUXoN7A46zt_CUutt1sIvB9tDilOH_WblJ0CMtAN4849_q5BFcBx6rWtgP3MDWq_K-QkTgewBj_mv0yDW4oDbTjITXmYg8coV0OHxQqtKsrtVZ1v8FEjYqLVrvSYHPHXxoFRTlM6KfjsdyKiCM7VEHGIZsVXZklakKHJu5rJVcGaWI9yZnhWpI_0qLNZIDYqsfLtlyAwsGYygaMMVcGC',
    searchTag: 'Workout',
  },
  {
    id: 'cat-3',
    title: 'Better Sleep',
    icon: 'bedtime',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrR7OmYzZQxMgmBVOvtoCv80aXeDvdg3PRkM6zqpDPYQRdMTKLvfKdOPfA_7QaZdLK3UY70o8wtfVLNENX4Du0k_HEy3DvjPilSPXp7upwtUA6R-7ZVqHEQhg2O-P5qlLcjTikZ-89bP_EMMQkV-R0zvCL4iTii2TTSEuAHlULSeUuFsdJM9oOL-xelN3u46xMWarcSrW5B3R82epywMN_AGCqOn6PMuXNBdBb-p5TCL4ypNlD88Xm',
    searchTag: 'Sleep',
  },
  {
    id: 'cat-4',
    title: 'Travel Recovery',
    icon: 'flight',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCv2Gzt4jNXQ9EUr5-gq1k6W_JzJsCEZokVPDjwN2SUtOB9NotG_VDTHhE-x8OzvloOqeMaPW8WtO9imRYBT8k_T7c6xM39FZEZ41Qf0sjMShA2nJbHibWJfFAYlEetZMu8Sbp-QrgPHAQLO3BDtojdPy7N0a4rdE0jKLceq4IUZr5bvyGfFpA0gKmMgkcI87n-Oj08CFtZ-fS1ftIz5J-Bu9E_IUbZ-yvIa5FjC5fxW-8ypp3q3PPM',
    searchTag: 'Travel',
  },
];

const ANATOMICAL_REGIONS = [
  { label: 'Shoulder & Arm', query: 'Shoulder' },
  { label: 'Forearm & Hand', query: 'Forearm' },
  { label: 'Neck & Spine', query: 'Neck' },
  { label: 'Thorax & Chest', query: 'Thorax' },
  { label: 'Core & Abdomen', query: 'Abdomen' },
  { label: 'Gluteal & Hip', query: 'Gluteal' },
  { label: 'Leg & Calf', query: 'Leg' },
  { label: 'Ankle & Foot', query: 'Foot' },
];

const NERVE_FILTERS = [
  { label: '⚡ Axillary (C5-C6)', query: 'Axillary' },
  { label: '⚡ Radial (C5-T1)', query: 'Radial' },
  { label: '⚡ Median (C6-T1)', query: 'Median' },
  { label: '⚡ Sciatic (L4-S3)', query: 'Sciatic' },
  { label: '⚡ Suprascapular (C5-C6)', query: 'Suprascapular' },
  { label: '⚡ Femoral (L2-L4)', query: 'Femoral' },
];

const HASHTAG_TAGS = [
  { label: '#RotatorCuff', query: 'Rotator Cuff' },
  { label: '#Deltoid', query: 'Deltoid' },
  { label: '#LowerBack', query: 'Lower Back' },
  { label: '#Neck', query: 'Neck' },
  { label: '#Biceps', query: 'Biceps' },
  { label: '#Gastrocnemius', query: 'Gastrocnemius' },
  { label: '#Baseball', query: 'Baseball' },
  { label: '#Golf', query: 'Golf' },
  { label: '#Tennis', query: 'Tennis' },
  { label: '#RockClimbing', query: 'Rock climbing' },
  { label: '#5MinOrLess', query: '5 MIN' },
];

const QUICK_FILTER_CONCEPTS: Record<string, string[]> = {
  'lower back relief': ['lower back', 'lumbar', 'spine', 'erector', 'quadratus', 'psoas', 'glute', 'back', 'multifidus', 'hip flexor'],
  'sitting all day': ['desk', 'sitting', 'chair', 'hip flexor', 'hamstring', 'posture', 'lower back', 'glute', 'sedentary', 'psoas', 'spine'],
  'ankle mobility': ['ankle', 'calf', 'calves', 'gastrocnemius', 'soleus', 'tibialis', 'foot', 'achilles', 'dorsiflexion', 'leg'],
  'upper body tension': ['upper body', 'shoulder', 'neck', 'trapezius', 'rhomboid', 'chest', 'desk worker', 'thoracic', 'scapula', 'back'],
  'rotator cuff': ['rotator cuff', 'supraspinatus', 'infraspinatus', 'subscapularis', 'teres minor', 'shoulder', 'scapula'],
  'deltoid': ['deltoid', 'deltoideus', 'shoulder', 'arm'],
};

function matchesQueryText(q: string, searchableText: string, tags: string[] = []): boolean {
  if (!q) return true;
  const lowerText = searchableText.toLowerCase();
  const lowerTags = tags.map((t) => t.toLowerCase());

  if (lowerText.includes(q) || lowerTags.some((t) => t.includes(q))) return true;

  const conceptKeywords = QUICK_FILTER_CONCEPTS[q];
  if (conceptKeywords) {
    return conceptKeywords.some(
      (kw) => lowerText.includes(kw) || lowerTags.some((t) => t.includes(kw))
    );
  }

  const tokens = q.split(/\s+/).filter((w) => w.length >= 3);
  if (tokens.length > 1) {
    const matchedCount = tokens.filter(
      (t) => lowerText.includes(t) || lowerTags.some((tag) => tag.includes(t))
    ).length;
    return matchedCount >= Math.ceil(tokens.length * 0.6);
  }

  return false;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({
  onSelectRoutine,
  onSelectStretch,
  onStartTimer,
  initialQuery = '',
  stretches,
  routines,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [searchTab, setSearchTab] = useState<SearchTabType>('all');
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleAnatomy | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<MasterExercise | null>(null);

  useEffect(() => {
    setQuery(initialQuery);
    setActiveTag(null);
  }, [initialQuery]);

  const filterQuery = activeTag || query;
  const q = filterQuery.toLowerCase().trim();

  // Filter Muscles
  const filteredMuscles = MUSCLE_ANATOMY_DATA.filter((m) => {
    const searchBody = `${m.muscle_name} ${m.anatomical_region} ${m.latin_origin} ${m.nerve} ${m.action} ${m.basic_functional_movement} ${m.injury_risks} ${m.common_problems.join(' ')} ${m.sports_heavy_utilization.join(' ')}`;
    return matchesQueryText(q, searchBody, m.tags);
  });

  // Filter Master Exercises
  const masterExercisesList = (masterLibrary as any).exercises as MasterExercise[];
  const filteredExercises = masterExercisesList.filter((e) => {
    const searchBody = `${e.name} ${e.type} ${e.equipment}`;
    return matchesQueryText(q, searchBody, [e.type, e.equipment]);
  });

  // Filter Stretches
  const filteredStretches = stretches.filter((s) => {
    const searchBody = `${s.title} ${s.category} ${s.primaryFocus} ${s.description} ${s.muscleGroups.join(' ')}`;
    return matchesQueryText(q, searchBody, s.tags || []);
  });

  // Filter Routines
  const filteredRoutines = routines.filter((r) => {
    const searchBody = `${r.title} ${r.subtitle} ${r.category} ${r.description}`;
    return matchesQueryText(q, searchBody, r.tags || []);
  });

  const totalResults =
    filteredMuscles.length +
    filteredExercises.length +
    filteredStretches.length +
    filteredRoutines.length;

  const handleSelectTag = (tagQuery: string) => {
    if (activeTag === tagQuery) {
      setActiveTag(null);
    } else {
      setActiveTag(tagQuery);
      setQuery('');
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-5 md:px-16 pt-6 pb-32 flex flex-col gap-8">
      {/* Search Header */}
      <section className="flex flex-col gap-4">
        <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight">
          Movement <span className="font-semibold text-white">Search</span>
        </h2>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-gray-500 text-xl">search</span>
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (activeTag) setActiveTag(null);
            }}
            placeholder="Search muscles, nerves (e.g. Axillary, C5), sports, or movements..."
            className="w-full pl-11 pr-12 py-3.5 bg-[#1A1A1C] border border-white/10 rounded-2xl text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500/50 transition-all shadow-lg"
          />
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            {query || activeTag ? (
              <button
                onClick={() => {
                  setQuery('');
                  setActiveTag(null);
                }}
                className="p-1 text-gray-400 hover:text-white"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            ) : (
              <button className="p-1 text-gray-500 hover:text-blue-400">
                <span className="material-symbols-outlined text-xl">mic</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {[
          { id: 'all', label: `All (${totalResults})` },
          { id: 'anatomy_map', label: 'Interactive Anatomy Map' },
          { id: 'muscles', label: `Muscles (${filteredMuscles.length})` },
          { id: 'exercises', label: `Exercises (${filteredExercises.length})` },
          { id: 'stretches', label: `Stretches (${filteredStretches.length})` },
          { id: 'routines', label: `Routines (${filteredRoutines.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSearchTab(tab.id as SearchTabType)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
              searchTab === tab.id
                ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-900/30'
                : 'bg-[#1A1A1C] text-gray-400 border-white/5 hover:text-white hover:border-white/20'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </section>

      {/* Anatomy Map Tab View */}
      {searchTab === 'anatomy_map' && (
        <section className="animate-fadeIn">
          <BodyMuscleMap
            onSelectRoutine={onSelectRoutine}
            onSelectStretch={onSelectStretch}
            onStartTimer={onStartTimer || (() => {})}
          />
        </section>
      )}

      {/* Anatomical Region Quick Selector */}
      <section className="flex flex-col gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1">
          <span className="material-symbols-outlined text-sm text-blue-400">explore</span>
          Filter by Anatomical Region
        </span>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {ANATOMICAL_REGIONS.map((region) => {
            const isSelected = activeTag === region.query;
            return (
              <button
                key={region.query}
                onClick={() => handleSelectTag(region.query)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                    : 'bg-[#1A1A1C] text-gray-300 border-white/5 hover:border-blue-500/30'
                }`}
              >
                {region.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Search Results */}
      {searchTab !== 'anatomy_map' && (
        <div className="flex flex-col gap-10">
          {/* Section 1: Muscles */}
          {(searchTab === 'all' || searchTab === 'muscles') && filteredMuscles.length > 0 && (
            <section className="flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <h3 className="text-xl font-semibold text-white tracking-tight flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-400">fitness_center</span>
                  <span>Anatomical Muscles</span>
                </h3>
                <span className="text-xs font-mono text-gray-400">{filteredMuscles.length} Found</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredMuscles.map((muscle) => (
                  <div
                    key={muscle.id}
                    onClick={() => setSelectedMuscle(muscle)}
                    className="bg-[#1A1A1C] rounded-2xl p-5 border border-white/5 hover:border-blue-500/40 transition-all cursor-pointer flex flex-col justify-between gap-3 group shadow-md"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                          {muscle.anatomical_region.split('-')[0]}
                        </span>
                        {muscle.latin_origin && (
                          <span className="text-[10px] text-gray-500 italic font-mono">
                            {muscle.latin_origin}
                          </span>
                        )}
                      </div>
                      <h4 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                        {muscle.muscle_name}
                      </h4>
                      <p className="text-xs text-gray-400 line-clamp-2 mt-1 leading-relaxed">
                        {muscle.action}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/5 text-[11px] text-gray-400">
                      <span className="flex items-center gap-1 text-amber-400/90 font-medium">
                        <span className="material-symbols-outlined text-sm">warning</span>
                        {muscle.common_problems[0] || 'Tightness'}
                      </span>
                      <span className="text-blue-400 font-semibold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                        <span>Details</span>
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section 2: Stretches */}
          {(searchTab === 'all' || searchTab === 'stretches') && filteredStretches.length > 0 && (
            <section className="flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <h3 className="text-xl font-semibold text-white tracking-tight flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-400">self_improvement</span>
                  <span>Targeted Stretches</span>
                </h3>
                <span className="text-xs font-mono text-gray-400">{filteredStretches.length} Found</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredStretches.map((stretch) => (
                  <div
                    key={stretch.id}
                    onClick={() => onSelectStretch(stretch.id)}
                    className="bg-[#1A1A1C] rounded-2xl p-4 border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer flex flex-col justify-between gap-3 group shadow-md"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-semibold text-blue-400 uppercase tracking-wider">
                        {stretch.category}
                      </span>
                      <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                        {stretch.title}
                      </h4>
                      <p className="text-[11px] text-gray-400 line-clamp-2 leading-snug">
                        {stretch.primaryFocus}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <span className="text-[10px] font-mono text-gray-400">{stretch.durationLabel}</span>
                      <span className="text-xs text-blue-400 font-semibold flex items-center gap-0.5">
                        <span>Start</span>
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section 3: Routines */}
          {(searchTab === 'all' || searchTab === 'routines') && filteredRoutines.length > 0 && (
            <section className="flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <h3 className="text-xl font-semibold text-white tracking-tight flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-400">schedule</span>
                  <span>Full Movement Routines</span>
                </h3>
                <span className="text-xs font-mono text-gray-400">{filteredRoutines.length} Found</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredRoutines.map((routine) => (
                  <div
                    key={routine.id}
                    onClick={() => onSelectRoutine(routine.id)}
                    className="bg-[#1A1A1C] rounded-2xl p-5 border border-white/5 hover:border-blue-500/40 transition-all cursor-pointer flex flex-col justify-between gap-3 group shadow-md"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                        {routine.category}
                      </span>
                      <h4 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                        {routine.title}
                      </h4>
                      <p className="text-xs text-gray-400 line-clamp-2">{routine.subtitle}</p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <span className="text-xs font-mono text-gray-400">{routine.durationMinutes} Mins</span>
                      <span className="text-xs text-blue-400 font-semibold flex items-center gap-0.5">
                        <span>View Sequence</span>
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* Modals for Muscle & Exercise inspection */}
      {selectedMuscle && (
        <MuscleDetailModal
          muscle={selectedMuscle}
          onClose={() => setSelectedMuscle(null)}
          onSelectExercise={(exName) => {
            const match = masterExercisesList.find((e) => e.name.toLowerCase() === exName.toLowerCase());
            if (match) setSelectedExercise(match);
          }}
        />
      )}

      {selectedExercise && (
        <ExerciseDetailModal
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
        />
      )}
    </div>
  );
};
