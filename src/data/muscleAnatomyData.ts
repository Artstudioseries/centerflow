import { MuscleAnatomy } from '../types';
import masterLibrary from './master_muscle_library.json';

export const MASTER_MUSCLE_LIBRARY = masterLibrary;

export const MUSCLE_ANATOMY_DATA: MuscleAnatomy[] = [
  {
    "id": "leg_post_01",
    "muscle_name": "Gastrocnemius",
    "anatomical_region": "Posterior Compartment of the Leg - Superficial Layer",
    "latin_origin": "gaster (stomach), kneme (lower leg)",
    "origin": "Medial head: posterior surface of distal femur just superior to medial condyle. Lateral head: upper posterolateral surface of lateral femoral condyle.",
    "insertion": "Posterior surface of calcaneus via the Achilles tendon.",
    "nerve": "Tibial nerve S1, 2",
    "action": "Plantar flexes foot. Flexes knee. Main propelling force in walking and running.",
    "basic_functional_movement": "Standing on tiptoes.",
    "strengthening_exercises": [
      "Calf raises",
      "Calf isometric",
      "Single leg calf raise",
      "Goosesteps"
    ],
    "stretching_exercises": [
      "Heel-back calf stretch",
      "Heel-drop calf stretch"
    ],
    "tags": [
      "Calf",
      "LowerLeg",
      "PosteriorChain",
      "PlantarFlexion"
    ],
    "sports_heavy_utilization": [
      "Running",
      "Sprinting",
      "Jumping",
      "Basketball",
      "Soccer",
      "Tennis"
    ],
    "injury_risks": "Achilles tendon strain or rupture, tennis leg (medial head strain).",
    "common_problems": [
      "Achilles tendinopathy",
      "Calf cramps and strains"
    ]
  },
  {
    "id": "leg_post_02",
    "muscle_name": "Soleus",
    "anatomical_region": "Posterior Compartment of the Leg - Superficial Layer",
    "latin_origin": "solea (leather sole/sandal/sole)",
    "origin": "Posterior aspect of fibular head and adjacent surfaces of neck and proximal shaft. Soleal line and medial border of tibia.",
    "insertion": "Posterior surface of calcaneus via the Achilles tendon.",
    "nerve": "Tibial nerve S1, 2",
    "action": "Plantar flexes foot. Maintains upright posture by preventing body from falling forward at the ankle joint.",
    "basic_functional_movement": "Standing on tiptoes.",
    "strengthening_exercises": [
      "Calf raises",
      "Bent knee calf isometric",
      "Single leg calf raise",
      "Goosesteps"
    ],
    "stretching_exercises": [
      "Soleus stretch"
    ],
    "tags": [
      "Calf",
      "LowerLeg",
      "PosteriorChain",
      "Posture",
      "PlantarFlexion"
    ],
    "sports_heavy_utilization": [
      "Marathon running",
      "Long-distance walking",
      "Cycling",
      "Triathlon"
    ],
    "injury_risks": "Chronic overuse strains during long-distance endurance running.",
    "common_problems": [
      "Deep calf tightness",
      "Soleus tendinopathy",
      "Compartment syndrome"
    ]
  },
  {
    "id": "leg_post_03",
    "muscle_name": "Plantaris",
    "anatomical_region": "Posterior Compartment of the Leg - Superficial Layer",
    "latin_origin": "plantaris (relating to the sole)",
    "origin": "Lower part of lateral supracondylar line of femur and oblique popliteal ligament of knee joint.",
    "insertion": "Posterior surface of calcaneus via the Achilles tendon.",
    "nerve": "Tibial nerve S1, 2",
    "action": "Plantar flexes foot. Flexes knee.",
    "basic_functional_movement": "Standing on tiptoes.",
    "strengthening_exercises": [
      "Calf raises",
      "Calf isometric",
      "Single leg calf raise",
      "Goosesteps"
    ],
    "stretching_exercises": [
      "Heel-back calf stretch",
      "Heel-drop calf stretch"
    ],
    "tags": [
      "Calf",
      "LowerLeg",
      "PosteriorChain"
    ],
    "sports_heavy_utilization": [
      "Jumping",
      "Sprinting",
      "Squash",
      "Tennis"
    ],
    "injury_risks": "Plantaris tendon rupture (often misdiagnosed as Achilles rupture).",
    "common_problems": [
      "Posterior calf pain",
      "Tendon snaps"
    ]
  },
  {
    "id": "leg_post_04",
    "muscle_name": "Flexor Digitorum Longus",
    "anatomical_region": "Posterior Compartment of the Leg - Intermediate Layer",
    "latin_origin": "flectere (to bend), digitorum (of the toes), longus (long)",
    "origin": "Medial side of posterior surface of tibia, below soleal line.",
    "insertion": "Plantar surfaces of bases of distal phalanges of lateral four toes.",
    "nerve": "Tibial nerve S2, 3",
    "action": "Flexes lateral four toes (enables foot to firmly grip ground when walking).",
    "basic_functional_movement": "Pushing off the surface in walking, standing on tiptoes.",
    "strengthening_exercises": [
      "Calf raises"
    ],
    "stretching_exercises": [
      "Foot stretch"
    ],
    "tags": [
      "ToeFlexion",
      "FootGrip",
      "PosteriorChain"
    ],
    "sports_heavy_utilization": [
      "Barefoot running",
      "Ballet",
      "Gymnastics",
      "Track and field"
    ],
    "injury_risks": "Over-pronation leading to flexor tendonitis.",
    "common_problems": [
      "Shin splints (medial tibial stress syndrome)",
      "Arch pain"
    ]
  },
  {
    "id": "leg_post_05",
    "muscle_name": "Flexor Hallucis Longus",
    "anatomical_region": "Posterior Compartment of the Leg - Intermediate Layer",
    "latin_origin": "flectere (to bend), hallucis (of the great toe), longus (long)",
    "origin": "Lower two-thirds of posterior surface of fibula and adjacent interosseous membrane.",
    "insertion": "Plantar surface of base of distal phalanx of great toe.",
    "nerve": "Tibial nerve S2, 3",
    "action": "Flexes great toe. Important in final propulsive thrust of foot during walking.",
    "basic_functional_movement": "Pushing off the surface in walking, standing on tiptoes.",
    "strengthening_exercises": [
      "Calf raises"
    ],
    "stretching_exercises": [
      "Foot stretch"
    ],
    "tags": [
      "GreatToe",
      "ToeFlexion",
      "Propulsion"
    ],
    "sports_heavy_utilization": [
      "Ballet (en pointe)",
      "Sprinting",
      "Jumping events",
      "Rock climbing"
    ],
    "injury_risks": "Dancer's tendinitis (FHL tendinopathy behind medial malleolus).",
    "common_problems": [
      "Posterior ankle impingement",
      "Great toe stiffness"
    ]
  },
  {
    "id": "leg_post_06",
    "muscle_name": "Tibialis Posterior",
    "anatomical_region": "Posterior Compartment of the Leg - Deep Layer",
    "latin_origin": "tibialis (relating to the shin), posterior (at the back)",
    "origin": "Posterior surfaces of interosseous membrane and adjacent regions of tibia and fibula.",
    "insertion": "Mainly to tuberosity of navicular and adjacent region of medial cuneiform.",
    "nerve": "Tibial nerve L4, 5",
    "action": "Inverts and plantar flexes foot. Supports medial arch of foot during walking.",
    "basic_functional_movement": "Standing on tiptoes, pushing down car pedals.",
    "strengthening_exercises": [
      "Inversion with resistance band",
      "Ball squeeze heel raise"
    ],
    "stretching_exercises": [
      "Heel-back calf stretch",
      "Heel-drop calf stretch"
    ],
    "tags": [
      "Inversion",
      "ArchSupport",
      "AnkleStability"
    ],
    "sports_heavy_utilization": [
      "Running",
      "Basketball",
      "Hiking",
      "Soccer"
    ],
    "injury_risks": "Repetitive impact leading to posterior tibial tendon dysfunction (PTTD).",
    "common_problems": [
      "Flat feet / fallen arches",
      "Medial tibial stress syndrome (shin splints)"
    ]
  },
  {
    "id": "leg_post_07",
    "muscle_name": "Popliteus",
    "anatomical_region": "Posterior Compartment of the Leg - Deep Layer",
    "latin_origin": "poples (the ham)",
    "origin": "Lateral femoral condyle.",
    "insertion": "Posterior surface of proximal tibia.",
    "nerve": "Tibial nerve L4, 5, S1",
    "action": "Stabilizes and unlocks the knee joint.",
    "basic_functional_movement": "Walking.",
    "strengthening_exercises": [
      "Internal tibia rotation with band",
      "Seated knee flexion with internal rotation"
    ],
    "stretching_exercises": [
      "Knee extension stretch",
      "Hamstring and popliteus wall stretch"
    ],
    "tags": [
      "KneeStability",
      "KneeUnlock"
    ],
    "sports_heavy_utilization": [
      "Downhill running",
      "Skiing",
      "Hiking"
    ],
    "injury_risks": "Sudden knee hyperextension or twisting injuries.",
    "common_problems": [
      "Popliteus tendinitis",
      "Posterolateral knee pain"
    ]
  },
  {
    "id": "leg_lat_01",
    "muscle_name": "Fibularis Longus & Fibularis Brevis",
    "anatomical_region": "Lateral Compartment of the Leg",
    "latin_origin": "fibula (pin/buckle), longus (long), brevis (short)",
    "origin": "Fibularis longus: upper two-thirds of lateral surface of fibula, head of fibula. Fibularis brevis: lower two-thirds of lateral surface of shaft of fibula.",
    "insertion": "Fibularis longus: lateral side of distal end of medial cuneiform, base of first metatarsal. Fibularis brevis: lateral tubercle at base of fifth metatarsal.",
    "nerve": "Superficial fibular nerve L5, S1, 2",
    "action": "Fibularis longus: everts and plantar flexes foot, supports arches of foot. Fibularis brevis: everts foot.",
    "basic_functional_movement": "Walking on uneven ground.",
    "strengthening_exercises": [
      "Calf raises",
      "Eversion with resistance band"
    ],
    "stretching_exercises": [
      "Weight-bearing peroneal stretch",
      "Seated dorsiflexion stretch with towel",
      "Heel-drop calf stretch"
    ],
    "tags": [
      "Eversion",
      "AnkleStability",
      "LateralLeg"
    ],
    "sports_heavy_utilization": [
      "Trail running",
      "Basketball",
      "Volleyball",
      "Soccer"
    ],
    "injury_risks": "Inversion ankle sprains causing peroneal tendon strain or subluxation.",
    "common_problems": [
      "Lateral ankle instability",
      "Peroneal tendinopathy"
    ]
  },
  {
    "id": "foot_layer1_01",
    "muscle_name": "Abductor Hallucis",
    "anatomical_region": "Muscles of the Sole of the Foot - First Layer",
    "latin_origin": "abducere (to lead away from), hallucis (of the great toe)",
    "origin": "Medial process of calcaneal tuberosity.",
    "insertion": "Medial side of base of proximal phalanx of great toe.",
    "nerve": "Medial plantar nerve from tibial nerve S1-3",
    "action": "Abducts and flexes great toe at metatarsophalangeal joint.",
    "basic_functional_movement": "Helps foot stability and power in walking and running.",
    "strengthening_exercises": [
      "Abductor Hallucis strengthening"
    ],
    "stretching_exercises": [
      "Abductor Hallucis & Flexor Digitorum Brevis stretch"
    ],
    "tags": [
      "FootSole",
      "GreatToe",
      "FootStability"
    ],
    "sports_heavy_utilization": [
      "Barefoot running",
      "Martial arts",
      "Gymnastics",
      "Ballet"
    ],
    "injury_risks": "Foot arch collapse from unsupportive footwear.",
    "common_problems": [
      "Bunions (Hallux valgus)",
      "Plantar fasciitis",
      "Fallen arches"
    ]
  },
  {
    "id": "foot_layer1_02",
    "muscle_name": "Flexor Digitorum Brevis",
    "anatomical_region": "Muscles of the Sole of the Foot - First Layer",
    "latin_origin": "flectere (to bend), digitorum (of toes), brevis (short)",
    "origin": "Medial process of calcaneal tuberosity and plantar aponeurosis.",
    "insertion": "Sides of plantar surfaces of middle phalanges of lateral four toes.",
    "nerve": "Medial plantar nerve from tibial nerve S1-3",
    "action": "Flexes lateral four toes at proximal interphalangeal joint.",
    "basic_functional_movement": "Helps foot stability and power in walking and running.",
    "strengthening_exercises": [
      "Flexor Digitorum Brevis strengthening"
    ],
    "stretching_exercises": [
      "Abductor Hallucis & Flexor Digitorum Brevis stretch"
    ],
    "tags": [
      "FootSole",
      "ToeFlexion",
      "FootStability"
    ],
    "sports_heavy_utilization": [
      "Sprinting",
      "Jumping",
      "Dance",
      "Climbing"
    ],
    "injury_risks": "Repetitive impact on hard surfaces.",
    "common_problems": [
      "Plantar heel pain",
      "Foot cramping"
    ]
  },
  {
    "id": "foot_layer1_03",
    "muscle_name": "Abductor Digiti Minimi",
    "anatomical_region": "Muscles of the Sole of the Foot - First Layer",
    "latin_origin": "abducere (to lead away from), digiti (of toe), minimi (smallest)",
    "origin": "Lateral and medial processes of calcaneal tuberosity, connective tissue band to base of fifth metatarsal.",
    "insertion": "Lateral side of base of proximal phalanx of little toe.",
    "nerve": "Lateral plantar nerve from tibial nerve S1-3",
    "action": "Abducts fifth toe at metatarsophalangeal joint.",
    "basic_functional_movement": "Foot stability during locomotion.",
    "strengthening_exercises": [
      "Toe splay exercise",
      "Pinky toe abductions"
    ],
    "stretching_exercises": [
      "Foot sole stretch",
      "Toe fan stretch"
    ],
    "tags": [
      "FootSole",
      "LittleToe",
      "Abduction"
    ],
    "sports_heavy_utilization": [
      "Trail running",
      "Barefoot athletic training",
      "Ballet"
    ],
    "injury_risks": "Constrictive narrow toe-box shoes.",
    "common_problems": [
      "Tailor's bunion (bunionette)",
      "Lateral foot pain"
    ]
  },
  {
    "id": "foot_layer2_01",
    "muscle_name": "Quadratus Plantae",
    "anatomical_region": "Muscles of the Sole of the Foot - Second Layer",
    "latin_origin": "quadratus (squared), plantae (of the sole)",
    "origin": "Medial surface of calcaneus and lateral process of calcaneal tuberosity.",
    "insertion": "Lateral border of tendon of flexor digitorum longus in proximal sole of foot.",
    "nerve": "Lateral plantar nerve from tibial nerve S1-3",
    "action": "Flexes distal phalanges of second to fifth toes. Modifies oblique line of pull of flexor digitorum longus.",
    "basic_functional_movement": "Holding a pencil between toes and ball of foot.",
    "strengthening_exercises": [
      "Picking up pencil"
    ],
    "stretching_exercises": [
      "Plantar fascia towel stretch",
      "Toe extension stretch"
    ],
    "tags": [
      "FootSole",
      "ToeFlexion",
      "Grip"
    ],
    "sports_heavy_utilization": [
      "Running",
      "Ballet",
      "Gymnastics"
    ],
    "injury_risks": "Sudden acceleration without adequate arch support.",
    "common_problems": [
      "Heel pain",
      "Midfoot strain"
    ]
  },
  {
    "id": "foot_layer2_02",
    "muscle_name": "Lumbricals",
    "anatomical_region": "Muscles of the Sole of the Foot - Second Layer",
    "latin_origin": "lumbricus (earthworm)",
    "origin": "First lumbrical: medial side of tendon of FDL (second toe). Second to fourth: adjacent tendons of FDL.",
    "insertion": "Medial free margins of extensor hoods of second to fifth toes.",
    "nerve": "First lumbrical: medial plantar nerve. Lateral three: lateral plantar nerve S2, 3",
    "action": "Flex metatarsophalangeal joint and extend interphalangeal joints.",
    "basic_functional_movement": "Gathering up material under the foot using toes only.",
    "strengthening_exercises": [
      "Gathering material under foot"
    ],
    "stretching_exercises": [
      "Passive toe flexion stretch",
      "Foot arch extension"
    ],
    "tags": [
      "FootSole",
      "ToeControl",
      "IntrinsicFoot"
    ],
    "sports_heavy_utilization": [
      "Rock climbing",
      "Gymnastics",
      "Dance"
    ],
    "injury_risks": "Forced toe hyperextension.",
    "common_problems": [
      "Claw toe deformities",
      "Metatarsalgia"
    ]
  },
  {
    "id": "foot_layer3_01",
    "muscle_name": "Flexor Hallucis Brevis",
    "anatomical_region": "Muscles of the Sole of the Foot - Third Layer",
    "latin_origin": "flectere (to bend), hallucis (of great toe), brevis (short)",
    "origin": "Medial part of plantar surface of cuboid, adjacent part of lateral cuneiform, tendon of tibialis posterior.",
    "insertion": "Lateral and medial sides of base of proximal phalanx of great toe.",
    "nerve": "Medial plantar nerve from tibial nerve S1, 2",
    "action": "Flexes metatarsophalangeal joint of great toe.",
    "basic_functional_movement": "Helping to gather up material under foot involving great toe.",
    "strengthening_exercises": [
      "Flexor Hallucis Brevis strengthening"
    ],
    "stretching_exercises": [
      "Great toe extension stretch",
      "Kneeling toe stretch"
    ],
    "tags": [
      "FootSole",
      "GreatToe",
      "ToeFlexion"
    ],
    "sports_heavy_utilization": [
      "Sprinting",
      "Jumping",
      "Ballet",
      "Soccer"
    ],
    "injury_risks": "Turf toe (hyperextension injury of the first MTP joint).",
    "common_problems": [
      "Sesamoiditis",
      "Turf toe pain"
    ]
  },
  {
    "id": "foot_layer3_02",
    "muscle_name": "Adductor Hallucis",
    "anatomical_region": "Muscles of the Sole of the Foot - Third Layer",
    "latin_origin": "adducere (to lead to), hallucis (of great toe)",
    "origin": "Transverse head: ligaments associated with MTP joints of lateral three toes. Oblique head: bases of 2nd-4th metatarsals.",
    "insertion": "Lateral side of base of proximal phalanx of great toe.",
    "nerve": "Lateral plantar nerve from tibial nerve S2, 3",
    "action": "Adducts great toe at metatarsophalangeal joint.",
    "basic_functional_movement": "Making a space between the great toe and adjacent toe.",
    "strengthening_exercises": [
      "Toe squeeze exercise",
      "Paper scrunch exercise"
    ],
    "stretching_exercises": [
      "Toe separator stretch",
      "First MTP abduction stretch"
    ],
    "tags": [
      "FootSole",
      "GreatToe",
      "Adduction"
    ],
    "sports_heavy_utilization": [
      "Climbing",
      "Martial arts",
      "Gymnastics"
    ],
    "injury_risks": "Tight footwear squeezing metatarsals together.",
    "common_problems": [
      "Hallux valgus (bunion development)",
      "Forefoot pain"
    ]
  },
  {
    "id": "foot_layer3_03",
    "muscle_name": "Flexor Digiti Minimi Brevis",
    "anatomical_region": "Muscles of the Sole of the Foot - Third Layer",
    "latin_origin": "flectere (to bend), digiti (of toe), minimi (smallest), brevis (short)",
    "origin": "Base of fifth metatarsal and sheath of fibularis longus tendon.",
    "insertion": "Lateral side of base of proximal phalanx of little toe.",
    "nerve": "Lateral plantar nerve from tibial nerve S2, 3",
    "action": "Flexes little toe at metatarsophalangeal joint.",
    "basic_functional_movement": "Works alongside other toes to gather up material under foot.",
    "strengthening_exercises": [
      "Small toe flexor curls",
      "Towel scrunch"
    ],
    "stretching_exercises": [
      "Little toe plantarflexion stretch",
      "Forefoot fan stretch"
    ],
    "tags": [
      "FootSole",
      "LittleToe",
      "ToeFlexion"
    ],
    "sports_heavy_utilization": [
      "Barefoot running",
      "Ballet",
      "Martial arts"
    ],
    "injury_risks": "Lateral foot impact.",
    "common_problems": [
      "Fifth metatarsal soreness",
      "Toe cramping"
    ]
  },
  {
    "id": "foot_layer4_01",
    "muscle_name": "Dorsal Interossei",
    "anatomical_region": "Muscles of the Sole of the Foot - Fourth Layer",
    "latin_origin": "dorsalis (relating to back), interosseus (between bones)",
    "origin": "Sides of adjacent metatarsals.",
    "insertion": "Extensor hoods and bases of proximal phalanges of second to fourth toes.",
    "nerve": "Lateral plantar nerve S2, 3 (first & second also innervated by deep fibular nerve).",
    "action": "Abduct second to fourth toes at MTP joints. Resist extension of MTP joints and flexion of IP joints.",
    "basic_functional_movement": "Facilitate walking.",
    "strengthening_exercises": [
      "Toe abduction/spreading exercise"
    ],
    "stretching_exercises": [
      "Forefoot squeeze release stretch",
      "Toe weave stretch"
    ],
    "tags": [
      "FootDorsum",
      "ToeAbduction",
      "BarefootRunning"
    ],
    "sports_heavy_utilization": [
      "Rock climbing",
      "Dance",
      "Barefoot agility"
    ],
    "injury_risks": "Metatarsal compression injuries.",
    "common_problems": [
      "Intermetatarsal bursitis",
      "Morton's neuroma"
    ]
  },
  {
    "id": "foot_layer4_02",
    "muscle_name": "Plantar Interossei",
    "anatomical_region": "Muscles of the Sole of the Foot - Fourth Layer",
    "latin_origin": "plantaris (relating to sole), interosseus (between bones)",
    "origin": "Bases and medial sides of third to fifth metatarsals.",
    "insertion": "Extensor hoods and bases of proximal phalanges of third to fifth toes.",
    "nerve": "Lateral plantar nerve from tibial nerve S2, 3",
    "action": "Adduct third to fifth toes at MTP joints. Resist extension of MTP joints and flexion of IP joints.",
    "basic_functional_movement": "Facilitate walking.",
    "strengthening_exercises": [
      "Toe adduction exercise"
    ],
    "stretching_exercises": [
      "Toe spread manual stretch",
      "Metatarsal fan stretch"
    ],
    "tags": [
      "FootSole",
      "ToeAdduction",
      "BarefootRunning"
    ],
    "sports_heavy_utilization": [
      "Rock climbing",
      "Gymnastics",
      "Ballet"
    ],
    "injury_risks": "High impact forefoot landing.",
    "common_problems": [
      "Forefoot pain",
      "Hammer toe tendency"
    ]
  },
  {
    "id": "forearm_ant_superficial_01",
    "muscle_name": "Flexor Digitorum Superficialis",
    "anatomical_region": "Muscles of the Anterior Compartment of the Forearm - Intermediate Layer",
    "latin_origin": "flectere (to bend); digitorum (of the fingers/toes); superficialis (on the surface)",
    "origin": "Humero-ulnar head: medial epicondyle of humerus. Adjacent border of coronoid process. Radial head: oblique line of radius.",
    "insertion": "Four tendons each divide into two slips, each of which insert into the sides of the middle phalanges of the four fingers.",
    "nerve": "Median nerve C8, T1.",
    "action": "Flexes proximal interphalangeal joints of the index, middle, ring, and little fingers; can also flex metacarpophalangeal joints of the same fingers and the wrist joint.",
    "basic_functional_movement": "Examples: 'hook grip,' 'power grip' (as in turning a tap), typing, playing the piano and some stringed instruments.",
    "sports_heavy_utilization": [
      "Archery",
      "Racket sports",
      "Batting sports",
      "Judo",
      "Rowing",
      "Rock-face climbing"
    ],
    "injury_risks": "Over-extending the wrist as a result of breaking a fall with the hand.",
    "common_problems": [
      "Golfer's elbow (overuse tendonitis of the common flexor origin)",
      "Carpal tunnel syndrome"
    ],
    "strengthening_exercises": [
      "Biceps curls",
      "Isometric wrist and finger flexion",
      "Ring pinching exercise"
    ],
    "stretching_exercises": [
      "Stretch for wrist and finger flexors",
      "Finger stretch",
      "Palms out forearm stretch"
    ],
    "tags": [
      "Forearm",
      "AnteriorCompartment",
      "FingerFlexion",
      "WristFlexion",
      "Grip"
    ]
  },
  {
    "id": "forearm_ant_deep_01",
    "muscle_name": "Flexor Digitorum Profundus",
    "anatomical_region": "Muscles of the Anterior Compartment of the Forearm - Deep Layer",
    "latin_origin": "flectere (to bend); digitorum (of the fingers/toes); profundus (deep)",
    "origin": "Medial and anterior surfaces of ulna. Medial half of interosseous membrane.",
    "insertion": "Four tendons, which attach to the palmar surfaces of the distal phalanges of the index, middle, ring, and little fingers.",
    "nerve": "Medial half of muscle (destined for little and ring fingers): ulnar nerve C8, T1. Lateral half of muscle (destined for index and middle fingers): anterior interosseous branch of median nerve C8, T1.",
    "action": "Flexes distal interphalangeal joints of the index, middle, ring, and little fingers; can also flex metacarpophalangeal joints of the same fingers and the wrist joint.",
    "basic_functional_movement": "Example: 'hook grip,' as in carrying a briefcase.",
    "sports_heavy_utilization": [
      "Rock climbing",
      "Gymnastics",
      "Baseball",
      "Tennis",
      "Judo"
    ],
    "injury_risks": "",
    "common_problems": [],
    "strengthening_exercises": [
      "Biceps curls",
      "Isometric wrist and finger flexion",
      "Ball squeeze exercise"
    ],
    "stretching_exercises": [
      "Stretch for wrist and finger flexors",
      "Finger stretch",
      "Palms out forearm stretch"
    ],
    "tags": [
      "Forearm",
      "AnteriorCompartment",
      "DeepLayer",
      "FingerFlexion",
      "Grip"
    ]
  },
  {
    "id": "forearm_ant_deep_02",
    "muscle_name": "Flexor Pollicis Longus",
    "anatomical_region": "Muscles of the Anterior Compartment of the Forearm - Deep Layer",
    "latin_origin": "flectere (to bend); pollicis (of the thumb); longus (long)",
    "origin": "Anterior surface of shaft of radius. Radial half of interosseous membrane.",
    "insertion": "Palmar surface of base of distal phalanx of thumb.",
    "nerve": "Anterior interosseous branch of median nerve C(6), 7, 8.",
    "action": "Flexes interphalangeal joint of thumb. Assists in flexion of metacarpophalangeal joint of thumb.",
    "basic_functional_movement": "Examples: picking up small objects between the thumb and fingers, maintaining a firm grip on a hammer.",
    "sports_heavy_utilization": [
      "Archery",
      "Racket sports",
      "Batting sports",
      "Judo",
      "Rowing",
      "Rock-face climbing"
    ],
    "injury_risks": "Over-extending the wrist as a result of breaking a fall with the hand.",
    "common_problems": [
      "Carpal tunnel syndrome"
    ],
    "strengthening_exercises": [
      "Biceps curls",
      "Isometric wrist and finger flexion",
      "Ring pinching exercise"
    ],
    "stretching_exercises": [
      "Stretch for wrist and finger flexors",
      "Finger stretch",
      "Palms out forearm stretch"
    ],
    "tags": [
      "Forearm",
      "AnteriorCompartment",
      "ThumbFlexion",
      "Grip"
    ]
  },
  {
    "id": "forearm_ant_deep_03",
    "muscle_name": "Pronator Quadratus",
    "anatomical_region": "Muscles of the Anterior Compartment of the Forearm - Deep Layer",
    "latin_origin": "pronare (to bend forward); quadratus (squared)",
    "origin": "Linear ridge on distal anterior surface of ulna.",
    "insertion": "Distal anterior surface of radius.",
    "nerve": "Anterior interosseous branch of median nerve C7, 8.",
    "action": "Pronates forearm and hand. Helps hold radius and ulna together, reducing stress on inferior radioulnar joint.",
    "basic_functional_movement": "Example: turning the hand downward, as in pouring a substance out of the hand.",
    "sports_heavy_utilization": [
      "Cricket batting",
      "Baseball",
      "Arm wrestling",
      "Tennis"
    ],
    "injury_risks": "",
    "common_problems": [],
    "strengthening_exercises": [
      "Resisted forearm pronation with hammer",
      "Band pronation"
    ],
    "stretching_exercises": [
      "Assisted supination stretch",
      "Wrist supination wall stretch"
    ],
    "tags": [
      "Forearm",
      "AnteriorCompartment",
      "Pronation"
    ]
  },
  {
    "id": "forearm_post_superficial_01",
    "muscle_name": "Brachioradialis",
    "anatomical_region": "Muscles of the Posterior Compartment of the Forearm - Superficial Layer",
    "latin_origin": "brachium (arm); radius (staff, spoke of wheel)",
    "origin": "Proximal part of lateral supracondylar ridge of humerus and adjacent intermuscular septum.",
    "insertion": "Lower surface of distal end of radius, just above styloid process.",
    "nerve": "Radial nerve C5, 6.",
    "action": "Accessory flexor of elbow joint when forearm is midpronated.",
    "basic_functional_movement": "Example: turning a corkscrew.",
    "sports_heavy_utilization": [
      "Baseball",
      "Cricket",
      "Golf",
      "Racket sports",
      "Rowing"
    ],
    "injury_risks": "",
    "common_problems": [],
    "strengthening_exercises": [
      "Elbow flexion in mid pronation",
      "Resisted pronation and supination"
    ],
    "stretching_exercises": [
      "Assisted pronation and supination stretch"
    ],
    "tags": [
      "Forearm",
      "ElbowFlexion",
      "Brachioradialis"
    ]
  },
  {
    "id": "forearm_post_superficial_02",
    "muscle_name": "Extensor Carpi Radialis Longus",
    "anatomical_region": "Muscles of the Posterior Compartment of the Forearm - Superficial Layer",
    "latin_origin": "extendere (to extend); carpi (of the wrist); radius (staff, spoke of wheel); longus (long)",
    "origin": "Distal part of lateral supracondylar ridge of humerus and adjacent intermuscular septum.",
    "insertion": "Dorsal surface of base of second metacarpal.",
    "nerve": "Radial nerve C6, 7.",
    "action": "Extends and abducts wrist.",
    "basic_functional_movement": "Examples: kneading dough, typing.",
    "sports_heavy_utilization": [
      "Badminton (backhand)",
      "Golf",
      "Motorcycle sports (throttle control)"
    ],
    "injury_risks": "Over-flexing the wrist as a result of falling onto the hand.",
    "common_problems": [
      "Tennis elbow (overuse tendonitis of the common origin on the lateral epicondyle of the humerus)"
    ],
    "strengthening_exercises": [
      "Wrist extension with hand weights",
      "Isometric wrist extension"
    ],
    "stretching_exercises": [
      "Palm-down wrist stretch"
    ],
    "tags": [
      "Forearm",
      "WristExtension",
      "WristAbduction",
      "LateralEpicondyle"
    ]
  },
  {
    "id": "forearm_post_superficial_03",
    "muscle_name": "Extensor Carpi Radialis Brevis",
    "anatomical_region": "Muscles of the Posterior Compartment of the Forearm - Superficial Layer",
    "latin_origin": "extendere (to extend); carpi (of the wrist); radius (staff, spoke of wheel); brevis (short)",
    "origin": "Lateral epicondyle of humerus and adjacent intermuscular septum.",
    "insertion": "Dorsal surface of base of second and third metacarpals.",
    "nerve": "Radial nerve C7, 8.",
    "action": "Extends and abducts wrist.",
    "basic_functional_movement": "Examples: kneading dough, typing.",
    "sports_heavy_utilization": [
      "Badminton (backhand)",
      "Golf",
      "Motorcycle sports (throttle control)"
    ],
    "injury_risks": "Over-flexing the wrist as a result of falling onto the hand.",
    "common_problems": [
      "Tennis elbow (overuse tendonitis of the common origin on the lateral epicondyle of the humerus)"
    ],
    "strengthening_exercises": [
      "Wrist extension with hand weights",
      "Isometric wrist extension"
    ],
    "stretching_exercises": [
      "Palm-down wrist stretch"
    ],
    "tags": [
      "Forearm",
      "WristExtension",
      "WristAbduction",
      "LateralEpicondyle"
    ]
  },
  {
    "id": "forearm_post_superficial_04",
    "muscle_name": "Extensor Digitorum",
    "anatomical_region": "Muscles of the Posterior Compartment of the Forearm - Superficial Layer",
    "latin_origin": "extendere (to extend); digitorum (of the fingers/toes)",
    "origin": "Lateral epicondyle of humerus and adjacent intermuscular septum and deep fascia.",
    "insertion": "Four tendons, which insert via extensor hoods into the dorsal aspects of the bases of the middle and distal phalanges of the index, middle, ring, and little fingers.",
    "nerve": "Posterior interosseous nerve C7, 8.",
    "action": "Extends the index, middle, ring, and little fingers; can also extend the wrist.",
    "basic_functional_movement": "Example: letting go of objects held in the hand.",
    "sports_heavy_utilization": [
      "Piano performance",
      "Rock climbing",
      "Typing / Esports",
      "Guitar playing"
    ],
    "injury_risks": "Over-flexing the wrist as a result of falling onto the hand.",
    "common_problems": [
      "Tennis elbow (overuse tendonitis of the common origin on the lateral epicondyle of the humerus)"
    ],
    "strengthening_exercises": [
      "Finger extension with resistance band"
    ],
    "stretching_exercises": [
      "Finger curl stretch"
    ],
    "tags": [
      "Forearm",
      "FingerExtension",
      "WristExtension",
      "LateralEpicondyle"
    ]
  },
  {
    "id": "forearm_post_superficial_05",
    "muscle_name": "Extensor Digiti Minimi",
    "anatomical_region": "Muscles of the Posterior Compartment of the Forearm - Superficial Layer",
    "latin_origin": "extendere (to extend); digiti (of the finger/toe); minimi (of the smallest)",
    "origin": "Lateral epicondyle of humerus and adjacent intermuscular septum together with extensor digitorum.",
    "insertion": "Extensor hood of little finger.",
    "nerve": "Posterior interosseous nerve C6, 7, 8.",
    "action": "Extends little finger.",
    "basic_functional_movement": "Extending the little finger independently.",
    "sports_heavy_utilization": [
      "Musical performance",
      "Keyboarding",
      "Martial arts"
    ],
    "injury_risks": "",
    "common_problems": [],
    "strengthening_exercises": [
      "Little finger band extension",
      "Hand open finger spread"
    ],
    "stretching_exercises": [
      "Little finger flexor stretch",
      "Palm-down wrist and finger stretch"
    ],
    "tags": [
      "Forearm",
      "LittleFinger",
      "FingerExtension"
    ]
  },
  {
    "id": "forearm_post_superficial_06",
    "muscle_name": "Extensor Carpi Ulnaris",
    "anatomical_region": "Muscles of the Posterior Compartment of the Forearm - Superficial Layer",
    "latin_origin": "extendere (to extend); carpi (of the wrist); ulnaris (relating to the elbow/arm)",
    "origin": "Lateral epicondyle of humerus and posterior border of ulna.",
    "insertion": "Tubercle on base of medial side of fifth metacarpal.",
    "nerve": "Posterior interosseous nerve C6, 7, 8.",
    "action": "Extends and adducts wrist.",
    "basic_functional_movement": "Example: cleaning windows.",
    "sports_heavy_utilization": [
      "Badminton (backhand)",
      "Golf",
      "Motorcycle sports (throttle control)"
    ],
    "injury_risks": "Over-flexing the wrist as a result of falling onto the hand.",
    "common_problems": [
      "Tennis elbow (overuse tendonitis of the common origin on the lateral epicondyle of the humerus)"
    ],
    "strengthening_exercises": [
      "Wrist extension with hand weights",
      "Isometric wrist extension"
    ],
    "stretching_exercises": [
      "Palm-down wrist stretch"
    ],
    "tags": [
      "Forearm",
      "WristExtension",
      "WristAdduction",
      "UlnarDeviator"
    ]
  },
  {
    "id": "forearm_post_superficial_07",
    "muscle_name": "Anconeus",
    "anatomical_region": "Muscles of the Posterior Compartment of the Forearm - Superficial Layer",
    "latin_origin": "agkon (elbow)",
    "origin": "Lateral epicondyle of humerus.",
    "insertion": "Lateral surface of olecranon process and proximal posterior surface of ulna.",
    "nerve": "Radial nerve C6, 7, 8.",
    "action": "Abduction of ulna in pronation. Accessory extensor of elbow joint.",
    "basic_functional_movement": "Example: pushing objects at arm's length.",
    "sports_heavy_utilization": [
      "Tennis",
      "Boxing",
      "Volleyball",
      "Basketball"
    ],
    "injury_risks": "",
    "common_problems": [],
    "strengthening_exercises": [
      "Terminal elbow extension",
      "Triceps pushdown lockouts"
    ],
    "stretching_exercises": [
      "Cross-body elbow flexion stretch",
      "Triceps and elbow stretch"
    ],
    "tags": [
      "Elbow",
      "ElbowExtension",
      "UlnaAbduction"
    ]
  },
  {
    "id": "forearm_post_deep_01",
    "muscle_name": "Supinator",
    "anatomical_region": "Muscles of the Posterior Compartment of the Forearm - Deep Layer",
    "latin_origin": "supinus (lying on the back)",
    "origin": "Superficial part: lateral epicondyle of humerus, radial collateral and anular ligaments. Deep part: supinator crest of ulna.",
    "insertion": "Lateral surface of radius superior to the anterior oblique line.",
    "nerve": "Posterior interosseous nerve C5, 6, (7).",
    "action": "Supination.",
    "basic_functional_movement": "Example: turning a door handle or screwdriver.",
    "sports_heavy_utilization": [
      "Backhand in racket sports"
    ],
    "injury_risks": "",
    "common_problems": [],
    "strengthening_exercises": [
      "Biceps curl with hand weights"
    ],
    "stretching_exercises": [
      "Weighted pronation stretch"
    ],
    "tags": [
      "Forearm",
      "Supination",
      "DeepLayer"
    ]
  },
  {
    "id": "forearm_post_deep_02",
    "muscle_name": "Abductor Pollicis Longus",
    "anatomical_region": "Muscles of the Posterior Compartment of the Forearm - Deep Layer",
    "latin_origin": "abducere (to lead away from); pollicis (of the thumb); longus (long)",
    "origin": "Posterior surfaces of ulna and radius, distal to attachments of supinator and anconeus. Intervening interosseous membrane.",
    "insertion": "Lateral side of base of first metacarpal.",
    "nerve": "Posterior interosseous nerve C7, 8.",
    "action": "Abducts carpometacarpal joint of thumb; accessory extensor of thumb.",
    "basic_functional_movement": "Example: releasing the grip on a flat object.",
    "sports_heavy_utilization": [
      "Rock climbing",
      "Golf",
      "Racket sports",
      "Bowling"
    ],
    "injury_risks": "",
    "common_problems": [],
    "strengthening_exercises": [
      "Finger extension with resistance band"
    ],
    "stretching_exercises": [
      "Finger curl stretch"
    ],
    "tags": [
      "Forearm",
      "ThumbAbduction",
      "Snuffbox"
    ]
  },
  {
    "id": "forearm_post_deep_03",
    "muscle_name": "Extensor Pollicis Brevis",
    "anatomical_region": "Muscles of the Posterior Compartment of the Forearm - Deep Layer",
    "latin_origin": "extendere (to extend); pollicis (of the thumb); brevis (short)",
    "origin": "Posterior surface of radius, distal to origin of abductor pollicis longus. Adjacent interosseous membrane.",
    "insertion": "Base of dorsal surface of proximal phalanx of thumb.",
    "nerve": "Posterior interosseous nerve C7, 8.",
    "action": "Extends metacarpophalangeal joint of thumb. Can also extend carpometacarpal joint of thumb.",
    "basic_functional_movement": "Example: releasing the grip on a flat object.",
    "sports_heavy_utilization": [
      "Esports / Gaming",
      "Racket sports",
      "Volleyball"
    ],
    "injury_risks": "",
    "common_problems": [],
    "strengthening_exercises": [
      "Thumb extension against band",
      "Thumb abduction lifts"
    ],
    "stretching_exercises": [
      "De Quervain thumb stretch",
      "Finkelstein stretch"
    ],
    "tags": [
      "Forearm",
      "ThumbExtension",
      "Snuffbox"
    ]
  },
  {
    "id": "forearm_post_deep_04",
    "muscle_name": "Extensor Pollicis Longus",
    "anatomical_region": "Muscles of the Posterior Compartment of the Forearm - Deep Layer",
    "latin_origin": "extendere (to extend); pollicis (of the thumb); longus (long)",
    "origin": "Posterior surface of ulna, distal to abductor pollicis longus. Adjacent interosseous membrane.",
    "insertion": "Dorsal surface of base of distal phalanx of thumb.",
    "nerve": "Posterior interosseous nerve C7, 8.",
    "action": "Extends interphalangeal joint of thumb. Can also extend carpometacarpal and metacarpophalangeal joint of thumb.",
    "basic_functional_movement": "Example: giving the 'thumbs up' gesture.",
    "sports_heavy_utilization": [
      "Esports / Gaming",
      "Piano performance",
      "Rock climbing"
    ],
    "injury_risks": "",
    "common_problems": [],
    "strengthening_exercises": [
      "Thumb extension lifting",
      "Resisted thumb extension"
    ],
    "stretching_exercises": [
      "Finkelstein stretch",
      "Thumb flexor pull stretch"
    ],
    "tags": [
      "Forearm",
      "ThumbExtension",
      "Snuffbox"
    ]
  },
  {
    "id": "forearm_post_deep_05",
    "muscle_name": "Extensor Indicis",
    "anatomical_region": "Muscles of the Posterior Compartment of the Forearm - Deep Layer",
    "latin_origin": "extendere (to extend); indicis (of the index finger)",
    "origin": "Posterior surface of ulna, distal to extensor pollicis longus. Adjacent interosseous membrane.",
    "insertion": "Extensor hood of index finger.",
    "nerve": "Posterior interosseous nerve C7, 8.",
    "action": "Extends index finger.",
    "basic_functional_movement": "Example: pointing at something.",
    "strengthening_exercises": [
      "Index finger band extension",
      "Finger lifting exercise"
    ],
    "stretching_exercises": [
      "Index finger flexor stretch",
      "Palms-down finger flex stretch"
    ],
    "tags": [
      "Forearm",
      "IndexFinger",
      "FingerExtension"
    ],
    "sports_heavy_utilization": [
      "Gaming / Esports",
      "Piano / Musical performance",
      "Typing"
    ],
    "injury_risks": "Repetitive strain from isolated index finger extension.",
    "common_problems": [
      "Extensor tendinopathy",
      "Dorsal wrist pain"
    ]
  },
  {
    "id": "postvertebral_transversospinales_01",
    "muscle_name": "Semispinalis",
    "anatomical_region": "Postvertebral Muscles—Transversospinales Group",
    "latin_origin": "semispinalis, half-spinal; thoracis, of the chest; cervicis, of the neck; capitis, of the head.",
    "origin": "Thoracis: transverse processes of T6–10. Cervicis: transverse processes of T1–6. Capitis: transverse processes of C4–T7.",
    "insertion": "Thoracis: spinous processes of C6–T4. Cervicis: spinous processes of C2–5. Capitis: between superior and inferior nuchal lines of occipital bone.",
    "nerve": "Dorsal rami of thoracic and cervical spinal nerves.",
    "action": "Extends head, neck, and thoracic spine. Rotates head, neck, and thoracic spine to opposite side.",
    "basic_functional_movement": "Looking up, extending neck and back, rotating upper spine.",
    "strengthening_exercises": [
      "Neck extension",
      "Prone cobra",
      "Back extensions"
    ],
    "stretching_exercises": [
      "Chin-to-chest neck stretch",
      "Seated spinal twist"
    ],
    "tags": [
      "Neck",
      "Back",
      "Spine",
      "Extension",
      "Postvertebral"
    ],
    "sports_heavy_utilization": [
      "Weightlifting",
      "Swimming",
      "Rowing",
      "Gymnastics"
    ],
    "injury_risks": "Heavy lifting with flexed spine or sudden neck rotation.",
    "common_problems": [
      "Cervicogenic headaches",
      "Upper back stiffness",
      "Cervical spine strain"
    ]
  },
  {
    "id": "abdominal_01",
    "muscle_name": "Transversus Abdominis",
    "anatomical_region": "Abdominal Wall",
    "latin_origin": "transversus (across, crosswise); abdominis (of the belly/stomach).",
    "origin": "Anterior two-thirds of iliac crest, lateral third of inguinal ligament, thoracolumbar fascia, and costal cartilages of lower six ribs.",
    "insertion": "Aponeurosis ending in linea alba, pubic crest, and pectineal line.",
    "nerve": "Ventral rami of thoracic spinal nerves T7–12 and L1.",
    "action": "Compresses abdominal contents, stabilizes lumbar spine and pelvis.",
    "basic_functional_movement": "Bracing the core, maintaining posture, forced exhalation.",
    "strengthening_exercises": [
      "Plank",
      "Abdominal vacuum",
      "Dead bug",
      "Bird dog"
    ],
    "stretching_exercises": [
      "Cobra stretch",
      "Upward facing dog"
    ],
    "tags": [
      "Core",
      "Abdomen",
      "SpineStability",
      "IntraAbdominalPressure"
    ],
    "sports_heavy_utilization": [
      "Powerlifting",
      "Gymnastics",
      "Pilates",
      "Rowing",
      "Martial arts"
    ],
    "injury_risks": "Lifting heavy without bracing core properly.",
    "common_problems": [
      "Lower back instability",
      "Poor pelvic posture",
      "Abdominal wall weakness"
    ]
  },
  {
    "id": "posterior_triangle_01",
    "muscle_name": "Scalenes (Anterior, Middle, Posterior)",
    "anatomical_region": "Posterior Triangle of the Neck",
    "latin_origin": "Greek, skalenos, uneven. Latin, anterior, at the front; medius, middle; posterior, at the back.",
    "origin": "Anterior: anterior tubercles of transverse processes of C3–6. Middle: transverse processes of C2–7. Posterior: posterior tubercles of transverse processes of C4–6.",
    "insertion": "Anterior: scalene tubercle and upper surface of 1st rib. Middle: upper surface of 1st rib, behind groove for subclavian artery. Posterior: upper surface of 2nd rib.",
    "nerve": "Anterior: C4–7 ventral rami. Middle: C3–7 ventral rami. Posterior: C5–7 ventral rami.",
    "action": "Bilateral: flex neck; raise 1st or 2nd rib during active respiration. Unilateral: side flex and rotate head.",
    "basic_functional_movement": "Accessory muscle of respiration; side flexes and rotates head.",
    "sports_heavy_utilization": [
      "High intensity running",
      "All active endurance sports requiring heavy respiration"
    ],
    "injury_risks": "Tightness compressing brachial plexus nerves or subclavian artery.",
    "common_problems": [
      "Pain in neck, shoulder, and arm",
      "Thoracic outlet syndrome / brachial plexus compression"
    ],
    "strengthening_exercises": [
      "Isometric neck flexion exercise"
    ],
    "stretching_exercises": [
      "Rotation neck stretch",
      "Side flexion neck stretch"
    ],
    "tags": [
      "Neck",
      "PosteriorTriangle",
      "Scalenes",
      "Respiration",
      "Flexion"
    ]
  },
  {
    "id": "posterior_triangle_02",
    "muscle_name": "Sternocleidomastoid",
    "anatomical_region": "Posterior / Anterior Neck Regions",
    "latin_origin": "Greek, sternon, chest; kleis, key/clavicle; mastoides, breast shaped.",
    "origin": "Sternal head: upper part of anterior surface of manubrium. Clavicular head: upper surface of medial third of clavicle.",
    "insertion": "Sternal head: lateral superior nuchal line of occipital bone. Clavicular head: outer surface of mastoid process.",
    "nerve": "Accessory nerve (Cranial Nerve XI) and C2-C3 ventral rami.",
    "action": "Bilateral: pulls head forward, lifts sternum/ribcage during deep breathing. Unilateral: lateral flexion to same side; rotates head to opposite side.",
    "basic_functional_movement": "Looking over shoulder, lifting head off pillow, assisting deep inhalation.",
    "sports_heavy_utilization": [
      "Football",
      "Rugby",
      "Swimming",
      "Contact sports"
    ],
    "injury_risks": "Whiplash injuries from rapid acceleration/deceleration.",
    "common_problems": [
      "Torticollis (wry neck)",
      "Tension headaches",
      "Neck stiffness"
    ],
    "strengthening_exercises": [
      "Isometric neck flexion",
      "Neck resistance exercise"
    ],
    "stretching_exercises": [
      "Neck side stretch with rotation",
      "Looking up diagonal neck stretch"
    ],
    "tags": [
      "Neck",
      "Sternocleidomastoid",
      "HeadRotation",
      "NeckFlexion",
      "Respiration"
    ]
  },
  {
    "id": "erector_spinae_iliocostalis",
    "muscle_name": "Erector Spinae — Iliocostalis Portion",
    "anatomical_region": "Postvertebral Muscles — Erector Spinae Group (Lateral Column)",
    "latin_origin": "ilio (relating to the ilium/hipbone); costalis (relating to the ribs).",
    "origin": "Sacrum, lumbar and lower thoracic spinous processes, supraspinous ligaments, iliac crest, and upper rib angles.",
    "insertion": "Angles of lower and upper ribs, and transverse processes of lower cervical vertebrae (C4–C7).",
    "nerve": "Dorsal rami of cervical, thoracic, and lumbar spinal nerves (C4–S5).",
    "action": "Extends spine, side-flexes trunk, assists with rib depression during forced exhalation.",
    "basic_functional_movement": "Maintaining upright posture, arching back, side bending.",
    "sports_heavy_utilization": [
      "Swimming",
      "Gymnastics",
      "Martial arts",
      "Weightlifting"
    ],
    "injury_risks": "Lifting heavy loads with improper spinal alignment.",
    "common_problems": [
      "Low back pain",
      "Lumbar strain"
    ],
    "strengthening_exercises": [
      "Back extensions",
      "Deadlifts",
      "Bird dogs"
    ],
    "stretching_exercises": [
      "Cat-cow stretch",
      "Seated forward fold",
      "Child's pose"
    ],
    "tags": [
      "Back",
      "ErectorSpinae",
      "SpineExtension",
      "Posture",
      "Lumbar"
    ]
  },
  {
    "id": "erector_spinae_longissimus",
    "muscle_name": "Erector Spinae — Longissimus Portion",
    "anatomical_region": "Postvertebral Muscles — Erector Spinae Group (Intermediate Column)",
    "latin_origin": "longissimus (longest).",
    "origin": "Lumbar transverse processes, upper thoracic transverse processes (T1–T5), and lower cervical articular processes (C4–C7).",
    "insertion": "Thoracic/lumbar transverse processes, lower rib angles, cervical transverse processes (C2–C6), and mastoid process.",
    "nerve": "Dorsal rami of spinal nerves (C1–S1).",
    "action": "Extends and laterally flexes spine; assists rib depression during forceful breathing; extends and rotates head (capitis).",
    "basic_functional_movement": "Postural stabilization, extending back, turning head.",
    "sports_heavy_utilization": [
      "Swimming",
      "Acrobatics",
      "Gymnastics",
      "Rowing"
    ],
    "injury_risks": "Vulnerable during improper lifting techniques or sudden twisting under strain.",
    "common_problems": [
      "Thoracic/lumbar back pain",
      "Back muscle spasm"
    ],
    "strengthening_exercises": [
      "Prone cobra",
      "Supermans",
      "Hyperextensions"
    ],
    "stretching_exercises": [
      "Kneeling cat-cow",
      "Thoracic rotation stretch"
    ],
    "tags": [
      "Back",
      "ErectorSpinae",
      "SpineExtension",
      "PosturalControl"
    ]
  },
  {
    "id": "erector_spinae_spinalis",
    "muscle_name": "Erector Spinae — Spinalis Portion",
    "anatomical_region": "Postvertebral Muscles — Erector Spinae Group (Medial Column)",
    "latin_origin": "spinalis (relating to the spine).",
    "origin": "Spinous processes of upper lumbar (L1–L2) and lower thoracic (T11–T12) vertebrae, ligamentum nuchae, and C7 spinous process.",
    "insertion": "Upper thoracic spinous processes (T1–T8), C2 spinous process, and occipital attachments.",
    "nerve": "Dorsal rami of spinal nerves (C2–L3).",
    "action": "Extends the vertebral column to maintain erect posture; extends head (capitis).",
    "basic_functional_movement": "Seated and standing erect posture, arching spine.",
    "sports_heavy_utilization": [
      "Gymnastics",
      "Martial arts",
      "Swimming",
      "Diving"
    ],
    "injury_risks": "Strain from lifting heavy objects without bending at hips and knees.",
    "common_problems": [
      "Mid-back tightness",
      "Postural fatigue"
    ],
    "strengthening_exercises": [
      "Bird dog",
      "Prone back extension",
      "Good mornings"
    ],
    "stretching_exercises": [
      "Child's pose",
      "Seated spine stretch"
    ],
    "tags": [
      "Back",
      "ErectorSpinae",
      "SpineExtension",
      "PosturalControl"
    ]
  },
  {
    "id": "thigh_anterior_sartorius",
    "muscle_name": "Sartorius",
    "anatomical_region": "Anterior Compartment of the Thigh",
    "latin_origin": "Latin, sartor, tailor.",
    "origin": "Anterior superior iliac spine (ASIS).",
    "insertion": "Medial surface of tibia just inferomedial to tibial tuberosity.",
    "nerve": "Femoral nerve L2, 3, (4).",
    "action": "Flexes the thigh at the hip joint. Flexes the leg at the knee joint.",
    "basic_functional_movement": "Sitting cross-legged.",
    "sports_heavy_utilization": [
      "Ballet",
      "Skating",
      "Soccer"
    ],
    "injury_risks": "Overambitious yoga exercises in cross-legged or lotus positions.",
    "common_problems": [
      "Pain or damage to the inside of the knee."
    ],
    "strengthening_exercises": [
      "Clam twist",
      "Sartorius sitting lift"
    ],
    "stretching_exercises": [
      "Sartorius stretch",
      "Kneeling sartorius stretch"
    ],
    "tags": [
      "Thigh",
      "Sartorius",
      "HipFlexion",
      "KneeFlexion"
    ]
  },
  {
    "id": "thigh_anterior_quadriceps",
    "muscle_name": "Quadriceps (Rectus Femoris, Vastus Lateralis, Vastus Medialis, Vastus Intermedius)",
    "anatomical_region": "Anterior Compartment of the Thigh",
    "latin_origin": "Latin, rectus, straight; femoris, of the thigh; vastus, vast; lateralis, relating to the side.",
    "origin": "Rectus femoris: AIIS & groove above acetabulum. Vasti group: upper half of shaft of femur.",
    "insertion": "Patella, then via patellar ligament into the tibial tuberosity.",
    "nerve": "Femoral nerve L2, 3, 4.",
    "action": "Rectus femoris flexes thigh at hip and extends leg at knee. Vasti group extends leg at knee.",
    "basic_functional_movement": "Walking up stairs, sitting down, climbing, cycling.",
    "sports_heavy_utilization": [
      "Fell running",
      "Skiing",
      "Jumping events",
      "Soccer",
      "Karate",
      "Weightlifting"
    ],
    "injury_risks": "Patellofemoral maltracking, improper knee alignment under heavy loading.",
    "common_problems": [
      "Low back pain",
      "Knee pain",
      "Patellar instability",
      "Anterior knee pain"
    ],
    "strengthening_exercises": [
      "Inner range quadriceps",
      "Straight leg raise",
      "Wall slide isometric quads",
      "Squats with weights"
    ],
    "stretching_exercises": [
      "Kneeling quads stretch",
      "Standing quads stretch",
      "Prone quads stretch"
    ],
    "tags": [
      "Thigh",
      "Quadriceps",
      "KneeExtension",
      "HipFlexion"
    ]
  },
  {
    "id": "thigh_medial_adductors",
    "muscle_name": "Adductors (Magnus, Longus, Brevis, Gracilis, Pectineus)",
    "anatomical_region": "Medial Compartment of the Thigh",
    "latin_origin": "Latin, adducere, to lead to; magnus, large; brevis, small; longus, long; gracilis, slender.",
    "origin": "Anterior surface of pubic bone, inferior pubic ramus, ramus of ischium, and ischial tuberosity.",
    "insertion": "Linea aspera, medial supracondylar line, and adductor tubercle of femur; medial proximal tibia (gracilis).",
    "nerve": "Obturator nerve L2, 3, 4 (and Tibial division of Sciatic nerve for Magnus).",
    "action": "Adducts and medially rotates thigh at hip joint; flexes leg at knee joint (Gracilis).",
    "basic_functional_movement": "Bringing the second leg in or out of a car; sitting with knees pressed together.",
    "sports_heavy_utilization": [
      "Horse riding",
      "Judo",
      "Wrestling",
      "Hurdling",
      "Soccer",
      "Swimming (breaststroke)"
    ],
    "injury_risks": "Side splits or high side kicks without sufficient warm-up.",
    "common_problems": [
      "Groin pulls (tends to be tighter in men than in women)."
    ],
    "strengthening_exercises": [
      "Lying hip adduction",
      "Resistance band adduction"
    ],
    "stretching_exercises": [
      "Leg-out adductor stretch",
      "Sitting adductor stretch"
    ],
    "tags": [
      "Thigh",
      "Adductors",
      "Groin",
      "HipAdduction"
    ]
  },
  {
    "id": "thigh_posterior_hamstrings",
    "muscle_name": "Hamstrings (Semimembranosus, Semitendinosus, Biceps Femoris)",
    "anatomical_region": "Posterior Compartment of the Thigh",
    "latin_origin": "Latin, semi, half; membranosus, membranous; tendinosus, tendinous; biceps, two-headed.",
    "origin": "Ischial tuberosity. Biceps femoris short head: lateral lip of linea aspera.",
    "insertion": "Head of fibula (Biceps femoris); medial tibial condyle/proximal tibia (Semimembranosus/Semitendinosus).",
    "nerve": "Sciatic nerve L5, S1, 2.",
    "action": "Flexes leg at knee joint; extends thigh at hip joint; rotates leg at knee joint.",
    "basic_functional_movement": "Slowing down the leg at the end of forward swing during running; controlling trunk forward flexion.",
    "sports_heavy_utilization": [
      "Sprinting",
      "Hurdling",
      "Soccer",
      "Jumping",
      "Weightlifting"
    ],
    "injury_risks": "Sudden lengthening without warm-up (e.g., forward kicking, splits).",
    "common_problems": [
      "Low back pain",
      "Knee pain",
      "Leg length discrepancy effect",
      "Restriction of stride length"
    ],
    "strengthening_exercises": [
      "Prone leg lift",
      "Prone knee bend",
      "Resistance band leg extensions"
    ],
    "stretching_exercises": [
      "Lying hamstring stretch",
      "Standing hamstring stretch"
    ],
    "tags": [
      "Thigh",
      "Hamstrings",
      "KneeFlexion",
      "HipExtension"
    ]
  },
  {
    "id": "leg_anterior_extensors",
    "muscle_name": "Anterior Leg Extensors (Extensor Digitorum Longus, Extensor Hallucis Longus, Fibularis Tertius)",
    "anatomical_region": "Anterior Compartment of the Leg",
    "latin_origin": "Latin, extendere, to extend; digitorum, of toes; hallucis, of great toe; fibula, pin; tertius, third.",
    "origin": "Medial surface of fibula, lateral tibial condyle, and interosseous membrane.",
    "insertion": "Dorsal surfaces of digits 2–5, base of distal phalanx of great toe, dorsomedial surface of 5th metatarsal base.",
    "nerve": "Deep fibular nerve L5, S1.",
    "action": "Dorsiflexes foot, everts foot, extends toes and great toe.",
    "basic_functional_movement": "Walking up stairs (ensuring toes clear steps).",
    "sports_heavy_utilization": [
      "Hill walking",
      "Mountaineering",
      "Breaststroke swimming",
      "Cycling (pedal up phase)",
      "Running",
      "Jumping"
    ],
    "injury_risks": "Tendon compression bruising (toe stepped on) or forced ankle inversion.",
    "common_problems": [
      "Ankle instability from forced inversion injuries",
      "Anterior shin pain"
    ],
    "strengthening_exercises": [
      "Dorsiflexion with resistance band",
      "Eversion with resistance band"
    ],
    "stretching_exercises": [
      "Kneeling stretch (plantarflexion)"
    ],
    "tags": [
      "Leg",
      "AnteriorLeg",
      "Dorsiflexion",
      "AnkleStability"
    ]
  },
  {
    "id": "hand_palmaris_brevis",
    "muscle_name": "Palmaris Brevis",
    "anatomical_region": "Muscles of the Hand",
    "latin_origin": "Latin, palmaris, relating to the palm; brevis, short.",
    "origin": "Palmar aponeurosis. Flexor retinaculum.",
    "insertion": "Skin on ulnar border of hand.",
    "nerve": "Superficial branch of ulnar nerve C(7), 8, T1.",
    "action": "Improves grip.",
    "basic_functional_movement": "A small subcutaneous muscle lying over the hypothenar eminence that improves grip.",
    "sports_heavy_utilization": [
      "Grappling sports",
      "Rowing",
      "Gymnastics",
      "Martial arts"
    ],
    "injury_risks": "",
    "common_problems": [],
    "strengthening_exercises": [
      "Chin ups"
    ],
    "stretching_exercises": [
      "Hypothenar stretch",
      "Palm opening stretch"
    ],
    "tags": [
      "Hand",
      "PalmarisBrevis",
      "Grip"
    ]
  },
  {
    "id": "hand_dorsal_interossei",
    "muscle_name": "Dorsal Interossei",
    "anatomical_region": "Muscles of the Hand",
    "latin_origin": "Latin, dorsalis, relating to the back; interosseus, between bones.",
    "origin": "By two heads, each from adjacent sides of metacarpals.",
    "insertion": "Extensor hood and base of proximal phalanges of index, middle, and ring fingers.",
    "nerve": "Deep branch of ulnar nerve C8, T1.",
    "action": "Abduction of index, middle, and ring fingers at metacarpophalangeal joints.",
    "basic_functional_movement": "Spreading the fingers as if to indicate numbers from two to four.",
    "sports_heavy_utilization": [
      "Rock climbing"
    ],
    "injury_risks": "",
    "common_problems": [],
    "strengthening_exercises": [
      "Finger abduction with rubber band",
      "Finger splay exercises"
    ],
    "stretching_exercises": [
      "Finger adduction stretch",
      "Squeezed fingers hand stretch"
    ],
    "tags": [
      "Hand",
      "DorsalInterossei",
      "FingerAbduction"
    ]
  },
  {
    "id": "hand_palmar_interossei",
    "muscle_name": "Palmar Interossei",
    "anatomical_region": "Muscles of the Hand",
    "latin_origin": "Latin, palmaris, relating to the palm; interosseus, between bones.",
    "origin": "Sides of metacarpals.",
    "insertion": "Extensor hoods of the thumb, index, ring, and little fingers and proximal phalanx of thumb.",
    "nerve": "Deep branch of ulnar nerve C8, T1.",
    "action": "Adduction of the thumb, index, ring, and little fingers at metacarpophalangeal joints.",
    "basic_functional_movement": "Cupping the hand as if to retain water in the palm (i.e. drinking from the hand).",
    "sports_heavy_utilization": [
      "Rock climbing"
    ],
    "injury_risks": "",
    "common_problems": [],
    "strengthening_exercises": [
      "Ring pinching exercise"
    ],
    "stretching_exercises": [
      "Thumb stretch"
    ],
    "tags": [
      "Hand",
      "PalmarInterossei",
      "FingerAdduction"
    ]
  },
  {
    "id": "hand_adductor_pollicis",
    "muscle_name": "Adductor Pollicis",
    "anatomical_region": "Muscles of the Hand",
    "latin_origin": "Latin, adducere, to lead to; pollicis, of the thumb.",
    "origin": "Transverse head: palmar surface of third metacarpal. Oblique head: capitate and bases of second and third metacarpals.",
    "insertion": "Base of proximal phalanx of thumb and extensor hood of thumb.",
    "nerve": "Deep branch of ulnar nerve C8, T1.",
    "action": "Adducts thumb.",
    "basic_functional_movement": "Gripping a jam jar lid to screw it on.",
    "sports_heavy_utilization": [
      "Rock climbing"
    ],
    "injury_risks": "Over-abducting the thumb as a result of falling onto the hand.",
    "common_problems": [],
    "strengthening_exercises": [
      "Thumb pinch squeeze",
      "Paper pinch exercise"
    ],
    "stretching_exercises": [
      "Thumb abduction webspace stretch",
      "L-shape thumb stretch"
    ],
    "tags": [
      "Hand",
      "AdductorPollicis",
      "ThumbAdduction"
    ]
  },
  {
    "id": "hand_lumbricals",
    "muscle_name": "Lumbricals",
    "anatomical_region": "Muscles of the Hand",
    "latin_origin": "Latin, lumbricus, earthworm.",
    "origin": "Tendons of flexor digitorum profundus.",
    "insertion": "Extensor hoods of index, ring, middle, and little fingers.",
    "nerve": "Lateral lumbricals (first and second): digital branches of median nerve. Medial lumbricals (third and fourth): deep branch of ulnar nerve.",
    "action": "Extend interphalangeal joints and simultaneously flex metacarpophalangeal joints.",
    "basic_functional_movement": "Cupping the hand.",
    "sports_heavy_utilization": [
      "Volleyball",
      "Handball"
    ],
    "injury_risks": "",
    "common_problems": [
      "Clawed hand",
      "Inability to maintain flexion of the interphalangeal joints, as in rock climbing"
    ],
    "strengthening_exercises": [
      "Lumbricals strengthen"
    ],
    "stretching_exercises": [
      "Tabletop finger flex stretch",
      "Lumbrical stretch (MCP flexed, IP extended)"
    ],
    "tags": [
      "Hand",
      "Lumbricals",
      "MCPFlexion",
      "IPExtension"
    ]
  },
  {
    "id": "hand_hypothenar_eminence",
    "muscle_name": "Hypothenar Eminence (Abductor Digiti Minimi, Flexor Digiti Minimi Brevis, Opponens Digiti Minimi)",
    "anatomical_region": "Muscles of the Hand—Hypothenar Eminence",
    "latin_origin": "Latin, abducere, to lead away from; digiti, of the finger/toe; minimi, of the smallest; flectere, to flex; brevis, short; opponens, opposing.",
    "origin": "Abductor: Pisiform, pisohamate ligament, and tendon of flexor carpi ulnaris. Flexor & Opponens: Hook of hamate, Flexor retinaculum.",
    "insertion": "Proximal phalanx of little finger (Abductor & Flexor); Entire length of medial (ulnar) border of fifth metacarpal (Opponens).",
    "nerve": "Deep branch of ulnar nerve C(7), 8, T1.",
    "action": "Abducts, flexes, and opposes the little finger at the metacarpophalangeal joint; laterally rotates fifth metacarpal.",
    "basic_functional_movement": "Holding a thread within the fingertips (along with the other fingertips); holding a large ball.",
    "sports_heavy_utilization": [
      "Volleyball",
      "Handball",
      "Rock-face climbing"
    ],
    "injury_risks": "Over-abducting or over-extending the little finger as a result of falling onto the ulnar side of the hand.",
    "common_problems": [],
    "strengthening_exercises": [
      "Isometric little finger abduction",
      "ODM/FDMB exercise"
    ],
    "stretching_exercises": [
      "Finger spread",
      "Abductor Digiti Minimi only stretch"
    ],
    "tags": [
      "Hand",
      "Hypothenar",
      "LittleFinger"
    ]
  },
  {
    "id": "hand_thenar_eminence",
    "muscle_name": "Thenar Eminence (Abductor Pollicis Brevis, Flexor Pollicis Brevis, Opponens Pollicis)",
    "anatomical_region": "Muscles of the Hand—Thenar Eminence",
    "latin_origin": "Latin, abducere, to lead away from; pollicis, of the thumb; brevis, short; flectere, to flex; opponens, opposing.",
    "origin": "Tubercles of trapezium and scaphoid, flexor retinaculum.",
    "insertion": "Proximal phalanx and extensor hood of thumb; entire length of radial border of first metacarpal.",
    "nerve": "Recurrent branch of median nerve C8, T1.",
    "action": "Abducts, flexes, and medially rotates thumb at metacarpophalangeal joint.",
    "basic_functional_movement": "Picking up a small object between the thumb and fingers; typing; holding a thread between the thumb and fingertips.",
    "sports_heavy_utilization": [
      "Rock climbing",
      "Motorcycle sports (clutch and throttle movement)"
    ],
    "injury_risks": "Over-extending the thumb as a result of falling onto the hand.",
    "common_problems": [],
    "strengthening_exercises": [
      "Isometric thumb abduction",
      "Ring pinching exercise"
    ],
    "stretching_exercises": [
      "Stretch thumb across palm"
    ],
    "tags": [
      "Hand",
      "Thenar",
      "Thumb"
    ]
  },
  {
    "id": "gluteal_gluteus_maximus",
    "muscle_name": "Gluteus Maximus",
    "anatomical_region": "Muscles of the Gluteal Region",
    "latin_origin": "Greek, gloutos, buttock. Latin, maximus, biggest.",
    "origin": "Fascia covering gluteus medius, external surface of ilium behind posterior gluteal line, fascia of erector spinae, dorsal surface of lower sacrum, lateral margin of coccyx, external surface of sacrotuberous ligament.",
    "insertion": "Posterior aspect of iliotibial band of fascia lata; Gluteal tuberosity of proximal femur.",
    "nerve": "Inferior gluteal nerve L5, S1, 2.",
    "action": "Powerful extensor of flexed femur at hip joint. Lateral stabilizer of hip and knee joints. Laterally rotates and abducts thigh.",
    "basic_functional_movement": "Walking upstairs, rising from sitting.",
    "sports_heavy_utilization": [
      "Running",
      "Surfing",
      "Windsurfing",
      "Jumping",
      "Weightlifting (\"clean\" phase)"
    ],
    "injury_risks": "Pelvic imbalances.",
    "common_problems": [
      "Pain in the hips, low back, and lateral area of the knees."
    ],
    "strengthening_exercises": [
      "Isometric glute squeeze",
      "Shoulder bridge",
      "Prone lying knee lift",
      "Rising from squat"
    ],
    "stretching_exercises": [
      "Lying foot-over-knee stretch",
      "Lying cross-over-knee stretch"
    ],
    "tags": [
      "Gluteal",
      "GluteusMaximus",
      "HipExtension"
    ]
  },
  {
    "id": "gluteal_tensor_fasciae_latae",
    "muscle_name": "Tensor Fasciae Latae",
    "anatomical_region": "Muscles of the Gluteal Region",
    "latin_origin": "Latin, tendere, to stretch, pull; fasciae, of the band; latae, of the broad.",
    "origin": "Lateral aspect of crest of ilium between ASIS and tubercle of the crest.",
    "insertion": "Iliotibial band of fascia lata.",
    "nerve": "Superior gluteal nerve L4, 5, S1.",
    "action": "Stabilizes the knee in extension.",
    "basic_functional_movement": "Walking.",
    "sports_heavy_utilization": [
      "Horse riding",
      "Hurdling",
      "Waterskiing"
    ],
    "injury_risks": "Pelvic imbalances.",
    "common_problems": [
      "Pain in the hips, low back, and lateral area of the knees."
    ],
    "strengthening_exercises": [
      "Lying lateral leg raise",
      "Resistance band abduction side steps"
    ],
    "stretching_exercises": [
      "Lying cross-over-knee stretch",
      "Standing TFL stretch"
    ],
    "tags": [
      "Gluteal",
      "TFL",
      "KneeStabilization"
    ]
  },
  {
    "id": "gluteal_gluteus_medius_minimus",
    "muscle_name": "Gluteus Medius & Gluteus Minimus",
    "anatomical_region": "Muscles of the Gluteal Region",
    "latin_origin": "Greek, gloutos, buttock. Latin, medius, middle; minimus, smallest.",
    "origin": "External surface of ilium between anterior and posterior gluteal lines (Medius); external surface of ilium between anterior and inferior gluteal lines (Minimus).",
    "insertion": "Oblique ridge on lateral surface of greater trochanter (Medius); anterolateral border of greater trochanter (Minimus).",
    "nerve": "Superior gluteal nerve L4, 5, S1.",
    "action": "Abducts femur at hip joint. Medially rotates thigh. Holds pelvis secure over stance leg and prevents pelvic drop on opposite swing side during walking (Trendelenburg gait).",
    "basic_functional_movement": "Stepping sideways over an object, such as a low fence.",
    "sports_heavy_utilization": [
      "Cross-country skiing",
      "Ice skating"
    ],
    "injury_risks": "Pelvic imbalances.",
    "common_problems": [
      "Pain in the hips, low back, and knees."
    ],
    "strengthening_exercises": [
      "Clam",
      "Side lifts from block",
      "Resistance band abduction side steps"
    ],
    "stretching_exercises": [
      "Knee-up rotation stretch",
      "Lying cross-over-knee stretch"
    ],
    "tags": [
      "Gluteal",
      "GluteusMedius",
      "GluteusMinimus",
      "HipAbduction",
      "PelvicStability"
    ]
  },
  {
    "id": "gluteal_piriformis",
    "muscle_name": "Piriformis",
    "anatomical_region": "Muscles of the Gluteal Region",
    "latin_origin": "Latin, pirum, pear; forma, shape.",
    "origin": "Anterior surface of sacrum between anterior sacral foramina.",
    "insertion": "Medial side of superior border of greater trochanter.",
    "nerve": "Branches from sacral nerves S1, 2.",
    "action": "Laterally rotates extended femur at hip joint. Abducts flexed femur at hip joint. Helps hold head of femur in acetabulum.",
    "basic_functional_movement": "Bringing the first leg out of a car.",
    "sports_heavy_utilization": [
      "Swimming (breaststroke legs)",
      "Soccer"
    ],
    "injury_risks": "Tight piriformis squeezing the sciatic nerve.",
    "common_problems": [
      "Piriformis syndrome (sciatic pain that begins in the buttocks)."
    ],
    "strengthening_exercises": [
      "Standing hip twist",
      "Lying hip twist",
      "Isometric glute squeeze (point toes outwards)"
    ],
    "stretching_exercises": [
      "Lying leg-tuck hip stretch",
      "Standing leg-tuck hip stretch",
      "Knee-up rotation stretch"
    ],
    "tags": [
      "Gluteal",
      "Piriformis",
      "HipExternalRotation",
      "Sciatic"
    ]
  },
  {
    "id": "gluteal_deep_lateral_rotators",
    "muscle_name": "Deep Lateral Hip Rotators (Obturator Internus, Gemellus Superior, Gemellus Inferior, Quadratus Femoris)",
    "anatomical_region": "Muscles of the Gluteal Region—Deep Lateral Hip Rotators",
    "latin_origin": "Latin, obturare, to obstruct; internus, internal; gemellus, twin/double; superior, upper; inferior, lower; quadratus, squared; femoris, of the thigh.",
    "origin": "Anterolateral wall of true pelvis (Obturator internus); external surface of ischial spine (Gemellus sup.); upper aspect of ischial tuberosity (Gemellus inf.); lateral edge of ischium (Quadratus femoris).",
    "insertion": "Medial side of greater trochanter / intertrochanteric crest of proximal femur.",
    "nerve": "Nerve to obturator internus L5, S1; Nerve to quadratus femoris L5, S1, (2).",
    "action": "Laterally rotate hip joint. Abduct flexed femur at hip joint. Help hold head of femur in acetabulum.",
    "basic_functional_movement": "Bringing the first leg out of a car.",
    "sports_heavy_utilization": [
      "Swimming (breaststroke legs)",
      "Soccer"
    ],
    "injury_risks": "Chronically tight muscles.",
    "common_problems": [
      "Person stands with the feet turned out."
    ],
    "strengthening_exercises": [
      "Standing hip twist",
      "Lying hip twist",
      "Isometric glute squeeze (point toes outwards)"
    ],
    "stretching_exercises": [
      "Lying leg-tuck hip stretch",
      "Standing leg-tuck hip stretch",
      "Knee-up rotation stretch"
    ],
    "tags": [
      "Gluteal",
      "DeepLateralRotators",
      "HipRotation"
    ]
  },
  {
    "id": "shoulder_deltoid",
    "muscle_name": "Deltoid",
    "anatomical_region": "Muscles of the Shoulder",
    "latin_origin": "deltoides, shaped like the Greek capital letter delta (Δ)",
    "origin": "Anterior fibers: anterior border of lateral one-third of clavicle. Middle fibers: lateral margin of acromion process. Posterior fibers: inferior edge of crest of spine of scapula.",
    "insertion": "Deltoid tuberosity of humerus",
    "nerve": "Axillary nerve C5, 6",
    "action": "Major abductor of the arm (abducts arm beyond initial 15 degrees, which is done by supraspinatus); anterior fibers assist in flexing the arm; posterior fibers assist in extending the arm.",
    "basic_functional_movement": "Reaching for something out to the side, raising the arm to wave.",
    "sports_heavy_utilization": [
      "Javelin",
      "Shot put",
      "Racket sports",
      "Windsurfing",
      "Weightlifting"
    ],
    "injury_risks": "",
    "common_problems": [],
    "strengthening_exercises": [
      "Arm raise with resistance band",
      "Lateral dumbbell raises",
      "Side plank"
    ],
    "stretching_exercises": [
      "Extended arms shoulder stretch",
      "Parallel-arm shoulder stretch"
    ],
    "tags": [
      "Shoulder",
      "Deltoid",
      "ArmAbduction",
      "ShoulderFlexion",
      "ShoulderExtension"
    ]
  },
  {
    "id": "shoulder_supraspinatus",
    "muscle_name": "Supraspinatus",
    "anatomical_region": "Muscles of the Shoulder — Rotator Cuff",
    "latin_origin": "supra, above; spina, spine",
    "origin": "Medial two-thirds of supraspinous fossa of scapula and deep fascia that covers the muscle.",
    "insertion": "Most superior facet on the greater tubercle of humerus",
    "nerve": "Suprascapular nerve C5, 6",
    "action": "Initiates abduction of arm to 15 degrees at glenohumeral joint (at which point deltoid takes over).",
    "basic_functional_movement": "Holding a shopping bag away from the side of the body.",
    "sports_heavy_utilization": [
      "Baseball",
      "Golf",
      "Racket sports"
    ],
    "injury_risks": "Dislocation of the glenohumeral joint.",
    "common_problems": [
      "Rotator cuff impingement / tendinopathy"
    ],
    "strengthening_exercises": [
      "Shoulder lateral rotation with resistance band",
      "Shoulder lateral rotation with weights",
      "Shoulder abduction initiation"
    ],
    "stretching_exercises": [
      "Isometric shoulder lateral rotation",
      "Hand behind back stretch",
      "Parallel-arm shoulder stretch"
    ],
    "tags": [
      "Shoulder",
      "RotatorCuff",
      "Supraspinatus",
      "AbductionInitiation"
    ]
  },
  {
    "id": "shoulder_infraspinatus",
    "muscle_name": "Infraspinatus",
    "anatomical_region": "Muscles of the Shoulder — Rotator Cuff",
    "latin_origin": "infra, below; spina, spine",
    "origin": "Medial two-thirds of infraspinous fossa of scapula and deep fascia that covers the muscle.",
    "insertion": "Middle facet on posterior surface of greater tubercle of humerus",
    "nerve": "Suprascapular nerve C5, 6",
    "action": "Lateral rotation of arm at glenohumeral joint.",
    "basic_functional_movement": "Brushing back hair.",
    "sports_heavy_utilization": [
      "Backhand racket sports"
    ],
    "injury_risks": "Dislocation of the glenohumeral joint.",
    "common_problems": [
      "Rotator cuff strain"
    ],
    "strengthening_exercises": [
      "Shoulder lateral rotation with resistance band",
      "Shoulder lateral rotation with weights"
    ],
    "stretching_exercises": [
      "Isometric shoulder lateral rotation",
      "Hand behind back stretch"
    ],
    "tags": [
      "Shoulder",
      "RotatorCuff",
      "Infraspinatus",
      "ExternalRotation"
    ]
  },
  {
    "id": "shoulder_teres_minor",
    "muscle_name": "Teres Minor",
    "anatomical_region": "Muscles of the Shoulder — Rotator Cuff",
    "latin_origin": "teres, rounded, finely shaped; minor, smaller",
    "origin": "Upper two-thirds of a strip of bone on posterior surface of scapula immediately adjacent to lateral border of scapula.",
    "insertion": "Inferior facet on greater tubercle of humerus",
    "nerve": "Axillary nerve C5, 6",
    "action": "Lateral rotation of arm at glenohumeral joint.",
    "basic_functional_movement": "Brushing back hair.",
    "sports_heavy_utilization": [
      "Backhand racket sports"
    ],
    "injury_risks": "Dislocation of the glenohumeral joint.",
    "common_problems": [
      "Rotator cuff strain"
    ],
    "strengthening_exercises": [
      "Shoulder lateral rotation with resistance band",
      "Shoulder lateral rotation with weights"
    ],
    "stretching_exercises": [
      "Isometric shoulder lateral rotation",
      "Hand behind back stretch"
    ],
    "tags": [
      "Shoulder",
      "RotatorCuff",
      "TeresMinor",
      "ExternalRotation"
    ]
  },
  {
    "id": "shoulder_subscapularis",
    "muscle_name": "Subscapularis",
    "anatomical_region": "Muscles of the Shoulder — Rotator Cuff",
    "latin_origin": "sub, under; scapularis, relating to the shoulder blade",
    "origin": "Medial two-thirds of subscapular fossa.",
    "insertion": "Lesser tubercle of humerus",
    "nerve": "Upper and lower subscapular nerves C5, 6, (7)",
    "action": "Medial rotation of arm at glenohumeral joint.",
    "basic_functional_movement": "Reaching into the back pocket.",
    "sports_heavy_utilization": [
      "Athletic throwing events",
      "Golf",
      "Racket sports"
    ],
    "injury_risks": "Twisting the arm behind the back (as in an overzealous restraining hold), or struggling to free oneself from that position.",
    "common_problems": [
      "Subscapularis tendon tear or strain"
    ],
    "strengthening_exercises": [
      "Shoulder medial rotation with resistance band (keep elbow tucked in)",
      "Shoulder medial rotation with weights"
    ],
    "stretching_exercises": [
      "Isometric shoulder medial rotation",
      "Lateral rotation arm stretch"
    ],
    "tags": [
      "Shoulder",
      "RotatorCuff",
      "Subscapularis",
      "InternalRotation"
    ]
  },
  {
    "id": "arm_biceps_brachii",
    "muscle_name": "Biceps Brachii",
    "anatomical_region": "Muscles of the Anterior Compartment of the Arm",
    "latin_origin": "biceps, two-headed; brachii, of the arm",
    "origin": "Long head: supraglenoid tubercle of scapula. Short head: tip of coracoid process.",
    "insertion": "Radial tuberosity",
    "nerve": "Musculocutaneous nerve C5, 6",
    "action": "Powerful flexor of forearm at elbow joint. Supinates forearm. Accessory flexor of arm at glenohumeral joint.",
    "basic_functional_movement": "Picking up an object, bringing food to the mouth.",
    "sports_heavy_utilization": [
      "Boxing",
      "Climbing",
      "Canoeing",
      "Rowing"
    ],
    "injury_risks": "Lifting heavy objects too quickly.",
    "common_problems": [
      "Flexion deformity of the elbow (elbow cannot be fully straightened)"
    ],
    "strengthening_exercises": [
      "Biceps curls",
      "Biceps curl with resistance band"
    ],
    "stretching_exercises": [
      "Reverse shoulder stretch",
      "Kneeling reverse shoulder stretch"
    ],
    "tags": [
      "Arm",
      "Biceps",
      "ElbowFlexion",
      "ForearmSupination"
    ]
  },
  {
    "id": "arm_brachialis",
    "muscle_name": "Brachialis",
    "anatomical_region": "Muscles of the Anterior Compartment of the Arm",
    "latin_origin": "brachialis, relating to the arm",
    "origin": "Anterior aspect of humerus (medial and lateral surfaces) and adjacent intermuscular septae.",
    "insertion": "Tuberosity of ulna",
    "nerve": "Musculocutaneous nerve C5, 6. Small contribution by radial nerve (C7) to lateral part of muscle.",
    "action": "Powerful flexor of forearm at elbow joint.",
    "basic_functional_movement": "Bringing food to the mouth.",
    "sports_heavy_utilization": [
      "Baseball",
      "Boxing",
      "Gymnastics"
    ],
    "injury_risks": "",
    "common_problems": [
      "Flexion deformity of the elbow (elbow cannot be fully straightened)"
    ],
    "strengthening_exercises": [
      "Biceps curls",
      "Biceps curl with resistance band"
    ],
    "stretching_exercises": [
      "Reverse shoulder stretch",
      "Kneeling reverse shoulder stretch"
    ],
    "tags": [
      "Arm",
      "Brachialis",
      "ElbowFlexion"
    ]
  },
  {
    "id": "arm_coracobrachialis",
    "muscle_name": "Coracobrachialis",
    "anatomical_region": "Muscles of the Anterior Compartment of the Arm",
    "latin_origin": "korakoeides, raven-like; brachialis, relating to the arm",
    "origin": "Tip of coracoid process.",
    "insertion": "Medial aspect of humerus at mid-shaft.",
    "nerve": "Musculocutaneous nerve C5–7",
    "action": "Flexor of arm at glenohumeral joint.",
    "basic_functional_movement": "Mopping the floor.",
    "sports_heavy_utilization": [
      "Golf",
      "Cricket batting"
    ],
    "injury_risks": "Suddenly hitting the ground when swinging the bat hard in cricket.",
    "common_problems": [],
    "strengthening_exercises": [
      "Front dumbbell raises",
      "Cable arm pull"
    ],
    "stretching_exercises": [
      "Kneeling reverse shoulder stretch (hands on table)"
    ],
    "tags": [
      "Arm",
      "Coracobrachialis",
      "ShoulderFlexion"
    ]
  },
  {
    "id": "arm_triceps_brachii",
    "muscle_name": "Triceps Brachii",
    "anatomical_region": "Muscles of the Posterior Compartment of the Arm",
    "latin_origin": "triceps, three-headed; brachii, of the arm",
    "origin": "Long head: infraglenoid tubercle of scapula. Medial head: posterior surface of humerus (below and medial to radial groove). Lateral head: posterior surface of humerus (above and lateral to radial groove).",
    "insertion": "Posterior part of olecranon process of ulna.",
    "nerve": "Radial nerve C6–8",
    "action": "Extends forearm at elbow joint. Long head can also extend and adduct arm at shoulder joint.",
    "basic_functional_movement": "Throwing objects, pushing a door shut.",
    "sports_heavy_utilization": [
      "Basketball or netball (shooting)",
      "Shot put",
      "Baseball (pitching)",
      "Volleyball"
    ],
    "injury_risks": "Throwing with excessive force.",
    "common_problems": [
      "Extension deformity of elbow (elbow cannot be fully flexed)"
    ],
    "strengthening_exercises": [
      "Press-ups hand close",
      "Seated dips",
      "Triceps kick-back inclined stand",
      "Arms overhead elbow extension"
    ],
    "stretching_exercises": [
      "Overhead triceps stretch"
    ],
    "tags": [
      "Arm",
      "Triceps",
      "ElbowExtension",
      "ShoulderExtension"
    ]
  },
  {
    "id": "forearm_flexor_carpi_ulnaris",
    "muscle_name": "Flexor Carpi Ulnaris",
    "anatomical_region": "Muscles of the Anterior Compartment of the Forearm — Superficial Layer",
    "latin_origin": "flectere, to bend; carpi, of the wrist; ulnaris, relating to the elbow/arm",
    "origin": "Humeral head: medial epicondyle of humerus. Ulnar head: medial border of olecranon and posterior border of upper two-thirds of ulna.",
    "insertion": "Pisiform bone. Hook of hamate. Base of fifth metacarpal.",
    "nerve": "Ulnar nerve C7, 8, T1",
    "action": "Flexes and adducts wrist.",
    "basic_functional_movement": "Pulling an object toward you.",
    "sports_heavy_utilization": [
      "Sailing",
      "Waterskiing",
      "Golf",
      "Baseball",
      "Cricket",
      "Volleyball"
    ],
    "injury_risks": "Over-extending the wrist as a result of breaking a fall with the hand.",
    "common_problems": [
      "Golfer's elbow (overuse tendonitis of the common flexor origin)",
      "Carpal tunnel syndrome"
    ],
    "strengthening_exercises": [
      "Wrist curls",
      "Biceps curls",
      "Isometric wrist and finger flexion"
    ],
    "stretching_exercises": [
      "Assisted stretch into wrist extension",
      "Stretch for wrist and finger flexors"
    ],
    "tags": [
      "Forearm",
      "FlexorCarpiUlnaris",
      "WristFlexion",
      "WristAdduction"
    ]
  },
  {
    "id": "forearm_palmaris_longus",
    "muscle_name": "Palmaris Longus",
    "anatomical_region": "Muscles of the Anterior Compartment of the Forearm — Superficial Layer",
    "latin_origin": "palmaris, relating to the palm; longus, long",
    "origin": "Medial epicondyle of humerus.",
    "insertion": "Palmar aponeurosis of hand.",
    "nerve": "Median nerve C(6), 7, 8",
    "action": "Flexes wrist joint. Tenses palmar fascia.",
    "basic_functional_movement": "Grasping a small ball, cupping the palm to drink from the hand.",
    "sports_heavy_utilization": [
      "Rock climbing",
      "Gymnastics",
      "Racket sports",
      "Volleyball"
    ],
    "injury_risks": "",
    "common_problems": [],
    "strengthening_exercises": [
      "Wrist curls",
      "Isometric wrist and finger flexion"
    ],
    "stretching_exercises": [
      "Assisted stretch into wrist extension",
      "Stretch for wrist and finger flexors"
    ],
    "tags": [
      "Forearm",
      "PalmarisLongus",
      "WristFlexion",
      "PalmarFascia"
    ]
  },
  {
    "id": "forearm_flexor_carpi_radialis",
    "muscle_name": "Flexor Carpi Radialis",
    "anatomical_region": "Muscles of the Anterior Compartment of the Forearm — Superficial Layer",
    "latin_origin": "flectere, to bend; carpi, of the wrist; radius, staff, spoke of wheel",
    "origin": "Medial epicondyle of humerus.",
    "insertion": "Bases of second and third metacarpals.",
    "nerve": "Median nerve C6, 7",
    "action": "Flexes and abducts wrist joint.",
    "basic_functional_movement": "Pulling rope in toward you, wielding an axe or hammer.",
    "sports_heavy_utilization": [
      "Sailing",
      "Waterskiing",
      "Golf",
      "Baseball",
      "Cricket",
      "Volleyball"
    ],
    "injury_risks": "Over-extending the wrist as a result of breaking a fall with the hand.",
    "common_problems": [
      "Golfer's elbow (overuse tendonitis of the common flexor origin)",
      "Carpal tunnel syndrome"
    ],
    "strengthening_exercises": [
      "Wrist curls",
      "Biceps curls",
      "Isometric wrist and finger flexion"
    ],
    "stretching_exercises": [
      "Assisted stretch into wrist extension",
      "Stretch for wrist and finger flexors"
    ],
    "tags": [
      "Forearm",
      "FlexorCarpiRadialis",
      "WristFlexion",
      "WristAbduction"
    ]
  },
  {
    "id": "forearm_pronator_teres",
    "muscle_name": "Pronator Teres",
    "anatomical_region": "Muscles of the Anterior Compartment of the Forearm — Superficial Layer",
    "latin_origin": "pronare, to bend forward; teres, rounded, finely shaped",
    "origin": "Humeral head: medial epicondyle and adjacent supra-epicondylar ridge. Ulnar head: medial border of coronoid process.",
    "insertion": "Mid-lateral surface of radius (pronator tuberosity).",
    "nerve": "Median nerve C6, 7",
    "action": "Pronates forearm.",
    "basic_functional_movement": "Pouring liquid from a container, turning a doorknob.",
    "sports_heavy_utilization": [
      "Cricket batting",
      "Hockey dribbling",
      "Volleyball smash"
    ],
    "injury_risks": "",
    "common_problems": [],
    "strengthening_exercises": [
      "Pronation with hand weight"
    ],
    "stretching_exercises": [
      "Hand weight stretch"
    ],
    "tags": [
      "Forearm",
      "PronatorTeres",
      "ForearmPronation"
    ]
  }
];
