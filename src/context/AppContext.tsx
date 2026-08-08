import React, { createContext, useContext, useState, useEffect } from 'react';
import type { DayMission, EdgeCaseState, StudentProfile, SubmissionData, RoutePath, ThemeMode } from '../types/challenge';
import { initialProfile, day12Mission, day1Mission } from '../data/mockData';
import { 
  getSavedReflection, 
  saveReflection, 
  getSavedSubmission, 
  saveSubmission,
  clearDaySubmission,
  getUser,
  saveUser,
  getTheme,
  saveTheme,
  saveSession,
} from '../utils/storage';
import { playNightFocusChime, toggleSound, playTactileClick } from '../utils/sound';

export type { RoutePath, ThemeMode };
export type DeviceViewMode = 'responsive' | 'mobile-390' | 'tablet-768';

interface AppContextType {
  currentRoute: RoutePath;
  setRoute: (route: RoutePath) => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleThemeMode: () => void;
  profile: StudentProfile;
  setProfile: React.Dispatch<React.SetStateAction<StudentProfile>>;
  dayMission: DayMission;
  setDayMission: React.Dispatch<React.SetStateAction<DayMission>>;
  submission: SubmissionData;
  setSubmission: React.Dispatch<React.SetStateAction<SubmissionData>>;
  edgeCases: EdgeCaseState;
  applyEdgeCase: (edgeCaseKey: keyof EdgeCaseState | 'reset') => void;
  isNightFocusMode: boolean;
  toggleNightFocus: () => void;
  soundEnabled: boolean;
  toggleSoundState: () => void;
  deviceViewMode: DeviceViewMode;
  setDeviceViewMode: (mode: DeviceViewMode) => void;
  isStateSimulatorOpen: boolean;
  setIsStateSimulatorOpen: (open: boolean) => void;
  isCelebrationModalOpen: boolean;
  setIsCelebrationModalOpen: (open: boolean) => void;
  toggleRequirement: (reqId: string) => void;
  handleSaveReflection: (text: string) => void;
  handleSubmitMission: (githubUrl: string, linkedinUrl: string, reflection: string) => boolean;
  handleRegister: (data: { name: string; email: string; college: string; track?: any }) => void;
  streakProtectedMessage: string;
}

