import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { tracksList, sampleCurriculumRoadmap } from '../../data/mockData';
import type { TrackId } from '../../types/challenge';
import { Server, Layers, Cpu, CheckCircle2, ChevronRight, Sparkles, Lock } from 'lucide-react';
import { playTactileClick } from '../../utils/sound';

export const CurriculumTimeline: React.FC = () => {
  const { setRoute, themeMode } = useApp();
  const isNight = themeMode === 'night';
  const [selectedTrack, setSelectedTrack] = useState<TrackId>('systems');

  return (
    <section className={`py-16 px-4 sm:px-6 lg:px-8 border-t transition-colors duration-300 ${
      isNight ? 'border-white/8 bg-[#070B14]' : 'border-slate-200 bg-[#F7F8FC]'
    }`}>
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400">
            60-Day Challenge Timeline
          </span>
          <h2 className={`text-2xl sm:text-4xl font-extrabold ${isNight ? 'text-white' : 'text-slate-900'}`}>
            From College Junior to Top 1% System Architect
          </h2>
          <p className={`text-sm ${isNight ? 'text-slate-400' : 'text-slate-600'}`}>
            Select a specialized track tailored for high-paying software engineering placements.
          </p>
        </div>

        {/* Track Switcher */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {tracksList.map(track => {
            const isSelected = selectedTrack === track.id;
            return (
              <button
                key={track.id}
                onClick={() => {
                  playTactileClick();
                  setSelectedTrack(track.id);
                }}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 space-y-2 cursor-pointer ${
                  isSelected
                    ? isNight
                      ? 'bg-[#111827] border-purple-500 shadow-xl shadow-purple-500/10 ring-1 ring-purple-500/40 text-white'
                      : 'bg-purple-50/80 border-purple-400 shadow-md shadow-purple-500/5 ring-1 ring-purple-300 text-slate-900'
                    : isNight
                      ? 'bg-[#0B1220] border-white/10 text-slate-400 hover:bg-[#111827]/50 hover:text-slate-200'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-xl ${
                    isSelected ? 'bg-purple-500/20 text-purple-600 dark:text-purple-300' : 'bg-slate-100 dark:bg-white/5 text-slate-500'
                  }`}>
                    {track.id === 'systems' ? <Server className="w-5 h-5" /> : track.id === 'fullstack' ? <Layers className="w-5 h-5" /> : <Cpu className="w-5 h-5" />}
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    isNight ? 'bg-white/5 text-slate-300 border-white/10' : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}>
                    {track.difficulty}
                  </span>
                </div>

                <div>
                  <h4 className={`text-sm font-bold ${
                    isSelected ? (isNight ? 'text-white' : 'text-purple-950') : (isNight ? 'text-slate-200' : 'text-slate-800')
                  }`}>
                    {track.name}
                  </h4>
                  <p className={`text-xs line-clamp-2 mt-1 leading-snug ${
                    isNight ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {track.tagline}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {track.techStack.slice(0, 3).map((tech, i) => (
                    <span key={i} className={`text-[10px] px-1.5 py-0.5 rounded font-mono border ${
                      isNight ? 'bg-white/5 text-slate-300 border-white/5' : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      {tech}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {/* 8-Week Interactive Roadmap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          {sampleCurriculumRoadmap.map((item, index) => {
            const isCompleted = item.status === 'completed';
            const isInProgress = item.status === 'in-progress';

            return (
              <div
                key={index}
                className={`p-5 rounded-3xl border transition-all duration-300 flex flex-col justify-between space-y-4 ${
                  isInProgress
                    ? isNight
                      ? 'bg-[#111827] border-purple-500/80 shadow-xl shadow-purple-500/15 text-white'
                      : 'bg-purple-50/70 border-purple-300 shadow-md shadow-purple-500/5 ring-1 ring-purple-200 text-slate-900'
                    : isCompleted
                    ? isNight
                      ? 'bg-[#111827]/70 border-emerald-500/30 text-white'
                      : 'bg-emerald-50/40 border-emerald-200 text-slate-900 shadow-xs'
                    : isNight
                      ? 'bg-[#0B1220]/60 border-white/5 opacity-80 text-slate-400'
                      : 'bg-white border-slate-200 opacity-90 text-slate-700 shadow-xs'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400">
                      WEEK 0{item.week}
                    </span>
                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Completed</span>
                      </span>
                    ) : isInProgress ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-purple-700 dark:text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded-md border border-purple-500/30 animate-pulse">
                        <Sparkles className="w-3 h-3" />
                        <span>Active Now</span>
                      </span>
                    ) : (
                      <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        isNight ? 'text-slate-500 bg-white/5' : 'text-slate-500 bg-slate-100'
                      }`}>
                        <Lock className="w-3 h-3" />
                        <span>Locked</span>
                      </span>
                    )}
                  </div>

                  <h4 className={`text-sm font-bold leading-snug ${isNight ? 'text-white' : 'text-slate-900'}`}>
                    {item.title}
                  </h4>

                  <p className={`text-xs leading-relaxed ${isNight ? 'text-slate-400' : 'text-slate-600'}`}>
                    {item.focus}
                  </p>
                </div>

                <div className={`pt-2 border-t flex items-center justify-between text-xs ${
                  isNight ? 'border-white/5' : 'border-slate-200/80'
                }`}>
                  <span className={`text-[11px] font-semibold ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>
                    {item.days}
                  </span>

                  {isInProgress ? (
                    <button
                      onClick={() => {
                        playTactileClick();
                        setRoute('/day/12');
                      }}
                      className="text-purple-600 dark:text-purple-400 font-bold hover:underline flex items-center gap-0.5 text-xs cursor-pointer"
                    >
                      <span>Day 12</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
