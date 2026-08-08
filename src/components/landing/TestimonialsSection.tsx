import React from 'react';
import { useApp } from '../../context/AppContext';
import { testimonialsList } from '../../data/mockData';
import { Share2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { themeMode } = useApp();
  const isNight = themeMode === 'night';

  return (
    <section id="testimonials" className={`py-16 px-4 sm:px-6 lg:px-8 border-t transition-colors duration-300 ${
      isNight ? 'border-white/8 bg-[#070B14]' : 'border-slate-200 bg-[#F7F8FC]'
    }`}>
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400">
            Student Transformations
          </span>
          <h2 className={`text-2xl sm:text-4xl font-extrabold ${isNight ? 'text-white' : 'text-slate-900'}`}>
            From Tier-3 College to High-Salary Tech Offers
          </h2>
          <p className={`text-sm ${isNight ? 'text-slate-400' : 'text-slate-600'}`}>
            Real Indian engineering students who replaced passive video tutorials with daily public proof of work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonialsList.map(t => (
            <div
              key={t.id}
              className={`p-6 rounded-3xl border flex flex-col justify-between space-y-6 transition-all duration-300 relative group text-left ${
                isNight 
                  ? 'bg-[#111827] border-white/10 shadow-xl hover:border-purple-500/40 text-white' 
                  : 'bg-white border-slate-200/90 shadow-md shadow-slate-200/50 hover:border-purple-300 text-slate-900'
              }`}
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-12 h-12 rounded-2xl object-cover border border-purple-500/30 shadow-xs"
                    />
                    <div>
                      <h4 className={`text-sm font-bold ${isNight ? 'text-white' : 'text-slate-900'}`}>{t.name}</h4>
                      <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold">{t.role}</p>
                      <p className={`text-[10px] ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>{t.college}</p>
                    </div>
                  </div>
                  <Share2 className="w-4 h-4 text-blue-500 opacity-70 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Quote */}
                <p className={`text-xs leading-relaxed italic ${isNight ? 'text-slate-300' : 'text-slate-600'}`}>
                  "{t.quote}"
                </p>
              </div>

              {/* Stats Bar */}
              <div className={`pt-4 border-t grid grid-cols-3 gap-2 text-center text-xs ${
                isNight ? 'border-white/5' : 'border-slate-100'
              }`}>
                <div className={`p-2 rounded-xl ${isNight ? 'bg-white/5' : 'bg-slate-50 border border-slate-200/60'}`}>
                  <span className={`text-[10px] block ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>Streak</span>
                  <span className="font-bold text-orange-500 text-xs">{t.stats.streak}</span>
                </div>
                <div className={`p-2 rounded-xl ${isNight ? 'bg-white/5' : 'bg-slate-50 border border-slate-200/60'}`}>
                  <span className={`text-[10px] block ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>Commits</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 text-xs">{t.stats.commits}</span>
                </div>
                <div className={`p-2 rounded-xl ${isNight ? 'bg-white/5' : 'bg-slate-50 border border-slate-200/60'}`}>
                  <span className={`text-[10px] block ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>Result</span>
                  <span className="font-bold text-purple-600 dark:text-purple-300 text-[11px] truncate block">{t.stats.offers}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
