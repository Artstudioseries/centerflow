import { Routine } from '../types';

export const ROUTINES_DATA: Routine[] = [
  {
    id: 'desk-screen-reset',
    title: 'Desk & Screen Reset',
    subtitle: '3 movements • 5 minutes',
    movementsCount: 3,
    durationMinutes: 5,
    category: 'Desktop',
    description: 'Relieve posture strain, forward head tilt, and wrist fatigue from long computer sessions.',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    badge: 'Desktop Reset',
    movements: [
      {
        id: 'step-1',
        stretchId: 'breath-engagement',
        name: 'Breath Engagement',
        durationMinutes: 1,
        durationSeconds: 60,
        description: 'Center yourself with deep, intentional breaths to lower heart rate and clear the mind before physical movement.',
        muscleGroups: ['Diaphragm'],
        iconName: 'air'
      },
      {
        id: 'step-2',
        stretchId: 'upper-back-reach',
        name: 'Upper-Back Reach',
        durationMinutes: 2,
        durationSeconds: 120,
        description: 'Counteract the forward hunch of desk work. Open the chest and relieve tension accumulated in the thoracic spine and shoulders.',
        muscleGroups: ['Upper Back', 'Thoracic Spine'],
        iconName: 'accessibility_new'
      },
      {
        id: 'step-3',
        stretchId: 'side-neck-stretch',
        name: 'Side Neck Stretch',
        durationMinutes: 2,
        durationSeconds: 120,
        description: 'Gently release the tight muscles along the sides of the neck. Hold each side smoothly, avoiding any sharp movements, to restore mobility and comfort.',
        muscleGroups: ['Neck', 'Traps'],
        iconName: 'self_improvement'
      }
    ]
  },
  {
    id: 'shoulder-upper-body',
    title: 'Shoulder & Upper-Body',
    subtitle: '3 movements • 5 minutes',
    movementsCount: 3,
    durationMinutes: 5,
    category: 'Upper Body',
    description: 'Release tension built up from desk work or heavy lifting. This quick routine targets the deltoids, pectorals, and upper trapezius to improve posture and mobility.',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    badge: '3 MOVEMENTS • 5 MINS',
    movements: [
      {
        id: 'step-1',
        stretchId: 'chest-opener',
        name: 'Standing Chest Opener',
        durationMinutes: 1.5,
        durationSeconds: 90,
        description: 'Interlace hands behind back, press chest forward, and draw shoulder blades together.',
        muscleGroups: ['Pectorals', 'Anterior Deltoids'],
        iconName: 'accessibility'
      },
      {
        id: 'step-2',
        stretchId: 'cross-body-shoulder',
        name: 'Cross-Body Shoulder Stretch',
        durationMinutes: 2,
        durationSeconds: 120,
        description: 'Pull one arm across chest with opposite hand, keeping shoulders down.',
        muscleGroups: ['Posterior Deltoids', 'Rhomboids'],
        iconName: 'self_improvement'
      },
      {
        id: 'step-3',
        stretchId: 'overhead-triceps-reach',
        name: 'Overhead Triceps & Side Bend',
        durationMinutes: 1.5,
        durationSeconds: 90,
        description: 'Reach elbow overhead and lean gently to side to open latissimus and triceps.',
        muscleGroups: ['Triceps', 'Lats'],
        iconName: 'fitness_center'
      }
    ]
  },
  {
    id: 'lower-body-hip-relief',
    title: 'Lower Body & Hip Relief',
    subtitle: '4 movements • 8 minutes',
    movementsCount: 4,
    durationMinutes: 8,
    category: 'Lower Body',
    description: 'Target tight hip flexors, hamstrings, and lower back caused by extended sitting.',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    badge: 'Hip & Glute Focus',
    movements: [
      {
        id: 'step-1',
        stretchId: 'kneeling-hip-flexor',
        name: 'Kneeling Hip Flexor Lunge',
        durationMinutes: 2,
        durationSeconds: 120,
        description: 'Shift hips forward gently in a low lunge position to open psoas and quad.',
        muscleGroups: ['Hip Flexors', 'Psoas', 'Quadriceps'],
        iconName: 'directions_run'
      },
      {
        id: 'step-2',
        stretchId: 'figure-four-glute',
        name: 'Seated Figure-4 Glute Stretch',
        durationMinutes: 2,
        durationSeconds: 120,
        description: 'Cross ankle over opposite knee and hinge forward from hips.',
        muscleGroups: ['Glutes', 'Piriformis'],
        iconName: 'airline_seat_recline_extra'
      },
      {
        id: 'step-3',
        stretchId: 'chair-hamstring-stretch',
        name: 'Chair Hamstring Stretch',
        durationMinutes: 2,
        durationSeconds: 120,
        description: 'Extend heel forward on chair, flex foot, and tilt pelvis forward.',
        muscleGroups: ['Hamstrings'],
        iconName: 'accessibility_new'
      },
      {
        id: 'step-4',
        stretchId: 'spine-lengthening-reach',
        name: 'Seated Forward Fold',
        durationMinutes: 2,
        durationSeconds: 120,
        description: 'Relax lower back and let head hang gently toward knees.',
        muscleGroups: ['Erector Spinae', 'Lower Back'],
        iconName: 'self_improvement'
      }
    ]
  }
];
