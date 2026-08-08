import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  ChevronRight, 
  Award, 
  Terminal, 
  ArrowRight,
  ShieldCheck,
  Star
} from 'lucide-react';
import { playTactileClick } from '../../utils/sound';

export const LandingHero: React.FC = () => {
  const { setRoute, themeMode } = useApp();
  const isNight = themeMode === 'night';

  return (
    <section className="relative pt-8 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300">
      {/* Ambient background glows */}
      <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full blur-3xl pointer-events-none -z-10 ${
        isNight ? 'bg-purple-600/15' : 'bg-purple-300/40'
      }`} />
      <div className={`absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full blur-3xl pointer-events-none -z-10 ${
        isNight ? 'bg-cyan-600/10' : 'bg-cyan-200/30'
      }`} />

      <div className="max-w-5xl mx-auto text-center space-y-8">
        {/* Glowing Announcement Pill */}
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs sm:text-sm font-semibold shadow-md transition-all ${
          isNight 
            ? 'bg-purple-500/10 border-purple-500/30 text-purple-300 shadow-purple-500/10' 
            : 'bg-purple-50 border-purple-200 text-purple-800 shadow-purple-500/5'
        }`}>
          <Sparkles className="w-4 h-4 text-purple-500 animate-pulse" />
          <span>Cohort #7 Open for Indian Engineering Students</span>
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
          <span className={`font-bold ${isNight ? 'text-purple-200' : 'text-purple-900'}`}>100% Free & Open Source</span>
        </div>

        {/* Hero Headline */}
        <div className="space-y-3 sm:space-y-4">
          <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] max-w-4xl mx-auto ${
            isNight ? 'text-white' : 'text-slate-900'
          }`}>
            Build Every Day.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 dark:from-purple-400 dark:via-indigo-300 dark:to-cyan-400">
              Become Impossible to Ignore.
            </span>
          </h1>

          <p className={`text-sm sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed ${
            isNight ? 'text-slate-300' : 'text-slate-600'
          }`}>
            A 60-day coding challenge where every commit becomes proof of your growth. Ship real backend architectures, log verified GitHub commits, and turn your late-night coding into a recruiter magnet.
          </p>
        </div>

        {/* Primary Clear CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => {
              playTactileClick();
              setRoute('/register');
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Start Your 60-Day Journey →</span>
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => {
              playTactileClick();
              setRoute('/day/12');
            }}
            className={`w-full sm:w-auto px-6 py-4 rounded-2xl font-bold text-xs sm:text-sm border transition-all flex items-center justify-center gap-2 cursor-pointer ${
              isNight 
                ? 'bg-[#111827] hover:bg-[#162033] text-slate-200 hover:text-white border-white/10 hover:border-purple-500/40' 
                : 'bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border-slate-200 hover:border-purple-300 shadow-xs'
            }`}
          >
            <Terminal className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>Explore Day 12 Mission (Redis Rate Limiter)</span>
          </button>
        </div>

        {/* Key Trust Signals */}
        <div className={`flex flex-wrap items-center justify-center gap-6 sm:gap-10 pt-4 text-xs font-semibold ${
          isNight ? 'text-slate-400' : 'text-slate-500'
        }`}>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5">
              <span className="w-5 h-5 rounded-full bg-purple-600 border border-white dark:border-[#0B1220] flex items-center justify-center text-[9px] text-white font-bold">IIT</span>
              <span className="w-5 h-5 rounded-full bg-cyan-600 border border-white dark:border-[#0B1220] flex items-center justify-center text-[9px] text-white font-bold">NIT</span>
              <span className="w-5 h-5 rounded-full bg-emerald-600 border border-white dark:border-[#0B1220] flex items-center justify-center text-[9px] text-white font-bold">VIT</span>
            </div>
            <span>180+ Engineering Colleges</span>
          </div>

          <div className="flex items-center gap-1.5 text-amber-500">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className={isNight ? 'text-slate-300' : 'text-slate-700'}>4.9/5 Student Rating</span>
          </div>

          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>94.2% Completion Rate</span>
          </div>
        </div>

        {/* 5-Stage Live Visual Pipeline */}
        <div className="pt-10">
          <div className={`text-xs font-bold uppercase tracking-widest mb-4 flex items-center justify-center gap-2 ${
            isNight ? 'text-slate-400' : 'text-slate-500'
          }`}>
            <span className="w-6 h-[1px] bg-purple-500/50" />
            <span>The 5-Step Daily Transformation Flow</span>
            <span className="w-6 h-[1px] bg-purple-500/50" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 max-w-4xl mx-auto text-left">
            {/* Step 1 */}
            <div className={`p-4 rounded-2xl border shadow-md text-left relative overflow-hidden group transition-all ${
              isNight 
                ? 'bg-[#111827]/90 border-purple-500/20 hover:border-purple-500/50' 
                : 'bg-white border-slate-200 hover:border-purple-300 shadow-slate-200/50'
            }`}>
              <div className="w-7 h-7 rounded-xl bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xs font-bold mb-3 border border-purple-500/30">
                1
              </div>
              <h3 className={`text-sm font-bold mb-1 ${isNight ? 'text-white' : 'text-slate-900'}`}>Choose Track</h3>
              <p className={`text-xs leading-snug ${isNight ? 'text-slate-400' : 'text-slate-600'}`}>
                Backend Systems, SaaS, or Applied AI agents.
              </p>
              <div className="mt-3 text-[10px] text-purple-600 dark:text-purple-300 font-bold flex items-center gap-1">
                <span>Personalized</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>

            {/* Step 2 */}
            <div className={`p-4 rounded-2xl border shadow-md text-left relative overflow-hidden group transition-all ${
              isNight 
                ? 'bg-[#111827]/90 border-purple-500/20 hover:border-purple-500/50' 
                : 'bg-white border-slate-200 hover:border-purple-300 shadow-slate-200/50'
            }`}>
              <div className="w-7 h-7 rounded-xl bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center text-xs font-bold mb-3 border border-cyan-500/30">
                2
              </div>
              <h3 className={`text-sm font-bold mb-1 ${isNight ? 'text-white' : 'text-slate-900'}`}>Code Daily</h3>
              <p className={`text-xs leading-snug ${isNight ? 'text-slate-400' : 'text-slate-600'}`}>
                35-min nightly hands-on architectural missions.
              </p>
              <div className="mt-3 text-[10px] text-cyan-600 dark:text-cyan-300 font-bold flex items-center gap-1">
                <span>Night Focus Mode</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>

            {/* Step 3 */}
            <div className={`p-4 rounded-2xl border shadow-md text-left relative overflow-hidden group transition-all ${
              isNight 
                ? 'bg-[#111827]/90 border-purple-500/20 hover:border-purple-500/50' 
                : 'bg-white border-slate-200 hover:border-purple-300 shadow-slate-200/50'
            }`}>
              <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-bold mb-3 border border-emerald-500/30">
                3
              </div>
              <h3 className={`text-sm font-bold mb-1 ${isNight ? 'text-white' : 'text-slate-900'}`}>GitHub Commit</h3>
              <p className={`text-xs leading-snug ${isNight ? 'text-slate-400' : 'text-slate-600'}`}>
                Push clean, tested code with meaningful messages.
              </p>
              <div className="mt-3 text-[10px] text-emerald-600 dark:text-emerald-300 font-bold flex items-center gap-1">
                <span>Green Heatmap</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>

            {/* Step 4 */}
            <div className={`p-4 rounded-2xl border shadow-md text-left relative overflow-hidden group transition-all ${
              isNight 
                ? 'bg-[#111827]/90 border-purple-500/20 hover:border-purple-500/50' 
                : 'bg-white border-slate-200 hover:border-purple-300 shadow-slate-200/50'
            }`}>
              <div className="w-7 h-7 rounded-xl bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold mb-3 border border-blue-500/30">
                4
              </div>
              <h3 className={`text-sm font-bold mb-1 ${isNight ? 'text-white' : 'text-slate-900'}`}>LinkedIn Post</h3>
              <p className={`text-xs leading-snug ${isNight ? 'text-slate-400' : 'text-slate-600'}`}>
                Share what you learned & build in public.
              </p>
              <div className="mt-3 text-[10px] text-blue-600 dark:text-blue-300 font-bold flex items-center gap-1">
                <span>Proof of Work</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>

            {/* Step 5 */}
            <div className={`p-4 rounded-2xl border shadow-md text-left relative overflow-hidden group transition-all ${
              isNight 
                ? 'bg-gradient-to-b from-purple-900/40 to-[#111827] border-purple-500/40 hover:border-purple-400 text-white' 
                : 'bg-gradient-to-b from-purple-50 to-white border-purple-300 hover:border-purple-400 text-slate-900 shadow-purple-500/5'
            }`}>
              <div className="w-7 h-7 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center text-xs font-bold mb-3 border border-amber-500/30">
                5
              </div>
              <h3 className="text-sm font-bold text-amber-600 dark:text-amber-300 mb-1">Recruiter Ready</h3>
              <p className={`text-xs leading-snug ${isNight ? 'text-slate-300' : 'text-slate-600'}`}>
                Top 1% portfolio with 60 verified public projects.
              </p>
              <div className="mt-3 text-[10px] text-amber-600 dark:text-amber-300 font-bold flex items-center gap-1">
                <span>Inbound Offers</span>
                <Award className="w-3 h-3 text-amber-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