const defaultEdgeCases: EdgeCaseState = {
  isFirstDay: false,
  isStreakBroken: false,
  isStreakFreezeUsed: false,
  isEmptyProfile: false,
  isBrokenGitHubLink: false,
  isBrokenLinkedInLink: false,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme Mode: defaults to 'day' (light mode) or persisted choice
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    return getTheme();
  });

  // Read initial route from window.location.pathname or fallback to '/'
  const [currentRoute, setCurrentRouteState] = useState<RoutePath>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path === '/dashboard' || path === '/day/12' || path === '/login' || path === '/register') return path as RoutePath;
    }
    return '/';
  });

  const [profile, setProfile] = useState<StudentProfile>(() => {
    return getUser();
  });
  const [dayMission, setDayMission] = useState<DayMission>(day12Mission);
  const [edgeCases, setEdgeCases] = useState<EdgeCaseState>(defaultEdgeCases);
  const [isStateSimulatorOpen, setIsStateSimulatorOpen] = useState(false);
  const [isCelebrationModalOpen, setIsCelebrationModalOpen] = useState(false);
  const [soundEnabled, setSoundEnabledState] = useState(true);
  const [deviceViewMode, setDeviceViewMode] = useState<DeviceViewMode>('responsive');
  const [streakProtectedMessage, setStreakProtectedMessage] = useState('');

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    saveTheme(mode);
  };

  const toggleThemeMode = () => {
    playTactileClick();
    setThemeModeState(prev => {
      const next = prev === 'day' ? 'night' : 'day';
      saveTheme(next);
      return next;
    });
  };

  // Registration handler for new students
  const handleRegister = (data: { name: string; email: string; college: string; track?: any }) => {
    const updatedUser: StudentProfile = {
      ...profile,
      name: data.name || 'Aditya Sharma',
      email: data.email || 'aditya.sharma@engg.edu.in',
      college: data.college || 'Indian Institute of Technology (BHU)',
      currentDay: 12,
      streakDays: 11,
      totalXp: 850,
      level: 4,
      levelTitle: 'System Architect Candidate',
    };
    setProfile(updatedUser);
    saveUser(updatedUser);
    saveSession({
      isLoggedIn: true,
      email: updatedUser.email,
      loginTime: new Date().toISOString(),
    });
    setRoute('/dashboard');
  };

  // Check if after 9:00 PM (21:00)
  const isCurrentlyNight = () => {
    const hours = new Date().getHours();
    return hours >= 21 || hours < 5;
  };

  const [isNightFocusMode, setIsNightFocusMode] = useState<boolean>(() => {
    return isCurrentlyNight();
  });

  // Submission state for Day 12
  const [submission, setSubmission] = useState<SubmissionData>(() => {
    const saved = getSavedSubmission(12);
    const savedRef = getSavedReflection(12);
    return {
      day: 12,
      githubUrl: saved.githubUrl || 'https://github.com/adityasharma_dev/rate-limiter-redis',
      linkedinUrl: saved.linkedinUrl || 'https://linkedin.com/posts/adityasharma-dev-day12-rate-limiter-redis',
      reflection: savedRef || 'Implemented Redis atomic sliding window counter. Handled race conditions with MULTI/EXEC pipeline. Learned that setting TTL is critical to avoid memory leak.',
      isVerified: false,
      commitHash: 'c7f91a2',
      commitMessage: 'feat(rate-limiter): implement atomic Redis sliding window counter with 429 Retry-After header',
      linesAdded: 142,
      linkedinPostLikes: 34,
    };
  });

  // Sync route with browser history
  const setRoute = (route: RoutePath) => {
    setCurrentRouteState(route);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/dashboard' || path === '/day/12' || path === '/login' || path === '/register' || path === '/') {
        setCurrentRouteState(path as RoutePath);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const toggleNightFocus = () => {
    setIsNightFocusMode(prev => {
      const next = !prev;
      if (next) playNightFocusChime();
      return next;
    });
  };

  const toggleSoundState = () => {
    setSoundEnabledState(prev => {
      const next = !prev;
      toggleSound(next);
      return next;
    });
  };

  const toggleRequirement = (reqId: string) => {
    setDayMission(prev => ({
      ...prev,
      requirements: prev.requirements.map(r => r.id === reqId ? { ...r, completed: !r.completed } : r),
    }));
  };

  const handleSaveReflection = (text: string) => {
    setSubmission(prev => ({ ...prev, reflection: text }));
    saveReflection(12, text);
  };

  const handleSubmitMission = (githubUrl: string, linkedinUrl: string, reflection: string): boolean => {
    // Validation
    if (!githubUrl.trim() || !linkedinUrl.trim()) return false;

    const newSub: SubmissionData = {
      day: 12,
      githubUrl,
      linkedinUrl,
      reflection,
      isVerified: true,
      submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      commitHash: 'e48a73b',
      commitMessage: 'feat(day-12): ship Redis Token Bucket rate limiter with test suite',
      linesAdded: 184,
      linkedinPostLikes: 1,
    };

    setSubmission(newSub);
    saveSubmission(12, { githubUrl, linkedinUrl, isSubmitted: true });
    saveReflection(12, reflection);

    // Update student profile stats
    setProfile(prev => ({
      ...prev,
      streakDays: prev.streakDays + 1,
      longestStreak: Math.max(prev.longestStreak, prev.streakDays + 1),
      totalXp: prev.totalXp + 150,
      weeklyCommits: Math.min(7, prev.weeklyCommits + 1),
    }));

    setStreakProtectedMessage('Day 12 Complete! 🔥 12-Day Streak Locked & +150 XP Earned');
    setIsCelebrationModalOpen(true);
    return true;
  };

  // Edge cases simulator handler
  const applyEdgeCase = (key: keyof EdgeCaseState | 'reset') => {
    if (key === 'reset') {
      setEdgeCases(defaultEdgeCases);
      setProfile(initialProfile);
      setDayMission(day12Mission);
      saveUser(initialProfile);
      clearDaySubmission(12);
      const defaultSub: SubmissionData = {
        day: 12,
        githubUrl: 'https://github.com/adityasharma_dev/rate-limiter-redis',
        linkedinUrl: 'https://linkedin.com/posts/adityasharma-dev-day12',
        reflection: 'Implemented Redis atomic sliding window counter. Handled race conditions with MULTI/EXEC pipeline.',
        isVerified: false,
      };
      setSubmission(defaultSub);
      return;
    }

    setEdgeCases(prev => {
      const nextVal = !prev[key];
      const nextState = { ...prev, [key]: nextVal };
      
      if (key === 'isFirstDay') {
        if (nextVal) {
          setDayMission(day1Mission);
          setProfile(p => ({
            ...p,
            currentDay: 1,
            streakDays: 0,
            longestStreak: 0,
            totalXp: 0,
            level: 1,
            levelTitle: 'Genesis Builder',
            weeklyCommits: 0,
          }));
        } else {
          setDayMission(day12Mission);
          setProfile(initialProfile);
        }
      }

      if (key === 'isStreakBroken') {
        if (nextVal) {
          setProfile(p => ({
            ...p,
            streakDays: 0,
            streakFreezesAvailable: 1,
            streakFreezeUsed: false,
          }));
        } else {
          setProfile(initialProfile);
        }
      }

      if (key === 'isStreakFreezeUsed') {
        if (nextVal) {
          setProfile(p => ({
            ...p,
            streakFreezesAvailable: 1,
            streakFreezeUsed: true,
          }));
        } else {
          setProfile(initialProfile);
        }
      }

      if (key === 'isEmptyProfile') {
        if (nextVal) {
          setProfile(p => ({
            ...p,
            name: '',
            college: '',
          }));
        } else {
          setProfile(initialProfile);
        }
      }

      return nextState;
    });
  };

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        setRoute,
        themeMode,
        setThemeMode,
        toggleThemeMode,
        profile,
        setProfile,
        dayMission,
        setDayMission,
        submission,
        setSubmission,
        edgeCases,
        applyEdgeCase,
        isNightFocusMode,
        toggleNightFocus,
        soundEnabled,
        toggleSoundState,
        deviceViewMode,
        setDeviceViewMode,
        isStateSimulatorOpen,
        setIsStateSimulatorOpen,
        isCelebrationModalOpen,
        setIsCelebrationModalOpen,
        toggleRequirement,
        handleSaveReflection,
        handleSubmitMission,
        handleRegister,
        streakProtectedMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
