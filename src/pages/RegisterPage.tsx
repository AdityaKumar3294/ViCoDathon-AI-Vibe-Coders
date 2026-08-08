import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Code2, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  User, 
  GraduationCap, 
  Sparkles, 
  ShieldCheck,
  Server,
  Layers,
  Cpu,
  Binary,
  Compass,
  Database
} from 'lucide-react';
import { playTactileClick, playSuccessChime } from '../utils/sound';

export const RegisterPage: React.FC = () => {
  const { setRoute, themeMode, handleRegister } = useApp();
  const isNight = themeMode === 'night';

  const [name, setName] = useState('Aditya Sharma');
  const [email, setEmail] = useState('aditya.sharma@engg.edu.in');
  const [password, setPassword] = useState('••••••••••••');
  const [confirmPassword, setConfirmPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [college, setCollege] = useState('Indian Institute of Technology (BHU)');
  const [selectedTrack, setSelectedTrack] = useState<'systems' | 'fullstack' | 'ai' | 'frontend' | 'datascience' | 'dsa'>('systems');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const tracks = [
    { id: 'systems', name: 'Backend Systems', icon: Server, desc: 'Redis, Go, Kafka, Distributed Systems' },
    { id: 'fullstack', name: 'Full Stack', icon: Layers, desc: 'Next.js, Node, Postgres, Docker' },
    { id: 'ai', name: 'AI / ML Agents', icon: Cpu, desc: 'LLMs, LangChain, Vector DBs, Python' },
    { id: 'frontend', name: 'Frontend Eng', icon: Compass, desc: 'React, TypeScript, Performance, Canvas' },
    { id: 'datascience', name: 'Data Engineering', icon: Database, desc: 'Spark, Pipelines, SQL, Warehouses' },
    { id: 'dsa', name: 'DSA & Algorithms', icon: Binary, desc: 'Dynamic Prog, Graphs, System Code' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playTactileClick();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Please enter your full name');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid college or personal email address');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      playSuccessChime();
      handleRegister({
        name,
        email,
        college,
        track: selectedTrack,
      });
    }, 700);
  };

  return (
    <div className={`min-h-[90vh] flex flex-col justify-center items-center px-4 py-8 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300 ${
      isNight ? 'text-slate-100 bg-[#080D18]' : 'text-slate-900 bg-[#F7F8FC]'
    }`}>
      {/* Background ambient accents */}
      <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
        isNight ? 'bg-purple-600/15' : 'bg-purple-200/50'
      }`} />
      <div className={`absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full blur-3xl pointer-events-none ${
        isNight ? 'bg-indigo-600/10' : 'bg-indigo-100/60'
      }`} />

      <div className="w-full max-w-[1100px] mx-auto relative z-10">
        {/* Mobile & Tablet Header */}
        <div className="lg:hidden text-center space-y-2.5 mb-6">
          <button 
            onClick={() => {
              playTactileClick();
              setRoute('/');
            }}
            className="inline-flex items-center gap-2 group transition-transform hover:scale-105 cursor-pointer"
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

        {/* Responsive Composition: 2-Column on Desktop (lg:), 1-Column on Mobile/Tablet */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column on Desktop: 60-Day Transformation Showcase & Pipeline */}
          <div className="hidden lg:block lg:col-span-5 space-y-6 text-left">
            <button 
              onClick={() => {
                playTactileClick();
                setRoute('/');
              }}
              className="inline-flex items-center gap-2 group transition-transform hover:scale-105 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-purple-400 p-[1.5px] shadow-lg shadow-purple-500/25">
                <div className={`w-full h-full rounded-[14px] flex items-center justify-center ${
                  isNight ? 'bg-[#0B1220]' : 'bg-white'
                }`}>
                  <Code2 className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-tight text-2xl font-sans">
                  AB<span className="text-purple-600">Talks</span>
                </span>
                <span className="px-2 py-0.5 text-xs font-bold bg-purple-500/15 text-purple-600 rounded-md border border-purple-500/25 uppercase tracking-wider">
                  Cohort #7
                </span>
              </div>
            </button>

            <div className="space-y-3">
              <h2 className={`text-3xl font-extrabold tracking-tight leading-tight ${isNight ? 'text-white' : 'text-slate-900'}`}>
                Build Every Day.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500">
                  Become Impossible to Ignore.
                </span>
              </h2>
              <p className={`text-sm leading-relaxed ${isNight ? 'text-slate-300' : 'text-slate-600'}`}>
                Join 1,420+ Indian engineering students building real distributed systems, LLM agents, and full-stack architectures.
              </p>
            </div>

            {/* 5-Stage Visual Journey Card */}
            <div className={`p-5 rounded-3xl border space-y-4 ${
              isNight ? 'bg-[#111827] border-white/10 shadow-xl' : 'bg-white border-slate-200 shadow-md'
            }`}>
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400">
                  <Sparkles className="w-4 h-4" />
                  <span>The 5-Stage Transformation</span>
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono">100% Free</span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-xl bg-purple-500/15 text-purple-600 font-bold flex items-center justify-center text-xs">1</div>
                  <div>
                    <strong className="block text-slate-900 dark:text-white">60 Consecutive Days</strong>
                    <span className="text-slate-500 text-[11px]">35-minute focused nocturnal build missions</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-xl bg-cyan-500/15 text-cyan-600 font-bold flex items-center justify-center text-xs">2</div>
                  <div>
                    <strong className="block text-slate-900 dark:text-white">Verified GitHub Commits</strong>
                    <span className="text-slate-500 text-[11px]">Green squares & atomic conventional commit messages</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-xl bg-blue-500/15 text-blue-600 font-bold flex items-center justify-center text-xs">3</div>
                  <div>
                    <strong className="block text-slate-900 dark:text-white">LinkedIn Public Proof</strong>
                    <span className="text-slate-500 text-[11px]">Architectural reflections read by top engineering recruiters</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-xl bg-amber-500/15 text-amber-600 font-bold flex items-center justify-center text-xs">4</div>
                  <div>
                    <strong className="block text-slate-900 dark:text-white">Recruiter Ready Portfolio</strong>
                    <span className="text-slate-500 text-[11px]">Tier-1 tech interview discussions anchored on your code</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Registration Form (Centered on Mobile/Tablet) */}
          <div className="lg:col-span-7 w-full max-w-[460px] mx-auto space-y-6">
            {/* Mobile Visual Journey Banner */}
            <div className={`lg:hidden p-4 rounded-2xl border transition-all ${
              isNight 
                ? 'bg-[#111827]/90 border-purple-500/30 shadow-lg shadow-purple-950/40' 
                : 'bg-white border-purple-100 shadow-sm'
            }`}>
              <div className="flex items-center justify-between text-[11px] font-bold mb-2.5">
                <span className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  <span>Your 60-Day Transformation</span>
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                  isNight ? 'bg-purple-950/60 text-purple-300' : 'bg-purple-50 text-purple-700'
                }`}>
                  Cohort #7
                </span>
              </div>

              {/* 5-Step Pipeline Chips */}
              <div className="flex items-center justify-between gap-1 text-center text-[9px] font-extrabold">
                <div className={`flex-1 py-1.5 px-1 rounded-lg border ${
                  isNight ? 'bg-slate-900 border-white/5 text-purple-300' : 'bg-purple-50 border-purple-200 text-purple-800'
                }`}>
                  60 DAYS
                </div>
                <span className="text-slate-400 text-[10px]">→</span>
                <div className={`flex-1 py-1.5 px-1 rounded-lg border ${
                  isNight ? 'bg-slate-900 border-white/5 text-cyan-400' : 'bg-cyan-50 border-cyan-200 text-cyan-800'
                }`}>
                  BUILD
                </div>
                <span className="text-slate-400 text-[10px]">→</span>
                <div className={`flex-1 py-1.5 px-1 rounded-lg border ${
                  isNight ? 'bg-slate-900 border-white/5 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                }`}>
                  GITHUB
                </div>
                <span className="text-slate-400 text-[10px]">→</span>
                <div className={`flex-1 py-1.5 px-1 rounded-lg border ${
                  isNight ? 'bg-slate-900 border-white/5 text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-800'
                }`}>
                  LINKEDIN
                </div>
                <span className="text-slate-400 text-[10px]">→</span>
                <div className={`flex-1 py-1.5 px-1 rounded-lg border ${
                  isNight ? 'bg-purple-950/40 border-purple-500/30 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-800'
                }`}>
                  OFFERS
                </div>
              </div>
            </div>

            {/* Main Registration Card */}
            <div className={`p-5 sm:p-7 rounded-3xl border transition-all ${
              isNight 
                ? 'bg-[#111827] border-white/10 shadow-2xl' 
                : 'bg-white border-slate-200/90 shadow-md shadow-slate-200/50'
            }`}>
              <div className="space-y-1 text-left mb-6">
                <h1 className={`text-xl sm:text-2xl font-extrabold tracking-tight ${isNight ? 'text-white' : 'text-slate-900'}`}>
                  Start building your streak.
                </h1>
                <p className={`text-xs ${isNight ? 'text-slate-400' : 'text-slate-600'}`}>
                  Create your ABTalks profile and begin your 60-day coding journey.
                </p>
              </div>

              {/* Error alert */}
              {errorMessage && (
                <div className="mb-4 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-300 text-xs font-semibold text-left">
                  {errorMessage}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className={`text-xs font-bold ${isNight ? 'text-slate-300' : 'text-slate-700'}`}>
                    Full Name
                  </label>
                  <div className="relative">
                    <User className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${
                      isNight ? 'text-slate-500' : 'text-slate-400'
                    }`} />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Aditya Sharma"
                      className={`w-full pl-10 pr-4 py-3.5 rounded-2xl text-xs sm:text-sm font-medium focus:outline-none transition-all ${
                        isNight 
                          ? 'bg-[#080D18] border border-white/10 text-white placeholder-slate-500 focus:border-purple-500' 
                          : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-purple-600 focus:ring-2 focus:ring-purple-500/15'
                      }`}
                    />
                  </div>
                </div>

                {/* Email Address */}
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
                      placeholder="aditya.sharma@engg.edu.in"
                      className={`w-full pl-10 pr-4 py-3.5 rounded-2xl text-xs sm:text-sm font-medium focus:outline-none transition-all ${
                        isNight 
                          ? 'bg-[#080D18] border border-white/10 text-white placeholder-slate-500 focus:border-purple-500' 
                          : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-purple-600 focus:ring-2 focus:ring-purple-500/15'
                      }`}
                    />
                  </div>
                </div>

                {/* College / University */}
                <div className="space-y-1.5">
                  <label className={`text-xs font-bold ${isNight ? 'text-slate-300' : 'text-slate-700'}`}>
                    College / University
                  </label>
                  <div className="relative">
                    <GraduationCap className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${
                      isNight ? 'text-slate-500' : 'text-slate-400'
                    }`} />
                    <input
                      type="text"
                      required
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      placeholder="IIT, NIT, VIT, BITS, or Univ name"
                      className={`w-full pl-10 pr-4 py-3.5 rounded-2xl text-xs sm:text-sm font-medium focus:outline-none transition-all ${
                        isNight 
                          ? 'bg-[#080D18] border border-white/10 text-white placeholder-slate-500 focus:border-purple-500' 
                          : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-purple-600 focus:ring-2 focus:ring-purple-500/15'
                      }`}
                    />
                  </div>
                </div>

                {/* Coding Track Selector */}
                <div className="space-y-2 pt-1">
                  <label className={`text-xs font-bold flex items-center justify-between ${
                    isNight ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    <span>Choose Coding Track</span>
                    <span className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold">Switchable anytime</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {tracks.map((t) => {
                      const Icon = t.icon;
                      const isSelected = selectedTrack === t.id;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => {
                            playTactileClick();
                            setSelectedTrack(t.id as any);
                          }}
                          className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? isNight
                                ? 'bg-purple-950/40 border-purple-500 text-white ring-1 ring-purple-500'
                                : 'bg-purple-50 border-purple-400 text-purple-950 ring-1 ring-purple-300 shadow-sm'
                              : isNight
                                ? 'bg-[#080D18] border-white/5 text-slate-400 hover:text-slate-200'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 mb-1">
                            <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-purple-600 dark:text-purple-400' : 'text-slate-400'}`} />
                            <span className="text-xs font-bold leading-none">{t.name}</span>
                          </div>
                          <p className="text-[10px] text-slate-400 line-clamp-1">
                            {t.desc}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Password & Confirm Password */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="space-y-1.5">
                    <label className={`text-xs font-bold ${isNight ? 'text-slate-300' : 'text-slate-700'}`}>
                      Password
                    </label>
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
                        className={`w-full pl-10 pr-9 py-3.5 rounded-2xl text-xs sm:text-sm font-medium focus:outline-none transition-all ${
                          isNight 
                            ? 'bg-[#080D18] border border-white/10 text-white placeholder-slate-500 focus:border-purple-500' 
                            : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-purple-600 focus:ring-2 focus:ring-purple-500/15'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:text-purple-600 transition-colors cursor-pointer ${
                          isNight ? 'text-slate-500' : 'text-slate-400'
                        }`}
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className={`text-xs font-bold ${isNight ? 'text-slate-300' : 'text-slate-700'}`}>
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${
                        isNight ? 'text-slate-500' : 'text-slate-400'
                      }`} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className={`w-full pl-10 pr-4 py-3.5 rounded-2xl text-xs sm:text-sm font-medium focus:outline-none transition-all ${
                          isNight 
                            ? 'bg-[#080D18] border border-white/10 text-white placeholder-slate-500 focus:border-purple-500' 
                            : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-purple-600 focus:ring-2 focus:ring-purple-500/15'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 sm:h-13 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 transition-all flex items-center justify-center gap-2 group active:scale-98 disabled:opacity-60 cursor-pointer"
                  >
                    {isLoading ? (
                      <span>Initializing 60-Day Streak...</span>
                    ) : (
                      <>
                        <span>Create My Account</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Bottom Log in link */}
              <div className={`mt-6 pt-4 border-t text-center space-y-1.5 text-xs ${
                isNight ? 'border-white/10' : 'border-slate-100'
              }`}>
                <p className={isNight ? 'text-slate-400' : 'text-slate-500'}>
                  Already have an account?
                </p>
                <button
                  type="button"
                  onClick={() => {
                    playTactileClick();
                    setRoute('/login');
                  }}
                  className="font-extrabold text-purple-600 dark:text-purple-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Log in →</span>
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Free & Open Source for Engineering Students</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
