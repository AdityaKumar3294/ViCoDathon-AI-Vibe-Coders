import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { mockAchievements } from '../../data/mockData';
import type { AchievementBadge } from '../../types/challenge';
import { 
  Award, 
  Flame, 
  Moon, 
  Share2, 
  Sparkles, 
  ShieldCheck, 
  Crown, 
  Lock, 
  CheckCircle2, 
  X 
} from 'lucide-react';
import { playTactileClick } from '../../utils/sound';

export const AchievementsGrid: React.FC = () => {
  const { themeMode } = useApp();
  const isNight = themeMode === 'night';
  const [selectedBadge, setSelectedBadge] = useState<AchievementBadge | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'GitCommit': return Sparkles;
      case 'Flame': return Flame;
      case 'Moon': return Moon;
      case 'Share2': return Share2;
      case 'Sparkles': return Sparkles;
      case 'ShieldCheck': return ShieldCheck;
      case 'Award': return Award;
      case 'Crown': return Crown;
      default: return Award;
    }
  };

  return (
    <div className={`p-4 sm:p-6 rounded-3xl border transition-all duration-300 space-y-5 sm:space-y-6 ${
      isNight 
        ? 'bg-[#111827] border-white/10 shadow-xl text-white' 
        : 'bg-white border-slate-200/90 shadow-md shadow-slate-200/50 text-slate-900'
    }`}>
      <div className="flex items-center justify-between text-left">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-2xl bg-amber-500/15 text-amber-500 border border-amber-500/30">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`text-base font-extrabold ${isNight ? 'text-white' : 'text-slate-900'}`}>Achievements & Badges</h3>
            <p className={`text-xs ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>Unlock XP bonuses & recruiter badges</p>
          </div>
        </div>

        <span className={`text-xs font-bold ${isNight ? 'text-slate-300' : 'text-slate-700'}`}>
          6 of 8 Unlocked
        </span>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {mockAchievements.map(badge => {
          const Icon = getIcon(badge.icon);
          const isUnlocked = badge.unlocked;

          return (
            <button
              key={badge.id}
              onClick={() => {
                playTactileClick();
                setSelectedBadge(badge);
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between space-y-3 relative group cursor-pointer ${
                isUnlocked
                  ? isNight 
                    ? 'bg-[#0B1220] border-purple-500/30 hover:border-purple-500/60 shadow-md' 
                    : 'bg-purple-50/50 border-purple-200 hover:border-purple-300 shadow-xs'
                  : isNight 
                    ? 'bg-[#0B1220]/40 border-white/5 opacity-60 hover:opacity-100' 
                    : 'bg-slate-50 border-slate-200 opacity-60 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-xl ${
                  isUnlocked 
                    ? 'bg-purple-500/20 text-purple-600 dark:text-purple-300' 
                    : isNight ? 'bg-white/5 text-slate-500' : 'bg-slate-200/60 text-slate-400'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                {isUnlocked ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                )}
              </div>

              <div>
                <h4 className={`text-xs font-bold ${
                  isUnlocked 
                    ? isNight ? 'text-white' : 'text-slate-900' 
                    : isNight ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  {badge.name}
                </h4>
                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-mono font-bold">
                  +{badge.xpBonus} XP
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Badge Modal */}
      {selectedBadge && (
        <div className={`p-4 rounded-2xl border space-y-3 animate-fadeIn relative text-left ${
          isNight ? 'bg-[#0B1220] border-purple-500/30' : 'bg-purple-50/80 border-purple-200 text-slate-900'
        }`}>
          <button
            onClick={() => setSelectedBadge(null)}
            className={`absolute top-3 right-3 p-1 rounded-lg cursor-pointer ${
              isNight ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <span className={`text-xs font-extrabold ${isNight ? 'text-white' : 'text-slate-900'}`}>{selectedBadge.name}</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-300 font-mono">
              +{selectedBadge.xpBonus} XP Bonus
            </span>
          </div>

          <p className={`text-xs ${isNight ? 'text-slate-300' : 'text-slate-600'}`}>
            {selectedBadge.description}
          </p>

          {selectedBadge.unlockedDate && (
            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
              ✓ Unlocked on {selectedBadge.unlockedDate}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
