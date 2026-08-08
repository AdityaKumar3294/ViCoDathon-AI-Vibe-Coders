import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Code2, 
  Flame, 
  ArrowRight, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  ShieldCheck, 
  X
} from 'lucide-react';
import { playTactileClick, playSuccessChime } from '../utils/sound';

export const LoginPage: React.FC = () => {
  const { setRoute, themeMode } = useApp();
  const [email, setEmail] = useState('aditya.sharma@engg.edu.in');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'google' | 'github' | null>(null);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  const isNight = themeMode === 'night';

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playTactileClick();
    setIsLoading(true);
    setLoginMethod('email');

    setTimeout(() => {
      setIsLoading(false);
      playSuccessChime();
      setRoute('/dashboard');
    }, 700);
  };

  const handleSocialLogin = (provider: 'google' | 'github') => {
    playTactileClick();
    setIsLoading(true);
    setLoginMethod(provider);

    setTimeout(() => {
      setIsLoading(false);
      playSuccessChime();
      setRoute('/dashboard');
    }, 600);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playTactileClick();
    if (!forgotEmail) return;
    setForgotSuccess(true);
    setTimeout(() => {
      setShowForgotModal(false);
      setForgotSuccess(false);
      setForgotEmail('');
    }, 2000);
  };

  return (
    <div className={`min-h-[85vh] flex flex-col justify-center items-center px-4 py-8 sm:px-6 lg:px-8 relative overflow-hidden ${
      isNight ? 'text-slate-100' : 'text-slate-900'
    }`}>
      {/* Background ambient accents */}
      <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl pointer-events-none ${
        isNight ? 'bg-purple-600/15' : 'bg-purple-200/50'
      }`} />
      <div className={`absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl pointer-events-none ${
        isNight ? 'bg-indigo-600/10' : 'bg-indigo-100/60'
      }`} />

      <div className="w-full max-w-[390px] mx-auto space-y-6 relative z-10">
        {/* Brand Header */}
        <div className="text-center space-y-2.5">
          <button 
            onClick={() => {
              playTactileClick();
              setRoute('/');
            }}
            className="inline-flex items-center gap-2 group transition-transform hover:scale-105"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-purple-400 p-[1.5px] shadow-lg shadow-purple-500/25">
              <div className={`w-full h-full rounded-[14px] flex items-center justify-center ${
                isNight ? 'bg-[#0B1220]' : 'bg-white'
              }`}>
                <Code2 className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-left">
              <span className="font-extrabold tracking-tight text-xl font-sans">
                AB<span className="text-purple-600">Talks</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-purple-500/15 text-purple-600 rounded-md border border-purple-500/25 uppercase tracking-wider">
                60 Days
              </span>
            </div>
          </button>

          <p className={`text-xs font-semibold tracking-wider uppercase ${
            isNight ? 'text-purple-300' : 'text-purple-600'
          }`}>
            Build • Commit • Share
          </p>
        </div>

        {/* Visual Progress / Streak Concept Banner */}
        <div className={`p-3.5 rounded-2xl border transition-all ${
          isNight 
            ? 'bg-[#111827]/90 border-purple-500/30 shadow-lg shadow-purple-950/40' 
            : 'bg-white border-purple-100 shadow-sm'
        }`}>
          <div className="flex items-center justify-between text-[11px] font-bold mb-2">
            <span className="flex items-center gap-1.5 text-orange-500">
              <Flame className="w-4 h-4 fill-orange-500 animate-bounce" />
              <span>60-Day Consistency Engine</span>
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
              isNight ? 'bg-purple-950/60 text-purple-300' : 'bg-purple-50 text-purple-700'
            }`}>
              Cohort #7
            </span>
          </div>

          {/* 4-Stage Mini Flow */}
          <div className="grid grid-cols-4 gap-1.5 text-center text-[10px] font-extrabold">
            <div className={`p-1.5 rounded-xl border ${
              isNight ? 'bg-slate-900 border-white/5 text-purple-300' : 'bg-slate-50 border-slate-200/60 text-purple-700'
            }`}>
              BUILD
            </div>
            <div className={`p-1.5 rounded-xl border ${
              isNight ? 'bg-slate-900 border-white/5 text-emerald-400' : 'bg-slate-50 border-slate-200/60 text-emerald-700'
            }`}>
              COMMIT
            </div>
            <div className={`p-1.5 rounded-xl border ${
              isNight ? 'bg-slate-900 border-white/5 text-blue-400' : 'bg-slate-50 border-slate-200/60 text-blue-700'
            }`}>
              SHARE
            </div>
            <div className={`p-1.5 rounded-xl border ${
              isNight ? 'bg-purple-950/40 border-purple-500/30 text-amber-300' : 'bg-purple-50 border-purple-200 text-amber-700'
            }`}>
              GROW 🚀
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className={`p-6 sm:p-7 rounded-3xl border transition-all ${
          isNight 
            ? 'bg-[#111827] border-white/10 shadow-2xl' 
            : 'bg-white border-slate-200/80 shadow-md shadow-slate-200/50'
        }`}>
          <div className="space-y-1 text-left mb-5">
            <h2 className="text-xl font-extrabold tracking-tight">
              Welcome back, builder.
            </h2>
            <p className={`text-xs ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>
              Continue your 60-day journey & protect your streak.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
            {/* Email field */}
            <div className="space-y-1.5">
              <label className={`text-xs font-bold flex items-center justify-between ${
                isNight ? 'text-slate-300' : 'text-slate-700'
              }`}>
                <span>Email address</span>
                <span className={`text-[10px] font-normal ${isNight ? 'text-slate-500' : 'text-slate-400'}`}>College / Personal</span>
              </label>
              <div className="relative">
                <Mail className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${
                  isNight ? 'text-slate-500' : 'text-slate-400'
                }`} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@engg.edu.in"
                  className={`w-full pl-10 pr-4 py-3 rounded-2xl text-xs font-medium focus:outline-none transition-all ${
                    isNight 
                      ? 'bg-[#0B1220] border border-white/10 text-white placeholder-slate-500 focus:border-purple-500' 
                      : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-purple-600 focus:ring-2 focus:ring-purple-500/15'
                  }`}
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className={`text-xs font-bold ${
                  isNight ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    playTactileClick();
                    setShowForgotModal(true);
                  }}
                  className="text-[11px] font-semibold text-purple-600 hover:text-purple-500 transition-colors cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <Lock className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${
                  isNight ? 'text-slate-500' : 'text-slate-400'
                }`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className={`w-full pl-10 pr-10 py-3 rounded-2xl text-xs font-medium focus:outline-none transition-all ${
                    isNight 
                      ? 'bg-[#0B1220] border border-white/10 text-white placeholder-slate-500 focus:border-purple-500' 
                      : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-purple-600 focus:ring-2 focus:ring-purple-500/15'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 hover:text-purple-600 transition-colors cursor-pointer ${
                    isNight ? 'text-slate-500' : 'text-slate-400'
                  }`}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 transition-all flex items-center justify-center gap-2 group active:scale-98 disabled:opacity-60 cursor-pointer"
            >
              {isLoading && loginMethod === 'email' ? (
                <span>Entering ABTalks...</span>
              ) : (
                <>
                  <span>Continue to ABTalks</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className={`w-full border-t ${
                isNight ? 'border-white/10' : 'border-slate-200'
              }`} />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className={`px-2 font-bold ${
                isNight ? 'bg-[#111827] text-slate-500' : 'bg-white text-slate-400'
              }`}>
                OR
              </span>
            </div>
          </div>

          {/* Social Logins */}
          <div className="space-y-2.5">
            {/* Google */}
            <button
              type="button"
              onClick={() => handleSocialLogin('google')}
              disabled={isLoading}
              className={`w-full py-2.5 px-4 rounded-2xl text-xs font-bold flex items-center justify-center gap-2.5 border transition-all active:scale-98 cursor-pointer ${
                isNight 
                  ? 'bg-[#0B1220] border-white/10 hover:border-white/20 text-slate-200 hover:bg-slate-900' 
                  : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50 shadow-sm'
              }`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* GitHub */}
            <button
              type="button"
              onClick={() => handleSocialLogin('github')}
              disabled={isLoading}
              className={`w-full py-2.5 px-4 rounded-2xl text-xs font-bold flex items-center justify-center gap-2.5 border transition-all active:scale-98 cursor-pointer ${
                isNight 
                  ? 'bg-[#0B1220] border-white/10 hover:border-white/20 text-slate-200 hover:bg-slate-900' 
                  : 'bg-slate-900 hover:bg-slate-800 text-white border-transparent shadow-sm'
              }`}
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>Continue with GitHub</span>
            </button>
          </div>

          {/* Bottom Onboarding CTA */}
          <div className={`mt-6 pt-4 border-t text-center space-y-1.5 text-xs ${
            isNight ? 'border-white/10' : 'border-slate-100'
          }`}>
            <p className={isNight ? 'text-slate-400' : 'text-slate-500'}>
              New to ABTalks?
            </p>
            <button
              type="button"
              onClick={() => {
                playTactileClick();
                setRoute('/register');
              }}
              className="font-extrabold text-purple-600 dark:text-purple-400 hover:text-purple-500 inline-flex items-center gap-1 group transition-colors cursor-pointer"
            >
              <span>Create an account →</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Security & Proof of Work Micro-signals */}
        <div className={`flex items-center justify-center gap-4 text-[11px] font-medium ${
          isNight ? 'text-slate-400' : 'text-slate-500'
        }`}>
          <span className="flex items-center gap-1 text-emerald-600 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Encrypted Session</span>
          </span>
          <span>•</span>
          <span>1,420+ Active Builders</span>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className={`w-full max-w-sm p-6 rounded-3xl border space-y-4 shadow-2xl relative ${
            isNight ? 'bg-[#111827] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <button
              onClick={() => setShowForgotModal(false)}
              className={`absolute top-4 right-4 p-1.5 rounded-xl cursor-pointer ${
                isNight ? 'hover:bg-white/10 text-slate-400' : 'hover:bg-slate-100 text-slate-500'
              }`}
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1 text-left">
              <h3 className="text-base font-extrabold">Reset your password</h3>
              <p className={`text-xs ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>
                Enter your email address and we will send a secure streak recovery link.
              </p>
            </div>

            {forgotSuccess ? (
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-600 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Reset link sent! Check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-3 text-left">
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="student@engg.edu.in"
                  className={`w-full px-4 py-2.5 rounded-xl text-xs focus:outline-none ${
                    isNight 
                      ? 'bg-[#0B1220] border border-white/10 text-white focus:border-purple-500' 
                      : 'bg-slate-50 border border-slate-200 text-slate-900 focus:border-purple-600'
                  }`}
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                >
                  Send Recovery Link
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
