import React from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, ExternalLink, Clock, FileText, Video, Code2 } from 'lucide-react';
import { playTactileClick } from '../../utils/sound';

export const RecommendedResources: React.FC = () => {
  const { dayMission, themeMode } = useApp();
  const isNight = themeMode === 'night';

  const getIcon = (type: string) => {
    switch (type) {
      case 'github': return Code2;
      case 'video': return Video;
      default: return FileText;
    }
  };

  return (
    <div className={`p-4 sm:p-6 rounded-3xl border transition-all duration-300 space-y-4 text-left ${
      isNight 
        ? 'bg-[#111827] border-white/10 shadow-xl text-white' 
        : 'bg-white border-slate-200/90 shadow-md shadow-slate-200/50 text-slate-900'
    }`}>
      <div className="flex items-center gap-2.5">
        <div className="p-2 rounded-2xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 border border-indigo-500/30">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <h3 className={`text-base font-extrabold ${isNight ? 'text-white' : 'text-slate-900'}`}>Curated Engineering Docs</h3>
          <p className={`text-xs ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>High-signal industry references & system design articles</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {dayMission.resources.map((res, i) => {
          const Icon = getIcon(res.type);
          return (
            <a
              key={i}
              href={res.url}
              target="_blank"
              rel="noreferrer"
              onClick={playTactileClick}
              className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between space-y-2 group cursor-pointer ${
                isNight 
                  ? 'bg-[#0B1220] border-white/5 hover:border-purple-500/40' 
                  : 'bg-slate-50 border-slate-200 hover:border-purple-300 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between">
                <Icon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className={`text-[10px] font-mono flex items-center gap-1 ${
                  isNight ? 'text-slate-500' : 'text-slate-400'
                }`}>
                  <Clock className="w-3 h-3" />
                  <span>{res.readTime}</span>
                </span>
              </div>

              <div className={`text-xs font-bold transition-colors line-clamp-2 leading-snug ${
                isNight ? 'text-slate-200 group-hover:text-purple-300' : 'text-slate-800 group-hover:text-purple-700'
              }`}>
                {res.title}
              </div>

              <div className="flex items-center gap-1 text-[11px] text-purple-600 dark:text-purple-400 font-semibold pt-1">
                <span>Read Reference</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};
