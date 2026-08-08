import React from 'react';
import { useApp } from '../../context/AppContext';
import { GitCommit, TrendingUp, Briefcase, Building2 } from 'lucide-react';

export const SuccessStatsSection: React.FC = () => {
  const { themeMode } = useApp();
  const isNight = themeMode === 'night';

  const stats = [
    {
      number: '60,000+',
      label: 'Verified GitHub Commits',
      sub: 'Tested with real automated suites',
      icon: GitCommit,
      color: 'text-purple-600 dark:text-purple-400',
    },
    {
      number: '94.2%',
      label: 'Cohort Completion Rate',
      sub: 'vs 8% industry standard MOOCs',
      icon: TrendingUp,
      color: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      number: '180+',
      label: 'Engineering Colleges',
      sub: 'IITs, NITs, BITS, VIT, Tier-2/3 Univs',
      icon: Building2,
      color: 'text-blue-600 dark:text-blue-400',
    },
    {
      number: '420+',
      label: 'Student Placements',
      sub: 'Swiggy, Razorpay, CRED, Startups',
      icon: Briefcase,
      color: 'text-amber-500',
    },
  ];

  return (
    <section className={`py-16 px-4 sm:px-6 lg:px-8 border-t transition-colors duration-300 ${
      isNight ? 'border-white/8 bg-[#0B1220]/80' : 'border-slate-200 bg-white'
    }`}>
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400">
            Real Proof of Consistency
          </span>
          <h2 className={`text-2xl sm:text-4xl font-extrabold ${isNight ? 'text-white' : 'text-slate-900'}`}>
            Numbers That Speak To Recruiters
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className={`p-6 rounded-3xl border text-center space-y-3 transition-all group ${
                  isNight 
                    ? 'bg-[#111827] border-white/10 hover:border-purple-500/30 shadow-xl text-white' 
                    : 'bg-slate-50 border-slate-200/90 hover:border-purple-300 shadow-md shadow-slate-200/40 text-slate-900'
                }`}
              >
                <div className={`inline-flex p-3 rounded-2xl group-hover:scale-110 transition-transform ${
                  isNight ? 'bg-white/5' : 'bg-white shadow-xs border border-slate-200/60'
                }`}>
                  <Icon className={`w-6 h-6 ${s.color}`} />
                </div>
                <div className={`text-3xl sm:text-4xl font-extrabold font-mono tracking-tight ${
                  isNight ? 'text-white' : 'text-slate-900'
                }`}>
                  {s.number}
                </div>
                <div className={`text-sm font-bold ${isNight ? 'text-slate-200' : 'text-slate-800'}`}>
                  {s.label}
                </div>
                <p className={`text-xs ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>
                  {s.sub}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
