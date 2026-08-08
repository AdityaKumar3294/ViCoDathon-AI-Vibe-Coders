import React from 'react';
import { useApp } from '../../context/AppContext';
import { Briefcase, ExternalLink, ShieldCheck, Eye, GitBranch } from 'lucide-react';
import { playTactileClick } from '../../utils/sound';

export const PortfolioPreviewCard: React.FC = () => {
  const { profile, setRoute, themeMode } = useApp();
  const isNight = themeMode === 'night';

  return (
    <div className={`p-4 sm:p-6 rounded-3xl border transition-all duration-300 space-y-5 relative overflow-hidden ${
      isNight 
        ? 'bg-[#111827] border-white/10 shadow-xl text-white' 
        : 'bg-white border-slate-200/90 shadow-md shadow-slate-200/50 text-slate-900'
    }`}>
      <div className="flex items-center justify-between text-left">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-2xl bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`text-base font-extrabold ${isNight ? 'text-white' : 'text-slate-900'}`}>Live Recruiter Portfolio</h3>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-blue-500/15 text-blue-600 dark:text-blue-300 border border-blue-500/30">
                Verified Link
              </span>
            </div>
            <p className={`text-xs ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>Public proof-of-work link for job applications</p>
          </div>
        </div>

        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-xl border text-xs font-semibold ${
          isNight ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
        }`}>
          <Eye className="w-3.5 h-3.5 text-blue-500" />
          <span>{profile.recruitersViewed} Views</span>
        </div>
      </div>

      {/* Recruiter Card Preview Simulation */}
      <div className={`p-4 rounded-2xl border space-y-3 text-left ${
        isNight ? 'bg-[#0B1220] border-blue-500/30' : 'bg-blue-50/50 border-blue-200'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-300">
              {profile.publicPortfolioSlug}
            </span>
          </div>
          <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
            <ShieldCheck className="w-3 h-3" />
            <span>Verified 11-Day Proof</span>
          </span>
        </div>

        <div className={`text-xs leading-relaxed ${isNight ? 'text-slate-300' : 'text-slate-600'}`}>
          Contains verified commits for <strong>Distributed Rate Limiting</strong>, <strong>Redis Cache Aside</strong>, and <strong>Worker Thread Hashing</strong>.
        </div>

        <div className={`flex items-center justify-between pt-2 border-t text-xs ${
          isNight ? 'border-white/5 text-slate-400' : 'border-blue-100 text-slate-500'
        }`}>
          <span className="flex items-center gap-1">
            <GitBranch className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>11 Commits Pushed</span>
          </span>

          <button
            onClick={() => {
              playTactileClick();
              setRoute('/day/12');
            }}
            className="text-blue-600 dark:text-blue-400 hover:underline font-bold flex items-center gap-1 text-xs cursor-pointer"
          >
            <span>Submit Day 12 to Portfolio</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
