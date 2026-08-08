import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Wrench, 
  X, 
  RotateCcw, 
  Moon, 
  Sun,
  Flame, 
  ShieldAlert, 
  UserX, 
  GitFork, 
  Share2, 
  Sparkles,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { playTactileClick } from '../../utils/sound';

export const StateSimulatorDrawer: React.FC = () => {
  const { 
    isStateSimulatorOpen, 
    setIsStateSimulatorOpen, 
    edgeCases, 
    applyEdgeCase,
    isNightFocusMode, 
    toggleNightFocus, 
    themeMode,
    toggleThemeMode,
    profile, 
  } = useApp();

  const isNight = themeMode === 'night';

  if (!isStateSimulatorOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className={`w-full max-w-md h-full border-l p-6 overflow-y-auto shadow-2xl flex flex-col justify-between transition-colors duration-300 ${
          isNight ? 'bg-[#111827] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <div>
          {/* Header */}
          <div className={`flex items-center justify-between pb-4 border-b ${
            isNight ? 'border-white/10' : 'border-slate-200'
          }`}>
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/30">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold">Edge Case & State Simulator</h3>
                <p className={`text-xs ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>Interactive testing suite for judges & reviewers</p>
              </div>
            </div>
            <button
              onClick={() => {
                playTactileClick();
                setIsStateSimulatorOpen(false);
              }}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isNight ? 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Explanation Alert */}
          <div className="mt-4 p-3.5 rounded-xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-500/30 text-xs text-purple-950 dark:text-purple-200 font-medium leading-relaxed">
            <div className="flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
              <span>
                Toggle any real-world edge case below to inspect how the UI, motivation triggers, Day/Night themes, validations, and night owl features adapt instantly.
              </span>
            </div>
          </div>

          {/* Current Live Stats preview */}
          <div className={`mt-4 grid grid-cols-3 gap-2 text-center p-3 rounded-xl border text-xs ${
            isNight ? 'bg-[#0B1220] border-white/5' : 'bg-slate-50 border-slate-200'
          }`}>
            <div>
              <span className={`text-[10px] block ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>Current Day</span>
              <span className="font-bold text-purple-600 dark:text-purple-300 text-sm">Day {profile.currentDay}</span>
            </div>
            <div>
              <span className={`text-[10px] block ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>Streak</span>
              <span className="font-bold text-orange-500 text-sm">{profile.streakDays} Days 🔥</span>
            </div>
            <div>
              <span className={`text-[10px] block ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>Total XP</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">{profile.totalXp} XP</span>
            </div>
          </div>

          {/* Theme Quick Switcher in Simulator */}
          <div className="mt-5 space-y-2">
            <h4 className={`text-xs font-bold uppercase tracking-wider ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>
              Theme Environment Switcher
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  if (themeMode !== 'day') toggleThemeMode();
                }}
                className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  !isNight 
                    ? 'bg-purple-50 border-purple-500 text-purple-700 shadow-xs' 
                    : 'bg-[#0B1220] border-white/10 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Sun className="w-4 h-4 text-amber-500" />
                <span>Day Mode (Light)</span>
              </button>

              <button
                onClick={() => {
                  if (themeMode !== 'night') toggleThemeMode();
                }}
                className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isNight 
                    ? 'bg-purple-950/50 border-purple-500 text-purple-300 shadow-md shadow-purple-900/30' 
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Moon className="w-4 h-4 text-purple-400" />
                <span>Night Mode (Dark)</span>
              </button>
            </div>
          </div>

          {/* Scenarios List */}
          <div className="mt-5 space-y-3">
            <h4 className={`text-xs font-bold uppercase tracking-wider ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>
              Simulate Edge Cases
            </h4>

            {/* Edge Case 1: First Day Experience */}
            <button
              onClick={() => {
                playTactileClick();
                applyEdgeCase('isFirstDay');
              }}
              className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                edgeCases.isFirstDay
                  ? isNight ? 'bg-purple-950/40 border-purple-500/60 text-purple-200' : 'bg-purple-50 border-purple-500/60 text-purple-900'
                  : isNight ? 'bg-[#0B1220]/60 border-white/5 text-slate-300 hover:bg-[#0B1220]' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
                <div>
                  <span className={`text-xs font-bold block ${isNight ? 'text-white' : 'text-slate-900'}`}>First Day (Day 1 Experience)</span>
                  <span className={`text-[11px] ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>Zero streak, onboarding guidance, starter mission</span>
                </div>
              </div>
              {edgeCases.isFirstDay ? (
                <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-slate-400" />
              )}
            </button>

            {/* Edge Case 2: Broken Streak */}
            <button
              onClick={() => {
                playTactileClick();
                applyEdgeCase('isStreakBroken');
              }}
              className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                edgeCases.isStreakBroken
                  ? isNight ? 'bg-rose-950/40 border-rose-500/60 text-rose-200' : 'bg-rose-50 border-rose-400 text-rose-900'
                  : isNight ? 'bg-[#0B1220]/60 border-white/5 text-slate-300 hover:bg-[#0B1220]' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-start gap-3">
                <Flame className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                <div>
                  <span className={`text-xs font-bold block ${isNight ? 'text-white' : 'text-slate-900'}`}>Missed Day / Broken Streak</span>
                  <span className={`text-[11px] ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>Shows streak loss warning & recovery mission</span>
                </div>
              </div>
              {edgeCases.isStreakBroken ? (
                <CheckCircle2 className="w-4 h-4 text-rose-500" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-slate-400" />
              )}
            </button>

            {/* Edge Case 3: Streak Freeze Protection Used */}
            <button
              onClick={() => {
                playTactileClick();
                applyEdgeCase('isStreakFreezeUsed');
              }}
              className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                edgeCases.isStreakFreezeUsed
                  ? isNight ? 'bg-cyan-950/40 border-cyan-500/60 text-cyan-200' : 'bg-cyan-50 border-cyan-400 text-cyan-900'
                  : isNight ? 'bg-[#0B1220]/60 border-white/5 text-slate-300 hover:bg-[#0B1220]' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-start gap-3">
                <ShieldAlert className="w-4 h-4 text-cyan-500 mt-0.5 shrink-0" />
                <div>
                  <span className={`text-xs font-bold block ${isNight ? 'text-white' : 'text-slate-900'}`}>Streak Freeze Shield Active</span>
                  <span className={`text-[11px] ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>Simulates frozen streak protected for 24 hours</span>
                </div>
              </div>
              {edgeCases.isStreakFreezeUsed ? (
                <CheckCircle2 className="w-4 h-4 text-cyan-500" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-slate-400" />
              )}
            </button>

            {/* Edge Case 4: Empty Profile */}
            <button
              onClick={() => {
                playTactileClick();
                applyEdgeCase('isEmptyProfile');
              }}
              className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                edgeCases.isEmptyProfile
                  ? isNight ? 'bg-amber-950/40 border-amber-500/60 text-amber-200' : 'bg-amber-50 border-amber-400 text-amber-900'
                  : isNight ? 'bg-[#0B1220]/60 border-white/5 text-slate-300 hover:bg-[#0B1220]' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-start gap-3">
                <UserX className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <span className={`text-xs font-bold block ${isNight ? 'text-white' : 'text-slate-900'}`}>Empty Profile & No Submissions</span>
                  <span className={`text-[11px] ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>Empty state indicators, call to action prompts</span>
                </div>
              </div>
              {edgeCases.isEmptyProfile ? (
                <CheckCircle2 className="w-4 h-4 text-amber-500" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-slate-400" />
              )}
            </button>

            {/* Edge Case 5: Broken GitHub Link Test */}
            <button
              onClick={() => {
                playTactileClick();
                applyEdgeCase('isBrokenGitHubLink');
              }}
              className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                edgeCases.isBrokenGitHubLink
                  ? isNight ? 'bg-red-950/40 border-red-500/60 text-red-200' : 'bg-red-50 border-red-400 text-red-900'
                  : isNight ? 'bg-[#0B1220]/60 border-white/5 text-slate-300 hover:bg-[#0B1220]' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-start gap-3">
                <GitFork className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                <div>
                  <span className={`text-xs font-bold block ${isNight ? 'text-white' : 'text-slate-900'}`}>Broken / Invalid GitHub Repo</span>
                  <span className={`text-[11px] ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>Triggers real-time regex & repo validation error</span>
                </div>
              </div>
              {edgeCases.isBrokenGitHubLink ? (
                <CheckCircle2 className="w-4 h-4 text-red-500" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-slate-400" />
              )}
            </button>

            {/* Edge Case 6: Broken LinkedIn Link Test */}
            <button
              onClick={() => {
                playTactileClick();
                applyEdgeCase('isBrokenLinkedInLink');
              }}
              className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                edgeCases.isBrokenLinkedInLink
                  ? isNight ? 'bg-blue-950/40 border-blue-500/60 text-blue-200' : 'bg-blue-50 border-blue-400 text-blue-900'
                  : isNight ? 'bg-[#0B1220]/60 border-white/5 text-slate-300 hover:bg-[#0B1220]' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-start gap-3">
                <Share2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                <div>
                  <span className={`text-xs font-bold block ${isNight ? 'text-white' : 'text-slate-900'}`}>Broken / Missing LinkedIn Post</span>
                  <span className={`text-[11px] ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>Triggers post verification & hashtag requirement check</span>
                </div>
              </div>
              {edgeCases.isBrokenLinkedInLink ? (
                <CheckCircle2 className="w-4 h-4 text-blue-500" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-slate-400" />
              )}
            </button>

            {/* Edge Case 7: Proof Before You Forget Reminder */}
            <button
              onClick={() => {
                playTactileClick();
                applyEdgeCase('isProofPending');
              }}
              className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                edgeCases.isProofPending
                  ? isNight ? 'bg-indigo-950/40 border-indigo-500/60 text-indigo-200' : 'bg-indigo-50 border-indigo-400 text-indigo-900'
                  : isNight ? 'bg-[#0B1220]/60 border-white/5 text-slate-300 hover:bg-[#0B1220]' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-start gap-3">
                <ShieldAlert className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                <div>
                  <span className={`text-xs font-bold block ${isNight ? 'text-white' : 'text-slate-900'}`}>Proof Before You Forget (Reminder)</span>
                  <span className={`text-[11px] ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>Simulates build finished with pending GitHub & LinkedIn proof</span>
                </div>
              </div>
              {edgeCases.isProofPending ? (
                <CheckCircle2 className="w-4 h-4 text-indigo-500" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-slate-400" />
              )}
            </button>

            {/* Night Focus Toggle */}
            <button
              onClick={() => {
                playTactileClick();
                toggleNightFocus();
              }}
              className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                isNightFocusMode
                  ? isNight ? 'bg-indigo-950/50 border-indigo-500/60 text-indigo-200' : 'bg-indigo-50 border-indigo-400 text-indigo-900'
                  : isNight ? 'bg-[#0B1220]/60 border-white/5 text-slate-300 hover:bg-[#0B1220]' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-start gap-3">
                <Moon className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                <div>
                  <span className={`text-xs font-bold block ${isNight ? 'text-white' : 'text-slate-900'}`}>Night Focus Atmosphere (After 9 PM)</span>
                  <span className={`text-[11px] ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>Enables ambient calm glow, countdown to midnight</span>
                </div>
              </div>
              {isNightFocusMode ? (
                <CheckCircle2 className="w-4 h-4 text-indigo-500" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-slate-400" />
              )}
            </button>
          </div>
        </div>

        {/* Footer: Reset Button */}
        <div className={`pt-6 border-t flex flex-col gap-2 ${
          isNight ? 'border-white/10' : 'border-slate-200'
        }`}>
          <button
            onClick={() => {
              playTactileClick();
              applyEdgeCase('reset');
            }}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold border flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isNight ? 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border-white/10' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border-slate-300'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All to Default Day 12</span>
          </button>

          <button
            onClick={() => {
              playTactileClick();
              setIsStateSimulatorOpen(false);
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md shadow-purple-600/30 transition-all cursor-pointer"
          >
            Apply & Close Simulator
          </button>
        </div>
      </div>
    </div>
  );
};
