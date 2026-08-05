import React, { useState, useEffect } from 'react';
import { Routine, Stretch } from '../types';

interface ActiveTimerModalProps {
  routine?: Routine;
  stretch?: Stretch;
  initialStepIndex?: number;
  onClose: () => void;
  onCompleteSession: (minutes: number, sessionTitle: string) => void;
}

export const ActiveTimerModal: React.FC<ActiveTimerModalProps> = ({
  routine,
  stretch,
  initialStepIndex = 0,
  onClose,
  onCompleteSession,
}) => {
  const isRoutine = !!routine;
  const steps = isRoutine ? routine.movements : [];
  const [currentStepIndex, setCurrentStepIndex] = useState(initialStepIndex);

  const stepDuration = isRoutine
    ? steps[currentStepIndex]?.durationSeconds || 90
    : stretch?.defaultDurationSeconds || 60;

  const [secondsRemaining, setSecondsRemaining] = useState(stepDuration);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    setSecondsRemaining(stepDuration);
  }, [currentStepIndex, stepDuration]);

  useEffect(() => {
    let interval: any = null;
    if (isRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0) {
      if (isRoutine && currentStepIndex < steps.length - 1) {
        setCurrentStepIndex((prev) => prev + 1);
      } else {
        // Complete session
        const totalMins = isRoutine ? routine.durationMinutes : Math.ceil(stepDuration / 60);
        onCompleteSession(totalMins, isRoutine ? routine.title : stretch?.title || 'Session');
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsRemaining, isRoutine, currentStepIndex, steps.length, routine, stretch, onCompleteSession, stepDuration]);

  const currentStep = isRoutine ? steps[currentStepIndex] : null;

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = Math.min(
    100,
    Math.max(0, ((stepDuration - secondsRemaining) / stepDuration) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 bg-[#0F0F10] text-white flex flex-col justify-between p-6 md:p-12 animate-fadeIn">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">
            {isRoutine ? `Routine: ${routine.title}` : `Stretch: ${stretch?.title}`}
          </span>
          {isRoutine && (
            <span className="text-xs text-gray-400">
              Step {currentStepIndex + 1} of {steps.length}
            </span>
          )}
        </div>

        <button
          onClick={onClose}
          className="p-2.5 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      </div>

      {/* Main Timer Display */}
      <div className="flex flex-col items-center justify-center text-center my-auto gap-6">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight max-w-lg">
          {isRoutine ? currentStep?.name : stretch?.title}
        </h2>
        <p className="text-xs md:text-sm text-gray-400 max-w-md leading-relaxed">
          {isRoutine ? currentStep?.description : stretch?.primaryFocus}
        </p>

        {/* Circular / Line Progress Timer */}
        <div className="flex flex-col items-center gap-4 my-4">
          <div className="text-6xl md:text-8xl font-black font-mono tracking-wider text-blue-400">
            {formatTime(secondsRemaining)}
          </div>

          <div className="w-64 md:w-80 h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 mt-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-xl shadow-blue-900/40 transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-2xl">
              {isRunning ? 'pause' : 'play_arrow'}
            </span>
          </button>

          {isRoutine && currentStepIndex < steps.length - 1 && (
            <button
              onClick={() => setCurrentStepIndex((prev) => prev + 1)}
              className="px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-gray-300 font-semibold text-xs transition-all"
            >
              Skip Step
            </button>
          )}
        </div>
      </div>

      {/* Footer Instructions */}
      <div className="p-4 bg-[#1A1A1C] rounded-2xl border border-white/5 text-center text-xs text-gray-400">
        Focus on slow, deep nasal diaphragmatic breathing. Never force into sharp pain.
      </div>
    </div>
  );
};
