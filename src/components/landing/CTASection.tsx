import React from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronRight, Flame, ShieldCheck } from 'lucide-react';
import { playTactileClick } from '../../utils/sound';

export const CTASection: React.FC = () => {
  const { setRoute, themeMode } = useApp();
  const isNight = themeMode === 'night';

  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 border-t relative overflow-hidden transition-colors duration-300 ${
      isNight 
        ? 'border-white/8 bg-gradient-to-b from-[#0B1220] via-[#111827] to-[#0B1220] text-white' 
        : 'border-purple-200 bg-gradient-to-b from-purple-50 via-white to-purple-50/60 text-slate-900'
    }`}>
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-3xl pointer-events-none ${
        isNight ? 'bg-purple-600/20' : 'bg-purple-300/40'
      }`} />

      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold shadow-md ${
          isNight 
            ? 'bg-purple-500/20 text-purple-300 border-purple-500/30 shadow-purple-500/20' 
            : 'bg-purple-100 text-purple-800 border-purple-300 shadow-purple-500/5'
        }`}>
          <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-bounce" />
          <span>Next Cohort Begins Tonight at 9:00 PM</span>
        </div>

        <div className="space-y-4">
          <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${
            isNight ? 'text-white' : 'text-slate-900'
          }`}>
            Stop Scrolling. Start Shipping.
          </h2>
          <p className={`text-sm sm:text-base max-w-xl mx-auto leading-relaxed ${
            isNight ? 'text-slate-300' : 'text-slate-600'
          }`}>
            In 60 days, you can have 60 verified commits, an active tech following, and recruiter visibility that changes your trajectory forever.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              playTactileClick();
              setRoute('/login');
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-base shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Start 60-Day Challenge</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => {
              playTactileClick();
              setRoute('/day/12');
            }}
            className={`w-full sm:w-auto px-6 py-4 rounded-2xl font-bold text-sm border transition-all cursor-pointer ${
              isNight 
                ? 'bg-[#111827] hover:bg-[#162033] text-slate-200 hover:text-white border-white/10' 
                : 'bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border-slate-200 shadow-sm'
            }`}
          >
            Preview Day 12 Mission
          </button>
        </div>

        <div className="pt-2 flex items-center justify-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>Free for all Indian college students • Zero hidden paywalls</span>
        </div>
      </div>
    </section>
  );
};
