import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Flame, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Bot, 
  Copy,
  Check
} from 'lucide-react';
import { playTactileClick } from '../../utils/sound';
import { mockAchievements } from '../../data/mockData';

export const MobileDashboard: React.FC = () => {
  const { profile, dayMission, submission, setRoute, themeMode, edgeCases } = useApp();
  const isNight = themeMode === 'night';
  const isCompleted = submission.isVerified;
  const [copied, setCopied] = React.useState(false);

  const firstName = profile.name?.trim() ? profile.name.split(' ')[0] : 'Builder';
  const totalDays = 60;
  const completedCount = isCompleted ? profile.currentDay : profile.currentDay - 1;
  const progressPercent = Math.round((completedCount / totalDays) * 100);
  const remainingDays = totalDays - completedCount;

  const isFirstDay = edgeCases.isFirstDay || profile.currentDay === 1;
  const isStreakBroken = edgeCases.isStreakBroken;
  const isEmptyProfile = edgeCases.isEmptyProfile || (!profile.name || !profile.college);
  const isProofPending = edgeCases.isProofPending || (dayMission.requirements.every(r => r.completed) && !isCompleted);

  // Weekly consistency data (Monday to Sunday)
  const weekDays = [
    { label: 'M', completed: true },
    { label: 'T', completed: true },
    { label: 'W', completed: true },
    { label: 'T', completed: true },
    { label: 'F', completed: false, isToday: true },
    { label: 'S', completed: false },
    { label: 'S', completed: false },
  ];

  const handleCopyCommit = () => {
    playTactileClick();
    navigator.clipboard.writeText('feat(rate-limiter): implement atomic Redis sliding window counter with 429 Retry-After header');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-5 pb-24 text-left animate-fadeIn">
      {/* Non-blocking Profile Completion Prompt */}
      {isEmptyProfile && (
        <div className={`p-3.5 rounded-2xl border flex flex-col gap-2 transition-all ${
          isNight 
            ? 'bg-amber-950/30 border-amber-500/40 text-amber-200' 
            : 'bg-amber-50 border-amber-300 text-amber-950'
        }`}>
          <div className="space-y-0.5">
            <span className="text-xs font-extrabold uppercase tracking-wider block">
              👋 Complete Your Profile
            </span>
            <p className="text-[11px] text-amber-800 dark:text-amber-300/80">
              Add your College & GitHub handle to unlock recruiter portfolio rank.
            </p>
          </div>
          <button
            onClick={() => {
              playTactileClick();
              setRoute('/register');
            }}
            className="w-full py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-xs cursor-pointer"
          >
            Quick Profile Setup →
          </button>
        </div>
      )}

      {/* Missed Day Recovery Banner (Non-destructive) */}
      {isStreakBroken && (
        <div className={`p-3.5 rounded-2xl border flex flex-col gap-2 transition-all ${
          isNight 
            ? 'bg-rose-950/30 border-rose-500/40 text-rose-200' 
            : 'bg-rose-50 border-rose-300 text-rose-950'
        }`}>
          <div className="space-y-0.5">
            <span className="text-xs font-extrabold uppercase tracking-wider block">
              ⚡ Streak Recovery Mode • Day {dayMission.day}
            </span>
            <p className="text-[11px] text-rose-800 dark:text-rose-300/80">
              Missed yesterday? Your past progress is safe! Ship today's challenge to restart your flame.
            </p>
          </div>
          <button
            onClick={() => {
              playTactileClick();
              setRoute('/day/12');
            }}
            className="w-full py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-xs cursor-pointer"
          >
            Reignite Streak Today →
          </button>
        </div>
      )}

      {/* 1. GREETING & STATUS */}
      <div className="space-y-1 pt-1">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h1 className={`text-2xl font-extrabold tracking-tight ${isNight ? 'text-white' : 'text-slate-900'}`}>
              {isFirstDay ? `Welcome, ${firstName} 👋` : `Good evening, ${firstName} 👋`}
            </h1>
            <p className={`text-xs font-semibold ${isNight ? 'text-purple-300' : 'text-purple-700'}`}>
              Day {dayMission.day} of {totalDays} • {profile.track}
            </p>
          </div>

          {/* Compact Level Chip */}
          <div className={`px-2.5 py-1 rounded-xl text-[11px] font-bold font-mono border ${
            isNight 
              ? 'bg-purple-950/60 text-purple-300 border-purple-500/30' 
              : 'bg-purple-50 text-purple-800 border-purple-200'
          }`}>
            Lvl {profile.level} • {profile.totalXp} XP
          </div>
        </div>
      </div>

      {/* 2. STREAK */}
      <div className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
        isNight 
          ? 'bg-[#111827] border-orange-500/30 text-white shadow-md' 
          : 'bg-orange-50/70 border-orange-200 text-slate-900 shadow-xs'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-orange-500/15 text-orange-500 flex items-center justify-center border border-orange-500/30">
            <Flame className="w-5 h-5 fill-orange-500 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-extrabold tracking-tight">
                {profile.streakDays} day streak
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                {isFirstDay ? 'Day 1 Genesis' : 'Protected'}
              </span>
            </div>
            <p className={`text-[11px] ${isNight ? 'text-slate-400' : 'text-slate-600'}`}>
              {isFirstDay ? 'Submit Day 1 to ignite your streak flame.' : "You're building unstoppable momentum."}
            </p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400">
          🔥 #{profile.streakDays}
        </span>
      </div>

      {/* Thoughtful Product Feature: Proof Before You Forget */}
      {isProofPending && (
        <div className={`p-4 rounded-2xl border transition-all space-y-2.5 ${
          isNight ? 'bg-indigo-950/40 border-indigo-500/50 text-white' : 'bg-indigo-50/90 border-indigo-200 text-indigo-950'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-300">
              DON'T LOSE TODAY'S PROOF
            </span>
            <span className="text-[10px] font-mono font-bold text-amber-500">
              2 mins to protect streak
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs font-semibold">
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
              ✓ Build completed
            </span>
            <span className={`flex items-center gap-1 ${submission.githubUrl ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}>
              {submission.githubUrl ? '✓' : '○'} GitHub commit
            </span>
            <span className={`flex items-center gap-1 ${submission.linkedinUrl ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}>
              {submission.linkedinUrl ? '✓' : '○'} LinkedIn post
            </span>
          </div>
          <button
            onClick={() => {
              playTactileClick();
              setRoute('/day/12');
            }}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-xs flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>Finish Proof & Protect Streak →</span>
          </button>
        </div>
      )}

      {/* 3. TODAY'S MISSION */}
      <div className={`p-5 rounded-3xl border-2 transition-all duration-300 relative overflow-hidden group ${
        isNight 
          ? 'bg-gradient-to-br from-[#162033] via-[#111827] to-[#0B1220] border-purple-500/50 shadow-2xl shadow-purple-950/50 text-white' 
          : 'bg-white border-purple-300 shadow-xl shadow-purple-500/10 text-slate-900'
      }`}>
        {/* Subtle decorative glow */}
        <div className={`absolute top-0 right-0 w-44 h-44 rounded-full blur-2xl pointer-events-none ${
          isNight ? 'bg-purple-600/20' : 'bg-purple-200/50'
        }`} />

        <div className="space-y-4 relative z-10">
          {/* Card Header & Badges */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${
                isNight ? 'bg-purple-500/25 text-purple-200 border border-purple-500/40' : 'bg-purple-100 text-purple-800 border border-purple-200'
              }`}>
                TODAY'S MISSION
              </span>
              <span className={`text-[11px] font-bold ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>
                DAY {dayMission.day}
              </span>
            </div>

            {isCompleted ? (
              <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Complete</span>
              </span>
            ) : (
              <span className="text-[11px] font-bold text-amber-600 dark:text-amber-300 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{dayMission.estimatedMinutes} min</span>
              </span>
            )}
          </div>

          {/* Main Title & Metadata */}
          <div className="space-y-1.5">
            <h2 className={`text-xl font-extrabold leading-tight tracking-tight ${
              isNight ? 'text-white' : 'text-slate-900'
            }`}>
              {dayMission.title}
            </h2>
            <div className="flex items-center gap-2 text-xs font-semibold">
              <span className={isNight ? 'text-purple-300' : 'text-purple-700'}>
                {dayMission.difficulty}
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-amber-600 dark:text-amber-400 font-mono">
                +{dayMission.xpReward} XP
              </span>
              <span className="text-slate-400">•</span>
              <span className={isNight ? 'text-slate-400' : 'text-slate-500'}>
                {dayMission.trackName}
              </span>
            </div>
          </div>

          {/* Primary Dominant CTA (48-52px height) */}
          <button
            onClick={() => {
              playTactileClick();
              setRoute('/day/12');
            }}
            className="w-full h-12 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
          >
            <span>{isCompleted ? `Review Day ${dayMission.day} Submission →` : `Continue Day ${dayMission.day} →`}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4. 60-DAY PROGRESS (Simple, compact, not a giant desktop chart) */}
      <div className={`p-4 rounded-2xl border space-y-2.5 transition-all ${
        isNight ? 'bg-[#111827] border-white/10 text-white' : 'bg-white border-slate-200/90 text-slate-900 shadow-xs'
      }`}>
        <div className="flex items-center justify-between text-xs font-bold">
          <span className={`uppercase tracking-wider text-[10px] ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>
            60-DAY JOURNEY
          </span>
          <span className="font-mono text-purple-600 dark:text-purple-300">
            {completedCount} / {totalDays} completed
          </span>
        </div>

        {/* Clean Progress Bar */}
        <div className="space-y-1">
          <div className={`w-full rounded-full h-2 overflow-hidden border ${
            isNight ? 'bg-slate-800 border-white/5' : 'bg-slate-100 border-slate-200'
          }`}>
            <div 
              className="bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-500 h-full rounded-full transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] font-medium text-slate-400">
            <span>{progressPercent}% Complete</span>
            <span>{remainingDays} days remaining</span>
          </div>
        </div>
      </div>

      {/* 5. WEEKLY CONSISTENCY (Compact activity row: M T W T F S S) */}
      <div className={`p-4 rounded-2xl border space-y-3 transition-all ${
        isNight ? 'bg-[#111827] border-white/10 text-white' : 'bg-white border-slate-200/90 text-slate-900 shadow-xs'
      }`}>
        <div className="flex items-center justify-between text-xs font-bold">
          <span className={`uppercase tracking-wider text-[10px] ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>
            WEEKLY CONSISTENCY
          </span>
          <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            4/7 days active
          </span>
        </div>

        {/* 7-Day Rhythm Row */}
        <div className="grid grid-cols-7 gap-1.5 text-center">
          {weekDays.map((day, idx) => (
            <div 
              key={idx} 
              className={`py-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                day.completed
                  ? isNight 
                    ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300' 
                    : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : day.isToday
                    ? 'bg-purple-600 border-purple-400 text-white shadow-sm'
                    : isNight 
                      ? 'bg-slate-900 border-white/5 text-slate-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}
            >
              <span className="text-[10px] font-bold">{day.label}</span>
              <span className="text-xs">
                {day.completed ? '✓' : day.isToday ? '🔥' : '—'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 6. ACHIEVEMENTS (Compact horizontal scrolling row, no vertical clutter) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold px-1">
          <span className={`uppercase tracking-wider text-[10px] ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>
            ACHIEVEMENTS
          </span>
          <span className="text-[11px] text-purple-600 dark:text-purple-400 font-medium">
            6 of 8 Unlocked
          </span>
        </div>

        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-none">
          {mockAchievements.slice(0, 5).map((badge) => (
            <div 
              key={badge.id}
              className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-bold transition-all ${
                badge.unlocked
                  ? isNight 
                    ? 'bg-[#111827] border-purple-500/30 text-white' 
                    : 'bg-white border-purple-200 text-slate-900 shadow-xs'
                  : isNight 
                    ? 'bg-[#111827]/50 border-white/5 text-slate-500 opacity-60' 
                    : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
              }`}
            >
              <span className="text-base">{badge.icon === 'Flame' ? '🔥' : badge.icon === 'Crown' ? '👑' : '🏆'}</span>
              <div className="text-left">
                <span className="block text-[11px] whitespace-nowrap leading-tight">{badge.name}</span>
                <span className="text-[9px] font-mono text-amber-500">+{badge.xpBonus} XP</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. AI COACH (Small supportive section, not dominating the dashboard) */}
      <div className={`p-3.5 rounded-2xl border space-y-2 text-left transition-all ${
        isNight 
          ? 'bg-[#111827]/80 border-purple-500/25 text-slate-300' 
          : 'bg-purple-50/60 border-purple-100 text-slate-700'
      }`}>
        <div className="flex items-center justify-between text-[11px] font-bold">
          <span className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400">
            <Bot className="w-3.5 h-3.5" />
            <span>AI COACH</span>
          </span>
          <span className="text-[10px] text-slate-400 font-normal">Conventional Commit</span>
        </div>

        <p className="text-xs leading-relaxed">
          "You're doing well. Keep today's session focused. Format today's commit message cleanly for recruiter review:"
        </p>

        {/* 1-Click Copy Snippet */}
        <div className={`flex items-center justify-between p-2 rounded-xl border font-mono text-[10px] gap-2 ${
          isNight ? 'bg-slate-900 border-white/5 text-emerald-300' : 'bg-white border-purple-100 text-emerald-700 shadow-xs'
        }`}>
          <span className="truncate">feat(rate-limiter): atomic Redis sliding window counter</span>
          <button 
            onClick={handleCopyCommit}
            className="p-1 rounded-md text-slate-400 hover:text-purple-600 transition-colors cursor-pointer shrink-0"
            title="Copy commit message"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
};
