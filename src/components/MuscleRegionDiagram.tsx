import React from 'react';

interface MuscleRegionDiagramProps {
  region: string;
  muscleId?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const MuscleRegionDiagram: React.FC<MuscleRegionDiagramProps> = ({
  region,
  muscleId = '',
  className = '',
  size = 'md',
}) => {
  const r = region.toLowerCase();
  const id = muscleId.toLowerCase();

  // Helper size dimensions
  const dims = size === 'sm' ? 'w-10 h-10' : size === 'lg' ? 'w-24 h-24' : 'w-14 h-14';

  // Determine anatomical zone type
  let zone: 'shoulder' | 'arm' | 'forearm' | 'hand' | 'neck' | 'spine' | 'thorax' | 'core' | 'glute' | 'thigh' | 'leg' | 'foot' = 'shoulder';

  if (r.includes('foot') || r.includes('sole') || id.includes('foot')) zone = 'foot';
  else if (r.includes('leg') || r.includes('calf') || id.includes('leg')) zone = 'leg';
  else if (r.includes('thigh') || r.includes('hamstring') || r.includes('quadriceps') || id.includes('thigh')) zone = 'thigh';
  else if (r.includes('glute') || r.includes('hip') || id.includes('glute')) zone = 'glute';
  else if (r.includes('hand') || r.includes('thenar') || id.includes('hand')) zone = 'hand';
  else if (r.includes('forearm') || id.includes('forearm')) zone = 'forearm';
  else if (r.includes('arm') || id.includes('arm_biceps') || id.includes('arm_triceps')) zone = 'arm';
  else if (r.includes('neck') || id.includes('triangle')) zone = 'neck';
  else if (r.includes('postvertebral') || r.includes('spine') || id.includes('erector')) zone = 'spine';
  else if (r.includes('abdominal') || r.includes('core') || id.includes('abdom')) zone = 'core';
  else if (r.includes('thorax') || r.includes('chest')) zone = 'thorax';

  return (
    <div
      className={`relative rounded-xl bg-[#121215] border border-white/10 flex items-center justify-center overflow-hidden shrink-0 ${dims} ${className}`}
      title={`${region} anatomy diagram`}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full p-1"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Base Human Body Outline Context */}
        <g opacity="0.25" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Head & Neck */}
          <circle cx="50" cy="18" r="8" />
          <path d="M46 26v4M54 26v4" />
          {/* Shoulders & Torso */}
          <path d="M30 34c4-4 12-4 20-4s16 0 20 4l4 18-6 2v-8h-8v30h-20v-30h-8v8l-6-2 4-18z" />
          {/* Pelvis & Legs */}
          <path d="M40 76l-3 18M60 76l3 18" />
        </g>

        {/* Region Specific Highlight Overlay */}
        {zone === 'shoulder' && (
          <g>
            <path
              d="M28 32c3-4 8-4 11-4M61 28c3 0 8 0 11 4l4 14-6 2-4-10"
              stroke="#3B82F6"
              strokeWidth="5"
              strokeLinecap="round"
              className="animate-pulse"
            />
            <circle cx="32" cy="32" r="6" fill="#60A5FA" opacity="0.8" />
            <circle cx="68" cy="32" r="6" fill="#60A5FA" opacity="0.8" />
          </g>
        )}

        {zone === 'arm' && (
          <g>
            {/* Upper arm highlights */}
            <path d="M26 36l-4 14M74 36l4 14" stroke="#3B82F6" strokeWidth="6" strokeLinecap="round" />
            <circle cx="24" cy="42" r="4" fill="#60A5FA" />
            <circle cx="76" cy="42" r="4" fill="#60A5FA" />
          </g>
        )}

        {zone === 'forearm' && (
          <g>
            {/* Forearm highlights */}
            <path d="M20 52l-5 14M80 52l5 14" stroke="#3B82F6" strokeWidth="5" strokeLinecap="round" />
            <circle cx="17" cy="58" r="4" fill="#60A5FA" />
            <circle cx="83" cy="58" r="4" fill="#60A5FA" />
          </g>
        )}

        {zone === 'hand' && (
          <g>
            {/* Hand highlights */}
            <circle cx="13" cy="72" r="7" fill="#3B82F6" opacity="0.4" />
            <circle cx="87" cy="72" r="7" fill="#3B82F6" opacity="0.4" />
            <path d="M10 72l3-8 3 8M84 72l3-8 3 8" stroke="#60A5FA" strokeWidth="3" strokeLinecap="round" />
          </g>
        )}

        {zone === 'neck' && (
          <g>
            {/* Cervical & Neck Highlight */}
            <rect x="44" y="24" width="12" height="10" rx="4" fill="#3B82F6" opacity="0.6" />
            <path d="M46 25l8 8M54 25l-8 8" stroke="#60A5FA" strokeWidth="2" />
          </g>
        )}

        {zone === 'spine' && (
          <g>
            {/* Spine Column Highlight */}
            <path d="M50 30v38" stroke="#3B82F6" strokeWidth="6" strokeLinecap="round" />
            <circle cx="50" cy="35" r="3" fill="#93C5FD" />
            <circle cx="50" cy="45" r="3" fill="#93C5FD" />
            <circle cx="50" cy="55" r="3" fill="#93C5FD" />
            <circle cx="50" cy="65" r="3" fill="#93C5FD" />
          </g>
        )}

        {zone === 'thorax' && (
          <g>
            {/* Chest & Ribcage Highlight */}
            <rect x="36" y="32" width="28" height="18" rx="6" fill="#3B82F6" opacity="0.4" stroke="#60A5FA" strokeWidth="2" />
          </g>
        )}

        {zone === 'core' && (
          <g>
            {/* Abdominal Wall Highlight */}
            <rect x="38" y="48" width="24" height="20" rx="5" fill="#3B82F6" opacity="0.5" stroke="#60A5FA" strokeWidth="2" />
            <line x1="50" y1="48" x2="50" y2="68" stroke="#60A5FA" strokeWidth="2" />
          </g>
        )}

        {zone === 'glute' && (
          <g>
            {/* Pelvis & Glute Highlight */}
            <circle cx="42" cy="70" r="8" fill="#3B82F6" opacity="0.7" />
            <circle cx="58" cy="70" r="8" fill="#3B82F6" opacity="0.7" />
          </g>
        )}

        {zone === 'thigh' && (
          <g>
            {/* Thigh Highlight */}
            <rect x="36" y="74" width="9" height="18" rx="4" fill="#3B82F6" />
            <rect x="55" y="74" width="9" height="18" rx="4" fill="#3B82F6" />
          </g>
        )}

        {zone === 'leg' && (
          <g>
            {/* Calf & Lower Leg Highlight */}
            <path d="M38 82l-2 14M62 82l2 14" stroke="#3B82F6" strokeWidth="6" strokeLinecap="round" />
            <circle cx="37" cy="88" r="4" fill="#60A5FA" />
            <circle cx="63" cy="88" r="4" fill="#60A5FA" />
          </g>
        )}

        {zone === 'foot' && (
          <g>
            {/* Foot & Ankle Highlight */}
            <ellipse cx="36" cy="95" rx="7" ry="4" fill="#3B82F6" />
            <ellipse cx="64" cy="95" rx="7" ry="4" fill="#3B82F6" />
          </g>
        )}
      </svg>
    </div>
  );
};
