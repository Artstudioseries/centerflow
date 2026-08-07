import React, { useState, useEffect, useRef } from 'react';
import { MovementStep, Routine, Stretch } from '../types';
import { sound } from '../lib/audio';
import { STRETCHES_DATA } from '../data/stretchesData';

export interface NormalizedStep {
  title: string;
  durationSeconds: number;
  description: string;
  instructions: string[];
  arturoCue?: string;
  imageUrl: string;
  muscleGroups: string[];
  formTip?: string;
  breathingFocus?: string;
}

interface ActiveTimerModalProps {
  routine?: Routine;
  stretch?: Stretch;
  initialStepIndex?: number;
  onClose: () => void;
  onCompleteSession: (minutes: number, title: string) => void;
}

export const ActiveTimerModal: React.FC<ActiveTimerModalProps> = ({
  routine,
  stretch,
  initialStepIndex = 0,
  onClose,
  onCompleteSession,
}) => {
  // Build normalized steps queue
  const steps: NormalizedStep[] = routine
    ? routine.movements.map((m: MovementStep) => {
        const s = STRETCHES_DATA.find((item) => item.id === m.stretchId || item.id === m.id);
        const instructions = s?.instructions && s.instructions.length > 0 
          ? s.instructions 
          : [m.description, 'Maintain a relaxed breath rhythm.', 'Gently release posture when complete.'];
        return {
          title: m.name,
          durationSeconds: m.durationSeconds || 120,
          description: m.description,
          instructions,
          arturoCue: m.verbalCue || s?.arturoCue,
          imageUrl: m.imageUrl || s?.imageUrl || routine.imageUrl,
          muscleGroups: m.muscleGroups || s?.muscleGroups || ['Full Body'],
          formTip: s?.formTip,
          breathingFocus: s?.breathingFocus,
        };
      })
    : stretch
    ? [
        {
          title: stretch.title,
          durationSeconds: stretch.defaultDurationSeconds || 60,
          description: stretch.description,
          instructions: stretch.instructions && stretch.instructions.length > 0
            ? stretch.instructions
            : [stretch.description, 'Focus on steady nasal breathing.', 'Keep shoulders relaxed.'],
          arturoCue: stretch.arturoCue,
          imageUrl: stretch.imageUrl,
          muscleGroups: stretch.muscleGroups || ['Full Body'],
          formTip: stretch.formTip,
          breathingFocus: stretch.breathingFocus,
        },
      ]
    : [
        {
          title: 'Daily Stretch',
          durationSeconds: 60,
          description: 'Breathe deeply and hold.',
          instructions: [
            'Find a balanced, comfortable grounded posture.',
            'Inhale to expand your ribcage; hold softly at the top.',
            'Exhale to melt remaining muscle tension into the floor.'
          ],
          arturoCue: '"Lengthen through the crown of your head."',
          imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxFpH2eOsM80vVtv43n5GXRxdeiS0kf-5FYeHXrxcsvZ-2rXP_6kthEoqo8eTTGMYPASHhe2RkDyyMTaegpEZdVi8wDkvaf_mz0wFd3lufl7Mpq3R4KE91a2VgEmUHPQnGN0AM8RjPW_f7zsbCi5h4YbW_DT9BRJedFR0PG5K2no3HhI0mYapJirM0eUiNK7obnDxcO10nk6bxT7dsLdrdRKZ9uBCM2ciZtom3l5iJ_lxwAGdZ8fYx',
          muscleGroups: ['Spine', 'Shoulders', 'Lats'],
        },
      ];

  const [currentStepIdx, setCurrentStepIdx] = useState(
    initialStepIndex >= 0 && initialStepIndex < steps.length ? initialStepIndex : 0
  );

  const activeStep = steps[currentStepIdx];
  const [timeLeft, setTimeLeft] = useState(activeStep.durationSeconds);
  const [isPlaying, setIsPlaying] = useState(true);
  const [audioMuted, setAudioMuted] = useState(false);
  const [getReadyCount, setGetReadyCount] = useState<number | null>(3); // 3-2-1 countdown before exercise starts

  // Breath rhythm phase state: Inhale (4s), Hold (2s), Exhale (6s) -> 12s total cycle
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [breathSeconds, setBreathSeconds] = useState(4); // remaining in cycle phase

  // Active instruction index for Karaoke lyrics highlight with EQUAL TIME SPLITTING
  const progressRatio = activeStep.durationSeconds > 0 ? timeLeft / activeStep.durationSeconds : 0;
  const timeElapsed = Math.max(0, activeStep.durationSeconds - timeLeft);
  const numCues = activeStep.instructions.length > 0 ? activeStep.instructions.length : 1;
  const cueDuration = activeStep.durationSeconds / numCues;
  const activeInstructionIdx = Math.min(
    numCues - 1,
    Math.floor(timeElapsed / cueDuration)
  );

  // Bilateral Side Tracking (Left Leg / Right Leg or Side 1 / Side 2)
  const isBilateral = true; // Most stretches involve two sides or legs
  const halfTimeSecs = Math.floor(activeStep.durationSeconds / 2);
  const isSecondHalf = timeElapsed >= halfTimeSecs && activeStep.durationSeconds >= 20;

  const karaokeContainerRef = useRef<HTMLDivElement>(null);

  // Scroll active karaoke instruction into view smoothly
  useEffect(() => {
    if (karaokeContainerRef.current) {
      const activeEl = karaokeContainerRef.current.children[activeInstructionIdx] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [activeInstructionIdx]);

  const prevCueRef = useRef<number>(0);
  // Play subtle chime when active cue updates as time runs down
  useEffect(() => {
    if (activeInstructionIdx !== prevCueRef.current) {
      if (isPlaying && getReadyCount === null && !audioMuted) {
        sound.playSoftClick();
      }
      prevCueRef.current = activeInstructionIdx;
    }
  }, [activeInstructionIdx, isPlaying, getReadyCount, audioMuted]);

  // Half-time Side Switch chime trigger
  useEffect(() => {
    if (isPlaying && getReadyCount === null && timeElapsed === halfTimeSecs && activeStep.durationSeconds >= 20 && !audioMuted) {
      sound.playChime(660, 1.2);
    }
  }, [timeElapsed, halfTimeSecs, isPlaying, getReadyCount, audioMuted, activeStep.durationSeconds]);

  // Reset timer on step index change & initiate Get Ready 3-2-1 countdown
  useEffect(() => {
    setTimeLeft(activeStep.durationSeconds);
    setGetReadyCount(3);
    setIsPlaying(true);
    if (!audioMuted) {
      sound.playChime(432, 1.5);
    }
  }, [currentStepIdx]);

  // 1. "Get Ready" 3-2-1 Prep Countdown Ticker
  useEffect(() => {
    if (!isPlaying || getReadyCount === null) return;

    const prepTimer = setInterval(() => {
      setGetReadyCount((prev) => {
        if (prev === null || prev <= 1) {
          if (!audioMuted) sound.playChime(528, 1.2);
          return null; // Prep finished -> starts main exercise timer
        }
        if (!audioMuted) sound.playCountdownBeep();
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(prepTimer);
  }, [isPlaying, getReadyCount === null, audioMuted]);

  // 2. Main Exercise Countdown Ticker (durationSeconds -> 0)
  useEffect(() => {
    if (!isPlaying || getReadyCount !== null || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1;
        if (next <= 3 && next > 0 && !audioMuted) {
          sound.playCountdownBeep();
        }
        return Math.max(0, next);
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, getReadyCount, audioMuted, timeLeft > 0]);

  // 3. Step Completion & Routine Auto-Advance when timer reaches 0
  useEffect(() => {
    if (timeLeft === 0 && getReadyCount === null && isPlaying) {
      if (!audioMuted) sound.playCompletion();

      const advanceTimeout = setTimeout(() => {
        if (currentStepIdx < steps.length - 1) {
          setCurrentStepIdx((idx) => idx + 1);
        } else {
          // Entire routine or stretch session completed!
          const totalSecs = steps.reduce<number>((acc, s) => acc + s.durationSeconds, 0);
          const mins = Math.max(1, Math.round(totalSecs / 60));
          const sessionTitle = routine ? routine.title : stretch ? stretch.title : 'Quick Stretch';
          onCompleteSession(mins, sessionTitle);
        }
      }, 1000); // 1-second hold at 00:00 for visual satisfaction

      return () => clearTimeout(advanceTimeout);
    }
  }, [timeLeft, getReadyCount, isPlaying, currentStepIdx, steps.length, audioMuted, routine, stretch, onCompleteSession]);

  // Rhythmic Breath Cycle: 4s Inhale -> 2s Hold -> 6s Exhale (12s total)
  useEffect(() => {
    let breathTimer: NodeJS.Timeout | null = null;
    if (isPlaying) {
      let cycle = 0;
      breathTimer = setInterval(() => {
        cycle = (cycle + 1) % 12;
        if (cycle < 4) {
          setBreathPhase('Inhale');
          setBreathSeconds(4 - cycle);
          if (cycle === 0 && !audioMuted) sound.playBreathCue('Inhale');
        } else if (cycle < 6) {
          setBreathPhase('Hold');
          setBreathSeconds(6 - cycle);
          if (cycle === 4 && !audioMuted) sound.playBreathCue('Hold');
        } else {
          setBreathPhase('Exhale');
          setBreathSeconds(12 - cycle);
          if (cycle === 6 && !audioMuted) sound.playBreathCue('Exhale');
        }
      }, 1000);
    }
    return () => {
      if (breathTimer) clearInterval(breathTimer);
    };
  }, [isPlaying, audioMuted]);

  const togglePlay = () => {
    if (!audioMuted) sound.playSoftClick();
    setIsPlaying(!isPlaying);
  };

  const handleResetMove = () => {
    if (!audioMuted) sound.playChime(528, 1.0);
    setTimeLeft(activeStep.durationSeconds);
    setIsPlaying(true);
  };

  const handleNext = () => {
    if (!audioMuted) sound.playSoftClick();
    if (currentStepIdx < steps.length - 1) {
      setCurrentStepIdx((idx) => idx + 1);
    } else {
      const totalSecs = steps.reduce<number>((acc, s) => acc + s.durationSeconds, 0);
      const mins = Math.max(1, Math.round(totalSecs / 60));
      const sessionTitle = routine ? routine.title : stretch ? stretch.title : 'Quick Stretch';
      onCompleteSession(mins, sessionTitle);
    }
  };

  const handlePrev = () => {
    if (!audioMuted) sound.playSoftClick();
    if (currentStepIdx > 0) {
      setCurrentStepIdx((idx) => idx - 1);
    } else {
      setTimeLeft(activeStep.durationSeconds);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0A0A0C]/95 backdrop-blur-3xl flex flex-col justify-between p-4 sm:p-6 md:p-8 select-none overflow-y-auto">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between w-full max-w-2xl mx-auto pt-2">
        <button
          onClick={() => {
            if (!audioMuted) sound.playSoftClick();
            onClose();
          }}
          className="p-3 text-gray-300 hover:text-white rounded-2xl bg-[#1A1A1C] border border-white/10 transition-all hover:bg-white/10"
          aria-label="Close timer"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        <div className="text-center flex flex-col items-center">
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-blue-400">
            {routine ? `ROUTINE: ${routine.title}` : 'GUIDED STRETCH SESSION'}
          </span>
          <p className="text-xs font-medium text-gray-300 mt-0.5">
            Step <span className="text-blue-400 font-bold">{currentStepIdx + 1}</span> of {steps.length}
          </p>
        </div>

        <button
          onClick={() => {
            setAudioMuted(!audioMuted);
            if (audioMuted) sound.playChime(528, 1.0);
          }}
          className={`p-3 rounded-2xl border transition-all ${
            audioMuted
              ? 'bg-red-500/10 border-red-500/30 text-red-400'
              : 'bg-[#1A1A1C] border-white/10 text-blue-400 hover:text-white'
          }`}
          aria-label="Toggle audio chimes"
          title={audioMuted ? 'Unmute Audio Chimes' : 'Mute Audio Chimes'}
        >
          <span className="material-symbols-outlined text-xl">
            {audioMuted ? 'volume_off' : 'volume_up'}
          </span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col items-center justify-center my-auto py-2 gap-5 max-w-2xl mx-auto w-full">
        {/* Active Target Muscles & Step Title */}
        <div className="text-center px-4 flex flex-col items-center gap-2">
          {/* Side Indicator & Muscle Target Highlighting Badges */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {/* Bilateral Side Guidance Badge */}
            {activeStep.durationSeconds >= 20 && (
              <div
                className={`px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border flex items-center gap-1.5 transition-all shadow-md ${
                  isSecondHalf
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                    : 'bg-blue-600/20 text-blue-300 border-blue-500/40'
                }`}
              >
                <span className="material-symbols-outlined text-xs">compare_arrows</span>
                <span>{isSecondHalf ? 'Side 2: RIGHT SIDE' : 'Side 1: LEFT SIDE'}</span>
                <span className="text-[10px] opacity-75">({halfTimeSecs}s / side)</span>
              </div>
            )}

            <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 flex items-center gap-1">
              <span className="material-symbols-outlined text-xs text-blue-400">accessibility_new</span>
              Targets:
            </span>
            {activeStep.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-500/15 text-blue-300 border border-blue-500/30 shadow-sm"
              >
                {muscle}
              </span>
            ))}
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{activeStep.title}</h2>
        </div>

        {/* Multi-Stage Visual Carousel & Linear Timer Line Section */}
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-5 w-full my-1">
          {/* Exercise Visual Multi-Stage Carousel Card */}
          <div className="relative w-full md:w-52 h-48 sm:h-56 md:h-auto rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-[#141416] shrink-0 group">
            <img
              src={activeStep.imageUrl}
              alt={activeStep.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-transparent opacity-80" />

            {/* Stage Indicator Badge */}
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-bold uppercase tracking-wider text-blue-300 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
              Stage {activeInstructionIdx + 1}/{activeStep.instructions.length}
            </div>

            {/* Form Tip Overlay */}
            {activeStep.formTip && (
              <div className="absolute bottom-2 inset-x-2 p-2 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 text-[10px] text-gray-200 line-clamp-2 leading-tight">
                <span className="text-blue-400 font-bold">Form Tip: </span>
                {activeStep.formTip}
              </div>
            )}
          </div>

          {/* Main Exercise Line Timer Card */}
          <div className="flex-1 w-full bg-[#141417] border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col items-center justify-between relative overflow-hidden min-h-[220px]">
            {/* Top Display: Get Ready OR Timer Remaining */}
            {getReadyCount !== null ? (
              <div className="flex flex-col items-center justify-center py-4 my-auto">
                <span className="text-xs uppercase tracking-[0.2em] text-amber-400 font-semibold mb-1">
                  Get Ready
                </span>
                <span className="text-6xl font-bold text-amber-300 font-mono tracking-widest">
                  {getReadyCount}
                </span>
                <button
                  onClick={() => setGetReadyCount(null)}
                  className="mt-3 text-xs font-medium text-gray-300 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-1 rounded-full border border-white/10 transition-all"
                >
                  Start Now
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center w-full my-auto">
                {/* Big Digital Countdown */}
                <span className="text-6xl sm:text-7xl font-light text-white tracking-wider font-mono">
                  {formatTime(timeLeft)}
                </span>
                <span className="text-xs uppercase tracking-[0.2em] text-gray-400 mt-1 font-medium">
                  Remaining
                </span>

                {/* Clean, Simple Progress Line */}
                <div className="w-full mt-5 px-2">
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden relative">
                    <div
                      className="h-full rounded-full bg-blue-500 transition-all duration-1000 ease-linear"
                      style={{ width: `${Math.min(100, Math.max(0, progressRatio * 100))}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono text-gray-400 mt-2 px-0.5">
                    <span>{formatTime(timeElapsed)}</span>
                    <span className="text-blue-400 font-medium">{Math.round(progressRatio * 100)}%</span>
                    <span>{formatTime(activeStep.durationSeconds)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Playback Controls directly under timer */}
            <div className="flex items-center justify-center gap-4 w-full pt-4 mt-2 border-t border-white/10">
              <button
                onClick={handleResetMove}
                className="w-11 h-11 rounded-xl bg-[#1C1C20] border border-white/10 text-amber-400 flex items-center justify-center hover:bg-amber-500/10 hover:border-amber-500/30 active:scale-95 transition-all"
                aria-label="Reset current movement"
                title="Reset movement"
              >
                <span className="material-symbols-outlined text-xl">restart_alt</span>
              </button>

              <button
                onClick={handlePrev}
                className="w-11 h-11 rounded-xl bg-[#1C1C20] border border-white/10 text-gray-300 flex items-center justify-center hover:bg-white/10 hover:text-white active:scale-95 transition-all"
                aria-label="Previous step"
                title="Previous step"
              >
                <span className="material-symbols-outlined text-xl">skip_previous</span>
              </button>

              <button
                onClick={togglePlay}
                className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-900/40 hover:bg-blue-500 active:scale-95 transition-all"
                aria-label={isPlaying ? 'Pause' : 'Play'}
                title={isPlaying ? 'Pause' : 'Resume'}
              >
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {isPlaying ? 'pause' : 'play_arrow'}
                </span>
              </button>

              <button
                onClick={handleNext}
                className="w-11 h-11 rounded-xl bg-[#1C1C20] border border-white/10 text-gray-300 flex items-center justify-center hover:bg-white/10 hover:text-white active:scale-95 transition-all"
                aria-label="Next step"
                title="Next step"
              >
                <span className="material-symbols-outlined text-xl">skip_next</span>
              </button>
            </div>
          </div>
        </div>

        {/* SEPARATE BREATH & HOLD PACING MODULE */}
        <div className="w-full bg-[#141417] border border-white/10 rounded-2xl p-4 flex flex-col gap-3 shadow-xl">
          <div className="flex items-center justify-between pb-1.5 border-b border-white/5">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-400 text-lg">air</span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                Breath & Hold Rhythm Pacer
              </span>
            </div>
            <span className="text-[10px] font-mono text-gray-400 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/5">
              12s Diaphragmatic Cycle
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            {/* Inhale Phase Box */}
            <div
              className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all ${
                breathPhase === 'Inhale'
                  ? 'bg-blue-600/20 border-blue-400/60 text-white shadow-lg scale-[1.02]'
                  : 'bg-[#18181B] border-white/5 text-gray-500 opacity-60'
              }`}
            >
              <div className="flex items-center gap-1 mb-1">
                <span className="material-symbols-outlined text-sm text-blue-400">arrow_upward</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300">Inhale</span>
              </div>
              <span className="text-xs font-mono font-bold text-white">
                {breathPhase === 'Inhale' ? `${breathSeconds}s` : '4s'}
              </span>
            </div>

            {/* Hold Breath Phase Box (SEPARATED & HIGHLIGHTED) */}
            <div
              className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all ${
                breathPhase === 'Hold'
                  ? 'bg-amber-500/25 border-amber-400/80 text-white shadow-lg scale-[1.04] ring-2 ring-amber-400/30'
                  : 'bg-[#18181B] border-white/5 text-gray-500 opacity-60'
              }`}
            >
              <div className="flex items-center gap-1 mb-1">
                <span className="material-symbols-outlined text-sm text-amber-400">pause_circle</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">Hold</span>
              </div>
              <span className="text-xs font-mono font-bold text-white">
                {breathPhase === 'Hold' ? `${breathSeconds}s` : '2s'}
              </span>
            </div>

            {/* Exhale Phase Box */}
            <div
              className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all ${
                breathPhase === 'Exhale'
                  ? 'bg-emerald-600/20 border-emerald-400/60 text-white shadow-lg scale-[1.02]'
                  : 'bg-[#18181B] border-white/5 text-gray-500 opacity-60'
              }`}
            >
              <div className="flex items-center gap-1 mb-1">
                <span className="material-symbols-outlined text-sm text-emerald-400">arrow_downward</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">Exhale</span>
              </div>
              <span className="text-xs font-mono font-bold text-white">
                {breathPhase === 'Exhale' ? `${breathSeconds}s` : '6s'}
              </span>
            </div>
          </div>
        </div>

        {/* Real-time Guidance Cues - Carousel & Active Spotlight Stage Card */}
        <div className="w-full bg-gradient-to-b from-[#16161A] via-[#121215] to-[#0E0E11] border border-blue-500/30 rounded-2xl p-4 sm:p-5 flex flex-col gap-3 shadow-2xl relative overflow-hidden">
          {/* Header Bar with View Mode & Cue Counter */}
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-blue-400">graphic_eq</span>
                Real-Time Cue Carousel
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-gray-300 bg-blue-600/20 px-2.5 py-0.5 rounded-full border border-blue-500/30 font-semibold">
                Step {activeInstructionIdx + 1} of {numCues}
              </span>
            </div>
          </div>

          {/* Active Cue Spotlight Hero Card */}
          <div className="relative bg-[#1A1A1E] border border-blue-500/40 rounded-xl p-4 flex flex-col gap-2.5 shadow-lg overflow-hidden group">
            {/* Cue Stage Micro Progress Bar */}
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-amber-400 transition-all duration-1000 ease-linear"
                style={{
                  width: `${Math.min(
                    100,
                    Math.max(
                      0,
                      (((timeElapsed % cueDuration) + 1) / cueDuration) * 100
                    )
                  )}%`,
                }}
              />
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-md border border-blue-400/40">
                {activeInstructionIdx + 1}
              </div>

              <div className="flex flex-col gap-1 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                    CURRENT MOVEMENT CUE
                  </span>
                  <span className="text-[10px] font-mono text-gray-400">
                    ~{Math.max(1, Math.ceil(cueDuration - (timeElapsed % cueDuration)))}s remaining
                  </span>
                </div>
                <p className="text-sm sm:text-base font-medium text-white leading-relaxed">
                  {activeStep.instructions[activeInstructionIdx] || activeStep.description}
                </p>
              </div>
            </div>
          </div>

          {/* Carousel Pipeline Navigation Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {activeStep.instructions.map((inst, idx) => {
              const isActive = idx === activeInstructionIdx;
              const isPast = idx < activeInstructionIdx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    // Jump to that cue's time offset
                    const targetTime = activeStep.durationSeconds - idx * cueDuration;
                    setTimeLeft(Math.max(1, targetTime));
                  }}
                  className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-blue-600 text-white border-blue-400 shadow-md font-bold scale-[1.02]'
                      : isPast
                      ? 'bg-[#18181B] text-gray-400 border-white/5 opacity-70 hover:opacity-100'
                      : 'bg-[#18181B] text-gray-300 border-white/10 hover:border-blue-500/30'
                  }`}
                  title={`Jump to Step ${idx + 1}`}
                >
                  <span
                    className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center ${
                      isActive
                        ? 'bg-white text-blue-600 font-bold'
                        : isPast
                        ? 'bg-white/10 text-gray-400'
                        : 'bg-white/15 text-gray-300'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <span className="max-w-[120px] truncate">{inst}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Arturo's Coaching Cue quote if available */}
        {activeStep.arturoCue && (
          <div className="bg-gradient-to-r from-blue-950/30 via-[#18181B] to-blue-950/30 border border-blue-500/20 rounded-xl px-4 py-2.5 flex items-center gap-3 text-center w-full justify-center">
            <span className="material-symbols-outlined text-blue-400 text-lg">record_voice_over</span>
            <p className="text-xs sm:text-sm italic text-blue-200 font-serif">
              {activeStep.arturoCue}
            </p>
          </div>
        )}
      </div>

      {/* Bottom Step Progress Bar */}
      {steps.length > 1 && (
        <div className="w-full max-w-2xl mx-auto pb-2">
          <div className="w-full bg-[#1A1A1C] h-2 rounded-full overflow-hidden flex gap-1 p-0.5 border border-white/10 shadow-inner">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-full flex-1 rounded-full transition-all duration-500 ${
                  i < currentStepIdx
                    ? 'bg-blue-500'
                    : i === currentStepIdx
                    ? 'bg-blue-400 animate-pulse'
                    : 'bg-white/10'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

