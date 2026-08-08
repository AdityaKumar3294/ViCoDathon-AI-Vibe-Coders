import React from 'react';
import { useApp } from '../../context/AppContext';
import { Code2, Heart, ShieldCheck } from 'lucide-react';
import { playTactileClick } from '../../utils/sound';

export const Footer: React.FC = () => {
  const { setRoute, themeMode } = useApp();
  const isNight = themeMode === 'night';

  return (
    <footer className={`w-full border-t py-12 px-4 sm:px-6 lg:px-8 mt-auto transition-colors duration-300 ${
      isNight ? 'border-white/10 bg-[#070B14] text-slate-400' : 'border-slate-200 bg-white text-slate-600'
    }`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Col */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 p-[1px]">
              <div className={`w-full h-full rounded-[11px] flex items-center justify-center ${
                isNight ? 'bg-[#0B1220]' : 'bg-white'
              }`}>
                <Code2 className="w-4 h-4 text-purple-600" />
              </div>
            </div>
            <span className={`font-extrabold text-lg ${isNight ? 'text-white' : 'text-slate-900'}`}>
              AB<span className="text-purple-600">Talks</span>
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-600 font-bold border border-purple-500/25">
              60-Day Challenge
            </span>
          </div>

          <p className={`text-xs max-w-md leading-relaxed ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>
            A high-discipline 60-day coding & consistency platform engineered for Indian engineering students. Build production code, commit to GitHub, post on LinkedIn, and build undeniable recruiter visibility.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>All 60 Missions Verified</span>
            </div>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className={`text-xs ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>Over 1,400+ Active Students</span>
          </div>
        </div>

        {/* Challenge Tracks */}
        <div className="space-y-3">
          <h4 className={`text-xs font-bold uppercase tracking-wider ${isNight ? 'text-slate-300' : 'text-slate-800'}`}>Tracks & Curriculum</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => { playTactileClick(); setRoute('/day/12'); }} className="hover:text-purple-600 dark:hover:text-purple-300 transition-colors cursor-pointer">
                Backend & Distributed Systems
              </button>
            </li>
            <li>
              <button onClick={() => { playTactileClick(); setRoute('/dashboard'); }} className="hover:text-purple-600 dark:hover:text-purple-300 transition-colors cursor-pointer">
                Fullstack SaaS & Web3
              </button>
            </li>
            <li>
              <button onClick={() => { playTactileClick(); setRoute('/dashboard'); }} className="hover:text-purple-600 dark:hover:text-purple-300 transition-colors cursor-pointer">
                Applied AI & Agentic Workflows
              </button>
            </li>
            <li>
              <button onClick={() => { playTactileClick(); setRoute('/day/12'); }} className="hover:text-purple-600 dark:hover:text-purple-300 transition-colors cursor-pointer">
                System Design & Rate Limiters
              </button>
            </li>
          </ul>
        </div>

        {/* Quick Navigation */}
        <div className="space-y-3">
          <h4 className={`text-xs font-bold uppercase tracking-wider ${isNight ? 'text-slate-300' : 'text-slate-800'}`}>Platform</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => { playTactileClick(); setRoute('/'); }} className="hover:text-purple-600 dark:hover:text-purple-300 transition-colors cursor-pointer">
                Challenge Overview
              </button>
            </li>
            <li>
              <button onClick={() => { playTactileClick(); setRoute('/login'); }} className="hover:text-purple-600 dark:hover:text-purple-300 transition-colors cursor-pointer font-bold text-purple-600 dark:text-purple-400">
                Sign In / Student Login
              </button>
            </li>
            <li>
              <button onClick={() => { playTactileClick(); setRoute('/dashboard'); }} className="hover:text-purple-600 dark:hover:text-purple-300 transition-colors cursor-pointer">
                Student Dashboard
              </button>
            </li>
            <li>
              <button onClick={() => { playTactileClick(); setRoute('/day/12'); }} className="hover:text-purple-600 dark:hover:text-purple-300 transition-colors cursor-pointer">
                Today's Mission (Day 12)
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className={`max-w-7xl mx-auto mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
        isNight ? 'border-white/5 text-slate-500' : 'border-slate-200 text-slate-400'
      }`}>
        <p className="flex items-center gap-1">
          Designed with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Indian Tech Students • IITs, NITs, Tier-2 & Tier-3 Colleges
        </p>
        <div className="flex items-center gap-4">
          <span className="hover:text-purple-600 cursor-pointer">Privacy</span>
          <span className="hover:text-purple-600 cursor-pointer">Proof of Work Terms</span>
          <span className="text-purple-600 dark:text-purple-400 font-semibold">Cohort 2026</span>
        </div>
      </div>
    </footer>
  );
};
