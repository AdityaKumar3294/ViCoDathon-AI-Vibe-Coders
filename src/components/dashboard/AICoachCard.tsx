import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Bot, CheckCircle2, Copy, Lightbulb } from 'lucide-react';
import { playTactileClick } from '../../utils/sound';

export const AICoachCard: React.FC = () => {
  const { themeMode } = useApp();
  const isNight = themeMode === 'night';
  const [copied, setCopied] = useState(false);

  const sampleCommitSuggestion = 'feat(rate-limiter): implement atomic Redis sliding window counter with 429 Retry-After header';

  const copySuggestion = () => {
    playTactileClick();
    navigator.clipboard.writeText(sampleCommitSuggestion);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`p-4 sm:p-6 rounded-3xl border transition-all duration-300 space-y-4 relative overflow-hidden group ${
      isNight 
        ? 'bg-[#111827] border-purple-500/30 shadow-xl text-white' 
        : 'bg-white border-purple-200/90 shadow-md shadow-purple-500/5 text-slate-900'
    }`}>
      {/* Top Banner */}
      <div className="flex items-center justify-between text-left">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-2xl bg-purple-500/15 text-purple-600 dark:text-purple-300 border border-purple-500/30">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`text-base font-extrabold ${isNight ? 'text-white' : 'text-slate-900'}`}>AI Recruiter & Code Coach</h3>
            <p className={`text-xs ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>Contextual feedback on yesterday's proof of work</p>
          </div>
        </div>

        <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30">
          Smart Advice
        </span>
      </div>

      {/* Recruiter Scan Alert */}
      <div className={`p-4 rounded-2xl border space-y-2 text-xs leading-relaxed text-left ${
        isNight ? 'bg-[#0B1220] border-white/5 text-slate-300' : 'bg-purple-50/60 border-purple-100 text-slate-700'
      }`}>
        <div className="flex items-start gap-2">
          <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <p>
            "Yesterday's commit message <span className="font-mono text-rose-600 dark:text-rose-300 bg-rose-500/10 px-1 rounded">'updated files'</span> was too generic. 
            Recruiters look for high-signal conventional commits. Try this optimized format today:"
          </p>
        </div>

        {/* Suggested Commit format */}
        <div className={`flex items-center justify-between p-3 rounded-xl border font-mono text-xs gap-2 ${
          isNight ? 'bg-slate-900 border-white/10 text-emerald-300' : 'bg-white border-slate-200 text-emerald-700 shadow-xs'
        }`}>
          <span className="truncate">{sampleCommitSuggestion}</span>
          <button
            onClick={copySuggestion}
            className={`p-1.5 rounded-lg transition-colors shrink-0 cursor-pointer ${
              isNight ? 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900'
            }`}
            title="Copy to clipboard"
          >
            {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
