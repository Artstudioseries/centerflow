import React, { useState } from 'react';
import { UserProfile } from '../types';
import { TIERS } from './PatronModal';

interface ProfileScreenProps {
  userProfile: UserProfile;
  onToggleSetting: (key: keyof UserProfile['settings']) => void;
  onOpenSavedStretches: () => void;
  onOpenPatronModal?: () => void;
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  userProfile,
  onToggleSetting,
  onOpenSavedStretches,
  onOpenPatronModal,
  onLogout,
}) => {
  const [showAllHistory, setShowAllHistory] = useState(false);

  const activePatronTier = TIERS.find((t) => t.id === userProfile.patronTier);

  const displayedHistory = showAllHistory
    ? userProfile.recentActivity
    : userProfile.recentActivity.slice(0, 3);

  return (
    <div className="w-full max-w-[1200px] mx-auto px-5 md:px-16 pt-6 pb-32 flex flex-col gap-10">
      {/* Header */}
      <section className="flex flex-col gap-1">
        <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight">
          Your <span className="font-semibold text-white">Profile</span>
        </h2>
      </section>

      {/* User Avatar Card */}
      <section className="bg-[#1A1A1C] rounded-2xl p-6 border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-blue-500/50 shrink-0 bg-[#121214] relative">
            <img
              src={userProfile.avatarUrl}
              alt={userProfile.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-2xl font-semibold text-white tracking-tight">{userProfile.name}</h3>
              {activePatronTier ? (
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold shadow-md ${activePatronTier.badgeClasses}`}>
                  <span className="material-symbols-outlined text-sm">{activePatronTier.badgeIcon}</span>
                  <span>{activePatronTier.badgeName}</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold shadow-md bg-blue-500/15 text-blue-300 border-blue-500/30">
                  <span className="material-symbols-outlined text-sm">verified_user</span>
                  <span>CenterFlow Friend</span>
                </span>
              )}
            </div>
            <p className="text-sm text-gray-400">Member since {userProfile.memberSince}</p>
          </div>
        </div>

        {onOpenPatronModal && (
          <button
            onClick={onOpenPatronModal}
            className="flex items-center gap-2 bg-blue-600/15 hover:bg-blue-600/25 border border-blue-500/30 text-blue-400 hover:text-blue-300 font-semibold text-xs py-2.5 px-4 rounded-xl transition-all active:scale-95 shrink-0"
          >
            <span className="material-symbols-outlined text-sm">favorite</span>
            <span>{activePatronTier ? 'Change Sponsorship' : 'Patron & Gift'}</span>
          </button>
        )}
      </section>

      {/* Sponsor CenterFlow Card */}
      {onOpenPatronModal && (
        <section
          onClick={onOpenPatronModal}
          className="bg-gradient-to-r from-[#18181C] via-[#141418] to-[#101014] rounded-2xl p-6 border border-white/10 hover:border-blue-500/40 transition-all cursor-pointer shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-2xl">favorite</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">Patron & Gift Membership</span>
              <h3 className="text-lg font-bold text-white tracking-tight">Sponsor CenterFlow</h3>
              <p className="text-xs text-gray-400 max-w-xl leading-relaxed">
                CenterFlow is an independent body relief platform. Support development or gift a membership to a friend or coworker dealing with desk fatigue.
              </p>
            </div>
          </div>

          <button className="shrink-0 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs py-2.5 px-5 rounded-xl transition-all flex items-center gap-1.5 shadow-md group-hover:translate-x-0.5">
            <span>Support</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </section>
      )}

      {/* Bento Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Stretches */}
        <div className="bg-[#1A1A1C] rounded-2xl p-6 border border-white/5 flex items-center justify-between shadow-md hover:border-blue-500/30 transition-all">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase text-gray-400 tracking-[0.2em]">Total Stretches</span>
            <span className="text-3xl font-light text-white mt-1 font-mono">
              {userProfile.totalStretches.toLocaleString()}
            </span>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-600/15 text-blue-400 flex items-center justify-center border border-blue-500/20">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              self_improvement
            </span>
          </div>
        </div>

        {/* Minutes Relaxed */}
        <div className="bg-[#1A1A1C] rounded-2xl p-6 border border-white/5 flex items-center justify-between shadow-md hover:border-blue-500/30 transition-all">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase text-gray-400 tracking-[0.2em]">Minutes Relaxed</span>
            <span className="text-3xl font-light text-white mt-1 font-mono">
              {userProfile.minutesRelaxed.toLocaleString()}
            </span>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-600/15 text-blue-400 flex items-center justify-center border border-blue-500/20">
            <span className="material-symbols-outlined text-2xl">schedule</span>
          </div>
        </div>

        {/* Days Stretching */}
        <div className="bg-[#1A1A1C] rounded-2xl p-6 border border-white/5 flex items-center justify-between shadow-md hover:border-amber-500/30 transition-all">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase text-gray-400 tracking-[0.2em]">Days Stretching</span>
            <span className="text-3xl font-light text-white mt-1 font-mono">
              {userProfile.dayStreak} {userProfile.dayStreak === 1 ? 'Day' : 'Days'}
            </span>
          </div>
          <div className="w-12 h-12 rounded-full bg-amber-500/15 text-amber-400 flex items-center justify-center border border-amber-500/20">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              local_fire_department
            </span>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-light text-white tracking-tight">Recent Activity</h3>
            <span className="text-xs text-gray-400 font-medium bg-white/5 px-2.5 py-0.5 rounded-full border border-white/5">
              {userProfile.recentActivity.length} Completed
            </span>
          </div>
          {userProfile.recentActivity.length > 3 && (
            <button
              onClick={() => setShowAllHistory(!showAllHistory)}
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
            >
              <span>{showAllHistory ? 'Show Less' : 'View All History'}</span>
              <span className="material-symbols-outlined text-sm">
                {showAllHistory ? 'expand_less' : 'expand_more'}
              </span>
            </button>
          )}
        </div>

        {userProfile.recentActivity.length === 0 ? (
          <div className="bg-[#1A1A1C] rounded-2xl p-6 sm:p-8 border border-white/5 flex flex-col items-center justify-center text-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-600/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
              <span className="material-symbols-outlined text-2xl">history</span>
            </div>
            <h4 className="text-base font-semibold text-white">No Sessions Completed Yet</h4>
            <p className="text-xs text-gray-400 max-w-md leading-relaxed">
              Complete any stretching routine or posture reset to start logging your daily progress, relaxed minutes, and stretching streaks.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {displayedHistory.map((item) => (
              <div
                key={item.id}
                className="bg-[#1A1A1C] rounded-xl p-4 border border-white/5 flex items-center justify-between shadow-sm hover:border-white/10 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-xl">{item.iconType || 'self_improvement'}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-200">{item.title}</span>
                    <span className="text-xs text-gray-400">{item.dateLabel}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-blue-300 bg-blue-600/20 px-3 py-1 rounded-full border border-blue-500/30 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">timer</span>
                    {item.durationMinutes} min
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Preferences & Settings */}
      <section className="flex flex-col gap-4">
        <h3 className="text-xl font-light text-white tracking-tight">Preferences & Settings</h3>

        <div className="bg-[#1A1A1C] rounded-2xl border border-white/5 overflow-hidden shadow-md">
          {/* Saved Stretches */}
          <button
            onClick={onOpenSavedStretches}
            className="w-full p-4 border-b border-white/5 flex items-center justify-between hover:bg-[#222224] transition-colors text-left"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20">
                <span className="material-symbols-outlined text-lg">favorite</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-200">My Saved Stretches</span>
                <span className="text-xs text-gray-400">Quick access to your bookmarked postures</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold bg-blue-600 text-white px-2.5 py-0.5 rounded-full shadow-sm">
                {userProfile.savedStretchIds.length}
              </span>
              <span className="material-symbols-outlined text-gray-400 text-lg">chevron_right</span>
            </div>
          </button>

          {/* Audio & Breath Guidance Toggle */}
          <div className="p-4 border-b border-white/5 flex items-center justify-between hover:bg-[#1E1E21] transition-colors">
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20">
                <span className="material-symbols-outlined text-lg">volume_up</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-200">Sound & Breath Guidance</span>
                <span className="text-xs text-gray-400">Audio chime cues & guided breathing tempo during postures</span>
              </div>
            </div>
            <button
              onClick={() => onToggleSetting('audioEnabled')}
              className={`w-12 h-6 rounded-full p-1 transition-colors relative shrink-0 ${
                userProfile.settings.audioEnabled ? 'bg-blue-600' : 'bg-white/10'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  userProfile.settings.audioEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Daily Stretching Reminder Toggle */}
          <div className="p-4 border-b border-white/5 flex items-center justify-between hover:bg-[#1E1E21] transition-colors">
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20">
                <span className="material-symbols-outlined text-lg">notifications</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-200">Daily Stretching Reminder</span>
                <span className="text-xs text-gray-400">Gentle notifications to maintain movement consistency (9:00 AM)</span>
              </div>
            </div>
            <button
              onClick={() => onToggleSetting('dailyReminder')}
              className={`w-12 h-6 rounded-full p-1 transition-colors relative shrink-0 ${
                userProfile.settings.dailyReminder ? 'bg-blue-600' : 'bg-white/10'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  userProfile.settings.dailyReminder ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Dark Mode Theme */}
          <div className="p-4 border-b border-white/5 flex items-center justify-between hover:bg-[#1E1E21] transition-colors">
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20">
                <span className="material-symbols-outlined text-lg">dark_mode</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-200">Dark Mode Visuals</span>
                <span className="text-xs text-gray-400">Eye-safe dark canvas optimized for low-light stretching</span>
              </div>
            </div>
            <button
              onClick={() => onToggleSetting('darkMode')}
              className={`w-12 h-6 rounded-full p-1 transition-colors relative shrink-0 ${
                userProfile.settings.darkMode ? 'bg-blue-600' : 'bg-white/10'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  userProfile.settings.darkMode ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Breath Guidance Pace */}
          <div className="p-4 border-b border-white/5 flex items-center justify-between hover:bg-[#1E1E21] transition-colors">
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20">
                <span className="material-symbols-outlined text-lg">air</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-200">Diaphragmatic Breath Guidance</span>
                <span className="text-xs text-gray-400">Inhale/exhale visual expansion ring in active timers</span>
              </div>
            </div>
            <button
              onClick={() => onToggleSetting('breathGuidance')}
              className={`w-12 h-6 rounded-full p-1 transition-colors relative shrink-0 ${
                userProfile.settings.breathGuidance ? 'bg-blue-600' : 'bg-white/10'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  userProfile.settings.breathGuidance ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Log Out */}
          <button
            onClick={onLogout}
            className="w-full p-4 flex items-center justify-between hover:bg-red-950/20 text-red-400 transition-colors text-left"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center shrink-0 border border-red-500/20">
                <span className="material-symbols-outlined text-lg">logout</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-red-300">Log Out</span>
                <span className="text-xs text-gray-400">Sign out of your CenterFlow account</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-sm text-red-400">chevron_right</span>
          </button>
        </div>
      </section>
    </div>
  );
};
