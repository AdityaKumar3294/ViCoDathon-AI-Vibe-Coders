export type RoutePath = '/' | '/dashboard' | '/day/12' | '/login' | '/register';
export type ThemeMode = 'day' | 'night';

export type TrackId = 'systems' | 'fullstack' | 'ai';

export interface TrackInfo {
  id: TrackId;
  name: string;
  tagline: string;
  icon: string;
  color: string;
  gradient: string;
  totalDays: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  techStack: string[];
}

export interface DayMission {
  day: number;
  title: string;
  trackId: TrackId;
  trackName: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedMinutes: number;
  xpReward: number;
  summary: string;
  recruiterWhy: string;
  objectives: string[];
  requirements: {
    id: string;
    text: string;
    completed: boolean;
    hint?: string;
  }[];
  starterCode: {
    language: string;
    filename: string;
    code: string;
  }[];
  resources: {
    title: string;
    url: string;
    type: 'docs' | 'video' | 'article' | 'github';
    readTime: string;
  }[];
  sampleSolutionPreview: string;
  tags: string[];
}

export interface SubmissionData {
  day: number;
  githubUrl: string;
  linkedinUrl: string;
  reflection: string;
  submittedAt?: string;
  commitHash?: string;
  commitMessage?: string;
  linesAdded?: number;
  linkedinPostLikes?: number;
  isVerified?: boolean;
}

export interface HeatmapDay {
  date: string;
  dayNumber: number;
  count: number; // 0 to 4 commits
  status: 'completed' | 'missed' | 'today' | 'upcoming' | 'frozen';
  missionTitle: string;
  xp: number;
  commitMessage?: string;
  linkedinUrl?: string;
}

export interface AchievementBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'streak' | 'quality' | 'social' | 'milestone';
  unlocked: boolean;
  unlockedDate?: string;
  xpBonus: number;
  progressPercent: number;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  college: string;
  streak: number;
  xp: number;
  level: number;
  badgeCount: number;
  isCurrentUser?: boolean;
  track: string;
  githubUsername: string;
}

export interface EdgeCaseState {
  isFirstDay: boolean;
  isStreakBroken: boolean;
  isStreakFreezeUsed: boolean;
  isEmptyProfile: boolean;
  isBrokenGitHubLink: boolean;
  isBrokenLinkedInLink: boolean;
  isProofPending?: boolean;
}

export interface StudentProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  college: string;
  branch: string;
  graduationYear: number;
  avatar: string;
  track: TrackId;
  currentDay: number;
  streakDays: number;
  longestStreak: number;
  totalXp: number;
  level: number;
  levelTitle: string;
  globalRank: number;
  totalParticipants: number;
  percentile: number;
  streakFreezesAvailable: number;
  streakFreezeUsed: boolean;
  weeklyCommits: number;
  publicPortfolioSlug: string;
  recruitersViewed: number;
}
