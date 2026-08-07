import fs from 'fs';
import path from 'path';
import { MUSCLE_ANATOMY_DATA } from '../src/data/muscleAnatomyData';
import { MuscleAnatomy } from '../src/types';

interface MasterExercise {
  exercise_id: string;
  name: string;
  type: 'strengthening' | 'stretching' | 'hybrid';
  equipment: string;
}

interface MasterMuscle {
  id: string;
  muscle_name: string;
  anatomical_region: string;
  latin_origin: string;
  origin: string;
  insertion: string;
  nerve: string;
  action: string;
  basic_functional_movement: string;
  sports_heavy_utilization: string[];
  injury_risks: string;
  common_problems: string[];
  associated_exercise_ids: string[];
  tags: string[];
}

interface MasterLibraryPayload {
  metadata: {
    title: string;
    description: string;
    version: string;
    schema_version: string;
    total_muscles: number;
    total_exercises: number;
    generated_at: string;
  };
  exercises: MasterExercise[];
  muscles: MasterMuscle[];
}

// Map of muscle enrichments to ensure 100% complete fields and zero empty arrays/properties
const ENRICHMENTS: Record<string, Partial<MuscleAnatomy>> = {
  leg_post_01: {
    sports_heavy_utilization: ["Running", "Sprinting", "Jumping", "Basketball", "Soccer", "Tennis"],
    injury_risks: "Achilles tendon strain or rupture, tennis leg (medial head strain).",
    common_problems: ["Achilles tendinopathy", "Calf cramps and strains"]
  },
  leg_post_02: {
    sports_heavy_utilization: ["Marathon running", "Long-distance walking", "Cycling", "Triathlon"],
    injury_risks: "Chronic overuse strains during long-distance endurance running.",
    common_problems: ["Deep calf tightness", "Soleus tendinopathy", "Compartment syndrome"]
  },
  leg_post_03: {
    sports_heavy_utilization: ["Jumping", "Sprinting", "Squash", "Tennis"],
    injury_risks: "Plantaris tendon rupture (often misdiagnosed as Achilles rupture).",
    common_problems: ["Posterior calf pain", "Tendon snaps"]
  },
  leg_post_04: {
    sports_heavy_utilization: ["Barefoot running", "Ballet", "Gymnastics", "Track and field"],
    injury_risks: "Over-pronation leading to flexor tendonitis.",
    common_problems: ["Shin splints (medial tibial stress syndrome)", "Arch pain"]
  },
  leg_post_05: {
    sports_heavy_utilization: ["Ballet (en pointe)", "Sprinting", "Jumping events", "Rock climbing"],
    injury_risks: "Dancer's tendinitis (FHL tendinopathy behind medial malleolus).",
    common_problems: ["Posterior ankle impingement", "Great toe stiffness"]
  },
  leg_post_06: {
    sports_heavy_utilization: ["Running", "Basketball", "Hiking", "Soccer"],
    injury_risks: "Repetitive impact leading to posterior tibial tendon dysfunction (PTTD).",
    common_problems: ["Flat feet / fallen arches", "Medial tibial stress syndrome (shin splints)"]
  },
  leg_post_07: {
    sports_heavy_utilization: ["Downhill running", "Skiing", "Hiking"],
    injury_risks: "Sudden knee hyperextension or twisting injuries.",
    common_problems: ["Popliteus tendinitis", "Posterolateral knee pain"],
    strengthening_exercises: ["Internal tibia rotation with band", "Seated knee flexion with internal rotation"],
    stretching_exercises: ["Knee extension stretch", "Hamstring and popliteus wall stretch"]
  },
  leg_lat_01: {
    sports_heavy_utilization: ["Trail running", "Basketball", "Volleyball", "Soccer"],
    injury_risks: "Inversion ankle sprains causing peroneal tendon strain or subluxation.",
    common_problems: ["Lateral ankle instability", "Peroneal tendinopathy"]
  },
  foot_layer1_01: {
    sports_heavy_utilization: ["Barefoot running", "Martial arts", "Gymnastics", "Ballet"],
    injury_risks: "Foot arch collapse from unsupportive footwear.",
    common_problems: ["Bunions (Hallux valgus)", "Plantar fasciitis", "Fallen arches"]
  },
  foot_layer1_02: {
    sports_heavy_utilization: ["Sprinting", "Jumping", "Dance", "Climbing"],
    injury_risks: "Repetitive impact on hard surfaces.",
    common_problems: ["Plantar heel pain", "Foot cramping"]
  },
  foot_layer1_03: {
    sports_heavy_utilization: ["Trail running", "Barefoot athletic training", "Ballet"],
    injury_risks: "Constrictive narrow toe-box shoes.",
    common_problems: ["Tailor's bunion (bunionette)", "Lateral foot pain"],
    strengthening_exercises: ["Toe splay exercise", "Pinky toe abductions"],
    stretching_exercises: ["Foot sole stretch", "Toe fan stretch"]
  },
  foot_layer2_01: {
    sports_heavy_utilization: ["Running", "Ballet", "Gymnastics"],
    injury_risks: "Sudden acceleration without adequate arch support.",
    common_problems: ["Heel pain", "Midfoot strain"],
    stretching_exercises: ["Plantar fascia towel stretch", "Toe extension stretch"]
  },
  foot_layer2_02: {
    sports_heavy_utilization: ["Rock climbing", "Gymnastics", "Dance"],
    injury_risks: "Forced toe hyperextension.",
    common_problems: ["Claw toe deformities", "Metatarsalgia"],
    stretching_exercises: ["Passive toe flexion stretch", "Foot arch extension"]
  },
  foot_layer3_01: {
    sports_heavy_utilization: ["Sprinting", "Jumping", "Ballet", "Soccer"],
    injury_risks: "Turf toe (hyperextension injury of the first MTP joint).",
    common_problems: ["Sesamoiditis", "Turf toe pain"],
    stretching_exercises: ["Great toe extension stretch", "Kneeling toe stretch"]
  },
  foot_layer3_02: {
    sports_heavy_utilization: ["Climbing", "Martial arts", "Gymnastics"],
    injury_risks: "Tight footwear squeezing metatarsals together.",
    common_problems: ["Hallux valgus (bunion development)", "Forefoot pain"],
    strengthening_exercises: ["Toe squeeze exercise", "Paper scrunch exercise"],
    stretching_exercises: ["Toe separator stretch", "First MTP abduction stretch"]
  },
  foot_layer3_03: {
    sports_heavy_utilization: ["Barefoot running", "Ballet", "Martial arts"],
    injury_risks: "Lateral foot impact.",
    common_problems: ["Fifth metatarsal soreness", "Toe cramping"],
    strengthening_exercises: ["Small toe flexor curls", "Towel scrunch"],
    stretching_exercises: ["Little toe plantarflexion stretch", "Forefoot fan stretch"]
  },
  foot_layer4_01: {
    sports_heavy_utilization: ["Rock climbing", "Dance", "Barefoot agility"],
    injury_risks: "Metatarsal compression injuries.",
    common_problems: ["Intermetatarsal bursitis", "Morton's neuroma"],
    stretching_exercises: ["Forefoot squeeze release stretch", "Toe weave stretch"]
  },
  foot_layer4_02: {
    sports_heavy_utilization: ["Rock climbing", "Gymnastics", "Ballet"],
    injury_risks: "High impact forefoot landing.",
    common_problems: ["Forefoot pain", "Hammer toe tendency"],
    stretching_exercises: ["Toe spread manual stretch", "Metatarsal fan stretch"]
  },
  forearm_ant_deep_03: {
    sports_heavy_utilization: ["Cricket batting", "Baseball", "Arm wrestling", "Tennis"],
    strengthening_exercises: ["Resisted forearm pronation with hammer", "Band pronation"],
    stretching_exercises: ["Assisted supination stretch", "Wrist supination wall stretch"]
  },
  forearm_post_superficial_05: {
    sports_heavy_utilization: ["Musical performance", "Keyboarding", "Martial arts"],
    strengthening_exercises: ["Little finger band extension", "Hand open finger spread"],
    stretching_exercises: ["Little finger flexor stretch", "Palm-down wrist and finger stretch"]
  },
  forearm_post_superficial_07: {
    sports_heavy_utilization: ["Tennis", "Boxing", "Volleyball", "Basketball"],
    strengthening_exercises: ["Terminal elbow extension", "Triceps pushdown lockouts"],
    stretching_exercises: ["Cross-body elbow flexion stretch", "Triceps and elbow stretch"]
  },
  forearm_post_deep_03: {
    sports_heavy_utilization: ["Esports / Gaming", "Racket sports", "Volleyball"],
    strengthening_exercises: ["Thumb extension against band", "Thumb abduction lifts"],
    stretching_exercises: ["De Quervain thumb stretch", "Finkelstein stretch"]
  },
  forearm_post_deep_04: {
    sports_heavy_utilization: ["Esports / Gaming", "Piano performance", "Rock climbing"],
    strengthening_exercises: ["Thumb extension lifting", "Resisted thumb extension"],
    stretching_exercises: ["Finkelstein stretch", "Thumb flexor pull stretch"]
  },
  forearm_post_deep_05: {
    sports_heavy_utilization: ["Gaming / Esports", "Piano / Musical performance", "Typing"],
    injury_risks: "Repetitive strain from isolated index finger extension.",
    common_problems: ["Extensor tendinopathy", "Dorsal wrist pain"],
    strengthening_exercises: ["Index finger band extension", "Finger lifting exercise"],
    stretching_exercises: ["Index finger flexor stretch", "Palms-down finger flex stretch"]
  },
  postvertebral_transversospinales_01: {
    sports_heavy_utilization: ["Weightlifting", "Swimming", "Rowing", "Gymnastics"],
    injury_risks: "Heavy lifting with flexed spine or sudden neck rotation.",
    common_problems: ["Cervicogenic headaches", "Upper back stiffness", "Cervical spine strain"]
  },
  abdominal_01: {
    sports_heavy_utilization: ["Powerlifting", "Gymnastics", "Pilates", "Rowing", "Martial arts"],
    injury_risks: "Lifting heavy without bracing core properly.",
    common_problems: ["Lower back instability", "Poor pelvic posture", "Abdominal wall weakness"]
  },
  hand_palmaris_brevis: {
    sports_heavy_utilization: ["Grappling sports", "Rowing", "Gymnastics", "Martial arts"],
    stretching_exercises: ["Hypothenar stretch", "Palm opening stretch"]
  },
  forearm_palmaris_longus: {
    sports_heavy_utilization: ["Rock climbing", "Gymnastics", "Racket sports", "Volleyball"]
  },
  forearm_ant_deep_01: {
    sports_heavy_utilization: ["Rock climbing", "Gymnastics", "Baseball", "Tennis", "Judo"]
  },
  forearm_post_superficial_04: {
    sports_heavy_utilization: ["Piano performance", "Rock climbing", "Typing / Esports", "Guitar playing"]
  },
  forearm_post_deep_02: {
    sports_heavy_utilization: ["Rock climbing", "Golf", "Racket sports", "Bowling"]
  },
  hand_dorsal_interossei: {
    strengthening_exercises: ["Finger abduction with rubber band", "Finger splay exercises"],
    stretching_exercises: ["Finger adduction stretch", "Squeezed fingers hand stretch"]
  },
  hand_adductor_pollicis: {
    strengthening_exercises: ["Thumb pinch squeeze", "Paper pinch exercise"],
    stretching_exercises: ["Thumb abduction webspace stretch", "L-shape thumb stretch"]
  },
  hand_lumbricals: {
    stretching_exercises: ["Tabletop finger flex stretch", "Lumbrical stretch (MCP flexed, IP extended)"]
  }
};

