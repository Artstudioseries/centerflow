import React from 'react';

interface MuscleRegionDiagramProps {
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
}

export const MuscleRegionDiagram: React.FC<MuscleRegionDiagramProps> = ({
  selectedRegion,
  onSelectRegion,
}) => {
  const regions = [
    { id: 'Head and Neck', label: 'Head & Neck', color: 'from-blue-600 to-indigo-600' },
    { id: 'Chest and Shoulder', label: 'Chest & Shoulders', color: 'from-indigo-600 to-purple-600' },
    { id: 'Back and Spine', label: 'Back & Spine', color: 'from-blue-600 to-cyan-600' },
    { id: 'Arm and Forearm', label: 'Arms & Forearms', color: 'from-teal-600 to-emerald-600' },
    { id: 'Abdomen and Pelvis', label: 'Abdomen & Core', color: 'from-amber-600 to-orange-600' },
    { id: 'Hip and Thigh', label: 'Hips & Thighs', color: 'from-rose-600 to-pink-600' },
    { id: 'Leg and Foot', label: 'Lower Leg & Foot', color: 'from-purple-600 to-blue-600' },
  ];

  return (
    <div className="bg-[#1A1A1C] p-6 rounded-3xl border border-white/5 shadow-xl flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">Interactive Map</span>
          <h3 className="text-lg font-bold text-white">Anatomical Body Regions</h3>
        </div>

        {selectedRegion !== 'All' && (
          <button
            onClick={() => onSelectRegion('All')}
            className="text-xs text-blue-400 hover:text-white font-semibold flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">restart_alt</span>
            <span>Reset View</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {regions.map((reg) => {
          const isSelected = selectedRegion === reg.id;
          return (
            <button
              key={reg.id}
              onClick={() => onSelectRegion(isSelected ? 'All' : reg.id)}
              className={`p-3 rounded-2xl border text-center transition-all duration-200 flex flex-col items-center justify-center gap-1.5 ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-900/30 scale-105'
                  : 'bg-[#121214] border-white/5 text-gray-300 hover:border-white/20'
              }`}
            >
              <span className="text-xs font-bold leading-tight">{reg.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
