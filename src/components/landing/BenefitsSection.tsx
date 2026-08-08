import React from 'react';
import { useApp } from '../../context/AppContext';
import { Flame, ShieldCheck, Share2, Moon } from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  const { themeMode } = useApp();
  const isNight = themeMode === 'night';

  const benefits = [
    {
      icon: Flame,
      title: 'Discipline Over Motivation',
      color: 'text-orange-500',
      bg: isNight ? 'bg-orange-500/10 border-orange-500/20' : 'bg-orange-50 border-orange-200',
      description: 'Motivation fades in 3 days. Our Duolingo-style streak system, streak freeze shields, and nocturnal focus reminders keep you consistent through college exam season.',
      metric: '94.2% completion rate',
    },
    {
      icon: ShieldCheck,
      title: 'Verified Proof of Work',
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: isNight ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200',
      description: 'Zero generic tutorial copy-pasting. Every single day you solve architecture constraints, push genuine Git commits, and write test suites in TypeScript, Go, or Python.',
      metric: '60,000+ Git commits verified',
    },
    {
      icon: Share2,
      title: 'Inbound Recruiter Magnet',
      color: 'text-blue-600 dark:text-blue-400',
      bg: isNight ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-200',
      description: 'By sharing your daily reflection and proof-of-work on LinkedIn with #ABTalks60Days, you build an audience of hiring managers and founders who reach out with direct interview invites.',
      metric: '400k+ LinkedIn impressions',
    },
    {
      icon: Moon,
      title: 'Engineered for College Nights',
      color: 'text-purple-600 dark:text-purple-400',
      bg: isNight ? 'bg-purple-500/10 border-purple-500/20' : 'bg-purple-50 border-purple-200',
      description: 'Built specifically for students coding after college lectures, hostel dinners, and lab hours. 35-minute focused missions with zero cognitive overload.',
      metric: 'Night Focus Mode active',
    },
  ];

  return (
    <section className={`py-16 px-4 sm:px-6 lg:px-8 border-t transition-colors duration-300 ${
      isNight ? 'border-white/8 bg-[#0B1220]/60' : 'border-slate-200 bg-[#F7F8FC]'
    }`}>
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400">
            Why Indian Students Succeed Here
          </h2>
          <p className={`text-2xl sm:text-4xl font-extrabold ${isNight ? 'text-white' : 'text-slate-900'}`}>
            Most students fail alone.{' '}
            <span className={isNight ? 'text-slate-400' : 'text-slate-500'}>ABTalks makes consistency inevitable.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-3xl border transition-all duration-300 space-y-4 group text-left ${
                  isNight 
                    ? 'bg-[#111827] border-white/10 hover:border-purple-500/30 shadow-xl text-white' 
                    : 'bg-white border-slate-200/90 hover:border-purple-300 shadow-md shadow-slate-200/50 text-slate-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-2xl ${b.bg} border`}>
                    <Icon className={`w-6 h-6 ${b.color}`} />
                  </div>
                  <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${
                    isNight ? 'bg-white/5 text-slate-300 border-white/10' : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}>
                    {b.metric}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className={`text-lg font-bold transition-colors ${
                    isNight ? 'text-white group-hover:text-purple-300' : 'text-slate-900 group-hover:text-purple-700'
                  }`}>
                    {b.title}
                  </h3>
                  <p className={`text-xs sm:text-sm leading-relaxed ${
                    isNight ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {b.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
