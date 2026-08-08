import React from 'react';
import { useApp } from '../../context/AppContext';
import { Moon, Sun, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { playTactileClick } from '../../utils/sound';

export const GreetingHeader: React.FC = () => {
  const { profile, themeMode, setRoute, edgeCases, dayMission } = useApp();
  const isNight = themeMode === 'night';
  const firstName = profile.name?.trim() ? profile.name.split(' ')[0] : 'Builder';
  const isFirstDay = edgeCases.isFirstDay || profile.currentDay === 1;
  const isStreakBroken = edgeCases.isStreakBroken;
  const isEmptyProfile = edgeCases.isEmptyProfile || (!profile.name || !profile.college);

  return (
    <div className="space-y-4 text-left">
      {/* Non-blocking Empty Profile Prompt */}
      {isEmptyProfile && (
        <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
          isNight 
            ? 'bg-amber-950/30 border-amber-500/40 text-amber-200' 
            : 'bg-amber-50 border-amber-300 text-amber-950'
        }`}>
          <div className="space-y-0.5">
            <span className="text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5">
              👋 Complete Your Developer Profile
            </span>
            <p className="text-xs text-amber-800 dark:text-amber-300/80">
              Add your College, Track & GitHub handle to unlock live recruiter portfolio views and college leaderboard rank.
            </p>
          </div>
          <button
            onClick={() => {
              playTactileClick();
              setRoute('/register');
            }}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-sm shrink-0 flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>Quick Profile Setup →</span>
          </button>
        </div>
      )}

      {/* Missed Day Recovery Banner (Non-destructive) */}
      {isStreakBroken && (
        <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
          isNight 
            ? 'bg-rose-950/30 border-rose-500/40 text-rose-200' 
            : 'bg-rose-50 border-rose-300 text-rose-950'
        }`}>
          <div className="space-y-0.5">
            <span className="text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5">
              ⚡ Streak Recovery Mode • Day {dayMission.day}
            </span>
            <p className="text-xs text-rose-800 dark:text-rose-300/80">
              You missed yesterday's session, but your previous verified proof remains safe on your portfolio. Ship today's challenge to reignite your streak!
            </p>
          </div>
          <button
            onClick={() => {
              playTactileClick();
              setRoute('/day/12');
            }}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-sm shrink-0 flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>Reignite Streak Today →</span>
          </button>
        </div>
      )}

      {/* Unified Mobile Header (390px Optimized) */}
      <div className={`md:hidden p-4 rounded-3xl border transition-all duration-300 space-y-3.5 ${
        isNight 
          ? 'bg-[#111827] border-white/10 shadow-xl text-white' 
          : 'bg-white border-slate-200/90 shadow-md shadow-slate-200/50 text-slate-900'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={profile.avatar}
              alt={profile.name || 'Builder'}
              className="w-11 h-11 rounded-2xl object-cover border-2 border-purple-500/40 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm font-extrabold tracking-tight">
                  Hi, {firstName} 👋
                </h1>
                <span className="px-1.5 py-0.2 text-[9px] font-bold rounded-md bg-purple-500/15 text-purple-600 dark:text-purple-300 border border-purple-500/25">
                  Lvl {profile.level}
                </span>
              </div>
              <p className={`text-[11px] font-medium ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>
                Day {dayMission.day} of 60 • {profile.track}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs font-extrabold text-orange-500 bg-orange-500/10 px-2.5 py-1 rounded-xl border border-orange-500/20">
            <span>🔥 {profile.streakDays}d Streak</span>
          </div>
        </div>

        {/* Level XP Progress Bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px]">
            <span className={`font-medium ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>
              {profile.levelTitle}
            </span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">
              {profile.totalXp} XP
            </span>
          </div>
          <div className={`w-full rounded-full h-1.5 overflow-hidden border ${
            isNight ? 'bg-slate-800 border-white/5' : 'bg-slate-100 border-slate-200'
          }`}>
            <div
              className="bg-gradient-to-r from-purple-600 to-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.max(5, (profile.totalXp % 1000) / 10)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Desktop & Tablet Header Layout */}
      <div className="hidden md:block space-y-4">
        {/* Day Mode Optimistic Banner or Night Focus Mode Banner */}
        {!isNight ? (
          <div className="p-5 rounded-3xl bg-gradient-to-r from-purple-50 via-indigo-50/70 to-purple-50/50 border border-purple-200/80 shadow-sm space-y-3 relative overflow-hidden transition-all duration-300">
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-200/40 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between gap-3 relative z-10">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-2xl bg-purple-600/10 text-purple-700 border border-purple-200 shadow-xs">
                  <Sun className="w-5 h-5 text-amber-500 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-extrabold text-slate-900">
                      {isFirstDay ? `🚀 Welcome to Day 1, ${firstName}!` : `☀️ Good morning, ${firstName}.`}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-md bg-purple-100 text-purple-800 border border-purple-200">
                      {isFirstDay ? 'Day 1 Genesis • Journey Begins' : 'Day Mode • Ready to Build'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                    {isFirstDay 
                      ? "Your 60-day engineering transformation begins tonight. Complete Day 1's mission to ignite your first verified coding streak."
                      : `Let's make today's commit count. Complete Day ${dayMission.day}'s mission to level up and protect your ${profile.streakDays}-day streak.`}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  playTactileClick();
                  setRoute('/day/12');
                }}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-600/20 flex items-center justify-center gap-1.5 transition-all shrink-0 active:scale-95 cursor-pointer"
              >
                <span>{isFirstDay ? 'Start Day 1 Mission' : `Continue Day ${dayMission.day}`}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-1 border-t border-purple-100">
              <span className="flex items-center gap-1 text-slate-600 font-medium">
                <Clock className="w-3 h-3 text-purple-600" />
                <span>Est. Time: {dayMission.estimatedMinutes} mins</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                <ShieldCheck className="w-3 h-3" />
                <span>{profile.streakFreezesAvailable} Streak Freezes Available</span>
              </span>
            </div>
          </div>
        ) : (
          <div className="p-5 rounded-3xl bg-gradient-to-r from-indigo-950/90 via-purple-950/80 to-[#111827] border border-indigo-500/40 shadow-2xl shadow-indigo-500/10 space-y-3 relative overflow-hidden animate-fadeIn transition-all duration-300">
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between gap-3 relative z-10">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  <Moon className="w-5 h-5 text-indigo-300 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-extrabold text-white">
                      {isFirstDay ? `🌙 Welcome to Day 1, ${firstName}!` : `🌙 Good evening, ${firstName}.`}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      Night Focus Mode Active
                    </span>
                  </div>
                  <p className="text-xs text-indigo-200/90 leading-relaxed max-w-xl">
                    {isFirstDay
                      ? "One focused session. Your 60-day journey starts tonight. Finish Day 1 before midnight to earn your first verified commit."
                      : `One focused session. One more day protected. Today's challenge takes about ${dayMission.estimatedMinutes} minutes. Finish before midnight for your streak.`}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  playTactileClick();
                  setRoute('/day/12');
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-1.5 transition-all shrink-0 active:scale-95 cursor-pointer"
              >
                <span>{isFirstDay ? 'Start Day 1 Mission' : 'Enter Deep Work'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-4 text-[11px] text-indigo-300/80 pt-1 border-t border-indigo-500/15">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-indigo-400" />
                <span>Deadline: 11:59 PM Tonight</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <ShieldCheck className="w-3 h-3" />
                <span>{profile.streakFreezesAvailable} Streak Freeze Shields Remaining</span>
              </span>
            </div>
          </div>
        )}

        {/* Main Student Greeting & Level Bar */}
        <div className={`flex items-center justify-between gap-4 p-5 sm:p-6 rounded-3xl border transition-all duration-300 ${
          isNight 
            ? 'bg-[#111827] border-white/10 shadow-xl' 
            : 'bg-white border-slate-200/90 shadow-md shadow-slate-200/50'
        }`}>
          <div className="flex items-center gap-4">
            <img
              src={profile.avatar}
              alt={profile.name || 'Builder'}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-purple-500/40 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className={`text-lg sm:text-xl font-extrabold ${
                  isNight ? 'text-white' : 'text-slate-900'
                }`}>
                  {profile.name || 'Anonymous Builder'}
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-purple-500/15 text-purple-600 dark:text-purple-300 border border-purple-500/25">
                  Level {profile.level}
                </span>
              </div>
              <p className="text-xs text-purple-600 dark:text-purple-300 font-semibold mt-0.5">
                {profile.levelTitle}
              </p>
              <p className={`text-[11px] ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>
                {profile.college || 'Engineering Student'}
              </p>
            </div>
          </div>

          {/* Level XP Progress Pill */}
          <div className="flex flex-col items-end gap-1.5">
            <div className="text-right">
              <span className={`text-xs font-medium ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>Total Experience</span>
              <div className="text-sm sm:text-base font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                {profile.totalXp} XP
              </div>
            </div>
            <div className={`w-36 rounded-full h-2 overflow-hidden border ${
              isNight ? 'bg-slate-800 border-white/5' : 'bg-slate-100 border-slate-200'
            }`}>
              <div
                className="bg-gradient-to-r from-purple-600 to-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.max(5, (profile.totalXp % 1000) / 10)}%` }}
              />
            </div>
            <span className={`text-[10px] ${
              isNight ? 'text-slate-500' : 'text-slate-400'
            }`}>
              {1000 - (profile.totalXp % 1000)} XP to Level {profile.level + 1}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
