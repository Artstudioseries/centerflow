import React, { useState } from 'react';
import { MUSCLE_ANATOMY_DATA } from '../data/muscleAnatomyData';
import { ROUTINES_DATA } from '../data/routinesData';
import { STRETCHES_DATA } from '../data/stretchesData';

export type BodyViewMode = 'anterior' | 'posterior';

export type MuscleZone =
  | 'neck'
  | 'shoulders'
  | 'chest'
  | 'upper_back'
  | 'lower_back'
  | 'core'
  | 'hips_glutes'
  | 'quads_hamstrings'
  | 'calves';

interface BodyMuscleMapProps {
  onSelectRoutine: (routineId: string) => void;
  onSelectStretch: (stretchId: string) => void;
  onStartTimer: (routineId?: string, stretchId?: string) => void;
}

const ZONE_DETAILS: Record<
  MuscleZone,
  {
    name: string;
    subName: string;
    tagFilter: string;
    view: BodyViewMode;
    commonProblem: string;
    description: string;
    matchedMuscleNames: string[];
    suggestedRoutineId: string;
  }
> = {
  neck: {
    name: 'Neck & Upper Trapezius',
    subName: 'Cervical Spine & Upper Back',
    tagFilter: 'Neck',
    view: 'posterior',
    commonProblem: 'Forward head posture, desk neck stiffness, tension headaches.',
    description: 'Carries constant tension from prolonged screen viewing and phone tilt.',
    matchedMuscleNames: ['Trapezius', 'Sternocleidomastoid'],
    suggestedRoutineId: 'desk-screen-reset',
  },
  shoulders: {
    name: 'Shoulders & Deltoids',
    subName: 'Rotator Cuff & Shoulder Girdle',
    tagFilter: 'Shoulders',
    view: 'anterior',
    commonProblem: 'Rounded shoulders, impingement, keyboard tightness.',
    description: 'Controls arm elevation and overhead reach; often tight from typing.',
    matchedMuscleNames: ['Pectoralis Major', 'Deltoid'],
    suggestedRoutineId: 'upper-body-unwind',
  },
  chest: {
    name: 'Chest & Pectorals',
    subName: 'Pectoralis Major & Minor',
    tagFilter: 'Chest',
    view: 'anterior',
    commonProblem: 'Chest tightness, restricted breathing depth, hunched upper back.',
    description: 'Shortens when sitting at computers, pulling shoulders forward into slouching.',
    matchedMuscleNames: ['Pectoralis Major', 'Pectoralis Minor'],
    suggestedRoutineId: 'upper-body-unwind',
  },
  upper_back: {
    name: 'Upper Back & Lats',
    subName: 'Rhomboids & Latissimus Dorsi',
    tagFilter: 'UpperBack',
    view: 'posterior',
    commonProblem: 'Mid-back ache, scapular weakness, thoracic stiffness.',
    description: 'Stabilizes spine and shoulder blades; key to upright elegant posture.',
    matchedMuscleNames: ['Latissimus Dorsi', 'Rhomboids'],
    suggestedRoutineId: 'desk-screen-reset',
  },
  lower_back: {
    name: 'Lower Back & Lumbar',
    subName: 'Erector Spinae & Quadratus Lumborum',
    tagFilter: 'LowerBack',
    view: 'posterior',
    commonProblem: 'Lumbar compression, sitting ache, pelvic misalignment.',
    description: 'Bears heavy compression load during long hours of uninterrupted sitting.',
    matchedMuscleNames: ['Erector Spinae', 'Quadratus Lumborum'],
    suggestedRoutineId: 'daily-reset',
  },
  core: {
    name: 'Abdominals & Core',
    subName: 'Rectus Abdominis & Obliques',
    tagFilter: 'Core',
    view: 'anterior',
    commonProblem: 'Abdominal slumping, weak spinal support.',
    description: 'Creates a natural weightlifting belt protecting the lumbar spine.',
    matchedMuscleNames: ['Rectus Abdominis', 'Obliques'],
    suggestedRoutineId: 'daily-reset',
  },
  hips_glutes: {
    name: 'Hips & Glutes',
    subName: 'Gluteus Maximus & Hip Flexors',
    tagFilter: 'Hips',
    view: 'posterior',
    commonProblem: 'Glute amnesia, tight iliopsoas, piriformis sciatica pain.',
    description: 'Connects upper and lower body; sitting tightens hips and deactivates glutes.',
    matchedMuscleNames: ['Gluteus Maximus', 'Gluteus Medius', 'Piriformis'],
    suggestedRoutineId: 'hip-mobility-unlock',
  },
  quads_hamstrings: {
    name: 'Thighs & Hamstrings',
    subName: 'Quadriceps & Biceps Femoris',
    tagFilter: 'Hamstrings',
    view: 'posterior',
    commonProblem: 'Hamstring shortening, knee stiffness, anterior pelvic tilt.',
    description: 'Main leg power generators; short hamstrings pull down on the pelvis.',
    matchedMuscleNames: ['Hamstrings', 'Quadriceps Femoris'],
    suggestedRoutineId: 'hip-mobility-unlock',
  },
  calves: {
    name: 'Calves & Achilles',
    subName: 'Gastrocnemius & Soleus',
    tagFilter: 'Calf',
    view: 'posterior',
    commonProblem: 'Achilles stiffness, ankle restriction, walking fatigue.',
    description: 'Propels walking and standing; heel elevation tightens lower leg complex.',
    matchedMuscleNames: ['Gastrocnemius', 'Soleus'],
    suggestedRoutineId: 'hip-mobility-unlock',
  },
};

