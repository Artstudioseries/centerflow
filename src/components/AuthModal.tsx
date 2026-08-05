import React from 'react';
import { auth, googleProvider, signInWithPopup, signOut, User } from '../lib/firebase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, currentUser }) => {
  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      onClose();
    } catch (err: any) {
      console.error('Google Sign In error:', err);
      alert(err.message || 'Google Sign In failed');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      onClose();
    } catch (err: any) {
      console.error('Sign Out error:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-sm bg-[#18181A] rounded-3xl border border-white/10 p-6 shadow-2xl flex flex-col items-center text-center gap-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center font-bold text-base">
          CF
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-bold text-white tracking-tight">
            {currentUser ? 'Your Account' : 'Sign In to CenterFlow'}
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            {currentUser
              ? `Signed in as ${currentUser.email}`
              : 'Sync your saved stretches, patron status, and routine progress across devices.'}
          </p>
        </div>

        {currentUser ? (
          <button
            onClick={handleSignOut}
            className="w-full py-3 bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-red-300 font-bold text-xs rounded-2xl transition-all"
          >
            Sign Out
          </button>
        ) : (
          <button
            onClick={handleGoogleSignIn}
            className="w-full py-3.5 bg-white text-gray-900 font-bold text-xs rounded-2xl transition-all shadow-xl hover:bg-gray-100 flex items-center justify-center gap-2 active:scale-95"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="w-4 h-4"
            />
            <span>Continue with Google</span>
          </button>
        )}
      </div>
    </div>
  );
};
