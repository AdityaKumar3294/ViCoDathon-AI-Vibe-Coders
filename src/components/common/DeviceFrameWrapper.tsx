import React from 'react';
import { useApp } from '../../context/AppContext';
import { Smartphone, Monitor, Sparkles } from 'lucide-react';
import { playTactileClick } from '../../utils/sound';

export const DeviceFrameWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { deviceViewMode, setDeviceViewMode, themeMode } = useApp();
  const isNight = themeMode === 'night';

  if (deviceViewMode === 'responsive') {
    return <div className="min-h-screen flex flex-col">{children}</div>;
  }

  const isMobile = deviceViewMode === 'mobile-390';
  const widthClass = isMobile ? 'max-w-[420px]' : 'max-w-[800px]';

  return (
    <div className={`min-h-screen py-8 px-4 flex flex-col items-center justify-start transition-colors duration-300 ${
      isNight ? 'bg-[#070B14]' : 'bg-slate-200/80'
    }`}>
      {/* Floating frame control banner */}
      <div className={`mb-6 flex items-center justify-between w-full max-w-xl backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border ${
        isNight ? 'bg-[#111827]/90 border-white/10 text-white' : 'bg-white/90 border-slate-300 text-slate-800'
      }`}>
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-purple-600" />
          <span className="text-xs font-bold">
            {isMobile ? '390px Mobile Viewport' : '768px Tablet Viewport'}
          </span>
          <span className="px-2 py-0.5 text-[10px] bg-purple-500/20 text-purple-600 dark:text-purple-300 font-extrabold rounded-md">
            Mobile-First Mode
          </span>
        </div>

        <button
          onClick={() => {
            playTactileClick();
            setDeviceViewMode('responsive');
          }}
          className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-xl transition-all border cursor-pointer ${
            isNight ? 'text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border-white/10' : 'text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border-slate-300'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Exit to Full Width</span>
        </button>
      </div>

      {/* Realistic Device Phone Shell */}
      <div className={`w-full ${widthClass} transition-all duration-300`}>
        <div className={`relative rounded-[42px] p-3.5 shadow-2xl border-4 ring-1 transition-all ${
          isNight 
            ? 'bg-gradient-to-b from-slate-700 via-slate-900 to-slate-950 border-slate-800 ring-white/20' 
            : 'bg-gradient-to-b from-slate-400 via-slate-600 to-slate-800 border-slate-400 ring-black/10'
        }`}>
          {/* Top Speaker / Dynamic Island */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-50 flex items-center justify-center gap-2 px-3">
            <span className="w-2 h-2 rounded-full bg-slate-900" />
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <Sparkles className="w-2.5 h-2.5 text-purple-400" />
            </div>
          </div>

          {/* Inner Screen */}
          <div className={`w-full min-h-[844px] rounded-[32px] overflow-x-hidden overflow-y-auto border flex flex-col transition-colors duration-300 ${
            isNight ? 'bg-[#0B1020] border-white/5' : 'bg-[#F7F8FC] border-slate-200'
          }`}>
            {children}
          </div>

          {/* Bottom Home Indicator Bar */}
          <div className="w-32 h-1 bg-slate-400/60 rounded-full mx-auto mt-3" />
        </div>
      </div>
    </div>
  );
};
