import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { RoutePath } from '../../types/challenge';
import { 
  Flame, 
  Moon, 
  Sun, 
  Volume2, 
  VolumeX, 
  LayoutDashboard, 
  Code2, 
  ArrowLeft,
  Menu,
  X,
  UserCheck,
  ShieldAlert,
  LogIn,
  Globe,
  Wrench
} from 'lucide-react';
import { playTactileClick } from '../../utils/sound';

export const Navbar: React.FC = () => {
  const { 
    currentRoute, 
    setRoute, 
    themeMode,
    toggleThemeMode,
    profile, 
    soundEnabled, 
    toggleSoundState,
    setIsStateSimulatorOpen,
    edgeCases,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isNight = themeMode === 'night';

  const handleNav = (route: RoutePath) => {
    playTactileClick();
    setRoute(route);
    setMobileMenuOpen(false);
  };

  const hasActiveEdgeCase = Object.values(edgeCases).some(Boolean);
  const isAuthRoute = currentRoute === '/login' || currentRoute === '/register';
  const isLandingRoute = currentRoute === '/';
  const isAppRoute = currentRoute === '/dashboard' || currentRoute === '/day/12';

  return (
    <>
      {/* Edge Case simulator indicator banner */}
      {hasActiveEdgeCase && (
        <div className={`border-b px-3 py-1.5 text-center text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
          isNight 
            ? 'bg-amber-950/50 border-amber-500/40 text-amber-200' 
            : 'bg-amber-50 border-amber-300 text-amber-900'
        }`}>
          <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <span>Edge Case Testing State Active</span>
          <button 
            onClick={() => setIsStateSimulatorOpen(true)}
            className="underline ml-2 hover:opacity-80 font-bold cursor-pointer"
          >
            Change State
          </button>
        </div>
      )}

      {/* =========================================================================
          1. AUTHENTICATION HEADER (Distraction-free for /login & /register)
          ========================================================================= */}
      {isAuthRoute && (
        <header className={`sticky top-0 z-40 w-full border-b backdrop-blur-xl transition-colors ${
          isNight 
            ? 'border-white/10 bg-[#0B1220]/90 text-slate-100' 
            : 'border-slate-200/90 bg-white/95 text-slate-900 shadow-xs'
        }`}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
            {/* Logo: Always returns to Landing Page (/) */}
            <button 
              onClick={() => handleNav('/')}
              className="flex items-center gap-2 group cursor-pointer focus:outline-none"
              title="Return to ABTalks Home"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 p-[1.5px] shadow-sm">
                <div className={`w-full h-full rounded-[10px] flex items-center justify-center ${
                  isNight ? 'bg-[#0B1220]' : 'bg-white'
                }`}>
                  <Code2 className="w-4 h-4 text-purple-600" />
                </div>
              </div>
              <span className="font-extrabold tracking-tight text-lg font-sans">
                AB<span className="text-purple-600">Talks</span>
              </span>
            </button>

            {/* Back link & Theme toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleNav('/')}
                className={`text-xs font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-colors cursor-pointer ${
                  isNight 
                    ? 'border-white/10 text-slate-300 hover:text-white bg-white/5' 
                    : 'border-slate-300 text-slate-700 hover:text-slate-900 bg-slate-50'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Explore</span>
              </button>

              <button
                onClick={toggleThemeMode}
                title={isNight ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  isNight 
                    ? 'bg-[#111827] border-white/10 text-amber-300' 
                    : 'bg-slate-100 border-slate-300 text-slate-800 hover:text-purple-700'
                }`}
              >
                {isNight ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </header>
      )}

      {/* =========================================================================
          2. MARKETING NAVBAR (For Landing Page /)
          ========================================================================= */}
      {isLandingRoute && (
        <header className={`sticky top-0 z-40 w-full border-b backdrop-blur-xl transition-colors ${
          isNight 
            ? 'border-white/10 bg-[#0B1220]/90 text-slate-100' 
            : 'border-slate-200/90 bg-white/95 text-slate-900 shadow-xs'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            {/* Logo: returns to Landing (/) */}
            <button 
              onClick={() => handleNav('/')}
              className="flex items-center gap-2 group cursor-pointer focus:outline-none"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-purple-400 p-[1.5px] shadow-md shadow-purple-500/20">
                <div className={`w-full h-full rounded-[14px] flex items-center justify-center ${
                  isNight ? 'bg-[#0B1220]' : 'bg-white'
                }`}>
                  <Code2 className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-left">
                <span className="font-extrabold tracking-tight text-lg font-sans">
                  AB<span className="text-purple-600">Talks</span>
                </span>
                <span className={`px-1.5 py-0.5 text-[10px] font-extrabold rounded-md border uppercase tracking-wider ${
                  isNight ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' : 'bg-purple-100 text-purple-900 border-purple-300'
                }`}>
                  60 Days
                </span>
              </div>
            </button>

            {/* Desktop Marketing Navigation */}
            <nav className="hidden md:flex items-center gap-6 text-xs font-bold">
              <button 
                onClick={() => handleNav('/day/12')} 
                className={`transition-colors cursor-pointer ${
                  isNight ? 'text-slate-300 hover:text-purple-400' : 'text-slate-700 hover:text-purple-700'
                }`}
              >
                Today's Challenge
              </button>
              <button 
                onClick={() => handleNav('/dashboard')} 
                className={`transition-colors cursor-pointer ${
                  isNight ? 'text-slate-300 hover:text-purple-400' : 'text-slate-700 hover:text-purple-700'
                }`}
              >
                Live Cohort
              </button>
              <button 
                onClick={() => handleNav('/login')} 
                className={`transition-colors cursor-pointer ${
                  isNight ? 'text-slate-300 hover:text-purple-400' : 'text-slate-700 hover:text-purple-700'
                }`}
              >
                Login
              </button>
            </nav>

            {/* Right Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={toggleThemeMode}
                title={isNight ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  isNight 
                    ? 'bg-[#111827] border-white/10 text-amber-300' 
                    : 'bg-slate-100 border-slate-300 text-slate-800 hover:text-purple-700'
                }`}
              >
                {isNight ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <button
                onClick={() => handleNav('/register')}
                className="hidden sm:flex px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-extrabold shadow-md shadow-purple-600/30 items-center gap-1 cursor-pointer transition-all active:scale-95"
              >
                <span>Start Challenge →</span>
              </button>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => {
                  playTactileClick();
                  setMobileMenuOpen(prev => !prev);
                }}
                className={`md:hidden p-2 rounded-xl border cursor-pointer ${
                  isNight ? 'bg-[#111827] border-white/10 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
                }`}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Menu for Landing Page */}
          {mobileMenuOpen && (
            <div className={`md:hidden border-t p-4 space-y-2.5 animate-fadeIn ${
              isNight ? 'bg-[#0B1220] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-lg'
            }`}>
              <button
                onClick={() => handleNav('/register')}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <span>Start Challenge →</span>
              </button>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => handleNav('/day/12')}
                  className={`h-11 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                    isNight ? 'bg-white/5 border-white/10 text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                  }`}
                >
                  <Code2 className="w-4 h-4 text-purple-600" />
                  <span>Today's Challenge</span>
                </button>
                <button
                  onClick={() => handleNav('/login')}
                  className={`h-11 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                    isNight ? 'bg-white/5 border-white/10 text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                  }`}
                >
                  <LogIn className="w-4 h-4 text-purple-600" />
                  <span>Login</span>
                </button>
              </div>
              <button
                onClick={() => handleNav('/')}
                className={`w-full h-10 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                  isNight ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-slate-50 border-slate-300 text-slate-700'
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-purple-600" />
                <span>How It Works</span>
              </button>
            </div>
          )}
        </header>
      )}

      {/* =========================================================================
          3. APPLICATION NAVBAR (For /dashboard & /day/12)
          ========================================================================= */}
      {isAppRoute && (
        <>
          {/* Top Application Header */}
          <header className={`sticky top-0 z-40 w-full border-b backdrop-blur-xl transition-colors ${
            isNight 
              ? 'border-white/10 bg-[#0B1220]/90 text-slate-100' 
              : 'border-slate-200/90 bg-white/95 text-slate-900 shadow-xs'
          }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
              {/* Brand Logo: Routes to Dashboard (App Home) */}
              <div className="flex items-center gap-2 sm:gap-3">
                <button 
                  onClick={() => handleNav('/dashboard')}
                  className="flex items-center gap-2 group cursor-pointer focus:outline-none"
                  title="ABTalks Dashboard"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-purple-400 p-[1.5px] shadow-sm">
                    <div className={`w-full h-full rounded-[14px] flex items-center justify-center ${
                      isNight ? 'bg-[#0B1220]' : 'bg-white'
                    }`}>
                      <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-left">
                    <span className="font-extrabold tracking-tight text-base sm:text-lg font-sans">
                      AB<span className="text-purple-600">Talks</span>
                    </span>
                    <span className={`px-1.5 py-0.5 text-[9px] sm:text-[10px] font-extrabold rounded-md border uppercase ${
                      isNight ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' : 'bg-purple-100 text-purple-900 border-purple-300'
                    }`}>
                      Day 12
                    </span>
                  </div>
                </button>

                {/* Return to Landing link (Desktop/Tablet) */}
                <button
                  onClick={() => handleNav('/')}
                  title="Return to Public Landing Page"
                  className={`hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                    isNight 
                      ? 'border-white/10 text-slate-400 hover:text-white bg-white/5' 
                      : 'border-slate-300 text-slate-700 hover:text-slate-900 bg-slate-50'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5 text-purple-600" />
                  <span>Landing</span>
                </button>
              </div>

              {/* Desktop & Tablet Tabs */}
              <nav className={`hidden md:flex items-center gap-1 p-1 rounded-2xl border ${
                isNight ? 'bg-[#111827]/80 border-white/10' : 'bg-slate-100 border-slate-300'
              }`}>
                <button
                  onClick={() => handleNav('/dashboard')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    currentRoute === '/dashboard' 
                      ? 'bg-purple-600 text-white shadow-md' 
                      : isNight ? 'text-slate-400 hover:text-slate-200' : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Dashboard</span>
                </button>

                <button
                  onClick={() => handleNav('/day/12')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    currentRoute === '/day/12' 
                      ? 'bg-purple-600 text-white shadow-md' 
                      : isNight ? 'text-slate-400 hover:text-slate-200' : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Day 12 Mission</span>
                  <span className={`px-1 py-0.2 text-[9px] rounded font-extrabold ${
                    isNight ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-100 text-amber-900'
                  }`}>
                    Active
                  </span>
                </button>
              </nav>

              {/* Right Controls */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Streak Badge */}
                <div className={`flex items-center gap-1 px-2.5 py-1 rounded-xl border text-xs font-extrabold ${
                  isNight 
                    ? 'bg-orange-500/10 border-orange-500/30 text-orange-400' 
                    : 'bg-orange-50 border-orange-300 text-orange-900'
                }`}>
                  <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                  <span>{profile.streakDays}d</span>
                </div>

                {/* Theme Toggle */}
                <button
                  onClick={toggleThemeMode}
                  title={isNight ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    isNight 
                      ? 'bg-[#111827] border-white/10 text-amber-300' 
                      : 'bg-slate-100 border-slate-300 text-slate-800 hover:text-purple-700'
                  }`}
                >
                  {isNight ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>

                {/* State Simulator Trigger */}
                <button
                  onClick={() => setIsStateSimulatorOpen(true)}
                  title="Edge Case Simulator"
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    isNight 
                      ? 'bg-[#111827] border-white/10 text-purple-400' 
                      : 'bg-slate-100 border-slate-300 text-purple-700 hover:bg-white'
                  }`}
                >
                  <Wrench className="w-4 h-4" />
                </button>

                {/* Sound FX Toggle (Desktop/Tablet) */}
                <button
                  onClick={toggleSoundState}
                  className={`p-2 rounded-xl border hidden sm:flex cursor-pointer ${
                    isNight ? 'bg-[#111827] border-white/10 text-slate-400' : 'bg-slate-100 border-slate-300 text-slate-700'
                  }`}
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4 text-purple-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
                </button>
              </div>
            </div>
          </header>

          {/* =========================================================================
              4. FIXED MOBILE BOTTOM NAVIGATION BAR (390px / 430px Dedicated)
              ========================================================================= */}
          <nav 
            aria-label="Mobile Navigation Bar"
            className={`md:hidden fixed bottom-0 left-0 right-0 z-50 h-16 border-t backdrop-blur-2xl px-3 flex items-center justify-around transition-all ${
              isNight 
                ? 'bg-[#080D18]/95 border-white/10 text-slate-400 shadow-2xl' 
                : 'bg-white/95 border-slate-200 text-slate-700 shadow-lg'
            }`}
          >
            {/* 1. Home / Dashboard */}
            <button
              onClick={() => handleNav('/dashboard')}
              className={`flex flex-col items-center justify-center gap-1 min-w-[56px] min-h-[44px] rounded-xl transition-all cursor-pointer ${
                currentRoute === '/dashboard' 
                  ? 'text-purple-600 dark:text-purple-400 font-extrabold' 
                  : isNight ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard className={`w-5 h-5 ${currentRoute === '/dashboard' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
              <span className="text-[10px] tracking-tight">Home</span>
            </button>

            {/* 2. Challenge (Active Indicator) */}
            <button
              onClick={() => handleNav('/day/12')}
              className={`flex flex-col items-center justify-center gap-1 min-w-[56px] min-h-[44px] rounded-xl transition-all relative cursor-pointer ${
                currentRoute === '/day/12' 
                  ? 'text-purple-600 dark:text-purple-400 font-extrabold' 
                  : isNight ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <div className="relative">
                <Code2 className={`w-5 h-5 ${currentRoute === '/day/12' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500" />
              </div>
              <span className="text-[10px] tracking-tight">Challenge</span>
            </button>

            {/* 3. Explore Landing Page */}
            <button
              onClick={() => handleNav('/')}
              className={`flex flex-col items-center justify-center gap-1 min-w-[56px] min-h-[44px] rounded-xl transition-all cursor-pointer ${
                (currentRoute as string) === '/' 
                  ? 'text-purple-600 dark:text-purple-400 font-extrabold' 
                  : isNight ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Globe className="w-5 h-5 stroke-[1.75]" />
              <span className="text-[10px] tracking-tight">Explore</span>
            </button>

            {/* 4. Profile / Register Tab */}
            <button
              onClick={() => handleNav('/register')}
              className={`flex flex-col items-center justify-center gap-1 min-w-[56px] min-h-[44px] rounded-xl transition-all cursor-pointer ${
                (currentRoute as string) === '/register' 
                  ? 'text-purple-600 dark:text-purple-400 font-extrabold' 
                  : isNight ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-5 h-5 stroke-[1.75]" />
              <span className="text-[10px] tracking-tight">Profile</span>
            </button>
          </nav>
        </>
      )}
    </>
  );
};
