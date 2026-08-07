import React, { useState, useEffect } from 'react';
import { ScreenView, TabType, UserProfile } from './types';
import { ROUTINES_DATA } from './data/routinesData';
import { STRETCHES_DATA } from './data/stretchesData';

import { auth, onAuthStateChanged, User, doc, getDoc, setDoc, db } from './lib/firebase';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { SearchScreen } from './components/SearchScreen';
import { RoutinesScreen } from './components/RoutinesScreen';
import { PhilosophyScreen } from './components/PhilosophyScreen';
import { RoutineDetailScreen } from './components/RoutineDetailScreen';
import { StretchDetailScreen } from './components/StretchDetailScreen';
import { ActiveTimerModal } from './components/ActiveTimerModal';
import { ProfileScreen } from './components/ProfileScreen';
import { SavedStretchesModal } from './components/SavedStretchesModal';
import { PatronModal } from './components/PatronModal';
import { AuthModal } from './components/AuthModal';

const INITIAL_PROFILE: UserProfile = {
  name: '',
  memberSince: 'August 2026',
  avatarUrl:
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  totalStretches: 0,
  minutesRelaxed: 0,
  dayStreak: 1,
  savedStretchIds: ['spine-lengthening-reach'],
  patronTier: 'friend',
  recentActivity: [],
  settings: {
    audioEnabled: true,
    breathGuidance: true,
    darkMode: true,
    dailyReminder: true,
  },
};