export const BodyMuscleMap: React.FC<BodyMuscleMapProps> = ({
  onSelectRoutine,
  onSelectStretch,
  onStartTimer,
}) => {
  const [viewMode, setViewMode] = useState<BodyViewMode>('posterior');
  const [selectedZone, setSelectedZone] = useState<MuscleZone>('neck');

  const activeZoneInfo = ZONE_DETAILS[selectedZone];

  // Filter matching stretches
  const matchingStretches = STRETCHES_DATA.filter((s) => {
    const q = activeZoneInfo.tagFilter.toLowerCase();
    return (
      s.category.toLowerCase().includes(q) ||
      s.primaryFocus.toLowerCase().includes(q) ||
      s.muscleGroups.some((m) => m.toLowerCase().includes(q))
    );
  });

  const matchingRoutine =
    ROUTINES_DATA.find((r) => r.id === activeZoneInfo.suggestedRoutineId) || ROUTINES_DATA[0];

  const anatomyDetails = MUSCLE_ANATOMY_DATA.filter((m) =>
    activeZoneInfo.matchedMuscleNames.some((name) =>
      m.muscle_name.toLowerCase().includes(name.toLowerCase())
    )
  );

  return (
    <div className="w-full bg-[#1A1A1C] rounded-3xl p-6 border border-white/10 shadow-2xl flex flex-col gap-6">
      {/* Map Header & View Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 bg-blue-600/10 border border-blue-500/20 px-2.5 py-0.5 rounded-full">
              Interactive Anatomy Explorer
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight">
            Target Relief Muscle Map
          </h3>
          <p className="text-xs text-gray-400">
            Click any body region to inspect muscle anatomy, desk tension causes, and targeted stretches.
          </p>
        </div>

        {/* View Toggle (Front / Back) */}
        <div className="flex items-center p-1 bg-[#121214] rounded-2xl border border-white/5 text-xs font-semibold shrink-0">
          <button
            onClick={() => setViewMode('anterior')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              viewMode === 'anterior'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-sm">front_hand</span>
            <span>Anterior (Front)</span>
          </button>
          <button
            onClick={() => setViewMode('posterior')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              viewMode === 'posterior'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-sm">accessibility_new</span>
            <span>Posterior (Back)</span>
          </button>
        </div>
      </div>

      {/* Main Map & Information Split View */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Interactive Vector Body Diagram */}
        <div className="md:col-span-5 bg-[#121214] rounded-2xl p-6 border border-white/5 flex flex-col items-center justify-center relative min-h-[380px]">
          {/* SVG Silhouette Diagram */}
          <div className="relative w-48 h-80 flex items-center justify-center">
            <svg
              viewBox="0 0 200 400"
              className="w-full h-full drop-shadow-[0_0_15px_rgba(37,99,235,0.15)]"
            >
              {/* Silhouette Outline */}
              <path
                d="M 100 20 C 112 20 120 30 120 44 C 120 58 112 65 100 65 C 88 65 80 58 80 44 C 80 30 88 20 100 20 Z 
                   M 80 68 L 50 85 L 35 150 L 48 155 L 60 105 L 65 180 L 55 270 L 60 370 L 78 370 L 82 250 L 98 250 L 98 180 L 102 180 L 102 250 L 118 250 L 122 370 L 140 370 L 145 270 L 135 180 L 140 105 L 152 155 L 165 150 L 150 85 L 120 68 Z"
                fill="#1E1E22"
                stroke="#33333C"
                strokeWidth="2"
              />

              {/* Clickable Zone: Neck & Trapezius */}
              <path
                d="M 82 65 Q 100 60 118 65 L 125 82 L 75 82 Z"
                className={`cursor-pointer transition-all duration-300 ${
                  selectedZone === 'neck'
                    ? 'fill-blue-500 stroke-blue-300 animate-pulse'
                    : 'fill-blue-600/30 hover:fill-blue-500/60 stroke-blue-400/40'
                }`}
                strokeWidth="1.5"
                onClick={() => setSelectedZone('neck')}
              />

              {/* Clickable Zone: Shoulders */}
              <path
                d="M 50 85 L 75 82 L 70 108 L 45 102 Z M 150 85 L 125 82 L 130 108 L 155 102 Z"
                className={`cursor-pointer transition-all duration-300 ${
                  selectedZone === 'shoulders'
                    ? 'fill-blue-500 stroke-blue-300 animate-pulse'
                    : 'fill-blue-600/30 hover:fill-blue-500/60 stroke-blue-400/40'
                }`}
                strokeWidth="1.5"
                onClick={() => setSelectedZone('shoulders')}
              />

              {viewMode === 'anterior' ? (
                <>
                  {/* Chest */}
                  <path
                    d="M 75 82 L 125 82 L 122 120 L 78 120 Z"
                    className={`cursor-pointer transition-all duration-300 ${
                      selectedZone === 'chest'
                        ? 'fill-blue-500 stroke-blue-300 animate-pulse'
                        : 'fill-blue-600/30 hover:fill-blue-500/60 stroke-blue-400/40'
                    }`}
                    strokeWidth="1.5"
                    onClick={() => setSelectedZone('chest')}
                  />
                  {/* Core */}
                  <path
                    d="M 78 122 L 122 122 L 118 175 L 82 175 Z"
                    className={`cursor-pointer transition-all duration-300 ${
                      selectedZone === 'core'
                        ? 'fill-blue-500 stroke-blue-300 animate-pulse'
                        : 'fill-blue-600/30 hover:fill-blue-500/60 stroke-blue-400/40'
                    }`}
                    strokeWidth="1.5"
                    onClick={() => setSelectedZone('core')}
                  />
                  {/* Quads */}
                  <path
                    d="M 65 180 L 98 180 L 96 260 L 62 260 Z M 135 180 L 102 180 L 104 260 L 138 260 Z"
                    className={`cursor-pointer transition-all duration-300 ${
                      selectedZone === 'quads_hamstrings'
                        ? 'fill-blue-500 stroke-blue-300 animate-pulse'
                        : 'fill-blue-600/30 hover:fill-blue-500/60 stroke-blue-400/40'
                    }`}
                    strokeWidth="1.5"
                    onClick={() => setSelectedZone('quads_hamstrings')}
                  />
                </>
              ) : (
                <>
                  {/* Upper Back */}
                  <path
                    d="M 75 82 L 125 82 L 122 125 L 78 125 Z"
                    className={`cursor-pointer transition-all duration-300 ${
                      selectedZone === 'upper_back'
                        ? 'fill-blue-500 stroke-blue-300 animate-pulse'
                        : 'fill-blue-600/30 hover:fill-blue-500/60 stroke-blue-400/40'
                    }`}
                    strokeWidth="1.5"
                    onClick={() => setSelectedZone('upper_back')}
                  />
                  {/* Lower Back */}
                  <path
                    d="M 78 127 L 122 127 L 118 165 L 82 165 Z"
                    className={`cursor-pointer transition-all duration-300 ${
                      selectedZone === 'lower_back'
                        ? 'fill-blue-500 stroke-blue-300 animate-pulse'
                        : 'fill-blue-600/30 hover:fill-blue-500/60 stroke-blue-400/40'
                    }`}
                    strokeWidth="1.5"
                    onClick={() => setSelectedZone('lower_back')}
                  />
                  {/* Hips & Glutes */}
                  <path
                    d="M 72 168 L 128 168 L 133 210 L 67 210 Z"
                    className={`cursor-pointer transition-all duration-300 ${
                      selectedZone === 'hips_glutes'
                        ? 'fill-blue-500 stroke-blue-300 animate-pulse'
                        : 'fill-blue-600/30 hover:fill-blue-500/60 stroke-blue-400/40'
                    }`}
                    strokeWidth="1.5"
                    onClick={() => setSelectedZone('hips_glutes')}
                  />
                  {/* Hamstrings */}
                  <path
                    d="M 67 212 L 98 212 L 96 265 L 62 265 Z M 133 212 L 102 212 L 104 265 L 138 265 Z"
                    className={`cursor-pointer transition-all duration-300 ${
                      selectedZone === 'quads_hamstrings'
                        ? 'fill-blue-500 stroke-blue-300 animate-pulse'
                        : 'fill-blue-600/30 hover:fill-blue-500/60 stroke-blue-400/40'
                    }`}
                    strokeWidth="1.5"
                    onClick={() => setSelectedZone('quads_hamstrings')}
                  />
                  {/* Calves */}
                  <path
                    d="M 60 275 L 94 275 L 90 350 L 62 350 Z M 140 275 L 106 275 L 110 350 L 138 350 Z"
                    className={`cursor-pointer transition-all duration-300 ${
                      selectedZone === 'calves'
                        ? 'fill-blue-500 stroke-blue-300 animate-pulse'
                        : 'fill-blue-600/30 hover:fill-blue-500/60 stroke-blue-400/40'
                    }`}
                    strokeWidth="1.5"
                    onClick={() => setSelectedZone('calves')}
                  />
                </>
              )}
            </svg>
          </div>

          {/* Muscle Zone Quick Select Buttons */}
          <div className="flex items-center justify-center gap-1.5 flex-wrap mt-4 w-full">
            {(Object.keys(ZONE_DETAILS) as MuscleZone[]).map((zone) => (
              <button
                key={zone}
                onClick={() => setSelectedZone(zone)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border transition-all ${
                  selectedZone === zone
                    ? 'bg-blue-600 border-blue-400 text-white shadow-md'
                    : 'bg-[#18181A] border-white/5 text-gray-400 hover:text-white'
                }`}
              >
                {ZONE_DETAILS[zone].name.split('&')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Right Anatomical Details & Targeted Stretches Card */}
        <div className="md:col-span-7 flex flex-col gap-4">
          {/* Active Zone Detail Card */}
          <div className="bg-[#121214] p-5 rounded-2xl border border-blue-500/30 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">
                {activeZoneInfo.subName}
              </span>
              <span className="px-3 py-1 bg-blue-600/20 border border-blue-500/40 text-blue-300 text-xs font-bold rounded-full">
                Active Zone
              </span>
            </div>

            <h4 className="text-2xl font-bold text-white tracking-tight">{activeZoneInfo.name}</h4>
            <p className="text-xs text-gray-300 leading-relaxed">{activeZoneInfo.description}</p>

            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-2.5 text-xs text-amber-300">
              <span className="material-symbols-outlined text-base shrink-0 mt-0.5">warning</span>
              <div>
                <strong className="font-semibold block">Desk Fatigue Impact:</strong>
                <span>{activeZoneInfo.commonProblem}</span>
              </div>
            </div>

            {/* Anatomical Details from Master Library */}
            {anatomyDetails.length > 0 && (
              <div className="flex flex-col gap-2 pt-2 border-t border-white/5 text-xs">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Anatomical Data (Master Muscle Library)
                </span>
                {anatomyDetails.slice(0, 2).map((muscle) => (
                  <div key={muscle.id} className="bg-[#1A1A1C] p-2.5 rounded-xl border border-white/5 flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">{muscle.muscle_name}</span>
                      {muscle.latin_origin && (
                        <span className="text-[10px] text-blue-400 font-mono italic">
                          ({muscle.latin_origin})
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-400">{muscle.action}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Quick Start Suggested Routine Button */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                onClick={() => onSelectRoutine(matchingRoutine.id)}
                className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>View {matchingRoutine.title} Routine</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>

              <button
                onClick={() => onStartTimer(matchingRoutine.id)}
                className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5 shrink-0"
              >
                <span className="material-symbols-outlined text-sm">play_arrow</span>
                <span>Quick Start</span>
              </button>
            </div>
          </div>

          {/* Relevant Targeted Stretches List */}
          <div className="flex flex-col gap-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Targeted Stretches ({matchingStretches.length})
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {matchingStretches.slice(0, 4).map((stretch) => (
                <div
                  key={stretch.id}
                  onClick={() => onSelectStretch(stretch.id)}
                  className="bg-[#121214] p-3 rounded-xl border border-white/5 hover:border-blue-500/40 transition-all cursor-pointer flex items-center justify-between gap-2 group"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">
                      {stretch.title}
                    </span>
                    <span className="text-[10px] font-mono text-gray-400">{stretch.durationLabel}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onStartTimer(undefined, stretch.id);
                    }}
                    className="p-1.5 rounded-full bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white transition-all shrink-0"
                  >
                    <span className="material-symbols-outlined text-sm">play_arrow</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
