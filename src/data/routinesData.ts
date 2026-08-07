import { Routine } from '../types';
import regeneratedImage from '../assets/images/regenerated_image_1785877290991.jpg';

export const ROUTINES_DATA: Routine[] = [
  {
    id: 'desk-screen-reset',
    title: 'Desk & Screen Reset',
    subtitle: '3 movements • 5 minutes',
    movementsCount: 3,
    durationMinutes: 5,
    category: 'Desktop',
    description: 'Relieve posture strain, forward head tilt, and wrist fatigue from long computer sessions.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABg4kTs9g9RXHwEGFY10K0Zhv5BFkcWRAXpVZy1ipQrURh_vNzx6TWo2jcQzdTarJzHUT-sDaubgK1RhcCC-hjcBN8rGuA2WZjVL2MBKN-_ewIsgw6yS5dqsMCA3cFPzVDwdbyYHQ6RI8VMQBS8UBvZZq4erjDauTbnPWt1VDUV4Kws_B7ALtHMJj_UlI-w8xlgcOqTtLUabdjcnEu70fnl0_3FH-gmVW2fj12yhk2qMD4SF2cbH0e',
    badge: 'Desktop Reset',
    tierRequired: 'friend',
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
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkdxzzsaP7sJZXVaIu3rZvoLFxtQ1-yfQupcknyHHqI-4a51z_XXNX69dLV3a5r6Xoc4HvbLKil30tGqbWcv_PQgtOpucthMpHVcDcV6xxdW_sjbax4J_7haUd1mn7nJ90PL_zfsghtlAw4__cpvVxZXvc8NJVXnIlH7nJxMXJc2JhcnEEpraAo-3V6doxOmdkqCHRyjci22Om8rWkzXWdruFPBeF4Y2zHoE5LL44Sob63739h-ilC',
    badge: '3 MOVEMENTS • 5 MINS',
    tierRequired: 'supporter',
    movements: [
      {
        id: 'step-1',
        stretchId: 'doorway-chest-stretch',
        name: 'Doorway Chest Stretch',
        durationMinutes: 1.5,
        durationSeconds: 90,
        description: 'Open up tight pectoral muscles by gently leaning through a doorframe. Keep elbows at 90 degrees.',
        muscleGroups: ['Pectorals'],
        iconName: 'meeting_room'
      },
      {
        id: 'step-2',
        stretchId: 'cross-body-shoulder',
        name: 'Cross-Body Shoulder',
        durationMinutes: 1.5,
        durationSeconds: 90,
        description: 'Pull one arm gently across your chest to release the rear deltoids and rhomboids.',
        muscleGroups: ['Deltoids', 'Rhomboids'],
        iconName: 'accessibility_new'
      },
      {
        id: 'step-3',
        stretchId: 'upper-back-reach',
        name: 'Upper-Back Reach',
        durationMinutes: 2,
        durationSeconds: 120,
        description: 'Interlace fingers and push away from your chest, rounding your upper back to stretch the trapezius.',
        muscleGroups: ['Trapezius', 'Upper Back'],
        iconName: 'self_improvement'
      }
    ]
  },
  {
    id: 'lower-back-hip-relief',
    title: 'Lower Back & Hip Relief',
    subtitle: '3 movements • 6 minutes',
    movementsCount: 3,
    durationMinutes: 6,
    category: 'Lower Body',
    description: 'Targeted release for hips and lower back with breathing, hip flexor stretch, and single leg integration.',
    imageUrl: regeneratedImage,
    badge: '6 MINUTES',
    movements: [
      {
        id: 'ub_01',
        stretchId: 'ub_01',
        name: 'Diaphragmatic Breathing',
        durationMinutes: 1,
        durationSeconds: 60,
        description: 'Focus on expanding your ribs on every inhale.',
        muscleGroups: ['Diaphragm', 'Chest'],
        iconName: 'air',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABg4kTs9g9RXHwEGFY10K0Zhv5BFkcWRAXpVZy1ipQrURh_vNzx6TWo2jcQzdTarJzHUT-sDaubgK1RhcCC-hjcBN8rGuA2WZjVL2MBKN-_ewIsgw6yS5dqsMCA3cFPzVDwdbyYHQ6RI8VMQBS8UBvZZq4erjDauTbnPWt1VDUV4Kws_B7ALtHMJj_UlI-w8xlgcOqTtLUabdjcnEu70fnl0_3FH-gmVW2fj12yhk2qMD4SF2cbH0e'
      },
      {
        id: 'lb_01',
        stretchId: 'lb_01',
        name: 'Half-Kneeling Hip Flexor Stretch',
        durationMinutes: 1,
        durationSeconds: 60,
        description: 'Keep posture upright and tuck pelvis slightly.',
        muscleGroups: ['Hip Flexors', 'Quads'],
        iconName: 'accessibility_new',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDo9s2lV0V3klhgddtkj9MaHY3jXs3n7Hw4UjBTIiTcpLEUldybSWqqQ6C_eKhqZoOKXJciV9cawvVwaVSJsQ3MPoskfnVFk4-_7VZy7042l-yEp2CfuveZSUH8kS7dIsLHa2CHpR571Fwth9aH_9SyR5wS1wF93cqvKIJ-hJ85ggOUPWUrezFOzpFqtShTrWMV9tjs5yMFSS6iTA_qXDYhzjMeO55zLUpw-ZF7nRgjIKyOVnkUIeiT'
      },
      {
        id: 'lb_02',
        stretchId: 'lb_02',
        name: 'Single Leg Balance with Reach',
        durationMinutes: 0.6,
        durationSeconds: 40,
        description: 'Engage your core and ground through your foot.',
        muscleGroups: ['Glutes', 'Ankles', 'Core'],
        iconName: 'directions_walk',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuCjqY3R38ol_Vz4FCl427OFhdLjOgQi4EoY9iJUo-0v236Jjgrp-bqMMWzuSVzFNaewlFz7urEFwChV2d2cPMIw8TI0r9oack_A_9S_odh7OrrVXG_r_aERB-s-u5uLrujphy2oPuAvlwK3m-fyUJA3CQSkCoYKkl7ti6hCVKkEiL8QmaZI-DKvknkP_gEI8JRE1NGoBAbmGXZ4mLe0YVwNuP8Zug01VrxhCi_oZI3AKy_v15FQCJ'
      }
    ]
  },
  {
    id: 'desk-worker-upper-body-relief',
    title: 'Desk Worker Upper Body Relief',
    subtitle: '1 movement • 6 minutes',
    movementsCount: 1,
    durationMinutes: 6,
    category: 'Upper Body',
    description: 'Targeted upper body relief to counteract long sitting hours and chest tightness.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkdxzzsaP7sJZXVaIu3rZvoLFxtQ1-yfQupcknyHHqI-4a51z_XXNX69dLV3a5r6Xoc4HvbLKil30tGqbWcv_PQgtOpucthMpHVcDcV6xxdW_sjbax4J_7haUd1mn7nJ90PL_zfsghtlAw4__cpvVxZXvc8NJVXnIlH7nJxMXJc2JhcnEEpraAo-3V6doxOmdkqCHRyjci22Om8rWkzXWdruFPBeF4Y2zHoE5LL44Sob63739h-ilC',
    badge: '6 MINUTES',
    movements: [
      {
        id: 'ub_03',
        stretchId: 'ub_03',
        name: 'Doorway Chest Stretch',
        durationMinutes: 6,
        durationSeconds: 360,
        description: 'Open up tight pectoral muscles. Step forward gently through the doorway until you feel a light stretch across your chest.',
        muscleGroups: ['Pectorals', 'Front Shoulders'],
        iconName: 'door_front',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkdxzzsaP7sJZXVaIu3rZvoLFxtQ1-yfQupcknyHHqI-4a51z_XXNX69dLV3a5r6Xoc4HvbLKil30tGqbWcv_PQgtOpucthMpHVcDcV6xxdW_sjbax4J_7haUd1mn7nJ90PL_zfsghtlAw4__cpvVxZXvc8NJVXnIlH7nJxMXJc2JhcnEEpraAo-3V6doxOmdkqCHRyjci22Om8rWkzXWdruFPBeF4Y2zHoE5LL44Sob63739h-ilC',
        verbalCue: 'Step forward gently through the doorway until you feel a light stretch across your chest.',
        phase: 'Stretch'
      }
    ]
  },
  {
    id: 'hip-lower-back-release',
    title: 'Hip & Lower-Back Release',
    subtitle: '3 movements • 7 minutes',
    movementsCount: 3,
    durationMinutes: 7,
    category: 'Lower Body',
    description: 'A gentle sequence designed to melt away tension in the hips and lower back, perfect for end-of-day recovery or post-workout cool down.',
    imageUrl: regeneratedImage,
    badge: 'Restorative',
    movements: [
      {
        id: 'step-1',
        stretchId: 'reclined-figure-four',
        name: 'Reclined Figure Four',
        durationMinutes: 2.5,
        durationSeconds: 150,
        description: 'Opens the outer hips and glutes gently without straining the lower back.',
        muscleGroups: ['Hips', 'Glutes'],
        iconName: 'self_improvement'
      },
      {
        id: 'step-2',
        stretchId: 'supine-knee-to-chest',
        name: 'Supine Knee-to-Chest',
        durationMinutes: 2,
        durationSeconds: 120,
        description: 'Decompresses the lumbar spine and stretches the lower back muscles.',
        muscleGroups: ['Lower Back'],
        iconName: 'airline_seat_recline_extra'
      },
      {
        id: 'step-3',
        stretchId: 'side-neck-stretch',
        name: 'Side Neck Stretch',
        durationMinutes: 2,
        durationSeconds: 120,
        description: 'Integrated full-body relaxation to release tension held in the upper body.',
        muscleGroups: ['Neck', 'Traps'],
        iconName: 'self_improvement'
      }
    ]
  },
  {
    id: 'lower-body-recovery',
    title: 'Lower-Body Recovery',
    subtitle: '3 movements • 6 minutes',
    movementsCount: 3,
    durationMinutes: 6,
    category: 'Lower Body',
    description: 'Release tension in the hips, glutes, and calves. Perfect for post-run recovery or opening up after a long day of sitting.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDo9s2lV0V3klhgddtkj9MaHY3jXs3n7Hw4UjBTIiTcpLEUldybSWqqQ6C_eKhqZoOKXJciV9cawvVwaVSJsQ3MPoskfnVFk4-_7VZy7042l-yEp2CfuveZSUH8kS7dIsLHa2CHpR571Fwth9aH_9SyR5wS1wF93cqvKIJ-hJ85ggOUPWUrezFOzpFqtShTrWMV9tjs5yMFSS6iTA_qXDYhzjMeO55zLUpw-ZF7nRgjIKyOVnkUIeiT',
    badge: '6 MINUTES',
    movements: [
      {
        id: 'step-1',
        stretchId: 'half-kneeling-hip-flexor',
        name: 'Half-Kneeling Hip-Flexor',
        durationMinutes: 2,
        durationSeconds: 120,
        description: 'Opens the front of the hip and gently lengthens the quad.',
        muscleGroups: ['Hip Flexors', 'Quads'],
        iconName: 'accessibility_new'
      },
      {
        id: 'step-2',
        stretchId: 'reclined-figure-four',
        name: 'Reclined Figure Four',
        durationMinutes: 2,
        durationSeconds: 120,
        description: 'Deep glute release to alleviate lower back tightness.',
        muscleGroups: ['Glutes', 'Hips'],
        iconName: 'self_improvement'
      },
      {
        id: 'step-3',
        stretchId: 'wall-calf-stretch',
        name: 'Wall Calf Stretch',
        durationMinutes: 2,
        durationSeconds: 120,
        description: 'Restores ankle mobility and lengthens the gastrocnemius.',
        muscleGroups: ['Calves', 'Ankles'],
        iconName: 'directions_walk'
      }
    ]
  },
  {
    id: 'essential-reset',
    title: 'Essential Reset',
    subtitle: '5 MIN',
    movementsCount: 3,
    durationMinutes: 5,
    category: 'Daily',
    description: 'A quick, gentle flow to wake up major muscle groups.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxFpH2eOsM80vVtv43n5GXRxdeiS0kf-5FYeHXrxcsvZ-2rXP_6kthEoqo8eTTGMYPASHhe2RkDyyMTaegpEZdVi8wDkvaf_mz0wFd3lufl7Mpq3R4KE91a2VgEmUHPQnGN0AM8RjPW_f7zsbCi5h4YbW_DT9BRJedFR0PG5K2no3HhI0mYapJirM0eUiNK7obnDxcO10nk6bxT7dsLdrdRKZ9uBCM2ciZtom3l5iJ_lxwAGdZ8fYx',
    badge: '5 MIN',
    tierRequired: 'friend',
    movements: [
      {
        id: 'step-1',
        stretchId: 'breath-engagement',
        name: 'Breath Engagement',
        durationMinutes: 1,
        durationSeconds: 60,
        description: 'Deep breathing to ground your awareness.',
        muscleGroups: ['Diaphragm'],
        iconName: 'air'
      },
      {
        id: 'step-2',
        stretchId: 'spine-lengthening-reach',
        name: 'Spine-Lengthening Reach',
        durationMinutes: 2,
        durationSeconds: 120,
        description: 'Lengthen the thoracic spine and open the shoulders.',
        muscleGroups: ['Spine', 'Shoulders'],
        iconName: 'self_improvement'
      },
      {
        id: 'step-3',
        stretchId: 'standing-quad-stretch',
        name: 'Standing Quad Stretch',
        durationMinutes: 2,
        durationSeconds: 120,
        description: 'Gentle quad extension to awaken lower limbs.',
        muscleGroups: ['Quads'],
        iconName: 'accessibility_new'
      }
    ]
  },
  {
    id: 'daily-reset',
    title: 'Daily Reset',
    subtitle: '10 MIN',
    movementsCount: 4,
    durationMinutes: 10,
    category: 'Daily',
    description: 'Gentle mobilization to start your day or reset in the afternoon.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGO4SGr9TXJNzURG-6St1REY0nMRnG7FUx-pOM5bX3O5TxIY0MJF4esLLke3qvCSgK0r-uYHD2M-zuD_Z2lSC-DQqlPwO4ES8H-Bi3xXDhwnFEopZMez9x7NMt8LDjTbTrLYrREh16g1bFUWVDUUEDvDcZJohW3MxryYi0F6AzUugwYqSCiptNmwz4LiptqIAGgzjOtugrq7VJ6QNV9SS7sbjGqlvPlY-uLzpJ4O6E-WtQYJdO7066',
    badge: 'Recovery • 10 MIN',
    tierRequired: 'friend',
    movements: [
      {
        id: 'step-1',
        stretchId: 'spine-lengthening-reach',
        name: 'Spine-Lengthening Reach',
        durationMinutes: 2.5,
        durationSeconds: 150,
        description: 'Decompress spine vertebrae.',
        muscleGroups: ['Spine', 'Lats'],
        iconName: 'self_improvement'
      },
      {
        id: 'step-2',
        stretchId: 'half-kneeling-hip-flexor',
        name: 'Half-Kneeling Hip-Flexor',
        durationMinutes: 2.5,
        durationSeconds: 150,
        description: 'Open front hips.',
        muscleGroups: ['Hip Flexors'],
        iconName: 'accessibility_new'
      },
      {
        id: 'step-3',
        stretchId: 'seated-forward-fold',
        name: 'Seated Forward Fold',
        durationMinutes: 2.5,
        durationSeconds: 150,
        description: 'Fold gently forward.',
        muscleGroups: ['Hamstrings', 'Lower Back'],
        iconName: 'self_improvement'
      },
      {
        id: 'step-4',
        stretchId: 'side-neck-stretch',
        name: 'Side Neck Stretch',
        durationMinutes: 2.5,
        durationSeconds: 150,
        description: 'Ease upper trap and neck tension.',
        muscleGroups: ['Neck'],
        iconName: 'self_improvement'
      }
    ]
  },
  {
    id: 'complete-daily-stretch',
    title: 'Complete Daily Stretch',
    subtitle: '20 MIN',
    movementsCount: 5,
    durationMinutes: 20,
    category: 'Daily',
    description: 'Thorough head-to-toe recovery for optimal mobility and long-term joint health.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChrL-9t-SHs-rAGWVgisXfHqFP_gbUs80ilRldILIUCjNgk_XXqjff5pqO4Nqp56Y18lBvtciBczk2Zfeof6dO6Kk1EmLr7gmOYxqgQZ4j1LFFnmJe9ZHjlr7bzyXBEhBPvpCs9oZDaIr203hgCfNzdnOlAiMwhzv0xQcyWygmVMNEtytZebwokjB12yfwl4rg1ii4g0YkcLFYP8M7IMghVPrcP15Os3G7M309riFE2mE3fJN0oCTS',
    badge: '20 MIN',
    tierRequired: 'guardian',
    movements: [
      {
        id: 'step-1',
        stretchId: 'breath-engagement',
        name: 'Breath Engagement',
        durationMinutes: 2,
        durationSeconds: 120,
        description: 'Settle into mindful focus.',
        muscleGroups: ['Diaphragm'],
        iconName: 'air'
      },
      {
        id: 'step-2',
        stretchId: 'doorway-chest-stretch',
        name: 'Doorway Chest Stretch',
        durationMinutes: 4,
        durationSeconds: 240,
        description: 'Deep pectoral expansion.',
        muscleGroups: ['Chest', 'Shoulders'],
        iconName: 'meeting_room'
      },
      {
        id: 'step-3',
        stretchId: 'reclined-figure-four',
        name: 'Reclined Figure Four',
        durationMinutes: 4,
        durationSeconds: 240,
        description: 'Outer hip release.',
        muscleGroups: ['Hips', 'Glutes'],
        iconName: 'self_improvement'
      },
      {
        id: 'step-4',
        stretchId: 'chair-hamstring-stretch',
        name: 'Chair Hamstring Stretch',
        durationMinutes: 5,
        durationSeconds: 300,
        description: 'Posterior chain relief.',
        muscleGroups: ['Hamstrings'],
        iconName: 'accessibility_new'
      },
      {
        id: 'step-5',
        stretchId: 'side-neck-stretch',
        name: 'Side Neck Stretch',
        durationMinutes: 5,
        durationSeconds: 300,
        description: 'Final neck and shoulder release.',
        muscleGroups: ['Neck', 'Traps'],
        iconName: 'self_improvement'
      }
    ]
  }
];
