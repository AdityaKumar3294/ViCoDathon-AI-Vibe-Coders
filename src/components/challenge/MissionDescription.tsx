import React from 'react';
import { useApp } from '../../context/AppContext';
import { Briefcase, CheckCircle2, Target } from 'lucide-react';

export const MissionDescription: React.FC = () => {
  const { dayMission, themeMode } = useApp();
  const isNight = themeMode === 'night';

  return (
    <div className={`p-4 sm:p-6 rounded-3xl border transition-all duration-300 space-y-5 sm:space-y-6 text-left ${
      isNight 
        ? 'bg-[#111827] border-white/10 shadow-xl text-white' 
        : 'bg-white border-slate-200/90 shadow-md shadow-slate-200/50 text-slate-900'
    }`}>
      {/* Recruiter & System Design Context Alert */}
      <div className={`p-4 rounded-2xl border space-y-2 ${
        isNight ? 'bg-purple-500/10 border-purple-500/25 text-slate-300' : 'bg-purple-50/70 border-purple-200 text-slate-700'
      }`}>
        <div className="flex items-center gap-2 font-bold text-xs text-purple-700 dark:text-purple-300">
          <Briefcase className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          <span>Real-World Recruiter & System Design Context</span>
        </div>
        <p className="text-xs leading-relaxed">
          {dayMission.recruiterWhy}
        </p>
      </div>

      {/* Challenge Description */}
      <div className="space-y-2">
        <h3 className={`text-base font-extrabold ${isNight ? 'text-white' : 'text-slate-900'}`}>Challenge Description</h3>
        <p className={`text-xs sm:text-sm leading-relaxed ${isNight ? 'text-slate-300' : 'text-slate-600'}`}>
          {dayMission.summary}
        </p>
      </div>

      {/* Learning Objectives */}
      <div className={`space-y-3 pt-2 border-t ${isNight ? 'border-white/5' : 'border-slate-100'}`}>
        <div className={`flex items-center gap-2 text-xs font-bold ${isNight ? 'text-slate-200' : 'text-slate-800'}`}>
          <Target className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Core Learning Objectives</span>
        </div>

        <ul className={`space-y-2 text-xs ${isNight ? 'text-slate-300' : 'text-slate-600'}`}>
          {dayMission.objectives.map((obj, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
              <span className="leading-snug">{obj}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
