import React from 'react';
import { useApp } from '../../context/AppContext';

export const CircularProgressRings: React.FC = () => {
  const { profile, themeMode } = useApp();
  const isNight = themeMode === 'night';

  // Ring 1: 60-day challenge progress (12 of 60 = 20%)
  const challengePercent = Math.round((profile.currentDay / 60) * 100);
  // Ring 2: Weekly consistency (6 of 7 = 86%)
  const weeklyPercent = Math.round((profile.weeklyCommits / 7) * 100);
  // Ring 3: LinkedIn proof of work (11 of 11 = 100%)
  const linkedinPercent = 100;

  // SVG Ring calculation helper
  const size = 180;
  const strokeWidth = 10;
  const center = size / 2;

  const r1 = center - strokeWidth;
  const circ1 = 2 * Math.PI * r1;
  const offset1 = circ1 - (challengePercent / 100) * circ1;

  const r2 = r1 - strokeWidth - 5;
  const circ2 = 2 * Math.PI * r2;
  const offset2 = circ2 - (weeklyPercent / 100) * circ2;

  const r3 = r2 - strokeWidth - 5;
  const circ3 = 2 * Math.PI * r3;
  const offset3 = circ3 - (linkedinPercent / 100) * circ3;

  return (
    <div className={`p-4 sm:p-6 rounded-3xl border transition-all duration-300 space-y-5 sm:space-y-6 flex flex-col justify-between ${
      isNight 
        ? 'bg-[#111827] border-white/10 shadow-xl text-white' 
        : 'bg-white border-slate-200/90 shadow-md shadow-slate-200/50 text-slate-900'
    }`}>
      <div className="flex items-center justify-between">
        <div className="text-left">
          <h3 className={`text-base font-extrabold ${isNight ? 'text-white' : 'text-slate-900'}`}>Challenge Rings</h3>
          <p className={`text-xs ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>Consistency & proof-of-work closure</p>
        </div>
        <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-purple-500/15 text-purple-600 dark:text-purple-300 border border-purple-500/25">
          Level {profile.level}
        </span>
      </div>

      {/* SVG 3-Ring Visualizer (Apple Fitness / Linear Style) */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
        <div className="relative w-[180px] h-[180px] shrink-0">
          <svg width={size} height={size} className="transform -rotate-90">
            {/* Background Tracks */}
            <circle cx={center} cy={center} r={r1} stroke={isNight ? '#1E293B' : '#E2E8F0'} strokeWidth={strokeWidth} fill="transparent" />
            <circle cx={center} cy={center} r={r2} stroke={isNight ? '#1E293B' : '#E2E8F0'} strokeWidth={strokeWidth} fill="transparent" />
            <circle cx={center} cy={center} r={r3} stroke={isNight ? '#1E293B' : '#E2E8F0'} strokeWidth={strokeWidth} fill="transparent" />

            {/* Ring 1: Challenge 60 Days (Purple) */}
            <circle
              cx={center}
              cy={center}
              r={r1}
              stroke="#7C3AED"
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={circ1}
              strokeDashoffset={offset1}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />

            {/* Ring 2: Weekly Consistency (Cyan) */}
            <circle
              cx={center}
              cy={center}
              r={r2}
              stroke="#06B6D4"
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={circ2}
              strokeDashoffset={offset2}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />

            {/* Ring 3: LinkedIn Proof of Work (Emerald) */}
            <circle
              cx={center}
              cy={center}
              r={r3}
              stroke="#16A34A"
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={circ3}
              strokeDashoffset={offset3}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className={`text-2xl font-extrabold font-mono leading-none ${
              isNight ? 'text-white' : 'text-slate-900'
            }`}>
              {challengePercent}%
            </span>
            <span className={`text-[10px] font-semibold mt-1 ${
              isNight ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Completed
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-3 w-full sm:w-auto text-left">
          {/* Ring 1 Legend */}
          <div className="flex items-center gap-3 text-xs">
            <div className="w-3 h-3 rounded-full bg-purple-600 shadow-xs shrink-0" />
            <div className="flex-1">
              <div className={`flex items-center justify-between gap-4 font-bold ${
                isNight ? 'text-white' : 'text-slate-900'
              }`}>
                <span>60-Day Path</span>
                <span className="text-purple-600 dark:text-purple-400 font-mono">{profile.currentDay}/60 Days</span>
              </div>
              <span className={`text-[10px] block ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>{challengePercent}% of master track</span>
            </div>
          </div>

          {/* Ring 2 Legend */}
          <div className="flex items-center gap-3 text-xs">
            <div className="w-3 h-3 rounded-full bg-cyan-500 shadow-xs shrink-0" />
            <div className="flex-1">
              <div className={`flex items-center justify-between gap-4 font-bold ${
                isNight ? 'text-white' : 'text-slate-900'
              }`}>
                <span>Weekly Cadence</span>
                <span className="text-cyan-600 dark:text-cyan-400 font-mono">{profile.weeklyCommits}/7 Days</span>
              </div>
              <span className={`text-[10px] block ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>{weeklyPercent}% active pace</span>
            </div>
          </div>

          {/* Ring 3 Legend */}
          <div className="flex items-center gap-3 text-xs">
            <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-xs shrink-0" />
            <div className="flex-1">
              <div className={`flex items-center justify-between gap-4 font-bold ${
                isNight ? 'text-white' : 'text-slate-900'
              }`}>
                <span>LinkedIn Proof</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono">11/11 Posts</span>
              </div>
              <span className={`text-[10px] block ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>100% recruiter visibility</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
