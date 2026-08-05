import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'home', label: 'Explore', icon: 'explore' },
    { id: 'search', label: 'Search', icon: 'search' },
    { id: 'routines', label: 'Routines', icon: 'self_improvement' },
    { id: 'profile', label: 'Profile', icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0F0F10]/95 backdrop-blur-xl border-t border-white/5 py-2 px-6 flex items-center justify-around md:hidden shadow-2xl">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center gap-1 transition-all py-1 px-3 rounded-xl ${
              isActive ? 'text-blue-400 font-semibold' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <span
              className="material-symbols-outlined text-xl transition-transform"
              style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
            >
              {tab.icon}
            </span>
            <span className="text-[10px] tracking-tight">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
