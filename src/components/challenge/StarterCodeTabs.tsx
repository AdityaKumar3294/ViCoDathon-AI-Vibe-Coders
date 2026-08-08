import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Copy, CheckCircle2 } from 'lucide-react';
import { playTactileClick } from '../../utils/sound';

export const StarterCodeTabs: React.FC = () => {
  const { dayMission, themeMode } = useApp();
  const isNight = themeMode === 'night';
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeCode = dayMission.starterCode[activeTabIndex];

  const handleCopy = () => {
    playTactileClick();
    if (activeCode) {
      navigator.clipboard.writeText(activeCode.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`p-4 sm:p-6 rounded-3xl border transition-all duration-300 space-y-4 text-left ${
      isNight 
        ? 'bg-[#111827] border-white/10 shadow-xl text-white' 
        : 'bg-white border-slate-200/90 shadow-md shadow-slate-200/50 text-slate-900'
    }`}>
      {/* Tab Switcher & Copy Action */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b ${
        isNight ? 'border-white/10' : 'border-slate-100'
      }`}>
        <div className="flex items-center gap-2">
          {dayMission.starterCode.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                playTactileClick();
                setActiveTabIndex(idx);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTabIndex === idx
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : isNight 
                    ? 'bg-[#0B1220] text-slate-400 hover:text-slate-200 border border-white/5' 
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {item.filename}
            </button>
          ))}
        </div>

        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors self-start sm:self-auto cursor-pointer ${
            isNight 
              ? 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border-white/10' 
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border-slate-200'
          }`}
        >
          {copied ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-emerald-600 dark:text-emerald-400">Copied to Clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>Copy Starter Code</span>
            </>
          )}
        </button>
      </div>

      {/* Code Container with Syntax Appearance */}
      <div className={`p-4 rounded-2xl border font-mono text-xs overflow-x-auto max-h-[380px] leading-relaxed select-text ${
        isNight ? 'bg-[#0B1220] border-white/5 text-slate-200' : 'bg-slate-900 border-slate-800 text-emerald-300 shadow-inner'
      }`}>
        <pre>{activeCode.code}</pre>
      </div>
    </div>
  );
};
