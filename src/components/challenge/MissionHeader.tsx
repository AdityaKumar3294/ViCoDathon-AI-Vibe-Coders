import React from 'react';
import { useApp } from '../../context/AppContext';
import { Clock, Award, Flame, ArrowLeft, ShieldCheck } from 'lucide-react';
import { playTactileClick } from '../../utils/sound';

export const MissionHeader: React.FC = () => {
  const { setRoute, dayMission, profile, themeMode } = useApp();
  const isNight = themeMode === 'night';

  return (
    <div className="space-y-4">
      {/* Top Breadcrumb & Back action */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            playTactileClick();
            setRoute('/dashboard');
          }}
          className={`inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-xl border transition-colors cursor-pointer ${
            isNight 
              ? 'text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border-white/5' 
              : 'text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border-slate-200 shadow-xs'
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-500/10 px-3 py-1 rounded-xl border border-orange-500/20">
            <Flame className="w-3.5 h-3.5 fill-orange-500" />
            <span>{profile.streakDays}d Streak at Stake</span>
          </span>
        </div>
      </div>

      {/* Main Mission Banner */}
      <div className={`p-6 sm:p-7 rounded-3xl border-2 transition-all duration-300 space-y-4 text-left ${
        isNight 
          ? 'bg-gradient-to-r from-purple-950/80 via-[#111827] to-[#0B1220] border-purple-500/40 shadow-2xl text-white' 
          : 'bg-gradient-to-r from-purple-50 via-white to-purple-50/50 border-purple-200 shadow-md shadow-purple-500/5 text-slate-900'
      }`}>
        <div className="flex flex-wrap items-center gap-2">
          <span className={`px-3 py-1 text-xs font-extrabold rounded-full uppercase tracking-wider ${
            isNight 
              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' 
              : 'bg-purple-100 text-purple-800 border border-purple-200'
          }`}>
            DAY {dayMission.day} OF 60
          </span>
          <span className={`px-2.5 py-0.5 text-[11px] font-bold rounded-md ${
            isNight ? 'bg-white/5 text-slate-300' : 'bg-slate-100 text-slate-700'
          }`}>
            {dayMission.trackName}
          </span>
          <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-md bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/20">
            {dayMission.difficulty}
          </span>
        </div>

        <h1 className={`text-2xl sm:text-4xl font-extrabold leading-tight ${
          isNight ? 'text-white' : 'text-slate-900'
        }`}>
          {dayMission.title}
        </h1>

        {/* Mission Metadata badges */}
        <div className={`flex flex-wrap items-center gap-4 text-xs font-semibold pt-2 border-t ${
          isNight ? 'border-white/10' : 'border-purple-100'
        }`}>
          <div className={`flex items-center gap-1.5 ${isNight ? 'text-slate-300' : 'text-slate-600'}`}>
            <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>Estimated: {dayMission.estimatedMinutes} Minutes</span>
          </div>

          <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-300 font-bold">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Reward: +{dayMission.xpReward} XP</span>
          </div>

          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Locks Day 12 Streak</span>
          </div>
        </div>
      </div>
    </div>
  );
};
