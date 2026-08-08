import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  Flame, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  X, 
  Lock
} from 'lucide-react';
import { playTactileClick } from '../../utils/sound';

export const SuccessCelebrationModal: React.FC = () => {
  const { 
    isCelebrationModalOpen, 
    setIsCelebrationModalOpen, 
    setRoute, 
    profile, 
    themeMode,
  } = useApp();

  const isNight = themeMode === 'night';

  if (!isCelebrationModalOpen) return null;

  const handleClose = () => {
    playTactileClick();
    setIsCelebrationModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className={`w-full max-w-lg max-h-[92vh] overflow-y-auto border-2 rounded-3xl p-5 sm:p-8 shadow-2xl space-y-5 sm:space-y-6 relative transition-colors duration-300 ${
        isNight 
          ? 'bg-[#111827] border-purple-500/50 shadow-purple-950/40 text-white' 
          : 'bg-white border-purple-300 shadow-purple-500/20 text-slate-900'
      }`}>
        {/* Glow ambient */}
        <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none ${
          isNight ? 'bg-purple-600/20' : 'bg-purple-200/50'
        }`} />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className={`absolute top-4 right-4 p-2 rounded-xl transition-colors cursor-pointer ${
            isNight ? 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon & Animation */}
        <div className="text-center space-y-2 pt-2">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-purple-600 to-emerald-400 p-[2px] mx-auto shadow-xl shadow-purple-500/30">
            <div className={`w-full h-full rounded-[22px] flex items-center justify-center ${
              isNight ? 'bg-[#0B1220]' : 'bg-white'
            }`}>
              <Sparkles className="w-8 h-8 text-emerald-500 animate-bounce" />
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Mission 12 Verified</span>
          </div>

          <h2 className={`text-2xl sm:text-3xl font-extrabold ${isNight ? 'text-white' : 'text-slate-900'}`}>
            Day 12 Conquered!
          </h2>
          <p className={`text-xs sm:text-sm ${isNight ? 'text-slate-300' : 'text-slate-600'}`}>
            Your Redis Rate Limiter is committed, tested, and added to your public portfolio.
          </p>
        </div>

        {/* Rewards Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className={`p-4 rounded-2xl border text-center space-y-1 ${
            isNight ? 'bg-[#0B1220] border-orange-500/30' : 'bg-orange-50/50 border-orange-200'
          }`}>
            <div className="flex items-center justify-center gap-1 text-xs text-orange-500 font-bold">
              <Flame className="w-4 h-4 fill-orange-500" />
              <span>Streak Protected</span>
            </div>
            <div className={`text-2xl font-extrabold font-mono ${isNight ? 'text-white' : 'text-slate-900'}`}>
              {profile.streakDays} Days 🔥
            </div>
          </div>

          <div className={`p-4 rounded-2xl border text-center space-y-1 ${
            isNight ? 'bg-[#0B1220] border-amber-500/30' : 'bg-amber-50/50 border-amber-200'
          }`}>
            <div className="flex items-center justify-center gap-1 text-xs text-amber-500 font-bold">
              <Award className="w-4 h-4" />
              <span>XP Earned</span>
            </div>
            <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-300 font-mono">
              +150 XP
            </div>
          </div>
        </div>

        {/* Next Challenge Preview */}
        <div className={`p-4 rounded-2xl border space-y-2 text-left ${
          isNight ? 'bg-[#0B1220] border-white/5' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center justify-between text-xs font-bold">
            <span className={isNight ? 'text-slate-400' : 'text-slate-500'}>Next Up Tomorrow (Day 13)</span>
            <span className="text-purple-600 dark:text-purple-400 flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span>Unlocks Tonight at 9:00 PM</span>
            </span>
          </div>
          <div className={`text-xs font-bold ${isNight ? 'text-white' : 'text-slate-900'}`}>
            Redis Pub/Sub & WebSockets Real-time Chat Architecture
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => {
              handleClose();
              setRoute('/dashboard');
            }}
            className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <span>Return to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
