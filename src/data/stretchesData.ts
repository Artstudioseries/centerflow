import { Stretch } from '../types';

export const STRETCHES_DATA: Stretch[] = [
  {
    id: 'breath-engagement',
    title: 'Breath Engagement & Pelvic Centering',
    category: 'Full Body',
    level: 'Beginner',
    primaryFocus: 'Diaphragm, Ribcage & Core Stability',
    description: 'Establish deep nasal diaphragmatic breathing to calm the nervous system.',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    durationLabel: '1 Min',
    defaultDurationSeconds: 60,
    instructions: [
      'Sit or lie comfortably with shoulders relaxed.',
      'Inhale deeply through the nose for 4 seconds into the belly.',
      'Exhale slowly through slightly parted lips for 6 seconds.'
    ],
    arturoCue: 'Focus on expanding the 360-degree lower ribcage on every inhale.',
    breathingFocus: '4 sec Inhale / 6 sec Exhale',
    muscleGroups: ['Diaphragm', 'Intercostals', 'Core']
  },
  {
    id: 'upper-back-reach',
    title: 'Upper-Back Reach & Chest Opening',
    category: 'Upper Body',
    level: 'Beginner',
    primaryFocus: 'Thoracic Spine & Pectorals',
    description: 'Counteract the forward hunch of long desk hours.',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    durationLabel: '2 Mins',
    defaultDurationSeconds: 120,
    instructions: [
      'Interlace fingers in front and push palms away.',
      'Inhale to lift arms overhead, opening the chest.',
      'Exhale to lower gently.'
    ],
    arturoCue: 'Keep neck long and shoulders away from ears.',
    breathingFocus: 'Rhythmic deep breaths',
    muscleGroups: ['Thoracic Spine', 'Pectorals', 'Rhomboids']
  },
  {
    id: 'side-neck-stretch',
    title: 'Side Neck & Trapezius Release',
    category: 'Upper Body',
    level: 'Beginner',
    primaryFocus: 'Upper Trapezius & Levator Scapulae',
    description: 'Relieve neck stiffness and shoulder tightness.',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    durationLabel: '2 Mins',
    defaultDurationSeconds: 120,
    instructions: [
      'Sit tall and drop right ear gently toward right shoulder.',
      'Hold left arm down by your side for mild traction.',
      'Switch sides after 60 seconds.'
    ],
    arturoCue: 'Never pull sharply on the head; let gravity do the work.',
    breathingFocus: 'Slow, steady breathing',
    muscleGroups: ['Upper Trapezius', 'Levator Scapulae', 'Neck Flexors']
  },
  {
    id: 'chair-hamstring-stretch',
    title: 'Chair Hamstring & Posterior Release',
    category: 'Lower Body',
    level: 'Beginner',
    primaryFocus: 'Hamstrings & Calves',
    description: 'Lengthen tight hamstrings to decrease lower back pressure.',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    durationLabel: '2 Mins',
    defaultDurationSeconds: 120,
    instructions: [
      'Sit on edge of chair and extend heel forward with foot flexed.',
      'Hinge at pelvis with a neutral spine until stretch is felt behind knee.',
      'Hold 60s per leg.'
    ],
    arturoCue: 'Lead with your collarbones, not your forehead.',
    breathingFocus: 'Deep exhale on hinge',
    muscleGroups: ['Hamstrings', 'Calves']
  },
  {
    id: 'spine-lengthening-reach',
    title: 'Seated Forward Fold & Lumbar Decompression',
    category: 'Lower Body',
    level: 'Beginner',
    primaryFocus: 'Erector Spinae & Lumbar Spine',
    description: 'Decompress the lower back and release tension.',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    durationLabel: '2 Mins',
    defaultDurationSeconds: 120,
    instructions: [
      'Sit tall with feet flat on the floor.',
      'Slowly fold forward over knees letting arms hang down.',
      'Breathe deeply into the lower back.'
    ],
    arturoCue: 'Allow head and neck to hang completely heavy.',
    breathingFocus: 'Deep back-expansion breath',
    muscleGroups: ['Erector Spinae', 'Lower Back']
  }
];
