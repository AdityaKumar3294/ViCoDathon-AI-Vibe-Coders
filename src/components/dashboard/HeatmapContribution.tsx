import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { mockHeatmapData } from '../../data/mockData';
import type { HeatmapDay } from '../../types/challenge';
import { GitCommit, Calendar, Flame, ExternalLink, X } from 'lucide-react';
import { playTactileClick } from '../../utils/sound';

export const HeatmapContribution: React.FC = () => {
  const { profile, setRoute, themeMode } = useApp();
  const isNight = themeMode === 'night';
  const [selectedDay, setSelectedDay] = useState<HeatmapDay | null>(null);

  // Group heatmap into weeks (7 days per column)
  const days = mockHeatmapData;

  const handleDayClick = (day: HeatmapDay) => {
    playTactileClick();
    setSelectedDay(day);
  };

  return (
    <div className={`p-4 sm:p-6 rounded-3xl border transition-all duration-300 space-y-5 sm:space-y-6 ${
      isNight 
        ? 'bg-[#111827] border-white/10 shadow-xl text-white' 
        : 'bg-white border-slate-200/90 shadow-md shadow-slate-200/50 text-slate-900'
    }`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-left">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
            <GitCommit className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`text-sm sm:text-base font-extrabold ${isNight ? 'text-white' : 'text-slate-900'}`}>Verified Proof of Work Heatmap</h3>
            <p className={`text-xs ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>60-Day GitHub commit cadence & green squares</p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5 text-orange-500 font-bold">
            <Flame className="w-4 h-4 fill-orange-500" />
            <span>{profile.streakDays} Day Active Streak</span>
          </div>
          <span className={`hidden sm:inline ${isNight ? 'text-slate-700' : 'text-slate-300'}`}>•</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">{profile.currentDay - 1} Commits Verified</span>
        </div>
      </div>

      {/* Interactive 60-Day Grid */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[10px] sm:hidden text-slate-400 font-mono">
          <span>← Swipe to inspect 60 days →</span>
          <span>Tap square for info</span>
        </div>
        <div className="overflow-x-auto pb-2 -mx-1 px-1">
          <div className="grid grid-flow-col grid-rows-7 gap-1.5 sm:gap-2 w-max min-w-full sm:min-w-0">
            {days.map((d, index) => {
              const isCompleted = d.status === 'completed';
              const isToday = d.status === 'today';

              let bgClass = isNight ? 'bg-slate-800/60 border-white/5 hover:border-slate-500' : 'bg-slate-100 border-slate-200 hover:border-slate-400';
              if (isCompleted) {
                if (d.count >= 3) bgClass = 'bg-emerald-500 border-emerald-400 shadow-xs shadow-emerald-500/40 text-white';
                else if (d.count === 2) bgClass = 'bg-emerald-600 border-emerald-500 text-white';
                else bgClass = 'bg-emerald-700 border-emerald-600 text-white';
              } else if (isToday) {
                bgClass = 'bg-purple-600 border-purple-400 shadow-md shadow-purple-500/60 animate-pulse text-white';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleDayClick(d)}
                  title={`Day ${d.dayNumber}: ${d.missionTitle} (${d.count} commits)`}
                  className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg border transition-all duration-200 hover:scale-125 focus:outline-none cursor-pointer ${bgClass}`}
                />
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className={`flex items-center justify-between text-[11px] pt-2 border-t ${
          isNight ? 'border-white/5 text-slate-400' : 'border-slate-100 text-slate-500'
        }`}>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>Day 1 (July 29) → Day 60 (Sept 27)</span>
          </span>

          <div className="flex items-center gap-1.5">
            <span>Less</span>
            <div className={`w-3 h-3 rounded-sm ${isNight ? 'bg-slate-800' : 'bg-slate-200'}`} />
            <div className="w-3 h-3 rounded-sm bg-emerald-700" />
            <div className="w-3 h-3 rounded-sm bg-emerald-600" />
            <div className="w-3 h-3 rounded-sm bg-emerald-500" />
            <div className="w-3 h-3 rounded-sm bg-purple-600" />
            <span>More / Today</span>
          </div>
        </div>
      </div>

      {/* Selected Day Info Popup Modal */}
      {selectedDay && (
        <div className={`p-4 rounded-2xl border space-y-3 animate-fadeIn relative text-left ${
          isNight ? 'bg-[#0B1220] border-purple-500/30' : 'bg-purple-50/70 border-purple-200 text-slate-900'
        }`}>
          <button
            onClick={() => setSelectedDay(null)}
            className={`absolute top-3 right-3 p-1 rounded-lg cursor-pointer ${
              isNight ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-purple-500/15 text-purple-700 dark:text-purple-300 text-xs font-bold border border-purple-500/25">
              Day {selectedDay.dayNumber}
            </span>
            <span className={`text-xs ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>{selectedDay.date}</span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">+{selectedDay.xp} XP</span>
          </div>

          <h4 className={`text-sm font-bold leading-snug ${isNight ? 'text-white' : 'text-slate-900'}`}>
            {selectedDay.missionTitle}
          </h4>

          {selectedDay.commitMessage && (
            <div className={`p-2.5 rounded-xl border font-mono text-xs overflow-x-auto ${
              isNight ? 'bg-slate-900 border-white/5 text-slate-300' : 'bg-white border-slate-200 text-slate-800 shadow-xs'
            }`}>
              <span className="text-purple-600 font-bold">$</span> git commit -m "{selectedDay.commitMessage}"
            </div>
          )}

          {selectedDay.status === 'today' && (
            <button
              onClick={() => {
                playTactileClick();
                setRoute('/day/12');
              }}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              <span>Open Day 12 Mission</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
