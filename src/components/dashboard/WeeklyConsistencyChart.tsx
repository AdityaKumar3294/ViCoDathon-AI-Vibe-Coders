import React from 'react';
import { useApp } from '../../context/AppContext';
import { weeklyConsistencyData } from '../../data/mockData';
import { BarChart3 } from 'lucide-react';

export const WeeklyConsistencyChart: React.FC = () => {
  const { themeMode } = useApp();
  const isNight = themeMode === 'night';
  const maxCommits = 5;

  return (
    <div className={`p-4 sm:p-6 rounded-3xl border transition-all duration-300 space-y-6 ${
      isNight 
        ? 'bg-[#111827] border-white/10 shadow-xl text-white' 
        : 'bg-white border-slate-200/90 shadow-md shadow-slate-200/50 text-slate-900'
    }`}>
      <div className="flex items-center justify-between text-left">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-2xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`text-base font-extrabold ${isNight ? 'text-white' : 'text-slate-900'}`}>Weekly Consistency Rhythm</h3>
            <p className={`text-xs ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>Daily commit time stamps & nocturnal output</p>
          </div>
        </div>

        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
          6/7 Days Complete
        </span>
      </div>

      {/* Bar Chart Grid */}
      <div className="grid grid-cols-7 gap-2.5 items-end h-40 pt-4 px-2">
        {weeklyConsistencyData.map((d, index) => {
          const heightPercent = Math.max(20, (d.commits / maxCommits) * 100);
          const isToday = d.status === 'today';

          return (
            <div key={index} className="flex flex-col items-center gap-2 h-full justify-end group">
              <span className={`text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity ${
                isNight ? 'text-slate-400' : 'text-slate-600'
              }`}>
                {d.time}
              </span>

              <div className={`w-full rounded-xl h-full flex items-end overflow-hidden p-0.5 ${
                isNight ? 'bg-slate-800' : 'bg-slate-100'
              }`}>
                <div
                  className={`w-full rounded-lg transition-all duration-700 ${
                    isToday
                      ? 'bg-gradient-to-t from-purple-600 to-indigo-500 shadow-md shadow-purple-500/50 animate-pulse'
                      : 'bg-gradient-to-t from-cyan-600 to-cyan-400 shadow-xs'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                />
              </div>

              <div className="text-center">
                <span className={`text-xs font-bold ${
                  isToday 
                    ? 'text-purple-600 dark:text-purple-300 font-extrabold' 
                    : isNight ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  {d.dayName}
                </span>
                <span className={`text-[9px] block ${isNight ? 'text-slate-500' : 'text-slate-400'}`}>
                  {d.commits} {d.commits === 1 ? 'push' : 'pushes'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
