import type { StudentProfile, ThemeMode } from '../types/challenge';
import { initialProfile } from '../data/mockData';

const STORAGE_KEYS = {
  USER: 'abtalks_user_profile',
  SESSION: 'abtalks_mock_session',
  PROGRESS: 'abtalks_user_progress',
  THEME: 'abtalks_theme',
  SUBMISSIONS: 'abtalks_submissions',
  CHECKLIST_PREFIX: 'abtalks_checklist_day_',
  REFLECTION_PREFIX: 'abtalks_reflection_day_',
};

export interface UserSession {
  isLoggedIn: boolean;
  email: string;
  loginTime: string;
}

export interface ProgressData {
  currentDay: number;
  streakDays: number;
  totalXp: number;
  completedDays: number[];
  weeklyCommits: number;
  streakFreezesAvailable: number;
}

// User Profile Persistence
export const getUser = (): StudentProfile => {
  if (typeof window === 'undefined') return initialProfile;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load user profile from storage', e);
  }
  return initialProfile;
};

export const saveUser = (user: StudentProfile): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } catch (e) {
    console.error('Failed to save user profile', e);
  }
};

// Session Persistence
export const getSession = (): UserSession | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SESSION);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load session', e);
  }
  return null;
};

export const saveSession = (session: UserSession | null): void => {
  if (typeof window === 'undefined') return;
  try {
    if (session) {
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
    } else {
      localStorage.removeItem(STORAGE_KEYS.SESSION);
    }
  } catch (e) {
    console.error('Failed to save session', e);
  }
};

// Progress Data Persistence
export const getProgress = (): ProgressData => {
  const user = getUser();
  if (typeof window === 'undefined') {
    return {
      currentDay: user.currentDay,
      streakDays: user.streakDays,
      totalXp: user.totalXp,
      completedDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      weeklyCommits: user.weeklyCommits,
      streakFreezesAvailable: user.streakFreezesAvailable,
    };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load progress', e);
  }
  return {
    currentDay: user.currentDay,
    streakDays: user.streakDays,
    totalXp: user.totalXp,
    completedDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    weeklyCommits: user.weeklyCommits,
    streakFreezesAvailable: user.streakFreezesAvailable,
  };
};

export const saveProgress = (progress: ProgressData): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress', e);
  }
};

// Theme Persistence
export const getTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'day';
  const saved = localStorage.getItem(STORAGE_KEYS.THEME);
  return (saved === 'night' || saved === 'day') ? saved : 'day';
};

export const saveTheme = (theme: ThemeMode): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
};

// Submissions Persistence
export const getSavedSubmission = (day: number): { githubUrl: string; linkedinUrl: string; isSubmitted: boolean; reflection?: string; timestamp?: string } => {
  if (typeof window === 'undefined') return { githubUrl: '', linkedinUrl: '', isSubmitted: false };
  try {
    const raw = localStorage.getItem(`${STORAGE_KEYS.SUBMISSIONS}_day_${day}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        githubUrl: parsed.githubUrl || '',
        linkedinUrl: parsed.linkedinUrl || '',
        isSubmitted: parsed.isSubmitted === true,
        reflection: parsed.reflection || '',
        timestamp: parsed.timestamp,
      };
    }
  } catch (e) {
    console.error('Failed to load submission', e);
  }
  return { githubUrl: '', linkedinUrl: '', isSubmitted: false };
};

export const saveSubmission = (day: number, data: { githubUrl: string; linkedinUrl: string; isSubmitted: boolean; reflection?: string; timestamp?: string }) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`${STORAGE_KEYS.SUBMISSIONS}_day_${day}`, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save submission', e);
  }
};

// Reflection Persistence
export const getSavedReflection = (day: number): string => {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(`${STORAGE_KEYS.REFLECTION_PREFIX}${day}`) || '';
};

export const saveReflection = (day: number, text: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(`${STORAGE_KEYS.REFLECTION_PREFIX}${day}`, text);
};

export const clearDaySubmission = (day: number): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(`${STORAGE_KEYS.SUBMISSIONS}_day_${day}`);
    localStorage.removeItem(`${STORAGE_KEYS.REFLECTION_PREFIX}${day}`);
  } catch (e) {
    console.error('Failed to clear submission', e);
  }
};
