import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { faqList } from '../../data/mockData';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { playTactileClick } from '../../utils/sound';

export const FAQSection: React.FC = () => {
  const { themeMode } = useApp();
  const isNight = themeMode === 'night';
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    playTactileClick();
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className={`py-16 px-4 sm:px-6 lg:px-8 border-t transition-colors duration-300 ${
      isNight ? 'border-white/8 bg-[#0B1220]/70' : 'border-slate-200 bg-white'
    }`}>
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-700 dark:text-purple-300 text-xs font-bold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className={`text-2xl sm:text-4xl font-extrabold ${isNight ? 'text-white' : 'text-slate-900'}`}>
            Everything You Need To Know
          </h2>
        </div>

        <div className="space-y-3">
          {faqList.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border overflow-hidden transition-all duration-200 ${
                  isNight 
                    ? 'bg-[#111827] border-white/10 text-white' 
                    : 'bg-slate-50 border-slate-200 text-slate-900 shadow-xs'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <span className={`text-sm sm:text-base font-bold leading-snug ${isNight ? 'text-white' : 'text-slate-900'}`}>
                    {item.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className={`px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm leading-relaxed border-t animate-fadeIn ${
                    isNight 
                      ? 'text-slate-300 border-white/5 bg-[#0B1220]/40' 
                      : 'text-slate-600 border-slate-200/80 bg-white/70'
                  }`}>
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
