import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  Flame
} from 'lucide-react';
import { playTactileClick } from '../../utils/sound';
import { tracksList, sampleCurriculumRoadmap } from '../../data/mockData';
import type { TrackId } from '../../types/challenge';

export const LandingMobile: React.FC = () => {
  const { setRoute, themeMode } = useApp();
  const isNight = themeMode === 'night';
  const [selectedTrack, setSelectedTrack] = useState<TrackId>('systems');

  const fiveSteps = [
    { num: '01', title: 'Choose Track', desc: 'Pick your coding path: Systems, Fullstack, or AI Agents' },
    { num: '02', title: 'Code Daily', desc: 'Build something real every night in 35 minutes' },
    { num: '03', title: 'Prove It', desc: 'Verify your work with GitHub commits & LinkedIn updates' },
    { num: '04', title: 'Build Your Profile', desc: 'Turn consistency into public proof recruiters notice' },
    { num: '05', title: 'Recruiter Ready', desc: 'Finish with an unshakeable, visible body of work' },
  ];

  return (
    <div className="w-full space-y-10 pb-24 px-4 text-left animate-fadeIn">
      {/* =========================================================================
          1. 390px MOBILE HERO (First Viewport Priority)
          ========================================================================= */}
      <section className="pt-4 space-y-4 text-center">
        {/* Cohort / Trust Badge */}
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold ${
          isNight 
            ? 'bg-purple-500/10 border-purple-500/30 text-purple-300' 
            : 'bg-purple-50 border-purple-200 text-purple-900'
        }`}>
          <Sparkles className="w-3.5 h-3.5 text-purple-500 animate-pulse" />
          <span>Cohort #7 · Open for Students</span>
        </div>

        {/* Main Headline (36–42px, natural wrap, no overflow) */}
        <div className="space-y-2">
          <h1 className={`text-[36px] sm:text-[40px] font-extrabold tracking-tight leading-[1.12] ${
            isNight ? 'text-white' : 'text-slate-900'
          }`}>
            Build Every Day.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 dark:from-purple-400 dark:to-cyan-400">
              Become Impossible<br />to Ignore.
            </span>
          </h1>

          {/* Short Explanation (16px) */}
          <p className={`text-[15px] sm:text-[16px] leading-relaxed max-w-xs mx-auto ${
            isNight ? 'text-slate-300' : 'text-slate-700'
          }`}>
            A 60-day coding challenge where every build becomes proof of your growth.
          </p>
        </div>

        {/* Primary CTA (48–52px height, full-width) */}
        <div className="pt-2 space-y-2.5">
          <button
            onClick={() => {
              playTactileClick();
              setRoute('/register');
            }}
            className="w-full h-13 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
          >
            <span>Start Your 60-Day Journey →</span>
          </button>

          <button
            onClick={() => {
              playTactileClick();
              setRoute('/day/12');
            }}
            className={`w-full h-11 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isNight 
                ? 'bg-[#111827] border-white/10 text-slate-200 hover:border-purple-500/40' 
                : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50 shadow-xs'
            }`}
          >
            <Flame className="w-4 h-4 text-orange-500" />
            <span>Preview Day 12 Mission</span>
          </button>
        </div>

        {/* Three Compact Trust/Product Facts */}
        <div className={`grid grid-cols-3 gap-1.5 p-3 rounded-2xl border ${
          isNight ? 'bg-[#111827] border-white/10' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="text-center space-y-0.5">
            <span className="block text-xs sm:text-sm font-extrabold text-purple-600 dark:text-purple-400 font-mono">60 DAYS</span>
            <span className="block text-[10px] font-bold text-slate-500 dark:text-slate-400">Consistency</span>
          </div>
          <div className="text-center space-y-0.5 border-x border-slate-200 dark:border-white/10">
            <span className="block text-xs sm:text-sm font-extrabold text-cyan-600 dark:text-cyan-400 font-mono">DAILY BUILDS</span>
            <span className="block text-[10px] font-bold text-slate-500 dark:text-slate-400">35 min/night</span>
          </div>
          <div className="text-center space-y-0.5">
            <span className="block text-xs sm:text-sm font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">PUBLIC PROOF</span>
            <span className="block text-[10px] font-bold text-slate-500 dark:text-slate-400">GitHub + LI</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. COMPACT 5-STEP MOBILE FLOW (No giant stacked cards)
          ========================================================================= */}
      <section className="space-y-4">
        <div className="space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-600 dark:text-purple-400">
            HOW IT WORKS
          </span>
          <h2 className={`text-xl font-extrabold tracking-tight ${isNight ? 'text-white' : 'text-slate-900'}`}>
            The 5-Step Daily Rhythm
          </h2>
        </div>

        {/* Compact Timeline List */}
        <div className={`p-4 rounded-3xl border space-y-3.5 divide-y ${
          isNight 
            ? 'bg-[#111827] border-white/10 divide-white/5 text-white' 
            : 'bg-white border-slate-200 divide-slate-100 shadow-xs text-slate-900'
        }`}>
          {fiveSteps.map((step, idx) => (
            <div key={step.num} className={`flex items-start gap-3 ${idx !== 0 ? 'pt-3.5' : ''}`}>
              <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {step.num}
              </div>
              <div className="space-y-0.5 text-left flex-1">
                <h3 className={`text-xs font-bold ${isNight ? 'text-white' : 'text-slate-900'}`}>
                  {step.title}
                </h3>
                <p className={`text-[11px] leading-relaxed ${isNight ? 'text-slate-300' : 'text-slate-600'}`}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          3. 60-DAY CURRICULUM ROADMAP (Compact track preview)
          ========================================================================= */}
      <section className="space-y-4">
        <div className="space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-600 dark:text-purple-400">
            CURRICULUM
          </span>
          <h2 className={`text-xl font-extrabold tracking-tight ${isNight ? 'text-white' : 'text-slate-900'}`}>
            Choose Your Placement Track
          </h2>
        </div>

        {/* Track Selector Pills */}
        <div className="grid grid-cols-3 gap-1.5">
          {tracksList.map(t => (
            <button
              key={t.id}
              onClick={() => {
                playTactileClick();
                setSelectedTrack(t.id);
              }}
              className={`py-2 px-1.5 rounded-xl text-[11px] font-bold border text-center transition-all cursor-pointer ${
                selectedTrack === t.id
                  ? isNight 
                    ? 'bg-purple-600 border-purple-500 text-white shadow-md' 
                    : 'bg-purple-600 border-purple-600 text-white shadow-xs'
                  : isNight 
                    ? 'bg-[#111827] border-white/10 text-slate-400' 
                    : 'bg-white border-slate-300 text-slate-700'
              }`}
            >
              {t.name.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* 4-Week Compact Accordion */}
        <div className="space-y-2">
          {sampleCurriculumRoadmap.slice(0, 4).map((weekItem) => (
            <div
              key={weekItem.week}
              className={`p-3.5 rounded-2xl border space-y-1 ${
                weekItem.status === 'in-progress'
                  ? isNight 
                    ? 'bg-[#162033] border-purple-500/40 text-white ring-1 ring-purple-500/30' 
                    : 'bg-purple-50 border-purple-300 text-slate-900 ring-1 ring-purple-200'
                  : isNight 
                    ? 'bg-[#111827] border-white/10 text-slate-300' 
                    : 'bg-white border-slate-200 text-slate-700 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-purple-600 dark:text-purple-400">
                  WEEK {weekItem.week} • {weekItem.days}
                </span>
                {weekItem.status === 'in-progress' && (
                  <span className="px-2 py-0.2 bg-purple-500/20 text-purple-800 dark:text-purple-300 text-[9px] font-bold rounded">
                    Active
                  </span>
                )}
              </div>
              <h4 className={`text-xs font-extrabold ${isNight ? 'text-white' : 'text-slate-900'}`}>
                {weekItem.title}
              </h4>
              <p className={`text-[11px] line-clamp-2 ${isNight ? 'text-slate-400' : 'text-slate-600'}`}>
                {weekItem.focus}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          4. FINAL CTA BANNER
          ========================================================================= */}
      <section className={`p-6 rounded-3xl border text-center space-y-4 ${
        isNight 
          ? 'bg-gradient-to-b from-[#162033] to-[#0B1220] border-purple-500/40 text-white' 
          : 'bg-gradient-to-b from-purple-50 to-white border-purple-200 text-slate-900 shadow-xs'
      }`}>
        <div className="space-y-1.5">
          <h2 className="text-xl font-extrabold">Ready to Build Daily?</h2>
          <p className={`text-xs max-w-xs mx-auto ${isNight ? 'text-slate-300' : 'text-slate-600'}`}>
            Join Indian college students building real architectures today.
          </p>
        </div>

        <button
          onClick={() => {
            playTactileClick();
            setRoute('/register');
          }}
          className="w-full h-12 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-xs shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
        >
          <span>Start Your 60-Day Journey →</span>
        </button>
      </section>
    </div>
  );
};
