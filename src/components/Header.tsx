import React from 'react';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  onNavigateHome?: () => void;
  profileAvatarUrl?: string;
  onProfileClick?: () => void;
  onPatronClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  onBack,
  onNavigateHome,
  profileAvatarUrl,
  onProfileClick,
  onPatronClick,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0F0F10]/90 backdrop-blur-md border-b border-white/5 px-5 md:px-16 py-3.5 flex items-center justify-between transition-all">
      <div className="flex items-center gap-3">
        {showBack && onBack ? (
          <button
            onClick={onBack}
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-full bg-white/5 hover:bg-white/10 active:scale-95 flex items-center justify-center"
            aria-label="Go Back"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
          </button>
        ) : (
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2 text-left group"
          >
            <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center font-black text-sm group-hover:scale-105 transition-transform shadow-sm">
              CF
            </div>
            <span className="text-lg font-bold text-white tracking-tight group-hover:text-blue-300 transition-colors">
              CenterFlow
            </span>
          </button>
        )}

        {showBack && (
          <h1 className="text-base font-semibold text-white tracking-tight truncate max-w-[200px] sm:max-w-xs">
            {title}
          </h1>
        )}
      </div>

      <div className="flex items-center gap-3">
        {onPatronClick && (
          <button
            onClick={onPatronClick}
            className="flex items-center gap-1.5 bg-blue-600/15 hover:bg-blue-600/25 border border-blue-500/30 text-blue-300 font-semibold text-xs py-1.5 px-3 rounded-full transition-all active:scale-95 shadow-sm"
          >
            <span className="material-symbols-outlined text-sm text-blue-400">favorite</span>
            <span className="hidden sm:inline">Patron & Gift</span>
            <span className="sm:hidden">Patron</span>
          </button>
        )}

        {profileAvatarUrl && onProfileClick && (
          <button
            onClick={onProfileClick}
            className="w-8 h-8 rounded-full overflow-hidden border border-white/10 hover:border-blue-500 transition-all active:scale-95 shrink-0 bg-[#1A1A1C]"
            aria-label="Profile"
          >
            <img src={profileAvatarUrl} alt="User Avatar" className="w-full h-full object-cover" />
          </button>
        )}
      </div>
    </header>
  );
};
