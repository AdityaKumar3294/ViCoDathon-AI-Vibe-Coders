import React from 'react';
import { useApp } from '../../context/AppContext';
import { Square, CheckCircle2, ListChecks } from 'lucide-react';
import { playCheckmarkSound } from '../../utils/sound';

export const RequirementsChecklist: React.FC = () => {
  const { dayMission, toggleRequirement, themeMode } = useApp();
  const isNight = themeMode === 'night';

  const completedCount = dayMission.requirements.filter(r => r.completed).length;
  const totalCount = dayMission.requirements.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const handleToggle = (id: string) => {
    playCheckmarkSound();
    toggleRequirement(id);
  };

  return (
    <div className={`p-4 sm:p-6 rounded-3xl border transition-all duration-300 space-y-5 text-left ${
      isNight 
        ? 'bg-[#111827] border-white/10 shadow-xl text-white' 
        : 'bg-white border-slate-200/90 shadow-md shadow-slate-200/50 text-slate-900'
    }`}>
      {/* Header & Progress Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
            <ListChecks className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`text-base font-extrabold ${isNight ? 'text-white' : 'text-slate-900'}`}>Requirements Checklist</h3>
            <p className={`text-xs ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>Verify all constraints before pushing commit</p>
          </div>
        </div>

        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
          {completedCount} / {totalCount} Done ({progressPercent}%)
        </span>
      </div>

      {/* Progress Track */}
      <div className={`w-full rounded-full h-2 overflow-hidden border ${
        isNight ? 'bg-slate-800 border-white/5' : 'bg-slate-100 border-slate-200'
      }`}>
        <div
          className="bg-emerald-500 h-full rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Checklist items */}
      <div className="space-y-3">
        {dayMission.requirements.map(req => {
          return (
            <div
              key={req.id}
              onClick={() => handleToggle(req.id)}
              className={`p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start gap-3 select-none ${
                req.completed
                  ? isNight 
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200' 
                    : 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : isNight 
                    ? 'bg-[#0B1220] border-white/5 text-slate-300 hover:border-purple-500/30' 
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-purple-300'
              }`}
            >
              <button className="mt-0.5 shrink-0 focus:outline-none cursor-pointer">
                {req.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-500/20" />
                ) : (
                  <Square className={`w-5 h-5 ${isNight ? 'text-slate-500 hover:text-purple-400' : 'text-slate-400 hover:text-purple-600'}`} />
                )}
              </button>

              <div className="space-y-1 flex-1">
                <span className={`text-xs font-medium block leading-snug ${req.completed ? 'line-through opacity-80' : ''}`}>
                  {req.text}
                </span>
                {req.hint && (
                  <span className={`text-[11px] block font-mono ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>
                    💡 Hint: {req.hint}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
