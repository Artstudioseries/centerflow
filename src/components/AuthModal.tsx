import React, { useState } from 'react';
import { auth, googleProvider, signInWithPopup, signOut, User } from '../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, currentUser }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      setLoading(false);
      onClose();
    } catch (err: any) {
      console.error('Google Sign In Error:', err);
      setError(err.message || 'Failed to sign in with Google');
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      setLoading(false);
      onClose();
    } catch (err: any) {
      console.error('Email Auth Error:', err);
      setError(err.message || 'Authentication failed');
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      onClose();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto flex items-start sm:items-center justify-center animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#18181A] rounded-3xl border border-white/10 shadow-2xl p-6 flex flex-col gap-5 my-auto max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <span className="material-symbols-outlined text-lg">account_circle</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              {currentUser ? 'Account Profile' : isSignUp ? 'Create Account' : 'Sign In to CenterFlow'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-300 flex items-center gap-2">
            <span className="material-symbols-outlined text-base">error</span>
            <span>{error}</span>
          </div>
        )}

        {currentUser ? (
          <div className="flex flex-col gap-4 py-2">
            <div className="flex items-center gap-4 p-4 bg-[#121214] rounded-2xl border border-white/5">
              {currentUser.photoURL ? (
                <img src={currentUser.photoURL} alt="Avatar" className="w-12 h-12 rounded-full border border-blue-500/40" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                  {(currentUser.displayName || currentUser.email || 'U')[0].toUpperCase()}
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">{currentUser.displayName || 'CenterFlow User'}</span>
                <span className="text-xs text-gray-400">{currentUser.email}</span>
                <span className="text-[10px] text-blue-400 font-mono mt-1">UID: {currentUser.uid.slice(0, 10)}...</span>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              className="w-full py-3 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-300 font-semibold text-xs rounded-xl transition-all"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {/* Google Sign-In Button */}
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-3 px-4 bg-white hover:bg-gray-100 text-gray-900 font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-3 shadow-md active:scale-95 disabled:opacity-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="flex items-center my-1 gap-2">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Or with email</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <form onSubmit={handleEmailAuth} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#121214] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#121214] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50 mt-1"
              >
                {loading ? 'Processing...' : isSignUp ? 'Create Account' : 'Sign In'}
              </button>
            </form>

            <div className="text-center mt-1">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-xs text-blue-400 hover:underline"
              >
                {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Create one"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