export default function App() {
  const [screen, setScreen] = useState<ScreenView>({ type: 'tab', tab: 'home' });
  const [screenHistory, setScreenHistory] = useState<ScreenView[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('centerflow_profile');
    return saved ? JSON.parse(saved) : INITIAL_PROFILE;
  });
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isPatronModalOpen, setIsPatronModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Sync with Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Load user Firestore profile if available
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const snap = await getDoc(userDocRef);
          if (snap.exists()) {
            const data = snap.data() as Partial<UserProfile>;
            setUserProfile((prev) => ({
              ...prev,
              ...data,
              name: user.displayName || data.name || prev.name || '',
              email: user.email || data.email,
              avatarUrl: user.photoURL || data.avatarUrl || prev.avatarUrl,
              firebaseUid: user.uid,
              patronTier: data.patronTier || 'friend',
            }));
          } else {
            // New user registered: automatically assign CenterFlow Friend (Free)
            const displayName = user.displayName || (user.email ? user.email.split('@')[0] : '');
            const newProfile: UserProfile = {
              name: displayName,
              email: user.email || '',
              firebaseUid: user.uid,
              memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
              avatarUrl: user.photoURL || INITIAL_PROFILE.avatarUrl,
              totalStretches: 0,
              minutesRelaxed: 0,
              dayStreak: 1,
              savedStretchIds: ['spine-lengthening-reach'],
              patronTier: 'friend',
              membershipStatus: 'none',
              recentActivity: [],
              settings: {
                audioEnabled: true,
                breathGuidance: true,
                darkMode: true,
                dailyReminder: true,
              },
            };

            await setDoc(userDocRef, newProfile, { merge: true });
            setUserProfile(newProfile);
          }
        } catch (err) {
          console.error('Firestore user sync error:', err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Sync Stripe Checkout Return URL verification
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    const tier = params.get('tier');

    if (sessionId && tier) {
      fetch(`/api/stripe/verify-session?session_id=${sessionId}&tier=${tier}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.valid) {
            handleUpdateProfileTier(tier as any, {
              stripeCustomerId: data.stripeCustomerId,
              stripeSubscriptionId: data.stripeSubscriptionId,
              membershipStatus: 'active',
            });
            setIsPatronModalOpen(true);
            // Clean URL params
            window.history.replaceState({}, document.title, window.location.pathname);
          }
        })
        .catch((err) => console.error('Error verifying Stripe return session:', err));
    }
  }, []);

  // Sync profile state with localStorage and Firestore
  useEffect(() => {
    localStorage.setItem('centerflow_profile', JSON.stringify(userProfile));
    if (currentUser) {
      const userDocRef = doc(db, 'users', currentUser.uid);
      setDoc(userDocRef, userProfile, { merge: true }).catch((e) =>
        console.error('Error syncing profile to Firestore:', e)
      );
    }
  }, [userProfile, currentUser]);

  const activeTab: TabType = screen.type === 'tab' ? screen.tab : 'home';

  const navigateTo = (nextScreen: ScreenView) => {
    setScreenHistory((prev) => [...prev, screen]);
    setScreen(nextScreen);
  };

  const handleGoBack = () => {
    if (screenHistory.length > 0) {
      const prevScreen = screenHistory[screenHistory.length - 1];
      setScreenHistory((prev) => prev.slice(0, prev.length - 1));
      setScreen(prevScreen);
    } else {
      setScreen({ type: 'tab', tab: 'home' });
    }
  };

  const handleNavigateHome = () => {
    setScreenHistory([]);
    setScreen({ type: 'tab', tab: 'home' });
  };

  const handleTabChange = (tab: TabType) => {
    if (screen.type === 'tab' && screen.tab === tab) return;
    navigateTo({ type: 'tab', tab });
  };

  const handleSearchQueryFromHome = (query: string) => {
    setSearchQuery(query);
    navigateTo({ type: 'tab', tab: 'search' });
  };

  const handleSelectRoutine = (routineId: string) => {
    navigateTo({ type: 'routine_detail', routineId });
  };

  const handleSelectStretch = (stretchId: string) => {
    navigateTo({ type: 'stretch_detail', stretchId });
  };

  const handleStartTimer = (routineId?: string, stretchId?: string) => {
    navigateTo({ type: 'active_timer', routineId, stretchId });
  };

  const handleUpdateProfileTier = (
    tierId: 'supporter' | 'guardian' | 'pass',
    extraDetails?: Partial<UserProfile>
  ) => {
    setUserProfile((prev) => ({
      ...prev,
      patronTier: tierId,
      ...extraDetails,
    }));
  };

  const handleToggleSaveStretch = (stretchId: string) => {
    setUserProfile((prev) => {
      const isSaved = prev.savedStretchIds.includes(stretchId);
      const newSaved = isSaved
        ? prev.savedStretchIds.filter((id) => id !== stretchId)
        : [...prev.savedStretchIds, stretchId];
      return { ...prev, savedStretchIds: newSaved };
    });
  };

  const handleCompleteSession = (minutes: number, sessionTitle: string) => {
    setUserProfile((prev) => {
      const newActivity = [
        {
          id: `act-${Date.now()}`,
          title: sessionTitle,
          dateLabel: `Just now • ${minutes} min`,
          durationMinutes: minutes,
          timestamp: Date.now(),
          iconType: 'self_improvement' as const,
        },
        ...prev.recentActivity,
      ];
      return {
        ...prev,
        totalStretches: prev.totalStretches + 1,
        minutesRelaxed: prev.minutesRelaxed + minutes,
        recentActivity: newActivity,
      };
    });
    setScreen({ type: 'tab', tab: 'profile' });
  };

  const handleToggleSetting = (key: keyof UserProfile['settings']) => {
    setUserProfile((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        [key]: !prev.settings[key],
      },
    }));
  };

  const savedStretchesList = STRETCHES_DATA.filter((s) =>
    userProfile.savedStretchIds.includes(s.id)
  );

  return (
    <div className="min-h-screen bg-[#0F0F10] text-gray-200 flex flex-col font-sans">
      {/* Desktop & Mobile Header */}
      {screen.type !== 'active_timer' && (
        <Header
          title={
            screen.type === 'routine_detail'
              ? 'Routine Details'
              : screen.type === 'stretch_detail'
              ? 'Movement Focus'
              : screen.type === 'philosophy'
              ? 'Movement Guidance'
              : 'CenterFlow'
          }
          activeTab={screen.type === 'tab' ? screen.tab : undefined}
          onTabChange={handleTabChange}
          showBack={screen.type !== 'tab' || screen.tab !== 'home'}
          onBack={handleGoBack}
          onNavigateHome={handleNavigateHome}
          profileAvatarUrl={userProfile.avatarUrl}
          onProfileClick={() => handleTabChange('profile')}
          onPatronClick={() => setIsPatronModalOpen(true)}
        />
      )}

      {/* Main View Switcher */}
      <main className="flex-1">
        {screen.type === 'tab' && screen.tab === 'home' && (
          <HomeScreen
            userName={userProfile.name}
            userAvatarUrl={userProfile.avatarUrl}
            isGuest={!currentUser}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            onSelectRoutine={handleSelectRoutine}
            onSelectStretch={handleSelectStretch}
            onStartTimer={handleStartTimer}
            onSearchQuery={handleSearchQueryFromHome}
            onOpenPatronModal={() => setIsPatronModalOpen(true)}
            routines={ROUTINES_DATA}
            stretches={STRETCHES_DATA}
          />
        )}

        {screen.type === 'tab' && screen.tab === 'search' && (
          <SearchScreen
            initialQuery={searchQuery}
            onSelectRoutine={handleSelectRoutine}
            onSelectStretch={handleSelectStretch}
            onStartTimer={handleStartTimer}
            routines={ROUTINES_DATA}
            stretches={STRETCHES_DATA}
          />
        )}

        {screen.type === 'tab' && screen.tab === 'routines' && (
          <RoutinesScreen
            userTier={userProfile.patronTier}
            isGuest={!currentUser}
            onSelectRoutine={handleSelectRoutine}
            onSelectPhilosophy={() => navigateTo({ type: 'philosophy' })}
            onOpenPatronModal={() => setIsPatronModalOpen(true)}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            routines={ROUTINES_DATA}
          />
        )}

        {screen.type === 'tab' && screen.tab === 'profile' && (
          <ProfileScreen
            userProfile={userProfile}
            onToggleSetting={handleToggleSetting}
            onOpenSavedStretches={() => setIsSavedModalOpen(true)}
            onOpenPatronModal={() => setIsPatronModalOpen(true)}
            onLogout={() => {
              if (window.confirm('Reset local progress?')) {
                localStorage.removeItem('centerflow_profile');
                setUserProfile(INITIAL_PROFILE);
              }
            }}
          />
        )}

        {screen.type === 'philosophy' && (
          <PhilosophyScreen
            onBack={handleGoBack}
            onStartJourney={() => handleTabChange('routines')}
          />
        )}

        {screen.type === 'routine_detail' && (
          <RoutineDetailScreen
            routine={
              ROUTINES_DATA.find((r) => r.id === screen.routineId) || ROUTINES_DATA[0]
            }
            onBack={handleGoBack}
            onStartRoutine={(routineId) => handleStartTimer(routineId, undefined)}
            onSelectStretch={handleSelectStretch}
            onSearchQuery={handleSearchQueryFromHome}
          />
        )}

        {screen.type === 'stretch_detail' && (
          <StretchDetailScreen
            stretch={
              STRETCHES_DATA.find((s) => s.id === screen.stretchId) || STRETCHES_DATA[0]
            }
            onBack={handleGoBack}
            onStartStretchTimer={(stretchId) => handleStartTimer(undefined, stretchId)}
            onToggleSave={handleToggleSaveStretch}
            isSaved={userProfile.savedStretchIds.includes(screen.stretchId)}
            onSearchQuery={handleSearchQueryFromHome}
          />
        )}

        {screen.type === 'active_timer' && (
          <ActiveTimerModal
            routine={ROUTINES_DATA.find((r) => r.id === screen.routineId)}
            stretch={STRETCHES_DATA.find((s) => s.id === screen.stretchId)}
            initialStepIndex={screen.initialStepIndex || 0}
            onClose={handleGoBack}
            onCompleteSession={handleCompleteSession}
          />
        )}
      </main>

      {/* Saved Stretches Sheet Modal */}
      {isSavedModalOpen && (
        <SavedStretchesModal
          savedStretches={savedStretchesList}
          onClose={() => setIsSavedModalOpen(false)}
          onSelectStretch={handleSelectStretch}
        />
      )}

      {/* Patron & Gift Membership Modal */}
      <PatronModal
        isOpen={isPatronModalOpen}
        onClose={() => setIsPatronModalOpen(false)}
        currentUser={currentUser}
        userProfile={userProfile}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onUpdateProfileTier={handleUpdateProfileTier}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
      />

      {/* Glassmorphism Bottom Navigation for Mobile */}
      {screen.type !== 'active_timer' && (
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      )}
    </div>
  );
}