function inferEquipment(name: string): string {
  const n = name.toLowerCase();
  if (n.includes('band') || n.includes('tubing')) return 'Resistance Band';
  if (n.includes('dumbbell') || n.includes('weight') || n.includes('weights')) return 'Dumbbells';
  if (n.includes('barbell')) return 'Barbell';
  if (n.includes('cable')) return 'Cable Machine';
  if (n.includes('kettlebell')) return 'Kettlebell';
  if (n.includes('ball')) return 'Exercise Ball';
  if (n.includes('towel')) return 'Towel';
  if (n.includes('hammer')) return 'Weighted Bar / Hammer';
  if (n.includes('table') || n.includes('wall') || n.includes('block') || n.includes('chair')) return 'Wall / Block / Table';
  return 'Bodyweight';
}

function generateSlugId(name: string, prefix: string): string {
  const clean = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
  return `${prefix}_${clean}`;
}

export function buildMasterLibrary() {
  console.log('--- Starting Muscle Anatomy & Exercise Migration Audit ---');

  // Step 1: Process and Audit all Muscle Entries
  const auditedMuscles: MuscleAnatomy[] = MUSCLE_ANATOMY_DATA.map((m) => {
    const extra = ENRICHMENTS[m.id] || {};
    return {
      ...m,
      sports_heavy_utilization: extra.sports_heavy_utilization || m.sports_heavy_utilization || [],
      injury_risks: extra.injury_risks !== undefined ? extra.injury_risks : (m.injury_risks || ''),
      common_problems: extra.common_problems || m.common_problems || [],
      strengthening_exercises: extra.strengthening_exercises || m.strengthening_exercises || [],
      stretching_exercises: extra.stretching_exercises || m.stretching_exercises || [],
    };
  });

  // Audit sanity check
  let auditErrorCount = 0;
  auditedMuscles.forEach((m, idx) => {
    if (!m.id || !m.muscle_name || !m.anatomical_region || !m.origin || !m.insertion || !m.nerve || !m.action) {
      console.error(`[AUDIT ERROR] Muscle #${idx + 1} (${m.id}) has missing core fields.`);
      auditErrorCount++;
    }
    if (m.sports_heavy_utilization.length === 0) {
      console.warn(`[AUDIT WARN] Muscle #${idx + 1} (${m.id}) has empty sports list.`);
    }
    if (m.strengthening_exercises.length === 0 && m.stretching_exercises.length === 0) {
      console.error(`[AUDIT ERROR] Muscle #${idx + 1} (${m.id}) has no exercises defined.`);
      auditErrorCount++;
    }
  });

  console.log(`Audit complete: ${auditedMuscles.length} muscles verified. Audit errors: ${auditErrorCount}`);

  // Step 2: Decouple Exercises into Relational Primary Collection
  const exerciseMap = new Map<string, MasterExercise>();

  auditedMuscles.forEach((m) => {
    m.strengthening_exercises.forEach((exName) => {
      const trimmed = exName.trim();
      if (!trimmed) return;
      if (!exerciseMap.has(trimmed)) {
        exerciseMap.set(trimmed, {
          exercise_id: generateSlugId(trimmed, 'ex'),
          name: trimmed,
          type: 'strengthening',
          equipment: inferEquipment(trimmed),
        });
      } else {
        const existing = exerciseMap.get(trimmed)!;
        if (existing.type === 'stretching') {
          existing.type = 'hybrid';
        }
      }
    });

    m.stretching_exercises.forEach((exName) => {
      const trimmed = exName.trim();
      if (!trimmed) return;
      if (!exerciseMap.has(trimmed)) {
        exerciseMap.set(trimmed, {
          exercise_id: generateSlugId(trimmed, 'ex'),
          name: trimmed,
          type: 'stretching',
          equipment: inferEquipment(trimmed),
        });
      } else {
        const existing = exerciseMap.get(trimmed)!;
        if (existing.type === 'strengthening') {
          existing.type = 'hybrid';
        }
      }
    });
  });

  const exercisesList: MasterExercise[] = Array.from(exerciseMap.values());
  console.log(`Extracted ${exercisesList.length} unique exercises into primary relational collection.`);

  // Create name -> exercise_id lookup
  const nameToIdLookup = new Map<string, string>();
  exercisesList.forEach((e) => nameToIdLookup.set(e.name, e.exercise_id));

  // Step 3: Replace raw exercise strings with foreign keys in MasterMuscle entries
  const masterMuscles: MasterMuscle[] = auditedMuscles.map((m) => {
    const associatedIds = new Set<string>();

    m.strengthening_exercises.forEach((ex) => {
      const id = nameToIdLookup.get(ex.trim());
      if (id) associatedIds.add(id);
    });

    m.stretching_exercises.forEach((ex) => {
      const id = nameToIdLookup.get(ex.trim());
      if (id) associatedIds.add(id);
    });

    return {
      id: m.id,
      muscle_name: m.muscle_name,
      anatomical_region: m.anatomical_region,
      latin_origin: m.latin_origin,
      origin: m.origin,
      insertion: m.insertion,
      nerve: m.nerve,
      action: m.action,
      basic_functional_movement: m.basic_functional_movement,
      sports_heavy_utilization: m.sports_heavy_utilization,
      injury_risks: m.injury_risks,
      common_problems: m.common_problems,
      associated_exercise_ids: Array.from(associatedIds),
      tags: m.tags,
    };
  });

  // Step 4: Construct Master JSON Payload
  const masterPayload: MasterLibraryPayload = {
    metadata: {
      title: 'Master Muscle & Exercise Anatomical Library',
      description: 'Consolidated, decoupled, relational anatomical muscle and exercise database',
      version: '1.0.0',
      schema_version: '2026-08',
      total_muscles: masterMuscles.length,
      total_exercises: exercisesList.length,
      generated_at: new Date().toISOString(),
    },
    exercises: exercisesList,
    muscles: masterMuscles,
  };

  // Write master_muscle_library.json to root and src/data/
  const rootPath = path.join(process.cwd(), 'master_muscle_library.json');
  const srcDataPath = path.join(process.cwd(), 'src', 'data', 'master_muscle_library.json');

  fs.writeFileSync(rootPath, JSON.stringify(masterPayload, null, 2), 'utf8');
  fs.writeFileSync(srcDataPath, JSON.stringify(masterPayload, null, 2), 'utf8');

  // Also update src/data/muscleAnatomyData.ts to ensure typescript export is 100% updated with audited data
  const tsContent = `import { MuscleAnatomy } from '../types';
import masterLibrary from './master_muscle_library.json';

export const MASTER_MUSCLE_LIBRARY = masterLibrary;

export const MUSCLE_ANATOMY_DATA: MuscleAnatomy[] = ${JSON.stringify(auditedMuscles, null, 2)};
`;
  fs.writeFileSync(path.join(process.cwd(), 'src', 'data', 'muscleAnatomyData.ts'), tsContent, 'utf8');

  console.log(`Saved master_muscle_library.json successfully to ${rootPath} and ${srcDataPath}`);
  console.log('Updated src/data/muscleAnatomyData.ts with audited dataset.');

  return { auditedMuscles, masterPayload };
}

buildMasterLibrary();
