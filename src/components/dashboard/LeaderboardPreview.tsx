import React from 'react';
import { useApp } from '../../context/AppContext';
import { mockLeaderboard } from '../../data/mockData';
import { Trophy, Flame } from 'lucide-react';

export const LeaderboardPreview: React.FC = () => {
  const { themeMode } = useApp();
  const isNight = themeMode === 'night';

  return (
    <div className={`p-4 sm:p-6 rounded-3xl border transition-all duration-300 space-y-5 sm:space-y-6 ${
      isNight 
        ? 'bg-[#111827] border-white/10 shadow-xl text-white' 
        : 'bg-white border-slate-200/90 shadow-md shadow-slate-200/50 text-slate-900'
    }`}>
      <div className="flex items-center justify-between text-left">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-2xl bg-amber-500/15 text-amber-500 border border-amber-500/30">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`text-base font-extrabold ${isNight ? 'text-white' : 'text-slate-900'}`}>National College Leaderboard</h3>
            <p className={`text-xs ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>14,200+ participating engineering students</p>
          </div>
        </div>

        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
          Rank #42 • Top 0.3%
        </span>
      </div>

      {/* Leaderboard Table List */}
      <div className="space-y-2 text-left">
        {mockLeaderboard.map((user, index) => {
          const isCurrent = user.isCurrentUser;
          return (
            <div
              key={index}
              className={`p-3 rounded-2xl border transition-all flex items-center justify-between ${
                isCurrent
                  ? isNight 
                    ? 'bg-purple-950/40 border-purple-500/60 shadow-md shadow-purple-500/10 ring-1 ring-purple-500/30 text-white' 
                    : 'bg-purple-50 border-purple-300 shadow-xs ring-1 ring-purple-200 text-slate-900'
                  : isNight 
                    ? 'bg-[#0B1220]/60 border-white/5 text-slate-300' 
                    : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-6 text-center text-xs font-bold font-mono ${
                  user.rank <= 3 
                    ? 'text-amber-500 font-extrabold' 
                    : isNight ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  #{user.rank}
                </span>

                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-xl object-cover border border-slate-300 dark:border-white/10"
                />

                <div>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-xs font-bold ${
                      isCurrent 
                        ? isNight ? 'text-white' : 'text-purple-900' 
                        : isNight ? 'text-slate-200' : 'text-slate-800'
                    }`}>
                      {user.name}
                    </span>
                    {isCurrent && (
                      <span className="px-1.5 py-0.2 text-[9px] bg-purple-500/20 text-purple-700 dark:text-purple-200 font-extrabold rounded">
                        YOU
                      </span>
                    )}
                  </div>
                  <span className={`text-[10px] block ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>{user.college}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="flex items-center gap-1 text-orange-500 font-bold">
                  <Flame className="w-3.5 h-3.5 fill-orange-500" />
                  <span>{user.streak}d</span>
                </div>

                <div className="text-emerald-600 dark:text-emerald-400 font-bold">
                  {user.xp} XP
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
