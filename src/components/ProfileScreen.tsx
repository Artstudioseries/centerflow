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

  const activePatronTier = TIERS.find((t) => t.id === userProfile.patronTier) || TIERS[0];

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
              alt={userProfile.name || 'User'}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-2xl font-semibold text-white tracking-tight">{userProfile.name || 'CenterFlow Member'}</h3>
              {activePatronTier && (
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold shadow-md ${activePatronTier.badgeClasses}`}>
                  <span className="material-symbols-outlined text-sm">{activePatronTier.badgeIcon}</span>
                  <span>{activePatronTier.badgeName}</span>
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
            <span>{activePatronTier.id === 'friend' ? 'Upgrade Membership' : 'Manage Membership'}</span>
          </button>
        )}
      </section>

      {/* Membership Status Banner & Billing Management */}
      <section className="bg-gradient-to-r from-blue-950/30 via-[#1A1A1C] to-[#161618] rounded-2xl p-6 border border-blue-500/30 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-2xl">workspace_premium</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 bg-blue-600/10 border border-blue-500/30 px-2.5 py-0.5 rounded-full">
                {activePatronTier.id === 'friend' ? 'Free Membership' : 'Membership Active'}
              </span>
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                userProfile.membershipStatus === 'active' || userProfile.membershipStatus === 'gift_active'
                  ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                  : userProfile.membershipStatus === 'friend'
                  ? 'bg-slate-500/15 text-slate-300 border-slate-500/30'
                  : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
              }`}>
                Status: {(userProfile.membershipStatus || 'friend').toUpperCase()}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              {activePatronTier.name} ({activePatronTier.typeLabel})
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              {userProfile.membershipExpiresAt
                ? `Renews/Expires on: ${new Date(userProfile.membershipExpiresAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
                : activePatronTier.id === 'friend'
                ? 'Enjoy baseline routines and saved progress indefinitely for free.'
                : 'Full access to CenterFlow features and supporter badge.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {userProfile.stripeCustomerId ? (
            <button
              onClick={async () => {
                try {
                  const res = await fetch('/api/stripe/create-portal-session', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ customerId: userProfile.stripeCustomerId }),
                  });
                  const data = await res.json();
                  if (data.url) {
                    window.location.href = data.url;
                  }
                } catch (e) {
                  alert('Redirecting to Stripe Customer Portal');
                }
              }}
              className="bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 font-semibold text-xs py-2.5 px-4 rounded-xl transition-all flex items-center gap-1.5 shadow-md"
            >
              <span className="material-symbols-outlined text-sm">manage_accounts</span>
              <span>Manage Billing / Cancel</span>
            </button>
          ) : (
            onOpenPatronModal && (
              <button
                onClick={onOpenPatronModal}
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs py-2.5 px-4 rounded-xl transition-all shadow-md"
              >
                Sponsor & Upgrade
              </button>
            )
          )}
        </div>
      </section>

      {/* Bento Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Stretches */}
        <div className="bg-[#1A1A1C] rounded-2xl p-6 border border-white/5 flex items-center justify-between shadow-md">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase text-gray-500 tracking-[0.2em]">Total Stretches</span>
            <span className="text-3xl font-light text-white mt-1 font-mono">
              {userProfile.totalStretches.toLocaleString()}
            </span>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-600/10 text-blue-400 flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              self_improvement
            </span>
          </div>
        </div>

        {/* Minutes Relaxed */}
        <div className="bg-[#1A1A1C] rounded-2xl p-6 border border-white/5 flex items-center justify-between shadow-md">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase text-gray-500 tracking-[0.2em]">Minutes Relaxed</span>
            <span className="text-3xl font-light text-white mt-1 font-mono">
              {userProfile.minutesRelaxed.toLocaleString()}
            </span>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-600/10 text-blue-400 flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">schedule</span>
          </div>
        </div>

        {/* Day Streak */}
        <div className="bg-[#1A1A1C] rounded-2xl p-6 border border-white/5 flex items-center justify-between shadow-md">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase text-gray-500 tracking-[0.2em]">Day Streak</span>
            <span className="text-3xl font-light text-white mt-1 font-mono">
              {userProfile.dayStreak} Days
            </span>
          </div>
          <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              local_fire_department
            </span>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-light text-white tracking-tight">Recent Activity</h3>
          <button
            onClick={() => setShowAllHistory(!showAllHistory)}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
          >
            {showAllHistory ? 'Show Less' : 'View All'}
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {displayedHistory.map((item) => (
            <div
              key={item.id}
              className="bg-[#1A1A1C] rounded-xl p-4 border border-white/5 flex items-center justify-between shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#222224] text-blue-400 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">{item.iconType}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-200">{item.title}</span>
                  <span className="text-xs text-gray-500">{item.dateLabel}</span>
                </div>
              </div>
              <span className="text-xs font-semibold text-blue-400 bg-blue-600/20 px-3 py-1 rounded-full border border-blue-500/30">
                {item.durationMinutes} min
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Preferences & Settings */}
      <section className="flex flex-col gap-4">
        <h3 className="text-xl font-light text-white tracking-tight">Preferences</h3>

        <div className="bg-[#1A1A1C] rounded-2xl border border-white/5 overflow-hidden shadow-md">
          {/* Saved Stretches */}
          <button
            onClick={onOpenSavedStretches}
            className="w-full p-4 border-b border-white/5 flex items-center justify-between hover:bg-[#222224] transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-blue-400">favorite</span>
              <span className="text-sm font-semibold text-gray-200">My Saved Stretches</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold bg-blue-600 text-white px-2.5 py-0.5 rounded-full">
                {userProfile.savedStretchIds.length}
              </span>
              <span className="material-symbols-outlined text-gray-500 text-lg">chevron_right</span>
            </div>
          </button>

          {/* Audio Cues Toggle */}
          <div className="p-4 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-blue-400">volume_up</span>
              <span className="text-sm font-semibold text-gray-200">Sound & Breath Guidance</span>
            </div>
            <button
              onClick={() => onToggleSetting('audioEnabled')}
              className={`w-12 h-6 rounded-full p-1 transition-colors relative ${
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

          {/* Daily Reminder Toggle */}
          <div className="p-4 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-blue-400">notifications</span>
              <span className="text-sm font-semibold text-gray-200">Daily Reminder (9:00 AM)</span>
            </div>
            <button
              onClick={() => onToggleSetting('dailyReminder')}
              className={`w-12 h-6 rounded-full p-1 transition-colors relative ${
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

          {/* Log Out */}
          <button
            onClick={onLogout}
            className="w-full p-4 flex items-center justify-between hover:bg-red-950/20 text-red-400 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined">logout</span>
              <span className="text-sm font-semibold">Log Out</span>
            </div>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </section>
    </div>
  );
};
