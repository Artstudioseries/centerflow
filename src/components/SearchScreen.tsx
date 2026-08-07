import React, { useState, useEffect } from 'react';
import { CategoryCard, Routine, Stretch, MuscleAnatomy, MasterExercise } from '../types';
import { MUSCLE_ANATOMY_DATA } from '../data/muscleAnatomyData';
import masterLibrary from '../data/master_muscle_library.json';
import { MuscleDetailModal } from './MuscleDetailModal';
import { ExerciseDetailModal } from './ExerciseDetailModal';
import { MuscleRegionDiagram } from './MuscleRegionDiagram';

interface SearchScreenProps {
  onSelectRoutine: (routineId: string) => void;
  onSelectStretch: (stretchId: string) => void;
  onStartTimer?: (routineId?: string, stretchId?: string) => void;
  initialQuery?: string;
  stretches: Stretch[];
  routines: Routine[];
}

type SearchTabType = 'all' | 'muscles' | 'exercises' | 'stretches' | 'routines';

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

  // 1. Direct substring match
  if (lowerText.includes(q) || lowerTags.some((t) => t.includes(q))) return true;

  // 2. Preset Quick Filter Concepts match
  const conceptKeywords = QUICK_FILTER_CONCEPTS[q];
  if (conceptKeywords) {
    return conceptKeywords.some(
      (kw) => lowerText.includes(kw) || lowerTags.some((t) => t.includes(kw))
    );
  }

  // 3. Multi-word tokenized match (e.g. "lower back relief")
  const tokens = q.split(/\s+/).filter((w) => w.length >= 3);
  if (tokens.length > 1) {
    const matchedCount = tokens.filter(
      (t) => lowerText.includes(t) || lowerTags.some((tag) => tag.includes(t))
    ).length;
    if (matchedCount >= Math.min(2, tokens.length)) return true;
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
  const [presentationMode, setPresentationMode] = useState<'grid' | 'handbook'>('grid');
  const [selectedBookChapter, setSelectedBookChapter] = useState<number>(0);
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
    if (!q) return true;
    const combinedText = [
      m.muscle_name,
      m.anatomical_region,
      m.action,
      m.nerve,
      m.origin,
      m.insertion,
      m.basic_functional_movement,
      ...m.sports_heavy_utilization,
      ...(m.common_problems || []),
    ].join(' ');
    return matchesQueryText(q, combinedText, m.tags);
  });

  // Filter Relational Exercises
  const filteredExercises = masterLibrary.exercises.filter((ex) => {
    if (!q) return true;
    const combinedText = [ex.exercise_id, ex.name, ex.type, ex.equipment].join(' ');
    return matchesQueryText(q, combinedText);
  });

  // Filter Stretches
  const filteredStretches = stretches.filter((s) => {
    if (!q) return true;
    if (q === '5 min') {
      return (
        (s.defaultDurationSeconds || 0) <= 300 ||
        s.durationLabel.includes('5') ||
        s.durationLabel.includes('30') ||
        s.durationLabel.includes('1-2') ||
        s.durationLabel.includes('3')
      );
    }
    const combinedText = [
      s.title,
      s.category,
      s.primaryFocus,
      s.description,
      s.instructions.join(' '),
      s.arturoCue || '',
    ].join(' ');
    return matchesQueryText(q, combinedText, s.muscleGroups);
  });

  // Filter Routines
  const filteredRoutines = routines.filter((r) => {
    if (!q) return true;
    if (q === '5 min') {
      return r.durationMinutes <= 5;
    }
    const combinedText = [
      r.title,
      r.category,
      r.description,
      r.badge || '',
      r.movements.map((m) => `${m.name} ${m.muscleGroups?.join(' ') || ''}`).join(' '),
    ].join(' ');
    return matchesQueryText(q, combinedText);
  });

  const totalResults =
    filteredMuscles.length +
    filteredExercises.length +
    filteredStretches.length +
    filteredRoutines.length;

  return (
    <div className="w-full max-w-[1200px] mx-auto px-5 md:px-16 pt-6 pb-32 flex flex-col gap-8">
      {/* Search Header */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight">
              Explore <span className="font-semibold text-white">Library</span>
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Search 71 Anatomical Muscles, 207 Relational Exercises, Stretches, & Routines
            </p>
          </div>

          {/* Presentation Mode Toggle Switch */}
          <div className="flex items-center bg-[#1A1A1C] border border-white/10 rounded-2xl p-1 shrink-0 self-start sm:self-auto shadow-md">
            <button
              onClick={() => setPresentationMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                presentationMode === 'grid'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-base">grid_view</span>
              Grid View
            </button>

            <button
              onClick={() => setPresentationMode('handbook')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                presentationMode === 'handbook'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-base">menu_book</span>
              Anatomical Handbook
            </button>
          </div>
        </div>

        {/* Input Bar */}
        <div className="relative group">
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

      {/* Anatomical & Neurological Pathways Section Header */}
      <section className="bg-gradient-to-r from-blue-950/40 via-[#18181D] to-amber-950/40 border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col gap-2 shadow-lg">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h3 className="text-sm font-bold text-white tracking-wide">Targeted Stretch Filter Pathways</h3>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
            2 Search Methods
          </span>
        </div>
        <p className="text-xs text-gray-300 leading-relaxed">
          Filter stretches by <strong>Anatomical Body Region</strong> (e.g., Neck, Gluteal, Shoulder) or by <strong>Neurological Nerve Roots</strong> (e.g., Sciatic, Radial, Median) for precise tension release.
        </p>
      </section>

      {/* Anatomical Region Quick Selector */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1">
            <span className="material-symbols-outlined text-sm text-blue-400">accessibility_new</span>
            1. Search by Anatomical Body Region
          </span>
          <span className="text-[11px] text-gray-500">Physical zones</span>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {ANATOMICAL_REGIONS.map((reg) => {
            const isSelected = activeTag === reg.query;
            return (
              <button
                key={reg.label}
                onClick={() => {
                  if (isSelected) {
                    setActiveTag(null);
                  } else {
                    setActiveTag(reg.query);
                    setQuery('');
                  }
                }}
                className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                    : 'bg-[#1A1A1C] text-gray-300 border-white/10 hover:border-white/20 hover:text-white'
                }`}
              >
                {reg.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Nerve Pathways Filter Bar */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-300 flex items-center gap-1">
            <span className="material-symbols-outlined text-sm text-amber-400">electric_bolt</span>
            2. Search by Nerve Roots & Pathways
          </span>
          <span className="text-[11px] text-amber-400/80">Nerve radiculopathy & impingement release</span>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {NERVE_FILTERS.map((nf) => {
            const isSelected = activeTag === nf.query;
            return (
              <button
                key={nf.label}
                onClick={() => {
                  if (isSelected) {
                    setActiveTag(null);
                  } else {
                    setActiveTag(nf.query);
                    setQuery('');
                  }
                }}
                className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-mono font-medium border transition-all ${
                  isSelected
                    ? 'bg-amber-500/30 text-amber-300 border-amber-500/50 shadow-md'
                    : 'bg-[#1A1A1C] text-amber-400/80 border-amber-500/10 hover:border-amber-500/30 hover:text-amber-300'
                }`}
              >
                {nf.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Horizontally Scrollable Hashtags */}
      <section className="flex flex-col gap-2">
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-2 pt-1 scroll-smooth">
          {HASHTAG_TAGS.map((tag) => {
            const isSelected = activeTag === tag.query;
            return (
              <button
                key={tag.label}
                onClick={() => {
                  if (isSelected) {
                    setActiveTag(null);
                  } else {
                    setActiveTag(tag.query);
                    setQuery('');
                  }
                }}
                className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-medium border transition-all active:scale-95 whitespace-nowrap shadow-sm ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-900/30'
                    : 'bg-[#1A1A1C] text-gray-300 border-white/10 hover:bg-[#242427] hover:border-white/20 hover:text-white'
                }`}
              >
                {tag.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Divider */}
      <hr className="border-t border-white/10" />

      {/* ANATOMICAL HANDBOOK (BOOK MODE) PRESENTATION */}
      {presentationMode === 'handbook' ? (
        <section className="flex flex-col gap-8 bg-gradient-to-b from-[#161619] via-[#121215] to-[#0D0D0F] border border-amber-500/20 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
          {/* Decorative Book Page Texture Accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Handbook Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="material-symbols-outlined text-amber-400 text-2xl">auto_stories</span>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400">
                  Clinical Field Manual & Biomechanical Handbook
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-tight">
                How It Works: Movement Deep-Dives
              </h3>
              <p className="text-xs text-gray-400 mt-1 max-w-2xl leading-relaxed">
                Read deep neurological, origin/insertion, and biomechanical specs for every stretch. Select any movement to start its live guided timer immediately.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-[#1A1A1D] border border-amber-500/30 rounded-2xl px-4 py-2 shrink-0">
              <span className="material-symbols-outlined text-amber-400 text-lg">menu_book</span>
              <span className="text-xs font-mono font-semibold text-amber-200">
                {filteredStretches.length} Entries In Handbook
              </span>
            </div>
          </div>

          {/* Book Entries List */}
          <div className="flex flex-col gap-8">
            {filteredStretches.map((stretch, index) => {
              const mainMuscle = stretch.muscleGroups?.[0] || stretch.primaryFocus;
              return (
                <article
                  key={stretch.id}
                  className="bg-[#1C1C20] border border-white/10 hover:border-amber-500/40 rounded-3xl p-6 md:p-8 flex flex-col lg:flex-row gap-6 lg:gap-8 transition-all shadow-xl group relative overflow-hidden"
                >
                  {/* Left Column: Visual & Direct Interactive Perform Link */}
                  <div className="lg:w-72 shrink-0 flex flex-col gap-4">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-black/40 shadow-inner group-hover:scale-[1.02] transition-transform">
                      <img
                        src={stretch.imageUrl}
                        alt={stretch.title}
                        className="w-full h-full object-cover opacity-90"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-mono text-amber-300 font-bold">
                        FOLIO #{String(index + 1).padStart(2, '0')}
                      </div>
                      <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-blue-600/80 backdrop-blur-md text-[10px] font-bold text-white">
                        {stretch.durationLabel}
                      </div>
                    </div>

                    {/* DIRECT INTERACTIVE ACTION LINK: PERFORM EXERCISE NOW */}
                    <button
                      onClick={() =>
                        onStartTimer ? onStartTimer(undefined, stretch.id) : onSelectStretch(stretch.id)
                      }
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-900/30 transition-all hover:scale-[1.02] active:scale-95 group/btn"
                    >
                      <span className="material-symbols-outlined text-lg group-hover/btn:animate-pulse">
                        play_circle
                      </span>
                      <span>PERFORM THIS EXERCISE NOW</span>
                    </button>

                    <button
                      onClick={() => onSelectStretch(stretch.id)}
                      className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                    >
                      <span className="material-symbols-outlined text-sm">visibility</span>
                      <span>Full Anatomical Spec Sheet</span>
                    </button>
                  </div>

                  {/* Right Column: Deep Information & How It Works Breakdown */}
                  <div className="flex-1 flex flex-col justify-between gap-5">
                    <div>
                      {/* Category & Tags */}
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {stretch.category}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          {stretch.primaryFocus}
                        </span>
                      </div>

                      <h4 className="text-2xl font-serif font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors">
                        {stretch.title}
                      </h4>

                      <p className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed">
                        {stretch.description}
                      </p>
                    </div>

                    {/* How It Works Biomechanical Breakdown */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-[#141416] p-4 rounded-2xl border border-white/5">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">psychology</span>
                          Biomechanical Mechanism
                        </span>
                        <p className="text-xs text-gray-300 leading-relaxed">
                          Decompresses myofascial fascial lines, reduces muscle spindle stretch reflex hyper-reactivity, and increases microvascular perfusion.
                        </p>
                      </div>

                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">vital_signs</span>
                          Neuro-Pathway Relieved
                        </span>
                        <p className="text-xs text-gray-300 leading-relaxed">
                          Relieves neural tension along peripheral nerve roots targeting <strong>{mainMuscle}</strong>.
                        </p>
                      </div>
                    </div>

                    {/* Step Instructions Field Guide */}
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        Step-By-Step Execution
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {stretch.instructions.map((step, sIdx) => (
                          <div
                            key={sIdx}
                            className="text-xs text-gray-300 bg-[#17171A] p-2.5 rounded-xl border border-white/5 flex items-start gap-2"
                          >
                            <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                              {sIdx + 1}
                            </span>
                            <span className="leading-tight">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ) : (
        <>
          {/* 1. Anatomical Muscles Section */}
      {(searchTab === 'all' || searchTab === 'muscles') && filteredMuscles.length > 0 && (
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-light text-white tracking-tight flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-400 text-xl">vital_signs</span>
              Anatomical Muscle Database
              <span className="text-gray-500 text-sm font-normal">({filteredMuscles.length})</span>
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMuscles.slice(0, searchTab === 'all' ? 6 : undefined).map((muscle) => (
              <div
                key={muscle.id}
                onClick={() => setSelectedMuscle(muscle)}
                className="bg-[#1A1A1C] rounded-2xl p-5 border border-white/10 hover:border-blue-500/50 hover:bg-[#222226] cursor-pointer transition-all shadow-lg flex flex-col justify-between gap-3 group"
              >
                <div>
                  <div className="flex items-start gap-3">
                    <MuscleRegionDiagram
                      region={muscle.anatomical_region}
                      muscleId={muscle.id}
                      size="md"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/20 truncate">
                          {muscle.anatomical_region}
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono shrink-0">{muscle.nerve}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors truncate">
                        {muscle.muscle_name}
                      </h4>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-2 mt-2 leading-relaxed">
                    {muscle.action}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-1 text-xs text-gray-400">
                  <span className="flex items-center gap-1 text-[11px]">
                    <span className="material-symbols-outlined text-sm text-emerald-400">fitness_center</span>
                    {muscle.strengthening_exercises.length + muscle.stretching_exercises.length} Exercises
                  </span>
                  <span className="text-blue-400 font-medium text-[11px] group-hover:underline flex items-center gap-0.5">
                    View Specs <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
          {searchTab === 'all' && filteredMuscles.length > 6 && (
            <button
              onClick={() => setSearchTab('muscles')}
              className="self-center mt-2 px-5 py-2 rounded-xl bg-[#202024] text-xs font-semibold text-blue-400 hover:text-white border border-white/10 hover:border-blue-500/50 transition-all"
            >
              View All {filteredMuscles.length} Muscle Entries →
            </button>
          )}
        </section>
      )}

      {/* 2. Relational Exercises Section */}
      {(searchTab === 'all' || searchTab === 'exercises') && filteredExercises.length > 0 && (
        <section className="flex flex-col gap-4">
          <h3 className="text-xl font-light text-white tracking-tight flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-400 text-xl">fitness_center</span>
            Relational Exercises Index
            <span className="text-gray-500 text-sm font-normal">({filteredExercises.length})</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {filteredExercises.slice(0, searchTab === 'all' ? 9 : undefined).map((ex) => (
              <div
                key={ex.exercise_id}
                onClick={() => setSelectedExercise(ex as unknown as MasterExercise)}
                className="bg-[#1A1A1C] rounded-xl p-4 border border-white/5 hover:border-emerald-500/40 hover:bg-[#222226] cursor-pointer transition-all flex flex-col justify-between gap-2 shadow-sm group"
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                      ex.type === 'strengthening'
                        ? 'bg-emerald-600/20 text-emerald-400 border-emerald-500/20'
                        : ex.type === 'stretching'
                        ? 'bg-blue-600/20 text-blue-400 border-blue-500/20'
                        : 'bg-purple-600/20 text-purple-400 border-purple-500/20'
                    }`}
                  >
                    {ex.type.toUpperCase()}
                  </span>
                  <span className="text-[10px] text-gray-500 truncate">{ex.equipment}</span>
                </div>
                <h5 className="text-xs font-semibold text-gray-200 group-hover:text-emerald-400 transition-colors">
                  {ex.name}
                </h5>
              </div>
            ))}
          </div>
          {searchTab === 'all' && filteredExercises.length > 9 && (
            <button
              onClick={() => setSearchTab('exercises')}
              className="self-center mt-2 px-5 py-2 rounded-xl bg-[#202024] text-xs font-semibold text-emerald-400 hover:text-white border border-white/10 hover:border-emerald-500/50 transition-all"
            >
              View All {filteredExercises.length} Exercises →
            </button>
          )}
        </section>
      )}

      {/* 3. Individual Stretches List */}
      {(searchTab === 'all' || searchTab === 'stretches') && filteredStretches.length > 0 && (
        <section className="flex flex-col gap-4">
          <h3 className="text-xl font-light text-white tracking-tight flex items-center gap-2">
            <span className="material-symbols-outlined text-purple-400 text-xl">self_improvement</span>
            Guided Stretches
            <span className="text-gray-500 text-sm font-normal">({filteredStretches.length})</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredStretches.map((stretch) => (
              <div
                key={stretch.id}
                onClick={() => onSelectStretch(stretch.id)}
                className="bg-[#1A1A1C] rounded-2xl p-4 flex gap-4 items-center border border-white/5 hover:border-blue-500/50 hover:bg-[#222224] cursor-pointer transition-all shadow-md group"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 relative bg-[#121214]">
                  <img
                    src={stretch.imageUrl}
                    alt={stretch.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform opacity-90"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/20">
                      {stretch.category}
                    </span>
                    <span className="text-[10px] text-gray-500">{stretch.durationLabel}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-gray-200 truncate group-hover:text-blue-400 transition-colors">
                    {stretch.title}
                  </h4>
                  <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{stretch.primaryFocus}</p>
                </div>
                <span className="material-symbols-outlined text-gray-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all text-xl">
                  chevron_right
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. Matching Routines */}
      {(searchTab === 'all' || searchTab === 'routines') && filteredRoutines.length > 0 && (
        <section className="flex flex-col gap-4">
          <h3 className="text-xl font-light text-white tracking-tight flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-400 text-xl">format_list_bulleted</span>
            Flow Routines
            <span className="text-gray-500 text-sm font-normal">({filteredRoutines.length})</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRoutines.map((routine) => (
              <div
                key={routine.id}
                onClick={() => onSelectRoutine(routine.id)}
                className="bg-[#1A1A1C] rounded-2xl p-5 flex gap-4 items-center border border-white/5 hover:border-blue-500/50 cursor-pointer transition-all shadow-md group"
              >
                <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-[#121214]">
                  <img
                    src={routine.imageUrl}
                    alt={routine.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform opacity-90"
                  />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-semibold text-blue-400 uppercase tracking-wider">
                    {routine.movementsCount} MOVEMENTS • {routine.durationMinutes} MIN
                  </span>
                  <h4 className="text-base font-semibold text-gray-200 mt-0.5 group-hover:text-blue-400 transition-colors">
                    {routine.title}
                  </h4>
                  <p className="text-xs text-gray-400 line-clamp-2 mt-1">{routine.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Popular Categories (Moved to bottom of Library results) */}
      {!q && searchTab === 'all' && (
        <section className="flex flex-col gap-4 pt-4 border-t border-white/5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white tracking-tight flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-400 text-lg">category</span>
              Explore Popular Categories
            </h3>
            <span className="text-xs text-gray-400 font-medium">Quick Jump</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                onClick={() => {
                  setActiveTag(cat.searchTag || cat.title);
                  setQuery('');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group relative rounded-2xl overflow-hidden aspect-[16/9] sm:aspect-[4/3] bg-[#1A1A1C] cursor-pointer shadow-xl border border-white/5 hover:border-blue-500/50 transition-all flex flex-col justify-end p-4"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-75"
                  style={{ backgroundImage: `url('${cat.imageUrl}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F10] via-black/30 to-transparent" />
                <div className="relative z-10 flex items-center gap-2">
                  <span
                    className="material-symbols-outlined text-blue-400 text-xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {cat.icon}
                  </span>
                  <h4 className="text-base font-semibold text-white tracking-tight">{cat.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {totalResults === 0 && (
        <div className="py-16 text-center flex flex-col items-center gap-3">
          <span className="material-symbols-outlined text-5xl text-gray-600">search_off</span>
          <h4 className="text-lg font-semibold text-gray-300">No results found for "{filterQuery}"</h4>
          <p className="text-xs text-gray-500 max-w-sm">
            Try searching for muscle names like "Deltoid" or "Biceps", nerve roots like "Axillary", or sports like "Baseball".
          </p>
          <button
            onClick={() => {
              setQuery('');
              setActiveTag(null);
            }}
            className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-md transition-all"
          >
            Clear Filters
          </button>
        </div>
      )}
        </>
      )}

      {/* Muscle Detail Modal */}
      <MuscleDetailModal
        muscle={selectedMuscle}
        onClose={() => setSelectedMuscle(null)}
        onFilterByTag={(tag) => {
          setActiveTag(tag);
          setQuery('');
        }}
      />

      {/* Exercise Detail Modal */}
      <ExerciseDetailModal
        exercise={selectedExercise}
        onClose={() => setSelectedExercise(null)}
        onSelectMuscle={(muscleId) => {
          const found = MUSCLE_ANATOMY_DATA.find((m) => m.id === muscleId);
          if (found) {
            setSelectedMuscle(found);
          }
        }}
      />
    </div>
  );
};
