import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'home', label: 'Home', icon: 'explore' },
    { id: 'search', label: 'Library', icon: 'search' },
    { id: 'routines', label: 'Routines', icon: 'event_note' },
    { id: 'profile', label: 'Profile', icon: 'person' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-40 bg-[#0A0A0B]/95 backdrop-blur-xl border-t border-white/5 pb-safe shadow-[0px_-10px_30px_rgba(0,0,0,0.8)]">
      <div className="flex justify-around items-center h-20 px-4 max-w-[1200px] mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center px-4 py-2 rounded-xl transition-all duration-200 active:scale-90 ${
                isActive
                  ? 'bg-white/10 text-white border border-white/10 font-medium'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <span
                className={`material-symbols-outlined mb-0.5 text-2xl ${isActive ? 'text-blue-500' : ''}`}
                style={{ fontVariationSettings: `'FILL' ${isActive ? 1 : 0}` }}
              >
                {tab.icon}
              </span>
              <span className="text-[12px] font-medium tracking-wide">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
