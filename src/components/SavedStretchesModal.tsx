import React from 'react';
import { Stretch } from '../types';

interface SavedStretchesModalProps {
  savedStretches: Stretch[];
  onClose: () => void;
  onSelectStretch: (stretchId: string) => void;
}

export const SavedStretchesModal: React.FC<SavedStretchesModalProps> = ({
  savedStretches,
  onClose,
  onSelectStretch,
}) => {
  return (
    <div className="fixed inset-0 z-50 p-4 sm:p-6 bg-[#0F0F10]/90 backdrop-blur-xl overflow-y-auto flex items-start sm:items-center justify-center">
      <div className="bg-[#1A1A1C] border border-white/10 rounded-2xl max-w-xl w-full max-h-[85vh] sm:max-h-[90vh] my-auto flex flex-col overflow-hidden shadow-2xl">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2 tracking-tight">
            <span className="material-symbols-outlined text-red-500 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              favorite
            </span>
            Saved Stretches ({savedStretches.length})
          </h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white rounded-full">
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <div className="p-5 flex flex-col gap-3 overflow-y-auto">
          {savedStretches.length === 0 ? (
            <div className="text-center py-10 text-gray-500 flex flex-col items-center">
              <span className="material-symbols-outlined text-4xl mb-2 text-gray-600">favorite_border</span>
              <p className="text-sm">No saved stretches yet. Tap the heart on any stretch to bookmark it.</p>
            </div>
          ) : (
            savedStretches.map((s) => (
              <div
                key={s.id}
                onClick={() => {
                  onSelectStretch(s.id);
                  onClose();
                }}
                className="bg-[#222224] rounded-xl p-4 flex gap-4 items-center border border-white/5 hover:border-blue-500/50 cursor-pointer transition-all"
              >
                <img src={s.imageUrl} alt={s.title} className="w-16 h-16 rounded-lg object-cover bg-[#121214]" />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-200">{s.title}</h4>
                  <p className="text-xs text-gray-400 mt-0.5">{s.primaryFocus}</p>
                </div>
                <span className="material-symbols-outlined text-blue-400 text-xl">chevron_right</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
