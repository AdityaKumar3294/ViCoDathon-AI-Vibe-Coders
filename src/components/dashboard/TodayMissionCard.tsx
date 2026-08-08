import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Clock, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Server, 
  Flame,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { playTactileClick } from '../../utils/sound';

export const TodayMissionCard: React.FC = () => {
  const { setRoute, dayMission, submission, profile, themeMode, edgeCases } = useApp();
  const isNight = themeMode === 'night';
  const isCompleted = submission.isVerified;
  const isProofPending = edgeCases.isProofPending || (dayMission.requirements.every(r => r.completed) && !isCompleted);

  return (
    <div className={`p-6 sm:p-7 rounded-3xl border-2 transition-all duration-300 space-y-5 relative overflow-hidden group ${
      isNight 
        ? 'bg-gradient-to-br from-[#162033] via-[#111827] to-[#0B1220] border-purple-500/40 shadow-2xl shadow-purple-950/40 text-white' 
        : 'bg-white border-purple-200 shadow-lg shadow-purple-500/5 text-slate-900'
    }`}>
      {/* Ambient background glow */}
      <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none ${
        isNight ? 'bg-purple-600/15' : 'bg-purple-100/60'
      }`} />

      {/* Top Tag & Status */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 text-xs font-extrabold rounded-full uppercase tracking-wider ${
            isNight ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'bg-purple-50 text-purple-700 border border-purple-200'
          }`}>
            Day {dayMission.day} of 60
          </span>
          <span className={`px-2.5 py-0.5 text-[11px] font-bold rounded-md ${
            isNight ? 'bg-white/5 text-slate-300' : 'bg-slate-100 text-slate-600'
          }`}>
            {dayMission.trackName}
          </span>
        </div>

        {isCompleted ? (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/30">
            <CheckCircle2 className="w-4 h-4" />
            <span>Mission Completed</span>
          </span>
        ) : (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 text-xs font-bold border border-amber-500/30 animate-pulse">
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>Today's Active Mission</span>
          </span>
        )}
      </div>

      {/* Main Title & Description */}
      <div className="space-y-2 relative z-10 text-left">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          <span className={`text-xs font-bold uppercase tracking-wider ${
            isNight ? 'text-purple-300' : 'text-purple-600'
          }`}>
            Primary Focal Point
          </span>
        </div>
        <h2 className={`text-xl sm:text-2xl font-extrabold transition-colors leading-tight ${
          isNight ? 'text-white group-hover:text-purple-300' : 'text-slate-900 group-hover:text-purple-700'
        }`}>
          {dayMission.title}
        </h2>
        <p className={`text-xs sm:text-sm leading-relaxed line-clamp-2 ${
          isNight ? 'text-slate-300' : 'text-slate-600'
        }`}>
          {dayMission.summary}
        </p>
      </div>

      {/* Meta Badges */}
      <div className="flex flex-wrap items-center gap-3 text-xs font-semibold relative z-10">
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${
          isNight ? 'bg-white/5 text-slate-200 border-white/5' : 'bg-slate-50 text-slate-700 border-slate-200'
        }`}>
          <Clock className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
          <span>{dayMission.estimatedMinutes} Mins Duration</span>
        </div>

        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${
          isNight ? 'bg-white/5 text-slate-200 border-white/5' : 'bg-slate-50 text-slate-700 border-slate-200'
        }`}>
          <Award className="w-3.5 h-3.5 text-amber-500" />
          <span className="text-amber-600 dark:text-amber-300 font-bold">+{dayMission.xpReward} XP Reward</span>
        </div>

        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${
          isNight ? 'bg-white/5 text-slate-200 border-white/5' : 'bg-slate-50 text-slate-700 border-slate-200'
        }`}>
          <Server className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          <span>{dayMission.difficulty}</span>
        </div>
      </div>

      {/* Thoughtful Product Feature: Proof Before You Forget */}
      {isProofPending && (
        <div className={`p-4 rounded-2xl border transition-all space-y-2.5 relative z-10 ${
          isNight ? 'bg-indigo-950/40 border-indigo-500/50 text-white' : 'bg-indigo-50/90 border-indigo-200 text-indigo-950'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-indigo-600 dark:text-indigo-300">
              <ShieldCheck className="w-4 h-4 animate-pulse text-indigo-500" />
              <span>DON'T LOSE TODAY'S PROOF</span>
            </div>
            <span className="text-[10px] font-mono font-bold text-amber-500">
              ~2 mins to protect streak
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
          <div className="flex items-center justify-between pt-0.5">
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Publish your links to record your proof on your recruiter portfolio.
            </p>
            <button
              onClick={() => {
                playTactileClick();
                setRoute('/day/12');
              }}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-sm shrink-0 flex items-center gap-1 cursor-pointer"
            >
              <span>Finish Proof →</span>
            </button>
          </div>
        </div>
      )}

      {/* Quick Continue CTA */}
      <div className={`pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t relative z-10 ${
        isNight ? 'border-white/10' : 'border-slate-100'
      }`}>
        <div className={`flex items-center gap-2 text-xs ${
          isNight ? 'text-slate-400' : 'text-slate-500'
        }`}>
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Protects your {profile.streakDays}-day streak upon verification</span>
        </div>

        <button
          onClick={() => {
            playTactileClick();
            setRoute('/day/12');
          }}
          className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 transition-all flex items-center justify-center gap-2 group/btn active:scale-95 cursor-pointer"
        >
          <span>{isCompleted ? `Review Day ${dayMission.day}` : `Continue Day ${dayMission.day} →`}</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
