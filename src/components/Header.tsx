import React from 'react';
import { TabType } from '../types';

interface HeaderProps {
  title?: string;
  activeTab?: TabType;
  onTabChange?: (tab: TabType) => void;
  onBack?: () => void;
  onProfileClick?: () => void;
  onPatronClick?: () => void;
  onNavigateHome?: () => void;
  profileAvatarUrl?: string;
  showBack?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'CenterFlow',
  activeTab,
  onTabChange,
  onBack,
  onProfileClick,
  onPatronClick,
  onNavigateHome,
  profileAvatarUrl,
  showBack = false,
}) => {
  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'home', label: 'Home', icon: 'explore' },
    { id: 'search', label: 'Library', icon: 'search' },
    { id: 'routines', label: 'Routines', icon: 'event_note' },
    { id: 'profile', label: 'Profile', icon: 'person' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0F0F10]/85 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-[1200px] mx-auto px-5 md:px-16 h-16 flex items-center justify-between relative">
        <div className="flex items-center gap-3">
          {showBack && onBack ? (
            <button
              onClick={onBack}
              className="px-3 py-1.5 -ml-2 text-gray-200 hover:text-white transition-all active:scale-95 rounded-full flex items-center gap-1.5 bg-[#1A1A1C] hover:bg-[#26262A] border border-white/10 hover:border-white/20 shadow-md text-xs font-semibold"
              aria-label="Go back"
              title="Return to previous screen"
            >
              <span className="material-symbols-outlined text-base">arrow_back</span>
              <span>Back</span>
            </button>
          ) : (
            <button
              onClick={onProfileClick}
              className="md:hidden p-2 -ml-2 text-gray-400 hover:text-white transition-colors active:scale-95"
              aria-label="Menu"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
          )}

          <div
            onClick={() => {
              if (onNavigateHome) {
                onNavigateHome();
              } else if (onBack) {
                onBack();
              }
            }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/30">
              <div className="w-3.5 h-3.5 border-2 border-white rounded-full" />
            </div>
            <span className="font-semibold text-lg tracking-tight text-white uppercase">
              {title === 'CenterFlow' ? (
                <>
                  CENTER<span className="font-light text-gray-400">FLOW</span>
                </>
              ) : (
                title
              )}
            </span>
          </div>
        </div>

        {/* 4-Window Navigation Bar for Tablet & Web Desktop */}
        {onTabChange && (
          <nav className="hidden md:flex items-center gap-1 bg-[#161618] p-1 rounded-2xl border border-white/10 shadow-inner">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30 border border-blue-400/30 font-semibold'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-lg"
                    style={{ fontVariationSettings: `'FILL' ${isActive ? 1 : 0}` }}
                  >
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        )}

        <div className="flex items-center gap-2 sm:gap-3">
          {onPatronClick && (
            <button
              onClick={onPatronClick}
              className="flex items-center gap-1.5 bg-blue-600/15 hover:bg-blue-600/25 border border-blue-500/30 text-blue-400 hover:text-blue-300 text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded-full transition-all active:scale-95"
              title="Patron & Gift Membership"
            >
              <span className="material-symbols-outlined text-sm">favorite</span>
              <span className="hidden sm:inline">Sponsor</span>
              <span className="sm:hidden">Patron</span>
            </button>
          )}

          {profileAvatarUrl ? (
            <button
              onClick={onProfileClick}
              className="w-9 h-9 rounded-full overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all active:scale-95 shrink-0"
              aria-label="Profile"
            >
              <img src={profileAvatarUrl} alt="User profile" className="w-full h-full object-cover" />
            </button>
          ) : (
            <div className="w-9 h-9" />
          )}
        </div>
      </div>
    </header>
  );
};

