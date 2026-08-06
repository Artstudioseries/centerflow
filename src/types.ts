export type TabType = 'home' | 'search' | 'routines' | 'profile';

export type ScreenView = 
  | { type: 'tab'; tab: TabType }
  | { type: 'routine_detail'; routineId: string }
  | { type: 'stretch_detail'; stretchId: string }
  | { type: 'philosophy' }
  | { type: 'active_timer'; routineId?: string; stretchId?: string; initialStepIndex?: number };

export interface MovementStep {
  id: string;
  stretchId?: string;
  name: string;
  durationMinutes: number; // e.g., 1.5, 2, 2.5
  durationSeconds: number; // e.g. 90, 120, 150
  description: string;
  muscleGroups: string[];
  iconName?: string;
  imageUrl?: string;
  animationUrl?: string;
  verbalCue?: string;
  audioUrl?: string;
  phase?: string;
}

export interface Stretch {
  id: string;
  title: string;
  category: string; // e.g., "Lower Body", "Upper Body"
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  primaryFocus: string;
  description: string;
  imageUrl: string;
  durationLabel: string; // e.g., "3-5 slow breaths", "1 Min", "20 sec"
  defaultDurationSeconds: number;
  instructions: string[];
  arturoCue: string;
  breathingFocus: string;
  safetyNote?: string;
  formTip?: string;
  muscleGroups: string[];
  tags?: string[];
  isSaved?: boolean;
}

export interface Routine {
  id: string;
  title: string;
  subtitle: string;
  movementsCount: number;
  durationMinutes: number;
  category: 'Daily' | 'Desktop' | 'Upper Body' | 'Lower Body' | 'Recovery';
  description: string;
  imageUrl: string;
  movements: MovementStep[];
  badge?: string; // e.g. "Recovery", "3 MOVEMENTS"
  tags?: string[];
}

export interface ActivityLogItem {
  id: string;
  title: string;
  dateLabel: string; // e.g., "Today • 15 min"
  durationMinutes: number;
  timestamp: number;
  iconType: 'nightlight' | 'wb_sunny' | 'airline_seat_recline_extra' | 'self_improvement' | 'fitness_center';
}

export interface UserProfile {
  name: string;
  email?: string;
  firebaseUid?: string;
  memberSince: string;
  avatarUrl: string;
  totalStretches: number;
  minutesRelaxed: number;
  dayStreak: number;
  savedStretchIds: string[];
  patronTier?: 'friend' | 'supporter' | 'guardian' | null;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  stripeProductId?: string;
  stripePriceId?: string;
  paymentStatus?: 'paid' | 'unpaid' | 'failed' | 'canceled' | 'pending' | 'none';
  membershipStatus?: 'active' | 'canceled' | 'past_due' | 'unpaid' | 'gift_active' | 'expired' | 'friend' | 'none';
  membershipExpiresAt?: string;
  purchasedGiftCode?: string;
  redeemedGiftCode?: string;
  recentActivity: ActivityLogItem[];
  settings: {
    audioEnabled: boolean;
    breathGuidance: boolean;
    darkMode: boolean;
    dailyReminder: boolean;
  };
}

export interface CategoryCard {
  id: string;
  title: string;
  icon: string;
  imageUrl: string;
  routineId?: string;
  searchTag?: string;
}

export interface Principle {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface MuscleAnatomy {
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
  strengthening_exercises: string[];
  stretching_exercises: string[];
  tags: string[];
}

export interface MasterExercise {
  exercise_id: string;
  name: string;
  type: 'strengthening' | 'stretching' | 'hybrid';
  equipment: string;
}

export interface MasterMuscle {
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

export interface MasterLibraryPayload {
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
