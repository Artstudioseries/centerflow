import React, { useState, useEffect } from 'react';
import { MovementStep, Routine, Stretch } from '../types';
import { sound, SoundscapeType } from '../lib/audio';
import { STRETCHES_DATA } from '../data/stretchesData';

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
  // Steps queue
  const steps: { title: string; durationSeconds: number; description: string; arturoCue?: string; imageUrl?: string }[] = routine
    ? routine.movements.map((m: MovementStep) => {
        const s = STRETCHES_DATA.find((item) => item.id === m.stretchId || item.id === m.id);
        return {
          title: m.name,
          durationSeconds: m.durationSeconds || 120,
          description: m.description,
          arturoCue: m.verbalCue || s?.arturoCue,
          imageUrl: m.imageUrl || s?.imageUrl || routine.imageUrl,
        };
      })
    : stretch
    ? [
        {
          title: stretch.title,
          durationSeconds: stretch.defaultDurationSeconds || 60,
          description: stretch.description,
          arturoCue: stretch.arturoCue,
          imageUrl: stretch.imageUrl,
        },
      ]
    : [
        {
          title: 'Daily Stretch',
          durationSeconds: 60,
          description: 'Breathe deeply and hold.',
          imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxFpH2eOsM80vVtv43n5GXRxdeiS0kf-5FYeHXrxcsvZ-2rXP_6kthEoqo8eTTGMYPASHhe2RkDyyMTaegpEZdVi8wDkvaf_mz0wFd3lufl7Mpq3R4KE91a2VgEmUHPQnGN0AM8RjPW_f7zsbCi5h4YbW_DT9BRJedFR0PG5K2no3HhI0mYapJirM0eUiNK7obnDxcO10nk6bxT7dsLdrdRKZ9uBCM2ciZtom3l5iJ_lxwAGdZ8fYx',
        },
      ];

  const [currentStepIdx, setCurrentStepIdx] = useState(
    initialStepIndex >= 0 && initialStepIndex < steps.length ? initialStepIndex : 0
  );

  const activeStep = steps[currentStepIdx];
  const [timeLeft, setTimeLeft] = useState(activeStep.durationSeconds);
  const [isPlaying, setIsPlaying] = useState(true);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');

  // Ambient Audio & Voice Guidance State
  const [soundscape, setSoundscape] = useState<SoundscapeType>('waves');
  const [volume, setVolume] = useState(0.5);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [showAudioSettings, setShowAudioSettings] = useState(false);

  // Initialize and update ambient soundscape
  useEffect(() => {
    if (isPlaying) {
      sound.startSoundscape(soundscape, volume);
    } else {
      sound.stopSoundscape();
    }
    return () => {
      sound.stopSoundscape();
    };
  }, [soundscape, isPlaying]);

  // Sync volume changes
  useEffect(() => {
    sound.setVolume(volume);
  }, [volume]);

  // Clean up soundscape on modal unmount
  useEffect(() => {
    return () => {
      sound.stopSoundscape();
      sound.stopSpeech();
    };
  }, []);

  // Speak step guidance on step change
  useEffect(() => {
    setTimeLeft(activeStep.durationSeconds);
    setIsPlaying(true);
    sound.playChime(432, 1.5);

    if (voiceEnabled) {
      const textToSpeak = `${activeStep.title}. ${activeStep.arturoCue || activeStep.description}`;
      setTimeout(() => {
        sound.speakText(textToSpeak);
      }, 500);
    }
  }, [currentStepIdx]);

  // Main countdown ticker
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isPlaying && timeLeft === 0) {
      // Step complete
      sound.playCompletion();
      if (currentStepIdx < steps.length - 1) {
        setCurrentStepIdx((idx) => idx + 1);
      } else {
        // Complete whole session!
        sound.stopSoundscape();
        if (voiceEnabled) {
          sound.speakText('Session complete. Take a deep breath and carry this ease into your day.');
        }
        const totalSecs = steps.reduce((acc, s) => acc + s.durationSeconds, 0);
        const mins = Math.max(1, Math.round(totalSecs / 60));
        const sessionTitle = routine ? routine.title : stretch ? stretch.title : 'Quick Stretch';
        onCompleteSession(mins, sessionTitle);
      }
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, timeLeft, currentStepIdx, steps]);

  // Breath rhythm generator (4s inhale, 2s hold, 4s exhale)
  useEffect(() => {
    let breathTimer: NodeJS.Timeout | null = null;
    if (isPlaying) {
      let cycle = 0;
      breathTimer = setInterval(() => {
        cycle = (cycle + 1) % 10;
        if (cycle < 4) setBreathPhase('Inhale');
        else if (cycle < 6) setBreathPhase('Hold');
        else setBreathPhase('Exhale');
      }, 1000);
    }
    return () => {
      if (breathTimer) clearInterval(breathTimer);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    sound.playSoftClick();
    if (isPlaying) {
      sound.stopSoundscape();
      sound.stopSpeech();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    sound.playSoftClick();
    if (currentStepIdx < steps.length - 1) {
      setCurrentStepIdx((idx) => idx + 1);
    } else {
      sound.stopSoundscape();
      const totalSecs = steps.reduce((acc, s) => acc + s.durationSeconds, 0);
      const mins = Math.max(1, Math.round(totalSecs / 60));
      const sessionTitle = routine ? routine.title : stretch ? stretch.title : 'Quick Stretch';
      onCompleteSession(mins, sessionTitle);
    }
  };

  const handlePrev = () => {
    sound.playSoftClick();
    if (currentStepIdx > 0) {
      setCurrentStepIdx((idx) => idx - 1);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Circular SVG Timer Specs
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = timeLeft / activeStep.durationSeconds;
  const strokeDashoffset = circumference - progressRatio * circumference;

  return (
    <div className="fixed inset-0 z-50 bg-[#0F0F10] text-white flex flex-col justify-between p-6 md:p-10 animate-fadeIn">
      {/* Top Header Controls */}
      <div className="flex items-center justify-between w-full max-w-xl mx-auto z-10">
        <button
          onClick={onClose}
          className="p-3 rounded-full bg-[#1A1A1C] border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all active:scale-95 flex items-center gap-1 text-xs font-semibold"
        >
          <span className="material-symbols-outlined text-lg">close</span>
          <span className="hidden sm:inline">Exit Session</span>
        </button>

        <div className="flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-[0.2em] text-blue-400 font-bold">
            {routine ? routine.title : 'Movement Focus'}
          </span>
          <span className="text-xs font-semibold text-gray-300">
            Step {currentStepIdx + 1} of {steps.length}
          </span>
        </div>

        {/* Soundscape & Voice Settings Toggle */}
        <button
          onClick={() => setShowAudioSettings(!showAudioSettings)}
          className={`p-3 rounded-full border transition-all active:scale-95 flex items-center gap-1.5 text-xs font-semibold ${
            showAudioSettings
              ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-900/30'
              : 'bg-[#1A1A1C] border-white/10 text-gray-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <span className="material-symbols-outlined text-lg">graphic_eq</span>
          <span className="hidden sm:inline">Soundscape</span>
        </button>
      </div>

      {/* Audio & Soundscape Settings Control Panel */}
      {showAudioSettings && (
        <div className="w-full max-w-xl mx-auto bg-[#1A1A1C] border border-blue-500/30 rounded-2xl p-4 shadow-2xl flex flex-col gap-4 animate-fadeIn my-2 z-20">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">tune</span>
              Ambient Soundscape & Voice Guidance
            </span>
            <button onClick={() => setShowAudioSettings(false)} className="text-gray-400 hover:text-white">
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {[
              { id: 'waves', name: 'Ocean Waves', icon: 'waves' },
              { id: 'rain', name: 'Gentle Rain', icon: 'water_drop' },
              { id: 'solfeggio', name: '432 Hz Drone', icon: 'graphic_eq' },
              { id: 'bowl', name: 'Tibetan Bowl', icon: 'spa' },
              { id: 'silent', name: 'Mute Audio', icon: 'volume_off' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  sound.playSoftClick();
                  setSoundscape(s.id as SoundscapeType);
                }}
                className={`py-2 px-2 rounded-xl border text-[11px] font-semibold flex flex-col items-center gap-1 transition-all ${
                  soundscape === s.id
                    ? 'bg-blue-600/20 border-blue-500 text-blue-300 shadow-md'
                    : 'bg-[#121214] border-white/5 text-gray-400 hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-base">{s.icon}</span>
                <span>{s.name}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-white/5 text-xs">
            {/* Volume Slider */}
            <div className="flex items-center gap-3 w-full sm:w-1/2">
              <span className="material-symbols-outlined text-gray-400 text-sm">volume_down</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <span className="material-symbols-outlined text-gray-400 text-sm">volume_up</span>
            </div>

            {/* Voice Guidance Toggle */}
            <button
              onClick={() => {
                sound.playSoftClick();
                setVoiceEnabled(!voiceEnabled);
              }}
              className={`px-3 py-1.5 rounded-xl border font-semibold flex items-center gap-2 transition-all ${
                voiceEnabled
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                  : 'bg-white/5 border-white/10 text-gray-400'
              }`}
            >
              <span className="material-symbols-outlined text-sm">
                {voiceEnabled ? 'record_voice_over' : 'voice_over_off'}
              </span>
              <span>Spoken Voice Cues: {voiceEnabled ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Stretch Information & Circular Timer */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4 my-auto">
        <div className="text-center flex flex-col gap-1 max-w-md">
          <h2 className="text-2xl md:text-4xl font-semibold text-white tracking-tight">{activeStep.title}</h2>
          <p className="text-xs md:text-sm text-gray-400 leading-relaxed px-4">{activeStep.description}</p>
        </div>

        {/* Circular Countdown Progress Ring */}
        <div className="relative w-[260px] h-[260px] md:w-[300px] md:h-[300px] flex items-center justify-center my-2">
          {/* Pulsing ambient glow ring */}
          <div
            className={`absolute inset-0 rounded-full bg-blue-600/20 blur-3xl transition-all duration-1000 ${
              breathPhase === 'Inhale' ? 'scale-110 opacity-80' : 'scale-95 opacity-30'
            }`}
          />

          <svg className="w-full h-full -rotate-90 transform">
            {/* Background Track */}
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              className="stroke-white/5"
              strokeWidth="8"
              fill="transparent"
            />
            {/* Animated Progress Ring */}
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              className="stroke-blue-500 transition-all duration-1000 ease-linear"
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Center Timer Text & Breath Guidance */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-5xl md:text-6xl font-light text-white tracking-wider font-mono">
              {formatTime(timeLeft)}
            </span>
            <div className="mt-3 px-4 py-1 rounded-full bg-blue-600/20 border border-blue-500/30 text-[11px] font-semibold text-blue-400 tracking-wider uppercase transition-all duration-700">
              {breathPhase === 'Inhale' && 'Inhale to lengthen...'}
              {breathPhase === 'Hold' && 'Hold softly...'}
              {breathPhase === 'Exhale' && 'Exhale to release...'}
            </div>
          </div>
        </div>

        {/* Arturo's Cue quote if available */}
        {activeStep.arturoCue && (
          <p className="text-center text-xs md:text-sm italic text-blue-300 font-serif max-w-sm px-4">
            "{activeStep.arturoCue}"
          </p>
        )}
      </div>

      {/* Bottom Controls Bar */}
      <div className="flex flex-col items-center gap-4 w-full max-w-xl mx-auto pb-2">
        {/* Progress Bar for multi-step routines */}
        {steps.length > 1 && (
          <div className="w-full bg-[#1A1A1C] h-1.5 rounded-full overflow-hidden flex gap-1 p-0.5 border border-white/5">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-full flex-1 rounded-full transition-all ${
                  i < currentStepIdx
                    ? 'bg-blue-500'
                    : i === currentStepIdx
                    ? 'bg-blue-600'
                    : 'bg-white/10'
                }`}
              />
            ))}
          </div>
        )}

        {/* Playback Controls */}
        <div className="flex items-center gap-6">
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full bg-[#1A1A1C] border border-white/10 text-gray-300 flex items-center justify-center hover:bg-white/10 hover:text-white active:scale-90 transition-all"
            aria-label="Previous step"
          >
            <span className="material-symbols-outlined text-2xl">skip_previous</span>
          </button>

          <button
            onClick={togglePlay}
            className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xl shadow-blue-900/40 hover:bg-blue-500 active:scale-95 transition-all"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>

          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full bg-[#1A1A1C] border border-white/10 text-gray-300 flex items-center justify-center hover:bg-white/10 hover:text-white active:scale-90 transition-all"
            aria-label="Next step"
          >
            <span className="material-symbols-outlined text-2xl">skip_next</span>
          </button>
        </div>
      </div>
    </div>
  );
};
