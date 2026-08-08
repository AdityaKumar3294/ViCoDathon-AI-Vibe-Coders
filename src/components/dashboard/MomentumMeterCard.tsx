import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Flame, Star, TrendingUp, Clock, Zap, Info } from 'lucide-react';
import { playTactileClick } from '../../utils/sound';

export const MomentumMeterCard: React.FC = () => {
  const { profile, edgeCases, themeMode } = useApp();
  const isNight = themeMode === 'night';
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 1, minutes: 48, seconds: 32 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const streakScore = Math.min(30, (profile.streakDays / 10) * 30);
  const weeklyScore = (profile.weeklyCommits / 7) * 30;
  const xpScore = edgeCases.isFirstDay ? 5 : 20;
  const timeScore = 16;
  const totalMomentum = Math.round(streakScore + weeklyScore + xpScore + timeScore);

  return (
    <div className={`p-5 sm:p-6 rounded-3xl border transition-all duration-300 space-y-4 relative overflow-hidden ${
      isNight 
        ? 'bg-[#111827] border-white/10 shadow-xl text-white' 
        : 'bg-white border-slate-200/90 shadow-md shadow-slate-200/50 text-slate-900'
    }`}>
      {/* Glow highlight */}
      <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl pointer-events-none ${
        isNight ? 'bg-amber-500/10' : 'bg-amber-100/60'
      }`} />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-2xl bg-amber-500/15 text-amber-500 border border-amber-500/30">
            <Zap className="w-5 h-5 fill-amber-500 text-amber-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`text-base font-extrabold ${isNight ? 'text-white' : 'text-slate-900'}`}>Momentum Meter</h3>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-amber-500/15 text-amber-600 dark:text-amber-300 border border-amber-500/30">
                Multi-Factor
              </span>
            </div>
            <p className={`text-xs ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>Consistency velocity & pace score</p>
          </div>
        </div>

        <button
          onClick={() => {
            playTactileClick();
            setShowBreakdown(!showBreakdown);
          }}
          className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1 p-1 cursor-pointer"
        >
          <span>{showBreakdown ? 'Hide Formula' : 'Formula'}</span>
          <Info className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Score Progress Bar */}
      <div className="space-y-2 text-left">
        <div className="flex items-baseline justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 font-mono">
              {totalMomentum}
            </span>
            <span className={`text-xs font-bold ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>/ 100 Index</span>
          </div>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Top 0.3% Pace (Unstoppable)</span>
          </span>
        </div>

        <div className={`w-full rounded-full h-3 overflow-hidden border p-0.5 ${
          isNight ? 'bg-slate-800 border-white/5' : 'bg-slate-100 border-slate-200'
        }`}>
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 transition-all duration-700 shadow-sm"
            style={{ width: `${totalMomentum}%` }}
          />
        </div>
      </div>

      {/* 4 Multi-factor pillars */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
        {/* Pillar 1: Streak */}
        <div className={`p-2.5 rounded-2xl border text-center space-y-1 ${
          isNight ? 'bg-[#0B1220] border-white/5' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center justify-center gap-1 text-[11px] text-orange-500 font-bold">
            <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
            <span>Streak</span>
          </div>
          <div className={`text-sm font-extrabold font-mono ${isNight ? 'text-white' : 'text-slate-900'}`}>
            {profile.streakDays} Days
          </div>
          <span className={`text-[10px] block ${isNight ? 'text-slate-500' : 'text-slate-400'}`}>+28 pts</span>
        </div>

        {/* Pillar 2: Today's XP */}
        <div className={`p-2.5 rounded-2xl border text-center space-y-1 ${
          isNight ? 'bg-[#0B1220] border-white/5' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center justify-center gap-1 text-[11px] text-amber-500 font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>Today XP</span>
          </div>
          <div className={`text-sm font-extrabold font-mono ${isNight ? 'text-white' : 'text-slate-900'}`}>
            +150 XP
          </div>
          <span className={`text-[10px] block ${isNight ? 'text-slate-500' : 'text-slate-400'}`}>Pending</span>
        </div>

        {/* Pillar 3: Weekly Consistency */}
        <div className={`p-2.5 rounded-2xl border text-center space-y-1 ${
          isNight ? 'bg-[#0B1220] border-white/5' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center justify-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            <span>Weekly</span>
          </div>
          <div className={`text-sm font-extrabold font-mono ${isNight ? 'text-white' : 'text-slate-900'}`}>
            {profile.weeklyCommits}/7 Days
          </div>
          <span className={`text-[10px] block ${isNight ? 'text-slate-500' : 'text-slate-400'}`}>86% Active</span>
        </div>

        {/* Pillar 4: Deadline Countdown */}
        <div className={`p-2.5 rounded-2xl border text-center space-y-1 ${
          isNight ? 'bg-[#0B1220] border-white/5' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center justify-center gap-1 text-[11px] text-purple-600 dark:text-purple-400 font-bold">
            <Clock className="w-3.5 h-3.5 text-purple-500" />
            <span>Cutoff</span>
          </div>
          <div className={`text-xs font-extrabold font-mono ${isNight ? 'text-white' : 'text-slate-900'}`}>
            {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
          </div>
          <span className="text-[10px] text-purple-600 dark:text-purple-300 block font-medium">Until 11:59 PM</span>
        </div>
      </div>

      {/* Expanded Breakdown Formula Accordion */}
      {showBreakdown && (
        <div className={`p-3.5 rounded-2xl border text-xs space-y-2 animate-fadeIn text-left ${
          isNight ? 'bg-[#0B1220] border-purple-500/20 text-slate-300' : 'bg-purple-50/60 border-purple-200 text-slate-700'
        }`}>
          <div className={`font-bold flex items-center gap-1.5 ${isNight ? 'text-white' : 'text-slate-900'}`}>
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>How ABTalks Momentum Index is Computed</span>
          </div>
          <p className={`text-[11px] leading-relaxed ${isNight ? 'text-slate-400' : 'text-slate-600'}`}>
            Unlike simple streak counters that cause students to quit after a single missed day, ABTalks evaluates multi-dimensional velocity:
          </p>
          <ul className={`space-y-1 text-[11px] pl-2 ${isNight ? 'text-slate-300' : 'text-slate-700'}`}>
            <li>• <strong>Streak Factor (30 pts):</strong> Sustained consecutive commit momentum.</li>
            <li>• <strong>Weekly Consistency (30 pts):</strong> Rolling 7-day commit cadence.</li>
            <li>• <strong>Daily XP Readiness (20 pts):</strong> Active code test pass state.</li>
            <li>• <strong>Nocturnal Deadline Buffer (20 pts):</strong> Submitting safely before 11:59 PM.</li>
          </ul>
        </div>
      )}
    </div>
  );
};
